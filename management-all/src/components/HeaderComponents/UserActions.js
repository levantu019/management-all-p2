// Libraries
import React from 'react';
import { MessageCircle, Bell } from 'lucide-react';

// Personal components
import NotificationButton from './NotificationButton';
import UserProfile from './UserProfile';


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

export default UserActions