import mongoose from "mongoose";

const { Schema } = mongoose;

const productVariantSchema = new Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true
    },
    color: {
        type: String,
        required: true
    },
    images:{
        type:[String]
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
        required:true
    },
    salePrice:{
        type:Number,
        default: 0,
        min: 0
    },
    specificationId: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true
    },
});

const ProductVariant = mongoose.model('ProductVariant', productVariantSchema);

export default ProductVariant;
