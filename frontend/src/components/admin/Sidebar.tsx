import React from 'react';

const Sidebar = () => {
  const navItems = ['Dashboard', 'Usuários', 'Editais', 'Projetos', 'Configurações'];

  return (
    <div className="w-64 h-screen bg-gray-900 text-white flex flex-col">
      <div className="p-5 border-b border-gray-700">
        <h1 className="text-2xl font-bold">Admin</h1>
        <span className="text-sm text-gray-400">Cultura Fácil</span>
      </div>
      <nav className="flex-1 p-5 space-y-2">
        {navItems.map((item) => (
          <a
            key={item}
            href="#"
            className="flex items-center px-4 py-2.5 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md transition-colors duration-200"
          >
            {item}
          </a>
        ))}
      </nav>
      <div className="p-5 border-t border-gray-700">
        <a href="/" className="text-gray-400 hover:text-white">
          &larr; Voltar ao site
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
