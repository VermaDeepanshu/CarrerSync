import React, { createContext, useEffect, useState } from "react";
import { jobsData } from "../assets/assets";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const [searchFilter, setSearchFilter] = useState({
    title: '',
    location: '',
  });

  const [isSearched, setIsSearched] = useState(false);

  const [jobs , setJobs] = useState([]); // Added jobs state

  const [showRecuriterLogin , setShowRecuriterLogin] = useState(false)

  const fetchJobs = async () => {
    setJobs(jobsData);
  }

  useEffect(() => {
    fetchJobs();
  },[]);

  const value = {
    searchFilter,
    setSearchFilter,
    isSearched,
    setIsSearched,
    jobs,
    setJobs, 
    showRecuriterLogin,
    setShowRecuriterLogin
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};
