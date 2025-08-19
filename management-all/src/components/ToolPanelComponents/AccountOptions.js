import React from 'react';
import { User, LogOut } from 'lucide-react';

const AccountOptions = ({ onAccount, onLogout }) => (
  <div className="absolute left-0 bottom-12 w-64 bg-white border border-gray-200 rounded shadow-lg z-50">
    <button
      className="w-full flex items-center px-4 py-3 border-b border-gray-100 hover:bg-blue-50 text-gray-700 text-sm whitespace-nowrap"
      onClick={onAccount}
    >
      <User className="w-4 h-4 mr-2 text-blue-600" />
      <span className="whitespace-nowrap">Account Management</span>
    </button>
    <button
      className="w-full flex items-center px-4 py-3 hover:bg-blue-50 text-gray-700 text-sm"
      onClick={onLogout}
    >
      <LogOut className="w-4 h-4 mr-2 text-red-500" />
      <span className="whitespace-nowrap">Log out</span>
    </button>
  </div>
);

export default AccountOptions;