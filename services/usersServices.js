const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv/config');
const { validateUserEmail } = require('../middlewares/validateForm');

const createUser = async (data) => {
  const emailExist = await validateUserEmail(data);
  if (emailExist) throw new Error('User already registered');
  const newUser = await User.create(data);
  const { email, id } = newUser;
  const token = jwt.sign({ email, id }, process.env.JWT_SECRET);
  return { token };
};

const getUsersAll = async () => {
  const usersAll = await User.findAll({ attributes: { exclude: ['password'] } });
  return usersAll;
};

const getUserById = async (id) => {
  const getUser = await User.findOne({ where: { id } });
  if (!getUser) throw new Error('User does not exist');
  const userById = await User.findByPk(id);
  return userById;
};

const deleteUser = async (id) => {
  const user = await User.findOne({ where: { id } });
  if (!user) throw new Error('User does not exist');
  await User.destroy({ where: { id } });
  return {};
};

module.exports = {
  createUser,
  getUsersAll,
  getUserById,
  deleteUser,
};
