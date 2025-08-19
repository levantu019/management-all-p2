// Libraries
import React from 'react';
import { Settings } from 'lucide-react';

// Personal components


// Sidebar Error Component
const SidebarError = ({ error, onRetry, collapsed }) => {
  return (
    <div className="p-4">
      {!collapsed && (
        <>
          <div className="text-sm text-red-600 mb-3 text-center">
            {error}
          </div>
          <button 
            onClick={onRetry}
            className="w-full bg-red-50 hover:bg-red-100 text-red-700 py-2 px-3 rounded text-sm transition-colors"
          >
            Thử lại
          </button>
        </>
      )}
      {collapsed && (
        <button 
          onClick={onRetry}
          className="w-full p-2 text-red-600 hover:bg-red-50 rounded"
          title="Thử lại"
        >
          <Settings className="h-5 w-5 mx-auto" />
        </button>
      )}
    </div>
  );
};

export default SidebarError