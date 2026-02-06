import { Outlet } from 'react-router-dom';
import Sidebar from '../admin/components/Sidebar';

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Fixed Sidebar - Never re-renders on route changes */}
      <Sidebar />
      
      {/* Dynamic Content Area */}
      <div className="flex-1 ml-64 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
