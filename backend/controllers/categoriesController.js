import { StatusCodes } from 'http-status-codes';
import Category from '../models/Category.js';

const createCategory = async (req, res) => {
  try {
    let category = new Category({
      name: req.body.name,
      icon: req.body.icon,
      color: req.body.color,
    });
    category = await category.save();
    if (!category) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ success: false, message: 'category cannot be created' });
    }
    res.status(StatusCodes.CREATED).json({ category });
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ success: false, eror: error });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(StatusCodes.OK).json({ count: categories.length, categories });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ success: false, error: error });
  }
};

const getCategory = async (req, res) => {
  try {
    let { id: categoryId } = req.params;
    const category = await Category.findById(categoryId);
    if (!category) {
      res.status(StatusCodes.NOT_FOUND).json({
        sucess: false,
        message: `No category with the id ${categoryId}`,
      });
    }
    res.status(StatusCodes.OK).json({ success: true, category });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ success: false, error: error });
  }
};

const updateCategory = async (req, res) => {
  try {
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
      res.status(StatusCodes.NOT_FOUND).json({
        sucess: false,
        message: `No category with the id ${categoryId}`,
      });
    }
    res.status(StatusCodes.OK).json({ success: true, category });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ success: false, error: error });
  }
};

const deleteCategory = async (req, res) => {
  try {
    let { id: categoryId } = req.params;
    const category = await Category.findOneAndRemove({ _id: categoryId });
    if (!category) {
      res.status(StatusCodes.NOT_FOUND).json({
        sucess: false,
        message: `No category with the id ${categoryId}`,
      });
    }
    res
      .status(StatusCodes.OK)
      .json({ sucess: true, message: 'Category deleted successfully' });
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ success: false, eror: error });
  }
};

export {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
