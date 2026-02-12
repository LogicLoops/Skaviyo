import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
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
  IndianRupee,
  CheckCircle2,
  Truck,
  XCircle,
  Clock,
} from "lucide-react";
import {
  getTotalUsers,
  getTotalVendors,
  getOrdersStats,
  getPaymentStats,
  getAdminDetails,
  getTopSellingProducts,
  getOrderStatusBreakdown
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

const kpiCardStyle =
  "bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform-gpu perspective";

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
  const [topSellingProducts, setTopSellingProducts] = useState<TopProduct[] >([]);
  const [orderStats, setOrderStats] = useState({
    delivered: 0,
    shipped: 0,
    cancelled: 0,
    pending: 0,
  });



  useEffect(() => {
    const fetchDashboardData = async () => {
      let retries = 0;
      const maxRetries = 20; // Retry for up to 2.5 minutes (50 * 3 seconds)
      
      const attemptFetch = async () => {
        try {
          const [users, vendors, orders, payments, , topProducts, orderStatus] = await Promise.all([
            getTotalUsers(),
            getTotalVendors(),
            getOrdersStats(),
            getPaymentStats(),
            getAdminDetails(),
            getTopSellingProducts(),
            getOrderStatusBreakdown()
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

              setTopSellingProducts(
                Array.isArray(topProducts?.data) ? topProducts.data : []
              );

              setOrderStats(orderStatus);



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
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 relative overflow-y-auto">
      {/* Decorative background elements */}
      <div className="fixed top-0 right-0 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-15 -z-10 animate-blob"></div>
      <div className="fixed bottom-0 left-0 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-15 -z-10 animate-blob animation-delay-2000"></div>
      <div className="fixed top-1/2 left-1/2 w-96 h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 -z-10 animate-blob animation-delay-4000"></div>
      
      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotateX(0deg); }
          50% { transform: translateY(-10px) rotateX(5deg); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .card-3d {
          perspective: 1000px;
        }
        .card-3d:hover {
          transform: rotateY(3deg) rotateX(-2deg) scale(1.01) !important;
          filter: drop-shadow(0 20px 40px rgba(16, 185, 129, 0.2));
          background: rgba(255, 255, 255, 0.5);
          border-color: rgba(255, 255, 255, 0.9);
        }
        .glass-effect {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(240, 253, 250, 0.5) 100%);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(167, 243, 208, 0.4);
        }
        .glass-effect:hover {
          background: linear-gradient(135deg, rgba(255, 255, 255, 1) 0%, rgba(240, 253, 250, 0.8) 100%);
          border: 1px solid rgba(110, 231, 183, 0.6);
          box-shadow: 0 25px 50px rgba(16, 185, 129, 0.08);
        }
        /* Hide scrollbar while keeping scrolling functionality */
        ::-webkit-scrollbar {
          display: none;
        }
        html {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
      `}</style>
      
      <div className="p-8 relative z-10">
        {/* HEADER */}
        <Header
          pageTitle="Dashboard"
          pageSubtitle="Manage your business efficiently"
        />

      {/* RIGHT-SIDE CONTENT (RENDERS ONLY AFTER LOADING) */}
      <div className="relative">
        {/* KPI CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {kpis.map((kpi, idx) => (
            <motion.div
              key={idx}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: idx * 0.1, type: "spring", stiffness: 100 }}
              whileHover={{ y: -10, rotateX: -5, rotateY: 5, scale: 1.02 }}
              className={`${kpiCardStyle} glass-effect p-6 group cursor-pointer card-3d`}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-gray-600 text-xs font-semibold uppercase tracking-wider">
                    {kpi.title}
                  </h3>
                  <p className="text-4xl font-bold text-gray-900 mt-3">
                    {kpi.value}
                  </p>
                  <p className="text-xs text-emerald-600 font-medium mt-3">{kpi.sub}</p>
                </div>
                <div className="bg-emerald-50 p-4 rounded-xl text-emerald-600 group-hover:bg-emerald-100 transition-all duration-300 group-hover:scale-110 border border-emerald-200">
                  {kpi.icon}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* REVENUE + TOP PRODUCTS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ y: -10, rotateX: -3, rotateY: 2, scale: 1.01 }}
            className={`glass-effect col-span-1 lg:col-span-2 p-8 card-3d group rounded-2xl border border-white/60`}
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Revenue Overview
                </h2>
                <p className="text-sm text-gray-600 mt-1">Weekly revenue performance</p>
              </div>
              <select className="border border-emerald-200 rounded-lg px-4 py-2 text-sm bg-white hover:bg-emerald-50 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-400 text-gray-700">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                <option>Last 90 Days</option>
              </select>
            </div>

            <div className="h-64 -mx-2 group-hover:drop-shadow-lg transition-all">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                  <XAxis dataKey="day" stroke="#9CA3AF" style={{ fontSize: "12px" }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "rgba(255, 255, 255, 0.9)", backdropFilter: "blur(10px)", border: "1px solid rgba(255, 255, 255, 0.8)", borderRadius: "12px", boxShadow: "0 20px 40px rgba(16, 185, 129, 0.15)" }}
                    cursor={{ fill: "rgba(16, 185, 129, 0.1)" }}
                  />
                  <Bar
                    dataKey="value"
                    radius={[10, 10, 0, 0]}
                    fill="url(#colorGradient)"
                  />
                  <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10B981" />
                      <stop offset="100%" stopColor="#6EE7B7" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ y: -10, rotateX: -3, rotateY: -2, scale: 1.01 }}
            className={`glass-effect p-8 card-3d rounded-2xl border border-white/60`}
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Top Products
              </h2>
              <p className="text-sm text-gray-600 mt-1">Most sold items</p>
            </div>

            <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
              {topSellingProducts.length > 0 ? (
                topSellingProducts.map((product, idx) => (
                  <motion.div
                    key={product.id}
                    initial={{ x: 10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 + idx * 0.05 }}
                    whileHover={{ x: 8, scale: 1.02 }}
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-300/20 to-transparent rounded-lg hover:from-emerald-300/40 hover:shadow-md transition-all group cursor-pointer backdrop-blur-sm border border-white/40 hover:border-white/60"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 group-hover:text-emerald-700 transition-colors">{product.name}</p>
                      <p className="text-sm text-gray-600">{product.totalSold} units sold</p>
                    </div>
                    <div className="bg-gradient-to-r from-emerald-300/40 to-green-300/20 text-emerald-700 px-3 py-1 rounded-full text-sm font-semibold group-hover:shadow-md transition-all backdrop-blur-sm border border-emerald-200/40">
                      #{idx + 1}
                    </div>
                  </motion.div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-8">No products sold yet</p>
              )}
            </div>
          </motion.div>
        </div>

        {/* ORDER STATUS CARDS */}
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Order Status</h2>
            <p className="text-sm text-gray-500 mt-1">Real-time order tracking across all statuses</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Delivered Orders */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            whileHover={{ y: -12, rotateX: -4, rotateY: 4, scale: 1.02 }}
            className={`glass-effect p-8 border-l-4 border-l-emerald-400 group cursor-pointer card-3d rounded-2xl border border-white/60`}
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-gray-700 text-sm font-semibold uppercase tracking-wider">
                  Delivered Orders
                </h3>
                <p className="text-4xl font-bold text-emerald-600 mt-4">
                  {orderStats.delivered}
                </p>
                <p className="text-xs text-emerald-600 font-medium mt-3">✓ Successfully completed</p>
              </div>
              <div className="bg-emerald-300/30 backdrop-blur-md p-4 rounded-xl text-emerald-600 group-hover:bg-emerald-300/50 group-hover:scale-125 transition-all duration-300 border border-emerald-200/40">
                <CheckCircle2 size={28} strokeWidth={1.5} />
              </div>
            </div>
          </motion.div>

          {/* Shipped Orders */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            whileHover={{ y: -12, rotateX: -4, rotateY: 4, scale: 1.02 }}
            className={`glass-effect p-8 border-l-4 border-l-green-400 group cursor-pointer card-3d rounded-2xl border border-white/60`}
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-gray-700 text-sm font-semibold uppercase tracking-wider">
                  Shipped Orders
                </h3>
                <p className="text-4xl font-bold text-green-600 mt-4">
                  {orderStats.shipped}
                </p>
                <p className="text-xs text-green-600 font-medium mt-3">🚚 On the way</p>
              </div>
              <div className="bg-green-300/30 backdrop-blur-md p-4 rounded-xl text-green-600 group-hover:bg-green-300/50 group-hover:scale-125 transition-all duration-300 border border-green-200/40">
                <Truck size={28} strokeWidth={1.5} />
              </div>
            </div>
          </motion.div>

          {/* Cancelled Orders */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            whileHover={{ y: -12, rotateX: -4, rotateY: 4, scale: 1.02 }}
            className={`glass-effect p-8 border-l-4 border-l-teal-400 group cursor-pointer card-3d rounded-2xl border border-white/60`}
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-gray-700 text-sm font-semibold uppercase tracking-wider">
                  Cancelled Orders
                </h3>
                <p className="text-4xl font-bold text-teal-600 mt-4">
                  {orderStats.cancelled}
                </p>
                <p className="text-xs text-teal-600 font-medium mt-3">✕ Cancelled</p>
              </div>
              <div className="bg-teal-300/30 backdrop-blur-md p-4 rounded-xl text-teal-600 group-hover:bg-teal-300/50 group-hover:scale-125 transition-all duration-300 border border-teal-200/40">
                <XCircle size={28} strokeWidth={1.5} />
              </div>
            </div>
          </motion.div>

          {/* Pending Orders */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            whileHover={{ y: -12, rotateX: -4, rotateY: 4, scale: 1.02 }}
            className={`glass-effect p-8 border-l-4 border-l-lime-400 group cursor-pointer card-3d rounded-2xl border border-white/60`}
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-gray-700 text-sm font-semibold uppercase tracking-wider">
                  Pending Orders
                </h3>
                <p className="text-4xl font-bold text-lime-600 mt-4">
                  {orderStats.pending}
                </p>
                <p className="text-xs text-lime-600 font-medium mt-3">⏳ Awaiting confirmation</p>
              </div>
              <div className="bg-lime-300/30 backdrop-blur-md p-4 rounded-xl text-lime-600 group-hover:bg-lime-300/50 group-hover:scale-125 transition-all duration-300 border border-lime-200/40">
                <Clock size={28} strokeWidth={1.5} />
              </div>
            </div>
          </motion.div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Dashboard;
