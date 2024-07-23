const factory = require('./handlersFactory');
const Task = require('../models/taskModel');

// @desc    Get list of Task
// @route   GET /api/v1/Task
// @access  Public
exports.getTask = factory.getAll(Task);

// @desc    Get specific Task by id
// @route   GET /api/v1/Tasks/:id
// @access  Public
exports.getTask = factory.getOne(Task);

// @desc    Create Task
// @route   POST  /api/v1/Tasks
// @access  Private/Protect/User
exports.createTask = factory.createOne(Task);

// @desc    Update specific Task
// @route   PUT /api/v1/Tasks/:id
// @access  Private/Protect/User
exports.updateTask = factory.updateOne(Task);

// @desc    Delete specific Task
// @route   DELETE /api/v1/Task/:id
// @access  Private/Protect/User-Admin-Manager
exports.deleteTask = factory.deleteOne(Task);
