import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import Users from '../models/users.js'
import mongoose from 'mongoose';

export const signin = async (req,res) =>{
    const {emailOrUsername, password} =req.body;

    try {
        let existingUser;
        if(emailOrUsername.indexOf("@")>-1){
            existingUser = await Users.findOne({email:emailOrUsername});
        }
        else{
            existingUser = await Users.findOne({username:emailOrUsername});
        }
        if(!existingUser) return res.status(404).json({message: "User doesn't exist."});


        const isPasswordCorrect = await bcrypt.compare(password,existingUser.password);
        if(!isPasswordCorrect) return res.status(400).json({message: "Incorrect Password."});

        const token = jwt.sign({email:existingUser.email, _id:existingUser._id,username:existingUser.username},'test',{expiresIn:'1h'});
        res.status(200).json({result:existingUser,token});
    } catch (error) {
        res.status(500).json({ message:error});
    }
}

export const signup = async (req,res) =>{
    const user =req.body;

    try {
        const existingUser =await Users.findOne({email: user.email}).exec();
        if(existingUser) return res.status(400).json({message: "User already exist."});

        const uname = await Users.findOne({username:user.username}).exec();
        if(uname) return res.status(400).json({message:"Username is already taken."});
       
        const hashedPassword = await bcrypt.hash(user.password,12);

        const result = await Users.create({...user,password:hashedPassword});

        const token = jwt.sign({email:result.email, _id:result._id,username:result.username},'test',{expiresIn:'1h'});
          
        res.status(200).json({result,token});
    } catch (error) {
        
    }
}

export const getUsers= async (req,res)=>{
    try {
        const users = await Users.find();
        res.status(200).json(users)
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}

export const getIdAndName=async (req,res)=>{
    try{
        const users = await Users.find({}).select({ "name": 1, "_id": 1})
        var uArray = users.reduce(function(o, tpl) {
            o[tpl._id] = tpl.name;
            return o;
        }, {});
        res.status(200).json(uArray)
    }catch(error){
        res.status(404).json({message:error.message})
    }
}

export const getUserById =async (req,res) => {
    const {_id} = req.params;
    
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No user with that id');

    const user = await Users.findById(_id);

    res.json(user);
}

export const updateUser = async (req,res)=>{
    const {_id} =req.params;
    const user = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No user with that id');

    
    const updateUser = await Users.findByIdAndUpdate(_id,{...user,_id},{new:true});

    res.json(updateUser);
}

export const deleteUser= async (req,res)=>{
    const {id} =req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No user with that id');

    await Users.findByIdAndRemove(id);

    res.json({message: 'User deleted successfully'});
}

//getPostCreatedByUser