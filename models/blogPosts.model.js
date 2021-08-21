const fieldsBlogPosts = (params) => ({
  id: { type: params.INTEGER, primaryKey: true, autoIncrement: true },
  title: params.STRING,
  content: params.STRING,
  published: { type: params.DATE, allowNull: false, defaultValue: params.NOW },
  updated: { type: params.DATE, allowNull: false, defaultValue: params.NOW },
});

const configBlogPosts = () => ({
  timestamps: false,
  tableName: 'BlogPosts',
  underscore: true,
});

module.exports = (sequelize, DataTypes) => {
  const BlogPosts = sequelize.define(
    'BlogPosts',
    fieldsBlogPosts(DataTypes),
    configBlogPosts(),
  );

  BlogPosts.associate = (models) => {
    BlogPosts.belongsTo(models.Users, {
      foreignKey: 'userId',
      as: 'user',
    });
  };

  return BlogPosts;
};