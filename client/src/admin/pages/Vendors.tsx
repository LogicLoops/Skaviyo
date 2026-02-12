import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Filter, ArrowUpDown, Check, X, ChevronLeft, ChevronRight } from "lucide-react";
import VendorDetailsModal from "../components/VendorDetailsModal";
import LottieLoader from "../components/Loder";
import Header from "../components/Header";
import {
  getAllVendors,
  updateVendorStatus,
} from "../../api/services/vendorService";

interface Vendor {
  id: number;
  userId: number;
  storeName: string;
  vendorName: string;
  email: string;
  phone: string;
  gstNumber: string | null;
  bankAccount: string | null;
  status: string;
  createdAt: string;
}

const Vendors: React.FC = () => {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [filterStatus, setFilterStatus] = useState("All Status");
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [selectedVendorId, setSelectedVendorId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  // Fetch vendors on mount
  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    setIsLoading(true);
    try {
      const result = await getAllVendors(1, 100);
      setVendors(result.vendors);
    } catch (error) {
      console.error("Error fetching vendors:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter vendors based on search and status
  const filteredVendors = vendors.filter((vendor) => {
    const matchesSearch =
      vendor.vendorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.storeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "All Status" ||
      vendor.status === filterStatus.toUpperCase();

    return matchesSearch && matchesStatus;
  });

  // Sort vendors
  const sortedVendors = [...filteredVendors].sort((a, b) => {
    if (sortOrder === "newest") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }
  });

  // Paginate
  const totalPages = Math.ceil(sortedVendors.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedVendors = sortedVendors.slice(
    startIdx,
    startIdx + itemsPerPage
  );

  // Generate page numbers for pagination
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

      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        if (!pages.includes(i)) pages.push(i);
      }

      if (currentPage < totalPages - 2) pages.push("...");
      if (!pages.includes(totalPages)) pages.push(totalPages);
    }

    return pages;
  };

  const handleViewDetails = (vendorId: number) => {
    setSelectedVendorId(vendorId);
    setIsModalOpen(true);
  };

  const handleStatusUpdate = async (vendorId: number, newStatus: string) => {
    setUpdatingId(vendorId);
    try {
      await updateVendorStatus(vendorId, newStatus);
      setVendors(
        vendors.map((v) => (v.id === vendorId ? { ...v, status: newStatus } : v))
      );
    } catch (error) {
      console.error("Error updating vendor status:", error);
      alert("Failed to update vendor status");
    } finally {
      setUpdatingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 flex items-center justify-center">
        <LottieLoader size={180} message="Loading vendors..." />
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
        /* Hide scrollbars while keeping scroll functionality */
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
          pageTitle="Vendor Management"
          pageSubtitle="Manage and monitor all vendors KYC status"
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
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600" size={18} />
                  <input
                    type="text"
                    placeholder="Search by store, vendor, or email..."
                    className="w-full pl-12 pr-4 py-3 h-11 bg-white/80 backdrop-blur-sm border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm text-gray-700 transition hover:bg-white"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
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
                      className="absolute top-full right-0 mt-2 w-48 bg-white border border-emerald-200 rounded-lg z-20 shadow-lg"
                    >
                      {["All Status", "PENDING", "ACTIVE", "SUSPENDED"].map((status, idx) => (
                        <motion.button
                          key={status}
                          whileHover={{ x: 4 }}
                          onClick={() => {
                            setFilterStatus(status);
                            setShowStatusDropdown(false);
                            setCurrentPage(1);
                          }}
                          className={`w-full text-left px-6 py-3 border-b border-gray-100 transition ${
                            filterStatus === status
                              ? "bg-emerald-50 text-emerald-700 font-semibold"
                              : "text-gray-700 hover:bg-gray-50"
                          } ${idx === 3 ? "border-b-0" : ""}`}
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
                  <span>Sort: {sortOrder}</span>
                </motion.button>
              </div>
            </div>
          </div>

          {/* Vendors Table */}
          <div className="w-full overflow-hidden">
            <table className="w-full table-fixed">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50 via-gray-50 to-gray-100 border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-1/4">
                    VENDOR
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-1/6">
                    STORE
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-1/6">
                    EMAIL
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-1/6">
                    JOINED
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-1/6">
                    STATUS
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-1/6">
                    ACTIONS
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedVendors.map((vendor, idx) => (
                  <motion.tr
                    key={vendor.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="hover:bg-gradient-to-r hover:from-emerald-50/50 hover:to-white transition-all duration-200"
                    whileHover={{ scale: 1.001 }}
                  >
                    {/* Vendor Info */}
                    <td className="px-6 py-4 w-1/4">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                          {vendor.vendorName.charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-gray-900 text-sm truncate">
                            {vendor.vendorName}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {vendor.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Store Name */}
                    <td className="px-6 py-4 w-1/6">
                      <p className="text-sm text-gray-900 truncate">{vendor.storeName}</p>
                    </td>

                    {/* Email */}
                    <td className="px-6 py-4 w-1/6">
                      <p className="text-sm text-gray-600 truncate">{vendor.email}</p>
                    </td>

                    {/* Joined Date */}
                    <td className="px-6 py-4 w-1/6">
                      <p className="text-sm text-gray-700 whitespace-nowrap">
                        {new Date(vendor.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4 w-1/6">
                      {vendor.status === "ACTIVE" ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 whitespace-nowrap">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                          Verified
                        </span>
                      ) : vendor.status === "SUSPENDED" ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-200 whitespace-nowrap">
                          <div className="w-1.5 h-1.5 rounded-full bg-red-600" />
                          Suspended
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200 whitespace-nowrap">
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                          Pending
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 w-1/6">
                      <div className="flex items-center gap-1">
                        {vendor.status === "PENDING" ? (
                          <>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleStatusUpdate(vendor.id, "ACTIVE")}
                              disabled={updatingId === vendor.id}
                              className="inline-flex items-center gap-1 px-2 py-1.5 bg-emerald-600 text-white text-xs font-medium rounded-lg hover:bg-emerald-700 transition-colors duration-150 disabled:opacity-50 whitespace-nowrap"
                            >
                              {updatingId === vendor.id ? (
                                <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              ) : (
                                <Check size={14} />
                              )}
                              Approve
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleStatusUpdate(vendor.id, "SUSPENDED")}
                              disabled={updatingId === vendor.id}
                              className="inline-flex items-center gap-1 px-2 py-1.5 border border-red-300 bg-white text-red-700 text-xs font-medium rounded-lg hover:bg-red-50 transition-colors duration-150 disabled:opacity-50 whitespace-nowrap"
                            >
                              {updatingId === vendor.id ? (
                                <div className="w-3 h-3 border-2 border-red-700 border-t-transparent rounded-full animate-spin" />
                              ) : (
                                <X size={14} />
                              )}
                              Reject
                            </motion.button>
                          </>
                        ) : (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleViewDetails(vendor.id)}
                            className="px-2 py-1.5 border border-gray-300 text-gray-700 text-xs font-medium rounded-lg hover:bg-gray-50 transition-colors duration-150 bg-white whitespace-nowrap"
                          >
                            Details
                          </motion.button>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {paginatedVendors.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16 text-gray-500"
            >
              <p className="text-sm font-medium">No vendors found</p>
            </motion.div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-8 py-4 border-t border-white/20 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Showing {startIdx + 1} to{" "}
                {Math.min(startIdx + itemsPerPage, sortedVendors.length)} of{" "}
                {sortedVendors.length} vendors
              </p>
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() =>
                    setCurrentPage(Math.max(1, currentPage - 1))
                  }
                  disabled={currentPage === 1}
                  className="p-2 border border-emerald-300 rounded-lg hover:bg-emerald-50 disabled:opacity-50 transition-colors"
                >
                  <ChevronLeft size={18} className="text-emerald-600" />
                </motion.button>

                {generatePageNumbers().map((page, idx) =>
                  page === "..." ? (
                    <span key={idx} className="px-2 text-gray-600">
                      ...
                    </span>
                  ) : (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setCurrentPage(page as number)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                        currentPage === page
                          ? "bg-emerald-600 text-white shadow-lg"
                          : "border border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                      }`}
                    >
                      {page}
                    </motion.button>
                  )
                )}

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="p-2 border border-emerald-300 rounded-lg hover:bg-emerald-50 disabled:opacity-50 transition-colors"
                >
                  <ChevronRight size={18} className="text-emerald-600" />
                </motion.button>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Vendor Details Modal */}
      <VendorDetailsModal
        vendorId={selectedVendorId}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedVendorId(null);
        }}
      />
    </div>
  );
};

export default Vendors;
