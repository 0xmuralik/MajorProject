import Domains from '../models/domains.js'
import mongoose from 'mongoose';

export const getDomains= async (req,res)=>{
    try {
        const domains = await Domains.find();
        res.status(200).json(domains)
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
    const {domainId:_id} =req.params;

    if(!req.userId) return res.json({message:'Unauthenticated'});

    if(!mongoose.Types.ObjectId.isValid(domainId)) return res.status(404).send('No domain with that id');

    const domain = await Domains.findById(domainId);
    
    const user = await Users.findById(req.userId);

    const index = domain.subscribers.findIndex((id)=>id===String(req.userId));

    if(index===-1){
        domain.subscribers.push(req.userId);
        user.domains.push(postId);
    }else{
        domain.subscribers=domain.subscribers.filter((id)=>id!==String(req.userId));
        user.domains= user.domains.filter((id)=>id!==String(domainId));
    }

    const updatedDomain = await Domains.findByIdAndUpdate(domainId,domain,{new:true});
    const updatedUser = await Users.findByIdAndUpdate(req.userId,user,{new:true});

    res.json(updatedDomain,updatedUser);
}


export const deleteDomain = async (req,res)=>{
    const{_id} =req.params;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No domain with that id');

    await Domains.findByIdAndRemove(_id);

    res.json({message: 'Domain deleted successfully'});
}