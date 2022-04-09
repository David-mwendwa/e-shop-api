import express from 'express';
const router = express.Router();

import {
  getCategories,
  createCategory,
  deleteCategory,
} from '../controllers/categoriesController.js';

router.route('/').post(createCategory).get(getCategories);
router.route('/:id').delete(deleteCategory);

export default router;
