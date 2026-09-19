import { Request, Response } from 'express';
import { OAuth2Client } from 'google-auth-library';
import User from '../models/User';
import { generateToken } from '../utils/jwt.util';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

import axios from 'axios';

export const googleSignIn = async (req: Request, res: Response): Promise<void> => {
  try {
    const { token, role } = req.body;

    if (!token) {
      res.status(400).json({ message: 'Google token is required' });
      return;
    }

    // Verify Google Token via UserInfo API
    let payload;
    try {
      const response = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${token}` }
      });
      payload = response.data;
    } catch (err) {
      res.status(400).json({ message: 'Invalid Google token' });
      return;
    }

    if (!payload || !payload.email) {
      res.status(400).json({ message: 'Invalid Google token payload' });
      return;
    }

    const { sub: googleId, email, given_name, family_name, picture } = payload;

    // Check if user exists
    let user = await User.findOne({ googleId });

    if (!user) {
      // Create new user
      const validRole = role === 'PROVIDER' ? 'PROVIDER' : 'CUSTOMER';
      user = await User.create({
        googleId,
        email,
        firstName: given_name,
        lastName: family_name,
        profilePicture: picture,
        role: validRole,
      });
    }

    if (user.status === 'BANNED') {
      res.status(403).json({ message: 'User is banned' });
      return;
    }

    // Generate JWT
    const jwtToken = generateToken(user._id, user.role);

    res.status(200).json({
      message: 'Authentication successful',
      token: jwtToken,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        profilePicture: user.profilePicture,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Error in googleSignIn:', error);
    res.status(500).json({ message: 'Server error during authentication' });
  }
};
