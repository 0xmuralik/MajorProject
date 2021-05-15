import mongoose, { Schema } from 'mongoose';

const postSchema = mongoose.Schema({
    title: String, //title of project
    creator: mongoose.Types.ObjectId, //id of uploading account TODO:call userSchema.objectId
    authors: [mongoose.Types.ObjectId], //authors of the research  TODO:call userSchema.objectId
    organization: String, //organization of the authors
    Region: String, //Region of the organization
    Description: String, //Description of the project
    Domain : String, //Domain of the research
    tags: [String], //Keywords or tags (use in search)
    status: String, //status of the research (comlpeted/InProgress)
    collaborators:[mongoose.Types.ObjectId], //list of collaborators (user _ids) TODO:call userSchema.objectId
    homeDirectory:mongoose.Types.ObjectId, //id of home directory - create a folder with name as title and pass the objectID TODO:call folderSchema.objectId
    likeCount:{ //number of likes
        type: Number,
        default: 0
    },
    viewCount:{ //number of views
        type: Number,
        default: 0
    },
    saveCount:{ //number of saves
        type: Number,
        default: 0
    },
    fileCount:{ //number of files(not folders) in research
        type: Number,
        default: 0
    },
    createdOn: { //date and time of project created
        type: Date,
        default: new Date()
    }
});

const PostMessage = mongoose.model('PostMessage',postSchema);

export default PostMessage;