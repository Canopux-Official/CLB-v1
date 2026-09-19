import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IReview extends Document {
  booking: Types.ObjectId;
  customer: Types.ObjectId;
  provider: Types.ObjectId;
  rating: number; // 1-5
  comment?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema: Schema = new Schema(
  {
    booking: { type: Schema.Types.ObjectId, ref: 'Booking', required: true, unique: true },
    customer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    provider: { type: Schema.Types.ObjectId, ref: 'ServiceProvider', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String }
  },
  { timestamps: true }
);

ReviewSchema.index({ provider: 1 });
ReviewSchema.index({ customer: 1 });

export default mongoose.model<IReview>('Review', ReviewSchema);
