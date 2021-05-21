import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: String, //title of project
    creator: mongoose.Schema.Types.ObjectId, //id of uploading account 
    author: mongoose.Schema.Types.ObjectId, //authors of the research 
    organization: String, //organization of the authors
    region: String, //Region of the organization
    //description: String, //Description of the project
    image:[String], //base64 encoding of images in research home
    future: String, //Future of the project
    workDone: String, //Description of the project
    Description: String, //Description of the project
    domain : {type:mongoose.Schema.Types.ObjectId, require:true}, //Domain of the research
    tags: [String], //Keywords or tags (use in search)
    status:{type:String, require:true}, //status of the research (comlpeted/InProgress)
    coAuthors:[mongoose.Schema.Types.ObjectId], //list of collaborators (user _ids) 
    homeDirectory:{type:mongoose.Schema.Types.ObjectId, require:true}, //id of home directory - create a folder with name as title and pass the objectID = > {name:title} 
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