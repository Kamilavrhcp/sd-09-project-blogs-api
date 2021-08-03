module.exports = (sequelize, DataTypes) => {
  const PostsCategory = sequelize.define(
    'PostsCategory',
    {
      postId: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER,
    },
    {
      underscored: true,
      tableName: 'PostCategories',
    },
  );

  return PostsCategory;
};
