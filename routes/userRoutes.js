const express = require('express');
const authController = require('./../controllers/authController');
const userController = require('./../controllers/userController');

const router = express.Router();

router.route('/signup').post(authController.signup);
router.route('/login').post(authController.login);
router.route('/logout').get(authController.logout);
router.route('/resetPassword/:token').patch(authController.resetPassword);
router.post('/forgotPassword', authController.forgotPassword);

router.use(authController.protect);

router.get('/me', userController.getMe, userController.getUser);
router.patch(
  '/updateMe',
  userController.uploadUserPhoto,
  userController.resizePhoto,
  userController.updateMe
);
router.patch('/updatePassword', authController.updatePassword);
router.delete('/deleteMe', userController.deleteMe);

router.use(authController.restrictTo('admin'));

router.route('/').get(userController.getAllusers);
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateMe)
  .delete(userController.deleteUser);

module.exports = router;
