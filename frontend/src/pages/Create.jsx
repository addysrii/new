import React, { useState } from 'react';
import { Home, Search, Users, MessageCircle, PlusCircle, FolderClosed, User, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import img from "../../public/logo.png"
const Create = () => {
  const [projectData, setProjectData] = useState({
    name: '',
    description: '',
    techStack: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Project Data:', projectData);
    // Handle project submission logic here
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <div className="w-64 bg-teal-700 p-4 text-white">
        {/* Logo */}
        <div className="mb-8 mr-2 ">
         <img src={img} alt="Logo" className="w-24 h-auto mb-2 rounded-full  ml-16 " />
          <div className="text-xl font-bold ml-16">Netwik</div>
        </div>

        {/* Navigation Links */}
         <nav className="space-y-4 mx-12  ">
          <Link to={"/home"} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-teal-600 ">
            <Home size={20} />
            <span>Home</span>
         </Link>
          <Link to={"/search"} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-teal-600">
            <Search size={20} />
            <span>Search</span>
        </Link>
          <Link to={"/clubs"} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-teal-600">
            <Users size={20} />
            <span>Clubs</span>
         </Link>

           
            <Link to={"/chats"} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-teal-600" >
             <MessageCircle size={20} />
            <span>Chats</span></Link>

        <Link to={"/create"} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-teal-600" >        
        <PlusCircle size={20} />
        <span>Create</span>
        </Link>
          
          <Link to={"/projects"}   className="flex items-center space-x-3 p-2 rounded-lg hover:bg-teal-600">
            <FolderClosed size={20} />
            <span>Projects</span>
          </Link>
          <Link to={"/profile"} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-teal-600">
            <User size={20} />
            <span>Profile</span>
        </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex items-center space-x-2 mb-8">
            <Plus className="text-teal-600" size={24} />
            <h1 className="text-2xl font-semibold text-gray-800">Add New Project</h1>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Project Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Project Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={projectData.name}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter project name"
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={projectData.description}
                onChange={handleChange}
                rows={4}
                className="w-full p-3 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter project description"
              />
            </div>

            {/* Tech Stack */}
            <div>
              <label htmlFor="techStack" className="block text-sm font-medium text-gray-700 mb-1">
                Tech Stack
              </label>
              <input
                type="text"
                id="techStack"
                name="techStack"
                value={projectData.techStack}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter tech stack"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Create;