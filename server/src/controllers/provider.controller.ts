import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import User, { UserRole } from '../models/User';
import ServiceProvider from '../models/ServiceProvider';

export const onboardProvider = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'User not found in request' });
      return;
    }

    const {
      phone,
      whatsappNumber,
      serviceCategories,
      businessName,
      bio,
      experienceYears,
      location,
      address,
      availability,
      baseFare,
      documents
    } = req.body;

    // 1. Update the base User document
    await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          phone,
          whatsappNumber,
          role: UserRole.PROVIDER // Upgrade role
        }
      }
    );

    // 2. Create or Update the ServiceProvider document
    let provider = await ServiceProvider.findOne({ user: req.user._id });

    if (provider) {
      // Update existing
      provider = await ServiceProvider.findOneAndUpdate(
        { user: req.user._id },
        {
          $set: {
            serviceCategories,
            businessName,
            bio,
            experienceYears,
            location,
            address,
            availability,
            baseFare,
            documents
          }
        },
        { new: true, runValidators: true }
      );
    } else {
      // Create new
      provider = await ServiceProvider.create({
        user: req.user._id,
        serviceCategories,
        businessName,
        bio,
        experienceYears,
        location,
        address,
        availability,
        baseFare,
        documents,
        isVerified: false // Needs manual verification later
      });
    }

    res.status(200).json({
      message: 'Provider onboarded successfully',
      provider
    });
  } catch (error) {
    console.error('Error in onboardProvider:', error);
    res.status(500).json({ message: 'Server error during provider onboarding' });
  }
};
