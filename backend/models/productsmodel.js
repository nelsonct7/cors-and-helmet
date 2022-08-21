const mongoose=require('mongoose');

const productSchema=mongoose.Schema(
    {
        productName:{
            type:String,
            required:true
        },
        quantity:{
            type:Number,
            required:true
        },
        amount:{ 
            type:Number,
            required:true
        },
        productImage:{
            type:String
        }
    },
    {
        timestamps:true
    }
)
const ProductModel=mongoose.model('ProductModel',productSchema);

module.exports=ProductModel 