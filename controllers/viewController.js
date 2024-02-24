const Tour = require('./../models/tourModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getOverview = catchAsync(async (req, res) => {
  const tours = await Tour.find();
  res.status(200).render('overview', { title: 'All tours', tours });
});

exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user'
  });
  if (!tour) return next(new AppError('There is no tour with this name', 404));
  // res.setHeader('Content-Security-Policy', "script-src 'nonce-2726c7f26c'");
  res.status(200).render('tour', { title: tour.name, tour });
});

exports.getAccount = (req, res, next) => {
  res.status(200).render('account', {
    title: 'Your account'
  });
};

exports.signup = (req, res, next) => {
  res.status(200).render('signup');
};

exports.login = (req, res, next) => {
  res.status(200).render('login');
};
