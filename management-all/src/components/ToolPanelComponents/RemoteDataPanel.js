// Libraries
import React from 'react';

// RunViz Component
const RemoteDataPanel = () => {
  return (
    <div className="space-y-2">
      <input
        type="text"
        placeholder="URL dữ liệu..."
        className="w-full p-2 border border-gray-300 rounded text-sm"
      />
      <button className="w-full bg-teal-600 text-white py-2 rounded text-sm hover:bg-teal-700">
        Tải dữ liệu
      </button>
    </div>
  );
};

export default RemoteDataPanel