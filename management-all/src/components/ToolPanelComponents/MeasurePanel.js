// Libraries
import React from 'react';

// Measure Panel Component
const MeasurePanel = () => {
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2 gap-2">
        <button className="bg-blue-100 text-blue-700 py-2 px-3 rounded text-sm hover:bg-blue-200">
          Đo khoảng cách
        </button>
        <button className="bg-blue-100 text-blue-700 py-2 px-3 rounded text-sm hover:bg-blue-200">
          Đo diện tích
        </button>
      </div>
      <div className="text-xs text-gray-500 mt-2">
        Kết quả: 1.5 km
      </div>
    </div>
  );
};

export default MeasurePanel