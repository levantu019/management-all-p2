// Libraries
import React, { useState } from 'react';

// Personal components
import Header from '../HeaderComponents/Header';
import Sidebar from '../SidebarComponents/Sidebar';
import MapContainer from '../MapComponents/MapContainer';

const MapDashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeFunction, setActiveFunction] = useState(null);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleFunctionChange = (functionId) => {
    setActiveFunction(functionId);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* <Header onToggleSidebar={toggleSidebar} /> */}
      
      <div className="flex-1 flex">
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggle={toggleSidebar}
          activeFunction={activeFunction}
          onFunctionChange={handleFunctionChange}
        />
        
        <MapContainer activeFunction={activeFunction} onCloseToolPanel={() => setActiveFunction(null)} />
      </div>
    </div>
  );
};

export default MapDashboard;