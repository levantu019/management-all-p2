// Libraries
import React from 'react';

// Personal components

// Results Tab Buttons Component
const ResultsTabButtons = ({ activeResultTab, setActiveResultTab }) => (
  <div className="flex border-b border-gray-200 bg-white">
    <button
      className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
        activeResultTab === 'results1'
          ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
      }`}
      onClick={() => setActiveResultTab('results1')}
    >
      Result Set 1
    </button>
    <button
      className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
        activeResultTab === 'results2'
          ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
      }`}
      onClick={() => setActiveResultTab('results2')}
    >
      Result Set 2
    </button>
  </div>
);

export default ResultsTabButtons