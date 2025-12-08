import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// A interface define o formato dos dados que o contexto irá fornecer.
interface AuthContextType {
  isAdminLoggedIn: boolean;
  login: (email, password) => Promise<void>;
  logout: () => void;
  token: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  // Efeito para verificar o token no carregamento inicial
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setToken(storedToken);
      setIsAdminLoggedIn(true);
    }
  }, []);

  // Função de login assíncrona que chama a API
  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        // Lança um erro se a resposta da API não for bem-sucedida
        throw new Error('Falha no login. Verifique suas credenciais.');
      }

      const data = await response.json();
      
      // Armazena o token e atualiza o estado
      localStorage.setItem('authToken', data.access_token);
      setToken(data.access_token);
      setIsAdminLoggedIn(true);

    } catch (error) {
      console.error('Erro de login:', error);
      // Garante que o estado de logout esteja correto em caso de falha
      localStorage.removeItem('authToken');
      setToken(null);
      setIsAdminLoggedIn(false);
      // Propaga o erro para que a página de login possa tratá-lo
      throw error;
    }
  };

  // Função de logout
  const logout = () => {
    localStorage.removeItem('authToken');
    setToken(null);
    setIsAdminLoggedIn(false);
  };

  // Fornece o estado e as funções para os componentes filhos
  return (
    <AuthContext.Provider value={{ isAdminLoggedIn, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook customizado para facilitar o uso do contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
