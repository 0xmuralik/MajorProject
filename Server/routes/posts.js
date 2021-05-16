import express from 'express';

import {getPosts,createPost,updatePost,deletePost,likePost,savePost,viewPost} from '../controllers/posts.js'

const router = express.Router();

// http://localhost:5000/posts

router.get('/',getPosts);
router.post('/',createPost);
router.patch('/:id',updatePost);
router.delete('/:id',deletePost);
router.patch('/:id/likePost',likePost);
router.patch('/:id/savePost',savePost);
router.patch('/:id/viewPost',viewPost);

export default router;