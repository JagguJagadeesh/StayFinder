import express from 'express';
import {protect} from '../middleware/authMiddleware.js';
import { getAllListings , getListingById , createListing } from '../controllers/listingController.js';


const listingRoute = express.Router();

listingRoute.get('/', getAllListings);
listingRoute.get('/:id', getListingById);
listingRoute.post('/', protect, createListing);

export {listingRoute};
