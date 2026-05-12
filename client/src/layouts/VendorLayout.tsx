import { Outlet } from "react-router-dom";
import Sidebar from "../vendor/components/Sidebar";

const VendorLayout = () => {
  return (
    <div className="flex h-screen bg-[#EAF4F1]">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
};

export default VendorLayout;
