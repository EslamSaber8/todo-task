const express = require('express');

const {
  getTask,
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = require('../services/taskService');

const authService = require('../services/studentAuthService');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(getTasks)
  .post(
    authService.protect,
    authService.allowedTo('student'),
    createTask
  );
router
  .route('/:id')
  .get(getTask)
  .put(
    authService.protect,
    authService.allowedTo('student'),
    updateTask
  )
  .delete(
    authService.protect,
    authService.allowedTo('student', 'admin'),
    deleteTask
  );

module.exports = router;
