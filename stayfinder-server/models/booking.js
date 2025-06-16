import { Schema, model } from 'mongoose';

const bookingSchema = new Schema({
  listing: { type: Schema.Types.ObjectId, ref: 'Listing' },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  startDate: Date,
  endDate: Date,
}, { timestamps: true });

export default model('Booking', bookingSchema);
