const router = require('express').Router();
const {
  getUsers,
  createUser,
  getUserById,
  updateUser,
} = require('../controllers/users');

router.get('/', getUsers);
router.post('/', createUser);
router.get('/:id', getUserById);
router.patch('/:id', updateUser);

module.exports = router;
