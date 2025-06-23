import React from 'react';
import { Outlet, useNavigate, NavLink } from 'react-router-dom'; // ✅ Added NavLink
import { assets } from '../assets/assets'; // ✅ Added assets import

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Navbar for Recruiter Panel */}
      <div className="shadow py-4">
        <div className="px-5 flex justify-between items-center">
          <img
            onClick={() => navigate('/')}
            className="max-sm:w-32 cursor-pointer"
            src={assets.logo}
            alt="Logo"
          />
          <div className="flex items-center gap-3">
            <p className="max-sm:hidden">Welcome, GreatStack</p>
            <div className="relative group">
              <img
                className="w-8 border rounded-full"
                src={assets.company_icon}
                alt="Company Icon"
              />
              <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12">
                <ul className="list-none m-0 p-2 bg-white rounded-md border text-sm">
                  <li className="px-2 py-1 cursor-pointer pr-10">Logout</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main section */}
      <div className="flex items-start">
        {/* Sidebar */}
        <div className="inline-block min-h-screen border-r-2">
          <ul className="flex flex-col items-start pt-5 text-gray-800">
            <NavLink
              to="/dashboard/add-job"
              className={({ isActive }) =>
                `flex items-center gap-2 p-3 sm:px-6 w-full hover:bg-gray-100 ${
                  isActive ? 'bg-blue-100 border-r-4 border-blue-500' : ''
                }`
              }
            >
              <img src={assets.add_icon} alt="Add Job" className="min-w-4" />
              <p className="max-sm:hidden">Add Job</p>
            </NavLink>

            <NavLink
              to="/dashboard/manage-jobs"
              className={({ isActive }) =>
                `flex items-center gap-2 p-3 sm:px-6 w-full hover:bg-gray-100 ${
                  isActive ? 'bg-blue-100 border-r-4 border-blue-500' : ''
                }`
              }
            >
              <img src={assets.home_icon} alt="Manage Jobs" className="min-w-4" />
              <p className="max-sm:hidden">Manage Jobs</p>
            </NavLink>

            <NavLink
              to="/dashboard/view-applications"
              className={({ isActive }) =>
                `flex items-center gap-2 p-3 sm:px-6 w-full hover:bg-gray-100 ${
                  isActive ? 'bg-blue-100 border-r-4 border-blue-500' : ''
                }`
              }
            >
              <img src={assets.person_tick_icon} alt="View Applications" className="min-w-4" />
              <p className="max-sm:hidden">View Applications</p>
            </NavLink>
          </ul>
        </div>

        {/* Outlet for nested dashboard routes */}
        <div className="flex-1 p-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
