const mongoose =require('mongoose');
const { Schema } = mongoose;

const wishlistSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    title:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    }
})

const Wishlist=mongoose.model('wishlist',wishlistSchema)
module.exports = Wishlist