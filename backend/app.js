import dotenv from 'dotenv';
import morgan from 'morgan';
import express from 'express';
const app = express();
dotenv.config();

import productRouter from './routes/productRoutes.js';

import connectDB from './db/connectDB.js';

// middleware
app.use(express.json());
app.use(morgan('dev'));

// routes
app.use('/api/v1/products', productRouter);

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
