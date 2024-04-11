import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/user.js';



export const register = async(req,res) =>{
    try{
        const {username,password} = req.body;
        const salt = await bcrypt.genSalt();
        const Hash = await bcrypt.hash(password,salt)
        const newUser = new User({
            username,
            password : Hash,
        });
        const savedUser = await newUser.save();
        res.status(200).json(savedUser)
    }
    catch(err){
        res.status(500).json(err);
    }
}



export const login = async(req,res) =>{
    const {username,password} = req.body;
    const userDoc = await User.findOne({username});
    if(!userDoc) return res.status(400).json({msg : "Not Found"})
    const isMatch = await bcrypt.compare(password,userDoc.password)
    delete userDoc.password
    if(!isMatch) return res.status(400).json({msg:"Wrong Password"})
    else{
        jwt.sign({username,id:userDoc._id},process.env.SECRET,{},(err,token)=>{
            if(err) throw err;
            res.json({
                id:userDoc._id,
                username,
                token
            });
        })
    }
}

export const check = async(req,res)=>{
    const header = req.headers;
    const token = header?.authorization.split(' ')[1];
    if(!token) return res.json('')
    try{
        jwt.verify(token,process.env.SECRET,{},(err,info)=>{
            if(err) throw err;
            res.json(info);
        })
    }
    catch(err){
        console.log(err)
    }
}

