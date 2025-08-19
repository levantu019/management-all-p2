// Libraries
import React from 'react';

// Panel Components
const LayersPanel = () => {
  const layers = [
    { id: 'base', label: 'Bản đồ cơ sở', checked: true },
    { id: 'traffic', label: 'Giao thông', checked: false },
    { id: 'terrain', label: 'Địa hình', checked: false }
  ];

  return (
    <div className="space-y-2">
      {layers.map(layer => (
        <label key={layer.id} className="flex items-center space-x-2">
          <input type="checkbox" defaultChecked={layer.checked} className="rounded" />
          <span className="text-sm">{layer.label}</span>
        </label>
      ))}
    </div>
  );
};

export default LayersPanel