// Libraries
import React from 'react';
import { Menu } from 'lucide-react';

// Personal components
import Logo from './Logo';
import UserActions from './UserActions';


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

export default Header