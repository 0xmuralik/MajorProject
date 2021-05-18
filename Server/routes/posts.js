import express from 'express';

import {getPosts,createPost,updatePost,deletePost,likePost,savePost,viewPost, getPostById} from '../controllers/posts.js'

import auth from '../middleware/auth.js';

const router = express.Router();

// http://localhost:5000/posts

router.get('/',getPosts);
router.get('/:id',getPostById);
router.post('/',auth,createPost);
router.patch('/:id',auth,updatePost);
router.delete('/:id',auth,deletePost);
router.patch('/:id/likePost',auth,likePost);
router.patch('/:id/savePost',auth,savePost);
router.patch('/:id/viewPost',auth,viewPost);

export default router;