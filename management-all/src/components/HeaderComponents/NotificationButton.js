// Libraries
import React from 'react';


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

export default NotificationButton