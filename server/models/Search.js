import mongoose from 'mongoose';

const searchSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  term: {
    type: String,
    required: true,
    trim: true,
    lowercase: true, 
  },
}, { timestamps: true });

export default mongoose.model('Search', searchSchema);