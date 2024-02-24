import mongoose from "mongoose";

const { Schema } = mongoose;

const productVariantSchema = new Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
    color: {
        type: String,
        required: true
    },
    images:{
        type:Array,
    },
    stock:{
        type:Number,
        default: 0,
        min: 0
    },
    regularPrice:{
        type:Number,
        default: 0,
        min: 0
    },
    varientName:{
        type:String,
    },
    salePrice:{
        type:Number,
        default: 0,
        min: 0
    },
    specification: {
        type:Array
    },
});

const ProductVariant = mongoose.model('ProductVariant', productVariantSchema);

export default ProductVariant;
