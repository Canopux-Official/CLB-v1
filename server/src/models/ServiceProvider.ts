import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IServiceProvider extends Document {
  user: Types.ObjectId; // Reference to base User
  serviceCategories: string[];
  businessName?: string;
  bio?: string;
  experienceYears?: number;
  rating: number;
  totalReviews: number;
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
  availability: {
    isAvailable: boolean;
    workingHours: {
      start: string; // e.g., '09:00'
      end: string;   // e.g., '18:00'
    };
    workingDays: string[]; // e.g., ['Monday', 'Tuesday', ...]
  };
  baseFare?: number;
  isVerified: boolean;
  documents: {
    type: string;
    url: string;
  }[];
  completedJobs: number;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceProviderSchema: Schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    serviceCategories: { type: [String], default: [] },
    businessName: { type: String },
    bio: { type: String },
    experienceYears: { type: Number },
    rating: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 },
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
    },
    availability: {
      isAvailable: { type: Boolean, default: true },
      workingHours: {
        start: { type: String, default: '09:00' },
        end: { type: String, default: '18:00' }
      },
      workingDays: { type: [String], default: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] }
    },
    baseFare: { type: Number },
    isVerified: { type: Boolean, default: false },
    documents: [
      {
        type: { type: String }, // e.g., 'AADHAR', 'LICENSE'
        url: { type: String }
      }
    ],
    completedJobs: { type: Number, default: 0 }
  },
  { timestamps: true }
);

// Geo location index
ServiceProviderSchema.index({ location: '2dsphere' });
// Index for service categories to allow fast search
ServiceProviderSchema.index({ serviceCategories: 1 });

export default mongoose.model<IServiceProvider>('ServiceProvider', ServiceProviderSchema);
