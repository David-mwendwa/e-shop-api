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
  res.status(StatusCodes.OK).json({ products });
};

const getProduct = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findOne({ _id: productId }).populate(
    'category'
  );
  if (!product) {
    throw new NotFoundError(`No product with id ${productId}`);
  }
  res.status(StatusCodes.OK).json({ product });
};

const updateProduct = async (req, res) => {
  const { id: productId } = req.params;
  let product = await Product.findOne({ _id: productId });
  if (!product) {
    throw new NotFoundError(`No product with id ${productId}`);
  }
  product = await Product.findByIdAndUpdate(productId, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(StatusCodes.OK).json({ product });
};

const deleteProduct = async (req, res) => {
  res.send('deleteProduct');
};

export { createProduct, getProducts, getProduct, updateProduct, deleteProduct };
