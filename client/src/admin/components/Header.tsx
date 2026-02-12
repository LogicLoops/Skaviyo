import React from "react";
import { Search, Bell } from "lucide-react";

interface HeaderProps {
  title: string;
  adminName?: string;
  adminRole?: string;
  adminAvatar?: string;
}

const Header: React.FC<HeaderProps> = ({
  title,
  adminName = "Aditi Sharma",
  adminRole = "Super Admin",
  adminAvatar = "AS"
}) => {
  return (
    <div className="h-[70px] bg-[#DCEBE7] sticky top-0 z-40 flex items-center px-8 border-b border-[#CCE0DB]">
      <div className="flex-1 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        
        <div className="flex items-center gap-4">
          {/* Search Icon */}
          <button className="text-gray-700 hover:text-gray-900 transition">
            <Search size={20} />
          </button>

          {/* Notification Bell */}
          <button className="relative text-gray-700 hover:text-gray-900 transition">
            <Bell size={20} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Divider */}
          <div className="w-px h-6 bg-[#BDD5D1]"></div>

          {/* Profile Section */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-orange-500 rounded-full flex items-center justify-center text-white font-semibold text-xs flex-shrink-0">
              {adminAvatar}
            </div>
            <div className="flex flex-col min-w-0">
              <p className="text-sm font-semibold text-gray-800">{adminName}</p>
              <p className="text-xs text-orange-600 font-medium">{adminRole}</p>
            </div>
            <button className="text-gray-700 hover:text-gray-900 ml-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
