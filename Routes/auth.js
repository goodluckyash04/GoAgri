const express = require('express')
const bcrypt = require('bcrypt'); //password hashing
const jwt=require('jsonwebtoken') //token Generation
const router = express.Router()
const User=require('../Models/User')
const { body, validationResult } = require('express-validator');//validation
const fetchuser = require('../middleware/fetchuser');
const secretkey = process.env.SECRETKEY;

//post("url",[],(req,res)=>{})
// ..................... Create User by api/auth/createuser .....POST Method......... 
router.post(
  '/createuser',
 [ body('email',"Insert Valid Email").isEmail(),
  body('password',"password must have 5 character").isLength({ min: 5 }),
  body('age',"age must be max 2 digit").isLength({max:2})],
  async (req, res) => {
    //.................... Error Messages/ Bad Requests.........
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // ....................Password Hashing(bcrypt)..............
  const salt =await bcrypt.genSalt(10)
   const finalpassword =await bcrypt.hash(req.body.password,salt)

   //......................Create User...........................
    try{
   //.....................Check fors Unique Email................ 
      let user =await User.findOne({email:req.body.email})
      if(user){
       return res.status(400).json({success:success,error:"Email Already in Use"})
      }
      user=await User.create({
        name: req.body.name,
        password:finalpassword,
        email: req.body.email,
        age:req.body.age, 
        address:req.body.address,
        gender:req.body.gender
      })
     
      const data={
        user:user.id
      }
      const authToken= jwt.sign(data,secretkey)
      success =true;
      res.json({success:success,authToken})
    }catch(error){
      console.error(error.msg);
      res.status(500).send("Internal Server Error"); 
    }
   
  },
);

// ..................... Authenticate User by api/auth/login .....POST Method......... 

router.post('/login',[
  body('email',"Enter Valid Email").isEmail(),
  body('password',"Password can not be blank").exists()
],async (req,res)=>{
  let success = false;
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try{
      //...................Check Email in database................
      let user=await User.findOne({email:req.body.email})
      if(!user){
        return res.status(400).json({error:"User Not Found"})
      }
      //...................compare password................      
      let password=await bcrypt.compare(req.body.password,user.password)
      if(!password){
        return res.status(400).json({error:"Check Your Password again"})
      }
      const data={
        user:{
          id:user.id
        }
      }
      const authToken=jwt.sign(data,secretkey)
      success=true;
      res.json({success:success,authToken})
    }catch(errors){
      console.log(errors.msg)
      res.status(500).send("Internal server Error")
    }
})

// ..................... Getuserdetail User by api/auth/getuser .....get Method.........(middleware) 
router.get('/getuser',fetchuser,async (req,res)=>{
  try{
    let user=await User.findById(req.user.id).select("-password")
    res.send(user)
  }catch(errors){
    console.log(errors.msg)
    res.status(500).send("Internal server Error")
  }

})
// ..................... get all User by api/auth/user .....get Method......... 

router.get('/users',async (req,res)=>{
  try {
    // const users=await User.find().select("-password")
     //instead of select we can use this projection where 0 is no display,1 is display
     const users=await User.find({},{__v:0,password:0})
    res.json(users)
  } catch (error) {
    console.log(error.msg)
    res.status(500).send("Internal server Error")
  }
})

//.................................Delete User...................s

router.delete('/deleteuser/:id', async(req,res)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    let user = await User.findById(req.params.id)
    if(!user){
      return res.status(404).send("user not found")
    }
    
user = await User.findByIdAndDelete(req.params.id)
res.json({ "success":"User Deleted"})
  } catch (error) {
    console.log(error.msg);
    res.status(500).send("Internal Server Error");
  }
})

// .........................Reset Pasword...............
router.put('/resetpassword/:id',fetchuser,async (req,res)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const {password}=req.body
    const salt =await bcrypt.genSalt(10)
    const mypassword=await bcrypt.hash(password,salt)
    let newpass={};

    if(password){
      newpass.password=mypassword
    }
  let user = await User.findById(req.params.id)
  if(!user){
    return res.status(404).send("user not found")
  }
  user = await User.findByIdAndUpdate(
    req.params.id,
    {$set:newpass},
    {new:true})
    res.json({user})
    console.log(user)
  } catch (error) {
    console.log(error.msg);
      res.status(500).send("Internal Server Error");
  }
})
// .........................Edit Account..............
router.put('/editaccount/:id',fetchuser,async (req,res)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const {name,email,age,gender,address}=req.body
    
    let newAcc={};

    if(name){
      newAcc.name=name
    }
    if(email){
      newAcc.email=email
    }
    if(age){
      newAcc.age=age
    }
    if(gender){
      newAcc.gender=gender
    }
    if(address){
      newAcc.address=address
    }
  let user = await User.findById(req.params.id)
  if(!user){
    return res.status(404).send("user not found")
  }
  user = await User.findByIdAndUpdate(
    req.params.id,
    {$set:newAcc},
    {new:true})
    res.json({user})
    console.log(user)
  } catch (error) {
    console.log(error.msg);
      res.status(500).send("Internal Server Error");
  }
})


module.exports=router