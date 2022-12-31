const userSeed = require('./user-seed');

const sequelize = require('../config/connection');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  console.log('DATABASE SYNCED');
  await userSeed();
  console.log('USERS SEEDED');

  process.exit(0);
};

seedDatabase();
