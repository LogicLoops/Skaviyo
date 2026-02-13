import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Package, ShoppingBag, Clock, Ellipsis, Wallet } from "lucide-react";
import { BarChart, Bar, XAxis, ResponsiveContainer } from "recharts";

interface TopProduct {
  id: number;
  vendorUserId: number;
  name: string;
  sales: number;
  revenue: string;
  image: string;
}

const revenueData = [
  { month: "Jan", value: 12000 },
  { month: "Feb", value: 16000 },
  { month: "Mar", value: 13500 },
  { month: "Apr", value: 20500 },
  { month: "May", value: 17500 },
  { month: "Jun", value: 25000 },
  { month: "Jul", value: 22000 },
];

const allTopProducts: TopProduct[] = [
  { id: 1, vendorUserId: 2, name: "Minimalist Watch", sales: 1204, revenue: "$45k", image: "⌚" },
  { id: 2, vendorUserId: 2, name: "Pro Audio Set", sales: 843, revenue: "$28k", image: "🎧" },
  { id: 3, vendorUserId: 2, name: "Sport Runners", sales: 621, revenue: "$15k", image: "👟" },
  { id: 4, vendorUserId: 2, name: "Ergo Chair 2", sales: 410, revenue: "$12k", image: "💺" },
  { id: 5, vendorUserId: 7, name: "Denim Jeans", sales: 900, revenue: "$21k", image: "👖" },
  { id: 6, vendorUserId: 7, name: "Cotton Tee", sales: 780, revenue: "$13k", image: "👕" },
];

const recentOrders = [
  { id: "#ORD-2481", product: "Classic Sunglasses", date: "Oct 24, 2023", status: "Completed", amount: "$129.00", icon: "🕶️" },
  { id: "#ORD-2480", product: "Instax Mini 11", date: "Oct 24, 2023", status: "Processing", amount: "$89.00", icon: "📷" },
  { id: "#ORD-2479", product: "Leather Wallet", date: "Oct 23, 2023", status: "Pending", amount: "$45.00", icon: "👛" },
  { id: "#ORD-2478", product: "Macbook Stand", date: "Oct 23, 2023", status: "Completed", amount: "$59.99", icon: "💻" },
];

const metrics = [
  { title: "Total Products", value: "124", sub: "↗ +12 added this month", Icon: Package },
  { title: "Total Orders", value: "856", sub: "↗ +8.2 % vs last month", Icon: ShoppingBag },
  { title: "Monthly Revenue", value: "$12,450", sub: "↗ +15.3% growth", Icon: Wallet },
  { title: "Pending Orders", value: "18", sub: "Needs attention", Icon: Clock },
];

const getUserIdFromToken = (): number | null => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;
    const payload = JSON.parse(atob(token.split(".")[1]));
    const userId = Number(payload.id);
    return Number.isNaN(userId) ? null : userId;
  } catch {
    return null;
  }
};

const VendorDashboard: React.FC = () => {
  const loggedInVendorUserId = getUserIdFromToken();

  const vendorTopProducts = useMemo(() => {
    const filtered = allTopProducts.filter((product) => product.vendorUserId === loggedInVendorUserId);
    return filtered.length > 0 ? filtered : allTopProducts.filter((product) => product.vendorUserId === 2);
  }, [loggedInVendorUserId]);

  return (
    <div className="min-h-screen bg-[#e8f3ee] p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-[34px] font-bold text-[#0f4d41] leading-none">Dashboard Overview</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
          {metrics.map((metric, idx) => (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-[#f4f6f5] border border-[#e0ebe5] rounded-2xl p-5"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[12px] text-[#7c9288]">{metric.title}</p>
                  <p className="text-[38px] leading-none font-bold text-[#0f6a53] mt-3">{metric.value}</p>
                  <p className="text-[11px] text-[#0f6a53] mt-3">{metric.sub}</p>
                </div>
                <div className="w-7 h-7 rounded-full bg-[#efe9d8] flex items-center justify-center text-[#bc9c4c]">
                  <metric.Icon size={14} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-6">
          <div className="xl:col-span-2 bg-[#f4f6f5] border border-[#dbe9e2] rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[22px] font-bold text-[#0f4d41]">Revenue Analytics</h2>
              <button className="text-[12px] text-[#2b8d73] font-semibold">View Report</button>
            </div>
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData} margin={{ top: 10, right: 8, left: 0, bottom: 8 }}>
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#97a89f", fontSize: 12 }} />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]} fill="#c9ab5f" />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]} fill="#0f6a53" data={[{}, {}, {}, {}, {}, { value: 25000 }, {}]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-[#f4f6f5] border border-[#dbe9e2] rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[22px] font-bold text-[#0f4d41]">Top Products</h2>
              <Ellipsis size={16} className="text-[#799084]" />
            </div>
            <div className="space-y-3">
              {vendorTopProducts.map((product) => (
                <div key={product.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-lg bg-[#e7ece9] flex items-center justify-center text-sm">{product.image}</div>
                    <div className="min-w-0">
                      <p className="text-[14px] font-semibold text-[#0f4d41] truncate">{product.name}</p>
                      <p className="text-[11px] text-[#8ca196]">{product.sales.toLocaleString()} sales</p>
                    </div>
                  </div>
                  <p className="text-[16px] font-bold text-[#0f6a53]">{product.revenue}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-[#f4f6f5] border border-[#dbe9e2] rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[22px] font-bold text-[#0f4d41]">Recent Orders</h2>
            <button className="text-[12px] text-[#2b8d73] font-semibold">View All Orders</button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-[12px] text-[#8da196] border-b border-[#e0ebe5]">
                  <th className="py-3 font-semibold">Order ID</th>
                  <th className="py-3 font-semibold">Product</th>
                  <th className="py-3 font-semibold">Date</th>
                  <th className="py-3 font-semibold">Status</th>
                  <th className="py-3 font-semibold">Amount</th>
                  <th className="py-3 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-[#edf3ef] last:border-b-0">
                    <td className="py-4 text-[13px] text-[#2b8d73] font-semibold">{order.id}</td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-md bg-[#e7ece9] flex items-center justify-center text-xs">{order.icon}</div>
                        <span className="text-[13px] text-[#0f4d41]">{order.product}</span>
                      </div>
                    </td>
                    <td className="py-4 text-[13px] text-[#587369]">{order.date}</td>
                    <td className="py-4">
                      <span className={`px-3 py-1 rounded-full text-[11px] font-semibold ${
                        order.status === "Completed"
                          ? "bg-[#e5f3ed] text-[#157a5f]"
                          : order.status === "Processing"
                          ? "bg-[#e8efff] text-[#3d6dd9]"
                          : "bg-[#fff4df] text-[#c48a28]"
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 text-[13px] text-[#0f6a53] font-semibold">{order.amount}</td>
                    <td className="py-4">
                      <button className="text-[13px] text-[#2b8d73] font-semibold">Details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;
