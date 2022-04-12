import express from 'express';
const router = express.Router();

import {
  createOrder,
  getOrders,
  getSingleOrder,
  updateOrder,
  deleteOrder,
  getTotalSales,
  getOrderCount,
} from '../controllers/ordersController.js';

router.route('/').post(createOrder).get(getOrders);
router.route('/totalSales').get(getTotalSales);
router.route('/count').get(getOrderCount);
router.route('/:id').get(getSingleOrder).patch(updateOrder).delete(deleteOrder);

export default router;
