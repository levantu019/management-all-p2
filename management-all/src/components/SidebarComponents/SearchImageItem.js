// Libraries
import React from 'react';
import { Image, Clock, MapPin } from 'lucide-react';

// Personal components

// Image Item Component
const SearchImageItem = ({ image }) => (
  <div className="border border-gray-200 rounded-lg p-3 mb-3 hover:shadow-md transition-shadow">
    <div className="flex items-start space-x-3">
      <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center flex-shrink-0">
        <Image className="w-8 h-8 text-blue-500" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-gray-900 text-sm mb-1 truncate">{image.name}</h4>
        <div className="space-y-1 text-xs text-gray-600">
          <div className="flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            <span>{image.time}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="w-3 h-3 mr-1" />
            <span>{image.coordinates}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Resolution: {image.resolution}</span>
            <span>Cloud: {image.cloudCover}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="bg-gray-100 px-2 py-0.5 rounded text-xs">{image.source}</span>
            <span>{image.size}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default SearchImageItem