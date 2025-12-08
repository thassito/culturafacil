
import { useAuth } from '../context/AuthContext';

function AgentDashboardPage() {
  const { user } = useAuth(); // Obtém os dados do usuário logado

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-3xl font-bold leading-tight">
            Painel do Agente Cultural
          </h1>
        </div>
      </header>
      <main>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {user ? (
            <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Bem-vindo(a), {user.name || 'Agente'}!</h2>
              <p className="text-gray-600 dark:text-gray-400">Este é o seu painel. Aqui você poderá gerenciar suas informações, inscrições e muito mais.</p>
              
              <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
                <h3 className="text-lg font-medium">Suas Informações</h3>
                <dl className="mt-4 grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Nome</dt>
                    <dd className="mt-1 text-sm">{user.name}</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</dt>
                    <dd className="mt-1 text-sm">{user.email}</dd>
                  </div>
                  {/* Adicionar mais informações do agente aqui no futuro */}
                </dl>
              </div>
            </div>
          ) : (
            <p>Carregando informações do usuário...</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default AgentDashboardPage;
