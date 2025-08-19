// Libraries
import React from 'react';

// Filter Panel Component
const FilterPanel = () => {
  return (
    <div className="space-y-2">
      <select className="w-full p-2 border border-gray-300 rounded text-sm">
        <option>Tất cả danh mục</option>
        <option>Nhà hàng</option>
        <option>Bệnh viện</option>
        <option>Trường học</option>
      </select>
      <button className="w-full bg-green-600 text-white py-2 rounded text-sm hover:bg-green-700">
        Áp dụng bộ lọc
      </button>
    </div>
  );
};
export default FilterPanel