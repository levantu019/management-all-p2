// Libraries
import React from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

//
const MiddleExpandButton = ({ expanded, onClick, side = 'left', className = '' }) => {
  // side: 'left' or 'right' (which side of parent to attach)
  // expanded: boolean, parent expanded state
  // onClick: function to toggle parent
  // className: extra classes

  return (
    <button
      onClick={onClick}
      className={`absolute top-1/2 -translate-y-1/2 z-20 bg-white border border-gray-300 rounded-full shadow hover:bg-blue-50 transition-colors
        ${side === 'left' ? '-left-3' : '-right-3'} ${className}`}
      style={{ width: 32, height: 32 }}
      title={expanded ? 'Collapse' : 'Expand'}
    >
      {expanded
        ? (side === 'left' ? <ChevronLeft className="mx-auto text-blue-600" /> : <ChevronRight className="mx-auto text-blue-600" />)
        : (side === 'left' ? <ChevronRight className="mx-auto text-blue-600" /> : <ChevronLeft className="mx-auto text-blue-600" />)
      }
    </button>
  );
};

export default MiddleExpandButton;