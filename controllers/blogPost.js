const Joi = require('joi');
const rescue = require('express-rescue');
const validate = require('../middlewares/validate');
const BlogPostService = require('../services/blogPost');
const validateJWT = require('../middlewares/validateJWS');

const createPost = [
  validateJWT,
  validate(Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    categoryIds: Joi.array().required(),
  })),
  rescue(async (req, res, next) => {
    const { title, content, categoryIds } = req.body;

    const newPost = await BlogPostService.createPost({ title, content, categoryIds });

    return newPost.error
      ? next(newPost.error)
      : res.status(201).json(newPost);
  }),
];

const getAllPosts = [
  validateJWT,
  rescue(async (req, res) => {
    const posts = await BlogPostService.getAllPosts();

    return res.status(200).json(posts);
  }),
];

module.exports = {
  createPost,
  getAllPosts,
};
