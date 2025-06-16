import { Schema, model } from 'mongoose';

const listingSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  location: String,
  price: Number,
  images: [String],
  host: { type: Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

export default model('Listing', listingSchema);
