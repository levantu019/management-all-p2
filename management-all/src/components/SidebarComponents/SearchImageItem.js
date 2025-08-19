// Libraries
import React, { useState } from 'react';
import { Clock, Eye, EyeOff, Plane, Expand } from 'lucide-react';

// Personal components

// Image Item Component
const SearchImageItem = ({ image, isFlying, onFlyToggle, isVisible, onVisibilityToggle }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleVisibility = () => {
    onVisibilityToggle(image.id);
  };

  const handleFly = (e) => {
    e.stopPropagation(); // Prevent triggering toggleVisibility
    // Toggle fly state through parent component
    onFlyToggle(image.id);
    console.log('Fly to location:', image.id);
  };

  const handleExpand = (e) => {
    e.stopPropagation(); // Prevent triggering toggleVisibility
    // Toggle expand state with animation effect
    setIsExpanded(!isExpanded);
    console.log('Expand image');
  };

  const handleEyeClick = (e) => {
    e.stopPropagation(); // Prevent triggering toggleVisibility twice
    toggleVisibility();
  };

  return (
    <div 
      className="border border-gray-200 rounded-lg p-3 mb-3 hover:shadow-md transition-shadow cursor-pointer"
      onClick={toggleVisibility}
    >
      <div className="flex items-start justify-between">
        {/* Image and DateTime - Centered */}
        <div className="flex-1 flex flex-col items-center">
          <img 
            src={image.src || image.url} 
            alt={image.name || 'Satellite image'}
            className={`object-cover rounded-lg border border-gray-200 transition-all duration-300 ease-in-out ${
              isExpanded 
                ? 'w-32 h-32 max-w-32 max-h-32 shadow-lg scale-110' 
                : 'w-20 h-20 max-w-20 max-h-20'
            }`}
          />
          {/* DateTime below image - smaller size */}
          <div className="flex items-center mt-2">
            <Clock className="w-3 h-3 mr-1 text-gray-500" />
            <span className="text-xs text-gray-700 font-bold truncate">{image.time}</span>
          </div>
        </div>
        
        {/* Button Group */}
        <div className="flex flex-col space-y-2">
          {/* Eye Button */}
          <button
            onClick={handleEyeClick}
            className={`p-2 rounded-lg transition-colors flex-shrink-0 ${
              isVisible 
                ? 'text-blue-500 hover:bg-blue-50 bg-blue-50' 
                : 'text-gray-400 hover:bg-gray-50'
            }`}
            title={isVisible ? 'Hide on map' : 'Show on map'}
          >
            {isVisible ? (
              <Eye className="w-5 h-5" />
            ) : (
              <EyeOff className="w-5 h-5" />
            )}
          </button>

          {/* Fly Button */}
          <button
            onClick={handleFly}
            className={`p-2 rounded-lg transition-colors flex-shrink-0 ${
              isFlying 
                ? 'text-blue-500 hover:bg-blue-50 bg-blue-50' 
                : 'text-gray-400 hover:bg-gray-50'
            }`}
            title={isFlying ? 'Stop flying' : 'Fly to location'}
          >
            <Plane className="w-5 h-5" />
          </button>

          {/* Expand Button */}
          <button
            onClick={handleExpand}
            className={`p-2 rounded-lg transition-colors flex-shrink-0 ${
              isExpanded
                ? 'text-blue-500 hover:bg-blue-50 bg-blue-50'
                : 'text-gray-400 hover:bg-gray-50 hover:text-gray-600'
            }`}
            title={isExpanded ? 'Collapse image' : 'Expand image'}
          >
            <Expand className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchImageItem;