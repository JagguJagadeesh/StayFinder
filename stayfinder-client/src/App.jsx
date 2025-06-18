import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Home from "./pages/Home.jsx";
import ListingDetail from "./pages/ListingDetail.jsx";
import Bookings from "./pages/Bookings.jsx";
import { useEffect } from "react";
import axios from "axios";
import { useAuthStore } from "./store/useUserStore.js";
import PrivateRoute from "./components/ProtectedRoute.jsx";
import PublicRoute from "./components/PublicRoute.jsx";
import Profile from "./pages/Profile.jsx";

function App() {
  const { setUser } = useAuthStore();

  useEffect(() => {
  axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/me`, { withCredentials: true })
    .then(res => setUser(res.data.user))
    .catch(() => setUser(null));
  }, []);


  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={
        <PublicRoute>
          <Login />
        </PublicRoute>
      } />
      <Route path="/register" element={
        <PublicRoute>
          <Register />
        </PublicRoute>
      } />
      <Route path="/listings/list/:id" element={<PrivateRoute>
        <ListingDetail />
      </PrivateRoute>} />
      <Route path="/bookings" element={<PrivateRoute>
        <Bookings />
      </PrivateRoute>} />
      <Route path="/profile" element={<PrivateRoute>
        <Profile />
      </PrivateRoute>} />
    </Routes>
  );
}

export default App;
