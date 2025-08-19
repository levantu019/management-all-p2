// Libraries
import React from 'react'

// Search Panel Component
const SearchPanel = () => {
  return (
    <div className="space-y-2">
      <input
        type="text"
        placeholder="Tìm kiếm địa điểm..."
        className="w-full p-2 border border-gray-300 rounded text-sm"
      />
      <button className="w-full bg-blue-600 text-white py-2 rounded text-sm hover:bg-blue-700">
        Tìm kiếm
      </button>
    </div>
  );
};

export default SearchPanel