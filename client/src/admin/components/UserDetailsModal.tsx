import React, { useEffect, useState } from "react";
import { X, Loader, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { getCustomerDetails } from "../../api/services/usersService";

interface OrderItem {
  id: number;
  productName: string;
  quantity: number;
  price: string;
}

interface Order {
  id: number;
  orderNumber: string;
  totalAmount: string;
  orderStatus: string;
  paymentStatus: string;
  createdAt: string;
  items: OrderItem[];
}

interface CustomerDetailsData {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: string;
  totalOrders: number;
  totalSpent: string;
  createdAt: string;
  orders: Order[];
}

interface UserDetailsModalProps {
  customerId: number | null;
  isOpen: boolean;
  onClose: () => void;
}

const UserDetailsModal: React.FC<UserDetailsModalProps> = ({
  customerId,
  isOpen,
  onClose,
}) => {
  const [customerDetails, setCustomerDetails] = useState<CustomerDetailsData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);

  useEffect(() => {
    if (isOpen && customerId) {
      fetchCustomerDetails();
    }
  }, [customerId, isOpen]);

  const fetchCustomerDetails = async () => {
    if (!customerId) return;
    
    setIsLoading(true);
    try {
      const data = await getCustomerDetails(customerId);
      setCustomerDetails(data);
    } catch (error) {
      console.error("Error fetching customer details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getOrderStatusColor = (status: string) => {
    const statusLower = status.toLowerCase();
    switch (statusLower) {
      case "delivered":
        return "bg-green-100 text-green-700";
      case "shipped":
        return "bg-blue-100 text-blue-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getPaymentStatusColor = (status: string) => {
    const statusLower = status.toLowerCase();
    switch (statusLower) {
      case "paid":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "failed":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20">
      {/* Animated Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0"
      />

      {/* Modal */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative bg-gradient-to-br from-white via-white to-emerald-50 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-2xl border border-emerald-100"
      >
        {/* Header - Matching Dashboard */}
        <div className="sticky top-0 bg-gradient-to-r from-[#DCEBE7] to-[#E6F3EF] px-8 py-6 border-b border-[#D9E4E1] flex items-center justify-between shadow-sm">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Customer Details</h2>
            <p className="text-sm text-gray-600 mt-1">Complete customer information and order history</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="p-2 hover:bg-white rounded-full transition duration-200 border border-transparent hover:border-emerald-200"
          >
            <X size={28} className="text-gray-600 hover:text-emerald-600" />
          </motion.button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-8" style={{ maxHeight: "calc(90vh - 130px)" }}>
          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              >
                <Loader size={40} className="text-[#0F6D5B]" />
              </motion.div>
            </div>
          ) : customerDetails ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Customer Info Card */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="bg-gradient-to-br from-[#F4F7F6] to-white rounded-2xl p-8 border border-[#E6EFEC] hover:shadow-lg transition-all duration-300"
              >
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-xs text-[#6B7C78] uppercase font-bold tracking-wider">Name</p>
                    <p className="text-lg font-bold text-gray-900 mt-2">
                      {customerDetails.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#6B7C78] uppercase font-bold tracking-wider">Email</p>
                    <p className="text-lg font-bold text-gray-900 mt-2">
                      {customerDetails.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#6B7C78] uppercase font-bold tracking-wider">Phone</p>
                    <p className="text-lg font-bold text-gray-900 mt-2">
                      {customerDetails.phone || "Not provided"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#6B7C78] uppercase font-bold tracking-wider">Status</p>
                    <motion.span
                      whileHover={{ scale: 1.05 }}
                      className={`inline-block mt-2 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                        customerDetails.status === "ACTIVE"
                          ? "bg-emerald-100 text-emerald-700 shadow-sm"
                          : customerDetails.status === "BLOCKED"
                          ? "bg-red-100 text-red-700 shadow-sm"
                          : "bg-gray-100 text-gray-700 shadow-sm"
                      }`}
                    >
                      {customerDetails.status}
                    </motion.span>
                  </div>
                </div>
              </motion.div>

              {/* Stats */}
              <div>
                <p className="text-xs text-[#6B7C78] uppercase font-bold tracking-wider mb-4">Overview</p>
                <div className="grid grid-cols-3 gap-4">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    whileHover={{ y: -5 }}
                    className="bg-gradient-to-br from-emerald-50 via-white to-emerald-50 rounded-2xl p-6 border border-[#E6EFEC] hover:shadow-lg transition-all duration-300"
                  >
                    <p className="text-xs text-[#6B7C78] uppercase font-bold tracking-wider">
                      Total Orders
                    </p>
                    <p className="text-3xl font-bold text-[#0F6D5B] mt-3">
                      {customerDetails.totalOrders}
                    </p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    whileHover={{ y: -5 }}
                    className="bg-gradient-to-br from-emerald-50 via-white to-emerald-50 rounded-2xl p-6 border border-[#E6EFEC] hover:shadow-lg transition-all duration-300"
                  >
                    <p className="text-xs text-[#6B7C78] uppercase font-bold tracking-wider">
                      Total Spent
                    </p>
                    <p className="text-3xl font-bold text-[#0F6D5B] mt-3">
                      ₹{customerDetails.totalSpent}
                    </p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    whileHover={{ y: -5 }}
                    className="bg-gradient-to-br from-emerald-50 via-white to-emerald-50 rounded-2xl p-6 border border-[#E6EFEC] hover:shadow-lg transition-all duration-300"
                  >
                    <p className="text-xs text-[#6B7C78] uppercase font-bold tracking-wider">
                      Member Since
                    </p>
                    <p className="text-sm font-bold text-gray-900 mt-3">
                      {new Date(customerDetails.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric"
                      })}
                    </p>
                  </motion.div>
                </div>
              </div>

              {/* Orders Section */}
              <div>
                <p className="text-xs text-[#6B7C78] uppercase font-bold tracking-wider mb-4">Order History</p>
                {customerDetails.orders.length > 0 ? (
                  <div className="space-y-3">
                    {customerDetails.orders.map((order, idx) => (
                      <motion.div
                        key={order.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.25 + idx * 0.05 }}
                        className="bg-white border border-[#E6EFEC] rounded-xl overflow-hidden hover:shadow-lg transition-all duration-200"
                      >
                        {/* Order Header */}
                        <motion.button
                          whileHover={{ x: 4 }}
                          onClick={() => setExpandedOrderId(expandedOrderId === order.id ? null : order.id)}
                          className="w-full p-6 text-left hover:bg-gradient-to-r hover:from-emerald-50/50 hover:to-white transition-all duration-200"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <p className="font-bold text-gray-900 text-base">
                                {order.orderNumber}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                {new Date(order.createdAt).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric"
                                })}
                              </p>
                            </div>
                            <div className="flex items-center gap-4">
                              <p className="text-2xl font-bold text-[#0F6D5B]">
                                ₹{order.totalAmount}
                              </p>
                              <motion.div
                                animate={{ rotate: expandedOrderId === order.id ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                              >
                                <ChevronDown size={20} className="text-gray-400" />
                              </motion.div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 flex-wrap mt-4">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${getOrderStatusColor(
                                order.orderStatus
                              )}`}
                            >
                              {order.orderStatus}
                            </span>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${getPaymentStatusColor(
                                order.paymentStatus
                              )}`}
                            >
                              {order.paymentStatus}
                            </span>
                            <span className="text-xs text-gray-600 bg-gray-100 px-3 py-1 rounded-full font-medium">
                              {Array.isArray(order.items) ? order.items.length : order.items} items
                            </span>
                          </div>
                        </motion.button>

                        {/* Order Items */}
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{
                            height: expandedOrderId === order.id ? "auto" : 0,
                            opacity: expandedOrderId === order.id ? 1 : 0
                          }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden border-t border-[#E6EFEC]"
                        >
                          <div className="p-6 bg-gradient-to-b from-emerald-50/30 to-white space-y-3">
                            {Array.isArray(order.items) && order.items.length > 0 ? (
                              <>
                                <p className="text-xs text-[#6B7C78] uppercase font-bold tracking-wider mb-4">
                                  Items Purchased
                                </p>
                                {order.items.map((item, itemIdx) => (
                                  <motion.div
                                    key={`${order.id}-${item.id}-${itemIdx}`}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.05 * itemIdx }}
                                    className="flex items-center justify-between p-4 bg-white rounded-lg border border-[#E6EFEC] hover:border-emerald-300 transition-all"
                                  >
                                    <div className="flex-1">
                                      <p className="font-semibold text-gray-900">{item.productName}</p>
                                      <p className="text-xs text-gray-600 mt-1">Quantity: {item.quantity}</p>
                                    </div>
                                    <p className="text-sm font-bold text-[#0F6D5B] ml-4">
                                      ₹{item.price}
                                    </p>
                                  </motion.div>
                                ))}
                              </>
                            ) : (
                              <p className="text-sm text-gray-500 text-center py-4">No items found for this order</p>
                            )}
                          </div>
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12 bg-gradient-to-br from-gray-50 to-emerald-50 rounded-xl border border-[#E6EFEC]"
                  >
                    <p className="text-sm text-gray-500 font-medium">No orders yet</p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16 text-gray-500"
            >
              <p className="text-sm font-medium">Failed to load customer details</p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default UserDetailsModal;
