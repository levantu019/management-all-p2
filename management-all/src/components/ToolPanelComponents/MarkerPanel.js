// Libraries
import React from 'react';

// RunViz Component
const MarkerPanel = () => {
  return (
    <div className="space-y-2">
      <input
        type="text"
        placeholder="Nhãn đánh dấu..."
        className="w-full p-2 border border-gray-300 rounded text-sm"
      />
      <div className="grid grid-cols-3 gap-2">
        <button className="bg-red-100 text-red-700 py-2 rounded text-sm hover:bg-red-200">🔴</button>
        <button className="bg-blue-100 text-blue-700 py-2 rounded text-sm hover:bg-blue-200">🔵</button>
        <button className="bg-green-100 text-green-700 py-2 rounded text-sm hover:bg-green-200">🟢</button>
      </div>
    </div>
  );
};

export default MarkerPanel