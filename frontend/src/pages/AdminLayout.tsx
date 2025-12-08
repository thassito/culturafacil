
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/admin/Sidebar';

function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white font-sans">
      <Sidebar />
      <main className="flex-1 p-6 md:p-10">
        <Outlet /> {/* Nested admin pages will render here */}
      </main>
    </div>
  );
}

export default AdminLayout;
