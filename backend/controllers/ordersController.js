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

  let totalPrices = Promise.all(
    (await orderItemIds).map(async (orderItemId) => {
      const orderItem = await OrderItem.findById(orderItemId).populate(
        'product',
        'price'
      );
      return orderItem.product.price * orderItem.quantity;
    })
  );
  totalPrices = await totalPrices;
  const totalPrice = totalPrices.reduce((acc, curr) => acc + curr, 0);

  let order = new Order({ ...req.body, orderItems: orderItemIds, totalPrice });
  order = await order.save();
  if (!order) {
    throw new BadRequestError('something went wrong');
  }
  res.status(StatusCodes.CREATED).json({ order });
};

const getOrders = async (req, res) => {
  const orders = await Order.find({})
    .populate('user', ['name', 'email'])
    .sort({ dateOrdered: -1 });

  res.status(StatusCodes.OK).json({ orders });
};

const getSingleOrder = async (req, res) => {
  const { id: orderId } = req.params;
  const order = await Order.findById(orderId)
    .populate('user', ['name', 'email'])
    .populate({
      path: 'orderItems',
      populate: { path: 'product', populate: 'category' },
    });

  res.status(StatusCodes.OK).json({ order });
};

const updateOrder = async (req, res) => {
  let { id: orderId } = req.params;
  const { status } = req.body;
  let order = await Order.findOne({ _id: orderId });
  console.log(order);
  if (!order) {
    throw new NotFoundError(`No order with the id ${orderId}`);
  }
  order = await Order.findByIdAndUpdate(
    orderId,
    { status },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(StatusCodes.OK).json({ success: true, order });
};

const deleteOrder = async (req, res) => {
  let { id: orderId } = req.params;
  const order = await Order.findOneAndRemove({ _id: orderId });
  if (!order) {
    throw new NotFoundError(`No category with the id ${orderId}`);
  }
  await order.orderItems.map(async (orderItem) => {
    await OrderItem.findOneAndRemove(orderItem);
  });
  res.status(StatusCodes.OK).json({ sucess: true, message: 'Order Deleted!' });
};

const getTotalSales = async (req, res) => {
  const totalSales = await Order.aggregate([
    { $group: { _id: null, totalSales: { $sum: '$totalPrice' } } },
  ]);
  if (!totalSales) {
    throw new NotFoundError('The order sales cannot be generated');
  }
  res.status(StatusCodes.OK).json({ totalSales: totalSales.pop().totalSales });
};

const getOrderCount = async (req, res) => {
  const orderCount = await Order.countDocuments({});
  res.status(StatusCodes.OK).json({ orderCount });
};

// TODO: Create a route for the admin to get _all user orders_ & _orders by Id_ 

export {
  createOrder,
  getOrders,
  getSingleOrder,
  updateOrder,
  deleteOrder,
  getTotalSales,
  getOrderCount,
};
