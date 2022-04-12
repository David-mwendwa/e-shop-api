import { StatusCodes } from 'http-status-codes';
import Order from '../models/Order.js';
import { BadRequestError, NotFoundError } from '../errors/index.js';
import OrderItem from '../models/OrderItem.js';

const createOrder = async (req, res) => {
  let orderItemIds = Promise.all(
    req.body.orderItems.map(async (orderItem) => {
      let newOrderItem = new OrderItem({
        quantity: orderItem.quantity,
        product: orderItem.product,
      });
      newOrderItem = await newOrderItem.save();
      return newOrderItem._id;
    })
  );
  orderItemIds = await orderItemIds;

  let order = new Order({ ...req.body, orderItems: orderItemIds });
  order = await order.save();
  if (!order) {
    throw new BadRequestError('something went wrong');
  }
  res.status(StatusCodes.CREATED).json({ order });
};

const getOrders = async (req, res) => {
  res.send('getOrders');
};

export { getOrders, createOrder };
