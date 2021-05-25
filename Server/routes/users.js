import express from 'express';

import auth from '../middleware/auth.js';

import { signin,signup,updateUser,deleteUser,getUsers} from '../controllers/users.js'

const router = express.Router();

// http://localhost:5000/users

router.post('/signin',signin)
router.post('/signup',signup)
router.patch('/:id', auth,updateUser);
router.delete('/:id', auth,deleteUser);
router.get('/',getUsers)

export default router;