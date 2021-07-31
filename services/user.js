const tokenGenerator = require('../helpers/tokenGenerator');
const { User } = require('../models');

const createUser = async (userData) => {
  const { email } = userData;

  const existingUser = await User.findOne({ where: { email } });

  if (existingUser) {
    return {
      error: {
        code: 'conflict',
        message: 'User already registered',
      },
    };
  }

  await User.create(userData);

  const token = tokenGenerator(userData);

  return token;
};

const userLogin = async ({ email, password }) => {
  const user = await User.findOne({ where: { email, password } });

  if (!user) {
    return {
      error: {
        code: 'badRequest',
        message: 'Invalid fields',
      },
    };
  }

  const token = tokenGenerator({ email, password });

  return token;
};

const getAllUsers = () => User.findAll({ attributes: { exclude: ['password'] } });

const getUserById = async (id) => {
  const user = await User.findOne({ where: { id }, attributes: { exclude: ['password'] } });

  console.log(user);

  if (!user) {
    return {
      error: {
        code: 'notFound',
        message: 'User does not exist',
      },
    };
  }

  return user;
};

const deleteUser = async (email) => {
  await User.destroy({ where: { email } });
};

module.exports = {
  createUser,
  userLogin,
  getAllUsers,
  getUserById,
  deleteUser,
};
