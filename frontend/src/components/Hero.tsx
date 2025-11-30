import { motion } from 'framer-motion';
import { useContent } from '../context/ContentContext';

function Hero() {
  const { heroContent } = useContent();

  return (
    <motion.section 
      className="bg-transparent"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 md:py-28 lg:py-32">
        <h2 
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight"
        >
          {heroContent.titlePart1}{' '}
          <span className="text-blue-600 dark:text-blue-500">{heroContent.titlePart2}</span>
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300">
          {heroContent.subtitle}
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <a
            href="#"
            className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white font-bold rounded-full shadow-lg hover:bg-blue-700 transition-transform duration-300 transform hover:scale-105"
          >
            Ver Editais Abertos
          </a>
          <a
            href="#"
            className="w-full sm:w-auto px-8 py-4 bg-gray-200 dark:bg-white/10 text-gray-800 dark:text-white font-semibold rounded-full border border-transparent hover:bg-gray-300 dark:hover:bg-white/20 transition-colors duration-300"
          >
            Saiba Mais
          </a>
        </div>
      </div>
    </motion.section>
  );
}

export default Hero;
