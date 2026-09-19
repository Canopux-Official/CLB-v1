import express from 'express';
import { onboardCustomer } from '../controllers/user.controller';
import { protect } from '../middlewares/auth.middleware';

const router = express.Router();

// POST /api/user/onboard
router.post('/onboard', protect, onboardCustomer);

export default router;
