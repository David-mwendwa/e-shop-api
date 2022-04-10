import { StatusCodes } from 'http-status-codes';
import Category from '../models/Category.js';

const createCategory = async (req, res) => {
  let category = new Category({
    name: req.body.name,
    icon: req.body.icon,
    color: req.body.color,
  });
  category = await category.save();
  if (!category) {
    throw new Error('category cannot be created');
  }
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
    throw new Error(`No category with the id ${categoryId}`);
  }
  res.status(StatusCodes.OK).json({ success: true, category });
};

const updateCategory = async (req, res) => {
  let { id: categoryId } = req.params;
  const category = await Category.findByIdAndUpdate(
    categoryId,
    {
      name: req.body.name,
      icon: req.body.icon,
      color: req.body.color,
    },
    { new: true, runValidators: true }
  );
  if (!category) {
    throw new Error(`No category with the id ${categoryId}`);
  }
  res.status(StatusCodes.OK).json({ success: true, category });
};

const deleteCategory = async (req, res) => {
  let { id: categoryId } = req.params;
  const category = await Category.findOneAndRemove({ _id: categoryId });
  if (!category) {
    throw new Error(`No category with the id ${categoryId}`);
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
