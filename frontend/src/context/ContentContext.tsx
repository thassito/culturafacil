import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';

// Define shapes for editable content
interface HeroContent {
  titlePart1: string;
  titlePart2: string;
  subtitle: string;
}

interface FeatureItem {
  name: string;
  description: string;
}

interface FeaturesContent {
  title: string;
  subtitle: string;
  features: FeatureItem[];
}

interface PageContent {
  hero: HeroContent;
  features: FeaturesContent;
}

interface ContentContextType {
  content: PageContent | null;
  loadContent: () => Promise<void>;
  saveContent: (newContent: PageContent, token: string) => Promise<void>;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

const API_URL = 'https://api.culturafacil.com.br/api/v1';

// Initial state, to be used if no content is found in the backend
const initialPageContent: PageContent = {
  hero: {
    titlePart1: 'Menos Burocracia.',
    titlePart2: 'Mais Cultura.',
    subtitle: 'A ferramenta que simplifica sua participação em editais e conecta você ao fomento cultural. Deixe a papelada conosco e foque no que realmente importa: sua arte.',
  },
  features: {
    title: 'Feito para facilitar sua vida',
    subtitle: 'Menos tempo com burocracia, mais tempo para criar.',
    features: [
      { name: 'Descubra Editais com Facilidade', description: 'Chega de procurar em vários lugares...' },
      { name: 'Inscrições Simplificadas', description: 'Transformamos formulários complexos em um processo passo a passo.' },
      { name: 'Dê Visibilidade ao seu Portfólio', description: 'Crie seu perfil de agente cultural e tenha uma página profissional.' },
    ],
  },
};

export const ContentProvider = ({ children }: { children: ReactNode }) => {
  const [content, setContent] = useState<PageContent | null>(null);

  const loadContent = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/page-content/homepage`);
      if (response.ok) {
        const data = await response.json();
        // Here we should validate the shape of data.content
        setContent(data.content); 
      } else {
        setContent(initialPageContent);
      }
    } catch (error) {
      console.error('Failed to fetch page content:', error);
      setContent(initialPageContent);
    }
  }, []);

  const saveContent = async (newContent: PageContent, token: string) => {
    try {
      const response = await fetch(`${API_URL}/page-content/homepage`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ content: newContent }),
      });

      if (!response.ok) {
        throw new Error('Failed to save content');
      }
      
      const savedData = await response.json();
      // Update local state with the saved content from the server
      setContent(savedData.content);

    } catch (error) {
      console.error('Error saving content:', error);
      throw error; // Re-throw to be handled by the caller
    }
  };
  
  useEffect(() => {
    loadContent();
  }, [loadContent]);

  return (
    <ContentContext.Provider value={{ content, loadContent, saveContent }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};
