import express from "express";

import { getFolders, createFolder,updateFolder,deleteFolder,addItem, getFolderById} from '../controllers/folders.js'

import auth from '../middleware/auth.js';

const router = express.Router();

// http://localhost:5000/folders

router.get('/',getFolders);
router.get('/:id',getFolderById);
router.post('/',auth,createFolder);
router.patch('/:id',auth,updateFolder);
router.delete('/:id',auth,deleteFolder);
router.patch('/:id/addItem',auth,addItem);

export default router;
