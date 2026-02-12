import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, Bell } from "lucide-react";
import Lottie from "lottie-react";
import profile from "../../assets/lottie/profile.json";
import { getAdminDetails } from "../../api/services/dashboardService";

interface HeaderProps {
  pageTitle: string;
  pageSubtitle?: string;
  adminName?: string;
  adminRole?: string;
}

const Header: React.FC<HeaderProps> = ({
  pageTitle,
  pageSubtitle = "Manage and monitor your data",
  adminName: propAdminName,
  adminRole = "Super Admin"
}) => {
  const [adminName, setAdminName] = useState<string>(propAdminName || "Admin");

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const adminData = await getAdminDetails();
        if (adminData && adminData.name) {
          setAdminName(adminData.name);
        }
      } catch (error) {
        console.error("Error fetching admin details:", error);
      }
    };

    fetchAdminData();
  }, [propAdminName]);
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex justify-between items-center mb-8"
    >
      <div>
        <h1 className="text-4xl font-bold text-gray-900">{pageTitle}</h1>
        <p className="text-gray-600 mt-1">{pageSubtitle}</p>
      </div>

      <div className="flex items-center gap-4">
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="bg-white p-3 rounded-full shadow-md hover:shadow-lg transition-all border border-emerald-200"
        >
          <Search size={20} className="text-emerald-600" />
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.1 }}
          className="bg-white p-3 rounded-full shadow-md hover:shadow-lg transition-all border border-emerald-200 relative"
        >
          <Bell size={20} className="text-emerald-600" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-600 rounded-full"></span>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.03 }}
          className="flex items-center gap-3 bg-white px-5 py-3 rounded-full shadow-md hover:shadow-lg transition-all ml-2 border border-emerald-200"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center overflow-hidden">
            <Lottie animationData={profile} loop={true} />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">{adminName}</p>
            <p className="text-xs text-gray-600">{adminRole}</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Header;
