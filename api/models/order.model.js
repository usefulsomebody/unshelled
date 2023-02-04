import mongoose, { model } from 'mongoose';

const OrderSchema = new mongoose.Schema(
  {
    order_id: {
      type: String,
      required: true,
      unique: true,
    },
    order_item_id: {
      type: Number,
      equired: true,
    },
    product_id: {
      type: String,
      equired: true,
    },
    seller_id: {
      type: String,
      required: true,
    },
    shipping_limit_date: {
      type: Date,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    freight_value: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default model('Order', OrderSchema);
