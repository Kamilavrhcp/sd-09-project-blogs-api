const express = require('express');
const { 
  checkDisplayName,
  checkEmail,
  checkPassword,
  checkIfUserEmailAlreadyExist,
  tokenValidation,
  } = require('../middlewares/index');
const { newUser, getAllUsers, getUserById, deleteUser } = require('../controllers/user');

  const userRouter = express.Router();

  userRouter.post('/user', 
  checkDisplayName, 
  checkEmail,
  checkIfUserEmailAlreadyExist,
  checkPassword, newUser);

  userRouter.get('/user/:id', tokenValidation, getUserById);
  userRouter.get('/user', tokenValidation, getAllUsers);
  userRouter.delete('/user/me', tokenValidation, deleteUser);

module.exports = { userRouter };
