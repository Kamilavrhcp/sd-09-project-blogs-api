const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const Joi = require('joi');
const { BlogPost, PostsCategories } = require('../models');

const blogPostSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.array().required(),
  userId: Joi.number().required(),
});

const editBlogPostSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
});

const config = require('../config/config');
const { getAllCategories } = require('./categoriesServices');
const { getAllUsers, getUserById } = require('./usersServices');

const sequelize = new Sequelize(config.development);
let promises = [];

const formatBlogPostObject = (user, blogPost) => {
  const newBlogPost = { ...blogPost, user };
  delete newBlogPost.UserId;
  return newBlogPost;
};

const getAllBlogPosts = async () => {
  const blogPosts = await BlogPost.findAll();
  const users = await getAllUsers();
  const allCategories = await getAllCategories();
  const allPostsCategories = await PostsCategories.findAll();
  const blogPostsReport = blogPosts.map((blogpost) => {
    const user = users.find((us) => us.id === blogpost.userId);
    const newBlogPost = formatBlogPostObject(user, blogpost.dataValues);
    const postsCategories = allPostsCategories.filter(
      (postCategory) => postCategory.postId === blogpost.id,
    );
    const categories = postsCategories.map((postsCategory) => {
        const category = allCategories.find((cat) => cat.id === postsCategory.categoryId);
        return category;
    });
    newBlogPost.categories = categories;
    return newBlogPost;
  });
  return blogPostsReport;
};

const getBlogPostById = async (id) => {
  const blogPost = await BlogPost.findOne({ where: { id } });
  if (!blogPost) throw new Error('Post does not exist');
  const postId = blogPost.id;
  const { userId } = blogPost;
  const user = await getUserById(userId);
  const newBlogPost = formatBlogPostObject(user, blogPost.dataValues);
  const postCategories = await PostsCategories.findAll({ where: { postId } });
  const allCategories = await getAllCategories();
  const categories = postCategories.map((postCategory) => {
    const category = allCategories.find((cat) => cat.id === postCategory.categoryId);
    return category;
  });
  newBlogPost.categories = categories;
  return newBlogPost;
};

const getPostsBySearchTerm = async (searchTerm) => {
  const users = await getAllUsers();
  const allCategories = await getAllCategories();
  const allPostsCategories = await PostsCategories.findAll();
  const blogPosts = await BlogPost.findAll({ where: { [Op.or]: [
          { title: { [Op.substring]: searchTerm } }, { content: { [Op.substring]: searchTerm } },
        ] } });
  const blogPostsReport = blogPosts.map((blogPost) => {
    const user = users.find((us) => us.id === blogPost.userId);
    const newBlogPost = formatBlogPostObject(user, blogPost.dataValues);
    const postsCategories = allPostsCategories.filter((postCat) => postCat.postId === blogPost.id);
    const categories = postsCategories.map((postsCategory) => {
      const category = allCategories.find((cat) => cat.id === postsCategory.categoryId);
      return category;
  });
  newBlogPost.categories = categories;
  return newBlogPost;
  });
  return blogPostsReport;
};

const validateCategories = async (categoryIds) => {
  const allCategories = await getAllCategories();
  let isValid = true;
  isValid = await categoryIds.every((categoryId) => (
    allCategories.find((category) => categoryId === category.id)));
  return isValid;
};

const addBlogPost = async (blogPostData) => {
  const { error } = blogPostSchema.validate(blogPostData);
  if (error) throw new Error(error.details[0].message);
  const ts = await sequelize.transaction();
  const { categoryIds, title, content, userId } = blogPostData;
  const validCategory = await validateCategories(categoryIds);
  if (!validCategory) throw new Error('"categoryIds" not found');
  try {
    const blogPost = await BlogPost.create({ title, content, userId }, { transaction: ts });
    const postId = blogPost.id;
    promises = categoryIds.map(async (categoryId) => (
      PostsCategories.create({ postId, categoryId }, { transaction: ts })));
    Promise.all(promises).then(() => ts.commit());
    return blogPost;
  } catch (err) {
    await ts.rollback();
    throw new Error(err.message);
  }
};

const editBlogPost = async (id, blogPostData) => {
  if (blogPostData && blogPostData.categoryIds) throw new Error('Categories cannot be edited');
  const { error } = editBlogPostSchema.validate(blogPostData);
  if (error) throw new Error(error.details[0].message);
  const { title, content } = blogPostData;
  await BlogPost.update({ title, content }, { where: { id } });
  const blogPostUpdated = await BlogPost.findOne({ where: { id } });
  const blogPost = blogPostUpdated.dataValues;
  const postId = id;
  const postCategories = await PostsCategories.findAll({ where: { postId } });
  const allCategories = await getAllCategories();
  const categories = postCategories.map((postCategory) => {
    const category = allCategories.find((cat) => cat.id === postCategory.categoryId);
    return category;
  });
  blogPost.categories = categories;
  delete blogPost.UserId;
  return blogPost;
};

const removeBlogPost = async (id) => {
  await BlogPost.destroy({ where: { id } });
  return 0;
};

module.exports = {
  getAllBlogPosts,
  getBlogPostById,
  getPostsBySearchTerm,
  addBlogPost,
  editBlogPost,
  removeBlogPost,
};