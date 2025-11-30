import React from 'react';
import { motion } from 'framer-motion';

function About() {
  return (
    <motion.section 
      className="py-20 bg-transparent"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <div className="bg-gray-100/50 dark:bg-gray-800/20 backdrop-blur-xl p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700/50 text-center">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Para quem faz a cultura acontecer.</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
            O Cultura Fácil é um projeto independente nascido da necessidade de simplificar o acesso a oportunidades. Sabemos que a burocracia é um obstáculo para quem cria. Nossa missão é derrubar essa barreira, oferecendo uma plataforma intuitiva onde você pode descobrir editais, gerenciar seus projetos e dar visibilidade ao seu trabalho. Tudo de forma acessível, em qualquer dispositivo.
          </p>
        </div>
      </div>
    </motion.section>
  );
}

export default About;
