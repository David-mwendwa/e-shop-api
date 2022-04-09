import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({});

export default mongoose.model('Order', orderSchema);
