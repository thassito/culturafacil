import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of our editable content
interface HeroContent {
  titlePart1: string;
  titlePart2: string;
  subtitle: string;
}

interface ContentContextType {
  heroContent: HeroContent;
  updateHeroContent: (newContent: Partial<HeroContent>) => void;
}

// Create the context with a default value
const ContentContext = createContext<ContentContextType | undefined>(undefined);

// Initial state with the current text from the Hero component
const initialHeroContent: HeroContent = {
  titlePart1: 'Menos Burocracia.',
  titlePart2: 'Mais Cultura.',
  subtitle: 'A ferramenta que simplifica sua participação em editais e conecta você ao fomento cultural. Deixe a papelada conosco e foque no que realmente importa: sua arte.',
};

export const ContentProvider = ({ children }: { children: ReactNode }) => {
  const [heroContent, setHeroContent] = useState<HeroContent>(initialHeroContent);

  const updateHeroContent = (newContent: Partial<HeroContent>) => {
    setHeroContent(prevContent => ({ ...prevContent, ...newContent }));
  };

  return (
    <ContentContext.Provider value={{ heroContent, updateHeroContent }}>
      {children}
    </ContentContext.Provider>
  );
};

// Custom hook for easy consumption of the context
export const useContent = () => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};
