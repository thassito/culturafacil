import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/admin/ProtectedRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import AdminLoginPage from './pages/AdminLoginPage';
import EventsPage from './pages/EventsPage';
import SpacesPage from './pages/SpacesPage';
import AgentsPage from './pages/AgentsPage';
import ProjectsPage from './pages/ProjectsPage';
import OpportunitiesPage from './pages/OpportunitiesPage';
import SignupPage from './pages/SignupPage'; // Import the new Signup page

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} /> {/* New route for Signup */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          }
        />
        <Route path="/eventos" element={<EventsPage />} />
        <Route path="/espacos" element={<SpacesPage />} />
        <Route path="/agentes" element={<AgentsPage />} />
        <Route path="/projetos" element={<ProjectsPage />} />
        <Route path="/oportunidades" element={<OpportunitiesPage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
