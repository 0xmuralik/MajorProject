import mongoose from 'mongoose';

const domainSchema = mongoose.Schema({
    name: {
        type:String, 
        required: true
    },
    image:[String], //base64 encodings of the 
    subscribers: [mongoose.Schema.Types.ObjectId]
})

const Domains = mongoose.model("Domains",domainSchema);
export default Domains;
