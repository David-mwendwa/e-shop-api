import { StatusCodes } from 'http-status-codes';
import Order from '../models/Order.js';

const getOrders = async (req, res) => {
  res.send('getOrders');
};

export { getOrders };
