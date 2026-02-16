import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  Edit2,
  Trash2,
  Package,
  CheckCircle2,
  AlertCircle,
  FileText,
  Plus,
  X,
  Upload,
} from "lucide-react";
import Header from "../components/Header";

interface Product {
  id: number;
  name: string;
  sku: string;
  image: string;
  category: string;
  price: number;
  stock: number;
  status: "Active" | "Low Stock" | "Out of Stock" | "Draft";
}

interface FormData {
  name: string;
  category: string;
  price: string;
  stock: string;
  status: "Active" | "Low Stock" | "Out of Stock" | "Draft";
  image: string;
  description: string;
}

const mockProducts: Product[] = [
  {
    id: 1,
    name: "Minimalist Watch",
    sku: "WTC-2024-001",
    image: "⌚",
    category: "Accessories",
    price: 124.0,
    stock: 45,
    status: "Active",
  },
  {
    id: 2,
    name: "Pro Audio Set",
    sku: "AUD-PRO-01",
    image: "🎧",
    category: "Electronics",
    price: 249.0,
    stock: 12,
    status: "Low Stock",
  },
  {
    id: 3,
    name: "Sport Runners",
    sku: "SFT-05",
    image: "👟",
    category: "Footwear",
    price: 89.0,
    stock: 0,
    status: "Out of Stock",
  },
  {
    id: 4,
    name: "Ergo Chair 2",
    sku: "FRN-ERG-02",
    image: "💺",
    category: "Furniture",
    price: 350.0,
    stock: 8,
    status: "Low Stock",
  },
  {
    id: 5,
    name: "Classic Sunglasses",
    sku: "ACC-SUN-01",
    image: "🕶️",
    category: "Accessories",
    price: 129.0,
    stock: 120,
    status: "Active",
  },
];

