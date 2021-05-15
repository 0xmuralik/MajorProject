import express from 'express';

import {getPosts,createPost, getFolders, createFolder} from '../controllers/folders.js'

const router = express.Router();

// http://localhost:5000/posts

router.get('/',getFolders);
router.post('/',createFolder);

export default router;