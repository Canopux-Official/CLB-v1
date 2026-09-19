import mongoose, { Schema, Document } from 'mongoose';

export enum UserRole {
  CUSTOMER = 'CUSTOMER',
  PROVIDER = 'PROVIDER',
  ADMIN = 'ADMIN'
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  BANNED = 'BANNED'
}

export interface IUser extends Document {
  googleId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  profilePicture?: string;
  phone?: string;
  whatsappNumber?: string;
  role: UserRole;
  status: UserStatus;
  location?: {
    type: 'Point';
    coordinates: number[]; // [longitude, latitude]
  };
  address?: {
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    zipCode?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    googleId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    firstName: { type: String },
    lastName: { type: String },
    profilePicture: { type: String },
    phone: { type: String },
    whatsappNumber: { type: String },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.CUSTOMER
    },
    status: {
      type: String,
      enum: Object.values(UserStatus),
      default: UserStatus.ACTIVE
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
      }
    },
    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      zipCode: String
    }
  },
  { timestamps: true }
);

// Create a 2dsphere index for location-based queries
UserSchema.index({ location: '2dsphere' });

export default mongoose.model<IUser>('User', UserSchema);
