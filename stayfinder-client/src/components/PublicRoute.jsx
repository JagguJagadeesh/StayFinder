import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useUserStore";

const PublicRoute = ({ children }) => {
  const { user } = useAuthStore();
  return user ? <Navigate to="/" replace /> : children;
};

export default PublicRoute;
