function Header() {
  return (
    <header className="sticky top-0 z-50 bg-black/50 backdrop-blur-lg border-b border-gray-700/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-white">Cultura Fácil</h1>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-300 hover:text-white font-medium">Editais</a>
            <a href="#" className="text-gray-300 hover:text-white font-medium">Agentes</a>
            <a href="#" className="text-gray-300 hover:text-white font-medium">Projetos</a>
          </nav>
          <div className="flex items-center space-x-4">
            <a href="#" className="text-gray-300 hover:text-white font-medium">Login</a>
            <a href="#" className="px-5 py-2.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300">
              Cadastre-se
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
