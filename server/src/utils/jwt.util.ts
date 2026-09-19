import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';
import { UserRole } from '../models/User';

interface TokenPayload {
  userId: string;
  role: UserRole;
}

export const generateToken = (userId: Types.ObjectId | string, role: UserRole): string => {
  const secret = process.env.JWT_SECRET || 'fallback_secret_key';
  return jwt.sign(
    { userId: userId.toString(), role },
    secret,
    { expiresIn: '30d' } // Token expires in 30 days
  );
};

export const verifyToken = (token: string): TokenPayload => {
  const secret = process.env.JWT_SECRET || 'fallback_secret_key';
  return jwt.verify(token, secret) as TokenPayload;
};
