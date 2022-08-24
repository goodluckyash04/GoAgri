const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const fetchadmin = require("../middleware/fetchadmin");
const Product = require("../Models/product");



//..............................Fetch Product of admin.............
router.get("/fetchproducts",fetchadmin,async (req,res)=>{
  try {
    const products=await Product.find({admin:req.user.id})
    res.json(products)
  } catch (error) {
    console.log(error.msg);
    res.status(500).send("Internal Server Error");
  }
})


// .............................ADD Product....................
router.post('/addproduct',[
  body('title','title must have 4 char').isLength({min:4}),
  body('price','price must have 1 char').isLength({min:1}),
  body('quantity','quantity must have 1 char').isLength({min:1})
],fetchadmin, async (req,res)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    let {title,price,category,imageURL,quantity} =req.body
    let product=await Product.findOne({title})
    if(product){
      return res.status(400).json({error:"Product Already Exists"});
    }
    product =  await Product.create({title,price,category,imageURL,quantity,admin:req.user.id})
    res.json(product)
  } catch (error) {
    console.log(error.msg)
    res.status(500).send("Internal Server Error")
  }
})


//.....................Edit Product....................
router.put('/editproduct/:id',fetchadmin,async (req,res)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const {title,imageURL,category,price,quantity}=req.body
    let updatedProduct={};
    if(title){
      let product =await Product.findOne({title});
      if (product) {
        return res.status(400).json({ error: "Product Exists" });
      }
      updatedProduct.title=title
    }
    if(imageURL){
      updatedProduct.imageURL=imageURL
    }
    if(category){
      updatedProduct.category=category
    }
    if(price){
      updatedProduct.price=price
    }
    if(quantity){
      updatedProduct.quantity=quantity
    }
  let product = await Product.findById(req.params.id)
  if(!product){
    return res.status(404).send("product not found")
  }
  if(product.admin.toString()!=req.user.id){
    return res.status(404).send("Please try again")
  }
  product = await Product.findByIdAndUpdate(
    req.params.id,
    {$set:updatedProduct},
    {new:true})
    res.json({product})
  } catch (error) {
    console.log(error.msg);
      res.status(500).send("Internal Server Error");
  }
})


//.................................Delete Product...................s

router.delete('/deleteproduct/:id',fetchadmin,async(req,res)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    let product = await Product.findById(req.params.id)
    if(!product){
      return res.status(404).send("product not found")
    }
    if(product.admin.toString()!==req.user.id){
      return res.status(404).send("Please try again")
    }
product = await Product.findByIdAndDelete(req.params.id)
res.json({ "success":"Product Deleted"})
  } catch (error) {
    console.log(error.msg);
    res.status(500).send("Internal Server Error");
  }
})


//......................fetch all products for display..................
router.get("/fetchallproducts",async (req,res)=>{
  try {
    const allproducts=await Product.find({},{__v:0,admin:0})
    res.json(allproducts)
  } catch (error) {
    console.log(error.msg);
    res.status(500).send("Internal Server Error");
  }
})


//......................fetch product with id..................
router.get("/fetchproducts/:id",async (req,res)=>{
  try {
    const singleproduct=await Product.findById(req.params.id,{__v:0,admin:0})
    res.json(singleproduct)
  } catch (error) {
    console.log(error.msg);
    res.status(500).send("Internal Server Error");
  }
})





module.exports = router;

