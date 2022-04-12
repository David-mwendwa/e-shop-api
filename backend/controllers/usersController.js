import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} from '../errors/index.js';
import mongoose from 'mongoose';

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
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError('Please provide email and password');
  }
  const user = await User.findOne({ email: email });
  if (!user) {
    throw new UnauthenticatedError('Incorrect password or email');
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Incorrect password or email');
  }
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user: user.email, token });
};

const getUsers = async (req, res) => {
  const users = await User.find({}).select('-password');
  res.status(StatusCodes.OK).json({ users });
};

const getUser = async (req, res) => {
  const { id: userId } = req.params;
  const isUserIdValid = mongoose.isValidObjectId(userId);
  if (!isUserIdValid) {
    throw new BadRequestError(`user Id is invalid`);
  }
  const user = await User.findOne({ _id: userId }).select('-password');
  if (!user) {
    throw new NotFoundError(`No user found with id: ${userId}`);
  }
  res.status(StatusCodes.OK).json({ user });
};

// TODO: add a route to get user count -> DONE!!
const getUserCount = async (req, res) => {
  const userCount = await User.countDocuments({});
  res.status(StatusCodes.OK).json({ userCount });
};

const updateUser = async (req, res) => {
  res.send('updateUser');
};

const deleteUser = async (req, res) => {
  const { id: userId } = req.params;
  const isUserIdValid = mongoose.isValidObjectId(userId);
  if (!isUserIdValid) {
    throw new BadRequestError(`product Id is invalid`);
  }
  let product = await Product.findByIdAndRemove(userId);
  if (!product) {
    throw new NotFoundError(`No user with id ${userId}`);
  }
  res.status(StatusCodes.OK).json({ success: true, msg: 'user deleted' });
};

export {
  registerUser,
  loginUser,
  updateUser,
  getUsers,
  getUser,
  getUserCount,
  deleteUser,
};
