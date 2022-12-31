const { Blog } = require('../models');
const blogSeedData = require('./blog-seed-data.json');

const blogSeed = async () => {
  await Blog.bulkCreate(blogSeedData);
  process.exit(0);
};

blogSeed();


