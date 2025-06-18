import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ImageCarousel from "../components/ImageCarousel";
import { z } from "zod";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const dateSchema = z.object({
  checkIn: z.string().refine(val => !isNaN(new Date(val).getTime()), {
    message: "Invalid check-in date",
  }),
  checkOut: z.string().refine(val => !isNaN(new Date(val).getTime()), {
    message: "Invalid check-out date",
  }),
}).refine(data => new Date(data.checkIn) < new Date(data.checkOut), {
  message: "Check-out must be after check-in",
});

function ListingDetail() {
  const navigate = useNavigate()
  const [details, setDetails] = useState(null);
  const { id } = useParams();

  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    async function fetchDetails() {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/listings/list/${id}`);
        setDetails(res.data);
      } catch (error) {
        console.error("Failed to fetch listing:", error);
      }
    }

    fetchDetails();
  }, [id]);

  const handleCheck = async () => {
    setError('');
    setSuccess('');
    const result = dateSchema.safeParse({ checkIn, checkOut });

    if (!result.success) {
      setError(result.error.errors[0].message);
    } else {
      setSuccess("Dates are valid! You can now proceed to book.");
    }
    const res = await axios.post( `${import.meta.env.VITE_API_BASE_URL}/api/bookings/makebooking`,
      {
        listingId: details._id,
        startDate: checkIn,
        endDate: checkOut,
      },
      { withCredentials: true }
    );
    navigate('/')
    toast.success(res.data.message)
  
  };

  if (!details) return <p className="p-4 text-center">Loading...</p>;

  return (
  <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-bl from-pink-50 to-pink-300">

    <div className="w-full md:w-1/2 p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-2 break-words">{details.title}</h1>
      <p className="text-gray-600 mb-1">
        <span className="text-base md:text-lg text-black font-medium">Location:</span> {details.location}
      </p>
      <p className="text-gray-700 mb-4">
        <span className="text-base md:text-lg text-black font-medium">Description:</span> {details.description}
      </p>
      <p className="text-2xl md:text-3xl font-semibold text-red-950 mb-6">
        <span className="text-green-500">{details.price}</span>₹ <span className="text-sm">/ night</span>
      </p>
      <ImageCarousel images={details.images} />
    </div>

    <div className="w-full md:w-1/2 p-4 md:p-10">
      <Link to="/" className="block mb-8">
        <h1 className="text-4xl md:text-5xl font-light text-center text-pink-600">StayFinder</h1>
      </Link>

      <div className="w-full max-w-md mx-auto shadow-2xl p-6 md:p-8 bg-pink-200 border border-pink-600 rounded-lg">
        <h2 className="text-xl md:text-2xl text-center font-mono mb-4">Book This Stay</h2>

        <div className="px-4 py-2 rounded-t-xl shadow bg-green-50">
          <label className="block mb-2 font-medium text-green-500">Check-in Date</label>
          <input
            type="date"
            className="w-full border border-green-400 rounded px-3 py-2 mb-4"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
          />
        </div>

        <div className="px-4 py-2 rounded-b-xl shadow bg-yellow-50 mt-3">
          <label className="block mb-2 font-medium text-red-500">Check-out Date</label>
          <input
            type="date"
            className="w-full border border-red-300 rounded px-3 py-2 mb-4"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
          />
        </div>

        {error && <p className="text-center text-red-500 text-sm mb-2">{error}</p>}
        {success && <p className="text-center text-green-600 text-sm mb-2">{success}</p>}

        <button
          onClick={handleCheck}
          className="bg-pink-600 mt-2 text-white w-full py-2 rounded cursor-pointer hover:bg-pink-700 transition"
        >
          Check Availability
        </button>
      </div>
    </div>
  </div>
);

}

export default ListingDetail;
