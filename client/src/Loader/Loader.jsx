import React, { useEffect, useRef, useState } from 'react';
import LoadingBar from 'react-top-loading-bar';

const Loader = ({ children }) => {
  const ref = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ref.current.continuousStart();
    const timer = setTimeout(() => {
      ref.current.complete();
      setLoading(false);
    }, 2000); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      {/* Loading bar */}
      <LoadingBar color="#67AE6E" ref={ref} height={3} waitingTime={200} />

      {/* Dark overlay */}
      {loading && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            zIndex: 9999,
          }}
        />
      )}

      {/* Actual content */}
      {!loading && children}
    </div>
  );
};

export default Loader;
