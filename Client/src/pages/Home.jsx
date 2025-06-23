import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Herotemp';
import JobListing from '../components/jobListing'; // ✅ Capitalized import
import AppDownload from '../components/AppDownload'; // Importing AppDownload component
import Footer from '../components/Footertemp'; // Importing footer component

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <JobListing /> {/* ✅ Use with capital 'J' */}
      <AppDownload />
      <Footer />
    </div>
  );
};

export default Home;
