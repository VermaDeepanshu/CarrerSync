import React, { useContext, useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';

const RecuriterLogin = () => {
  const [state, setState] = useState('Login');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState(false);
  const [isTextDataSubmited, setIsTextDataSubmited] = useState(false);

  const { setShowRecuriterLogin } = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (state === "Sign up" && !isTextDataSubmited) {
      setIsTextDataSubmited(true);
      return;
    }

    // handle actual submit here
    alert(`${state} form submitted!`);
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className='absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'>
      <form onSubmit={onSubmitHandler} className='relative bg-white p-10 rounded-xl text-slate-500'>
        <h1 className='text-center text-2xl text-neutral-700 font-medium'>Recruiter {state}</h1>
        <p className='text-sm mb-4'>Welcome back! Please sign in to continue</p>

        {state === 'Sign up' && isTextDataSubmited ? (
          <div className='flex items-center gap-4 my-10'>
            <label htmlFor="image" className='cursor-pointer'>
              <img
                className='w-16 h-16 object-cover rounded-full'
                src={image ? URL.createObjectURL(image) : assets.upload_area}
                alt="Company Logo"
              />
              <input
                type="file"
                id="image"
                hidden
                accept="image/*"
                onChange={e => setImage(e.target.files[0])}
              />
            </label>
            <p>Upload Company<br />logo</p>
          </div>
        ) : (
          <>
            {state !== 'Login' && (
              <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5'>
                <img src={assets.person_icon} alt="" />
                <input
                  className='outline-none text-sm'
                  onChange={e => setName(e.target.value)}
                  value={name}
                  type='text'
                  placeholder='Company Name'
                  required
                />
              </div>
            )}

            <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5'>
              <img src={assets.email_icon} alt="" />
              <input
                className='outline-none text-sm'
                onChange={e => setEmail(e.target.value)}
                value={email}
                type='email'
                placeholder='Email'
                required
              />
            </div>

            <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5'>
              <img src={assets.lock_icon} alt="" />
              <input
                className='outline-none text-sm'
                onChange={e => setPassword(e.target.value)}
                value={password}
                type='password'
                placeholder='Password'
                required
              />
            </div>
          </>
        )}

        {state === 'Login' && (
          <p className='text-sm text-blue-600 mt-4 cursor-pointer'>Forgot password?</p>
        )}

        <button type='submit' className='bg-blue-600 w-full text-white py-2 rounded-full mt-4'>
          {state === 'Login' ? 'Login' : isTextDataSubmited ? 'Create account' : 'Next'}
        </button>

        {state === 'Login' ? (
          <p className='mt-5 text-center'>
            Don&apos;t have an account?{' '}
            <span className='text-blue-600 cursor-pointer' onClick={() => setState("Sign up")}>Sign up</span>
          </p>
        ) : (
          <p className='mt-5 text-center'>
            Already have an account?{' '}
            <span className='text-blue-600 cursor-pointer' onClick={() => setState("Login")}>Login</span>
          </p>
        )}

        <img
          onClick={() => setShowRecuriterLogin(false)}
          className='absolute top-5 right-5 cursor-pointer'
          src={assets.cross_icon}
          alt="Close"
        />
      </form>
    </div>
  );
};

export default RecuriterLogin;
