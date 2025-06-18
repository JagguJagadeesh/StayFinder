import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function AddListing() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    location: '',
    price: '',
    images: [''],
  });

  const navigate = useNavigate();

  const handleChange = (e, index) => {
    if (e.target.name === 'images') {
      const newImages = [...form.images];
      newImages[index] = e.target.value;
      setForm({ ...form, images: newImages });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const addImageField = () => {
    setForm({ ...form, images: [...form.images, ''] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/listings/addlisting`,
        form,
        { withCredentials: true }
      );
      toast.success('Listing created successfully!');
      navigate('/');
    } catch (err) {
      toast.error('Failed to create listing');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-pink-200 flex items-center justify-center px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg space-y-6 border border-pink-400"
      >
        <h2 className="text-3xl font-bold text-center text-pink-600">Add New Listing</h2>

        <div>
          <label className="block text-gray-700 font-medium">Title</label>
          <input
            type="text"
            name="title"
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Description</label>
          <textarea
            name="description"
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            rows={3}
            value={form.description}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Location</label>
          <input
            type="text"
            name="location"
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            value={form.location}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Price (₹/night)</label>
          <input
            type="number"
            name="price"
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            value={form.price}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Image URLs</label>
          {form.images.map((img, idx) => (
            <input
              key={idx}
              type="text"
              name="images"
              value={img}
              onChange={(e) => handleChange(e, idx)}
              className="w-full mb-2 p-2 border border-gray-300 rounded"
              placeholder={`Image URL ${idx + 1}`}
              required
            />
          ))}
          <button
            type="button"
            onClick={addImageField}
            className="text-pink-600 hover:underline mt-1"
          >
            + Add Another Image
          </button>
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-pink-600 text-white rounded hover:bg-pink-700 transition"
        >
          Submit Listing
        </button>
      </form>
    </div>
  );
}

export default AddListing;
