import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: String, //title of project
    creator: mongoose.Schema.Types.ObjectId, //id of uploading account 
    authors: [mongoose.Schema.Types.ObjectId], //authors of the research 
    organization: String, //organization of the authors
    Region: String, //Region of the organization
    Description: String, //Description of the project
    Domain : String, //Domain of the research
    tags: [String], //Keywords or tags (use in search)
    status: String, //status of the research (comlpeted/InProgress)
    collaborators:[mongoose.Schema.Types.ObjectId], //list of collaborators (user _ids) 
    homeDirectory:mongoose.Schema.Types.ObjectId, //id of home directory - create a folder with name as title and pass the objectID 
    likes:{ //array of userIds who liked
        type: [String],
        default: []
    },
    views:{ //array of userIds who viewed
        type: [String],
        default: []
    },
    saves:{ //arrays of userIds who saved
        type: [String],
        default: []
    },
    createdOn: { //date and time of project created
        type: Date,
        default: new Date()
    }
});

const PostMessage = mongoose.model('PostMessage',postSchema);

export default PostMessage;