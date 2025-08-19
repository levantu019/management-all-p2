// Libraries
import React from 'react';

// Zoom Button Component
const ZoomButton = ({ label }) => {
  return (
    <button className="w-8 h-8 bg-white hover:bg-gray-50 border rounded flex items-center justify-center text-sm font-bold">
      {label}
    </button>
  );
};

export default ZoomButton