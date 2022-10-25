const router = require('express').Router();
const { celebrate } = require('celebrate');

const {
  getUsers,
  getUserInfo,
  getUserById,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

const { loginedUserSchema } = require('../utils/userValidationSchemas');

router.get('/', celebrate(loginedUserSchema), getUsers);
router.get('/me', celebrate(loginedUserSchema), getUserInfo);
router.get('/:userId', celebrate(loginedUserSchema), getUserById);
router.patch('/me', celebrate(loginedUserSchema), updateUser);
router.patch('/me/avatar', celebrate(loginedUserSchema), updateAvatar);

module.exports = router;
