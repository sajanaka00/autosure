import { User, Car, Plus, List, Home } from 'lucide-react';
import { useState } from 'react';
import Navbar from '../common/Navbar';

export default function Dashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('home');

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'bg-purple-100 text-purple-800';
      case 'dealer': return 'bg-green-100 text-green-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  // Content based on active tab and user role
  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome, {user.firstName}!</h2>
            <p className="text-gray-600 mb-6">You're successfully logged in</p>
            
            <div className="bg-gray-50 rounded-lg p-4 text-left max-w-md mx-auto">
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
          </div>
        );

      case 'browse':
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Browse Cars</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Sample car listings */}
              {[1, 2, 3, 4, 5, 6].map((car) => (
                <div key={car} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="h-48 bg-gray-200 flex items-center justify-center">
                    <Car className="w-16 h-16 text-gray-400" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">Sample Car {car}</h3>
                    <p className="text-gray-600 mb-2">2023 Model • Automatic</p>
                    <p className="text-2xl font-bold text-blue-600">$25,000</p>
                    <button className="w-full mt-3 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'cars':
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">My Cars</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Sample dealer car listings */}
              {[1, 2, 3].map((car) => (
                <div key={car} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="h-48 bg-gray-200 flex items-center justify-center">
                    <Car className="w-16 h-16 text-gray-400" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">My Car {car}</h3>
                    <p className="text-gray-600 mb-2">2023 Model • Automatic</p>
                    <p className="text-2xl font-bold text-green-600">$25,000</p>
                    <div className="flex gap-2 mt-3">
                      <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                        Edit
                      </button>
                      <button className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'add-car':
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Car</h2>
            <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Car Make</label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Car Model</label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                    <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                    <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" rows="4"></textarea>
                </div>
                <button type="submit" className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors">
                  Add Car
                </button>
              </form>
            </div>
          </div>
        );

      case 'orders':
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Orders</h2>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Car</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[1, 2, 3].map((order) => (
                      <tr key={order}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#ORD00{order}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Sample Car {order}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Customer {order}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                            Completed
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$25,000</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'my-orders':
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">My Orders</h2>
            <div className="space-y-4">
              {[1, 2].map((order) => (
                <div key={order} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">Order #ORD00{order}</h3>
                      <p className="text-gray-600">Sample Car {order} • 2023 Model</p>
                    </div>
                    <span className="inline-flex px-3 py-1 text-sm font-semibold rounded-full bg-blue-100 text-blue-800">
                      Processing
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-2xl font-bold text-blue-600">$25,000</p>
                    <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        user={user} 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        onLogout={onLogout} 
      />
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>
    </div>
  );
}