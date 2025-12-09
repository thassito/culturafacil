import { Link } from 'react-router-dom';
import { Cog6ToothIcon, HomeIcon, PlusCircleIcon, ChartBarIcon, UserGroupIcon, CalendarDaysIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';

interface DashboardStats {
  totalAgents: string;
  activeEvents: string;
  registeredProjects: string;
  verifiedSpaces: string;
}

interface Opportunity { // Reusing Opportunity interface from previous files
  id: string;
  name: string;
  type: string;
  status: string;
  registrationFrom: string;
  registrationTo: string;
}

interface Agent {
  id: string;
  name: string;
  // Adicione outras propriedades de Agente se souber quais são
}

const StatCard = ({ title, value, icon: Icon }: { title: string, value: string | number, icon: React.ElementType }) => (
  <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-md p-6 rounded-lg border border-gray-200 dark:border-gray-700/50 flex items-center space-x-4">
    <div className="bg-blue-500/10 p-3 rounded-full">
      <Icon className="h-8 w-8 text-blue-600 dark:text-blue-300" />
    </div>
    <div>
      <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
      <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
    </div>
  </div>
);

function Dashboard() {
  const { token } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({ // Typed
    totalAgents: '...',
    activeEvents: '...',
    registeredProjects: '...',
    verifiedSpaces: '...',
  });
  const [loadingStats, setLoadingStats] = useState<boolean>(true); // Typed
  const [errorStats, setErrorStats] = useState<string | null>(null); // Typed

  useEffect(() => {
    const fetchStats = async () => {
      if (!token) {
        setLoadingStats(false);
        return;
      }
      setLoadingStats(true);
      setErrorStats(null);
      try {
        const [agentsRes, opportunitiesRes] = await Promise.all([
          fetch(`${API_URL}/agents`, { headers: { 'Authorization': `Bearer ${token}` } }),
          fetch(`${API_URL}/opportunities`, { headers: { 'Authorization': `Bearer ${token}` } }),
        ]);

        const agentsResponse = await agentsRes.json();
        const opportunitiesResponse = await opportunitiesRes.json();

        const agentsData: Agent[] = agentsResponse.data || [];
        const opportunitiesData: Opportunity[] = opportunitiesResponse.data || [];
        
        // Use pagination total if available, otherwise fallback to data length
        const totalAgentsCount = agentsResponse.pagination?.total ?? agentsData.length;
        const totalOpportunitiesCount = opportunitiesResponse.pagination?.total ?? opportunitiesData.length;

        if (!agentsRes.ok || !opportunitiesRes.ok) {
          throw new Error('Failed to fetch dashboard stats');
        }
        
        // For 'Espaços Verificados', we don't have an endpoint yet, so keeping placeholder
        setStats({
          totalAgents: totalAgentsCount.toLocaleString(),
          activeEvents: (opportunitiesData.filter((op: Opportunity) => op.status === 'published' && new Date(op.registrationTo) > new Date()).length || 0).toLocaleString(), 
          registeredProjects: totalOpportunitiesCount.toLocaleString(), 
          verifiedSpaces: 'N/A', // Placeholder
        });

      } catch (err: unknown) { // Typed err
        setErrorStats((err as Error).message); // Type assertion
        setStats({
          totalAgents: 'Erro',
          activeEvents: 'Erro',
          registeredProjects: 'Erro',
          verifiedSpaces: 'Erro',
        });
      } finally {
        setLoadingStats(false);
      }
    };

    fetchStats();
  }, [token]);


  return (
    <>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
      <p className="text-gray-600 dark:text-gray-400 mt-2">
        Bem-vindo à área de administração.
      </p>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {errorStats && (
          <div className="lg:col-span-4 text-red-500 text-center py-4">
            Erro ao carregar estatísticas: {errorStats}
          </div>
        )}
        <StatCard title="Total de Agentes" value={loadingStats ? '...' : stats.totalAgents} icon={UserGroupIcon} />
        <StatCard title="Eventos Ativos" value={loadingStats ? '...' : stats.activeEvents} icon={CalendarDaysIcon} />
        <StatCard title="Projetos Cadastrados" value={loadingStats ? '...' : stats.registeredProjects} icon={Cog6ToothIcon} />
        <StatCard title="Espaços Verificados" value={loadingStats ? '...' : stats.verifiedSpaces} icon={MapPinIcon} />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        {/* Quick Actions */}
        <div className="lg:col-span-1 bg-white/50 dark:bg-gray-800/50 backdrop-blur-md p-6 rounded-lg border border-gray-200 dark:border-gray-700/50">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Ações Rápidas</h2>
          <div className="space-y-3">
            <Link to="/admin/homepage" className="flex items-center p-3 bg-gray-100 dark:bg-gray-700/50 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors text-gray-700 dark:text-gray-300">
              <HomeIcon className="h-6 w-6 text-gray-600 dark:text-gray-300 mr-3" />
              <span>Editar Homepage</span>
            </Link>
            {/* Direct link to add a new opportunity/event */}
            <Link to="/admin/opportunities" className="w-full flex items-center p-3 bg-gray-100 dark:bg-gray-700/50 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors text-gray-700 dark:text-gray-300">
              <PlusCircleIcon className="h-6 w-6 text-gray-600 dark:text-gray-300 mr-3" />
              <span>Adicionar Nova Oportunidade</span>
            </Link>
          </div>
        </div>

        {/* Chart Placeholder */}
        <div className="lg:col-span-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-md p-6 rounded-lg border border-gray-200 dark:border-gray-700/50 flex flex-col items-center justify-center">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Atividade Semanal</h2>
          <ChartBarIcon className="h-24 w-24 text-gray-400 dark:text-gray-600" />
          <p className="text-gray-500 dark:text-gray-500 mt-4">(Gráfico aparecerá aqui)</p>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
