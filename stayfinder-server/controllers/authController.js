import jwt from 'jsonwebtoken';
import User from '../models/user.js'
import bcrypt from 'bcryptjs';

function genrateToken(id){
    try {
      return jwt.sign({id},process.env.JWT_KEY,{ expiresIn: "1d"}) 
    } catch (e) {
        console.log("at token genration!!",e);
    }
}


const signup = async (req,res) => {
    try {
        const {name , email , password , role} = req.body;
        const checkUser = await User.findOne({email});
        if(checkUser) return res.status(400).json({message:'User Exists. Login'});
        const hpass = await bcrypt.hash(password,10);
        const createdUser = await User.create({
            name,
            email,
            password: hpass,
            role
        })
        res.status(200)
          .cookie('token', genrateToken(createdUser._id), {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'None', 
            maxAge: 2 * 24 * 60 * 60 * 1000
          })
          .json({
            message: `Welcome back ${createdUser.name}`,
            user: createdUser,
          });
    } catch (e) {
        console.log("at signup",e);
        res.status(300).json({error:e})
    }
}

const signin = async (req,res) => {
    try {
        const {email , password ,role} = req.body;
        const checkUser = await User.findOne({email});
        if(!checkUser) return res.status(400).json({message:'User Not Found.'});
        if(checkUser.role !== role) return res.status(400).json({message: 'Please check your role...'})
        const ismathc = await bcrypt.compare(password,checkUser.password);
        if(!ismathc) return res.status(401).json({ message: 'Invalid Password...' });

        res.status(200)
          .cookie('token', genrateToken(checkUser._id), {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'None', 
            maxAge: 2 * 24 * 60 * 60 * 1000
          })
          .json({
            message: `Welcome back ${checkUser.name}`,
            user: checkUser,
          });
    } catch (e) {
        console.log("at signup",e);
        res.status(300).json({error:e})
    }
}

const logout = async (req, res) => {
  try {
    return res.clearCookie('token', {
      httpOnly: true,
      secure: true,        
      sameSite: 'strict',  
      path: '/',          
    }).json({ message: 'Logged out' });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};




export { signup , signin , logout }