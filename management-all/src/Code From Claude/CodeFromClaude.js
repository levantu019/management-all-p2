import React, { useState } from 'react';
import { 
  Menu, 
  Bell, 
  MessageCircle, 
  User, 
  Map, 
  Layers, 
  Search, 
  Filter, 
  Settings, 
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  MapPin,
  Ruler,
  Download,
  Pencil,
  Eye,
  Play,
  Plane,
  Info,
  Database,
  BarChart3,
  FileText
} from 'lucide-react';

// Header Component
const Header = ({ onToggleSidebar }) => {
  return (
    <header className="bg-white shadow-md border-b border-gray-200 px-6 py-3 flex items-center justify-between">
      {/* Left side - Logo and menu toggle */}
      <div className="flex items-center space-x-4">
        <button
          onClick={onToggleSidebar}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Menu className="h-5 w-5 text-gray-600" />
        </button>
        <Logo />
      </div>

      {/* Right side - User actions */}
      <UserActions />
    </header>
  );
};

// Logo Component
const Logo = () => {
  return (
    <div className="flex items-center space-x-2">
      <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
        <Map className="h-5 w-5 text-white" />
      </div>
      <h1 className="text-xl font-bold text-gray-800">MapSystem</h1>
    </div>
  );
};

// User Actions Component
const UserActions = () => {
  return (
    <div className="flex items-center space-x-4">
      <NotificationButton icon={MessageCircle} count={3} />
      <NotificationButton icon={Bell} count={5} />
      <UserProfile />
    </div>
  );
};

// Notification Button Component
const NotificationButton = ({ icon: Icon, count }) => {
  return (
    <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
      <Icon className="h-5 w-5 text-gray-600" />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {count}
        </span>
      )}
    </button>
  );
};

// User Profile Component
const UserProfile = () => {
  return (
    <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 rounded-lg p-2 transition-colors">
      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
        <User className="h-4 w-4 text-gray-600" />
      </div>
      <span className="text-sm font-medium text-gray-700">Nguyễn Văn A</span>
    </div>
  );
};

// Sidebar Component
const Sidebar = ({ collapsed, onToggle, activeFunction, onFunctionChange }) => {
  const [expandedItems, setExpandedItems] = useState({});
  const [menuStructure, setMenuStructure] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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
      
      // DEMO DATA - Replace this entire section with real API call
      // When ready, replace with:
      // const response = await fetch('https://your-api-domain.com/api/menu-structure');
      // const apiData = await response.json();
      // const menuData = apiData.data || apiData;
      
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
  React.useEffect(() => {
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
      <div className="flex-1 overflow-y-auto">
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
      <SidebarFooter collapsed={collapsed} />
    </aside>
  );
};

// Sidebar Loading Component
const SidebarLoading = ({ collapsed }) => {
  return (
    <div className="p-4 space-y-3">
      {!collapsed && (
        <div className="text-sm text-gray-500 text-center mb-4">
          Đang tải menu...
        </div>
      )}
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex items-center space-x-3 p-2">
          <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
          {!collapsed && (
            <div className="flex-1 h-4 bg-gray-200 rounded animate-pulse"></div>
          )}
        </div>
      ))}
    </div>
  );
};

// Sidebar Error Component
const SidebarError = ({ error, onRetry, collapsed }) => {
  return (
    <div className="p-4">
      {!collapsed && (
        <>
          <div className="text-sm text-red-600 mb-3 text-center">
            {error}
          </div>
          <button 
            onClick={onRetry}
            className="w-full bg-red-50 hover:bg-red-100 text-red-700 py-2 px-3 rounded text-sm transition-colors"
          >
            Thử lại
          </button>
        </>
      )}
      {collapsed && (
        <button 
          onClick={onRetry}
          className="w-full p-2 text-red-600 hover:bg-red-50 rounded"
          title="Thử lại"
        >
          <Settings className="h-5 w-5 mx-auto" />
        </button>
      )}
    </div>
  );
};
const SidebarHeader = ({ collapsed, onToggle }) => {
  return (
    <div className="p-4 border-b border-gray-200">
      <button
        onClick={onToggle}
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors ml-auto block"
      >
        {collapsed ? (
          <ChevronRight className="h-4 w-4 text-gray-600" />
        ) : (
          <ChevronLeft className="h-4 w-4 text-gray-600" />
        )}
      </button>
    </div>
  );
};

