import express from 'express';

import auth from '../middleware/auth.js';

import { signin,signup,updateUser,deleteUser,getUsers, getIdAndName } from '../controllers/users.js'

const router = express.Router();

// http://localhost:5000/users

router.post('/signin',signin)
router.post('/signup',signup)
router.patch('/:id', auth,updateUser);
router.delete('/:id', auth,deleteUser);
router.get('/',getUsers)
router.get('/get_id_and_name',getIdAndName);

export default router;