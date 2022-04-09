import express from 'express';
const router = express.Router();

import {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/categoriesController.js';

router.route('/').post(createCategory).get(getCategories);
router
  .route('/:id')
  .get(getCategory)
  .patch(updateCategory)
  .delete(deleteCategory);

export default router;
