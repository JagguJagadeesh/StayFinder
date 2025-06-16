import { Link } from "react-router-dom"
import { useAuthStore } from "../store/useUserStore"
import Button from "./Button"
import axios from "axios"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { CiUser } from "react-icons/ci";
import ProfileDropdown from "./ProfileDropdown"



function NavBar() {
  const navigate = useNavigate();
  const user = useAuthStore(s=>s.user)
  const logout = useAuthStore(s=>s.logout)

  const handleLogot = async () => {
    await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/logout`,null,{
      withCredentials: true
    });
    logout()
    navigate('/login')
    toast.success('Logout Successfully...')
  }

  return (
    <div className='flex w-full items-center font-extralight justify-between px-6 pb-2 pt-4'>
        <div className='flex '>
            <div>
                <p className='text-4xl font-light  text-pink-600'><Link to={'/'}>StayFinder</Link></p>
            </div>
        </div>
        <div className="">
            {user?
            <div className="flex items-center gap-2">
              <Button onClick={handleLogot} className=' border-l text-white rounded-r-lg bg-pink-600'>Logout</Button>
              <ProfileDropdown/>
            </div>:
            <div className="flex rounded-lg border-pink-600 border">
            <Link to={'/login'} className="px-4 py-2">Login</Link>
            <Link to={'/register'} className="px-3 py-1 border-l text-white rounded-r-lg bg-pink-600">Get Start</Link>
            </div>}
        </div>
    </div>
  )
}

export default NavBar