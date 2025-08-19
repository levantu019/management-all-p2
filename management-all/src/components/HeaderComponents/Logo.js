// Libraries
import React from 'react';
import { Map as MapIcon } from 'lucide-react';


// Logo Component
const Logo = () => {
    return (
        <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <MapIcon className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-800">MapSystem</h1>
        </div>
    );
};

export default Logo