import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import OpportunityForm from '../../components/admin/OpportunityForm';

const API_URL = import.meta.env.VITE_API_URL || 'https://api.culturafacil.com.br/api/v1';

function AdminEventsPage() {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();
  const [showFormModal, setShowFormModal] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null); // Opportunity to edit, or null for new

  const fetchOpportunities = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/opportunities`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Falha ao buscar eventos.');
      }
      const data = await response.json();
      // For now, let's just list all opportunities as "events".
      // A filtering mechanism might be needed later if 'events' are a specific type of opportunity.
      setOpportunities(data); 
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOpportunities();
    }
  }, [token]);

  const handleAddOpportunity = () => {
    setSelectedOpportunity(null);
    setShowFormModal(true);
  };

  const handleEditOpportunity = (opportunity) => {
    setSelectedOpportunity(opportunity);
    setShowFormModal(true);
  };

  const handleDeleteOpportunity = async (opportunityId) => {
    if (window.confirm('Tem certeza que deseja deletar este evento?')) {
      try {
        const response = await fetch(`${API_URL}/opportunities/${opportunityId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Falha ao deletar evento.');
        }
        fetchOpportunities(); // Refresh the list
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleFormSave = () => {
    setShowFormModal(false);
    fetchOpportunities(); // Refresh the list after save
  };

  const handleFormCancel = () => {
    setShowFormModal(false);
  };

  if (loading) return <div>Carregando eventos...</div>;
  if (error) return <div className="text-red-500">Erro: {error}</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Gerenciamento de Eventos (Oportunidades)</h1>
      <div className="flex justify-end mb-4">
        <button
          onClick={handleAddOpportunity}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Adicionar Novo Evento
        </button>
      </div>
      <div className="bg-white/50 dark:bg-gray-800/20 rounded-lg border border-gray-200 dark:border-gray-700/50 shadow-md overflow-hidden">
        <table className="min-w-full text-left">
          <thead className="border-b border-gray-200 dark:border-gray-700">
            <tr>
              <th className="p-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Nome</th>
              <th className="p-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Tipo</th>
              <th className="p-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Status</th>
              <th className="p-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Início Inscrição</th>
              <th className="p-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Fim Inscrição</th>
              <th className="p-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Ações</th>
            </tr>
          </thead>
          <tbody>
            {opportunities.map((opportunity) => (
              <tr key={opportunity.id} className="border-t border-gray-200 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/30">
                <td className="p-4 text-gray-800 dark:text-gray-200">{opportunity.name}</td>
                <td className="p-4 text-gray-800 dark:text-gray-200">{opportunity.type}</td>
                <td className="p-4 text-gray-800 dark:text-gray-200">{opportunity.status}</td>
                <td className="p-4 text-gray-800 dark:text-gray-200">{new Date(opportunity.registrationFrom).toLocaleDateString()}</td>
                <td className="p-4 text-gray-800 dark:text-gray-200">{new Date(opportunity.registrationTo).toLocaleDateString()}</td>
                <td className="p-4 flex space-x-2">
                  <button onClick={() => handleEditOpportunity(opportunity)} className="text-blue-600 hover:underline">Editar</button>
                  <button onClick={() => handleDeleteOpportunity(opportunity.id)} className="text-red-600 hover:underline">Deletar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showFormModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-h-[90vh] overflow-y-auto w-full max-w-3xl">
            <OpportunityForm opportunity={selectedOpportunity} onSave={handleFormSave} onCancel={handleFormCancel} />
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminEventsPage;
