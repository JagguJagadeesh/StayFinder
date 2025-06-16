import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import Button from '../components/Button'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useAuthStore } from '../store/useUserStore';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react'


const roles = ['guest','host']

const loginSchema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(roles)
})

export default function Login() {
  const setUser = useAuthStore(s=>s.setUser);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: zodResolver(loginSchema) })

  useEffect(() => {
  axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/me`, { withCredentials: true })
    .then(res => setUser(res.data.user))
    .catch(() => setUser(null));
  }, []);
  const onSubmit = async (data) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/signin`,data,{
        withCredentials: true
      });
      console.log(res.data.user)
      toast.success(res.data.message)
      setUser(res.data.user);
      navigate('/');
      window.location.reload();
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.message)
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-pink-300 p-6"
    >
      <motion.div
        className="w-full max-w-lg bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg p-10"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <h2 className="text-3xl font-medium text-center text-gray-800 mb-3">Welcome back <span className='text-pink-600 font-extralight'><Link to={'/'}>StayFinder</Link></span></h2>
        <p className='text-sm text-center text-gray-600 mb-7'>Dont&apos;t have account | <Link className='text-blue-600' to={'/register'}>Signup</Link></p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <select
              {...register('role')}
              className="w-full px-3 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
              defaultValue="guest"
            >
              <option value="" disabled>Select role</option>
              <option value="guest">Guest</option>
              <option value="host">Host</option>
            </select>
            {errors.role && <p className="text-sm text-red-500 mt-1">{errors.role.message}</p>}
          </div>
          <div>
            <input
              {...register('email')}
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
            />
            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <input
              {...register('password')}
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
            />
            {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
          </div>
          <Button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Log In
          </Button>
        </form>
      </motion.div>
    </div>
  )
}
