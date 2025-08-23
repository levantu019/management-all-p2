import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import MapContainer from './components/MapContainer';
import DraggablePanel from './components/DraggablePanel';
import SplitPanelContent from './components/SplitPanelContent';

// Import PrimeReact CSS
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const App = () => {
    const [openPanels, setOpenPanels] = useState([]);

    const handleMenuItemClick = (panelType, title) => {
        // Check if panel is already open
        const existingPanel = openPanels.find(panel => panel.id === panelType);
        if (existingPanel) {
            // Panel already exists, just focus it (bring to front)
            setOpenPanels(prev => prev.map(panel => 
                panel.id === panelType 
                    ? { ...panel, zIndex: Math.max(...prev.map(p => p.zIndex)) + 1 }
                    : panel
            ));
            return;
        }

        // Create new panel
        const newPanel = {
            id: panelType,
            title: title,
            content: getPanelContent(panelType),
            position: { 
                x: 50 + (openPanels.length * 30), 
                y: 50 + (openPanels.length * 30) 
            },
            zIndex: Math.max(...openPanels.map(p => p.zIndex || 1000), 1000) + 1
        };

        setOpenPanels(prev => [...prev, newPanel]);
    };

    const getPanelContent = (panelType) => {
        switch (panelType) {
            case 'vietnam':
                return <SplitPanelContent value1="Vietnam" value2="Asia" />;
            case 'usa':
                return <SplitPanelContent value1="USA" value2="America" />;
            case 'japan':
                return <SplitPanelContent value1="Japan" value2="Asia" />;
            case 'charts':
                return (
                    <div className="p-4">
                        <h3>Analytics Charts</h3>
                        <p>This would contain various charts and analytics data.</p>
                        <div className="flex align-items-center justify-content-center" style={{ height: '300px', backgroundColor: '#f8f9fa', border: '2px dashed #dee2e6', borderRadius: '8px' }}>
                            <i className="pi pi-chart-bar text-4xl text-gray-500"></i>
                        </div>
                    </div>
                );
            case 'reports':
                return (
                    <div className="p-4">
                        <h3>Reports</h3>
                        <p>Generate and view various reports here.</p>
                        <div className="flex align-items-center justify-content-center" style={{ height: '300px', backgroundColor: '#f8f9fa', border: '2px dashed #dee2e6', borderRadius: '8px' }}>
                            <i className="pi pi-file-pdf text-4xl text-gray-500"></i>
                        </div>
                    </div>
                );
            case 'config':
                return (
                    <div className="p-4">
                        <h3>Configuration</h3>
                        <p>System configuration and settings.</p>
                        <div className="flex align-items-center justify-content-center" style={{ height: '300px', backgroundColor: '#f8f9fa', border: '2px dashed #dee2e6', borderRadius: '8px' }}>
                            <i className="pi pi-cog text-4xl text-gray-500"></i>
                        </div>
                    </div>
                );
            case 'users':
                return (
                    <div className="p-4">
                        <h3>User Management</h3>
                        <p>Manage users and permissions.</p>
                        <div className="flex align-items-center justify-content-center" style={{ height: '300px', backgroundColor: '#f8f9fa', border: '2px dashed #dee2e6', borderRadius: '8px' }}>
                            <i className="pi pi-users text-4xl text-gray-500"></i>
                        </div>
                    </div>
                );
            default:
                return <div>Panel content for {panelType}</div>;
        }
    };

    const handleClosePanel = (panelId) => {
        setOpenPanels(prev => prev.filter(panel => panel.id !== panelId));
    };

    return (
        <div className="h-screen flex">
            {/* Sidebar */}
            <Sidebar onMenuItemClick={handleMenuItemClick} />
            
            {/* Main Content Area */}
            <div className="flex-1 relative">
                <MapContainer />
                
                {/* Draggable Panels */}
                {openPanels.map(panel => (
                    <DraggablePanel
                        key={panel.id}
                        title={panel.title}
                        initialPosition={panel.position}
                        onClose={() => handleClosePanel(panel.id)}
                        style={{ zIndex: panel.zIndex }}
                    >
                        {panel.content}
                    </DraggablePanel>
                ))}
            </div>
        </div>
    );
};

export default App;