import mongoose from 'mongoose';

const folderSchema = mongoose.Schema({
    name:String, //folder name
    description:String, //folder description 
    parentId:mongoose.Schema.Types.ObjectId,
    subfolders:[mongoose.Schema.Types.ObjectId], // _ids of sub folders
    files:[String], //base64 encodings of the uploaded files
    itemCount:{ //number of files and folders in research
        type: Number,
        default: 0
    },
    createdOn: { //date and time of folder created
        type: Date,
        default: new Date()
    }
});

const FolderMessage = mongoose.model('FolderMessage',folderSchema);

export default FolderMessage;