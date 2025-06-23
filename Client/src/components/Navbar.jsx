import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';
import { Link, useNavigate } from 'react-router-dom'; // ✅ Fixed: added useNavigate
import { AppContext } from '../context/AppContext';

const Navbar = () => {
    const { openSignIn } = useClerk();
    const { user } = useUser();
    const navigate = useNavigate(); // ✅ initialize navigate

    const {setShowRecuriterLogin} = useContext(AppContext);

    return (
        <div className='shadow py-4'>
            <div className='container px-4 2xl:px-20 mx-auto flex justify-between items-center'> 
                <img  
                    onClick={() => navigate('/')} 
                    src={assets.logo} 
                    alt="Logo" 
                    className='cursor-pointer' 
                /> 

                {user ? (
                    <div className='flex items-center gap-3'>
                        <Link to="/applications" className="text-blue-600 hover:underline">
                            Applied Jobs
                        </Link> 
                        <p>|</p>
                        <p className='max-sm:hidden'>Hi, {user.fullName}</p>
                        <UserButton />
                    </div>
                ) : (
                    <div className='flex gap-4 max-sm:text-xs'>
                        <button 
                         onClick={() => setShowRecuriterLogin(true)} 
                         className='text-gray-600'>Recruiter Login</button>
                        <button 
                            onClick={() => openSignIn()} 
                            className='bg-blue-600 text-white px-6 sm:px-9 py-2 rounded-full'
                        >
                            Login
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
