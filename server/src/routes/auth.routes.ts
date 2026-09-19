import express from 'express';
import { googleSignIn } from '../controllers/auth.controller';

const router = express.Router();

// POST /api/auth/google
router.post('/google', googleSignIn);

export default router;
