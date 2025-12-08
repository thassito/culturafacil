import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth(); // Usar isAuthenticated

  if (!isAuthenticated) { // Verificar se o usuário está autenticado
    // Se não estiver autenticado, redireciona para a página de login do admin
    return <Navigate to="/admin/login" replace />;
  }

  // Se estiver autenticado, renderiza o componente
  return children;
};

export default ProtectedRoute;
