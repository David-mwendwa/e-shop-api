import express from 'express';
const router = express.Router();

import {
  createCategory,
  getCategories,
  getCategory,
  deleteCategory,
} from '../controllers/categoriesController.js';

router.route('/').post(createCategory).get(getCategories);
router.route('/:id').get(getCategory).delete(deleteCategory);

export default router;
