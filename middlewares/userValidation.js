const Joi = require('joi');
const { User } = require('../models');

const checkUserData = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string()
    .email({ tlds: false })
    .required()
    .messages({ 'email.required': '"email" is required' }),
  password: Joi.string()
    .min(6)
    .max(6)
    .required()
    .messages({
      'string.min': '"password" length must be 6 characters long',
      'string.max': '"password" length must be 6 characters long',
    }),
  image: Joi.string(),
});

const validateUser = (user) => {
  const { error } = checkUserData.validate(user);
  if (error) return { status: 400, message: error.message };
  return null;
};

const validateExistingUser = async (user) => {
  const foundUser = await User.findOne({ where: { email: user.email } });
  console.log(foundUser);
  if (foundUser) return { status: 409, message: 'User already registered' };
  return null;
};

const validateNewUser = async (user) => {
  const invalidUser = validateUser(user);
  console.log(invalidUser);
  if (validateUser(user)) return validateUser(user);
  const existingUser = await validateExistingUser(user);
  if (existingUser) return existingUser;
  return null;
};

module.exports = {
  validateNewUser,
};