const Products: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<number | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    category: "",
    price: "",
    stock: "",
    status: "Active",
    image: "",
    description: "",
  });

  // Calculate metrics
  const totalProducts = mockProducts.length;
  const activeProducts = mockProducts.filter((p) => p.status === "Active").length;
  const lowStock = mockProducts.filter((p) => p.status === "Low Stock").length;
  const drafts = mockProducts.filter((p) => p.status === "Draft").length;

  // Filter and search
  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "All" || product.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-emerald-100 text-emerald-700";
      case "Low Stock":
        return "bg-yellow-100 text-yellow-700";
      case "Out of Stock":
        return "bg-red-100 text-red-700";
      case "Draft":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const handleFormChange = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleOpenModal = (product?: Product) => {
    if (product) {
      setEditingProductId(product.id);
      setFormData({
        name: product.name,
        category: product.category,
        price: product.price.toString(),
        stock: product.stock.toString(),
        status: product.status,
        image: product.image,
        description: "",
      });
    } else {
      setEditingProductId(null);
      setFormData({
        name: "",
        category: "",
        price: "",
        stock: "",
        status: "Active",
        image: "",
        description: "",
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProductId(null);
    handleResetForm();
  };

  const handleResetForm = () => {
    setFormData({
      name: "",
      category: "",
      price: "",
      stock: "",
      status: "Active",
      image: "",
      description: "",
    });
  };

  const handleAddProduct = () => {
    if (!formData.name.trim()) {
      alert("Product name is required");
      return;
    }

    if (!formData.category) {
      alert("Category is required");
      return;
    }

    if (!formData.price) {
      alert("Price is required");
      return;
    }

    if (!formData.stock) {
      alert("Stock quantity is required");
      return;
    }

    // Here you would typically make an API call to save the product
    alert(editingProductId ? "Product updated successfully!" : "Product added successfully!");
    handleCloseModal();
  };

  const handleDeleteProduct = (productId: number) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }
    // Here you would typically make an API call to delete the product
    alert("Product deleted successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 overflow-y-auto overflow-x-hidden hide-scrollbar">
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
          pageTitle="Products"
          pageSubtitle="Manage your product catalog"
        />

        {/* KPI CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Products */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="glass-effect rounded-2xl p-6 group cursor-pointer hover:shadow-lg transition-all"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-600 text-sm font-semibold uppercase tracking-wider">
                  Total Products
                </p>
                <p className="text-4xl font-bold text-gray-900 mt-2">
                  {totalProducts}
                </p>
              </div>
              <div className="bg-emerald-100 p-3 rounded-xl text-emerald-600 group-hover:bg-emerald-200 transition-all">
                <Package size={24} />
              </div>
            </div>
          </motion.div>

          {/* Active */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="glass-effect rounded-2xl p-6 group cursor-pointer hover:shadow-lg transition-all"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-600 text-sm font-semibold uppercase tracking-wider">
                  Active
                </p>
                <p className="text-4xl font-bold text-gray-900 mt-2">
                  {activeProducts}
                </p>
              </div>
              <div className="bg-emerald-100 p-3 rounded-xl text-emerald-600 group-hover:bg-emerald-200 transition-all">
                <CheckCircle2 size={24} />
              </div>
            </div>
          </motion.div>

          {/* Low Stock */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="glass-effect rounded-2xl p-6 group cursor-pointer hover:shadow-lg transition-all"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-600 text-sm font-semibold uppercase tracking-wider">
                  Low Stock
                </p>
                <p className="text-4xl font-bold text-gray-900 mt-2">
                  {lowStock}
                </p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-xl text-yellow-600 group-hover:bg-yellow-200 transition-all">
                <AlertCircle size={24} />
              </div>
            </div>
          </motion.div>

          {/* Drafts */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="glass-effect rounded-2xl p-6 group cursor-pointer hover:shadow-lg transition-all"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold uppercase tracking-wider">
                  Drafts
                </p>
                <p className="text-4xl font-bold text-gray-900 mt-2">
                  {drafts}
                </p>
              </div>
              <div className="bg-gray-100 p-3 rounded-xl text-gray-600 group-hover:bg-gray-200 transition-all">
                <FileText size={24} />
              </div>
            </div>
          </motion.div>
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
            <div className="flex items-center justify-between gap-6 flex-wrap">
              <div className="flex-1 min-w-max">
                <div className="relative max-w-sm">
                  <Search
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600"
                    size={18}
                  />
                  <input
                    type="text"
                    placeholder="Filter by name..."
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
                {/* Category Filter */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 border border-emerald-300 rounded-lg text-emerald-700 transition bg-white/60 font-semibold text-sm hover:bg-white hover:shadow-md backdrop-blur-sm"
                >
                  <span>All Categories</span>
                </motion.button>

                {/* Status Filter */}
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 border border-emerald-300 rounded-lg text-emerald-700 transition bg-white/60 font-semibold text-sm hover:bg-white hover:shadow-md backdrop-blur-sm"
                  >
                    <Filter size={16} />
                    <span>Status: {filterStatus}</span>
                  </motion.button>

                  {showStatusDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute top-full right-0 mt-2 bg-white border border-emerald-200 rounded-lg shadow-lg p-2 z-50 min-w-max"
                    >
                      {["All", "Active", "Low Stock", "Out of Stock", "Draft"].map(
                        (status) => (
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
                        )
                      )}
                    </motion.div>
                  )}
                </div>

                {/* Add Product Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleOpenModal()}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold text-sm transition duration-200"
                >
                  <Plus size={18} />
                  <span>Add New Product</span>
                </motion.button>
              </div>
            </div>
          </div>

          {/* Products Table */}
          <div className="w-full overflow-x-auto hide-scrollbar">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50 via-gray-50 to-gray-100 border-b border-gray-200">
                  <th className="px-6 py-4 text-left">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300"
                    />
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Product Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {displayProducts.map((product, idx) => (
                  <motion.tr
                    key={product.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="hover:bg-gradient-to-r hover:from-emerald-50/50 hover:to-white transition-all duration-200"
                    whileHover={{ scale: 1.001 }}
                  >
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{product.image}</span>
                        <div>
                          <p className="font-semibold text-gray-900">
                            {product.name}
                          </p>
                          <p className="text-xs text-gray-600">{product.sku}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {product.category}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                      ${product.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-700">
                      {product.stock}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1 ${getStatusColor(
                          product.status
                        )}`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${
                            product.status === "Active"
                              ? "bg-emerald-600"
                              : product.status === "Low Stock"
                              ? "bg-yellow-600"
                              : product.status === "Out of Stock"
                              ? "bg-red-600"
                              : "bg-gray-600"
                          }`}
                        ></span>
                        {product.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 flex items-center gap-3">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleOpenModal(product)}
                        className="text-emerald-600 hover:text-emerald-700 transition"
                      >
                        <Edit2 size={18} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDeleteProduct(product.id)}
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
          <div className="px-8 py-6 border-t border-gray-200 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredProducts.length)} of{" "}
              {filteredProducts.length} products
            </p>

            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  setCurrentPage(Math.max(currentPage - 1, 1))
                }
                disabled={currentPage === 1}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                ←
              </motion.button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <motion.button
                    key={page}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                      currentPage === page
                        ? "bg-emerald-600 text-white"
                        : "border border-gray-300 text-gray-700 hover:bg-gray-50"
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
                  setCurrentPage(Math.min(currentPage + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                →
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Modal - Add/Edit Product */}
        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm"
              onClick={handleCloseModal}
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
                      {editingProductId ? "Edit Product" : "Add New Product"}
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                      {editingProductId
                        ? "Update the product details below"
                        : "Fill in the details below to create a new product"}
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleCloseModal}
                    className="text-gray-400 hover:text-gray-600 transition"
                  >
                    <X size={24} />
                  </motion.button>
                </div>

                {/* Modal Content */}
                <div className="p-8 space-y-6">
                  {/* Product Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Premium Watch"
                      value={formData.name}
                      onChange={(e) => handleFormChange("name", e.target.value)}
                      className="w-full px-4 py-3 bg-white/50 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm text-gray-800 placeholder-gray-500"
                    />
                  </div>

                  {/* Category & Price */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Category *
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) =>
                          handleFormChange("category", e.target.value)
                        }
                        className="w-full px-4 py-3 bg-white/50 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm text-gray-800"
                      >
                        <option value="">Select Category</option>
                        <option value="Accessories">Accessories</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Footwear">Footwear</option>
                        <option value="Furniture">Furniture</option>
                        <option value="Clothing">Clothing</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Price ($) *
                      </label>
                      <input
                        type="number"
                        placeholder="e.g., 99.99"
                        value={formData.price}
                        onChange={(e) => handleFormChange("price", e.target.value)}
                        className="w-full px-4 py-3 bg-white/50 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm text-gray-800 placeholder-gray-500"
                        step="0.01"
                        min="0"
                      />
                    </div>
                  </div>

                  {/* Stock & Status */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Stock Quantity *
                      </label>
                      <input
                        type="number"
                        placeholder="e.g., 100"
                        value={formData.stock}
                        onChange={(e) => handleFormChange("stock", e.target.value)}
                        className="w-full px-4 py-3 bg-white/50 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm text-gray-800 placeholder-gray-500"
                        min="0"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Status
                      </label>
                      <select
                        value={formData.status}
                        onChange={(e) =>
                          handleFormChange(
                            "status",
                            e.target.value as "Active" | "Low Stock" | "Out of Stock" | "Draft"
                          )
                        }
                        className="w-full px-4 py-3 bg-white/50 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm text-gray-800"
                      >
                        <option value="Active">Active</option>
                        <option value="Low Stock">Low Stock</option>
                        <option value="Out of Stock">Out of Stock</option>
                        <option value="Draft">Draft</option>
                      </select>
                    </div>
                  </div>

                  {/* Product Photo Upload */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Product Photo
                    </label>
                    <div className="relative border-2 border-dashed border-emerald-300 rounded-lg p-6 text-center hover:border-emerald-500 transition cursor-pointer bg-white/30">
                      <Upload size={32} className="mx-auto text-emerald-600 mb-2" />
                      <p className="text-sm font-medium text-gray-700">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        PNG, JPG, GIF up to 10MB
                      </p>
                      <input
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            handleFormChange("image", file.name);
                          }
                        }}
                      />
                    </div>
                    {formData.image && (
                      <p className="text-xs text-emerald-600 mt-2">
                        Selected: {formData.image}
                      </p>
                    )}
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      placeholder="Enter product details, features, and specifications..."
                      value={formData.description}
                      onChange={(e) =>
                        handleFormChange("description", e.target.value)
                      }
                      rows={4}
                      className="w-full px-4 py-3 bg-white/50 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm text-gray-800 placeholder-gray-500 resize-none"
                    />
                  </div>

                  {/* Info Box */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-xs text-blue-700 font-medium">
                      💡 Make sure all required fields are filled before saving your product.
                    </p>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="sticky bottom-0 glass-effect border-t border-white/20 px-8 py-4 flex items-center justify-end gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleResetForm}
                    className="px-6 py-2 border border-white/30 text-gray-700 rounded-lg font-semibold text-sm hover:bg-white/20 transition"
                  >
                    Reset
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCloseModal}
                    className="px-6 py-2 border border-red-300 text-red-600 rounded-lg font-semibold text-sm hover:bg-red-50 transition"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAddProduct}
                    className="px-6 py-2 bg-emerald-600 text-white rounded-lg font-semibold text-sm hover:bg-emerald-700 transition flex items-center gap-2"
                  >
                    ✓ {editingProductId ? "Update Product" : "Add Product"}
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

export default Products;
