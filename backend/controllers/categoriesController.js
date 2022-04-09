import { StatusCodes } from 'http-status-codes';
import Category from '../models/Category.js';

const getCategories = async (req, res) => {
  res.send('getCategories');
};

export { getCategories };
