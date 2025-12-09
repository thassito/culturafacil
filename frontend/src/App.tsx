import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ContentProvider } from './context/ContentContext';
import ProtectedRoute from './components/admin/ProtectedRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AdminLayout from './pages/AdminLayout'; // The new layout for admin
import Dashboard from './pages/admin/Dashboard'; // The new dashboard page
import AdminHomepageEditor from './pages/admin/AdminHomepageEditor'; // The new editor page
import AdminLoginPage from './pages/AdminLoginPage';
import EventsPage from './pages/EventsPage';
import SpacesPage from './pages/SpacesPage';
import AgentsPage from './pages/AgentsPage';
import ProjectsPage from './pages/ProjectsPage';
import OpportunitiesPage from './pages/OpportunitiesPage';
import AgentDashboardPage from './pages/AgentDashboardPage'; // Importa a nova página
import SignupPage from './pages/SignupPage';

import AdminAgentsPage from './pages/admin/AdminAgentsPage';
import AdminOpportunitiesPage from './pages/admin/AdminOpportunitiesPage';
import AdminEventsPage from './pages/admin/AdminEventsPage';
import AdminProjectsPage from './pages/admin/AdminProjectsPage'; // <--- NEW IMPORT
import AdminSettingsPage from './pages/admin/AdminSettingsPage';

function App() {
  return (
    <AuthProvider>
      <ContentProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/eventos" element={<EventsPage />} />
          <Route path="/espacos" element={<SpacesPage />} />
          <Route path="/agentes" element={<AgentsPage />} />
          <Route path="/projetos" element={<ProjectsPage />} />
          <Route path="/oportunidades" element={<OpportunitiesPage />} />

          {/* Agent Dashboard Route (Protected) */}
          <Route 
            path="/painel" 
            element={
              <ProtectedRoute>
                <AgentDashboardPage />
              </ProtectedRoute>
            } 
          />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route 
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="homepage" element={<AdminHomepageEditor />} />
            <Route path="agents" element={<AdminAgentsPage />} />
            <Route path="opportunities" element={<AdminOpportunitiesPage />} />
            <Route path="events" element={<AdminEventsPage />} />
            <Route path="projects" element={<AdminProjectsPage />} /> {/* <--- NEW ROUTE */}
            <Route path="settings" element={<AdminSettingsPage />} />
            {/* Add other admin sub-routes here in the future */}
          </Route>
        </Routes>
      </ContentProvider>
    </AuthProvider>
  );
}

export default App;
