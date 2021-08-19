require('dotenv').config();
const express = require('express');
const joi = require('joi');
const jwt = require('jsonwebtoken');

const { user } = require('../services');
const { auth } = require('../middlewares');

const { JWT_SECRET } = process.env;

const router = express.Router();

const schema = joi.object({
  displayName: joi.string().min(8).required(),
  email: joi.string().email().required(),
  password: joi.string().length(6).required(),
  image: joi.string(),
});

const tokenGenerator = (payload) => {
  const jwtConfig = {
    expiresIn: '1h',
  };

  return jwt.sign(payload, JWT_SECRET, jwtConfig);
};

router.post('/', async (req, res, next) => {
  const { displayName, email, password, image } = req.body;

  const { error } = schema.validate({ displayName, email, password, image });

  if (error) return next(error);

  const newUser = await user.createUser({ displayName, email, password, image });

  if (newUser.message) return next(newUser);

  const token = tokenGenerator({ email, id: newUser.id });

  res.status(201).json({ token });
});

router.get('/', auth, async (_req, res, _next) => {
  const users = await user.readUsers();

  res.status(200).json(users);
});

router.get('/:id', auth, async (req, res, next) => {
  const { id } = req.params;

  const found = await user.readUser(id);

  if (found.message) return next(found);

  res.status(200).json(found);
});

router.delete('/me', auth, async (req, res, _next) => {
  const { id } = req.user;
  
  await user.deleteUser(id);

  res.status(204).end();
});

module.exports = router;
