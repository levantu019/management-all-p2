// Libraries
import React from 'react';

// RunViz Component
const FlyVizPanel = () => {
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2 gap-2">
        <button className="bg-sky-100 text-sky-700 py-2 px-3 rounded text-sm hover:bg-sky-200">
          Bay thấp
        </button>
        <button className="bg-sky-100 text-sky-700 py-2 px-3 rounded text-sm hover:bg-sky-200">
          Bay cao
        </button>
      </div>
      <input
        type="range"
        min="1"
        max="10"
        className="w-full"
      />
      <div className="text-xs text-gray-500 text-center">Tốc độ bay</div>
    </div>
  );
};

export default FlyVizPanel