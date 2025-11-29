import { motion } from 'framer-motion';

function Hero() {
  return (
    <motion.section 
      className="bg-transparent"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 md:py-28 lg:py-32">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
          Menos Burocracia. <span className="text-blue-500">Mais Cultura.</span>
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-gray-300">
          A ferramenta que simplifica sua participação em editais e conecta você ao fomento cultural. Deixe a papelada conosco e foque no que realmente importa: sua arte.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <a
            href="#"
            className="w-full sm:w-auto px-8 py-4 bg-white text-gray-900 font-bold rounded-full shadow-lg hover:bg-gray-200 transition-transform duration-300 transform hover:scale-105"
          >
            Ver Editais Abertos
          </a>
          <a
            href="#"
            className="w-full sm:w-auto px-8 py-4 bg-transparent text-white font-semibold rounded-full border border-white hover:bg-white/10 transition-colors duration-300"
          >
            Saiba Mais
          </a>
        </div>
      </div>
    </motion.section>
  );
}

export default Hero;
