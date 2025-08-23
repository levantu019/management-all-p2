import React, { useState, useRef, useEffect } from 'react';
import { Button } from 'primereact/button';
import './css/DraggablePanel.css'; // Assuming you have a CSS file for styles

const DraggablePanel = ({ 
    children, 
    title, 
    onClose, 
    initialPosition = { x: 100, y: 100 },
    initialSize = { width: 800, height: 600 },
    minSize = { width: 400, height: 300 }
}) => {
    const [position, setPosition] = useState(initialPosition);
    const [size, setSize] = useState(initialSize);
    const [isMaximized, setIsMaximized] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [lastPosition, setLastPosition] = useState(initialPosition);
    const [lastSize, setLastSize] = useState(initialSize);
    
    const panelRef = useRef(null);
    const headerRef = useRef(null);

    // Handle dragging
    const handleMouseDown = (e) => {
        if (isMaximized) return;
        
        setIsDragging(true);
        setDragStart({
            x: e.clientX - position.x,
            y: e.clientY - position.y
        });
    };

    const handleMouseMove = (e) => {
        if (!isDragging || isMaximized) return;
        
        const newX = e.clientX - dragStart.x;
        const newY = e.clientY - dragStart.y;
        
        // Constrain to viewport
        const maxX = window.innerWidth - size.width;
        const maxY = window.innerHeight - size.height;
        
        setPosition({
            x: Math.max(0, Math.min(newX, maxX)),
            y: Math.max(0, Math.min(newY, maxY))
        });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        setIsResizing(false);
    };

    useEffect(() => {
        if (isDragging || isResizing) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
            return () => {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
            };
        }
    }, [isDragging, isResizing, dragStart, position, size]);

    // Handle maximize/minimize
    const handleMaximize = () => {
        if (isMaximized) {
            setPosition(lastPosition);
            setSize(lastSize);
            setIsMaximized(false);
        } else {
            setLastPosition(position);
            setLastSize(size);
            setPosition({ x: 0, y: 0 });
            setSize({ width: window.innerWidth, height: window.innerHeight });
            setIsMaximized(true);
        }
    };

    // Handle minimize (just hide for now)
    const handleMinimize = () => {
        // You could implement a minimize to taskbar functionality here
        console.log('Minimize clicked');
    };

    const panelStyle = {
        position: 'fixed',
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
        zIndex: 1000,
        backgroundColor: 'white',
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
    };

    return (
        <div ref={panelRef} style={panelStyle} className="draggable-panel">
            {/* Header */}
            <div 
                ref={headerRef}
                className="draggable-panel-header"
                onMouseDown={handleMouseDown}
                style={{
                    padding: '8px 12px',
                    backgroundColor: '#f8f9fa',
                    borderBottom: '1px solid #dee2e6',
                    cursor: isDragging ? 'grabbing' : 'grab',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    userSelect: 'none'
                }}
            >
                <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>{title}</h4>
                <div className="flex gap-1">
                    <Button
                        icon="pi pi-minus"
                        size="small"
                        text
                        rounded
                        onClick={handleMinimize}
                        tooltip="Minimize"
                        style={{ width: '24px', height: '24px' }}
                    />
                    <Button
                        icon={isMaximized ? "pi pi-window-minimize" : "pi pi-window-maximize"}
                        size="small"
                        text
                        rounded
                        onClick={handleMaximize}
                        tooltip={isMaximized ? "Restore" : "Maximize"}
                        style={{ width: '24px', height: '24px' }}
                    />
                    <Button
                        icon="pi pi-times"
                        size="small"
                        text
                        rounded
                        severity="danger"
                        onClick={onClose}
                        tooltip="Close"
                        style={{ width: '24px', height: '24px' }}
                    />
                </div>
            </div>

            {/* Content */}
            <div 
                className="draggable-panel-content"
                style={{ 
                    flex: 1, 
                    overflow: 'auto',
                    padding: '12px'
                }}
            >
                {children}
            </div>

            {/* Resize handles */}
            {!isMaximized && (
                <>
                    <div 
                        className="resize-handle resize-handle-se"
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            right: 0,
                            width: '12px',
                            height: '12px',
                            cursor: 'se-resize',
                            backgroundColor: 'transparent'
                        }}
                        onMouseDown={(e) => {
                            e.stopPropagation();
                            setIsResizing(true);
                            // Add resize logic here if needed
                        }}
                    />
                </>
            )}
        </div>
    );
};

export default DraggablePanel;