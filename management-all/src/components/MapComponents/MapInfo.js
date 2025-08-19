// Libraries
import React from 'react'

// Map Info Component
const MapInfo = () => {
  return (
    <>
      {/* Scale indicator */}
      <div className="absolute bottom-4 left-4 bg-white rounded px-2 py-1 text-xs shadow-lg">
        Tỷ lệ: 1:10,000
      </div>

      {/* Coordinates display */}
      <div className="absolute bottom-4 right-4 bg-white rounded px-2 py-1 text-xs shadow-lg">
        21.0285° N, 105.8542° E
      </div>
    </>
  );
};

export default MapInfo