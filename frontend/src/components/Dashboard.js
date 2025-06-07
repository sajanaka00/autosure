import { User } from 'lucide-react';

export default function Dashboard({ user, onLogout }) {
  const handleLogout = () => {
    tokenManager.removeToken();
    tokenManager.removeUser();
    onLogout();
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'bg-purple-100 text-purple-800';
      case 'dealer': return 'bg-green-100 text-green-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md text-center">
        <div className="mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome!</h2>
          <p className="text-gray-600">You're successfully logged in</p>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
          <div className="mb-3">
            <p className="text-sm text-gray-500 mb-1">Name</p>
            <p className="font-medium text-gray-800">{user.firstName} {user.lastName}</p>
          </div>
          
          <div className="mb-3">
            <p className="text-sm text-gray-500 mb-1">Email</p>
            <p className="font-medium text-gray-800">{user.email}</p>
          </div>
          
          {user.phone && (
            <div className="mb-3">
              <p className="text-sm text-gray-500 mb-1">Phone</p>
              <p className="font-medium text-gray-800">{user.phone}</p>
            </div>
          )}
          
          <div className="mb-3">
            <p className="text-sm text-gray-500 mb-1">Role</p>
            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
            </span>
          </div>
          
          <div>
            <p className="text-sm text-gray-500 mb-1">Account Status</p>
            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
              user.isVerified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            }`}>
              {user.isVerified ? 'Verified' : 'Pending Verification'}
            </span>
          </div>
        </div>
        
        <button
          onClick={handleLogout}
          className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-200 flex items-center justify-center"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </button>
      </div>
    </div>
  );
}
