import express from 'express';
const router = express.Router();

import {
  createOrder,
  getOrders,
  getSingleOrder,
} from '../controllers/ordersController.js';

router.route('/').post(createOrder).get(getOrders);
router.route('/:id').get(getSingleOrder);

export default router;
