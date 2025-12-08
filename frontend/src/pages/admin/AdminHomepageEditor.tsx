import { useState, useEffect } from 'react'; // Removed React import
import { useContent } from '../../context/ContentContext';
import { useAuth } from '../../context/AuthContext';

interface FeatureItem {
  name: string;
  description: string;
}

interface FeatureEditorProps {
  feature: FeatureItem;
  onChange: (index: number, field: keyof FeatureItem, value: string) => void;
  index: number;
}

const FeatureEditor = ({ feature, onChange, index }: FeatureEditorProps) => { // Added type to props
  return (
    <div className="p-4 border border-gray-300 dark:border-gray-700 rounded-lg space-y-3">
      <h3 className="text-lg font-semibold">Feature {index + 1}</h3>
      <div>
        <label htmlFor={`featureName${index}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Nome
        </label>
        <input
          id={`featureName${index}`}
          value={feature.name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(index, 'name', e.target.value)} // Typed event
          className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white"
        />
      </div>
      <div>
        <label htmlFor={`featureDesc${index}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Descrição
        </label>
        <textarea
          id={`featureDesc${index}`}
          value={feature.description}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(index, 'description', e.target.value)} // Typed event
          rows={3}
          className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white"
        />
      </div>
    </div>
  );
};

// ... (FeatureItem, FeatureEditorProps interfaces are already added)

interface HeroContent {
  titlePart1: string;
  titlePart2: string;
  subtitle: string;
}

interface FeaturesContent {
  title: string;
  subtitle: string;
  features: FeatureItem[];
}

interface Content {
  hero: HeroContent;
  features: FeaturesContent;
}

interface StatusState {
  loading: boolean;
  saved: boolean;
  error: string | null;
}

function AdminHomepageEditor() {
  const { content, saveContent } = useContent();
  const { token } = useAuth();
  
  // Local form state
  const [heroState, setHeroState] = useState<HeroContent>({ titlePart1: '', titlePart2: '', subtitle: '' }); // Typed
  const [featuresState, setFeaturesState] = useState<FeaturesContent>({ title: '', subtitle: '', features: [] }); // Typed
  
  const [status, setStatus] = useState<StatusState>({ loading: false, saved: false, error: null }); // Typed

  useEffect(() => {
    if (content) {
      setHeroState(content.hero);
      setFeaturesState(content.features);
    }
  }, [content]);

  const handleFeatureChange = (index: number, field: keyof FeatureItem, value: string) => { // Typed parameters
    const updatedFeatures = [...featuresState.features];
    updatedFeatures[index] = { ...updatedFeatures[index], [field]: value };
    setFeaturesState(prevState => ({ ...prevState, features: updatedFeatures }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!token) {
      setStatus({ loading: false, saved: false, error: 'Você não está autenticado.' });
      return;
    }

    setStatus({ loading: true, saved: false, error: null });
    
    const newContent: Content = { hero: heroState, features: featuresState }; // Typed newContent

    try {
      await saveContent(newContent, token);
      setStatus({ loading: false, saved: true, error: null });
      setTimeout(() => setStatus(prev => ({ ...prev, saved: false })), 2000);
    } catch (err: unknown) { // Use unknown for better type safety
      setStatus({ loading: false, saved: false, error: (err as Error).message }); // Type assertion for error message
    }
  };

  if (!content) {
    return <div>Carregando editor...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Editar Homepage</h1>
      
      <form onSubmit={handleSubmit} className="space-y-12 max-w-3xl mt-8">
        {/* Hero Section Form */}
        <div className="p-6 bg-white/50 dark:bg-gray-800/20 rounded-lg border border-gray-200 dark:border-gray-700/50">
          <h2 className="text-2xl font-bold mb-6">Seção Hero</h2>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="heroTitle1" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Título (Parte 1)
                </label>
                <input
                  id="heroTitle1"
                  value={heroState.titlePart1}
                  onChange={(e) => setHeroState(s => ({...s, titlePart1: e.target.value}))}
                  className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label htmlFor="heroTitle2" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Título (Parte 2 - Destaque)
                </label>
                <input
                  id="heroTitle2"
                  value={heroState.titlePart2}
                  onChange={(e) => setHeroState(s => ({...s, titlePart2: e.target.value}))}
                  className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white"
                />
              </div>
            </div>
            <div>
              <label htmlFor="heroSubtitle" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Subtítulo
              </label>
              <textarea
                id="heroSubtitle"
                value={heroState.subtitle}
                onChange={(e) => setHeroState(s => ({...s, subtitle: e.target.value}))}
                rows={3}
                className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Features Section Form */}
        <div className="p-6 bg-white/50 dark:bg-gray-800/20 rounded-lg border border-gray-200 dark:border-gray-700/50">
          <h2 className="text-2xl font-bold mb-6">Seção Features</h2>
          <div className="space-y-6">
            <div>
              <label htmlFor="featuresTitle" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Título da Seção
              </label>
              <input
                id="featuresTitle"
                value={featuresState.title}
                onChange={(e) => setFeaturesState(s => ({...s, title: e.target.value}))}
                className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label htmlFor="featuresSubtitle" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Subtítulo da Seção
              </label>
              <input
                id="featuresSubtitle"
                value={featuresState.subtitle}
                onChange={(e) => setFeaturesState(s => ({...s, subtitle: e.target.value}))}
                className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white"
              />
            </div>
            <div className="space-y-4">
              {featuresState.features.map((feature, index) => (
                <FeatureEditor key={index} index={index} feature={feature} onChange={handleFeatureChange} />
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold disabled:bg-gray-400"
            disabled={status.loading}
          >
            {status.loading ? 'Salvando...' : 'Salvar Todas as Alterações'}
          </button>
          {status.saved && <span className="text-green-600 dark:text-green-400">Salvo com sucesso!</span>}
          {status.error && <span className="text-red-600 dark:text-red-400">{status.error}</span>}
        </div>
      </form>
    </div>
  );
}

export default AdminHomepageEditor;
