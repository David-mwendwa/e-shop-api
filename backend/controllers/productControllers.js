import { StatusCodes } from 'http-status-codes';
import Product from '../models/Product.js';

const createProduct = async (req, res) => {
  const newProduct = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json(newProduct);
};

const getProducts = async (req, res) => {
  res.send('getAllProducts');
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
