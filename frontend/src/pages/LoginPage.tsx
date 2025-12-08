import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  
  // Estados para controlar os inputs do formulário, erro e carregamento
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null); // Limpa erros anteriores
    setLoading(true); // Ativa o estado de carregamento

    try {
      // Chama a função de login do contexto com as credenciais
      await login(email, password);
      navigate('/'); // Redireciona para a home em caso de sucesso
    } catch (err: any) {
      // Captura o erro e define a mensagem de erro
      setError(err.message || 'Ocorreu um erro desconhecido.');
    } finally {
      setLoading(false); // Desativa o estado de carregamento
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-8 bg-white/50 dark:bg-gray-800/20 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700/50">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
          Acessar Plataforma
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Exibe a mensagem de erro, se houver */}
          {error && (
            <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-md">
              <p className="text-sm text-center text-red-400">{error}</p>
            </div>
          )}
          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email} // Controlado pelo estado
              onChange={(e) => setEmail(e.target.value)} // Atualiza o estado
              className="mt-1 block w-full px-4 py-3 bg-gray-100 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="seu@email.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Senha
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password} // Controlado pelo estado
              onChange={(e) => setPassword(e.target.value)} // Atualiza o estado
              className="mt-1 block w-full px-4 py-3 bg-gray-100 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="••••••••"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-blue-600 bg-gray-200 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500" />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Lembrar de mim
              </label>
            </div>
            <div className="text-sm">
              <Link to="#" className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                Esqueceu a senha?
              </Link>
            </div>
          </div>
          <div>
            <button
              type="submit"
              disabled={loading} // Desabilita o botão durante o carregamento
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-bold text-gray-900 bg-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 disabled:opacity-50"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
