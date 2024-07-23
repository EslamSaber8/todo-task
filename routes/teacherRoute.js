const express = require('express');
const {
  signup,
  login,
} = require('../services/userService');

const router = express.Router();
const {
  getUserValidator,
  createUserValidator,
  updateUserValidator,
  deleteUserValidator,
  
} = require('../utils/validators/userValidator');

const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser, 
} = require('../services/userService');

router
  .route('/')
  .get(getUsers)
  .post(createUserValidator, createUser);
router
  .route('/:id')
  .get(getUserValidator, getUser)
  .put( updateUserValidator, updateUser)
  .delete(deleteUserValidator, deleteUser);

router.post('/userSignup', signupValidator, signup);
router.post('/userLogin', loginValidator, login);


module.exports = router;
