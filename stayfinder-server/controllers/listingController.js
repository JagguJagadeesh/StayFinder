import Listing from '../models/listing.js'

export const getAllListings = async (req, res) => {
  const listings = await Listing.find().populate('host', 'name');
  res.json(listings);
};

export const getListingById = async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) return res.status(404).json({ message: 'Listing not found' });
  res.json(listing);
};

export const createListing = async (req, res) => {
  const { title, description, location, price, images } = req.body;

  const listing = new Listing({
    title,
    description,
    location,
    price,
    images,
    host: req.user._id
  });

  await listing.save();
  res.status(201).json(listing);
};
