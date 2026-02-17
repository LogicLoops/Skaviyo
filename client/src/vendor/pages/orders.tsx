import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  Download,
  Eye,
  MoreVertical,
  X,
  Package,
  Clock,
  Zap,
  RotateCcw,
} from "lucide-react";
import Header from "../components/Header";

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerImage: string;
  date: string;
  status: "Pending" | "Processing" | "Completed" | "Cancelled";
  items: number;
  total: number;
}

const initialOrders: Order[] = [
  {
    id: "ORD-7882",
    customerName: "Sarah Jenkins",
    customerEmail: "sarah.jenkins@email.com",
    customerImage: "👩",
    date: "Oct 24, 2024",
    status: "Pending",
    items: 3,
    total: 342.50,
  },
  {
    id: "ORD-7881",
    customerName: "Marcus Johnson",
    customerEmail: "m.johnson@tech.co",
    customerImage: "👨",
    date: "Oct 24, 2024",
    status: "Processing",
    items: 1,
    total: 89.00,
  },
  {
    id: "ORD-7880",
    customerName: "Emily Chen",
    customerEmail: "emily.chen@email.com",
    customerImage: "👩",
    date: "Oct 23, 2024",
    status: "Completed",
    items: 4,
    total: 524.00,
  },
  {
    id: "ORD-7879",
    customerName: "Robert Fox",
    customerEmail: "rob.fox@corp.net",
    customerImage: "👨",
    date: "Oct 23, 2024",
    status: "Completed",
    items: 2,
    total: 126.00,
  },
  {
    id: "ORD-7878",
    customerName: "Ana Martinez",
    customerEmail: "ana.martinez@sp.io",
    customerImage: "👩",
    date: "Oct 22, 2024",
    status: "Cancelled",
    items: 1,
    total: 45.00,
  },
];

