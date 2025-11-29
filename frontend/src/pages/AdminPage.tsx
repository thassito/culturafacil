import React from 'react';
import Sidebar from '../components/admin/Sidebar';

function AdminPage() {
  return (
    <div className="flex bg-gray-800 text-white">
      <Sidebar />
      <main className="flex-1 p-10">
        <h1 className="text-4xl font-bold">Dashboard</h1>
        <p className="text-gray-400 mt-2">
          Bem-vindo à área de administração. Aqui você poderá configurar todos os campos do seu SaaS.
        </p>
        {/* O conteúdo principal de cada seção do admin será renderizado aqui no futuro */}
      </main>
    </div>
  );
}

export default AdminPage;
