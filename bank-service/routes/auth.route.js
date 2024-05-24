import express from 'express';
import { signIn, signUp, googleAuth, signout } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/google', googleAuth);
router.get('/signout', signout);

export default router;