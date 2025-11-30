import React from 'react';

// Reverted to the static placeholder data structure
interface Event {
  id: number;
  name: string;
  date: string;
  location: string;
  tags: string[];
  imageUrl: string;
}

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-md rounded-lg border border-gray-200 dark:border-gray-700/50 overflow-hidden hover:border-blue-500 transition-colors duration-300">
      {/* Image Placeholder */}
      <div className="w-full h-32 bg-gray-200 dark:bg-gray-700">
        {/* In a real app, you would use an <img /> tag here */}
      </div>
      <div className="p-4">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-2">
          {event.tags.map(tag => (
            <span key={tag} className="px-2 py-1 bg-blue-500/50 dark:bg-blue-600/50 text-blue-800 dark:text-blue-200 text-xs font-semibold rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate" title={event.name}>{event.name}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{event.date} &bull; {event.location}</p>
        <div className="mt-4">
          <button className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
            Ver mais &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;