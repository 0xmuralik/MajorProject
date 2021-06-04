import express from "express";
import {addNewComment,getPostDiscussionForum} from '../controllers/discussionforum.js'

import auth from "../middleware/auth.js"

const router=express.Router();

// http://localhost:5000/discussionforum/

router.get('/:parentId',auth,getPostDiscussionForum)
router.post('/:parentId/newcomment',auth,addNewComment)

export default router;