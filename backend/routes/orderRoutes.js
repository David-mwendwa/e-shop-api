import express from 'express';
const router = express.Router();

import { getOrders } from '../controllers/ordersController.js';

router.route('/').get(getOrders);

export default router;
