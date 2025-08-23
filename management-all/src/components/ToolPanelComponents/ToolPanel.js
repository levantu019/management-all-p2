// Libraries
import React, { useState, useRef } from 'react';
import { Panel } from 'primereact/panel';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';

// Personal components
import ToolPanelContent from './ToolPanelContent';

// Tool Panel Component with PrimeReact Draggable (Alternative approach)
const ToolPanel = ({ activeFunction, onClose }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [position, setPosition] = useState({ x: 16, y: 16 }); // 1rem = 16px
  const dragRef = useRef(null);
  const dragStartPos = useRef({ x: 0, y: 0 });

  // Ensure activeFunction is defined before rendering
  // If not, return null to avoid rendering the panel
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

  // Handle drag start
  const handleDragStart = (e) => {
    setIsDragging(true);
    dragStartPos.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y
    };
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', '');
  };

  // Handle drag over (required for drop to work)
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Handle drop
  const handleDrop = (e) => {
    e.preventDefault();
    const newX = e.clientX - dragStartPos.current.x;
    const newY = e.clientY - dragStartPos.current.y;
    
    // Keep panel within viewport bounds
    const maxX = window.innerWidth - 256; // 16rem = 256px
    const maxY = window.innerHeight - 200;
    
    setPosition({
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(0, Math.min(newY, maxY))
    });
    setIsDragging(false);
  };

  // Handle drag end
  const handleDragEnd = () => {
    setIsDragging(false);
  };

  // Toggle minimize
  const handleMinimize = (e) => {
    e.stopPropagation();
    setIsMinimized(!isMinimized);
  };

  // Custom header template
  const headerTemplate = (options) => {
    const className = `${options.className} flex align-items-center justify-content-between cursor-move`;
    
    return (
      <div 
        ref={dragRef}
        className={className}
        style={{
          userSelect: 'none',
          padding: '0.75rem 1rem',
          cursor: isDragging ? 'grabbing' : 'grab'
        }}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
      >
        {/* Drag handle and title */}
        <div className="flex align-items-center">
          <i 
            className={`pi pi-arrows-alt mr-2 ${isDragging ? 'text-primary' : 'text-600'}`}
            style={{ fontSize: '0.875rem' }}
          />
          <span className="font-semibold text-900">
            {getFunctionLabel(activeFunction)}
          </span>
        </div>
        
        {/* Action buttons */}
        <div className="flex align-items-center gap-2">
          {/* Minimize/Maximize button */}
          <Button
            icon={isMinimized ? "pi pi-window-maximize" : "pi pi-window-minimize"}
            className="p-button-rounded p-button-text p-button-sm"
            severity="secondary"
            onClick={handleMinimize}
            tooltip={isMinimized ? "Mở rộng" : "Thu gọn"}
            tooltipOptions={{ position: 'bottom' }}
            style={{ width: '1.75rem', height: '1.75rem' }}
          />
          
          {/* Close button */}
          <Button
            icon="pi pi-times"
            className="p-button-rounded p-button-text p-button-sm"
            severity="danger"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            tooltip="Đóng"
            tooltipOptions={{ position: 'bottom' }}
            style={{ width: '1.75rem', height: '1.75rem' }}
          />
        </div>
      </div>
    );
  };

  return (
    <div
      className={`absolute z-5 ${isDragging ? 'shadow-8' : 'shadow-4'}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        minWidth: '16rem',
        maxWidth: '24rem',
        transition: isDragging ? 'none' : 'box-shadow 0.2s ease'
      }}
      draggable
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragEnd={handleDragEnd}
    >
      <Panel
        headerTemplate={headerTemplate}
        className={`tool-panel ${isDragging ? 'border-primary-500' : ''}`}
        style={{
          border: isDragging ? '2px solid var(--primary-color)' : undefined,
          transition: 'border-color 0.2s ease'
        }}
        collapsed={isMinimized}
        toggleable={false}
      >
        {/* Panel Content - only show when not minimized */}
        {!isMinimized && (
          <div className="p-3" style={{ userSelect: 'none' }}>
            <ToolPanelContent activeFunction={activeFunction} />
          </div>
        )}
      </Panel>
    </div>
  );
};

export default ToolPanel;