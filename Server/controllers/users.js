import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import Users from '../models/users.js'

export const signin = async (req,res) =>{
    const {email , password} =req.body;

    try {
        const existingUser = await Users.findOne({email});
        if(!existingUser) return res.status(404).json({message: "User doesn't exist."});

        const isPasswordCorrect = await bcrypt.compare(password,existingUser.password);
        if(!isPasswordCorrect) return res.status(400).json({message: "Incorrect Password."});

        const token = jwt.sign({email:existingUser.email, id:existingUser._id,username:existingUser.username},'test',{expiresIn:'1h'});

        res.status(200).json({result:existingUser,token});
    } catch (error) {
        res.status(500).json({ message:error});
    }
}

export const signup = async (req,res) =>{
    const {email ,username, password, confirmPassword, firstName, lastName} =req.body;

    try {
        const existingUser = await Users.findOne({email});
        if(existingUser) return res.status(400).json({message: "User already exist."});

        const uname = await Users.findOne({username});
        if(uname) return res.status(400).json({message:"Username is already taken."});
       
        if(password!==confirmPassword) return res.status(400).json({message: "Passwords don't match."});

        const hashedPassword = await bcrypt.hash(password,12);

        const result = await Users.create({email,username,password:hashedPassword,name:`${firstName} ${lastName}`});

        const token = jwt.sign({email:result.email, id:result._id,username:result.username},'test',{expiresIn:'1h'});
        
        res.status(200).json({result,token});
    } catch (error) {
        
    }
}