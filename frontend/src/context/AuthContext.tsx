import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

// Define o formato dos dados do usuário (agente) e do contexto
interface User {
  id: string;
  email: string;
  // Adicione outros campos do agente que a API retorna, se necessário
  name?: string;
  cpf?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string, cpf: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// URL da API - usa a variável de ambiente do Vite ou um fallback
const API_URL = 'https://api.culturafacil.com.br/api/v1';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Efeito para verificar o token e usuário no carregamento inicial
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('user');
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Falha no login');
    }

    const data = await response.json();
    
    // Armazena o token e dados do agente
    localStorage.setItem('authToken', data.token);
    localStorage.setItem('user', JSON.stringify(data.agent));
    setToken(data.token);
    setUser(data.agent);
  };
  
  const signup = async (email: string, password: string, name: string, cpf: string) => {
    const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name, cpf }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Falha no cadastro');
    }

    const data = await response.json();

    // Armazena o token e dados do agente após o registro
    localStorage.setItem('authToken', data.token);
    localStorage.setItem('user', JSON.stringify(data.agent));
    setToken(data.token);
    setUser(data.agent);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, token, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};