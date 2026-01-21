import React from 'react'

function BgblureShap({ className = '' }) {
  return (
    <div className={`${className}`}>
      <div className="relative w-full h-full">
        <div className="rounded-full w-full h-full  absolute left-0 -top-0 "></div>
      </div>
    </div>
  );
}

export default BgblureShap