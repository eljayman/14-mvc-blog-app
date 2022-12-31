const { User } = require('../models');
const userSeedData = require('./user-seed-data.json');

const userSeed = () => User.bulkCreate(userSeedData);

module.exports = userSeed;
