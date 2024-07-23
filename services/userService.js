const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');

const factory = require('./handlersFactory');
const ApiError = require('../utils/apiError');
const Teacher= require('../models/userModel');

const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const createToken = require('../utils/createToken');
// @desc    Get list of users
// @route   GET /api/v1/users
// @access  Private/Admin
exports.getUsers = factory.getAll(User);

// @desc    Get specific User by id
// @route   GET /api/v1/Users/:id
// @access  Private/Admin
exports.getUser = factory.getOne(User);

// @desc    Create User
// @route   POST  /api/v1/Users
// @access  Private/Admin
exports.createUser = factory.createOne(User);

// @desc    Update specific User
// @route   PUT /api/v1/Users/:id
// @access  Private/Admin
exports.updateUser = asyncHandler(async (req, res, next) => {
  const document = await Teacher.findByIdAndUpdate(
    req.params.id,
    {
      phone: req.body.phone,
      displayName:req.body. displayName,
      experienceYears: req.body. experienceYears,
      address: req.body. address,
      level: req.body.level,
    },
    {
      new: true,
    }
  );

  if (!document) {
    return next(new ApiError(`No document for this id ${req.params.id}`, 404));
  }
  res.status(200).json({ data: document });
});
// @desc    Delete specific User
// @route   DELETE /api/v1/Users/:id
// @access  Private/Admin
exports.deleteUser = factory.deleteOne(User);

// @desc    Signup
// @route   GET /api/v1/UserAuth/signup
// @access  Public
exports.signup = asyncHandler(async (req, res, next) => {
  // 1- Create User
  const user = await User.create({
    phone: req.body.phone,
    displayName:req.body. displayName,
    experienceYears: req.body. experienceYears,
    address: req.body. address,
    level: req.body.level,
  });

  // 2- Generate token
  const token = createToken(user._id);

  res.status(201).json({ data:user, token });
});

// @desc    Login
// @route   GET /api/v1/UserAuth/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
  // 1) check if password and email in the body (validation)
  // 2) check if User exist & check if password is correct
  const user = await User.findOne({  phone: req.body. phone });

  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return next(new ApiError('Incorrect email or password', 401));
  }
  // 3) generate token
  const token = createToken(user._id);

  // Delete password from response
  delete user._doc.password;
  // 4) send response to client side
  res.status(200).json({ data: user, token });
});

// @desc   make sure the teacher is logged in
exports.protect = asyncHandler(async (req, res, next) => {
  // 1) Check if token exist, if exist get
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(
      new ApiError(
        'You are not login, Please login to get access this route',
        401
      )
    );
  }})

  // 2) Verify token (no change happens, expired token)
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);


  // 3) Check if teacher exists
  const currentUser = await Teacher.findById(decoded.userId);
  if (!currentUser) {
    return next(
      new ApiError(
        'The user that belong to this token does no longer exist',
        401
      )
    );
  }

// @desc    Authorization 
exports.allowedTo = (...roles) =>
  asyncHandler(async (req, res, next) => {
    // 1) access roles
  
    if (!roles.includes(req.user.role)) {
      return next(
        new ApiError('You are not allowed to access this route', 403)
      );
    }
    next();
  });
