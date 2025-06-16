import express from 'express';
import { createBooking, myBookings } from '../controllers/bookingController.js';
import { protect } from '../middleware/authMiddleware.js';


const bookingRoutes = express.Router();

bookingRoutes.post('/makebooking',protect ,createBooking);
bookingRoutes.get('/mybookings',protect, myBookings);

export {bookingRoutes};
