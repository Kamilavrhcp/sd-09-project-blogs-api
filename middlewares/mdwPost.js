const postService = require('../services/postService');
const status = require('../services/statusCode');

const postObjectValidator = async (req, res, next) => {
  try {
    const { title, content, categoryIds, userLoged } = req.body;
    const dataVerifiedObject = await postService.postObjectValidator(title, content, categoryIds);
    if (dataVerifiedObject.message) throw dataVerifiedObject;
    const data = await postService.postObject(title, content, categoryIds, userLoged.id);
    if (data.message) throw data;
    return res.status(status.created).json(data);
  } catch (error) {
    return next(error);
  }
};

const getAllBlogPosts = async (req, res, next) => {
  try {
    const data = await postService.getAllBlogPosts();
    if (data.message) throw data;
    return res.status(status.OK).json(data);
  } catch (error) {
    return next(error);
  }
};

const getBlogPostById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await postService.getBlogPostById(id);
    if (data.message) throw data;
    return res.status(status.OK).json(data);
  } catch (error) {
    return next(error);
  }
};

const postPutObjectValidator = async (req, res, next) => {
  try {
    const userLogedId = req.body.userLoged.id;
    const { id } = req.params;
    const { title, content, categoryIds } = req.body;
    const dataObjectBody = postService.postPutObjectValidator(title, content, categoryIds);
    if (dataObjectBody.message) throw dataObjectBody;
    const dataValidUser = await postService.postPutUserValidator(id, userLogedId);
    if (dataValidUser.message) throw dataValidUser;
    const dataUpdated = await postService.postPutUpdate(id, title, content);
    res.status(status.OK).json(dataUpdated);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  postObjectValidator,
  getAllBlogPosts,
  getBlogPostById,
  postPutObjectValidator,
};
