const categorySchema = require('../schema/category');
const { Category } = require('../models');

const createCategory = async (name) => {
  const { error } = categorySchema.validate({ name });
  if (error) throw error;

  const result = await Category.create({ name });

  return result;
};

const getAll = async () => {
  const result = await Category.findAll();

  return result;
};

module.exports = {
  createCategory,
  getAll,
};
