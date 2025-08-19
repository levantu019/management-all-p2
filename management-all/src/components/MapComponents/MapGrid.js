// Libraries
import React from 'react'

// Map Grid Component
const MapGrid = () => {
  return (
    <div className="absolute inset-0 opacity-10">
      <div className="grid grid-cols-20 grid-rows-20 h-full">
        {Array.from({ length: 400 }).map((_, i) => (
          <div key={i} className="border border-gray-300"></div>
        ))}
      </div>
    </div>
  );
};

export default MapGrid