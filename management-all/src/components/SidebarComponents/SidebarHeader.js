// Libraries
import React from 'react';
import { ChevronLeft, Map as MapIcon, Menu } from 'lucide-react';

// Sidebar Header Component
const SidebarHeader = ({ collapsed, onToggle }) => {
  return (
    <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-blue-50 to-white">
      
      {/* Logo/Icon and Title */}
      {!collapsed && (
        <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <MapIcon className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-800">MapSystem</h1>
        </div>
      )}

      {/* Collapse/Expand Button */}
      <button
        onClick={onToggle}
        className="p-2 hover:bg-blue-100 rounded-lg transition-colors ml-auto block"
        title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed ? (
          <Menu className="h-5 w-5 text-blue-600 animate-spin-slow" />
        ) : (
          <ChevronLeft className="h-5 w-5 text-blue-600" />
        )}
      </button>
    </div>
  );
};

export default SidebarHeader