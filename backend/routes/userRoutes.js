import express from 'express';
const router = express.Router();
import auth from '../middleware/auth.js';

import {
  registerUser,
  loginUser,
  updateUser,
  getUsers,
  getUser,
} from '../controllers/usersController.js';

router.route('/auth/register').post(registerUser);
router.route('/auth/login').post(loginUser);
router.route('/auth/updateUser').patch(updateUser);
router.route('/users').get(getUsers);
router.route('/users/:id').get(getUser);

export default router;
