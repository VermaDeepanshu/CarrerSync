import React, { useContext, useRef } from 'react';
import { assets } from '../assets/assets'; 
import { AppContext } from '../context/AppContext';

const Hero = () => {
  const { setSearchFilter, setIsSearched } = useContext(AppContext);

  const titleRef = useRef(null);
  const locationRef = useRef(null);

  const onSearch = () => {
    const title = titleRef.current.value;
    const location = locationRef.current.value;

    setSearchFilter({ title, location });
    setIsSearched(true);
    console.log('Search initiated with:', { title, location });
  };

  return (
    <div className='container 2xl:px-20 mx-auto my-10'>
      <div className='bg-gradient-to-r from-blue-500 to-blue-300 text-white py-16 text-center mx-2 rounded-xl'>
        <h2 className='text-2xl md:text-3xl lg:text-4xl font-medium mb-4'>
          Over 10,000+ jobs to apply
        </h2>
        <p className='mb-8 max-w-xl mx-auto text-sm font-light px-5'>
          Your Next Big Career Move Starts Right Here - Explore the Best
        </p>

        <div className='flex items-center justify-between bg-white text-gray-600 max-w-xl pl-4 mx-4 sm:mx-auto rounded'>
          <div className='flex items-center w-full'>
            <img className='h-4 sm:h-5' src={assets.search_icon} alt='Search Icon' />
            <input
              type='text'
              placeholder='Search for jobs'
              className='max-sm:text-xs p-2 rounded outline-none w-full'
              ref={titleRef}
            />
          </div>

          <div className='flex items-center w-full'>
            <img className='h-4 sm:h-5' src={assets.location_icon} alt='Location Icon' />
            <input
              type='text'
              placeholder='Location'
              className='max-sm:text-xs p-2 rounded outline-none w-full'
              ref={locationRef}
            />
          </div>

          <button onClick={onSearch} className='bg-blue-600 px-6 py-2 rounded text-white m-1'>
            Search
          </button>
        </div>
      </div>

      <div className='border border-gray-300 shadow-md mx-2 mt-5 p-6 rounded-md flex items-center gap-4 flex-wrap'>
        <div className='flex justify-center gap-10 lg:gap-16 flex-wrap'>
          <p className='font-medium'>Trusted by</p>
          <img className='h-6' src={assets.microsoft_logo} alt='Microsoft' />
          <img className='h-6' src={assets.walmart_logo} alt='Walmart' />
          <img className='h-6' src={assets.accenture_logo} alt='Accenture' />
          <img className='h-6' src={assets.samsung_logo} alt='Samsung' />
          <img className='h-6' src={assets.amazon_logo} alt='Amazon' />
          <img className='h-6' src={assets.adobe_logo} alt='Adobe' />
        </div>
      </div>
    </div>
  );
};

export default Hero;
