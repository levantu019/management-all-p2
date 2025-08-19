// Libraries
import React from 'react';

// Personal components
import LayersPanel from './LayersPanel';
import SearchPanel from './SearchPanel';
import FilterPanel from './FilterPanel'; 
import MeasurePanel from './MeasurePanel';
import DrawPanel from './DrawPanel';
import RunVizPanel from './RunVizPanel';
import FlyVizPanel from './FlyVizPanel';
import AnimateVizPanel from './AnimateVizPanel';
import LocalDataPanel from './LocalDataPanel';
import RemoteDataPanel from './RemoteDataPanel';
import MarkerPanel from './MarkerPanel';


// Tool Panel Content Component
const ToolPanelContent = ({ activeFunction }) => {
  switch (activeFunction) {
    case 'layers':
      return <LayersPanel />;
    case 'search':
      return <SearchPanel />;
    case 'filter':
      return <FilterPanel />;
    case 'measure':
      return <MeasurePanel />;
    case 'draw':
      return <DrawPanel />;
    case 'run-viz':
      return <RunVizPanel />;
    case 'fly-viz':
      return <FlyVizPanel />;
    case 'animate-viz':
      return <AnimateVizPanel />;
    case 'local-data':
      return <LocalDataPanel />;
    case 'remote-data':
      return <RemoteDataPanel />;
    case 'marker':
      return <MarkerPanel />;
    default:
      return <div className="text-sm text-gray-500">Công cụ {activeFunction}</div>;
  }
};

export default ToolPanelContent