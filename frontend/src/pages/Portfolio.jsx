import React, { useState } from 'react';
import { PieChart, Pie, Cell, Label } from 'recharts';
import img from "../../public/dp.jpg"
const Portfolio = () => {
  // Sample data for pie chart
  const data = [
    { name: 'Completed', value: 30, label: 'Web Dev' },
    { name: 'In Progress', value: 45, label: 'DSA' },
    { name: 'Planning', value: 25, label: 'Projects' }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  // State to manage the label visibility
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Handle hover on pie slice
  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  // Handle mouse leave
  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  // Random data for the monthly tracker (true means completed, false means not completed)
  const generateMonthlyTrackerData = () => {
    let data = [];
    for (let i = 0; i < 31; i++) {
      data.push(Math.random() > 0.5); // Randomly mark some days as completed
    }
    return data;
  };

  const monthlyTrackerData = generateMonthlyTrackerData();

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-teal-600 text-white p-6">
        {/* Profile Section */}
        <div className="mb-8">
        
   
       <img src={img} alt="Logo" className="w-24 h-auto mb-2 rounded-full  ml-16" />
         
          <div className="text-center mb-4">
            <h2 className="text-xl">username</h2>
            <p className="text-sm text-black">Web Developer</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-4">
          <button className="flex items-center w-full p-2 hover:bg-teal-700 rounded transition-colors">
            <span>Edit profile</span>
          </button>
          
          <button className="flex items-center w-full p-2 hover:bg-teal-700 rounded transition-colors">
            <span>Connections</span>
          </button>
          
          <button className="flex items-center w-full p-2 bg-teal-700 rounded transition-colors">
            <span>Portfolio</span>
          </button>
          
          <div className="pt-8">
            <button className="flex items-center w-full p-2 hover:bg-teal-700 rounded transition-colors">
              <span>Settings</span>
            </button>
            
            <button className="flex items-center w-full p-2 hover:bg-teal-700 rounded transition-colors">
              <span>Contact Info</span>
            </button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="inline-flex items-center px-6 py-2 bg-teal-300 rounded-lg mb-8">
            <span className="text-xl font-semibold text-black">Portfolio</span>
          </div>

          <div className="grid grid-cols-3 gap-8">
            {/* Left Column - Progress Section */}
            <div className="col-span-2 space-y-8">
              <h2 className="text-xl font-semibold text-black">Manage your profile</h2>
              
              <div className="p-8 bg-gray-200 rounded-lg">
                <div className="flex flex-col items-center">
                  <PieChart width={300} height={300}>
                    <Pie
                      data={data}
                      cx={150}
                      cy={150}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {data.map((entry, index) => (
                        <Cell
                          key={index}
                          fill={COLORS[index % COLORS.length]}
                          onMouseEnter={() => handleMouseEnter(index)} 
                          onMouseLeave={handleMouseLeave} 
                        />
                      ))}
                    </Pie>
                    
                    {hoveredIndex !== null && (
                      <Label
                        value={data[hoveredIndex].label}
                        position="center"
                         fill={COLORS[hoveredIndex % COLORS.length]}
                        fontSize={14}
                        fontWeight="bold"
                      />
                    )}
                  </PieChart>
                  <span className="mt-4 text-lg text-black">progress</span>
                  <div className='flex-row space-x-4'>
                  <span className='font-semibold bg-blue-500  rounded-lg w-full text-black mt-2'>DSA</span>
                  <span className='font-semibold bg-yellow-600 w-44 rounded-lg  text-black mt-2'>PFOJECTS</span>
                  <span className='font-semibold bg-green-400 w-44 rounded-lg  text-black mt-2'>Webdev</span>
                </div>
                </div> 
              </div>
            </div>

            {/* Right Column - Projects Section */}
            <div className="space-y-8">
              <h2 className="text-xl font-semibold mb-4 text-black">Add new project</h2>
              <button className="w-full h-32 bg-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-300 transition-colors">
                <span className="text-black">+</span>
              </button>

              <div>
                <h2 className="text-xl font-semibold mb-4 text-black">Consistency</h2>
                <div className="bg-gray-200 p-4 rounded-lg">
                  <div className="grid grid-cols-7 gap-2">
                    {monthlyTrackerData.map((completed, index) => (
                      <div
                        key={index}
                        className={`h-12 w-12 flex items-center justify-center rounded-lg transition-all ease-in-out ${
                          completed
                            ? 'bg-green-500 transform scale-105 shadow-lg'
                            : 'bg-gray-300 hover:bg-gray-400 cursor-pointer'
                        }`}
                        title={completed ? "Completed!" : "Not Completed!"}
                      >
                        <span className="text-xs text-white">{index + 1}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4 text-black">Latest projects</h2>
                <div className="bg-gray-200 p-4 rounded-lg">
                  <div className="grid grid-cols-3 gap-4">
                    {/* Project Color Boxes */}
                    <div className="flex items-center space-x-4">
                      <div
                        className="w-16 h-16 rounded-xl flex justify-center items-center"
                        style={{ backgroundColor: '#5f9ea0' }}
                      >
                        <span className="text-black font-semibold ml-4">Web Dev</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div
                        className="w-16 h-16 rounded-xl flex justify-center items-center"
                        style={{ backgroundColor: '#db7093' }}
                      >
                        <span className=" font-semibold text-black">DSA</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div
                        className="w-16 h-16 rounded-xl flex justify-center items-center"
                        style={{ backgroundColor: '#deb887' }}
                      >
                        <span className=" font-semibold text-black">Projects</span>
                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Random Content */}
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4  text-black "> Ideas</h2>
                <p className="text-gray-600">
                  1. Idea 1: Build an AI-based Recommendation System.
                </p>
                <p className="text-gray-600">
                  2. Idea 2: Develop a Full-Stack Web Application for Portfolio Management.
                </p>
                <p className="text-gray-600">
                  3. Idea 3: Create an IoT-based Smart Home Automation System.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
