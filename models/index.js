const User = require('./User');
const Post = require('./Post');
const Like = require('./Like');
const Comment = require('./Comment');
const Tag = require('./Tag');
const TagToPost = require('./TagToPost');
const Follower = require('./Follower');

// Post:Tag
Post.belongsToMany(Tag, {
  foreignKey: 'post_id',
  through: TagToPost,
});
Tag.belongsToMany(Post, {
  foreignKey: 'tag_id',
  through: TagToPost,
});

// Posts

User.hasMany(Post, {
  foreignKey: 'user_id',
});

Post.belongsTo(User, {
  foreignKey: 'user_id',
});

// Likes

Post.hasMany(Like, {
  foreignKey: 'post_id',
});

Like.belongsTo(Post, {
  foreignKey: 'post_id',
});

Like.belongsTo(User, {
  foreignKey: 'user_id',
});

User.hasMany(Like, {
  foreignKey: 'user_id',
});

// Comments

Post.hasMany(Comment, {
  foreignKey: 'post_id',
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id',
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
});

Follower.belongsTo(User, {
  foreignKey: 'follower_id',
});

User.hasMany(Follower, {
  foreignKey: 'follower_id',
});

module.exports = { User, Post, Like, Comment, Tag, TagToPost, Follower };
