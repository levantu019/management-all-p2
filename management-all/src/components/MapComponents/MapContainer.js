// Libraries
import React from 'react';

// Personal components
import MapView from './MapView';
import MapControls from './MapControls';
import MapInfo from './MapInfo';
import ToolPanel from '../ToolPanelComponents/ToolPanel';


// Map Container Component
const MapContainer = ({ activeFunction, onCloseToolPanel }) => {
  return (
    <main className="flex-1 relative">
      <MapView />
      <MapControls />
      <MapInfo />
      <ToolPanel activeFunction={activeFunction} onClose={onCloseToolPanel}/>
    </main>
  );
};

export default MapContainer