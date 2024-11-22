import React from 'react';
import { Home, Edit3, Users, BarChart2, Settings, Phone, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import img from "../../public/dp.jpg"
const Profile = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-teal-600 text-white p-6">
        {/* Profile Section */}
        <div className="mb-8">
           <img src={img} alt="Profile Picture" className="w-24 h-24 rounded-full object-cover ml-12" />
          <div className="text-center mb-4">
            <h2 className="text-xl">username</h2>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-4 ml-8">
          <Link to={"/edit"}>
            <button className="flex items-center w-full p-2 hover:bg-teal-700 rounded transition-colors">
              <Edit3 className="mr-3 h-5 w-5" />
              <span>Edit profile</span>
            </button>
          </Link>
          <Link to={"/connections"}>
            <button className="flex items-center w-full p-2 hover:bg-teal-700 rounded transition-colors">
              <Users className="mr-3 h-5 w-5" />
              <span>Connections</span>
            </button>
          </Link>
          <Link to={"/portfolio"}>
            <button className="flex items-center w-full p-2 hover:bg-teal-700 rounded transition-colors">
              <BarChart2 className="mr-3 h-5 w-5" />
              <span>Portfolio</span>
            </button>
          </Link>

          <div className="pt-8">
            <button className="flex items-center w-full p-2 hover:bg-teal-700 rounded transition-colors">
              <Settings className="mr-3 h-5 w-5" />
              <span>Settings</span>
            </button>

            <button className="flex items-center w-full p-2 hover:bg-teal-700 rounded transition-colors">
              <Phone className="mr-3 h-5 w-5" />
              <span>Contact Info</span>
            </button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Projects Section */}
        <div className="mb-8">
          <div className="card bg-white shadow-xl">
            <div className="card-body">
              <h2 className="text-xl font-semibold mb-4 text-black">My projects</h2>
              <div className="space-y-3">
                <div className="h-12 bg-gray-300 rounded flex items-center justify-between px-4">
                  <span  className='text-black'>Sahyog</span>
                </div>
                <div className="h-12 bg-gray-300 rounded flex items-center justify-between px-4">
                  <span  className='text-black'>TMS</span>
                </div>
                <div className="h-12 bg-gray-300 rounded flex items-center justify-between px-4">
                  <span  className='text-black'>Stiffy</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Clubs Section */}
        <div className="mb-8">
          <div className="card bg-white shadow-xl">
            <div className="card-body">
              <h2 className="text-xl font-semibold mb-4 text-black">My Clubs</h2>
              <div className="space-y-4">
                <div className="h-12 bg-gray-300 rounded flex items-center justify-between px-4">
                  <span className='text-black'>Navrang</span>
                </div>
                <div className="h-12 bg-gray-300 rounded flex items-center justify-between px-4">
                  <span  className='text-black' >Srajan</span>
                </div>
                <div className="h-12 bg-gray-300 rounded flex items-center justify-between px-4">
                  <span  className='text-black'>Prayas</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Rewards Section */}
        <div>
          <div className="card bg-white shadow-xl">
            <div className="card-body">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Star className="mr-2 h-5 w-5 text-navy-500 fill-current" />
                Rewards
              </h2>
              <div className="h-32 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
