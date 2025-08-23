// Libraries
import React, { useState } from 'react';
import { User, Bell, MessageCircle } from 'lucide-react';

// Personal components
import TreeMenuItem from './TreeMenuItem';
import AccountOptions from '../../ToolPanelComponents/AccountOptions';

// Tree Menu Component
const TreeMenu = ({
  menuStructure,
  collapsed,
  expandedItems,
  onToggleExpanded,
  activeFunction,
  onFunctionChange,
  notificationCount = 0,
  messageCount = 0,
}) => {
  const [showAccountOptions, setShowAccountOptions] = useState(false);

  return (
    <div className="h-full flex flex-col">
      {/* Top part - Scrollable menu items - takes remaining space */}
      <div className="flex-1 min-h-0 overflow-y-auto">
        <div className="py-2">
          {menuStructure.map(item => (
            <TreeMenuItem
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
      </div>

      {/* Bottom part - Fixed height for 3 buttons */}
      <div className="flex-shrink-0 border-t border-gray-200 bg-white">
        <div className="p-2 space-y-1">
          {/* Notification Button */}
          <button
            className={`relative w-full flex items-center text-left transition-colors rounded-lg ${
              collapsed ? 'justify-center p-2' : 'px-3 py-2'
            } hover:bg-blue-50 text-blue-700`}
            onClick={() => alert('Notifications')}
            title="Notification"
          >
            <Bell className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span className="ml-3 text-sm">Notification</span>}
            {notificationCount > 0 && !collapsed && (
              <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-0.5 min-w-[20px] text-center">
                {notificationCount}
              </span>
            )}
            {notificationCount > 0 && collapsed && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {notificationCount}
              </span>
            )}
          </button>

          {/* Message Button */}
          <button
            className={`relative w-full flex items-center text-left transition-colors rounded-lg ${
              collapsed ? 'justify-center p-2' : 'px-3 py-2'
            } hover:bg-green-50 text-green-700`}
            onClick={() => alert('Messages')}
            title="Message"
          >
            <MessageCircle className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span className="ml-3 text-sm">Message</span>}
            {messageCount > 0 && !collapsed && (
              <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-0.5 min-w-[20px] text-center">
                {messageCount}
              </span>
            )}
            {messageCount > 0 && collapsed && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {messageCount}
              </span>
            )}
          </button>

          {/* Account button with options */}
          <div className="relative">
            <button
              className={`w-full flex items-center text-left transition-colors rounded-lg ${
                collapsed ? 'justify-center p-2' : 'px-3 py-2'
              } hover:bg-gray-50 text-gray-700`}
              onClick={() => setShowAccountOptions((prev) => !prev)}
              title="Account"
            >
              <User className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span className="ml-3 text-sm">Tài khoản</span>}
            </button>
            {showAccountOptions && !collapsed && (
              <div className="absolute bottom-full left-0 right-0 mb-1 z-50">
                <AccountOptions
                  onAccount={() => alert('Account Management')}
                  onLogout={() => alert('Logged out')}
                  onNotification={() => alert('Notifications')}
                  onMessage={() => alert('Messages')}
                  notificationCount={notificationCount}
                  messageCount={messageCount}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreeMenu;