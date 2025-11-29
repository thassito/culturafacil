import React from 'react';

// Define the type for the agent prop
interface Agent {
  id: number;
  name: string;
  area: string;
  location: string;
}

interface AgentCardProps {
  agent: Agent;
}

const AgentCard: React.FC<AgentCardProps> = ({ agent }) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-md rounded-lg border border-gray-700/50 p-4 flex items-center space-x-4 hover:border-blue-500 transition-colors duration-300">
      {/* Avatar Placeholder */}
      <div className="w-16 h-16 bg-gray-700 rounded-full flex-shrink-0">
        {/* Placeholder for an image */}
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-bold text-white truncate" title={agent.name}>{agent.name}</h3>
        <span className="px-2 py-1 mt-1 inline-block bg-green-600/50 text-green-200 text-xs font-semibold rounded-full">
          {agent.area}
        </span>
        <p className="text-sm text-gray-400 mt-1 truncate">{agent.location}</p>
      </div>
       <button className="text-sm font-semibold text-blue-400 hover:text-blue-300 self-start">
        &rarr;
      </button>
    </div>
  );
};

export default AgentCard;
