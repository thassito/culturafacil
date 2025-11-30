import React, { useState, useEffect } from 'react';
import { useContent } from '../../context/ContentContext';

function AdminHomepageEditor() {
  const { heroContent, updateHeroContent } = useContent();
  const [titlePart1, setTitlePart1] = useState('');
  const [titlePart2, setTitlePart2] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Initialize form with content from context
    setTitlePart1(heroContent.titlePart1);
    setTitlePart2(heroContent.titlePart2);
    setSubtitle(heroContent.subtitle);
  }, [heroContent]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // In a real app, this would be an API call. Here, we update the context.
    updateHeroContent({ titlePart1, titlePart2, subtitle });
    setSaved(true);
    // Hide "Saved!" message after 2 seconds
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Editar Homepage</h1>
      <p className="text-gray-600 dark:text-gray-400 mt-2 mb-8">
        Modifique o conteúdo da seção principal (Hero) da sua página inicial.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="heroTitle1" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Título (Parte 1)
            </label>
            <input
              id="heroTitle1"
              value={titlePart1}
              onChange={(e) => setTitlePart1(e.target.value)}
              className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="heroTitle2" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Título (Parte 2 - Destaque)
            </label>
            <input
              id="heroTitle2"
              value={titlePart2}
              onChange={(e) => setTitlePart2(e.target.value)}
              className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div>
          <label htmlFor="heroSubtitle" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Subtítulo
          </label>
          <textarea
            id="heroSubtitle"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            rows={4}
            className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center space-x-4">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
          >
            Salvar Alterações
          </button>
          {saved && <span className="text-green-600 dark:text-green-400">Salvo com sucesso!</span>}
        </div>
      </form>
    </div>
  );
}

export default AdminHomepageEditor;
