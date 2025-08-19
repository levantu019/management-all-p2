import React, { useState, useEffect } from 'react';
import { Layers, Search, Filter, Ruler, MapPin, Download, Settings, Pencil, Eye, Plane, Play, BarChart3, Info, Database, FileText, Calendar, Clock, Zap, Image, CheckSquare } from 'lucide-react';

// Mock components for demonstration
const SidebarHeader = ({ collapsed, onToggle }) => (
  <div className={`p-4 border-b border-gray-200 ${collapsed ? 'px-2' : ''}`}>
    <button onClick={onToggle} className="w-full flex items-center justify-between">
      <span className={`font-semibold ${collapsed ? 'hidden' : ''}`}>GIS Dashboard</span>
      <div className="w-6 h-6 bg-gray-300 rounded"></div>
    </button>
  </div>
);

const SidebarFooter = ({ collapsed }) => (
  <div className={`p-4 border-t border-gray-200 ${collapsed ? 'px-2' : ''}`}>
    <div className={`text-xs text-gray-500 ${collapsed ? 'hidden' : ''}`}>Version 1.0</div>
  </div>
);

const SidebarLoading = ({ collapsed }) => (
  <div className={`p-4 ${collapsed ? 'px-2' : ''}`}>
    <div className="animate-pulse space-y-3">
      {[...Array(5)].map((_, i) => (
        <div key={i} className={`h-4 bg-gray-200 rounded ${collapsed ? 'w-6' : ''}`}></div>
      ))}
    </div>
  </div>
);

const SidebarError = ({ error, onRetry, collapsed }) => (
  <div className={`p-4 text-center ${collapsed ? 'px-2' : ''}`}>
    <div className={`text-red-500 text-sm mb-2 ${collapsed ? 'hidden' : ''}`}>{error}</div>
    <button onClick={onRetry} className="text-blue-500 text-sm hover:underline">
      {collapsed ? '↻' : 'Retry'}
    </button>
  </div>
);

