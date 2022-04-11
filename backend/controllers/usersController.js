import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { BadRequestError, NotFoundError } from '../errors/index.js';

const registerUser = async (req, res) => {
  const { name, email, password, phone } = req.body;
  // if (!name || !email || !password || !phone) {
  //   throw new BadRequestError('Please fill in the required fields');
  // }
  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    throw new BadRequestError('Email already in use');
  }
  let user = new User(req.body);
  user = await user.save();
  res.status(StatusCodes.CREATED).json({ user });
};

const loginUser = async (req, res) => {
  res.send('loginUser');
};

const updateUser = async (req, res) => {
  res.send('updateUser');
};

export { registerUser, loginUser, updateUser };
