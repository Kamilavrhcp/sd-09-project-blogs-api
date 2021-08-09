const { User } = require('../models');

// lint reclamou do await, imagino que como ele esta na mesma linha e é somente um
const findByEmail = async (email) =>
  User.findOne({ where: { email } }, { attributes: { exclude: ['password'] } });

module.exports = { 
  findByEmail,
};