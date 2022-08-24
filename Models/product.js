const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
    admin:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"admin"
    },
    title:{
        type:String,
        required:true,
        unique:true
    },
    imageURL:{
        type:String
    },
    category:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    }

});
const Product = mongoose.model("Product",productSchema)
module.exports =Product