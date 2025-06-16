import booking from '../models/booking.js';
import Booking from '../models/booking.js';


export const createBooking = async (req, res) => {
  const { listingId, startDate, endDate } = req.body;

  const booking = new Booking({
    listing: listingId,
    user: req.user._id,
    startDate,
    endDate,
  });

  await booking.save();
  res.status(201).json({message: 'Successfully booked Stay' });
};

export const myBookings = async (req, res) => {
  try {
    const id = req.user._id;
    const bookings = await Booking.find({ user: id }).populate('listing');
    res.status(200).json({ message: "Success", data: bookings });
  } catch (e) {
    console.error("Error fetching bookings:", e);
    res.status(500).json({ message: "Server error" });
  }
};
