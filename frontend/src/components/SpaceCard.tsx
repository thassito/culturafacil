import React from 'react';

// Define the type for the space prop
interface Space {
  id: number;
  name: string;
  type: string;
  address: string;
}

interface SpaceCardProps {
  space: Space;
}

const SpaceCard: React.FC<SpaceCardProps> = ({ space }) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-md rounded-lg border border-gray-700/50 overflow-hidden hover:border-blue-500 transition-colors duration-300">
      <div className="w-full h-32 bg-gray-700">
        {/* Placeholder for an image */}
      </div>
      <div className="p-4">
        <span className="px-2 py-1 bg-purple-600/50 text-purple-200 text-xs font-semibold rounded-full">
          {space.type}
        </span>
        <h3 className="text-lg font-bold text-white mt-2 truncate" title={space.name}>{space.name}</h3>
        <p className="text-sm text-gray-400 mt-1 truncate">{space.address}</p>
        <div className="mt-4">
          <button className="text-sm font-semibold text-blue-400 hover:text-blue-300">
            Ver mais &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpaceCard;
