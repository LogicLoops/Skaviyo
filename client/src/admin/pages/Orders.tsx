import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  ArrowUpDown,
  Eye,
  Edit2,
  X,
  CheckCircle,
} from "lucide-react";
import Header from "../components/Header";
import LottieLoader from "../components/Loder";
import axiosClient from "../../api/axiosClient";

interface Order {
  id: number;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerId: number;
  totalAmount: number;
  totalItems: number;
  orderStatus: string;
  paymentStatus: string;
  createdOn: string;
  icon: string;
}

interface FormData {
  orderStatus: string;
  paymentStatus: string;
}

const Orders: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [filterStatus, setFilterStatus] = useState("All Status");
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    orderStatus: "PENDING",
    paymentStatus: "PENDING",
  });
  const itemsPerPage = 6;

  // Fetch orders when search/sort/filter/page changes
  useEffect(() => {
    fetchOrders();
  }, [searchTerm, sortOrder, filterStatus, currentPage]);

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const params = {
        search: searchTerm,
        sortOrder,
        orderStatus: filterStatus !== "All Status" ? filterStatus : undefined,
        page: currentPage,
        limit: itemsPerPage,
      };

      const response = await axiosClient.get("/admin/orders", { params });

      if (response.data.success) {
        setOrders(response.data.data.orders);
        setTotalItems(response.data.data.pagination.total);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;

  const generatePageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");

      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        if (!pages.includes(i)) pages.push(i);
      }

      if (currentPage < totalPages - 2) pages.push("...");
      if (!pages.includes(totalPages)) pages.push(totalPages);
    }

    return pages;
  };

  const handleFormChange = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUpdateOrder = async () => {
    if (!selectedOrder) return;

    try {
      const payload = {
        order_status: formData.orderStatus,
        payment_status: formData.paymentStatus,
      };

      const response = await axiosClient.put(
        `/admin/orders/${selectedOrder.id}`,
        payload
      );

      if (response.data.success) {
        alert("Order updated successfully!");
        setIsModalOpen(false);
        setSelectedOrder(null);
        fetchOrders();
      }
    } catch (error) {
      console.error("Error updating order:", error);
      alert("Failed to update order");
    }
  };

  const handleEditOrder = (order: Order) => {
    setSelectedOrder(order);
    setFormData({
      orderStatus: order.orderStatus,
      paymentStatus: order.paymentStatus,
    });
    setIsModalOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-700";
      case "CONFIRMED":
        return "bg-blue-100 text-blue-700";
      case "SHIPPED":
        return "bg-purple-100 text-purple-700";
      case "DELIVERED":
        return "bg-emerald-100 text-emerald-700";
      case "CANCELLED":
        return "bg-red-100 text-red-700";
      case "PAID":
        return "bg-emerald-100 text-emerald-700";
      case "FAILED":
        return "bg-red-100 text-red-700";
      case "REFUNDED":
        return "bg-orange-100 text-orange-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (isLoading && orders.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 flex items-center justify-center">
        <LottieLoader message="Loading orders..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 relative overflow-y-auto hide-scrollbar">
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
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
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
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <div className="p-8 relative z-10">
        {/* HEADER */}
        <Header
          pageTitle="Order Management"
          pageSubtitle="Track, manage, and update order statuses and payment information."
        />

        {/* MAIN CARD - Glass Effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="glass-effect rounded-2xl overflow-hidden shadow-lg hide-scrollbar"
        >
          {/* Search, Filter, Sort Bar */}
          <div className="p-8 border-b border-white/20">
            <div className="flex items-center justify-between gap-6">
              <div className="flex-1">
                <div className="relative max-w-sm">
                  <Search
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600"
                    size={18}
                  />
                  <input
                    type="text"
                    placeholder="Search by order number or customer..."
                    className="w-full pl-12 pr-4 py-3 h-11 bg-white/80 backdrop-blur-sm border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm text-gray-700 transition hover:bg-white"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                {/* Filter Button with Dropdown */}
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 border border-emerald-300 rounded-lg text-emerald-700 transition bg-white/60 font-semibold text-sm hover:bg-white hover:shadow-md backdrop-blur-sm"
                  >
                    <Filter size={16} />
                    <span>Filter: {filterStatus}</span>
                  </motion.button>

                  {showStatusDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute top-full right-0 mt-2 bg-white border border-emerald-200 rounded-lg shadow-lg p-2 z-50 min-w-max"
                    >
                      {[
                        "All Status",
                        "PENDING",
                        "CONFIRMED",
                        "SHIPPED",
                        "DELIVERED",
                        "CANCELLED",
                      ].map((status) => (
                        <motion.button
                          key={status}
                          whileHover={{ scale: 1.05 }}
                          onClick={() => {
                            setFilterStatus(status);
                            setShowStatusDropdown(false);
                            setCurrentPage(1);
                          }}
                          className={`block w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition ${
                            filterStatus === status
                              ? "bg-emerald-600 text-white"
                              : "text-gray-700 hover:bg-emerald-100"
                          }`}
                        >
                          {status}
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </div>

                {/* Sort Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() =>
                    setSortOrder(sortOrder === "newest" ? "oldest" : "newest")
                  }
                  className="inline-flex items-center gap-2 px-4 py-2.5 border border-emerald-300 rounded-lg text-emerald-700 transition bg-white/60 font-semibold text-sm hover:bg-white hover:shadow-md backdrop-blur-sm"
                >
                  <ArrowUpDown size={16} />
                  <span>Sort: {sortOrder === "newest" ? "Newest" : "Oldest"}</span>
                </motion.button>
              </div>
            </div>
          </div>

          {/* Orders Table */}
          <div className="w-full overflow-hidden">
            <table className="w-full table-fixed">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50 via-gray-50 to-gray-100 border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-1/5">
                    ORDER
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-1/5">
                    CUSTOMER
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-1/5">
                    AMOUNT
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-1/5">
                    STATUS
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-1/5">
                    ACTIONS
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders.map((order, idx) => (
                  <motion.tr
                    key={order.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="hover:bg-gradient-to-r hover:from-emerald-50/50 hover:to-white transition-all duration-200"
                    whileHover={{ scale: 1.001 }}
                  >
                    <td className="px-6 py-4 flex items-center gap-3">
                      <span className="text-2xl">{order.icon}</span>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {order.orderNumber}
                        </p>
                        <p className="text-xs text-gray-600">{order.createdOn}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">
                          {order.customerName}
                        </p>
                        <p className="text-xs text-gray-600">
                          {order.customerEmail}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-900">
                        ₹{order.totalAmount.toFixed(2)}
                      </p>
                      <p className="text-xs text-gray-600">
                        {order.totalItems} items
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-2">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1 ${getStatusColor(
                            order.orderStatus
                          )}`}
                        >
                          <span className="w-2 h-2 rounded-full bg-current" />
                          {order.orderStatus}
                        </span>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1 block ${getStatusColor(
                            order.paymentStatus
                          )}`}
                        >
                          <span className="w-2 h-2 rounded-full bg-current" />
                          {order.paymentStatus}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 flex items-center gap-3">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-emerald-600 hover:text-emerald-700 transition"
                      >
                        <Eye size={18} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleEditOrder(order)}
                        className="text-blue-600 hover:text-blue-700 transition"
                      >
                        <Edit2 size={18} />
                      </motion.button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-8 py-6 border-t border-white/20 flex items-center justify-between">
            <p className="text-sm text-gray-600 font-medium">
              Showing {startIndex + 1}–
              {Math.min(startIndex + itemsPerPage, totalItems)} of {totalItems}{" "}
              orders
            </p>
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 border border-emerald-300 rounded-lg text-emerald-700 text-sm font-semibold hover:bg-white transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ← Prev
              </motion.button>

              {generatePageNumbers().map((page) =>
                page === "..." ? (
                  <span key={`dot-${page}`} className="px-2 text-gray-600">
                    ...
                  </span>
                ) : (
                  <motion.button
                    key={page}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentPage(page as number)}
                    className={`px-3 py-2 rounded-lg text-sm font-semibold transition ${
                      currentPage === page
                        ? "bg-emerald-600 text-white border border-emerald-600"
                        : "border border-emerald-300 text-emerald-700 hover:bg-white"
                    }`}
                  >
                    {page}
                  </motion.button>
                )
              )}

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-2 border border-emerald-300 rounded-lg text-emerald-700 text-sm font-semibold hover:bg-white transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next →
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Modal */}
        <AnimatePresence>
          {isModalOpen && selectedOrder && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                onClick={(e) => e.stopPropagation()}
                className="glass-effect rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto border border-white/20"
              >
                {/* Modal Header */}
                <div className="sticky top-0 glass-effect border-b border-white/20 px-8 py-6 flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Update Order Status
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                      Order ID: {selectedOrder.orderNumber}
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsModalOpen(false)}
                    className="text-gray-400 hover:text-gray-600 transition"
                  >
                    <X size={24} />
                  </motion.button>
                </div>

                {/* Modal Content */}
                <div className="p-8 space-y-6">
                  {/* Order Details */}
                  <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-xs text-gray-600 font-medium">Customer</p>
                      <p className="text-sm font-semibold text-gray-900">
                        {selectedOrder.customerName}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 font-medium">Total Amount</p>
                      <p className="text-sm font-semibold text-gray-900">
                        ₹{selectedOrder.totalAmount.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 font-medium">Items</p>
                      <p className="text-sm font-semibold text-gray-900">
                        {selectedOrder.totalItems}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 font-medium">Date</p>
                      <p className="text-sm font-semibold text-gray-900">
                        {selectedOrder.createdOn}
                      </p>
                    </div>
                  </div>

                  {/* Order Status */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Order Status
                    </label>
                    <select
                      value={formData.orderStatus}
                      onChange={(e) =>
                        handleFormChange("orderStatus", e.target.value)
                      }
                      className="w-full px-4 py-3 bg-white/50 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm text-gray-800"
                    >
                      <option value="PENDING">Pending</option>
                      <option value="CONFIRMED">Confirmed</option>
                      <option value="SHIPPED">Shipped</option>
                      <option value="DELIVERED">Delivered</option>
                      <option value="CANCELLED">Cancelled</option>
                    </select>
                  </div>

                  {/* Payment Status */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Payment Status
                    </label>
                    <select
                      value={formData.paymentStatus}
                      onChange={(e) =>
                        handleFormChange("paymentStatus", e.target.value)
                      }
                      className="w-full px-4 py-3 bg-white/50 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm text-gray-800"
                    >
                      <option value="PENDING">Pending</option>
                      <option value="PAID">Paid</option>
                      <option value="FAILED">Failed</option>
                      <option value="REFUNDED">Refunded</option>
                    </select>
                  </div>

                  {/* Info Box */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-xs text-blue-700 font-medium">
                      💡 Update both order and payment status to keep customer
                      information accurate.
                    </p>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="sticky bottom-0 glass-effect border-t border-white/20 px-8 py-4 flex items-center justify-end gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-2 border border-red-300 text-red-600 rounded-lg font-semibold text-sm hover:bg-red-50 transition"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleUpdateOrder}
                    className="px-6 py-2 bg-emerald-600 text-white rounded-lg font-semibold text-sm hover:bg-emerald-700 transition flex items-center gap-2"
                  >
                    <CheckCircle size={16} />
                    Update Order
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Orders;
