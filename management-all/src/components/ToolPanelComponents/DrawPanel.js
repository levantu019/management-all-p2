// Libraries
import React from 'react';

// Draw Panel Component
const DrawPanel = () => {
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2 gap-2">
        <button className="bg-green-100 text-green-700 py-2 px-3 rounded text-sm hover:bg-green-200">
          Vẽ đường
        </button>
        <button className="bg-green-100 text-green-700 py-2 px-3 rounded text-sm hover:bg-green-200">
          Vẽ vùng
        </button>
      </div>
      <button className="w-full bg-red-100 text-red-700 py-2 rounded text-sm hover:bg-red-200">
        Xóa tất cả
      </button>
    </div>
  );
};

export default DrawPanel