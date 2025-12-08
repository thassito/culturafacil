
import { Link, useLocation } from 'react-router-dom'; // Import useLocation to highlight active link
import { HomeIcon, UsersIcon, MegaphoneIcon, FolderIcon, Cog6ToothIcon, ArrowLeftEndOnRectangleIcon } from '@heroicons/react/24/outline';


const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: HomeIcon },
    { name: 'Agentes', path: '/admin/agents', icon: UsersIcon },
    { name: 'Oportunidades', path: '/admin/opportunities', icon: MegaphoneIcon }, // NEW ITEM
    { name: 'Eventos', path: '/admin/events', icon: MegaphoneIcon },
    { name: 'Projetos', path: '/admin/projects', icon: FolderIcon },
    { name: 'Configurações', path: '/admin/settings', icon: Cog6ToothIcon },
    { name: 'Editar Homepage', path: '/admin/homepage', icon: HomeIcon }, // Added direct link for now
  ];

  return (
    <div className="w-64 flex-shrink-0 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white flex flex-col border-r border-gray-200 dark:border-gray-800">
      <div className="p-5 border-b border-gray-200 dark:border-gray-800">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin</h1>
        <span className="text-sm text-gray-500 dark:text-gray-400">Cultura Fácil</span>
      </div>
      <nav className="flex-1 p-5 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center px-4 py-2.5 rounded-md transition-colors duration-200 
                ${isActive 
                  ? 'bg-blue-100 dark:bg-blue-600/20 text-blue-700 dark:text-blue-300 font-semibold' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`
              }
            >
              <Icon className="h-5 w-5 mr-3" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-5 border-t border-gray-200 dark:border-gray-800">
        <Link to="/" className="flex items-center px-4 py-2.5 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200">
          <ArrowLeftEndOnRectangleIcon className="h-5 w-5 mr-3" />
          <span>Voltar ao site</span>
        </Link>
        <button className="w-full flex items-center px-4 py-2.5 rounded-md text-red-600 hover:bg-red-100 dark:hover:bg-red-600/20 transition-colors duration-200 mt-2">
          Sair
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
