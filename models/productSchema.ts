import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  orgId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "organization",
    required: true,
    index: true,
  },
  name: { type: String, required: true },
  category: String,
  description: String,
  price: { type: Number, required: true },
  sku: { type: String, unique: true },
  images: [{
    imageUrl: {type:String, required: true},
    imageId: {type:String, required: true}
  }],
  stockQuantity: { type: Number, default: 0 },
  status: {
    type: String,
    enum: ["active", "inactive", "out_of_stock"],
    default: "active",
  },
});


const productModel = mongoose.models.products || mongoose.model("products", productSchema);

export default productModel;