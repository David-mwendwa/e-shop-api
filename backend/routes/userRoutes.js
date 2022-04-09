import express from 'express';
const router = express.Router();

import {
  registerUser,
  loginUser,
  updateUser,
} from '../controllers/usersController.js';

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/updateUser').patch(updateUser);

export default router;
