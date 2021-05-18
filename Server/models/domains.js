import mongoose from 'mongoose';

const domainSchema = mongoose.Schema({
    name: {
        type:String, 
        required: true
    },
    subscribers: [mongoose.Schema.Types.ObjectId]
})

const Domains = mongoose.model("Domains",domainSchema);
export default Domains;
