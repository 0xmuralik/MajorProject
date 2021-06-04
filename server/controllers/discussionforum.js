import DiscussionComment from '../models/comments.js'
import Users from '../models/users.js'
import mongoose from 'mongoose'

export const addNewComment = async (req, res) => {
    try {
        const parentId = req.params.parentId
        const message = req.body.message
        const user = await Users.findById(req.userId);

        const newcomment = new DiscussionComment({
            commentor: req.userId,
            comment: message,
            time: new Date().toISOString()
        });
        await newcomment.save();

        const parentComment = await DiscussionComment.findById(parentId);
        parentComment.subComments.push(newcomment._id);
        const updatedparentComment = await DiscussionComment.findByIdAndUpdate(parentId, parentComment)

        res.status(201).json({ message: "added " })
    } catch (error) {
        console.log("error in add new comment", error)
    }
}

export const getPostDiscussionForum = async (req, res) => {
        const parentId = req.params.parentId;
        const user = await Users.findById(req.userId);
        const parentcomment = await DiscussionComment.findById(parentId)
        const commentlist = await DiscussionComment.find({ '_id': { $in: parentcomment.subComments } })
        res.status(201).json(commentlist)
    
    
}

