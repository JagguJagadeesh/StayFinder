import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaSearch, FaCalendarAlt, FaMapMarkerAlt , FaRupeeSign  } from 'react-icons/fa'

export default function SearchBar() {
  const [location, setLocation] = useState('')
  const [startDate, setStartDates] = useState('')
  const [price, setPrice] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log({ location, startDate, price })
    // handle the search logic
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto mb-4 bg-white shadow-md shadow-pink-300 rounded-full flex flex-col sm:flex-row justify-items-center px-6 py-4 space-y-3 sm:space-y-0 sm:space-x-4"
    >
      <div className="flex items-center w-full sm:w-auto">
        <FaMapMarkerAlt className="text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Where to?"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full sm:w-48 outline-none bg-transparent placeholder-gray-500"
        />
      </div>
      <div className="flex items-center w-full sm:w-auto">
        <FaCalendarAlt className="text-gray-500 mr-2" />
        <input
          type='date'
          value={startDate}
          onChange={(e) => setStartDates(e.target.value)}
          className="w-full sm:w-36 outline-none bg-transparent placeholder-gray-500"
        />
      </div>
      <div className="flex items-center w-full sm:w-auto ml-10">
        <FaRupeeSign className="text-gray-500 mr-2" />
        <input
          type="text"
          placeholder='2500'
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full sm:w-36 outline-none bg-transparent"
        />
      </div>
      <button
        type="submit"
        className="ml-auto bg-red-500 text-white px-4 py-4 cursor-pointer rounded-full hover:bg-red-600 transition"
      >
        <FaSearch />
      </button>
    </motion.form>
  )
}
