const express = require('express');
const router = express.Router();
const {  validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');
const OrderList = require('../Models/OrderList');

//......................Fetch Orders.....................
router.get('/fetchorderlist',fetchuser, async (req,res)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    let list=await OrderList.find({user:req.user.id})
    if(!list){
      return res.status(400).json({error:"User Not Found"});
    }
    res.json(list)
  } catch (error) {
    console.log(error.msg)
    res.status(500).send("Internal Server Error")
  }
})


//...........................Add to Order List.................
router.post('/addtoorder',fetchuser, async (req,res)=>{
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let {orderId,total,date} =req.body
      
       let  product =  await OrderList.create({orderId,total,date,user:req.user.id})
        success=true
        res.json({success:success,product})
      
    } catch (error) {
      console.log(error.msg)  
      res.status(500).send("Internal Server Error")
    }
  })


  //...........................Delete Product............
  // router.delete('/deleteorderlist/:id',fetchuser, async (req,res)=>{
  //   const errors = validationResult(req);
  //   if (!errors.isEmpty()) {
  //     return res.status(400).json({ errors: errors.array() });
  //   }
  //   try {
  //     let product=await OrderList.findById(req.params.id)
  //     if(!product){
  //       return res.status(400).json({error:"Product Not Found"});
  //     }
  //     if(product.user.toString()!==req.user.id){
  //       return res.status(404).send("Please try again")
  //     }
  //     product = await OrderList.findByIdAndDelete(req.params.id)
  //     res.json({ "success":"Product Deleted",product})
  //   } catch (error) {
  //     console.log(error.msg)
  //     res.status(500).send("Internal Server Error")
  //   }
  // })

module.exports=router