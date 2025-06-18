import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  getAllListings,
  getListingById,
  createListing,
  getSearch
} from '../controllers/listingController.js';

const listingRoute = express.Router();

listingRoute.get('/search', getSearch);               
listingRoute.get('/list/:id', getListingById);        
listingRoute.get('/', getAllListings);                
listingRoute.post('/', protect, createListing);       

export { listingRoute };
