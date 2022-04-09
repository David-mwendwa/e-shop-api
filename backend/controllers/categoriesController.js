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
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: 'category cannot be created' });
  }
  res.status(StatusCodes.CREATED).json({ category });
};

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(StatusCodes.OK).json({ count: categories.length, categories });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ msg: 'something went wrong' });
  }
};

const deleteCategory = async (req, res) => {
  try {
    let { id: categoryId } = req.params;
    await Category.findOneAndRemove({ _id: categoryId });
    res.status(StatusCodes.OK).json({ msg: 'Category deleted successfully' });
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ msg: 'something went wrong' });
  }
};

export { createCategory, getCategories, deleteCategory };
