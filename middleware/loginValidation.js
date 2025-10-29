import User from "../models/userData.js";




async function userValidation(req,res,next){
    // console.log(req.body)
    const {username, password}=req.body;
    const db=await User.findOne({username});
    if(username==db.username&&password==db.password){
        req.data={username};
        next();
    }
    else{
        return res.status(400).json({
        success: false,
        message: `Invalid Credentials!`,
      });
    }
}


const logVel=userValidation;
export{logVel};