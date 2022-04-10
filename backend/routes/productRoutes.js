import express from 'express';
const router = express.Router();

import {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  getFeaturedProducts,
} from '../controllers/productsController.js';

router.route('/featured/:count').get(getFeaturedProducts);
router.route('/').post(createProduct).get(getProducts);
router.route('/:id').get(getProduct).patch(updateProduct).delete(deleteProduct);

export default router;
