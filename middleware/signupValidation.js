import User from "../models/userData.js";




// middleware/newUserValidation.js
export async function newUserValidation(req, res, next) {
  try {
    const { username, password } = req.body;

    // check if user exists
    const dup = await User.findOne({ username });
    if (dup) {
      return res.status(400).json({
        success: false,
        message: `${dup.username} already exists!`,
      });
    }

    // create user and attach info to request
    const newUser = await User.create({ username, password });
    req.data = newUser; // 

    next(); // 
  } catch (err) {
    console.error("Error in newUserValidation:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
}



const signVel=newUserValidation;
export{signVel};