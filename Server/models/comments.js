import mongoose from 'mongoose';

const commentSchema=mongoose.Schema({
    commentor: mongoose.Schema.Types.ObjectId,
    comment: String,
    time:{type:Date,default:new Date()},
    upvote:{type:[mongoose.Schema.Types.ObjectId],default:[]},
    downvote:{type:[mongoose.Schema.Types.ObjectId],default:[]},
    subComments:{type:[mongoose.Schema.Types.ObjectId],default:[]}
})

const DiscussionComment = mongoose.model("DiscussionComment",commentSchema)

export default DiscussionComment;
