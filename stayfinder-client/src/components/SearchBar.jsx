import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaSearch, FaCalendarAlt, FaMapMarkerAlt, FaRupeeSign } from 'react-icons/fa'

export default function SearchBar({ onSearch }) {
  const [location, setLocation] = useState('')
  const [startDate, setStartDate] = useState('')
  const [price, setPrice] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch({ location, price, startDate })
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-5xl mx-auto mb-4 bg-white shadow-md shadow-pink-300 rounded-full flex flex-wrap md:flex-nowrap items-center justify-between px-6 py-4 gap-4"
    >

      <div className="flex items-center w-full md:w-auto flex-1 min-w-[180px]">
        <FaMapMarkerAlt className="text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Where to?"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full outline-none bg-transparent placeholder-gray-500"
        />
      </div>



      <div className="flex items-center w-full md:w-auto flex-1 min-w-[120px]">
        <FaRupeeSign className="text-gray-500 mr-2" />
        <input
          type="number"
          placeholder="Max price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full outline-none bg-transparent placeholder-gray-500"
        />
      </div>

      <div className="flex items-center w-full md:w-auto flex-1 min-w-[150px]">
        <FaCalendarAlt className="text-gray-500 mr-2" />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full outline-none bg-transparent text-gray-500"
        />
      </div>

      <button
        type="submit"
        className="w-full md:w-auto bg-red-500 text-white px-4 py-4 rounded-full hover:bg-red-600 transition text-lg flex justify-center items-center"
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSubmit(e)
        }}
      >
        <FaSearch />
      </button>
    </motion.form>
  )
}
