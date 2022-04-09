import { StatusCodes } from 'http-status-codes';
import User from '../models/User.js';

const registerUser = async (req, res) => {
  res.send('registerUser');
};

const loginUser = async (req, res) => {
  res.send('loginUser');
};

const updateUser = async (req, res) => {
  res.send('updateUser');
};

export { registerUser, loginUser, updateUser };
