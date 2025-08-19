// Libraries
import React from 'react';

// Personal components
import MapGrid from './MapGrid';
import MapFeatures from './MapFeatures';

// Map View Component
const MapView = () => {
  return (
    <div className="w-full h-full bg-gradient-to-br from-blue-50 to-green-50 relative overflow-hidden">
      {/* Simulated map */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100">
        {/* Grid pattern to simulate map */}
        <MapGrid />
        
        {/* Simulated map features */}
        <MapFeatures />
      </div>
    </div>
  );
};

export default MapView