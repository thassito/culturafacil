import React from 'react';
import AgentCard from '../components/AgentCard'; // We will create this component next

// Placeholder data for cultural agents
const agents = [
  { id: 1, name: 'Coletivo As Travestidas', area: 'Artes Cênicas', location: 'Fortaleza, CE' },
  { id: 2, name: 'Maracatu Solar', area: 'Cultura Popular', location: 'Fortaleza, CE' },
  { id: 3, name: 'Lia de Itamaracá', area: 'Música', location: 'Recife, PE' }, // Example from outside CE
  { id: 4, name: 'Gero Camilo', area: 'Cinema / Teatro', location: 'Fortaleza, CE' },
  { id: 5, name: 'Karla Karenina', area: 'Teatro / Humor', location: 'Fortaleza, CE' },
];

function AgentsPage() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-900 text-white font-sans">
      {/* Map Area Placeholder */}
      <div className="w-full md:w-2/3 h-64 md:h-screen bg-gray-800 flex items-center justify-center relative">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-500">Mapa de Agentes</h2>
          <p className="text-gray-600">(Visualização do mapa aparecerá aqui)</p>
        </div>
        <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
          <button className="w-10 h-10 bg-gray-900/50 backdrop-blur-md rounded-full text-xl font-bold hover:bg-gray-700/50">+</button>
          <button className="w-10 h-10 bg-gray-900/50 backdrop-blur-md rounded-full text-xl font-bold hover:bg-gray-700/50">-</button>
        </div>
      </div>

      {/* Agents List Area */}
      <div className="w-1/3 bg-gray-900 p-6 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-4">Agentes Culturais</h1>
        
        <div className="mb-6 sticky top-0 bg-gray-900 py-4">
          <input
            type="text"
            placeholder="Buscar por nome do agente..."
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="mt-2">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-semibold">
              Filtrar
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {agents.map(agent => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AgentsPage;
