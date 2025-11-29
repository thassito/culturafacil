function Hero() {
  return (
    <section className="bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 md:py-32">
        <h2 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
          Conectando Cultura, <span className="text-blue-500">Fomentando Futuros.</span>
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-gray-300">
          A plataforma definitiva para agentes culturais encontrarem os melhores editais de fomento e darem vida aos seus projetos.
        </p>
        <div className="mt-8 flex justify-center space-x-4">
          <a
            href="#"
            className="px-8 py-4 bg-white text-gray-900 font-bold rounded-full shadow-lg hover:bg-gray-200 transition-transform duration-300 transform hover:scale-105"
          >
            Ver Editais Abertos
          </a>
          <a
            href="#"
            className="px-8 py-4 bg-transparent text-white font-semibold rounded-full border border-white hover:bg-white/10 transition-colors duration-300"
          >
            Saiba Mais
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
