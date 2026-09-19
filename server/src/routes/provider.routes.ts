import express from 'express';
import { onboardProvider } from '../controllers/provider.controller';
import { protect } from '../middlewares/auth.middleware';

const router = express.Router();

// POST /api/provider/onboard
router.post('/onboard', protect, onboardProvider);

export default router;
