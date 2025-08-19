// Libraries
import React from 'react';

// Personal components
import ZoomButton from './ZoomButton';

// Map Controls Component
const MapControls = () => {
  return (
    <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-2 space-y-2">
      <ZoomButton label="+" />
      <ZoomButton label="-" />
    </div>
  );
};


export default MapControls