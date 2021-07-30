const { Category } = require('../models');

const createCategory = async (categoryName) => {
  const category = await Category.create({ name: categoryName });
  const { id, name } = category.dataValues;
  return { id, name };
};

module.exports = {
  createCategory,
};