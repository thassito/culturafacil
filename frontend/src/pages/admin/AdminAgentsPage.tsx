import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import AgentForm from '../../components/admin/AgentForm';

const API_URL = import.meta.env.VITE_API_URL || 'https://api.culturafacil.com.br/api/v1';

function AdminAgentsPage() {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();
  const [showFormModal, setShowFormModal] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null); // Agent to edit, or null for new

  const fetchAgents = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/agents`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Falha ao buscar agentes.');
      }
      const data = await response.json();
      setAgents(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchAgents();
    }
  }, [token]);

  const handleAddAgent = () => {
    setSelectedAgent(null);
    setShowFormModal(true);
  };

  const handleEditAgent = (agent) => {
    setSelectedAgent(agent);
    setShowFormModal(true);
  };

  const handleDeleteAgent = async (agentId) => {
    if (window.confirm('Tem certeza que deseja deletar este agente?')) {
      try {
        const response = await fetch(`${API_URL}/agents/${agentId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Falha ao deletar agente.');
        }
        fetchAgents(); // Refresh the list
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleFormSave = () => {
    setShowFormModal(false);
    fetchAgents(); // Refresh the list after save
  };

  const handleFormCancel = () => {
    setShowFormModal(false);
  };

  if (loading) return <div>Carregando agentes...</div>;
  if (error) return <div className="text-red-500">Erro: {error}</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Gerenciamento de Agentes</h1>
      <div className="flex justify-end mb-4">
        <button
          onClick={handleAddAgent}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Adicionar Novo Agente
        </button>
      </div>
      <div className="bg-white/50 dark:bg-gray-800/20 rounded-lg border border-gray-200 dark:border-gray-700/50 shadow-md overflow-hidden">
        <table className="min-w-full text-left">
          <thead className="border-b border-gray-200 dark:border-gray-700">
            <tr>
              <th className="p-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Nome</th>
              <th className="p-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Email</th>
              <th className="p-4 text-sm font-semibold text-gray-700 dark:text-gray-300">CPF</th>
              <th className="p-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Tipo</th>
              <th className="p-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Verificado</th>
              <th className="p-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Ações</th>
            </tr>
          </thead>
          <tbody>
            {agents.map((agent) => (
              <tr key={agent.id} className="border-t border-gray-200 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/30">
                <td className="p-4 text-gray-800 dark:text-gray-200">{agent.name}</td>
                <td className="p-4 text-gray-800 dark:text-gray-200">{agent.user.email}</td>
                <td className="p-4 text-gray-800 dark:text-gray-200">{agent.cpf}</td>
                <td className="p-4 text-gray-800 dark:text-gray-200">{agent.type}</td>
                <td className="p-4 text-gray-800 dark:text-gray-200">{agent.isVerified ? 'Sim' : 'Não'}</td>
                <td className="p-4 flex space-x-2">
                  <button onClick={() => handleEditAgent(agent)} className="text-blue-600 hover:underline">Editar</button>
                  <button onClick={() => handleDeleteAgent(agent.id)} className="text-red-600 hover:underline">Deletar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showFormModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-h-[90vh] overflow-y-auto w-full max-w-3xl">
            <AgentForm agent={selectedAgent} onSave={handleFormSave} onCancel={handleFormCancel} />
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminAgentsPage;
