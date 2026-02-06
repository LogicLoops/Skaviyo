import React from "react";
import { motion } from "framer-motion";
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
  DollarSign,
  Search,
  Bell,
  Star,
} from "lucide-react";

const revenueData = [
  { day: "Mon", value: 4200 },
  { day: "Tue", value: 5200 },
  { day: "Wed", value: 4800 },
  { day: "Thu", value: 8200 },
  { day: "Fri", value: 5600 },
  { day: "Sat", value: 6100 },
  { day: "Sun", value: 5900 },
];

const kpis = [
  {
    title: "Total Users",
    value: "12,340",
    sub: "↑ +12% this month",
    icon: <Users size={22} />,
  },
  {
    title: "Active Vendors",
    value: "85",
    sub: "↑ +3 new pending",
    icon: <Store size={22} />,
  },
  {
    title: "Total Orders",
    value: "4,021",
    sub: "↑ +8.2% vs last week",
    icon: <ShoppingBag size={22} />,
  },
  {
    title: "Total Revenue",
    value: "$340.5k",
    sub: "↑ +15% year over year",
    icon: <DollarSign size={22} />,
  },
];

const pendingVendors = [
  { name: "Luxe Fabrics Co.", sub: "Textiles • Mumbai" },
  { name: "Urban Threadz", sub: "Streetwear • Delhi" },
  { name: "Silk & Stone", sub: "Jewelry • Jaipur" },
];

const cardStyle =
  "bg-gradient-to-br from-white to-[#F7FBF9] border border-gray-100 rounded-2xl shadow-[0_6px_18px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.12)] transition-all duration-300";

const Dashboard: React.FC = () => {
  return (
    <div className="p-8 bg-[#F2FAF5] min-h-screen">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold text-[#1F3F32]">Dashboard</h1>

        <div className="flex items-center gap-4">
          <motion.div whileHover={{ scale: 1.05 }} className="bg-white p-2 rounded-full shadow-sm">
            <Search size={18} className="text-gray-600" />
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} className="bg-white p-2 rounded-full shadow-sm">
            <Bell size={18} className="text-gray-600" />
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            className="flex items-center gap-3 bg-white px-4 py-2 rounded-full shadow-sm"
          >
            <div className="w-9 h-9 bg-gray-300 rounded-full"></div>
            <div>
              <p className="text-sm font-semibold">Aditi Sharma</p>
              <p className="text-xs text-gray-500">Super Admin</p>
            </div>
          </motion.div>
        </div>
      </div>

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

      {/* MIDDLE SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Revenue Overview */}
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

        {/* Pending Vendors */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className={`${cardStyle} p-6`}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-[#1F3F32]">
              Pending Vendors
            </h2>
            <span className="text-green-700 text-sm cursor-pointer">
              View All
            </span>
          </div>

          {pendingVendors.map((v, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.01 }}
              className="flex justify-between items-center py-3 border-b last:border-b-0"
            >
              <div>
                <p className="font-medium text-sm">{v.name}</p>
                <p className="text-xs text-gray-500">{v.sub}</p>
              </div>
              <button className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full">
                Review
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* LIMITED EDITION DROP */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`${cardStyle} p-6 mb-8`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-[#1F3F32]">
            Limited Edition Drop
          </h2>
          <span className="text-green-700 text-sm cursor-pointer">
            Manage Limited Edition
          </span>
        </div>

        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-semibold">Autumn Luxe Capsule</h3>
            <p className="text-sm text-gray-500">
              Drop window: Oct 28 – Oct 30 • 500 units
            </p>
            <p className="text-sm mt-2">
              Approved products: 32 • Pending review: 8 • Featured slots left: 4
            </p>
            <div className="flex gap-3 mt-3">
              <button className="bg-[#1F3F32] text-white px-4 py-2 rounded-lg hover:bg-[#143027] transition">
                Review Pending
              </button>
              <button className="border px-4 py-2 rounded-lg hover:bg-gray-50 transition">
                View Lineup
              </button>
            </div>
          </div>

          {/* Drop Health */}
          <div className="bg-[#F2FAF5] p-4 rounded-xl w-64 shadow-inner">
            <div className="flex items-center gap-2 mb-2">
              <Star size={18} className="text-[#C9A24D]" />
              <p className="font-medium">Drop Health</p>
            </div>

            <p className="text-sm mt-1">
              Inventory ready{" "}
              <span className="float-right font-semibold">92%</span>
            </p>
            <p className="text-sm mt-1">
              Vendor confirmations{" "}
              <span className="float-right font-semibold">18/20</span>
            </p>
            <p className="text-sm mt-1">
              Marketing assets{" "}
              <span className="float-right text-green-700 font-medium">
                On track
              </span>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
