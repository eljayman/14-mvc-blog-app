const User = require('./user');
const Blog = require('./blog');
const Comment = require('./comment');
const { DataTypes } = require('sequelize');

User.hasMany(Blog, {
  foreignKey: 'user_id',
  type: DataTypes.UUID,
  onDelete: `CASCADE`,
});

Blog.belongsTo(User, {
  foreignKey: 'user_id',
  type: DataTypes.UUID,
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
  type: DataTypes.UUID,
  onDelete: `CASCADE`,
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
  type: DataTypes.UUID,
});

Blog.hasMany(Comment, {
  foreignKey: 'blog_id',
  type: DataTypes.UUID,
  onDelete: `CASCADE`,
});

Comment.belongsTo(Blog, {
  foreignKey: 'blog_id',
  type: DataTypes.UUID,
});

module.exports = { User, Blog, Comment };
