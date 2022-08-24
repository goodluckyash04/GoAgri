const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });
const database = process.env.DATABASE
const connectToMongo= ()=>{
     mongoose.connect(database)
    console.log("Connected to Mongo")

}

module.exports=connectToMongo;