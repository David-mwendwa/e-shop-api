import express from 'express';
const router = express.Router();

import { createOrder, getOrders } from '../controllers/ordersController.js';

router.route('/').post(createOrder).get(getOrders);

export default router;
