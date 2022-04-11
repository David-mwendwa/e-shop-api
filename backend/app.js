import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import 'express-async-errors';
import express from 'express';
const app = express();
dotenv.config();

import productRouter from './routes/productRoutes.js';
import userRouter from './routes/userRoutes.js';
import categoryRouter from './routes/categoryRoutes.js';
import orderRouter from './routes/orderRoutes.js';

import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';

import connectDB from './db/connectDB.js';

// cors
app.use(cors());
app.options('*', cors());

// middleware
app.use(express.json());
app.use(morgan('dev'));

// routes
app.use('/api/v1/products', productRouter);
app.use('/api/v1', userRouter);
app.use('/api/v1/categories', categoryRouter);
app.use('/api/v1/orders', orderRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// db connection
const port = process.env.PORT || 5000;
(async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`server listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
})();
