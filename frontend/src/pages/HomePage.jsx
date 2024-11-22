import React, { useState, useEffect } from 'react';
import { Bluetooth, Home, Search, Users, MessageCircle, PlusCircle, FolderClosed, User, LoaderCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

const HomePage = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const { authUser } = useAuthStore();

  const fetchAllUsers = async () => {
    setIsLoadingUsers(true);
    try {
      const response = await fetch('http://localhost:5001/api/auth/usernames', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Add your authorization header if required
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch users');
    } finally {
      setIsLoadingUsers(false);
    }
  };

  useEffect(() => {
    // Initial fetch of users
    fetchAllUsers();
  }, []);

  const fetchDevices = async () => {
    setError(null);
    setIsScanning(true);
    
    try {
      await fetchAllUsers();
    } catch (err) {
      setError('Failed to fetch nearby devices');
    } finally {
      setTimeout(() => setIsScanning(false), 10000);
    }
  };

  // Navigation items
  const navigationItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Search, label: 'Search', path: '/search' },
    { icon: Users, label: 'Clubs', path: '/clubs' },
    { icon: MessageCircle, label: 'Chats', path: '/chats' },
    { icon: PlusCircle, label: 'Create', path: '/create' },
    { icon: FolderClosed, label: 'Projects', path: '/projects' },
    { icon: User, label: 'Profile', path: '/profile' }
  ];

  // Check if a user is online (you'll need to implement your own logic here)
  const isUserOnline = (userId) => {
    // Implement your online status check logic here
    return false; // Default to offline
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-teal-700 to-teal-800 p-6 text-white shadow-xl">
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto bg-white rounded-full overflow-hidden shadow-lg">
            <img 
              src={authUser?.profilePic || "/api/placeholder/96/96"} 
              alt="Profile" 
              className="w-full h-full object-cover" 
            />
          </div>
          <div className="text-2xl font-bold text-center mt-4">Netwik</div>
          <div className="text-sm text-center text-teal-100 mt-2">
            {authUser?.username || 'Welcome!'}
          </div>
        </div>
        
        <nav className="space-y-2">
          {navigationItems.map(({ icon: Icon, label, path }) => (
            <Link
              key={path}
              to={path}
              className="flex items-center space-x-3 p-3 rounded-lg transition-colors hover:bg-teal-600/50 group"
            >
              <Icon size={20} className="group-hover:scale-110 transition-transform" />
              <span className="font-medium">{label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Bluetooth Scanner</h2>
              <p className="text-gray-600">
                {isScanning ? 'Scanning for nearby devices...' : 'Ready to discover nearby devices'}
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 flex items-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" />
                </svg>
                {error}
              </div>
            )}

            {/* Radar Animation */}
            <div className="relative w-64 h-64 mx-auto mb-8">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-teal-500/20 to-teal-600/20 overflow-hidden">
                <div className="absolute inset-[10%] border border-teal-500/20 rounded-full" />
                <div className="absolute inset-[30%] border border-teal-500/20 rounded-full" />
                <div className="absolute inset-[50%] border border-teal-500/20 rounded-full" />
                
                {isScanning && (
                  <div className="absolute inset-0 origin-center animate-[spin_4s_linear_infinite]">
                    <div className="h-full w-1/2 bg-gradient-to-r from-teal-500/30 to-transparent" />
                  </div>
                )}

                <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-teal-500 rounded-full -translate-x-1/2 -translate-y-1/2 shadow-lg shadow-teal-500/50" />

                {users.filter(u => u._id !== authUser?._id).map((user, index) => (
                  <div
                    key={user._id}
                    className="absolute w-4 h-4 animate-pulse"
                    style={{
                      top: `${30 + Math.sin(index * 1.5) * 30}%`,
                      left: `${30 + Math.cos(index * 1.5) * 30}%`,
                    }}
                  >
                    
                    <div className="w-full h-full bg-teal-500 rounded-full" />
                    <div className="absolute top-5 left-5 whitespace-nowrap text-sm font-medium text-gray-700">
                      {user.username}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Device List */}
            <div className="space-y-3 mb-6">
              {users.filter(u => u._id !== authUser?._id).map(user => (
                <div
                  key={user._id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
                      {user.profilePic ? (
                        <img 
                          src={user.profilePic} 
                          alt={user.fullName} 
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <Bluetooth className="w-5 h-5 text-teal-600" />
                      )}
                    </div>
                    <div>
                      <span className="font-medium text-gray-800">{user.username}</span>
                      <p className="text-sm text-gray-500">
                        {isUserOnline(user._id) ? 'Online' : 'Offline'}
                      </p>
                    </div>
                  </div>
                  <Link 
                    to={`/chat/${user._id}`}
                    className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50"
                  >
                    Connect
                  </Link>
                </div>
              ))}
            </div>

            {users.length <= 1 && !isLoadingUsers && (
              <div className="text-center p-6 bg-gray-50 rounded-xl mb-6">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
                  <Bluetooth className="w-6 h-6 text-gray-400" />
                </div>
                <p className="text-gray-600">No other users found nearby</p>
                <p className="text-sm text-gray-500">Click scan to search for users</p>
              </div>
            )}

            <button
              onClick={fetchDevices}
              disabled={isLoadingUsers}
              className="w-full py-3 px-4 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-xl font-medium hover:from-teal-700 hover:to-teal-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoadingUsers ? (
                <LoaderCircle className="w-5 h-5 animate-spin" />
              ) : (
                <Bluetooth className="w-5 h-5" />
              )}
              {isLoadingUsers ? 'Scanning...' : (isScanning ? 'Stop Scan' : 'Start Scan')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;