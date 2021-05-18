import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name: {
        type:String, 
        required: true
    },
    email: {
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    username: {
        type:String,
        required:true
    },
    domains: [mongoose.Schema.Types.ObjectId],
    contact: String,
    description: String,
    displayPicture: String,
    likedPosts: [mongoose.Schema.Types.ObjectId],
    savedPosts: [mongoose.Schema.Types.ObjectId],
    viewedPosts: [mongoose.Schema.Types.ObjectId]
})

const Users = mongoose.model("Users",userSchema);
export default Users;
