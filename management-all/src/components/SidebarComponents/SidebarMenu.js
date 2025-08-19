// Libraries
import React, { useState } from 'react';
import { User, Bell, MessageCircle } from 'lucide-react';

// Personal components
import SidebarMenuItem from './SidebarMenuItem';
import AccountOptions from '../ToolPanelComponents/AccountOptions';

// Sidebar Menu Component
const SidebarMenu = ({
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
    <div className="py-2 flex flex-col h-full">
      <div className="flex-1">
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
      {/* Notification Button */}
      <button
        className="relative w-full flex items-center px-3 py-2 mb-1 rounded hover:bg-blue-50 text-blue-700 font-medium transition-colors"
        onClick={() => alert('Notifications')}
        title="Notification"
      >
        <Bell className="w-5 h-5 mr-2 text-blue-500" />
        {!collapsed && <span>Notification</span>}
        {notificationCount > 0 && (
          <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
            {notificationCount}
          </span>
        )}
      </button>

      {/* Message Button */}
      <button
        className="relative w-full flex items-center px-3 py-2 mb-1 rounded hover:bg-blue-50 text-green-700 font-medium transition-colors"
        onClick={() => alert('Messages')}
        title="Message"
      >
        <MessageCircle className="w-5 h-5 mr-2 text-green-500" />
        {!collapsed && <span>Message</span>}
        {messageCount > 0 && (
          <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
            {messageCount}
          </span>
        )}
      </button>

      {/* Account button at the bottom */}
      <div className="relative mb-2">
        <button
          className="w-full flex items-center px-3 py-2 rounded hover:bg-blue-50 text-blue-700 font-medium transition-colors"
          onClick={() => setShowAccountOptions((prev) => !prev)}
          title="Account"
        >
          <User className="w-5 h-5 mr-2" />
          {!collapsed && <span>Tài khoản</span>}
        </button>
        {showAccountOptions && !collapsed && (
          <AccountOptions
            onAccount={() => alert('Account Management')}
            onLogout={() => alert('Logged out')}
            onNotification={() => alert('Notifications')}
            onMessage={() => alert('Messages')}
            notificationCount={notificationCount}
            messageCount={messageCount}
          />
        )}
      </div>
    </div>
  );
};

export default SidebarMenu