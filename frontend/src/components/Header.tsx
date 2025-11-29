import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-black/50 backdrop-blur-lg border-b border-gray-700/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-white">Cultura Fácil</Link>
          </div>
          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/eventos" className="text-gray-300 hover:text-white font-medium">Eventos</Link>
            <Link to="/espacos" className="text-gray-300 hover:text-white font-medium">Espaços</Link>
            <Link to="/agentes" className="text-gray-300 hover:text-white font-medium">Agentes</Link>
            <Link to="/projetos" className="text-gray-300 hover:text-white font-medium">Projetos</Link>
            <Link to="/oportunidades" className="text-gray-300 hover:text-white font-medium">Oportunidades</Link>
            <Link to="/login" className="text-gray-300 hover:text-white font-medium">Login</Link>
            <Link to="/signup" className="px-5 py-2.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300">
              Cadastre-se
            </Link>
          </nav>
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-white focus:outline-none">
              {isOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu Panel */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden bg-black/80 backdrop-blur-lg`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link to="/eventos" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700">Eventos</Link>
          <Link to="/espacos" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700">Espaços</Link>
          <Link to="/agentes" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700">Agentes</Link>
          <Link to="/projetos" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700">Projetos</Link>
          <Link to="/oportunidades" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700">Oportunidades</Link>
        </div>
        <div className="pt-4 pb-3 border-t border-gray-700">
          <div className="px-5 flex items-center justify-between">
            <Link to="/login" className="text-base font-medium text-gray-300 hover:text-white">Login</Link>
            <Link to="/signup" className="px-5 py-2.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300">
              Cadastre-se
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
