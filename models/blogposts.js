module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      // userId: DataTypes.INTEGER,
    });

    BlogPost.associate = (models) => {
      BlogPost.belongsTo(models.User, { foreingKey: 'id', as: 'postUser' });
    };

  return BlogPost;
};