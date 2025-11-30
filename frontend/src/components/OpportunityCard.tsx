import React from 'react';

// Define the type for the opportunity prop
interface Opportunity {
  id: number;
  name: string;
  subscriptions: string;
  description: string;
}

interface OpportunityCardProps {
  opportunity: Opportunity;
}

const OpportunityCard: React.FC<OpportunityCardProps> = ({ opportunity }) => {
  return (
    <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-md rounded-lg border border-gray-200 dark:border-gray-700/50 p-4 hover:border-blue-500 transition-colors duration-300">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate" title={opportunity.name}>{opportunity.name}</h3>
      <div className="mt-2">
        <p className="text-sm text-yellow-600 dark:text-yellow-300">
          <span className="font-semibold">Inscrições:</span> {opportunity.subscriptions}
        </p>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 truncate">
        {opportunity.description}
      </p>
      <div className="mt-4">
        <button className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
          Ver edital &rarr;
        </button>
      </div>
    </div>
  );
};

export default OpportunityCard;
