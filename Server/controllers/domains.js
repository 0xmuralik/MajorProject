import Domains from '../models/domains.js'
import Users from '../models/users.js'
import mongoose from 'mongoose';

export const getDomains= async (req,res)=>{
    try {
        const domains = await Domains.find();
        res.status(200).json(domains)
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}
export const getIdAndName= async (req,res)=>{
    try {
        const domains = await Domains.find({}).select({ "name": 1, "_id": 1});
        var dArray = domains.reduce(function(o, tpl) {
            o[tpl._id] = tpl.name;
            return o;
        }, {});
        res.status(200).json(dArray)
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}

export const getDomainById =async (req,res) => {
    const {_id} = req.params;
    
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No domain with that id');

    const domain = await Domains.findById(_id);

    res.json(domain);
}

export const createDomain=async (req,res)=>{
    const domain = req.body;
    const newDomain = new Domains({...domain});
    try {
        await newDomain.save()
        res.status(201).json(newDomain)
    } catch (error) {
        res.status(409).json({message:error.message});
    }
}

export const subscribe = async (req,res)=>{
    const domainId =req.params.id;
    console.log('-----',domainId)
    if(!req.userId) return res.json({message:'Unauthenticated'});

    if(!mongoose.Types.ObjectId.isValid(domainId)) return res.status(404).send('No domain with that id');

    const domain = await Domains.findById(domainId);
    
    const user = await Users.findById(req.userId);

    const index = domain.subscribers.findIndex((id)=>String(id)===String(req.userId));
    console.log(index,domainId)
    if(index===-1){
        domain.subscribers.push(req.userId);
        user.domains.push(domainId);
    }else{
        domain.subscribers=domain.subscribers.filter((id)=>String(id)!==String(req.userId));
        user.domains= user.domains.filter((id)=>String(id)!==String(domainId));
    }

    const updatedDomain = await Domains.findByIdAndUpdate(domainId,domain,{new:true});
    const updatedUser = await Users.findByIdAndUpdate(req.userId,user,{new:true});

    res.status(200).json({updatedDomain,updatedUser});
}

export const user_subscribed_and_unsubscribed = async(req,res)=>{
    if(!req.userId) return res.json({message:'Unauthenticated'});
    try{
        const user = await Users.findById(req.userId);
        const subscribed = await Domains.find({ '_id': { $in: user.domains } })
        const unsubscribed = await Domains.find({ '_id': { $nin: user.domains } })
        res.status(200).json({subscribed,unsubscribed})
    }catch(error){
        console.log(error)
    }
}

export const deleteDomain = async (req,res)=>{
    const{_id} =req.params;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No domain with that id');

    await Domains.findByIdAndRemove(_id);

    res.json({message: 'Domain deleted successfully'});
}