const { Category } = require('../models');

const createCategory = async (categoryName) => {
  const category = await Category.create({ name: categoryName });
  const { id, name } = category.dataValues;
  return { id, name };
};

const getAllCategories = async () => {
  const categories = await Category.findAll();
  const arrayOfCategories = categories
  .map(({ id, name }) => ({ id, name }));
 return arrayOfCategories;
};

module.exports = {
  createCategory,
  getAllCategories,
};