import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema(
  {
    customer: {
      type: String,
      maxlength: 60,
    },
    address: {
      type: String,
      maxlength: 200,
    },
    total: {
      type: Number,
    },
    status: {
      type: Number,
      default: 0,
    },
    method: {
        type: Number,
      },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
