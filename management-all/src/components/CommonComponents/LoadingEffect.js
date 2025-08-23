// Libraries
import React from 'react';
import { ProgressSpinner } from 'primereact/progressspinner';

// Personal components


// Loading Effect Component
const LoadingEffect = ({ collapsed }) => {
  return (
    <div className="p-4 space-y-3">
      {!collapsed && (
        <div className="text-sm text-gray-500 text-center mb-4">
          Đang tải dữ liệu...
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

//
const LoadingOverlay = ({ message = "Loading data..." }) => (
    <div className="flex items-center justify-center p-8">
        <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" />
        <span className="ml-3 text-gray-600">{message}</span>
    </div>
);

export { LoadingOverlay, LoadingEffect };