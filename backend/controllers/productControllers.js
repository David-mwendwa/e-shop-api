import { StatusCodes } from 'http-status-codes';
import Product from '../models/Product.js';

const createProduct = (req, res) => {
  const product = new Product({
    name: req.body.name,
    image: req.body.image,
    countInStock: req.body.countInStock,
  });
  product
    .save()
    .then((createdProduct) => {
      res.status(StatusCodes.CREATED).json(createdProduct);
    })
    .catch((error) => {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: error.message,
        success: false,
      });
    });
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(StatusCodes.CREATED).json(products);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: error,
      success: false,
    });
  }
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
