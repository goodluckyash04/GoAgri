const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderListSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    orderId:{
        type:String,
        required:true
    },
    total:{
        type:Number,
        required:true
    },
    date:{
        type:String,
        // default:Date.now()
    }
});

const OrderList=mongoose.model('orderlist',orderListSchema)
module.exports=OrderList