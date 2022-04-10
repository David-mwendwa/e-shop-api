import { StatusCodes } from 'http-status-codes';
import Product from '../models/Product.js';
import { BadRequestError, NotFoundError } from '../errors/index.js';

const createProduct = async (req, res) => {
  const { name, description, countInStock } = req.body;
  if (!name || !description || !countInStock) {
    throw new BadRequestError('Please provide name, description, count');
  }
  let product = new Product(req.body);
  product = await product.save();
  res.status(StatusCodes.CREATED).json({ product });
};

const getProducts = async (req, res) => {
  const products = await Product.find({});
  res.status(StatusCodes.OK).json({ success: true, products });
};

const getProduct = async (req, res) => {
  res.send('getProduct');
};

const updateProduct = async (req, res) => {
  res.send('updateProduct');
};

const deleteProduct = async (req, res) => {
  res.send('deleteProduct');
};

export { createProduct, getProducts, getProduct, updateProduct, deleteProduct };
