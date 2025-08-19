// Libraries
import React, {useState} from 'react';

import { Settings, Zap, ChevronDown, ChevronRight } from 'lucide-react';

// Personal components


// Settings Section Component
const SearchSettingsSection = ({
  timeFrom,
  setTimeFrom,
  timeTo,
  setTimeTo,
  ai1ShowDrew,
  setAi1ShowDrew,
  ai1ShowAll,
  setAi1ShowAll,
  ai2ShowDrew,
  setAi2ShowDrew,
  ai2ShowAll,
  setAi2ShowAll
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="p-4 border-b border-gray-200 bg-gray-50">
      <button
        className="w-full flex items-center justify-between mb-4 focus:outline-none"
        onClick={() => setExpanded((prev) => !prev)}
        aria-expanded={expanded}
      >
        <span className="font-semibold text-gray-800 flex items-center">
          <Settings className="w-4 h-4 mr-2" />
          Search Settings
        </span>
        {expanded ? (
          <ChevronDown className="w-4 h-4 text-gray-500" />
        ) : (
          <ChevronRight className="w-4 h-4 text-gray-500" />
        )}
      </button>
      {expanded && (
        <>
          {/* Time Interest */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Time Interest</label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs text-gray-600 mb-1">From</label>
                <input
                  type="datetime-local"
                  value={timeFrom}
                  onChange={(e) => setTimeFrom(e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">To</label>
                <input
                  type="datetime-local"
                  value={timeTo}
                  onChange={(e) => setTimeTo(e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
          {/* AI Results */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">AI Results</label>
            <div className="space-y-3">
              {/* AI 1 */}
              <div className="bg-white p-3 rounded border">
                <div className="flex items-center mb-2">
                  <Zap className="w-4 h-4 mr-2 text-blue-500" />
                  <span className="font-medium text-sm">AI 1</span>
                </div>
                <div className="space-y-2">
                  <label className="flex items-center text-sm">
                    <input
                      type="checkbox"
                      checked={ai1ShowDrew}
                      onChange={(e) => setAi1ShowDrew(e.target.checked)}
                      className="mr-2"
                    />
                    Show in Drew Area
                  </label>
                  <label className="flex items-center text-sm">
                    <input
                      type="checkbox"
                      checked={ai1ShowAll}
                      onChange={(e) => setAi1ShowAll(e.target.checked)}
                      className="mr-2"
                    />
                    Show All
                  </label>
                </div>
              </div>
              {/* AI 2 */}
              <div className="bg-white p-3 rounded border">
                <div className="flex items-center mb-2">
                  <Zap className="w-4 h-4 mr-2 text-green-500" />
                  <span className="font-medium text-sm">AI 2</span>
                </div>
                <div className="space-y-2">
                  <label className="flex items-center text-sm">
                    <input
                      type="checkbox"
                      checked={ai2ShowDrew}
                      onChange={(e) => setAi2ShowDrew(e.target.checked)}
                      className="mr-2"
                    />
                    Show in Drew Area
                  </label>
                  <label className="flex items-center text-sm">
                    <input
                      type="checkbox"
                      checked={ai2ShowAll}
                      onChange={(e) => setAi2ShowAll(e.target.checked)}
                      className="mr-2"
                    />
                    Show All
                  </label>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SearchSettingsSection