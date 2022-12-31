const { Comment } = require('../models');
const commentSeedData = require('./comment-seed-data.json');

const commentSeed = async () => {
  await Comment.bulkCreate(commentSeedData);
  process.exit(0);
};

commentSeed();
