const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    title:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    }
});

const Cart=mongoose.model('cart',cartSchema)
module.exports=Cart