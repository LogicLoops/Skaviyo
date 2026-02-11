import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import LottieLoader from "../components/Loder";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
} from "recharts";
import {
  Users,
  Store,
  ShoppingBag,
  Search,
  Bell,
  IndianRupee,
} from "lucide-react";
import {
  getTotalUsers,
  getTotalVendors,
  getOrdersStats,
  getPaymentStats,
  getAdminDetails,
  getTopSellingProducts
} from "../../api/services/dashboardService";

const revenueData = [
  { day: "Mon", value: 4200 },
  { day: "Tue", value: 5200 },
  { day: "Wed", value: 4800 },
  { day: "Thu", value: 8200 },
  { day: "Fri", value: 5600 },
  { day: "Sat", value: 6100 },
  { day: "Sun", value: 5900 },
];

const cardStyle =
  "bg-gradient-to-br from-white to-[#F7FBF9] border border-gray-100 rounded-2xl shadow-[0_6px_18px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.12)] transition-all duration-300";

interface KPI {
  title: string;
  value: string;
  sub: string;
  icon: React.ReactNode;
}

interface TopProduct {
  id: number;
  name: string;
  totalSold: number;
}


const Dashboard: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [kpis, setKpis] = useState<KPI[]>([]);
  const [userName, setUserName] = useState<string>("Admin");
  const [topSellingProducts, setTopSellingProducts] = useState<TopProduct[] >([]);



  useEffect(() => {
    const fetchDashboardData = async () => {
      let retries = 0;
      const maxRetries = 20; // Retry for up to 2.5 minutes (50 * 3 seconds)
      
      const attemptFetch = async () => {
        try {
          const [users, vendors, orders, payments, adminDetails, topProducts] = await Promise.all([
            getTotalUsers(),
            getTotalVendors(),
            getOrdersStats(),
            getPaymentStats(),
            getAdminDetails(),
            getTopSellingProducts()
          ]);

          const formattedRevenue = payments.totalRevenue
            ? `₹${(payments.totalRevenue / 1000).toFixed(1)}k`
            : "₹0.00";

          setKpis([
            {
              title: "Total Users",
              value: users.toString(),
              sub: "↑ +12% this month",
              icon: <Users size={22} />,
            },
            {
              title: "Active Vendors",
              value: vendors.toString(),
              sub: "↑ +3 new pending",
              icon: <Store size={22} />,
            },
            {
              title: "Total Orders",
              value: orders.totalOrders.toString(),
              sub: "↑ +8.2% vs last week",
              icon: <ShoppingBag size={22} />,
            },
            {
              title: "Total Revenue",
              value: formattedRevenue,
              sub: "↑ +15% year over year",
              icon: <IndianRupee size={22} />,
            },
          ]);

              setUserName(
                adminDetails?.name ? adminDetails.name : "Admin"
              );

              setTopSellingProducts(
                Array.isArray(topProducts?.data) ? topProducts.data : []
              );



          // Only set loading to false AFTER data is successfully fetched
          setIsLoading(false);
        } catch (error) {
          console.error(`Failed to fetch dashboard data (Attempt ${retries + 1}):`, error);
          
          // Retry if max retries not reached
          if (retries < maxRetries) {
            retries++;
            console.log(`Retrying in 3 seconds... (${retries}/${maxRetries})`);
            setTimeout(attemptFetch, 3000); // Retry after 3 seconds
          } else {
            // After max retries, show error
            setIsLoading(false);
            alert("Failed to connect to backend. Please ensure the backend server is running on port 4000.");
          }
        }
      };

      attemptFetch();
    };

    fetchDashboardData();
  }, []);

  // ✅ IMPORTANT FIX: EARLY RETURN (OUTSIDE JSX)
  if (isLoading) {
    return (
      <div className="p-8 bg-[#F2FAF5] min-h-screen flex flex-col items-center justify-center">
        <LottieLoader size={180} message="Fetching your data..." />
      </div>
    );
  }

  // ✅ MAIN DASHBOARD (renders ONLY after loading = false)
  return (
    <div className="p-8 bg-[#F2FAF5] min-h-screen relative">
      {/* HEADER (ALWAYS VISIBLE) */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold text-[#1F3F32]">Dashboard</h1>

        <div className="flex items-center gap-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white p-2 rounded-full shadow-sm"
          >
            <Search size={18} className="text-gray-600" />
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white p-2 rounded-full shadow-sm"
          >
            <Bell size={18} className="text-gray-600" />
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            className="flex items-center gap-3 bg-white px-4 py-2 rounded-full shadow-sm"
          >
            <div className="w-9 h-9 bg-gray-300 rounded-full"></div>
            <div>
              <p className="text-sm font-semibold">{userName}</p>
              <p className="text-xs text-gray-500">Super Admin</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* RIGHT-SIDE CONTENT (RENDERS ONLY AFTER LOADING) */}
      <div className="relative">
        {/* KPI CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {kpis.map((kpi, idx) => (
            <motion.div
              key={idx}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: idx * 0.08 }}
              whileHover={{ y: -5 }}
              className={`${cardStyle} p-6`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-gray-500 text-sm font-medium">
                    {kpi.title}
                  </h3>
                  <p className="text-3xl font-bold text-[#1F3F32] mt-2">
                    {kpi.value}
                  </p>
                  <p className="text-xs text-green-700 mt-1">{kpi.sub}</p>
                </div>
                <div className="bg-[#F2FAF5] p-3 rounded-xl text-[#1F3F32]">
                  {kpi.icon}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* REVENUE + PENDING VENDORS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`${cardStyle} col-span-2 p-6`}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-[#1F3F32]">
                Revenue Overview
              </h2>
              <select className="border rounded-lg px-3 py-1 text-sm bg-white">
                <option>Last 7 Days</option>
              </select>
            </div>

            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <XAxis dataKey="day" />
                  <Tooltip />
                  <Bar
                    dataKey="value"
                    radius={[8, 8, 0, 0]}
                    fill="#C9A24D"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className={`${cardStyle} p-6`}
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold text-red-500">
                Top Selling Products
              </h2>
            </div>

            {topSellingProducts.map((v) => (
              <motion.div
                key={v.id}
                whileHover={{ scale: 1.01 }}
                className="flex justify-between items-center py-3 border-t border-gray-200"
              >
                <div className="flex items-center gap-3">
                  <p className="font-medium text-sm">{v.name}</p>
                  <p className="text-xs text-gray-500">{v.totalSold} sold</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
