import express from 'express';
const router = express.Router();
import auth from '../middleware/auth.js';
import { uploadOptions } from '../utils/multer.js';

import {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  getFeaturedProducts,
  uploadProductGallery,
} from '../controllers/productsController.js';

router.route('/featured/:count').get(getFeaturedProducts);
router
  .route('/gallery-images/:id')
  .patch(uploadOptions.array('images', 10), uploadProductGallery);
router
  .route('/')
  .post(uploadOptions.single('image'), createProduct)
  .get(getProducts);
router
  .route('/:id')
  .get(getProduct)
  .patch(uploadOptions.single('image'), updateProduct)
  .delete(deleteProduct);

export default router;
