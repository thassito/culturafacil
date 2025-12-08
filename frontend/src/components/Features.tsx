import { MagnifyingGlassIcon, PencilSquareIcon, MegaphoneIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { useContent } from '../context/ContentContext';

const iconMap = [MagnifyingGlassIcon, PencilSquareIcon, MegaphoneIcon];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

function Features() {
  const { content } = useContent();

  if (!content) {
    return null; // Or a loading skeleton
  }

  const { title, subtitle, features } = content.features;

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
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{title}</h3>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">{subtitle}</p>
        </motion.div>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
        >
          {features.map((feature, index) => {
            const Icon = iconMap[index % iconMap.length]; // Cycle through icons
            return (
              <motion.div 
                key={feature.name} 
                className="bg-gray-100/50 dark:bg-gray-800/20 backdrop-blur-xl p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700/50"
                variants={itemVariants}
              >
                <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-4">
                  <Icon className="w-8 h-8 text-blue-600 dark:text-blue-300" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white">{feature.name}</h4>
                <p className="mt-2 text-gray-600 dark:text-gray-300">{feature.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
}

export default Features;
