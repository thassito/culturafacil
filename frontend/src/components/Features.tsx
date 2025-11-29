const features = [
  {
    name: 'Acesso Simplificado',
    description: 'Navegue em qualquer dispositivo. Nossa plataforma é 100% responsiva para celulares, tablets e computadores.',
    icon: '📱', // Placeholder icon
  },
  {
    name: 'Plataforma Intuitiva',
    description: 'Cadastre seus projetos e acompanhe os editais de forma fácil e rápida, sem complicações.',
    icon: '🚀', // Placeholder icon
  },
  {
    name: 'Alta Disponibilidade',
    description: 'Acesse a qualquer hora, em qualquer lugar. Nossa infraestrutura em nuvem garante a estabilidade que você precisa.',
    icon: '☁️', // Placeholder icon
  },
];

function Features() {
  return (
    <section className="py-20 bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-white">Tudo que você precisa em um só lugar</h3>
          <p className="text-lg text-gray-300 mt-2">Focamos em resolver os seus maiores desafios.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.name} className="bg-gray-800/20 backdrop-blur-xl p-8 rounded-2xl shadow-lg border border-gray-600/50">
              <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center text-4xl mb-4">
                {feature.icon}
              </div>
              <h4 className="text-xl font-semibold text-white">{feature.name}</h4>
              <p className="mt-2 text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
