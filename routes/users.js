const router = require('express').Router();
const {
  getUsers,
  getUserInfo,
  // getUserById,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getUserInfo);
// router.get('/:userId', getUserById); // TODO Нужен ли теперь этот метод????
router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
