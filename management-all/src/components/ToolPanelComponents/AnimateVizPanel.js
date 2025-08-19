// Libraries
import React from 'react';

// RunViz Component
const AnimateVizPanel = () => {
  return (
    <div className="space-y-2">
      <select className="w-full p-2 border border-gray-300 rounded text-sm">
        <option>Loại hoạt hình</option>
        <option>Fade In/Out</option>
        <option>Zoom In/Out</option>
        <option>Rotate</option>
      </select>
      <div className="flex space-x-2">
        <button className="flex-1 bg-orange-100 text-orange-700 py-2 rounded text-sm hover:bg-orange-200">
          Phát
        </button>
        <button className="flex-1 bg-gray-100 text-gray-700 py-2 rounded text-sm hover:bg-gray-200">
          Dừng
        </button>
      </div>
    </div>
  );
};

export default AnimateVizPanel