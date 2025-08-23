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

  // Separate visibility states for each tab - "select all" buttons
  const [allVisibleResults1, setAllVisibleResults1] = useState(false);
  const [allVisibleResults2, setAllVisibleResults2] = useState(false);

  // Separate individual image visibility states for each tab
  const [imageVisibilityResults1, setImageVisibilityResults1] = useState({});
  const [imageVisibilityResults2, setImageVisibilityResults2] = useState({});

  // Separate flying states for each tab
  const [flyingImageIdResults1, setFlyingImageIdResults1] = useState(null);
  const [flyingImageIdResults2, setFlyingImageIdResults2] = useState(null);

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
      name: 'Urban Analysis 004',
      time: '2024-08-18 17:10:15',
      coordinates: '21.0450, 105.8700',
      resolution: '3m',
      cloudCover: '10%',
      source: 'SPOT-7',
      size: '4.2 MB'
    },
    {
      id: 5,
      name: 'Environmental Survey 005',
      time: '2024-08-18 18:33:44',
      coordinates: '21.0123, 105.8400',
      resolution: '1m',
      cloudCover: '30%',
      source: 'GeoEye-1',
      size: '6.8 MB'
    },
    {
      id: 6,
      name: 'Infrastructure Map 006',
      time: '2024-08-18 19:55:12',
      coordinates: '21.0380, 105.8580',
      resolution: '0.5m',
      cloudCover: '8%',
      source: 'QuickBird',
      size: '8.1 MB'
    }
  ];

  // Get current tab's visibility state and setter
  const getCurrentTabVisibilityState = () => {
    switch (activeResultTab) {
      case 'results1':
        return { 
          allVisible: allVisibleResults1, 
          setAllVisible: setAllVisibleResults1,
          imageVisibility: imageVisibilityResults1,
          setImageVisibility: setImageVisibilityResults1
        };
      case 'results2':
        return { 
          allVisible: allVisibleResults2, 
          setAllVisible: setAllVisibleResults2,
          imageVisibility: imageVisibilityResults2,
          setImageVisibility: setImageVisibilityResults2
        };
      default:
        return { 
          allVisible: allVisibleResults1, 
          setAllVisible: setAllVisibleResults1,
          imageVisibility: imageVisibilityResults1,
          setImageVisibility: setImageVisibilityResults1
        };
    }
  };

  // Get current tab's flying state and setter
  const getCurrentTabFlyingState = () => {
    switch (activeResultTab) {
      case 'results1':
        return { flyingImageId: flyingImageIdResults1, setFlyingImageId: setFlyingImageIdResults1 };
      case 'results2':
        return { flyingImageId: flyingImageIdResults2, setFlyingImageId: setFlyingImageIdResults2 };
      default:
        return { flyingImageId: flyingImageIdResults1, setFlyingImageId: setFlyingImageIdResults1 };
    }
  };

  if (collapsed) {
    return (
      <div className="p-2">
        <div className="text-xs text-gray-500 text-center">Search</div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Fixed SearchSettingsSection - will expand/collapse but stays at top */}
      <div className="flex-shrink-0">
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
      </div>
      
      {/* Flexible SearchResultsSection - takes remaining space and scrolls */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <SearchResultsSection
          mockImages={mockImages}
          activeResultTab={activeResultTab}
          setActiveResultTab={setActiveResultTab}
          tabVisibilityState={getCurrentTabVisibilityState()}
          tabFlyingState={getCurrentTabFlyingState()}
        />
      </div>
    </div>
  );
};

export default SearchResultTab;