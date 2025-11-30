import { Link } from 'react-router-dom';
import { Cog6ToothIcon, HomeIcon, PlusCircleIcon, ChartBarIcon, UserGroupIcon, CalendarDaysIcon, MapPinIcon } from '@heroicons/react/24/outline';

const StatCard = ({ title, value, icon: Icon }: { title: string, value: string, icon: React.ElementType }) => (
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
  return (
    <>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
      <p className="text-gray-600 dark:text-gray-400 mt-2">
        Bem-vindo à área de administração.
      </p>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        <StatCard title="Total de Agentes" value="1,254" icon={UserGroupIcon} />
        <StatCard title="Eventos Ativos" value="86" icon={CalendarDaysIcon} />
        <StatCard title="Projetos Cadastrados" value="432" icon={Cog6ToothIcon} />
        <StatCard title="Espaços Verificados" value="789" icon={MapPinIcon} />
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
            <button className="w-full flex items-center p-3 bg-gray-100 dark:bg-gray-700/50 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors text-gray-700 dark:text-gray-300">
              <PlusCircleIcon className="h-6 w-6 text-gray-600 dark:text-gray-300 mr-3" />
              <span>Adicionar Novo Evento</span>
            </button>
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
