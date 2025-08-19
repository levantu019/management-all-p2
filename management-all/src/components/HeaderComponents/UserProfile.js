// Libraries
import React from 'react';
import { User } from 'lucide-react';


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

export default UserProfile