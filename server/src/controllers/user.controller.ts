import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import User from '../models/User';

export const onboardCustomer = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { phone, whatsappNumber, location, address } = req.body;
    
    if (!req.user) {
      res.status(401).json({ message: 'User not found in request' });
      return;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          phone,
          whatsappNumber,
          location,
          address
        }
      },
      { new: true, runValidators: true }
    ).select('-__v');

    if (!updatedUser) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json({
      message: 'User onboarded successfully',
      user: updatedUser
    });
  } catch (error) {
    console.error('Error in onboardCustomer:', error);
    res.status(500).json({ message: 'Server error during onboarding' });
  }
};
