const PostCategory = (sequelize, _DataTypes) => {
  const postCategory = sequelize.define('PostCategory',
  {},
  { timestamps: false });

  postCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: 'posts',
      through: postCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
    models.Category.belongsToMany(models.BlogPost, {
      as: 'categories',
      through: postCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  };

  return postCategory;
};

module.exports = PostCategory;

// Dúvidas:
// como referenciar o userId na tabela BlogPosts?