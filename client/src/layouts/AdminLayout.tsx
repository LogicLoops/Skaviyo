import { Outlet } from 'react-router-dom';
import Sidebar from '../admin/components/Sidebar';

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-[#EAF4F1]">
      {/* Fixed Sidebar */}
      <Sidebar />
      
      {/* Dynamic Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
