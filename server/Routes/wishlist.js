const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');
const Wishlist = require('../Models/Wishlist');



//......................Fetch Wishlist..................
router.get('/fetchwishlist',fetchuser, async (req,res)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    let list=await Wishlist.find({user:req.user.id})
    if(!list){
      return res.status(400).json({error:"User Not Found"});
    }
    res.json(list)
  } catch (error) {
    console.log(error.msg)
    res.status(500).send("Internal Server Error")
  }
})

//......................Add Product to wishlist ...............
router.post('/addwishlist',fetchuser, async (req,res)=>{
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let {title,price} =req.body
      let product=await Wishlist.find({title})
      if(product){
        const usid= product.map((x)=>{return x.user.toString()})
        if(usid.includes(req.user.id)){
          return res.status(400).json({error:"Product Exists"});
        }
      }
        product =  await Wishlist.create({title,price,user:req.user.id})
        success=true
        res.json({success:success,product})
      
    } catch (error) {
      console.log(error.msg)  
      res.status(500).send("Internal Server Error")
    }
  })
  //......................delete Product to wishlist ...............
router.delete('/deletewishlist/:id',fetchuser, async (req,res)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    let product=await Wishlist.findById(req.params.id)
    if(!product){
      return res.status(400).json({error:"Product Not Found"});
    }
    if(product.user.toString()!==req.user.id){
      return res.status(404).send("Please try again")
    }
    product = await Wishlist.findByIdAndDelete(req.params.id)
    res.json({ "success":"Product Deleted",product})
  } catch (error) {
    console.log(error.msg)
    res.status(500).send("Internal Server Error")
  }
})

module.exports=router