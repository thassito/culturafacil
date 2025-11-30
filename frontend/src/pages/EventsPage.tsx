import React from 'react';
import EventCard from '../components/EventCard';

// Reverted to placeholder data
const events = [
  { id: 1, name: 'Festival de Jazz & Blues', date: '30 de Nov, 2025', location: 'Guaramiranga, CE', tags: ['Música', 'Festival'], imageUrl: '/placeholder-image.jpg' },
  { id: 2, name: 'Mostra de Cinema de Tiradentes', date: '05 de Dez, 2025', location: 'Fortaleza, CE', tags: ['Cinema', 'Mostra'], imageUrl: '/placeholder-image.jpg' },
  { id: 3, name: 'Bienal do Livro do Ceará', date: '12 de Dez, 2025', location: 'Centro de Eventos, CE', tags: ['Literatura', 'Feira'], imageUrl: '/placeholder-image.jpg' },
  { id: 4, name: 'Feira da Música', date: '15 de Dez, 2025', location: 'Dragão do Mar, CE', tags: ['Música', 'Negócios'], imageUrl: '/placeholder-image.jpg' },
  { id: 5, name: 'Festival de Teatro de Guaramiranga', date: '20 de Dez, 2025', location: 'Guaramiranga, CE', tags: ['Teatro', 'Festival'], imageUrl: '/placeholder-image.jpg' },
];

function EventsPage() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white font-sans">
      {/* Map Area Placeholder */}
      <div className="w-full md:w-2/3 h-64 md:h-screen bg-gray-200 dark:bg-gray-800 flex items-center justify-center relative">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-600 dark:text-gray-500">Mapa</h2>
          <p className="text-gray-500 dark:text-gray-600">(Visualização do mapa aparecerá aqui)</p>
        </div>
        {/* Placeholder Zoom Controls */}
        <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
          <button className="w-10 h-10 bg-gray-200/50 dark:bg-gray-900/50 backdrop-blur-md rounded-full text-xl font-bold hover:bg-gray-300/50 dark:hover:bg-gray-700/50 text-gray-800 dark:text-white">+</button>
          <button className="w-10 h-10 bg-gray-200/50 dark:bg-gray-900/50 backdrop-blur-md rounded-full text-xl font-bold hover:bg-gray-300/50 dark:hover:bg-gray-700/50 text-gray-800 dark:text-white">-</button>
        </div>
      </div>

      {/* Events List Area */}
      <div className="w-full md:w-1/3 bg-white dark:bg-gray-900 p-6 overflow-y-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Eventos no Ceará</h1>
        
        {/* Search and Filter Bar */}
        <div className="mb-6 sticky top-0 bg-white dark:bg-gray-900 py-4">
          <input
            type="text"
            placeholder="Buscar por nome do evento..."
            className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="mt-2">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-semibold">
              Filtrar
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {events.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default EventsPage;