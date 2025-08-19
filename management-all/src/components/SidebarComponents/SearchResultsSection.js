// Libraries
import React from 'react';
import { Eye, EyeOff } from 'lucide-react';

// Personal components
import SearchImageItem from './SearchImageItem';
import ResultsTabButtons from './ResultsTabButtons';

// Results Section Component
const SearchResultsSection = ({
  mockImages,
  activeResultTab,
  setActiveResultTab,
  tabVisibilityState,
  tabFlyingState
}) => {

  const { allVisible, setAllVisible, imageVisibility, setImageVisibility } = tabVisibilityState;
  const { flyingImageId, setFlyingImageId } = tabFlyingState;

  const handleFlyToggle = (imageId) => {
    // If clicking the same image, toggle off. Otherwise, set new flying image
    setFlyingImageId(prevId => prevId === imageId ? null : imageId);
  };

  const handleToggleAllVisibility = () => {
    const newAllVisible = !allVisible;
    setAllVisible(newAllVisible);
    
    // Update all individual image visibility states
    const newImageVisibility = {};
    mockImages.forEach(image => {
      newImageVisibility[image.id] = newAllVisible;
    });
    setImageVisibility(newImageVisibility);
  };

  const handleIndividualVisibilityToggle = (imageId) => {
    setImageVisibility(prev => ({
      ...prev,
      [imageId]: !prev[imageId]
    }));
  };

  return (
  <div className="flex-1 flex flex-col h-full">
    <ResultsTabButtons activeResultTab={activeResultTab} setActiveResultTab={setActiveResultTab} />
    <div className="flex-1 p-4 flex flex-col">
      <div className="mb-3 text-sm text-gray-600 flex items-center justify-between">
        <span>Found {mockImages.length} images</span>
        <div className="flex items-center">
          <button 
            onClick={handleToggleAllVisibility}
            className={`p-2 rounded-lg transition-colors ${
              allVisible 
                ? 'text-blue-500 hover:bg-blue-50 bg-blue-50' 
                : 'text-gray-400 hover:bg-gray-50'
            }`}
            title={allVisible ? 'Hide all on map' : 'Show all on map'}
          >
            {allVisible ? (
              <Eye className="w-5 h-5" />
            ) : (
              <EyeOff className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
      {/* Scrollable image list with fixed max height */}
      <div className="flex-1 overflow-y-auto" style={{ maxHeight: '400px' }}>
        {mockImages.map(image => (
          <SearchImageItem 
            key={`${activeResultTab}-${image.id}`}
            image={image} 
            isFlying={flyingImageId === image.id} 
            onFlyToggle={handleFlyToggle}
            isVisible={imageVisibility[image.id] || false}
            onVisibilityToggle={handleIndividualVisibilityToggle}
          />
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
}

export default SearchResultsSection