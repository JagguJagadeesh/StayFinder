import { useAuthStore } from '../store/useUserStore';

function Profile() {
  const user = useAuthStore((s) => s.user); // Moved inside the component

  if (!user) return <p className="text-center mt-10 text-gray-600">Loading profile...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-pink-200 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-6 space-y-6 border border-pink-300">
        <h2 className="text-2xl font-bold text-pink-600 text-center">My Profile</h2>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="text-lg font-medium">{user.name}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-lg font-medium">{user.email}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Role</p>
            <p className={`text-lg font-semibold ${user.role === 'host' ? 'text-purple-600' : 'text-green-600'}`}>
              {user.role}
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <button className="mt-4 px-5 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
