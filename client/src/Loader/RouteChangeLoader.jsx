import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Loader from './Loader';  // তোমার Loader.jsx ফাইলটি এখানে ব্যবহার করবো

const RouteChangeLoader = ({ children }) => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);  // Initially set to true to show loading

  useEffect(() => {
    setLoading(true); // Start loading animation

    const timer = setTimeout(() => {
      setLoading(false); // Stop loading after 1 second (or your desired time)
    }, 1000); // Adjust time if needed (in milliseconds)
    
    return () => clearTimeout(timer);
  }, [location]); // When the route changes

  return (
    <Loader>
      {loading ? (
        <Loader/> // You can show a loading message here, or leave it empty
      ) : (
        children // Show content once loading is complete
      )}
    </Loader>
  );
};

export default RouteChangeLoader;
