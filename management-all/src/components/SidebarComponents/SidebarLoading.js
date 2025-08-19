// Libraries
import React from 'react';

// Personal components


// Sidebar Loading Component
const SidebarLoading = ({ collapsed }) => {
  return (
    <div className="p-4 space-y-3">
      {!collapsed && (
        <div className="text-sm text-gray-500 text-center mb-4">
          Đang tải menu...
        </div>
      )}
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex items-center space-x-3 p-2">
          <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
          {!collapsed && (
            <div className="flex-1 h-4 bg-gray-200 rounded animate-pulse"></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SidebarLoading