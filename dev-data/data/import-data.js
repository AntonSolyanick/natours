const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');

const Tour = require('../../models/tourModel');
const User = require('../../models/userModel');
const Review = require('../../models/reviewModel');

const { exit } = require('process');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB)
  .then(connection => console.log('you are connected to the DB'));

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8')
);

const importData = async () => {
  try {
    await Tour.create(tours);
    await User.create(users, { validateBeforeSave: false });
    await Review.create(reviews);
  } catch (err) {
    console.log(err);
  }
  exit();
};

const deleteAllTours = async () => {
  try {
    await Tour.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();
  } catch (err) {
    console.log(err);
  }
  exit();
};

if (process.argv[2] === '--delete') {
  deleteAllTours();
}
if (process.argv[2] === '--import') {
  importData();
}

