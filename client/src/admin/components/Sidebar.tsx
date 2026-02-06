import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  SquaresFour,
  Users,
  Storefront,
  TShirt,
  Stack,
  ShoppingBag,
  Star,
  ChartBar,
  Gear,
  SignOut
} from "phosphor-react";

interface MenuItem {
  name: string;
  path: string;
  icon: React.ReactNode;
}

const menuItems: MenuItem[] = [
  { name: "Dashboard", path: "/admin", icon: <SquaresFour size={20} weight="duotone" /> },
  { name: "Users", path: "/admin/users", icon: <Users size={20} weight="duotone" /> },
  { name: "Vendors", path: "/admin/vendors", icon: <Storefront size={20} weight="duotone" /> },
  { name: "Products", path: "/admin/products", icon: <TShirt size={20} weight="duotone" /> },
  { name: "Categories", path: "/admin/categories", icon: <Stack size={20} weight="duotone" /> },
  { name: "Orders", path: "/admin/orders", icon: <ShoppingBag size={20} weight="duotone" /> },
  { name: "Limited Edition", path: "/admin/limited-edition", icon: <Star size={20} weight="duotone" /> },
  { name: "Reports", path: "/admin/reports", icon: <ChartBar size={20} weight="duotone" /> },
];

const Sidebar: React.FC = () => {
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/";
  };

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-white shadow-xl shadow-green-200 flex flex-col justify-between overflow-hidden">
      {/* Logo Section */}
      <div>
        <Link to="/admin" className="flex items-center gap-3 px-6 py-5 hover:no-underline">
          <div className="bg-green-800 text-white font-bold text-lg flex items-center justify-center h-9 w-9 rounded-md">
            S
          </div>
          <h1 className="text-xl font-semibold text-green-900">Skaviyo</h1>
        </Link>

        {/* Menu Items */}
        <nav className="px-4 mt-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 mb-1 rounded-lg transition-colors no-underline
                  ${
                    isActive
                      ? "bg-green-800 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
              >
                {item.icon}
                <span className="text-sm font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="px-4 pb-6">
        <div className="border-t border-gray-200 mb-4"></div>

        <Link
          to="/admin/settings"
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors no-underline mb-1
            ${location.pathname === "/admin/settings"
              ? "bg-green-800 text-white"
              : "text-gray-600 hover:bg-gray-100"
            }`}
        >
          <Gear size={20} />
          <span className="text-sm font-medium">Settings</span>
        </Link>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors border-none bg-transparent"
        >
          <SignOut size={20} />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
