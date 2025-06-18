import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import SearchBar from '../components/SearchBar';

function Home() {
  const [listings, setListings] = useState([]);

  const fetchListings = async (filters = {}) => {
    try {
      const params = new URLSearchParams();

      if (filters.location) params.append('location', filters.location);
      if (filters.price) params.append('maxPrice', filters.price);

      if (!filters.location && !filters.price) {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/listings`);
        setListings(res.data.data || res.data);
        return;
      }

      const url = `${import.meta.env.VITE_API_BASE_URL}/api/listings/search${params.toString() ? '?' + params.toString() : ''}`;

      const res = await axios.get(url);
      setListings(res.data.data || res.data); 
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  return (
    <div className='bg-gradient-to-br from-pink-50 to-pink-100'>
      <div className='flex flex-col items-center shadow-md'>
        <NavBar />
        <SearchBar onSearch={fetchListings} />
      </div>

      <div className='w-full px-10'>
        <h2 className='text-2xl text-pink-600 font-medium my-4'>Available Listings :</h2>
        <div className='grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
          {listings.length > 0 ? listings.map(listing => (
            <Link to={`/listings/list/${listing._id}`} key={listing._id}>
              <div className='rounded shadow-2xl px-2 py-4 w-full space-y-1 hover:opacity-90 duration-150 border border-pink-600'>
                <img src={listing.images[0] || listing.images[1]} alt="listing" className='w-full h-56 object-cover rounded border-gray-600 border' />
                <div className='flex items-center justify-between'>
                  <div>
                    <h3 className='ml-4 text-xl text-pink-600'>{listing.title}</h3>
                    <p className='ml-4 text-sm font-light'>{listing.location}</p>
                    <p className='ml-4 text-green-500 text-lg font-medium'>{listing.price}.00 <span className='text-amber-900'>₹</span> <span className='text-black'>/</span> <span className='text-pink-900'>night</span></p>
                  </div>
                  <button className='px-3 py-1 bg-pink-600 text-white rounded-lg cursor-pointer z-10'>CheckIn</button>
                </div>
              </div>
            </Link>
          )) : (
            <p className='text-gray-600 text-center col-span-3 mt-4'>No listings found for selected filters.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
