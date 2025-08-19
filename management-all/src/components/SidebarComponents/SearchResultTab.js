// Libraries
import React from 'react';
import { useState } from 'react';

// Personal components
import SearchSettingsSection from './SearchSettingsSection';
import SearchResultsSection from './SearchResultsSection';

// Refactored SearchResultTab Component
const SearchResultTab = ({ collapsed }) => {
  const [timeFrom, setTimeFrom] = useState('');
  const [timeTo, setTimeTo] = useState('');
  const [ai1ShowDrew, setAi1ShowDrew] = useState(false);
  const [ai1ShowAll, setAi1ShowAll] = useState(false);
  const [ai2ShowDrew, setAi2ShowDrew] = useState(false);
  const [ai2ShowAll, setAi2ShowAll] = useState(false);
  const [activeResultTab, setActiveResultTab] = useState('results1');

  // Mock image data
  const mockImages = [
    {
      id: 1,
      name: 'Satellite Image 001',
      time: '2024-08-18 14:30:22',
      coordinates: '21.0285, 105.8542',
      resolution: '10m',
      cloudCover: '15%',
      source: 'Landsat-8',
      size: '2.4 MB'
    },
    {
      id: 2,
      name: 'Aerial Survey 002',
      time: '2024-08-18 15:45:11',
      coordinates: '21.0195, 105.8345',
      resolution: '5m',
      cloudCover: '5%',
      source: 'Sentinel-2',
      size: '3.1 MB'
    },
    {
      id: 3,
      name: 'Urban Analysis 003',
      time: '2024-08-18 16:22:33',
      coordinates: '21.0312, 105.8612',
      resolution: '2m',
      cloudCover: '25%',
      source: 'WorldView-3',
      size: '5.7 MB'
    },
    {
      id: 4,
      name: 'Urban Analysis 003',
      time: '2024-08-18 16:22:33',
      coordinates: '21.0312, 105.8612',
      resolution: '2m',
      cloudCover: '25%',
      source: 'WorldView-3',
      size: '5.7 MB'
    },
    {
      id: 5,
      name: 'Urban Analysis 003',
      time: '2024-08-18 16:22:33',
      coordinates: '21.0312, 105.8612',
      resolution: '2m',
      cloudCover: '25%',
      source: 'WorldView-3',
      size: '5.7 MB'
    },
    {
      id: 6,
      name: 'Urban Analysis 003',
      time: '2024-08-18 16:22:33',
      coordinates: '21.0312, 105.8612',
      resolution: '2m',
      cloudCover: '25%',
      source: 'WorldView-3',
      size: '5.7 MB'
    }
  ];

  if (collapsed) {
    return (
      <div className="p-2">
        <div className="text-xs text-gray-500 text-center">Search</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <SearchSettingsSection
        timeFrom={timeFrom}
        setTimeFrom={setTimeFrom}
        timeTo={timeTo}
        setTimeTo={setTimeTo}
        ai1ShowDrew={ai1ShowDrew}
        setAi1ShowDrew={setAi1ShowDrew}
        ai1ShowAll={ai1ShowAll}
        setAi1ShowAll={setAi1ShowAll}
        ai2ShowDrew={ai2ShowDrew}
        setAi2ShowDrew={setAi2ShowDrew}
        ai2ShowAll={ai2ShowAll}
        setAi2ShowAll={setAi2ShowAll}
      />
      {/* Make SearchResultsSection scrollable when settings are expanded */}
      <div className="flex-1 overflow-y-auto">
        <SearchResultsSection
          mockImages={mockImages}
          activeResultTab={activeResultTab}
          setActiveResultTab={setActiveResultTab}
        />
      </div>
    </div>
  );
};

export default SearchResultTab;