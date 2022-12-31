const User = require('./user');
const Blog = require('./blog');
const Comment = require('./comment');
const { DataTypes } = require('sequelize');

User.hasMany(Blog, {
  foreignKey: 'userId',
  type: DataTypes.UUID,
  onDelete: `CASCADE`,
});

Blog.belongsTo(User);

User.hasMany(Comment, {
  foreignKey: 'userId',
  type: DataTypes.UUID,
  onDelete: `CASCADE`,
});

Comment.belongsTo(User);

Blog.hasMany(Comment, {
  foreignKey: 'blogId',
  type: DataTypes.UUID,
  onDelete: `CASCADE`,
});

Comment.belongsTo(Blog);

module.exports = { User, Blog, Comment };
