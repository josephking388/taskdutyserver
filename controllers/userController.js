const userModel = require('../model/userModel');
const jwt = require("jsonwebtoken")

//registration function



const registration = async(req,res)=>{
    try {
      const {name,email,password} = req.body;
      if(!name || !email ||!password){
          res.status(400).json({success:false,message:'all fields are required to register'});
          return;
      }
      const registeration = await userModel.create({...req.body})
      res.status(201).json({success:true,message:'registered successfully', registeration})
    } catch (error) {
        // if(error.code === 11000){
        //     res.status(400).json({success:false,message:"Email address already in use"});
        //     return
        // }
      res.status(500).json({error})
      console.log(error.message);
      
    }
};

//login function
const login = async (req,res)=>{
    try {
    const {email,password} = req.body;
    if(!email || !password){
        res.status(400).json({success:false,message:'all fields are required to login'});
        return;
    };


//finding a reg email and validating the email
const user = await userModel.findOne({email});
if(!user){
    res.status(400).json({success:false,
        message:"wrong credentials"});
        return;
}

//comparing password a reg email and validating the password
const auth = await user.comparePassword
(password);
if(!auth){
res.status(400).json({success:false,message:"wrong credentials"});
return;
}
//token
const token = await user.generateToken();
console.log(token);
if(token){
    res.status(200).json({user:{
    name:user.name,
    email:user.email
    },
    success:true,
    message:"logged in successfully",
    token
    
    
})
    return;
}

} catch (error){
    res.status(500).send(error.message)

    }
}

//isLoggedIn ftn
const isLoggedin = (req,res)=>{
    try {
        const authHeader = req.headers.authorization
        const token = authHeader.split(" ")[1];
        if(!token){
            return res.json(false)
        }

        jwt.verify(token,process.env.JWT_SECRETE);
        res.json(true)

    }catch (error) {
        res.json(false);
        console.log(error.message);
    }
}

module.exports = { 
    registration,
    login,
    isLoggedin

}