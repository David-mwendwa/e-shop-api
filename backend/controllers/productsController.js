import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import Product from '../models/Product.js';
import { BadRequestError, NotFoundError } from '../errors/index.js';

const createProduct = async (req, res) => {
  const { name, description, countInStock } = req.body;
  if (!name || !description || !countInStock) {
    throw new BadRequestError('Please provide name, description, count');
  }
  if (!req.file) {
    throw new BadRequestError('Please provide an image');
  }
  const fileName = req.file.filename;
  const basePath = `${req.protocol}://${req.get('host')}/public/upload/`;
  const imagePath = `${basePath}${fileName}`;

  let product = new Product({ ...req.body, image: imagePath });
  product = await product.save();
  res.status(StatusCodes.CREATED).json({ product });
};

const getProducts = async (req, res) => {
  let filter = {};
  const { categories } = req.query;
  if (categories) {
    filter = { category: categories.split(',') };
  }
  const products = await Product.find(filter).populate('category');
  res.status(StatusCodes.OK).json({ products });
};

const getProduct = async (req, res) => {
  const { id: productId } = req.params;
  const isProductIdValid = mongoose.isValidObjectId(productId);
  if (!isProductIdValid) {
    throw new BadRequestError(`product Id is invalid`);
  }
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
  const isProductIdValid = mongoose.isValidObjectId(productId);
  if (!isProductIdValid) {
    throw new BadRequestError(`product Id is invalid`);
  }
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
  const { id: productId } = req.params;
  const isProductIdValid = mongoose.isValidObjectId(productId);
  if (!isProductIdValid) {
    throw new BadRequestError(`product Id is invalid`);
  }
  let product = await Product.findByIdAndRemove(productId);
  if (!product) {
    throw new NotFoundError(`No product with id ${productId}`);
  }
  res.status(StatusCodes.OK).json({ success: true, msg: 'product deleted' });
};

const getFeaturedProducts = async (req, res) => {
  const count = req.params.count ? req.params.count : 0;
  const products = await Product.find({ isFeatured: true }).limit(+count);
  if (!products) {
    throw new BadRequestError('something went wrong');
  }
  res.status(StatusCodes.OK).json({ products });
};

export {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  getFeaturedProducts,
};
