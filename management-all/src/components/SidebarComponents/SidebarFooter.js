// Libraries
import React from 'react'

// Sidebar Footer Component
const SidebarFooter = ({ collapsed }) => {
  if (collapsed) return null;
  
  return (
    <div className="p-4">
      <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
        <h4 className="text-sm font-semibold text-blue-800 mb-1">
          Trợ giúp
        </h4>
        <p className="text-xs text-blue-600">
          Cần hỗ trợ? Liên hệ với chúng tôi
        </p>
      </div>
    </div>
  );
};

export default SidebarFooter