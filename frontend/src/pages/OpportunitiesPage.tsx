
import OpportunityCard from '../components/OpportunityCard'; // We will create this component next

// Placeholder data for opportunities (editais)
const opportunities = [
  { id: 1, name: 'Edital Ceará em Cena', subscriptions: '01/12/2025 a 30/12/2025', description: 'Apoio a grupos de teatro e dança.' },
  { id: 2, name: 'Prêmio de Incentivo à Literatura', subscriptions: '15/11/2025 a 15/12/2025', description: 'Fomento à produção literária cearense.' },
  { id: 3, name: 'Edital de Cinema e Vídeo', subscriptions: '10/12/2025 a 10/01/2026', description: 'Produção de curtas e longas-metragens.' },
  { id: 4, name: 'Mecenas do Ceará', subscriptions: 'Inscrições contínuas', description: 'Incentivo fiscal para empresas que apoiam a cultura.' },
];

function OpportunitiesPage() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white font-sans">
      {/* Map Area Placeholder */}
      <div className="w-full md:w-2/3 h-64 md:h-screen bg-gray-200 dark:bg-gray-800 flex items-center justify-center relative">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-600 dark:text-gray-500">Mapa de Oportunidades</h2>
          <p className="text-gray-500 dark:text-gray-600">(Visualização do mapa aparecerá aqui)</p>
        </div>
        <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
          <button className="w-10 h-10 bg-gray-200/50 dark:bg-gray-900/50 backdrop-blur-md rounded-full text-xl font-bold hover:bg-gray-300/50 dark:hover:bg-gray-700/50 text-gray-800 dark:text-white">+</button>
          <button className="w-10 h-10 bg-gray-200/50 dark:bg-gray-900/50 backdrop-blur-md rounded-full text-xl font-bold hover:bg-gray-300/50 dark:hover:bg-gray-700/50 text-gray-800 dark:text-white">-</button>
        </div>
      </div>

      {/* Opportunities List Area */}
      <div className="w-1/3 bg-white dark:bg-gray-900 p-6 overflow-y-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Oportunidades</h1>
        
        <div className="mb-6 sticky top-0 bg-white dark:bg-gray-900 py-4">
          <input
            type="text"
            placeholder="Buscar por nome da oportunidade..."
            className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="mt-2">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-semibold">
              Filtrar
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {opportunities.map(opportunity => (
            <OpportunityCard key={opportunity.id} opportunity={opportunity} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default OpportunitiesPage;
