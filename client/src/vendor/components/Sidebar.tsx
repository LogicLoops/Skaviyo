import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  SquaresFour,
  TShirt,
  ShoppingBag,
  Stack,
  ChartBar,
  Gear,
  SignOut,
} from "phosphor-react";

interface MenuItem {
  name: string;
  path: string;
  icon: React.ReactNode;
}

const menuItems: MenuItem[] = [
  { name: "Dashboard", path: "/vendor-dashboard", icon: <SquaresFour size={20} weight="duotone" /> },
  { name: "Products", path: "/vendor-dashboard/products", icon: <TShirt size={20} weight="duotone" /> },
  { name: "Orders", path: "/vendor-dashboard/orders", icon: <ShoppingBag size={20} weight="duotone" /> },
  { name: "Categories", path: "/vendor-dashboard/categories", icon: <Stack size={20} weight="duotone" /> },
  { name: "Reports", path: "/vendor-dashboard/reports", icon: <ChartBar size={20} weight="duotone" /> },
];

const Sidebar: React.FC = () => {
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/";
  };

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-emerald-50 via-green-50 to-teal-50 flex flex-col justify-between overflow-hidden relative border-r border-emerald-400 shadow-lg">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>

      <style>{`
        .glass-item {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(16, 185, 129, 0.08) 100%);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 2px solid rgba(16, 185, 129, 0.3);
        }
        .glass-item:hover {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(16, 185, 129, 0.12) 100%);
          border: 2px solid rgba(16, 185, 129, 0.5);
          box-shadow: 0 8px 20px rgba(16, 185, 129, 0.15);
        }
        .glass-item.active {
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.95), rgba(34, 197, 94, 0.95));
          border: 2px solid rgba(255, 255, 255, 0.9);
          color: white;
          box-shadow: 0 12px 30px rgba(16, 185, 129, 0.3);
        }
      `}</style>

      <div className="relative z-10">
        <Link to="/vendor-dashboard" className="flex items-center gap-3 px-6 py-6 hover:no-underline group">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="bg-gradient-to-br from-emerald-500 to-green-600 text-white font-bold text-lg flex items-center justify-center h-12 w-12 rounded-xl shadow-lg group-hover:shadow-emerald-400/50"
          >
            S
          </motion.div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-900 to-green-800 bg-clip-text text-transparent">Skaviyo</h1>
            <p className="text-xs text-emerald-600 font-medium">Vendor Panel</p>
          </div>
        </Link>

        <nav className="px-4 mt-4">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`glass-item flex items-center gap-3 px-4 py-3.5 mb-2 rounded-xl transition-all duration-300 no-underline group ${
                  isActive ? "active shadow-lg shadow-emerald-300/50" : "hover:shadow-md"
                }`}
              >
                <div className={isActive ? "text-white" : "text-emerald-600 group-hover:text-emerald-700"}>
                  {item.icon}
                </div>
                <span className={`text-sm font-semibold ${isActive ? "text-white" : "text-gray-700 group-hover:text-emerald-700"}`}>
                  {item.name}
                </span>
                {isActive && <div className="ml-auto w-2 h-2 bg-white rounded-full" />}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="px-4 pb-6 relative z-10">
        <div className="border-t border-emerald-200/30 mb-4"></div>

        <Link
          to="/vendor-dashboard/settings"
          className={`glass-item flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 no-underline mb-2 group ${
            location.pathname === "/vendor-dashboard/settings" ? "active shadow-lg shadow-emerald-300/50" : "hover:shadow-md"
          }`}
        >
          <div className={location.pathname === "/vendor-dashboard/settings" ? "text-white" : "text-emerald-600 group-hover:text-emerald-700"}>
            <Gear size={20} weight="duotone" />
          </div>
          <span className={`text-sm font-semibold ${location.pathname === "/vendor-dashboard/settings" ? "text-white" : "text-gray-700 group-hover:text-emerald-700"}`}>
            Settings
          </span>
        </Link>

        <button
          onClick={handleLogout}
          className="w-full glass-item flex items-center gap-3 px-4 py-3.5 text-red-500 hover:text-red-600 rounded-xl cursor-pointer transition-all duration-300 border-none font-semibold text-sm group"
        >
          <SignOut size={20} weight="duotone" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
