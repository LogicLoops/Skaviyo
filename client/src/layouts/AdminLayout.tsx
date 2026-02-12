import { Outlet } from 'react-router-dom';
import Sidebar from '../admin/components/Sidebar';

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      {/* Fixed Sidebar - Never re-renders on route changes */}
      <Sidebar />
      
      {/* Dynamic Content Area */}
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
