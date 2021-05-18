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
    displayPicture: String
})

export default mongoose.model("Users",userSchema);