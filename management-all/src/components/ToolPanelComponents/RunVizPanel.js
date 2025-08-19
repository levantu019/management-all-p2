// Libraries
import React from 'react';

// RunViz Component
const RunVizPanel = () => {
  return (
    <div className="space-y-2">
      <select className="w-full p-2 border border-gray-300 rounded text-sm">
        <option>Chọn kịch bản</option>
        <option>Kịch bản A</option>
        <option>Kịch bản B</option>
      </select>
      <button className="w-full bg-purple-600 text-white py-2 rounded text-sm hover:bg-purple-700">
        Bắt đầu chạy
      </button>
    </div>
  );
};

export default RunVizPanel