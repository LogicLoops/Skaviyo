import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  ArrowUpDown,
  Eye,
  Edit2,
  Trash2,
  X,
  Zap,
} from "lucide-react";
import Header from "../components/Header";
import LottieLoader from "../components/Loder";
import axiosClient from "../../api/axiosClient";

interface LimitedEdition {
  id: number;
  title: string;
  description: string;
  vendor: string;
  vendorId: number;
  category: string;
  categoryId: number;
  totalVariants: number;
  totalStock: number;
  avgPrice: number;
  createdOn: string;
  status: "Active" | "Ended";
  urgency: "Critical" | "Low";
  icon: string;
}

interface FormData {
  title: string;
  description: string;
  category: string;
  vendor: string;
  limitedQuantity: number;
}

const LimitedEdition: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [filterStatus, setFilterStatus] = useState("All Status");
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [limitedEditions, setLimitedEditions] = useState<LimitedEdition[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [categories, setCategories] = useState<Array<{ id: number; name: string }>>([]);
  const [vendors, setVendors] = useState<Array<{ id: number; store_name: string }>>([]);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    category: "",
    vendor: "",
    limitedQuantity: 50,
  });
  const itemsPerPage = 6;

  // Fetch categories and vendors on component mount
  useEffect(() => {
    fetchDropdownData();
  }, []);

  // Fetch limited editions when search/sort/filter/page changes
  useEffect(() => {
    fetchLimitedEditions();
  }, [searchTerm, sortOrder, filterStatus, currentPage]);

  const fetchDropdownData = async () => {
    try {
      const [categoriesRes, vendorsRes] = await Promise.all([
        axiosClient.get("/admin/categories", { params: { limit: 100 } }),
        axiosClient.get("/admin/vendors/all"),
      ]);

      if (categoriesRes.data.success) {
        setCategories(categoriesRes.data.data.categories || []);
      }
      if (vendorsRes.data.success) {
        setVendors(vendorsRes.data.data || []);
      }
    } catch (error) {
      console.error("Error fetching dropdown data:", error);
    }
  };

  const fetchLimitedEditions = async () => {
    try {
      setIsLoading(true);
      const params = {
        search: searchTerm,
        sortOrder,
        status: filterStatus !== "All Status" ? filterStatus : undefined,
        page: currentPage,
        limit: itemsPerPage,
      };

      const response = await axiosClient.get("/admin/limited-edition", { params });

      if (response.data.success) {
        setLimitedEditions(response.data.data.limitedEdition);
        setTotalItems(response.data.data.pagination.total);
      }
    } catch (error) {
      console.error("Error fetching limited editions:", error);
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

  const handleSaveLimitedEdition = async () => {
    try {
      if (!formData.title.trim()) {
        alert("Product title is required");
        return;
      }

      if (!formData.category) {
        alert("Please select a category");
        return;
      }

      if (!formData.vendor) {
        alert("Please select a vendor");
        return;
      }

      const payload = {
        title: formData.title,
        description: formData.description,
        category_id: parseInt(formData.category),
        vendor_id: parseInt(formData.vendor),
        limited_quantity: formData.limitedQuantity,
      };

      const response = await axiosClient.post("/admin/limited-edition", payload);

      if (response.data.success) {
        alert("Limited edition created successfully!");
        handleReset();
        setIsModalOpen(false);
        setCurrentPage(1);
        fetchLimitedEditions();
      }
    } catch (error) {
      console.error("Error saving limited edition:", error);
      alert("Failed to save limited edition");
    }
  };

  const handleDeleteLimitedEdition = async (productId: number) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this limited edition product?"
      )
    ) {
      return;
    }

    try {
      const response = await axiosClient.delete(
        `/admin/limited-edition/${productId}`
      );

      if (response.data.success) {
        alert("Limited edition deleted successfully!");
        fetchLimitedEditions();
      }
    } catch (error) {
      console.error("Error deleting limited edition:", error);
      alert("Failed to delete limited edition");
    }
  };

  const handleReset = () => {
    setFormData({
      title: "",
      description: "",
      category: "",
      vendor: "",
      limitedQuantity: 50,
    });
  };

  if (isLoading && limitedEditions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 flex items-center justify-center">
        <LottieLoader message="Loading limited editions..." />
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
          pageTitle="Limited Edition Management"
          pageSubtitle="Manage exclusive, time-limited product drops and campaigns."
        />

        {/* STATS CARDS */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {[
            { label: "Total Drops", value: totalItems, subtitle: "Active limited editions" },
            { label: "Critical Stock", value: "12", subtitle: "Items with ≤10 units" },
            { label: "Revenue", value: "₹45,230", subtitle: "Total limited edition sales" },
            { label: "Avg Price", value: "₹2,540", subtitle: "Average product price" },
          ].map((stat: any, idx: number) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="glass-effect rounded-2xl p-6 border border-white/20 shadow-lg"
            >
              <p className="text-sm font-semibold text-gray-600 mb-2">
                {stat.label}
              </p>
              <p className="text-3xl font-bold text-emerald-700 mb-2">
                {stat.value}
              </p>
              <p className="text-xs text-gray-600">{stat.subtitle}</p>
            </motion.div>
          ))}
        </div>

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
                    placeholder="Search by product name..."
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
                      {["All Status", "Active", "Ended"].map((status) => (
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

                {/* Add Limited Edition Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-semibold text-sm transition duration-200"
                >
                  <Zap size={16} />
                  <span>Add Drop</span>
                </motion.button>
              </div>
            </div>
          </div>

          {/* Limited Edition Table */}
          <div className="w-full overflow-hidden">
            <table className="w-full table-fixed">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50 via-gray-50 to-gray-100 border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-1/4">
                    PRODUCT
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-1/6">
                    VENDOR
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-1/6">
                    STOCK
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-1/6">
                    PRICE
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
                {limitedEditions.map((item, idx) => (
                  <motion.tr
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="hover:bg-gradient-to-r hover:from-emerald-50/50 hover:to-white transition-all duration-200"
                    whileHover={{ scale: 1.001 }}
                  >
                    <td className="px-6 py-4 flex items-center gap-3">
                      <span className="text-2xl">{item.icon}</span>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {item.title}
                        </p>
                        <p className="text-xs text-gray-600">{item.category}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-700">
                      {item.vendor}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-lg text-gray-900">
                          {item.totalStock}
                        </span>
                        <span
                          className={`text-xs font-semibold px-2 py-1 rounded ${
                            item.urgency === "Critical"
                              ? "bg-red-100 text-red-700"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {item.urgency}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                      ₹{item.avgPrice.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1 ${
                          item.status === "Active"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${
                            item.status === "Active"
                              ? "bg-emerald-600"
                              : "bg-red-600"
                          }`}
                        />
                        {item.status}
                      </span>
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
                        className="text-blue-600 hover:text-blue-700 transition"
                      >
                        <Edit2 size={18} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDeleteLimitedEdition(item.id)}
                        className="text-red-600 hover:text-red-700 transition"
                      >
                        <Trash2 size={18} />
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
              {Math.min(startIndex + itemsPerPage, totalItems)} of{" "}
              {totalItems} drops
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
          {isModalOpen && (
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
                      Create Limited Edition Drop
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                      Launch a new exclusive product drop with limited quantity
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
                  {/* Product Title */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Product Title
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Exclusive Summer Collection"
                      value={formData.title}
                      onChange={(e) => handleFormChange("title", e.target.value)}
                      className="w-full px-4 py-3 bg-white/50 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm text-gray-800 placeholder-gray-500"
                    />
                  </div>

                  {/* Category & Vendor */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Category
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) =>
                          handleFormChange("category", e.target.value)
                        }
                        className="w-full px-4 py-3 bg-white/50 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm text-gray-800"
                      >
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Vendor
                      </label>
                      <select
                        value={formData.vendor}
                        onChange={(e) =>
                          handleFormChange("vendor", e.target.value)
                        }
                        className="w-full px-4 py-3 bg-white/50 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm text-gray-800"
                      >
                        <option value="">Select Vendor</option>
                        {vendors.map((ven) => (
                          <option key={ven.id} value={ven.id}>
                            {ven.store_name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Limited Quantity */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Limited Quantity (units)
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={formData.limitedQuantity}
                      onChange={(e) =>
                        handleFormChange(
                          "limitedQuantity",
                          parseInt(e.target.value)
                        )
                      }
                      className="w-full px-4 py-3 bg-white/50 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm text-gray-800"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      placeholder="Describe the exclusive features and limited availability..."
                      value={formData.description}
                      onChange={(e) =>
                        handleFormChange("description", e.target.value)
                      }
                      rows={4}
                      className="w-full px-4 py-3 bg-white/50 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm text-gray-800 placeholder-gray-500 resize-none"
                    />
                  </div>

                  {/* Info Box */}
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <p className="text-xs text-amber-700 font-medium">
                      ⚡ Limited edition items will be promoted as exclusive drops. Once
                      stock runs out, the item will be marked as ended.
                    </p>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="sticky bottom-0 glass-effect border-t border-white/20 px-8 py-4 flex items-center justify-end gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleReset}
                    className="px-6 py-2 border border-white/30 text-gray-700 rounded-lg font-semibold text-sm hover:bg-white/20 transition"
                  >
                    Reset
                  </motion.button>
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
                    onClick={handleSaveLimitedEdition}
                    className="px-6 py-2 bg-amber-600 text-white rounded-lg font-semibold text-sm hover:bg-amber-700 transition flex items-center gap-2"
                  >
                    <Zap size={16} />
                    Launch Drop
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

export default LimitedEdition;
