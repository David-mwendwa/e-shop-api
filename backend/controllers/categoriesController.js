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
  res.send('getCategories');
};

export { createCategory, getCategories };
