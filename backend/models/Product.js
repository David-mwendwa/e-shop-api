import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  countInStock: {
    type: Number,
    required: true,
  },
});

export default mongoose.model('Product', productSchema);
