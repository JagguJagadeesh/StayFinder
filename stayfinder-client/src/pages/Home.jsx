import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import SearchBar from '../components/SearchBar';

function Home() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/listings`)
      .then(res => setListings(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className='bg-gradient-to-br from-pink-50 to-pink-100'>
    <div className='flex flex-col items-center shadow-md'>
      <NavBar />
      <SearchBar/>
    </div>
    {/* <hr className='text-pink-400 mt-6 text-shadow-lg' /> */}
    {/* List */}
    <div className='w-full px-10'>
      <h2 className='text-2xl text-pink-600 font-medium my-4'>Available Listings :</h2>
      <div className='grid gap-2 grid-cols-3'>
        {listings.map(listing => (
          <Link className='' to={`/listings/${listing._id}`} key={listing._id}>
            <div className='rounded shadow-2xl px-2 py-4 w-96 space-y-1 hover:opacity-90 duration-150 border border-pink-600' >
              <img src={listing.images[0] || listing.images[1]} alt="" className='w-full h-56 rounded border-gray-600 border ' />
              <div className='flex items-baseline-last justify-between'>
              <div>
              <h3 className='ml-4 text-xl text-pink-600 '>{listing.title}</h3>
              <p className=' ml-4 text-sm font-light'>{listing.location}</p>
              <p className=' ml-4 text-green-500 text-lg font-medium '>{listing.price}.00 <span className='text-amber-900'>₹</span> <span className='text-black'>/</span> <span className='text-pink-900'>night</span></p>
              </div>
              <button className='px-3 py-1 bg-pink-600 text-white rounded-lg cursor-pointer z-10'>CheckIn</button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
    </div>
  );
}

export default Home;
