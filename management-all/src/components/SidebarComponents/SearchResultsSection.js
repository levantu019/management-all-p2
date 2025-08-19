// Libraries
import React from 'react';

// Personal components
import SearchImageItem from './SearchImageItem';
import ResultsTabButtons from './ResultsTabButtons';

// Results Section Component
const SearchResultsSection = ({
  mockImages,
  activeResultTab,
  setActiveResultTab
}) => (
  <div className="flex-1 flex flex-col h-full">
    <ResultsTabButtons activeResultTab={activeResultTab} setActiveResultTab={setActiveResultTab} />
    <div className="flex-1 p-4 flex flex-col">
      <div className="mb-3 text-sm text-gray-600 flex items-center justify-between">
        <span>Found {mockImages.length} images</span>
        <div className="flex items-center space-x-2">
          <button className="px-2 py-1 text-xs bg-gray-100 rounded hover:bg-gray-200">
            Sort by time
          </button>
          <button className="px-2 py-1 text-xs bg-gray-100 rounded hover:bg-gray-200">
            Filter
          </button>
        </div>
      </div>
      {/* Scrollable image list with fixed max height */}
      <div className="flex-1 overflow-y-auto" style={{ maxHeight: '400px' }}>
        {mockImages.map(image => (
          <SearchImageItem key={image.id} image={image} />
        ))}
        <div className="text-center mt-4">
          <button className="px-4 py-2 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded">
            Load more results...
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default SearchResultsSection