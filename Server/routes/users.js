import express from 'express';

import auth from '../middleware/auth.js';

import { signin,signup,updateUser,deleteUser} from '../controllers/users.js'

const router = express.Router();

// http://localhost:5000/users

router.post('/signin',signin)
router.post('/signup',signup)
router.patch('/:id',updateUser);
router.delete('/:id',deleteUser);

export default router;