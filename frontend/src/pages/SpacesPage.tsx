
import { useEffect, useState } from 'react';
import SpaceCard from '../components/SpaceCard';

function SpacesPage() {
  const [spaces, setSpaces] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        // NOTE: Currently fetching from /opportunities. A dedicated /spaces endpoint might be needed.
        const response = await fetch('https://api.culturafacil.com.br/opportunities'); 
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // Assuming spaces might be filtered from opportunities, or opportunities contains space data.
        // Further refinement may be needed based on actual API response structure for spaces.
        setSpaces(data); 
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSpaces();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
        Carregando espaços...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 text-red-500">
        Erro ao carregar espaços: {error}
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white font-sans">
      {/* Map Area Placeholder */}
      <div className="w-full md:w-2/3 h-64 md:h-screen bg-gray-200 dark:bg-gray-800 flex items-center justify-center relative">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-600 dark:text-gray-500">Mapa de Espaços</h2>
          <p className="text-gray-500 dark:text-gray-600">(Visualização do mapa aparecerá aqui)</p>
        </div>
        <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
          <button className="w-10 h-10 bg-gray-200/50 dark:bg-gray-900/50 backdrop-blur-md rounded-full text-xl font-bold hover:bg-gray-300/50 dark:hover:bg-gray-700/50 text-gray-800 dark:text-white">+</button>
          <button className="w-10 h-10 bg-gray-200/50 dark:bg-gray-900/50 backdrop-blur-md rounded-full text-xl font-bold hover:bg-gray-300/50 dark:hover:bg-gray-700/50 text-gray-800 dark:text-white">-</button>
        </div>
      </div>

      {/* Spaces List Area */}
      <div className="w-full md:w-1/3 bg-white dark:bg-gray-900 p-6 overflow-y-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Espaços Culturais</h1>
        
        <div className="mb-6 sticky top-0 bg-white dark:bg-gray-900 py-4">
          <input
            type="text"
            placeholder="Buscar por nome do espaço..."
            className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="mt-2">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-semibold">
              Filtrar
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {spaces.length > 0 ? (
            spaces.map(space => (
              <SpaceCard key={space.id} space={space} />
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400">Nenhum espaço encontrado.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SpacesPage;
