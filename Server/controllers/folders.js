import  FolderMessage from "../models/folderMessages";

export const getFolders= async (req,res)=>{
    try {
        const folderMessages = await FolderMessage.find();
        res.status(200).json(folderMessages)
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}

export const createFolder=async (req,res)=>{
    const folder = req.body;

    const newFolder = new FolderMessage(folder);
    try {
        await newFolder.save()
        res.status(201).json(newFolder)
    } catch (error) {
        res.status(409).json({message:error.message});
    }
}