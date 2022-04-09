import express from 'express';
const router = express.Router();

import {
  getCategories,
  createCategory,
} from '../controllers/categoriesController.js';

router.route('/').post(createCategory).get(getCategories);

export default router;
