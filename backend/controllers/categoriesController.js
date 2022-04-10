import { StatusCodes } from 'http-status-codes';
import Category from '../models/Category.js';
import { BadRequestError, NotFoundError } from '../errors/index.js';

const createCategory = async (req, res) => {
  const { name, icon, color } = req.body;
  if (!name || !icon || !color) {
    throw new BadRequestError('Please provide all values');
  }
  let category = new Category({ name, icon, color });
  category = await category.save();
  res.status(StatusCodes.CREATED).json({ category });
};

const getCategories = async (req, res) => {
  const categories = await Category.find({});
  res.status(StatusCodes.OK).json({ count: categories.length, categories });
};

const getCategory = async (req, res) => {
  let { id: categoryId } = req.params;
  const category = await Category.findById(categoryId);
  if (!category) {
    throw new NotFoundError(`No category with the id ${categoryId}`);
  }
  res.status(StatusCodes.OK).json({ success: true, category });
};

const updateCategory = async (req, res) => {
  let { id: categoryId } = req.params;
  const { name, icon, color } = req.body;
  if (!name || !icon || !color) {
    throw new BadRequestError('Please provide all values');
  }
  let category = await Category.findOne({ _id: categoryId });
  if (!category) {
    throw new NotFoundError(`No category with the id ${categoryId}`);
  }
  category = await Category.findByIdAndUpdate(categoryId, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(StatusCodes.OK).json({ success: true, category });
};

const deleteCategory = async (req, res) => {
  let { id: categoryId } = req.params;
  const category = await Category.findOneAndRemove({ _id: categoryId });
  if (!category) {
    throw new NotFoundError(`No category with the id ${categoryId}`);
  }
  res
    .status(StatusCodes.OK)
    .json({ sucess: true, message: 'Category deleted successfully' });
};

export {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
