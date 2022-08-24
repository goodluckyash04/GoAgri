const express = require('express')
const bcrypt = require('bcrypt'); //password hashing
const jwt=require('jsonwebtoken') //token Generation
const router = express.Router()
const Admin =require('../Models/Admin')
const { body, validationResult } = require('express-validator');//validation
const secretkey = process.env.SECRETKEY;

//post("url",[],(req,res)=>{})
// ..................... Create admin by api/auth/createadmin .....POST Method......... 
router.post(
  '/createadmin',
 [ body('email',"Insert Valid Email").isEmail(),
  body('password',"password must have 5 character").isLength({ min: 5 }),
  body('name',"name must be min 3 char").isLength({min:3})],
  async (req, res) => {
    //.................... Error Messages/ Bad Requests.........
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // ....................Password Hashing(bcrypt)..............
  const salt =await bcrypt.genSalt(10)
   const finalpassword =await bcrypt.hash(req.body.password,salt)

   //......................Create Admin...........................
    try{
   //.....................Check fors Unique Email................ 
      let admin =await Admin.findOne({email:req.body.email})
      if(admin){
       return res.status(400).json({success:success,error:"Email Already in Use"})
      }
      admin=await Admin.create({
        name: req.body.name,
        password:finalpassword,
        email: req.body.email,
      })
     
      const data={
        admin:admin.id
      }
      const authToken= jwt.sign(data,secretkey)
      success=true
      res.json({success:success,authToken})
    }catch(error){
      console.error(error.msg);
      res.status(500).send("Internal Server Error"); 
    }
   
  },
);

// ..................... Authenticate Admin by api/auth/adminlogin .....POST Method......... 

router.post('/adminlogin',[
  body('email',"Enter Valid Email").isEmail(),
  body('password',"Password can not be blank").exists()
],async (req,res)=>{
  let success= false;
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success:success,errors: errors.array() });
    }
    try{
      //...................Check Email in database................
      let admin=await Admin.findOne({email:req.body.email})
      if(!admin){
        return res.status(400).json({error:"User Not Found"})
      }
      //...................compare password................      
      let password=await bcrypt.compare(req.body.password,admin.password)
      if(!password){
        return res.status(400).json({error:"Check Your Password again"})
      }
      const data={
        admin:{
          id:admin.id
        }
      }
      const authToken=jwt.sign(data,secretkey)
      success = true;
      res.json({success:success,authToken})
    }catch(errors){
      console.log(errors.msg)
      res.status(500).send("Internal server Error")
    }
})


module.exports=router