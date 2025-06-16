import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/useUserStore.js';

export default function PrivateRoute({ children }) {
  const user = useAuthStore(state => state.user);
  if (user === null) return <Navigate to="/login" />;
  return children;
}
