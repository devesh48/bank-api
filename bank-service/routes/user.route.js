import express from 'express';
import { user, updateUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/', user)
router.get('/update/:id', verifyToken, updateUser)

export default router;