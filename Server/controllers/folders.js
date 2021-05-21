import  FolderMessage from "../models/folderMessages.js";
import mongoose from 'mongoose';

export const getFolders= async (req,res)=>{
    try {
        const folderMessages = await FolderMessage.find();
        res.status(200).json(folderMessages)
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}

export const getFolderById =async (req,res) => {
    const {_id} = req.params;
    
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No folder with that id');

    const folder = await FolderMessage.findById(_id);

    res.json(folder);
}

export const createFolder=async (req,res)=>{
    const folder = req.body;

    const newFolder = new FolderMessage({...folder});
    try {
        await newFolder.save()
        res.status(201).json(newFolder)
    } catch (error) {
        res.status(409).json({message:error.message});
    }
}

export const updateFolder = async (req,res)=>{
    const{id:_id} =req.params;
    const folder = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No folder with that id');

    const updateFolder = await FolderMessage.findByIdAndUpdate(_id,{...folder,_id},{new:true});

    res.json(updateFolder);
}

export const deleteFolder = async (req,res)=>{
    const{_id} =req.params;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No folder with that id');

    await FolderMessage.findByIdAndRemove(_id);

    res.json({message: 'Folder deleted successfully'});
}

export const addItem = async (req,res)=>{
    const{_id} =req.params;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No folder with that id');

    const folder = await FolderMessage.findById(_id);
    const updatedFolder = await FolderMessage.findByIdAndUpdate(_id,{itemCount: folder.itemCount+1},{new:true});

    res.json(updatedFolder);
}

//addfile
//addfolder