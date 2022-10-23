const router = require('express').Router();
const { celebrate } = require('celebrate');

const { updateUserSchema } = require('../utils/userValidationSchemas');

const {
  getUsers,
  getUserInfo,
  getUserById,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getUserInfo);
router.get('/:userId', getUserById);
router.patch('/me', celebrate(updateUserSchema), updateUser);
router.patch('/me/avatar', celebrate(updateUserSchema), updateAvatar);

module.exports = router;
