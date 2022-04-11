import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'please provide a name'],
  },
  email: {
    type: String,
    required: [true, 'please provide an email'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email address',
    ],
  },
  passwordHash: {
    type: String,
    required: [true, 'please provide a password'],
  },
  phone: {
    type: String,
    required: [true, 'please provide a phone number'],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  street: {
    type: String,
    default: '',
  },
  apartment: {
    type: String,
    default: '',
  },
  zip: {
    type: String,
    default: '',
  },
  city: {
    type: String,
    default: '',
  },
  country: {
    type: String,
    default: '',
  },
});

userSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

userSchema.set('toJSON', {
  virtuals: true,
});

export default mongoose.model('User', userSchema);
