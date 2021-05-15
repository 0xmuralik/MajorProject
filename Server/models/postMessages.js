import mongoose, { Schema } from 'mongoose';

const postSchema = mongoose.Schema({
    title: String, //title of project
    creator: Schema.Types.ObjectId, //id of uploading account 
    authors: [Schema.Types.ObjectId], //authors of the research 
    organization: String, //organization of the authors
    Region: String, //Region of the organization
    Description: String, //Description of the project
    Domain : String, //Domain of the research
    tags: [String], //Keywords or tags (use in search)
    status: String, //status of the research (comlpeted/InProgress)
    collaborators:[Schema.Types.ObjectId], //list of collaborators (user _ids) 
    homeDirectory:Schema.Types.ObjectId, //id of home directory - create a folder with name as title and pass the objectID 
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