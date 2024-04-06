const express = require('express');
const router = express.Router();
const {  validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');
const Cart = require('../Models/Cart');

//......................Fetch Orders.....................
router.get('/fetchcart',fetchuser, async (req,res)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    let list=await Cart.find({user:req.user.id})
    if(!list){
      return res.status(400).json({error:"User Not Found"});
    }
    res.json(list)
  } catch (error) {
    console.log(error.msg)
    res.status(500).send("Internal Server Error")
  }
})

//......................Add orders...............
router.post('/addtocart',fetchuser, async (req,res)=>{
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let {title,price,quantity} =req.body
      let product=await Cart.find({title})
      if(product){
        const usid= product.map((x)=>{return x.user.toString()})
        if(usid.includes(req.user.id)){
          return res.status(400).json({error:"Product Exists"});
        }
      }
        product =  await Cart.create({title,price,quantity,user:req.user.id})
        success=true
        res.json({success:success,product})
      
    } catch (error) {
      console.log(error.msg)  
      res.status(500).send("Internal Server Error")
    }
  })

  //...........................Delete Product............
  router.delete('/deletecartorder/:id',fetchuser, async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let product=await Cart.findById(req.params.id)
      if(!product){
        return res.status(400).json({error:"Product Not Found"});
      }
      if(product.user.toString()!==req.user.id){
        return res.status(404).send("Please try again")
      }
      product = await Cart.findByIdAndDelete(req.params.id)
      res.json({ "success":"Product Deleted",product})
    } catch (error) {
      console.log(error.msg)
      res.status(500).send("Internal Server Error")
    }
  })

module.exports=router