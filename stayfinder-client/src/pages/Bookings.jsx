import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../store/useUserStore.js'
import { Link } from 'react-router-dom';

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const user = useAuthStore(s => s.user)

  useEffect(() => {
    async function getBookings() {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/bookings/mybookings`,
          { withCredentials: true }
        );
        setBookings(res.data.data || []);
      } catch (err) {
        console.error('Failed to fetch bookings', err);
      }
    }

    getBookings();
  }, []);

  return (
    <div className="w-screen min-h-screen flex items-center justify-center bg-gradient-to-bl from-pink-100 to-pink-300">
      <div className="w-full h-full overflow-y-auto px-4 md:px-10 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center"><span className='text-pink-600'>{user.name}</span> You'r Bookings</h1>

        {bookings.length>0 ? bookings
          .filter(booking => booking?.listing)
          .map((booking, index) => {
            const listing = booking.listing;
            return (
              <motion.div
                key={booking._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col md:flex-row justify-between border border-pink-600 rounded-lg mb-3 bg-pink-50 p-6 shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className='space-y-1'>
                  <p className="text-sm text-red-600">Booking</p>
                  <p className="text-lg text-pink-600">Name &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: &nbsp; <span className='text-gray-500 font-mono'>{listing.title}</span></p>
                  <p className="text-lg text-pink-600">Location &nbsp;&nbsp;: &nbsp; <span className='text-gray-500 font-mono'>{listing.location}</span></p>
                  <p className="text-green-600 text-xl font-semibold mt-2"><span className='text-amber-700'>₹</span> {listing.price}</p>
                </div>

                <div className="mt-4 md:mt-0">
                  <p className="text-sm text-green-600">Start Date</p>
                  <p className="text-lg font-semibold">
                    {new Date(booking.startDate).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-red-600 mt-2">End Date</p>
                  <p className="text-lg font-semibold">
                    {new Date(booking.endDate).toLocaleDateString()}
                  </p>
                </div>
              </motion.div>
            );
          }):
          <p className='text-center text-xl'>You don't have any bookings...! <Link className='text-blue-500 ' to={'/'}>Try to Check in</Link></p>  
        }

      </div>
    </div>
  );
}

export default Bookings;
