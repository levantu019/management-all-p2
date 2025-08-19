// Libraries
import React from 'react';

// RunViz Component
const LocalDataPanel = () => {
  return (
    <div className="space-y-2">
      <button className="w-full bg-indigo-100 text-indigo-700 py-2 rounded text-sm hover:bg-indigo-200">
        Chọn tệp dữ liệu
      </button>
      <div className="text-xs text-gray-500">
        Định dạng hỗ trợ: JSON, CSV, KML
      </div>
    </div>
  );
};

export default LocalDataPanel