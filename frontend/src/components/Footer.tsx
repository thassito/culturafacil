function Footer() {
  return (
    <footer className="bg-white/50 dark:bg-black/30 backdrop-blur-lg border-t border-gray-200 dark:border-gray-700/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Cultura Fácil. Todos os direitos reservados.<br />
            Desenvolvido por <a href="https://www.linkedin.com/in/thassito/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Thàssitto Gàspar</a>.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white">Termos</a>
            <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white">Privacidade</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
