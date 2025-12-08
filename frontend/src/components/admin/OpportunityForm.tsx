import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

const API_URL = import.meta.env.VITE_API_URL || 'https://api.culturafacil.com.br/api/v1';

const opportunityTypes = ['editais', 'chamada_publica', 'inscricao_continua'];
const opportunityStatuses = ['draft', 'published', 'closed', 'evaluation', 'result', 'archived'];

function OpportunityForm({ opportunity, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: opportunityTypes[0],
    status: opportunityStatuses[0],
    registrationFrom: '',
    registrationTo: '',
    resultAnnouncedAt: '',
    maxRegistrations: '',
    budget: '',
    formSchema: '{}', // Stringified JSON
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    if (opportunity) {
      // Pre-fill form for editing
      setFormData({
        name: opportunity.name || '',
        description: opportunity.description || '',
        type: opportunity.type || opportunityTypes[0],
        status: opportunity.status || opportunityStatuses[0],
        registrationFrom: opportunity.registrationFrom ? new Date(opportunity.registrationFrom).toISOString().slice(0, 16) : '',
        registrationTo: opportunity.registrationTo ? new Date(opportunity.registrationTo).toISOString().slice(0, 16) : '',
        resultAnnouncedAt: opportunity.resultAnnouncedAt ? new Date(opportunity.resultAnnouncedAt).toISOString().slice(0, 16) : '',
        maxRegistrations: opportunity.maxRegistrations !== null ? opportunity.maxRegistrations.toString() : '',
        budget: opportunity.budget !== null ? opportunity.budget.toString() : '',
        formSchema: JSON.stringify(opportunity.formSchema, null, 2) || '{}',
      });
    } else {
      // Reset form for creation
      setFormData({
        name: '',
        description: '',
        type: opportunityTypes[0],
        status: opportunityStatuses[0],
        registrationFrom: '',
        registrationTo: '',
        resultAnnouncedAt: '',
        maxRegistrations: '',
        budget: '',
        formSchema: '{}',
      });
    }
  }, [opportunity]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const isCreating = !opportunity;
    const method = isCreating ? 'POST' : 'PATCH';
    const url = isCreating ? `${API_URL}/opportunities` : `${API_URL}/opportunities/${opportunity.id}`;

    try {
      const payload = {
        ...formData,
        registrationFrom: formData.registrationFrom ? new Date(formData.registrationFrom).toISOString() : null,
        registrationTo: formData.registrationTo ? new Date(formData.registrationTo).toISOString() : null,
        resultAnnouncedAt: formData.resultAnnouncedAt ? new Date(formData.resultAnnouncedAt).toISOString() : null,
        maxRegistrations: formData.maxRegistrations ? parseInt(formData.maxRegistrations) : null,
        budget: formData.budget ? parseFloat(formData.budget) : null,
        formSchema: JSON.parse(formData.formSchema), // Parse JSON string back to object
      };

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Falha ao ${isCreating ? 'criar' : 'atualizar'} oportunidade.`);
      }

      onSave(); // Notify parent component of successful save
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
        {opportunity ? 'Editar Oportunidade' : 'Criar Nova Oportunidade'}
      </h2>

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nome</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required
               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"/>
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Descrição</label>
        <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows="3"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"></textarea>
      </div>
      <div>
        <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tipo</label>
        <select id="type" name="type" value={formData.type} onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          {opportunityTypes.map(type => <option key={type} value={type}>{type}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
        <select id="status" name="status" value={formData.status} onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          {opportunityStatuses.map(status => <option key={status} value={status}>{status}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="registrationFrom" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Início da Inscrição</label>
        <input type="datetime-local" id="registrationFrom" name="registrationFrom" value={formData.registrationFrom} onChange={handleChange} required
               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"/>
      </div>
      <div>
        <label htmlFor="registrationTo" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Fim da Inscrição</label>
        <input type="datetime-local" id="registrationTo" name="registrationTo" value={formData.registrationTo} onChange={handleChange} required
               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"/>
      </div>
      <div>
        <label htmlFor="resultAnnouncedAt" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Anúncio do Resultado</label>
        <input type="datetime-local" id="resultAnnouncedAt" name="resultAnnouncedAt" value={formData.resultAnnouncedAt} onChange={handleChange}
               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"/>
      </div>
      <div>
        <label htmlFor="maxRegistrations" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Máximo de Inscrições</label>
        <input type="number" id="maxRegistrations" name="maxRegistrations" value={formData.maxRegistrations} onChange={handleChange}
               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"/>
      </div>
      <div>
        <label htmlFor="budget" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Orçamento</label>
        <input type="number" step="0.01" id="budget" name="budget" value={formData.budget} onChange={handleChange}
               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"/>
      </div>
      <div>
        <label htmlFor="formSchema" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Schema do Formulário (JSON)</label>
        <textarea id="formSchema" name="formSchema" value={formData.formSchema} onChange={handleChange} rows="8"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white font-mono text-xs"></textarea>
      </div>

      {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

      <div className="flex justify-end space-x-2">
        <button type="button" onClick={onCancel} disabled={loading}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50">
          Cancelar
        </button>
        <button type="submit" disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50">
          {loading ? 'Salvando...' : 'Salvar'}
        </button>
      </div>
    </form>
  );
}

export default OpportunityForm;
