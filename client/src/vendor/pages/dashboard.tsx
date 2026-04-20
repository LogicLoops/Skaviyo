import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Package,
  ShoppingBag,
  IndianRupee,
  Clock,
  CheckCircle2,
  Truck,
  XCircle,
  Loader,
  AlertCircle,
} from "lucide-react";
import Header from "../components/Header";
import vendorAPI from "../../api/services/vendorAPI";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
} from "recharts";

interface TopProduct {
  id: number;
  name: string;
  totalSold: number;
}

interface KPI {
  title: string;
  value: string;
  sub: string;
  icon: React.ReactNode;
}

const kpiCardStyle =
  "bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300";

const VendorDashboard: React.FC = () => {
  const [kpis, setKpis] = useState<KPI[]>([
    {
      title: "Total Products",
      value: "0",
      sub: "↑ +12% this month",
      icon: <Package size={22} />,
    },
    {
      title: "Total Orders",
      value: "0",
      sub: "↑ +8.2% vs last week",
      icon: <ShoppingBag size={22} />,
    },
    {
      title: "Revenue",
      value: "₹0",
      sub: "↑ +15% year over year",
      icon: <IndianRupee size={22} />,
    },
    {
      title: "Pending Orders",
      value: "0",
      sub: "Needs attention",
      icon: <Clock size={22} />,
    },
  ]);
  const [topProducts] = useState<TopProduct[]>([]);
  const [orderStats, setOrderStats] = useState({
    completed: 0,
    shipped: 0,
    cancelled: 0,
    pending: 0,
  });
  const [revenueChartData, setRevenueChartData] = useState(
    Array(7).fill({ day: "", value: 0 })
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch dashboard stats
        const statsResponse = await vendorAPI.getVendorDashboardStats();
        if (statsResponse.success && statsResponse.data) {
          const stats = statsResponse.data;
          setKpis([
            {
              title: "Total Products",
              value: stats.totalProducts?.toString() || "0",
              sub: "↑ +12% this month",
              icon: <Package size={22} />,
            },
            {
              title: "Total Orders",
              value: stats.totalOrders?.toString() || "0",
              sub: "↑ +8.2% vs last week",
              icon: <ShoppingBag size={22} />,
            },
            {
              title: "Revenue",
              value: `₹${(stats.totalRevenue || 0).toLocaleString("en-IN", {
                maximumFractionDigits: 0,
              })}`,
              sub: "↑ +15% year over year",
              icon: <IndianRupee size={22} />,
            },
            {
              title: "Pending Orders",
              value: stats.pendingOrders?.toString() || "0",
              sub: "Needs attention",
              icon: <Clock size={22} />,
            },
          ]);

          // Set order status distribution
          setOrderStats({
            pending: stats.pendingOrders || 0,
            shipped: stats.shippedOrders || 0,
            completed: stats.deliveredOrders || 0,
            cancelled: stats.cancelledOrders || 0,
          });
        }

        // Fetch revenue chart data
        const revenueResponse = await vendorAPI.getRevenueChartData();
        if (revenueResponse.success && revenueResponse.data) {
          setRevenueChartData(revenueResponse.data);
        }

        // Fetch analytics for additional insights
        const analyticsResponse = await vendorAPI.getVendorAnalytics();
        if (analyticsResponse.success && analyticsResponse.data) {
          // You can use this for top products if available
          // For now, we'll use existing data structure
        }
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 relative overflow-y-auto scrollbar-hide">
      <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <div className="p-8">
        <Header
          pageTitle="Dashboard"
          pageSubtitle="Manage your business efficiently"
          vendorName="Vendor Manager"
          vendorRole="Vendor"
        />

        {/* LOADING STATE */}
        {loading && (
          <div className="flex items-center justify-center min-h-96">
            <div className="text-center">
              <Loader className="w-12 h-12 text-emerald-600 animate-spin mx-auto mb-4" />
              <p className="text-gray-600 font-semibold">Loading dashboard data...</p>
            </div>
          </div>
        )}

        {/* ERROR STATE */}
        {error && !loading && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3">
            <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {/* CONTENT */}
        {!loading && (
        <>
        {/* KPI CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {kpis.map((kpi, idx) => (
            <motion.div
              key={idx}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: idx * 0.1, type: "spring", stiffness: 100 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className={`${kpiCardStyle} p-6 group cursor-pointer`}
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
            whileHover={{ y: -5, scale: 1.01 }}
            className={`${kpiCardStyle} col-span-1 lg:col-span-2 p-8`}
          >
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Revenue Overview
                </h2>
                <p className="text-sm text-gray-600 mt-1">Weekly revenue performance</p>
              </div>
              <select className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold text-sm transition duration-200 focus:outline-none cursor-pointer">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                <option>Last 90 Days</option>
              </select>
            </div>

            <div className="h-64 -mx-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={revenueChartData.length > 0 ? revenueChartData : []}
                  margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                >
                  <XAxis
                    dataKey={revenueChartData.length > 0 && revenueChartData[0]?.day ? "day" : "month"}
                    stroke="#9CA3AF"
                    style={{ fontSize: "12px" }}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "rgba(255, 255, 255, 0.95)", border: "1px solid #e5e7eb", borderRadius: "8px" }}
                    cursor={{ fill: "rgba(16, 185, 129, 0.1)" }}
                  />
                  <Bar
                    dataKey="value"
                    radius={[10, 10, 0, 0]}
                    fill="#10B981"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ y: -5, scale: 1.01 }}
            className={`${kpiCardStyle} p-8`}
          >
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Top Products
              </h2>
              <p className="text-sm text-gray-600 mt-1">Most sold items</p>
            </div>

            <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
              {topProducts.length > 0 ? (
                topProducts.map((product, idx) => (
                  <motion.div
                    key={product.id}
                    initial={{ x: 10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 + idx * 0.05 }}
                    whileHover={{ x: 8, scale: 1.02 }}
                    className="flex items-center justify-between p-4 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-all group cursor-pointer border border-emerald-200"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 group-hover:text-emerald-700 transition-colors">{product.name}</p>
                      <p className="text-sm text-gray-600">{product.totalSold} units sold</p>
                    </div>
                    <div className="bg-emerald-200 text-emerald-700 px-3 py-1 rounded-full text-sm font-semibold group-hover:shadow-md transition-all border border-emerald-300">
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
            {/* Completed Orders */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className={`${kpiCardStyle} p-8 border-l-4 border-l-emerald-400 group cursor-pointer`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-gray-700 text-sm font-semibold uppercase tracking-wider">
                    Completed Orders
                  </h3>
                  <p className="text-4xl font-bold text-emerald-600 mt-4">
                    {orderStats.completed}
                  </p>
                  <p className="text-xs text-emerald-600 font-medium mt-3">✓ Successfully completed</p>
                </div>
                <div className="bg-emerald-100 p-4 rounded-xl text-emerald-600 group-hover:bg-emerald-200 group-hover:scale-125 transition-all duration-300 border border-emerald-200">
                  <CheckCircle2 size={28} strokeWidth={1.5} />
                </div>
              </div>
            </motion.div>

            {/* Shipped Orders */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className={`${kpiCardStyle} p-8 border-l-4 border-l-green-400 group cursor-pointer`}
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
                <div className="bg-green-100 p-4 rounded-xl text-green-600 group-hover:bg-green-200 group-hover:scale-125 transition-all duration-300 border border-green-200">
                  <Truck size={28} strokeWidth={1.5} />
                </div>
              </div>
            </motion.div>

            {/* Cancelled Orders */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className={`${kpiCardStyle} p-8 border-l-4 border-l-red-400 group cursor-pointer`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-gray-700 text-sm font-semibold uppercase tracking-wider">
                    Cancelled Orders
                  </h3>
                  <p className="text-4xl font-bold text-red-600 mt-4">
                    {orderStats.cancelled}
                  </p>
                  <p className="text-xs text-red-600 font-medium mt-3">✕ Cancelled</p>
                </div>
                <div className="bg-red-100 p-4 rounded-xl text-red-600 group-hover:bg-red-200 group-hover:scale-125 transition-all duration-300 border border-red-200">
                  <XCircle size={28} strokeWidth={1.5} />
                </div>
              </div>
            </motion.div>

            {/* Pending Orders */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className={`${kpiCardStyle} p-8 border-l-4 border-l-yellow-400 group cursor-pointer`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-gray-700 text-sm font-semibold uppercase tracking-wider">
                    Pending Orders
                  </h3>
                  <p className="text-4xl font-bold text-yellow-600 mt-4">
                    {orderStats.pending}
                  </p>
                  <p className="text-xs text-yellow-600 font-medium mt-3">⏳ Awaiting confirmation</p>
                </div>
                <div className="bg-yellow-100 p-4 rounded-xl text-yellow-600 group-hover:bg-yellow-200 group-hover:scale-125 transition-all duration-300 border border-yellow-200">
                  <Clock size={28} strokeWidth={1.5} />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        </>
        )}
      </div>
    </div>
  );
};

export default VendorDashboard;
