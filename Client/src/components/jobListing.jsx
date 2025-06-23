// JobListing.jsx
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { assets, JobLocations, JobCategories } from '../assets/assets';
import JobCard from './JobCard';

const PAGE_SIZE = 6;

const JobListing = () => {
  const {
    searchFilter,
    isSearched,
    setSearchFilter,
    jobs = [],
  } = useContext(AppContext);

  const [showFilter, setShowFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState(jobs);

  const handleCategoryChange = (category) => {
    setSelectedCategory(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleLocationChange = (location) => {
    setSelectedLocations(prev =>
      prev.includes(location)
        ? prev.filter(l => l !== location)
        : [...prev, location]
    );
  };

  useEffect(() => {
    const matchCategory = job =>
      selectedCategory.length === 0 || selectedCategory.includes(job.category);
    const matchLocation = job =>
      selectedLocations.length === 0 || selectedLocations.includes(job.location);
    const matchTitle = job =>
      searchFilter.title === '' ||
      job.title.toLowerCase().includes(searchFilter.title.toLowerCase());
    const matchLocationFilter = job =>
      searchFilter.location === '' ||
      job.location.toLowerCase().includes(searchFilter.location.toLowerCase());

    const newFilteredJobs = jobs
      .slice()
      .reverse()
      .filter(
        job =>
          matchCategory(job) &&
          matchLocation(job) &&
          matchTitle(job) &&
          matchLocationFilter(job)
      );

    setFilteredJobs(newFilteredJobs);
    setCurrentPage(1);
  }, [jobs, searchFilter, selectedCategory, selectedLocations]);

  const totalPages = Math.ceil(filteredJobs.length / PAGE_SIZE) || 1;
  const pagedJobs = filteredJobs.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <div className="container 2xl:px-20 mx-auto flex flex-col lg:flex-row max-lg:space-y-8 py-8">
      {/* Sidebar */}
      <div className="w-full lg:w-1/4 bg-white px-4">
        {/* Active Filters */}
        {isSearched && (searchFilter.title || searchFilter.location) && (
          <>
            <h3 className="font-medium text-lg mb-4">Current search</h3>
            <div className="mb-4 text-gray-600">
              {searchFilter.title && (
                <span className="inline-flex items-center gap-2.5 bg-blue-50 border border-blue-200 px-4 py-1.5 rounded">
                  {searchFilter.title}
                  <img
                    onClick={() =>
                      setSearchFilter(prev => ({ ...prev, title: '' }))
                    }
                    className="cursor-pointer"
                    src={assets.cross_icon}
                    alt="Remove title"
                  />
                </span>
              )}
              {searchFilter.location && (
                <span className="ml-2 inline-flex items-center gap-2.5 bg-red-50 border border-red-200 px-4 py-1.5 rounded">
                  {searchFilter.location}
                  <img
                    onClick={() =>
                      setSearchFilter(prev => ({ ...prev, location: '' }))
                    }
                    className="cursor-pointer"
                    src={assets.cross_icon}
                    alt="Remove location"
                  />
                </span>
              )}
            </div>
          </>
        )}

        {/* Filter Toggle for Mobile */}
        <button
          onClick={() => setShowFilter(prev => !prev)}
          className="px-6 py-1.5 rounded border border-gray-400 lg:hidden"
        >
          {showFilter ? 'Close' : 'Filters'}
        </button>

        {/* Categories */}
        <div className={showFilter ? '' : 'max-lg:hidden'}>
          <h4 className="font-medium text-lg py-4 pt-14">Search by Categories</h4>
          <ul className="space-y-4 text-gray-600">
            {JobCategories.map((category, idx) => (
              <li className="flex gap-3 items-center" key={idx}>
                <input
                  className="scale-125"
                  type="checkbox"
                  onChange={() => handleCategoryChange(category)}
                  checked={selectedCategory.includes(category)}
                />
                <label htmlFor={`category-${idx}`}>{category}</label>
              </li>
            ))}
          </ul>
        </div>

        {/* Locations */}
        <div className={showFilter ? '' : 'max-lg:hidden'}>
          <h4 className="font-medium text-lg py-4">Search by Locations</h4>
          <ul className="space-y-4 text-gray-600">
            {JobLocations.map((loc, idx) => (
              <li className="flex gap-3 items-center" key={idx}>
                <input
                  className="scale-125"
                  type="checkbox"
                  onChange={() => handleLocationChange(loc)}
                  checked={selectedLocations.includes(loc)}
                />
                <label htmlFor={`location-${idx}`}>{loc}</label>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Job Listings */}
      <section className="w-full lg:w-3/4 text-gray-800 max-lg:px-4">
        <h3 className="font-medium text-3xl py-2" id="job-list">Latest jobs</h3>
        <p className="mb-8">Get your desired job from top companies</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {pagedJobs.map(job => (
            <JobCard key={job.id || job.title} job={job} />
          ))}
        </div>

        {/* Pagination */}
        {filteredJobs.length > PAGE_SIZE && (
          <div className="mt-8 flex items-center gap-2 justify-center">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              className="disabled:opacity-30"
            >
              <img src={assets.left_arrow_icon} alt="Previous" />
            </button>

            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === idx + 1
                    ? 'bg-blue-600 text-white'
                    : 'border border-gray-400'
                }`}
              >
                {idx + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              className="disabled:opacity-30"
            >
              <img src={assets.right_arrow_icon} alt="Next" />
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default JobListing;
