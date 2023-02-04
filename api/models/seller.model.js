import mongoose, { model } from "mongoose";

const SellerSchema = new mongoose.Schema(
	{
	  seller_id: {
      type: String,
      unique: true,
	  },
	  seller_zip_code_prefix: {
		  type: Number,
		},
	  seller_city: {
		  type: String,
	  },
    seller_state: {
		  type: String,
	  }
	},
	{ timestamps: true }
  );

export default model('Seller', SellerSchema);
