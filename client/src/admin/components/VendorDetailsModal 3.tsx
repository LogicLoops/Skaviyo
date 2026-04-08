import React, { useEffect, useState } from "react";
import { X, Loader } from "lucide-react";
import { motion } from "framer-motion";
import { getVendorDetails } from "../../api/services/vendorService";

interface VendorDetailsData {
  id: number;
  userId: number;
  storeName: string;
  vendorName: string;
  email: string;
  phone: string;
  gstNumber: string | null;
  bankAccount: string | null;
  status: string;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: string;
  createdAt: string;
}

interface VendorDetailsModalProps {
  vendorId: number | null;
  isOpen: boolean;
  onClose: () => void;
}

const VendorDetailsModal: React.FC<VendorDetailsModalProps> = ({
  vendorId,
  isOpen,
  onClose,
}) => {
  const [vendorDetails, setVendorDetails] = useState<VendorDetailsData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && vendorId) {
      fetchVendorDetails();
    }
  }, [vendorId, isOpen]);

  const fetchVendorDetails = async () => {
    if (!vendorId) return;

    setIsLoading(true);
    try {
      const data = await getVendorDetails(vendorId);
      setVendorDetails(data);
    } catch (error) {
      console.error("Error fetching vendor details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    const statusLower = status.toLowerCase();
    switch (statusLower) {
      case "active":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "suspended":
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
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-[#DCEBE7] to-[#E6F3EF] px-8 py-6 border-b border-[#D9E4E1] flex items-center justify-between shadow-sm">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Vendor Details</h2>
            <p className="text-sm text-gray-600 mt-1">Complete vendor information and performance metrics</p>
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
          ) : vendorDetails ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Vendor Info Card */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="bg-gradient-to-br from-[#F4F7F6] to-white rounded-2xl p-8 border border-[#E6EFEC] hover:shadow-lg transition-all duration-300"
              >
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-xs text-[#6B7C78] uppercase font-bold tracking-wider">Store Name</p>
                    <p className="text-lg font-bold text-gray-900 mt-2">
                      {vendorDetails.storeName}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#6B7C78] uppercase font-bold tracking-wider">Owner Name</p>
                    <p className="text-lg font-bold text-gray-900 mt-2">
                      {vendorDetails.vendorName}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#6B7C78] uppercase font-bold tracking-wider">Email</p>
                    <p className="text-lg font-bold text-gray-900 mt-2">
                      {vendorDetails.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#6B7C78] uppercase font-bold tracking-wider">Phone</p>
                    <p className="text-lg font-bold text-gray-900 mt-2">
                      {vendorDetails.phone || "Not provided"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#6B7C78] uppercase font-bold tracking-wider">GST Number</p>
                    <p className="text-lg font-bold text-gray-900 mt-2">
                      {vendorDetails.gstNumber || "Not provided"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#6B7C78] uppercase font-bold tracking-wider">Status</p>
                    <motion.span
                      whileHover={{ scale: 1.05 }}
                      className={`inline-block mt-2 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${getStatusColor(
                        vendorDetails.status
                      )}`}
                    >
                      {vendorDetails.status}
                    </motion.span>
                  </div>
                </div>
              </motion.div>

              {/* Bank Details */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.07 }}
                className="bg-gradient-to-br from-[#F4F7F6] to-white rounded-2xl p-8 border border-[#E6EFEC] hover:shadow-lg transition-all duration-300"
              >
                <p className="text-xs text-[#6B7C78] uppercase font-bold tracking-wider mb-4">Bank Account</p>
                <p className="text-lg font-bold text-gray-900">
                  {vendorDetails.bankAccount ? vendorDetails.bankAccount.replace(/(\d{4})\d+(?=\d{4})/, "$1****") : "Not provided"}
                </p>
              </motion.div>

              {/* Stats */}
              <div>
                <p className="text-xs text-[#6B7C78] uppercase font-bold tracking-wider mb-4">Performance Overview</p>
                <div className="grid grid-cols-3 gap-4">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    whileHover={{ y: -5 }}
                    className="bg-gradient-to-br from-emerald-50 via-white to-emerald-50 rounded-2xl p-6 border border-[#E6EFEC] hover:shadow-lg transition-all duration-300"
                  >
                    <p className="text-xs text-[#6B7C78] uppercase font-bold tracking-wider">
                      Total Products
                    </p>
                    <p className="text-3xl font-bold text-[#0F6D5B] mt-3">
                      {vendorDetails.totalProducts}
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
                      Total Orders
                    </p>
                    <p className="text-3xl font-bold text-[#0F6D5B] mt-3">
                      {vendorDetails.totalOrders}
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
                      Total Revenue
                    </p>
                    <p className="text-3xl font-bold text-[#0F6D5B] mt-3">
                      ₹{vendorDetails.totalRevenue}
                    </p>
                  </motion.div>
                </div>
              </div>

              {/* Joined Date */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="bg-gradient-to-br from-[#F4F7F6] to-white rounded-2xl p-8 border border-[#E6EFEC] hover:shadow-lg transition-all duration-300"
              >
                <p className="text-xs text-[#6B7C78] uppercase font-bold tracking-wider mb-3">Joined Since</p>
                <p className="text-lg font-bold text-gray-900">
                  {new Date(vendorDetails.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                  })}
                </p>
              </motion.div>
            </motion.div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-500">Failed to load vendor details</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default VendorDetailsModal;