// SidebarMenuItem component
const SidebarMenuItem = ({
  item,
  depth = 0,
  collapsed,
  expandedItems,
  onToggleExpanded,
  activeFunction,
  onFunctionChange
}) => {
  const IconComponent = item.icon;
  const isExpanded = expandedItems[item.id];
  const hasChildren = item.children && item.children.length > 0;
  const isActive = activeFunction === item.id;

  return (
    <div key={item.id} className={`${depth > 0 ? 'ml-4' : ''}`}>
      <button
        className={`w-full flex items-center px-3 py-2 text-left hover:bg-gray-100 transition-colors ${
          isActive ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : 'text-gray-700'
        } ${collapsed ? 'justify-center px-2' : ''}`}
        onClick={() => {
          if (hasChildren) {
            onToggleExpanded(item.id);
          } else if (item.type === 'function') {
            onFunctionChange(item.id);
          }
        }}
        title={collapsed ? item.label : ''}
      >
        <IconComponent className={`w-5 h-5 ${collapsed ? '' : 'mr-3'} flex-shrink-0`} />
        {!collapsed && (
          <>
            <span className="flex-1">{item.label}</span>
            {hasChildren && (
              <div className={`transform transition-transform ${isExpanded ? 'rotate-90' : ''}`}>
                <div className="w-3 h-3 border-r-2 border-b-2 border-gray-400 transform rotate-45"></div>
              </div>
            )}
          </>
        )}
      </button>
      {!collapsed && hasChildren && isExpanded && (
        <div className="ml-2">
          {item.children.map(child => (
            <SidebarMenuItem
              key={child.id}
              item={child}
              depth={depth + 1}
              collapsed={collapsed}
              expandedItems={expandedItems}
              onToggleExpanded={onToggleExpanded}
              activeFunction={activeFunction}
              onFunctionChange={onFunctionChange}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Refactored SidebarMenu component
const SidebarMenu = ({
  menuStructure,
  collapsed,
  expandedItems,
  onToggleExpanded,
  activeFunction,
  onFunctionChange
}) => (
  <div className="py-2">
    {menuStructure.map(item => (
      <SidebarMenuItem
        key={item.id}
        item={item}
        collapsed={collapsed}
        expandedItems={expandedItems}
        onToggleExpanded={onToggleExpanded}
        activeFunction={activeFunction}
        onFunctionChange={onFunctionChange}
      />
    ))}
  </div>
);

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
}) => (
  <div className="p-4 border-b border-gray-200 bg-gray-50">
    <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
      <Settings className="w-4 h-4 mr-2" />
      Search Settings
    </h3>
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
  </div>
);

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

// Results Section Component
const SearchResultsSection = ({
  mockImages,
  activeResultTab,
  setActiveResultTab
}) => (
  <div className="flex-1 flex flex-col">
    <ResultsTabButtons activeResultTab={activeResultTab} setActiveResultTab={setActiveResultTab} />
    <div className="flex-1 overflow-y-auto p-4">
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
      <div>
        {mockImages.map(image => (
          <SearchImageItem key={image.id} image={image} />
        ))}
      </div>
      <div className="text-center mt-4">
        <button className="px-4 py-2 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded">
          Load more results...
        </button>
      </div>
    </div>
  </div>
);

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
      <SearchResultsSection
        mockImages={mockImages}
        activeResultTab={activeResultTab}
        setActiveResultTab={setActiveResultTab}
      />
    </div>
  );
};

// Main Enhanced Sidebar Component
const Sidebar = ({ collapsed, onToggle, activeFunction, onFunctionChange }) => {
  const [expandedItems, setExpandedItems] = useState({});
  const [menuStructure, setMenuStructure] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('management');

  // Icon mapping for API data
  const iconMap = {
    'Settings': Settings,
    'Ruler': Ruler,
    'Pencil': Pencil,
    'Eye': Eye,
    'Play': Play,
    'Plane': Plane,
    'BarChart3': BarChart3,
    'Info': Info,
    'Layers': Layers,
    'Search': Search,
    'Database': Database,
    'FileText': FileText,
    'Download': Download,
    'Filter': Filter,
    'MapPin': MapPin
  };

  // API call to fetch menu structure
  const fetchMenuStructure = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const demoApiResponse = [
        {
          id: 'tool-management',
          icon: 'Settings',
          label: 'Quản lý công cụ',
          type: 'group',
          children: [
            {
              id: 'measure',
              icon: 'Ruler',
              label: 'Đo đạc',
              type: 'function'
            },
            {
              id: 'draw',
              icon: 'Pencil',
              label: 'Vẽ',
              type: 'function'
            },
            {
              id: 'visualize',
              icon: 'Eye',
              label: 'Trực quan hóa',
              type: 'group',
              children: [
                {
                  id: 'run-viz',
                  icon: 'Play',
                  label: 'Chạy',
                  type: 'function'
                },
                {
                  id: 'fly-viz',
                  icon: 'Plane',
                  label: 'Bay',
                  type: 'function'
                },
                {
                  id: 'animate-viz',
                  icon: 'BarChart3',
                  label: 'Hoạt hình',
                  type: 'function'
                }
              ]
            }
          ]
        },
        {
          id: 'info-management',
          icon: 'Info',
          label: 'Quản lý thông tin',
          type: 'group',
          children: [
            {
              id: 'layers',
              icon: 'Layers',
              label: 'Lớp bản đồ',
              type: 'function'
            },
            {
              id: 'search',
              icon: 'Search',
              label: 'Tìm kiếm',
              type: 'function'
            },
            {
              id: 'data-sources',
              icon: 'Database',
              label: 'Nguồn dữ liệu',
              type: 'group',
              children: [
                {
                  id: 'local-data',
                  icon: 'FileText',
                  label: 'Dữ liệu cục bộ',
                  type: 'function'
                },
                {
                  id: 'remote-data',
                  icon: 'Download',
                  label: 'Dữ liệu từ xa',
                  type: 'function'
                }
              ]
            },
            {
              id: 'filter',
              icon: 'Filter',
              label: 'Bộ lọc',
              type: 'function'
            }
          ]
        },
        {
          id: 'marker',
          icon: 'MapPin',
          label: 'Đánh dấu',
          type: 'function'
        }
      ];
      
      // Transform demo data to include icon components
      const transformedStructure = transformMenuItems(demoApiResponse);
      setMenuStructure(transformedStructure);
      
    } catch (err) {
      console.error('Error:', err);
      setError('Không thể tải cấu trúc menu');
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to transform menu items
  const transformMenuItems = (items) => {
    return items.map(item => ({
      ...item,
      icon: iconMap[item.icon] || Settings,
      children: item.children ? transformMenuItems(item.children) : undefined
    }));
  };

  // Load menu structure on component mount
  useEffect(() => {
    fetchMenuStructure();
  }, []);

  const toggleExpanded = (itemId) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  return (
    <aside className={`bg-white shadow-lg border-r border-gray-200 transition-all duration-300 flex flex-col ${
      collapsed ? 'w-16' : 'w-80'
    }`}>
      <SidebarHeader collapsed={collapsed} onToggle={onToggle} />
      
      {/* Tab Navigation */}
      {!collapsed && (
        <div className="flex border-b border-gray-200 bg-gray-50">
          <button
            className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === 'management'
                ? 'text-blue-600 border-b-2 border-blue-600 bg-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
            onClick={() => setActiveTab('management')}
          >
            Management
          </button>
          <button
            className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === 'search'
                ? 'text-blue-600 border-b-2 border-blue-600 bg-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
            onClick={() => setActiveTab('search')}
          >
            Search Result
          </button>
        </div>
      )}

      {/* Tab Content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'management' ? (
          <div className="h-full overflow-y-auto">
            {isLoading ? (
              <SidebarLoading collapsed={collapsed} />
            ) : error ? (
              <SidebarError error={error} onRetry={fetchMenuStructure} collapsed={collapsed} />
            ) : (
              <SidebarMenu 
                menuStructure={menuStructure}
                collapsed={collapsed}
                expandedItems={expandedItems}
                onToggleExpanded={toggleExpanded}
                activeFunction={activeFunction}
                onFunctionChange={onFunctionChange}
              />
            )}
          </div>
        ) : (
          <SearchResultTab collapsed={collapsed} />
        )}
      </div>

      <SidebarFooter collapsed={collapsed} />
    </aside>
  );
};

export default Sidebar;