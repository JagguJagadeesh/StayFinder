import { useEffect, useRef, useState } from 'react';
import { CiUser } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/useUserStore';

function ProfileDropdown() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const user = useAuthStore(s=>s.user)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-2 py-2 bg-pink-200 cursor-pointer rounded-full hover:bg-pink-300 transition"
      >
        <CiUser className="text-2xl" />
      </button>

      {open && (
        <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right opacity-80 bg-gradient-to-br from-pink-50 to-pink-100 border border-pink-600 divide-y divide-gray-100 rounded-md shadow-lg">
          <div className="px-4 py-2 text-sm text-pink-700 font-semibold">
            Hello, {user?.name || "Guest"}
          </div>
          <div className="py-1">
            <Link
              to="/profile"
              className="block px-4 py-2 text-sm text-pink-700 hover:bg-pink-200"
            >
              My Profile
            </Link>
            <Link
              to="/bookings"
              className="block px-4 py-2 text-sm text-pink-700 hover:bg-pink-200"
            >
              My Bookings
            </Link>
            <Link
              to="#"
              className="block px-4 py-2 text-sm text-pink-700 hover:bg-pink-200"
            >
              Wishlist
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileDropdown;
