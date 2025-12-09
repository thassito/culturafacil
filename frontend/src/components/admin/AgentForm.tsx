import { useState, useEffect } from 'react'; // Removed React import
import { useAuth } from '../../context/AuthContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';

interface AgentFormData {
  name: string;
  email: string;
  cpf: string;
  type: 'individual' | 'collective' | 'organization';
  bio: string;
  phone: string;
  website: string;
  avatarUrl: string;
  password?: string; // Optional for creation or password reset
}

interface Agent {
  id: string; // Assuming id is a string for existing agents
  name: string;
  user: { email: string };
  cpf: string;
  type: 'individual' | 'collective' | 'organization';
  bio: string;
  phone: string;
  website: string;
  avatarUrl: string;
  isVerified?: boolean;
}

interface AgentFormProps {
  agent?: Agent | null; // Allow null for optional agent
  onSave: () => void;
  onCancel: () => void;
}

function AgentForm({ agent, onSave, onCancel }: AgentFormProps) { // Added type to props
  const [formData, setFormData] = useState<AgentFormData>({ // Added type to useState
    name: '',
    email: '',
    cpf: '',
    type: 'individual',
    bio: '',
    phone: '',
    website: '',
    avatarUrl: '',
    password: '',
  });
  const [loading, setLoading] = useState<boolean>(false); // Explicit boolean type
  const [error, setError] = useState<string | null>(null); // Explicit string | null type
  const { token } = useAuth();

  useEffect(() => {
    if (agent) {
      // Pre-fill form for editing
      setFormData({
        name: agent.name || '',
        email: agent.user.email || '',
        cpf: agent.cpf || '',
        type: agent.type || 'individual',
        bio: agent.bio || '',
        phone: agent.phone || '',
        website: agent.website || '',
        avatarUrl: agent.avatarUrl || '',
        password: '', // Never pre-fill password
      });
    } else {
      // Reset form for creation
      setFormData({
        name: '',
        email: '',
        cpf: '',
        type: 'individual',
        bio: '',
        phone: '',
        website: '',
        avatarUrl: '',
        password: '',
      });
    }
  }, [agent]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const isCreating = !agent;
    const method = isCreating ? 'POST' : 'PATCH';
    const url = isCreating ? `${API_URL}/agents` : `${API_URL}/agents/${agent?.id}`; // Use optional chaining for agent.id

    try {
      // Initialize payload with common properties
      let payload: Partial<AgentFormData> = {
        name: formData.name,
        cpf: formData.cpf,
        type: formData.type,
        bio: formData.bio,
        phone: formData.phone,
        website: formData.website,
        avatarUrl: formData.avatarUrl,
      };

      if (isCreating) {
        // For creation, email and password are required
        payload = {
          ...payload,
          email: formData.email,
          password: formData.password,
        };
      } else {
        // For update, only include password if it's explicitly set
        if (formData.password) {
          payload.password = formData.password;
        }
        // Only include email if it's being updated and agent is defined
        if (agent && formData.email !== agent.user.email) {
          payload.email = formData.email;
        }
      }

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
        throw new Error(errorData.message || `Falha ao ${isCreating ? 'criar' : 'atualizar'} agente.`);
      }

      onSave(); // Notify parent component of successful save
    } catch (err: unknown) { // Use unknown for better type safety
      setError((err as Error).message); // Type assertion for error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
        {agent ? 'Editar Agente' : 'Criar Novo Agente'}
      </h2>

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nome</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required
               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"/>
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required={!agent} disabled={!!agent}
               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white disabled:bg-gray-200 dark:disabled:bg-gray-700"/>
      </div>
      <div>
        <label htmlFor="cpf" className="block text-sm font-medium text-gray-700 dark:text-gray-300">CPF</label>
        <input type="text" id="cpf" name="cpf" value={formData.cpf} onChange={handleChange} required
               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"/>
      </div>
      <div>
        <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tipo</label>
        <select id="type" name="type" value={formData.type} onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          <option value="individual">Individual</option>
          <option value="collective">Coletivo</option>
          <option value="organization">Organização</option>
        </select>
      </div>
      <div>
        <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Bio</label>
        <textarea id="bio" name="bio" value={formData.bio} onChange={handleChange} rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"></textarea>
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Telefone</label>
        <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange}
               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"/>
      </div>
      <div>
        <label htmlFor="website" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Website</label>
        <input type="text" id="website" name="website" value={formData.website} onChange={handleChange}
               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"/>
      </div>
      <div>
        <label htmlFor="avatarUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300">URL do Avatar</label>
        <input type="text" id="avatarUrl" name="avatarUrl" value={formData.avatarUrl} onChange={handleChange}
               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"/>
      </div>
      {(!agent || formData.password) && ( // Show password field only for creation or if user types in it for update
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Senha {agent ? '(deixe em branco para manter a atual)' : ''}</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required={!agent}
                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"/>
        </div>
      )}

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

export default AgentForm;
