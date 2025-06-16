import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

function Bookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    async function getBookings() {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/bookings/mybookings`,
          {
            withCredentials: true,
          }
        );
        setBookings(res.data.data); // Adjust based on your API response
      } catch (err) {
        console.error('Failed to fetch bookings', err);
      }
    }

    getBookings();
  }, []);

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-bl from-pink-100 to-pink-300">
      <div className="w-full h-full overflow-y-auto px-10 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">My Bookings</h1>

        <div className="flex flex-col gap-6 ">
          {bookings.map((booking, index) => (
            <motion.div
              key={booking._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col md:flex-row justify-between border border-pink-600 rounded-lg bg-pink-50 p-6 shadow-md hover:shadow-xl transition-all duration-300"
            >
              {/* Left Side: Dates */}
              <div className="">
                <p className="text-sm text-gray-500">Booking</p>
                <p className="text-xl font-bold">{booking.listing.title}</p>
                <p className="text-gray-700">{booking.listing.location}</p>
                <p className="text-green-600 text-lg font-semibold mt-2">₹{booking.listing.price}</p>
              </div>

              {/* Right Side: Listing Info */}
              <div className="mb-4 md:mb-0">
                <p className="text-sm text-gray-500">Start Date</p>
                <p className="text-lg font-semibold">{new Date(booking.startDate).toLocaleDateString()}</p>
                <p className="text-sm text-gray-500 mt-2">End Date</p>
                <p className="text-lg font-semibold">{new Date(booking.endDate).toLocaleDateString()}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Bookings;
