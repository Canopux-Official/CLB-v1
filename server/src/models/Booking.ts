import mongoose, { Schema, Document, Types } from 'mongoose';

export enum BookingStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export interface IBooking extends Document {
  customer: Types.ObjectId;
  provider: Types.ObjectId;
  serviceCategory: string;
  status: BookingStatus;
  fare: number;
  location: {
    type: 'Point';
    coordinates: number[]; // [longitude, latitude]
  };
  address: {
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    zipCode?: string;
  };
  scheduledAt: Date;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema: Schema = new Schema(
  {
    customer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    provider: { type: Schema.Types.ObjectId, ref: 'ServiceProvider', required: true },
    serviceCategory: { type: String, required: true },
    status: {
      type: String,
      enum: Object.values(BookingStatus),
      default: BookingStatus.PENDING
    },
    fare: { type: Number },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point'
      },
      coordinates: {
        type: [Number] // [longitude, latitude]
      }
    },
    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      zipCode: String
    },
    scheduledAt: { type: Date, required: true },
    completedAt: { type: Date }
  },
  { timestamps: true }
);

BookingSchema.index({ customer: 1 });
BookingSchema.index({ provider: 1 });
BookingSchema.index({ status: 1 });

export default mongoose.model<IBooking>('Booking', BookingSchema);
