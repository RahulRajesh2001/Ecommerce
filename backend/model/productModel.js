import mongoose from 'mongoose';

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    brand:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    createdDate: {
        type: Date,
        required: true,
        default: Date.now
      },
      updatedDate: {
        type: Date,
        default: Date.now
      }
})

const Product=mongoose.model('Product',productSchema)
export default Product;