const Orders: React.FC = () => {
  const [mockOrders, setMockOrders] = useState(initialOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showOrderDetailsModal, setShowOrderDetailsModal] = useState(false);
  const [showStatusUpdateModal, setShowStatusUpdateModal] = useState(false);
  const [orderToUpdate, setOrderToUpdate] = useState<Order | null>(null);
  const itemsPerPage = 5;

  const totalOrders = mockOrders.length;
  const pendingOrders = mockOrders.filter((o) => o.status === "Pending").length;
  const processingOrders = mockOrders.filter(
    (o) => o.status === "Processing"
  ).length;
  const cancelledOrders = mockOrders.filter(
    (o) => o.status === "Cancelled"
  ).length;

  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "All" || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const totalFilteredOrders = filteredOrders.length;
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(totalFilteredOrders / itemsPerPage);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Processing":
        return "bg-blue-100 text-blue-700";
      case "Completed":
        return "bg-emerald-100 text-emerald-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Pending":
        return <Clock size={14} />;
      case "Processing":
        return <Zap size={14} />;
      case "Completed":
        return "•";
      case "Cancelled":
        return "✕";
      default:
        return "•";
    }
  };

  const handleExportCSV = () => {
    // Create CSV content
    const headers = ["Order ID", "Customer Name", "Email", "Date", "Status", "Items", "Total"];
    const rows = filteredOrders.map((order) => [
      order.id,
      order.customerName,
      order.customerEmail,
      order.date,
      order.status,
      order.items,
      `₹${order.total.toFixed(2)}`,
    ]);

    // Create CSV string
    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    // Create blob and download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `orders_${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
  };

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setShowOrderDetailsModal(true);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleManageOrders = () => {
    setIsManageModalOpen(true);
  };

  const handleViewAllOrders = () => {
    setIsManageModalOpen(false);
  };

  const handleGenerateReport = () => {
    alert("Generating report for vendor orders...");
    setIsManageModalOpen(false);
  };

  const handleMoreOptions = (order: Order) => {
    setOrderToUpdate(order);
    setShowStatusUpdateModal(true);
  };

  const handleUpdateStatus = (newStatus: "Pending" | "Processing" | "Completed" | "Cancelled") => {
    if (orderToUpdate) {
      setMockOrders(
        mockOrders.map((order) =>
          order.id === orderToUpdate.id
            ? { ...order, status: newStatus }
            : order
        )
      );
      setShowStatusUpdateModal(false);
      setOrderToUpdate(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 overflow-y-auto overflow-x-hidden hide-scrollbar">
      <style>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
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
      `}</style>

      <div className="p-8 relative z-10">
        {/* HEADER */}
        <Header
          pageTitle="Orders"
          pageSubtitle="Track and manage all incoming orders"
          vendorName="Vendor Manager"
          vendorRole="Vendor"
        />

        {/* KPI CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Orders */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="glass-effect rounded-2xl p-6 group cursor-pointer hover:shadow-lg transition-all"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-600 text-sm font-semibold uppercase tracking-wider">
                  Total Orders
                </p>
                <p className="text-4xl font-bold text-gray-900 mt-2">
                  {totalOrders}
                </p>
              </div>
              <div className="bg-amber-100 p-3 rounded-xl text-amber-600 group-hover:bg-amber-200 transition-all">
                <Package size={24} />
              </div>
            </div>
          </motion.div>

          {/* Pending */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="glass-effect rounded-2xl p-6 group cursor-pointer hover:shadow-lg transition-all"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-600 text-sm font-semibold uppercase tracking-wider">
                  Pending
                </p>
                <p className="text-4xl font-bold text-gray-900 mt-2">
                  {pendingOrders}
                </p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-xl text-yellow-600 group-hover:bg-yellow-200 transition-all">
                <Clock size={24} />
              </div>
            </div>
          </motion.div>

          {/* Processing */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="glass-effect rounded-2xl p-6 group cursor-pointer hover:shadow-lg transition-all"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 text-sm font-semibold uppercase tracking-wider">
                  Processing
                </p>
                <p className="text-4xl font-bold text-gray-900 mt-2">
                  {processingOrders}
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-xl text-blue-600 group-hover:bg-blue-200 transition-all">
                <Zap size={24} />
              </div>
            </div>
          </motion.div>

          {/* Returns */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="glass-effect rounded-2xl p-6 group cursor-pointer hover:shadow-lg transition-all"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-600 text-sm font-semibold uppercase tracking-wider">
                  Returns
                </p>
                <p className="text-4xl font-bold text-gray-900 mt-2">
                  {cancelledOrders}
                </p>
              </div>
              <div className="bg-red-100 p-3 rounded-xl text-red-600 group-hover:bg-red-200 transition-all">
                <RotateCcw size={24} />
              </div>
            </div>
          </motion.div>
        </div>

        {/* ORDERS TABLE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-effect rounded-2xl shadow-lg overflow-hidden"
        >
          {/* FILTER BAR */}
          <div className="p-6 border-b border-emerald-200">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1">
                <Search
                  size={18}
                  className="absolute left-3 top-3 text-gray-400 pointer-events-none"
                />
                <input
                  type="text"
                  placeholder="Filter orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white/60 border border-emerald-200 rounded-lg text-sm text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>

              <div className="flex gap-3 flex-wrap">
                {/* Status Filter */}
                <div className="relative">
                  <button
                    onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                    className="flex items-center gap-2 px-4 py-2.5 bg-white/60 border border-emerald-200 rounded-lg text-sm text-gray-700 hover:bg-white transition-all"
                  >
                    <Filter size={16} />
                    Status: {filterStatus}
                  </button>
                  <AnimatePresence>
                    {showStatusDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full right-0 mt-2 w-40 bg-white border border-emerald-200 rounded-lg shadow-lg z-20"
                      >
                        {["All", "Pending", "Processing", "Completed", "Cancelled"].map(
                          (status) => (
                            <button
                              key={status}
                              onClick={() => {
                                setFilterStatus(status);
                                setShowStatusDropdown(false);
                              }}
                              className="block w-full text-left px-4 py-2 text-sm hover:bg-emerald-50 transition-colors first:rounded-t-lg last:rounded-b-lg"
                            >
                              {status}
                            </button>
                          )
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Date Filter */}
                <div className="relative">
                  <button
                    onClick={() => setShowDateDropdown(!showDateDropdown)}
                    className="flex items-center gap-2 px-4 py-2.5 bg-white/60 border border-emerald-200 rounded-lg text-sm text-gray-700 hover:bg-white transition-all"
                  >
                    Date: Last 30 Days
                  </button>
                  <AnimatePresence>
                    {showDateDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full right-0 mt-2 w-40 bg-white border border-emerald-200 rounded-lg shadow-lg z-20"
                      >
                        {["Last 7 Days", "Last 30 Days", "Last 90 Days", "Custom"].map(
                          (period) => (
                            <button
                              key={period}
                              onClick={() => setShowDateDropdown(false)}
                              className="block w-full text-left px-4 py-2 text-sm hover:bg-emerald-50 transition-colors first:rounded-t-lg last:rounded-b-lg"
                            >
                              {period}
                            </button>
                          )
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Export CSV Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleExportCSV}
                  className="flex items-center gap-2 px-4 py-2.5 bg-white/60 border border-emerald-200 rounded-lg text-sm text-gray-700 hover:bg-white transition-all"
                >
                  <Download size={16} />
                  Export CSV
                </motion.button>

                {/* Manage Orders Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleManageOrders}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold text-sm transition duration-200"
                >
                  Manage Orders
                </motion.button>
              </div>
            </div>
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto hide-scrollbar">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-emerald-200">
                  <th className="px-6 py-4 text-left">
                    <input type="checkbox" className="w-4 h-4" />
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Items
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedOrders.map((order, idx) => (
                  <motion.tr
                    key={order.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="border-b border-gray-200 hover:bg-emerald-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <input type="checkbox" className="w-4 h-4" />
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-semibold text-gray-900">
                        {order.id}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center text-white text-sm">
                          {order.customerImage}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">
                            {order.customerName}
                          </p>
                          <p className="text-xs text-gray-500">{order.customerEmail}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-700">{order.date}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {getStatusIcon(order.status)} {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-700">{order.items} Items</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-semibold text-gray-900">
                        ₹{order.total.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleViewOrder(order)}
                          className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                          title="View order details"
                        >
                          <Eye size={16} className="text-gray-600" />
                        </button>
                        <button
                          onClick={() => handleMoreOptions(order)}
                          className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                          title="More actions"
                        >
                          <MoreVertical size={16} className="text-gray-600" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* PAGINATION */}
          <div className="px-6 py-4 border-t border-emerald-200 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing {totalFilteredOrders === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}-
              {Math.min(currentPage * itemsPerPage, totalFilteredOrders)} of {totalFilteredOrders}{" "}
              orders
            </p>
            <div className="flex gap-2">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="px-3 py-2 border border-emerald-200 rounded-lg text-sm hover:bg-emerald-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ←
              </button>
              <span className="px-3 py-2 text-sm text-gray-600 flex items-center">
                {currentPage} / {totalPages || 1}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages || totalPages === 0}
                className="px-3 py-2 border border-emerald-200 rounded-lg text-sm hover:bg-emerald-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                →
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* MANAGE ORDERS MODAL */}
      <AnimatePresence>
        {isManageModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setIsManageModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border border-emerald-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center text-white text-xl">
                    👔
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      Vendor Manager
                    </h3>
                    <p className="text-sm text-gray-600">Order Management</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsManageModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} className="text-gray-600" />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                  <p className="text-sm font-semibold text-gray-900 mb-2">
                    Total Orders Managed
                  </p>
                  <p className="text-3xl font-bold text-emerald-600">
                    {totalOrders}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <p className="text-xs text-gray-600 mb-1">Pending</p>
                    <p className="text-xl font-bold text-yellow-600">
                      {pendingOrders}
                    </p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-xs text-gray-600 mb-1">Processing</p>
                    <p className="text-xl font-bold text-blue-600">
                      {processingOrders}
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-sm font-semibold text-gray-900 mb-2">
                    Quick Actions
                  </p>
                  <div className="space-y-2">
                    <button
                      onClick={handleViewAllOrders}
                      className="w-full px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-semibold transition-colors"
                    >
                      View All Orders
                    </button>
                    <button
                      onClick={handleGenerateReport}
                      className="w-full px-4 py-2 bg-white border border-emerald-200 text-emerald-600 hover:bg-emerald-50 rounded-lg text-sm font-semibold transition-colors"
                    >
                      Generate Report
                    </button>
                  </div>
                </div>
              </div>

              <div className="text-xs text-gray-500 text-center">
                Last updated: Today at {new Date().toLocaleTimeString()}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ORDER DETAILS MODAL */}
      <AnimatePresence>
        {showOrderDetailsModal && selectedOrder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowOrderDetailsModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 border border-emerald-200"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {selectedOrder.id}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">{selectedOrder.date}</p>
                </div>
                <button
                  onClick={() => setShowOrderDetailsModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} className="text-gray-600" />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Customer Information</h4>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center text-white text-lg">
                      {selectedOrder.customerImage}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {selectedOrder.customerName}
                      </p>
                      <p className="text-xs text-gray-600">{selectedOrder.customerEmail}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                    <p className="text-xs text-gray-600 mb-1">Status</p>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold ${getStatusColor(
                        selectedOrder.status
                      )}`}
                    >
                      {getStatusIcon(selectedOrder.status)} {selectedOrder.status}
                    </span>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-xs text-gray-600 mb-1">Items</p>
                    <p className="font-semibold text-blue-600">{selectedOrder.items}</p>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg border border-emerald-200">
                  <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                  <p className="text-3xl font-bold text-emerald-600">
                    ₹{selectedOrder.total.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowOrderDetailsModal(false)}
                  className="flex-1 px-4 py-2 bg-white border border-emerald-200 text-emerald-600 hover:bg-emerald-50 rounded-lg font-semibold transition-colors"
                >
                  Close
                </button>
                <button className="flex-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold transition-colors">
                  Print Details
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* STATUS UPDATE MODAL */}
      <AnimatePresence>
        {showStatusUpdateModal && orderToUpdate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowStatusUpdateModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 border border-emerald-200"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Update Order Status</h3>
                  <p className="text-sm text-gray-600 mt-1">{orderToUpdate.id}</p>
                </div>
                <button
                  onClick={() => setShowStatusUpdateModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} className="text-gray-600" />
                </button>
              </div>

              <div className="space-y-3 mb-6">
                <p className="text-sm font-semibold text-gray-700 mb-4">Select New Status:</p>

                {["Pending", "Processing", "Completed", "Cancelled"].map((status) => {
                  const statusColors: Record<string, string> = {
                    Pending: "bg-yellow-50 border-yellow-200 hover:bg-yellow-100 text-yellow-700",
                    Processing: "bg-blue-50 border-blue-200 hover:bg-blue-100 text-blue-700",
                    Completed: "bg-emerald-50 border-emerald-200 hover:bg-emerald-100 text-emerald-700",
                    Cancelled: "bg-red-50 border-red-200 hover:bg-red-100 text-red-700",
                  };

                  const isCurrentStatus = orderToUpdate.status === status;

                  return (
                    <motion.button
                      key={status}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() =>
                        handleUpdateStatus(
                          status as "Pending" | "Processing" | "Completed" | "Cancelled"
                        )
                      }
                      className={`w-full px-4 py-3 border-2 rounded-lg font-semibold text-sm transition-all ${
                        statusColors[status]
                      } ${isCurrentStatus ? "ring-2 ring-offset-1" : ""}`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{status}</span>
                        {isCurrentStatus && (
                          <span className="text-lg font-bold">✓</span>
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 mb-6">
                <p className="text-xs text-gray-600">
                  <strong>Current Status:</strong> {orderToUpdate.status}
                </p>
              </div>

              <button
                onClick={() => setShowStatusUpdateModal(false)}
                className="w-full px-4 py-2 bg-white border border-emerald-200 text-emerald-600 hover:bg-emerald-50 rounded-lg font-semibold transition-colors"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Orders;