// Sidebar Menu Component
const SidebarMenu = ({ menuStructure, collapsed, expandedItems, onToggleExpanded, activeFunction, onFunctionChange }) => {
  const renderMenuItem = (item, level = 0) => {
    const isExpanded = expandedItems[item.id];
    const hasChildren = item.children && item.children.length > 0;
    const isActive = activeFunction === item.id;

    return (
      <div key={item.id}>
        <SidebarMenuItem
          item={item}
          level={level}
          collapsed={collapsed}
          isActive={isActive}
          isExpanded={isExpanded}
          hasChildren={hasChildren}
          onClick={() => {
            if (item.type === 'function') {
              onFunctionChange(item.id);
            } else if (hasChildren) {
              onToggleExpanded(item.id);
            }
          }}
        />
        
        {hasChildren && isExpanded && !collapsed && (
          <div className="ml-4">
            {item.children.map(child => renderMenuItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <nav className="p-2 space-y-1">
      {menuStructure.map(item => renderMenuItem(item))}
    </nav>
  );
};

// Sidebar Menu Item Component
const SidebarMenuItem = ({ item, level, collapsed, isActive, isExpanded, hasChildren, onClick }) => {
  const Icon = item.icon;
  const indentClass = level > 0 ? `ml-${level * 4}` : '';
  
  const handleClick = () => {
    console.log('Menu item clicked:', item.id, 'Type:', item.type); // Debug log
    if (onClick) {
      onClick();
    }
  };
  
  return (
    <button
      onClick={handleClick}
      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${indentClass} ${
        isActive
          ? 'bg-blue-50 text-blue-600 border border-blue-200'
          : item.type === 'group'
          ? 'text-gray-800 hover:bg-gray-50 font-medium'
          : 'text-gray-700 hover:bg-gray-50'
      }`}
    >
      <div className="flex items-center space-x-3 min-w-0">
        <Icon className={`h-5 w-5 flex-shrink-0 ${
          item.type === 'group' ? 'text-gray-600' : ''
        }`} />
        {!collapsed && (
          <span className={`truncate ${
            item.type === 'group' ? 'font-medium' : ''
          }`}>
            {item.label}
          </span>
        )}
      </div>
      
      {!collapsed && hasChildren && (
        <ChevronDown 
          className={`h-4 w-4 text-gray-400 transition-transform flex-shrink-0 ${
            isExpanded ? 'transform rotate-180' : ''
          }`} 
        />
      )}
    </button>
  );
};

// Sidebar Footer Component
const SidebarFooter = ({ collapsed }) => {
  if (collapsed) return null;
  
  return (
    <div className="p-4">
      <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
        <h4 className="text-sm font-semibold text-blue-800 mb-1">
          Trợ giúp
        </h4>
        <p className="text-xs text-blue-600">
          Cần hỗ trợ? Liên hệ với chúng tôi
        </p>
      </div>
    </div>
  );
};

// Map Container Component
const MapContainer = ({ activeFunction }) => {
  return (
    <main className="flex-1 relative">
      <MapView />
      <MapControls />
      <MapInfo />
      <ToolPanel activeFunction={activeFunction} />
    </main>
  );
};

// Map View Component
const MapView = () => {
  return (
    <div className="w-full h-full bg-gradient-to-br from-blue-50 to-green-50 relative overflow-hidden">
      {/* Simulated map */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100">
        {/* Grid pattern to simulate map */}
        <MapGrid />
        
        {/* Simulated map features */}
        <MapFeatures />
      </div>
    </div>
  );
};

// Map Grid Component
const MapGrid = () => {
  return (
    <div className="absolute inset-0 opacity-10">
      <div className="grid grid-cols-20 grid-rows-20 h-full">
        {Array.from({ length: 400 }).map((_, i) => (
          <div key={i} className="border border-gray-300"></div>
        ))}
      </div>
    </div>
  );
};

// Map Features Component
const MapFeatures = () => {
  return (
    <>
      <div className="absolute top-20 left-20 w-32 h-16 bg-blue-300 rounded-lg opacity-60"></div>
      <div className="absolute top-32 right-40 w-24 h-24 bg-green-400 rounded-full opacity-50"></div>
      <div className="absolute bottom-40 left-40 w-20 h-40 bg-yellow-300 opacity-40"></div>
      <div className="absolute bottom-20 right-20 w-16 h-16 bg-red-300 rounded-lg opacity-50"></div>
    </>
  );
};

// Map Controls Component
const MapControls = () => {
  return (
    <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-2 space-y-2">
      <ZoomButton label="+" />
      <ZoomButton label="-" />
    </div>
  );
};

// Zoom Button Component
const ZoomButton = ({ label }) => {
  return (
    <button className="w-8 h-8 bg-white hover:bg-gray-50 border rounded flex items-center justify-center text-sm font-bold">
      {label}
    </button>
  );
};

// Map Info Component
const MapInfo = () => {
  return (
    <>
      {/* Scale indicator */}
      <div className="absolute bottom-4 left-4 bg-white rounded px-2 py-1 text-xs shadow-lg">
        Tỷ lệ: 1:10,000
      </div>

      {/* Coordinates display */}
      <div className="absolute bottom-4 right-4 bg-white rounded px-2 py-1 text-xs shadow-lg">
        21.0285° N, 105.8542° E
      </div>
    </>
  );
};

// Tool Panel Component
const ToolPanel = ({ activeFunction }) => {
  if (!activeFunction) return null;

  const getFunctionLabel = (functionId) => {
    const functionLabels = {
      'measure': 'Đo đạc',
      'draw': 'Vẽ',
      'run-viz': 'Chạy trực quan hóa',
      'fly-viz': 'Bay qua bản đồ',
      'animate-viz': 'Hoạt hình dữ liệu',
      'layers': 'Lớp bản đồ',
      'search': 'Tìm kiếm',
      'local-data': 'Dữ liệu cục bộ',
      'remote-data': 'Dữ liệu từ xa',
      'filter': 'Bộ lọc',
      'marker': 'Đánh dấu'
    };
    return functionLabels[functionId] || functionId;
  };

  return (
    <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-4 min-w-64 max-w-96">
      <h3 className="font-semibold text-gray-800 mb-3">
        {getFunctionLabel(activeFunction)}
      </h3>
      <ToolPanelContent activeFunction={activeFunction} />
    </div>
  );
};

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

// Panel Components
const LayersPanel = () => {
  const layers = [
    { id: 'base', label: 'Bản đồ cơ sở', checked: true },
    { id: 'traffic', label: 'Giao thông', checked: false },
    { id: 'terrain', label: 'Địa hình', checked: false }
  ];

  return (
    <div className="space-y-2">
      {layers.map(layer => (
        <label key={layer.id} className="flex items-center space-x-2">
          <input type="checkbox" defaultChecked={layer.checked} className="rounded" />
          <span className="text-sm">{layer.label}</span>
        </label>
      ))}
    </div>
  );
};

const SearchPanel = () => {
  return (
    <div className="space-y-2">
      <input
        type="text"
        placeholder="Tìm kiếm địa điểm..."
        className="w-full p-2 border border-gray-300 rounded text-sm"
      />
      <button className="w-full bg-blue-600 text-white py-2 rounded text-sm hover:bg-blue-700">
        Tìm kiếm
      </button>
    </div>
  );
};

const FilterPanel = () => {
  return (
    <div className="space-y-2">
      <select className="w-full p-2 border border-gray-300 rounded text-sm">
        <option>Tất cả danh mục</option>
        <option>Nhà hàng</option>
        <option>Bệnh viện</option>
        <option>Trường học</option>
      </select>
      <button className="w-full bg-green-600 text-white py-2 rounded text-sm hover:bg-green-700">
        Áp dụng bộ lọc
      </button>
    </div>
  );
};

const MeasurePanel = () => {
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2 gap-2">
        <button className="bg-blue-100 text-blue-700 py-2 px-3 rounded text-sm hover:bg-blue-200">
          Đo khoảng cách
        </button>
        <button className="bg-blue-100 text-blue-700 py-2 px-3 rounded text-sm hover:bg-blue-200">
          Đo diện tích
        </button>
      </div>
      <div className="text-xs text-gray-500 mt-2">
        Kết quả: 1.5 km
      </div>
    </div>
  );
};

const DrawPanel = () => {
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2 gap-2">
        <button className="bg-green-100 text-green-700 py-2 px-3 rounded text-sm hover:bg-green-200">
          Vẽ đường
        </button>
        <button className="bg-green-100 text-green-700 py-2 px-3 rounded text-sm hover:bg-green-200">
          Vẽ vùng
        </button>
      </div>
      <button className="w-full bg-red-100 text-red-700 py-2 rounded text-sm hover:bg-red-200">
        Xóa tất cả
      </button>
    </div>
  );
};

const RunVizPanel = () => {
  return (
    <div className="space-y-2">
      <select className="w-full p-2 border border-gray-300 rounded text-sm">
        <option>Chọn kịch bản</option>
        <option>Kịch bản A</option>
        <option>Kịch bản B</option>
      </select>
      <button className="w-full bg-purple-600 text-white py-2 rounded text-sm hover:bg-purple-700">
        Bắt đầu chạy
      </button>
    </div>
  );
};

const FlyVizPanel = () => {
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2 gap-2">
        <button className="bg-sky-100 text-sky-700 py-2 px-3 rounded text-sm hover:bg-sky-200">
          Bay thấp
        </button>
        <button className="bg-sky-100 text-sky-700 py-2 px-3 rounded text-sm hover:bg-sky-200">
          Bay cao
        </button>
      </div>
      <input
        type="range"
        min="1"
        max="10"
        className="w-full"
      />
      <div className="text-xs text-gray-500 text-center">Tốc độ bay</div>
    </div>
  );
};

const AnimateVizPanel = () => {
  return (
    <div className="space-y-2">
      <select className="w-full p-2 border border-gray-300 rounded text-sm">
        <option>Loại hoạt hình</option>
        <option>Fade In/Out</option>
        <option>Zoom In/Out</option>
        <option>Rotate</option>
      </select>
      <div className="flex space-x-2">
        <button className="flex-1 bg-orange-100 text-orange-700 py-2 rounded text-sm hover:bg-orange-200">
          Phát
        </button>
        <button className="flex-1 bg-gray-100 text-gray-700 py-2 rounded text-sm hover:bg-gray-200">
          Dừng
        </button>
      </div>
    </div>
  );
};

const LocalDataPanel = () => {
  return (
    <div className="space-y-2">
      <button className="w-full bg-indigo-100 text-indigo-700 py-2 rounded text-sm hover:bg-indigo-200">
        Chọn tệp dữ liệu
      </button>
      <div className="text-xs text-gray-500">
        Định dạng hỗ trợ: JSON, CSV, KML
      </div>
    </div>
  );
};

const RemoteDataPanel = () => {
  return (
    <div className="space-y-2">
      <input
        type="text"
        placeholder="URL dữ liệu..."
        className="w-full p-2 border border-gray-300 rounded text-sm"
      />
      <button className="w-full bg-teal-600 text-white py-2 rounded text-sm hover:bg-teal-700">
        Tải dữ liệu
      </button>
    </div>
  );
};

const MarkerPanel = () => {
  return (
    <div className="space-y-2">
      <input
        type="text"
        placeholder="Nhãn đánh dấu..."
        className="w-full p-2 border border-gray-300 rounded text-sm"
      />
      <div className="grid grid-cols-3 gap-2">
        <button className="bg-red-100 text-red-700 py-2 rounded text-sm hover:bg-red-200">🔴</button>
        <button className="bg-blue-100 text-blue-700 py-2 rounded text-sm hover:bg-blue-200">🔵</button>
        <button className="bg-green-100 text-green-700 py-2 rounded text-sm hover:bg-green-200">🟢</button>
      </div>
    </div>
  );
};

// Main App Component
const MapDashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeFunction, setActiveFunction] = useState(null);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleFunctionChange = (functionId) => {
    setActiveFunction(functionId);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <Header onToggleSidebar={toggleSidebar} />
      
      <div className="flex-1 flex">
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggle={toggleSidebar}
          activeFunction={activeFunction}
          onFunctionChange={handleFunctionChange}
        />
        
        <MapContainer activeFunction={activeFunction} />
      </div>
    </div>
  );
};

export default MapDashboard;