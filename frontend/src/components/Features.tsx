import { MagnifyingGlassIcon, PencilSquareIcon, MegaphoneIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const features = [
  {
    name: 'Descubra Editais com Facilidade',
    description: 'Chega de procurar em vários lugares. Centralizamos os principais editais para você encontrar a oportunidade certa, com filtros inteligentes e alertas.',
    icon: MagnifyingGlassIcon,
  },
  {
    name: 'Inscrições Simplificadas',
    description: 'Transformamos formulários complexos em um processo passo a passo. Preencha seu perfil uma vez e use para se inscrever em múltiplos editais com poucos cliques.',
    icon: PencilSquareIcon,
  },
  {
    name: 'Dê Visibilidade ao seu Portfólio',
    description: 'Crie seu perfil de agente cultural e tenha uma página profissional para apresentar seus projetos, seu histórico e sua arte para o mundo, atraindo parceiros.',
    icon: MegaphoneIcon,
  },
];

// Animation variants for the container to stagger children
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

// Animation variants for the individual feature cards
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

function Features() {
  return (
    <motion.section 
      className="py-20 bg-transparent"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <h3 className="text-3xl font-bold text-white">Feito para facilitar sua vida</h3>
          <p className="text-lg text-gray-300 mt-2">Menos tempo com burocracia, mais tempo para criar.</p>
        </motion.div>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants} // You can reuse or have different variants
        >
          {features.map((feature) => {
            const Icon = feature.icon; // Assign component to a variable with a capital letter
            return (
              <motion.div 
                key={feature.name} 
                className="bg-gray-800/20 backdrop-blur-xl p-8 rounded-2xl shadow-lg border border-gray-600/50"
                variants={itemVariants}
              >
                <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-4">
                  <Icon className="w-8 h-8 text-blue-300" />
                </div>
                <h4 className="text-xl font-semibold text-white">{feature.name}</h4>
                <p className="mt-2 text-gray-300">{feature.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
}

export default Features;
