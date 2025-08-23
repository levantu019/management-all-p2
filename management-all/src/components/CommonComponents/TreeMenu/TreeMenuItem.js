// Libraries
import React from 'react';
import { Layers } from 'lucide-react';

// Personal components


// Tree Menu Item Component
const TreeMenuItem = ({
  item,
  depth = 0,
  collapsed,
  expandedItems,
  onToggleExpanded,
  activeFunction,
  onFunctionChange
}) => {
  const IconComponent = item.icon || Layers;
  const isExpanded = expandedItems[item.id];
  const hasChildren = item.children && item.children.length > 0;
  const isActive = activeFunction === item.id_active;

  return (
    <div key={item.id} className={`${depth > 0 ? 'ml-4' : ''}`}>
      <button
        className={`w-full flex items-center px-3 py-2 text-left hover:bg-gray-100 transition-colors ${
          isActive ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : 'text-gray-700'
        } ${collapsed ? 'justify-center px-2' : ''}`}
        onClick={() => {
          if (hasChildren) {
            onToggleExpanded(item.id);
          } else if (item.type_menu === 'function') {
            onFunctionChange(item.id, item.id_active, item.type_function, item.table_name_menu, item.table_name_data, item.title_data);
          }
        }}
        title={collapsed ? item.name : ''}
      >
        <IconComponent className={`w-5 h-5 ${collapsed ? '' : 'mr-3'} flex-shrink-0`} />
        {!collapsed && (
          <>
            <span className="flex-1">{item.name}</span>
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
            <TreeMenuItem
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

export default TreeMenuItem;