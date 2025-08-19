// Libraries
import React from 'react';
import { X } from 'lucide-react';

// Personal components
import ToolPanelContent from './ToolPanelContent';

// Tool Panel Component
const ToolPanel = ({ activeFunction, onClose }) => {
  if (!activeFunction) return null;

  const getFunctionLabel = (functionId) => {
    const functionLabels = {
      'measure': 'Đo đạc',
      'draw': 'Vẽ',
      'run-viz': 'Chạy trực quan hóa',
      'fly-viz': 'Bay qua bản đồ',
      'animate-viz': 'Hoạt hình dữ liệu',
      'layers': 'Lớp bản đồ',
      'search': 'Tìm kiếm',
      'local-data': 'Dữ liệu cục bộ',
      'remote-data': 'Dữ liệu từ xa',
      'filter': 'Bộ lọc',
      'marker': 'Đánh dấu'
    };
    return functionLabels[functionId] || functionId;
  };

  return (
    <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg pt-0 pb-4 px-4 min-w-64 max-w-96">
      {/* Close button at the top-right corner of the panel */}
      <button
        onClick={onClose}
        className="absolute right-6 top-6 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-tr from-red-100 to-white hover:from-red-200 hover:to-red-50 border border-red-200 shadow-lg transition-all duration-200 m-0 p-0"
        title="Đóng"
        aria-label="Đóng"
      >
        <X className="w-5 h-5 text-red-500" />
      </button>
      {/* Panel title below the close button */}
      <div className="flex items-center mb-3 mt-8">
        <h3 className="font-semibold text-gray-800 flex-1">
          {getFunctionLabel(activeFunction)}
        </h3>
      </div>
      <ToolPanelContent activeFunction={activeFunction} />
    </div>
  );
};

export default ToolPanel;