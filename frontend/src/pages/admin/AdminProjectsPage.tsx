import { useEffect, useState } from 'react'; // Removed React import
import { useAuth } from '../../context/AuthContext';
import OpportunityForm from '../../components/admin/OpportunityForm'; // Reusing OpportunityForm

const API_URL = 'https://api.culturafacil.com.br/api/v1';

// Re-defining Opportunity interface for local clarity, same as in OpportunityForm.tsx
type OpportunityType = 'editais' | 'chamada_publica' | 'inscricao_continua';
type OpportunityStatus = 'draft' | 'published' | 'closed' | 'evaluation' | 'result' | 'archived';

interface Opportunity {
  id: string; // Assuming id is a string
  name: string;
  description: string;
  type: OpportunityType;
  status: OpportunityStatus;
  registrationFrom: string;
  registrationTo: string;
  resultAnnouncedAt: string;
  maxRegistrations: number;
  budget: number;
  formSchema: any; // Object
}

// Alias Opportunity as Project for semantic clarity in AdminProjectsPage
type Project = Opportunity;

function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]); // Typed as Project[]
  const [loading, setLoading] = useState<boolean>(true); // Explicit boolean type
  const [error, setError] = useState<string | null>(null); // Explicit string | null type
  const { token } = useAuth();
  const [showFormModal, setShowFormModal] = useState<boolean>(false); // Explicit boolean type
  const [selectedProject, setSelectedProject] = useState<Project | null>(null); // Project (opportunity) to edit, or null for new

  const fetchProjects = async () => {
    try {
      setLoading(true);
      // For now, let's assume projects are also fetched from opportunities endpoint
      // A more specific endpoint would be better if projects are a distinct entity
      const response = await fetch(`${API_URL}/opportunities`, { // Placeholder: might need a dedicated projects endpoint
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Falha ao buscar projetos.');
      }
      const data = await response.json();
      // Filter for projects if needed, or assume this endpoint returns only projects
      setProjects(data); 
    } catch (err: unknown) { // Use unknown for better type safety
      setError((err as Error).message); // Type assertion for error message
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchProjects();
    }
  }, [token]);

  const handleAddProject = () => {
    setSelectedProject(null);
    setShowFormModal(true);
  };

  const handleEditProject = (project: Project) => { // Explicitly typed project
    setSelectedProject(project);
    setShowFormModal(true);
  };

  const handleDeleteProject = async (projectId: string) => { // Explicitly typed projectId
    if (window.confirm('Tem certeza que deseja deletar este projeto?')) {
      try {
        const response = await fetch(`${API_URL}/opportunities/${projectId}`, { // Reusing opportunities endpoint for deletion
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Falha ao deletar projeto.');
        }
        fetchProjects(); // Refresh the list
      } catch (err: unknown) { // Use unknown for better type safety
        setError((err as Error).message); // Type assertion for error message
      }
    }
  };

  const handleFormSave = () => {
    setShowFormModal(false);
    fetchProjects(); // Refresh the list after save
  };

  const handleFormCancel = () => {
    setShowFormModal(false);
  };

  if (loading) return <div>Carregando projetos...</div>;
  if (error) return <div className="text-red-500">Erro: {error}</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Gerenciamento de Projetos</h1>
      <div className="flex justify-end mb-4">
        <button
          onClick={handleAddProject}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Adicionar Novo Projeto
        </button>
      </div>
      <div className="bg-white/50 dark:bg-gray-800/20 rounded-lg border border-gray-200 dark:border-gray-700/50 shadow-md overflow-hidden">
        <table className="min-w-full text-left">
          <thead className="border-b border-gray-200 dark:border-gray-700">
            <tr>
              <th className="p-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Nome</th>
              <th className="p-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Tipo</th>
              <th className="p-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Status</th>
              <th className="p-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Ações</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id} className="border-t border-gray-200 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/30">
                <td className="p-4 text-gray-800 dark:text-gray-200">{project.name}</td>
                <td className="p-4 text-gray-800 dark:text-gray-200">{project.type}</td>
                <td className="p-4 text-gray-800 dark:text-gray-200">{project.status}</td>
                <td className="p-4 flex space-x-2">
                  <button onClick={() => handleEditProject(project)} className="text-blue-600 hover:underline">Editar</button>
                  <button onClick={() => handleDeleteProject(project.id)} className="text-red-600 hover:underline">Deletar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showFormModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-h-[90vh] overflow-y-auto w-full max-w-3xl">
            <OpportunityForm opportunity={selectedProject} onSave={handleFormSave} onCancel={handleFormCancel} />
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminProjectsPage;
