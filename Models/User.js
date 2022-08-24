const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    name:{
        type:String,
        required:true,
      },
      email:{
        type:String,
        required:true,
        unique:true ,   
      },
      password:{
        type:String,
        required:true,
      },
      age:{
        type:Number
      },
      address:{ 
        type:String
      },
      gender:{
        type:String,
        possibleValues:["male","female"]
      }
     
});

const User=mongoose.model('user',userSchema)
module.exports=User;
