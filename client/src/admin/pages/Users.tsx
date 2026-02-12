import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Filter, ArrowUpDown, MoreVertical, Eye, ChevronLeft, ChevronRight, Trash2, Lock } from "lucide-react";
import Header from "../components/Header";
import UserDetailsModal from "../components/UserDetailsModal";
import LottieLoader from "../components/Loder";
import {
  getAllCustomers,
  updateCustomerStatus,
  deleteCustomer,
} from "../../api/services/usersService";

export { Users as UserManagement };

interface Customer {
  id: number;
  name: string;
  email: string;
  status: string;
  totalOrders: number;
  totalSpent: string;
  createdAt: string;
}

const Users: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [filterStatus, setFilterStatus] = useState("All Status");
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch customers on mount
  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    setIsLoading(true);
    try {
      const data = await getAllCustomers();
      setCustomers(data);
    } catch (err) {
      console.error("Error fetching customers:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter and sort customers
  const filteredAndSortedUsers = useMemo(() => {
    let filtered = customers.filter((customer) => {
      const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           customer.id.toString().includes(searchTerm);
      const matchesStatus = filterStatus === "All Status" || customer.status === filterStatus;
      return matchesSearch && matchesStatus;
    });

    // Sort users
    if (sortOrder === "newest") {
      filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (sortOrder === "oldest") {
      filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    } else if (sortOrder === "highest_spent") {
      filtered.sort((a, b) => parseFloat(b.totalSpent) - parseFloat(a.totalSpent));
    } else if (sortOrder === "most_orders") {
      filtered.sort((a, b) => b.totalOrders - a.totalOrders);
    }

    return filtered;
  }, [customers, searchTerm, filterStatus, sortOrder]);

  // Calculate pagination
  const totalUsers = filteredAndSortedUsers.length;
  const totalPages = Math.ceil(totalUsers / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalUsers);
  const paginatedUsers = filteredAndSortedUsers.slice(startIndex, endIndex);

  // Reset to page 1 when search/filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterStatus, sortOrder]);

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
      if (currentPage > 3) pages.push('...');
      
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        if (!pages.includes(i)) pages.push(i);
      }
      
      if (currentPage < totalPages - 2) pages.push('...');
      if (!pages.includes(totalPages)) pages.push(totalPages);
    }
    
    return pages;
  };

  const handleViewDetails = (customerId: number) => {
    setSelectedCustomerId(customerId);
    setIsModalOpen(true);
  };

  const handleDeleteUser = async (customerId: number) => {
    if (window.confirm("Are you sure you want to delete this customer? This action cannot be undone.")) {
      try {
        await deleteCustomer(customerId);
        setCustomers(customers.filter(c => c.id !== customerId));
        alert("Customer deleted successfully");
      } catch (error) {
        console.error("Error deleting customer:", error);
        alert("Failed to delete customer");
      }
    }
  };

  const handleDeactivateUser = async (customerId: number, currentStatus: string) => {
    const newStatus = currentStatus === "ACTIVE" ? "BLOCKED" : "ACTIVE";
    const confirmMsg = newStatus === "BLOCKED" 
      ? "Are you sure you want to block this customer?" 
      : "Are you sure you want to unblock this customer?";
    
    if (window.confirm(confirmMsg)) {
      try {
        await updateCustomerStatus(customerId, newStatus);
        setCustomers(customers.map(c => 
          c.id === customerId ? { ...c, status: newStatus } : c
        ));
        alert(`Customer ${newStatus === "BLOCKED" ? "blocked" : "unblocked"} successfully`);
      } catch (error) {
        console.error("Error updating customer status:", error);
        alert("Failed to update customer status");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 flex items-center justify-center">
        <LottieLoader size={180} message="Loading users..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 relative overflow-y-auto">
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
        /* Hide scrollbar while keeping scrolling functionality */
        ::-webkit-scrollbar {
          display: none;
        }
        html {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
      `}</style>
      
      <div className="p-8 relative z-10">
        {/* HEADER */}
        <Header
          pageTitle="User Management"
          pageSubtitle="Manage and monitor all customers"
        />

        {/* MAIN CARD - Glass Effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="glass-effect rounded-2xl overflow-hidden"
        >
          {/* Search, Filter, Sort Bar */}
          <div className="p-8 border-b border-white/20">
            <div className="flex items-center justify-between gap-6">
              <div className="flex-1">
                <div className="relative max-w-sm">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600" size={18} />
                  <input
                    type="text"
                    placeholder="Search by name, email, or ID..."
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
                      {["All Status", "ACTIVE", "BLOCKED"].map((status, idx) => (
                        <motion.button
                          key={status}
                          whileHover={{ x: 4 }}
                          className={`w-full text-left px-4 py-3 transition text-sm font-medium ${
                            idx < 2 ? "border-b border-emerald-100" : ""
                          } ${
                            filterStatus === status
                              ? "bg-emerald-50 text-emerald-700"
                              : "text-gray-700 hover:bg-emerald-50"
                          }`}
                          onClick={() => {
                            setFilterStatus(status);
                            setShowStatusDropdown(false);
                          }}
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
                  onClick={() => {
                    const sortOptions = ["newest", "oldest", "highest_spent", "most_orders"];
                    const currentIndex = sortOptions.indexOf(sortOrder);
                    const nextIndex = (currentIndex + 1) % sortOptions.length;
                    setSortOrder(sortOptions[nextIndex]);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 border border-emerald-300 rounded-lg text-emerald-700 transition bg-white/60 font-semibold text-sm hover:bg-white hover:shadow-md backdrop-blur-sm"
                >
                  <ArrowUpDown size={16} />
                  <span>
                    Sort: {sortOrder === "newest" ? "Newest" : sortOrder === "oldest" ? "Oldest" : sortOrder === "highest_spent" ? "Highest Spent" : "Most Orders"}
                  </span>
                </motion.button>
              </div>
            </div>
          </div>

          {/* Users Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/30 backdrop-blur-sm border-b border-white/20">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-emerald-900 uppercase tracking-wider">USER</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-emerald-900 uppercase tracking-wider">JOIN DATE</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-emerald-900 uppercase tracking-wider">ORDERS</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-emerald-900 uppercase tracking-wider">SPENT</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-emerald-900 uppercase tracking-wider">STATUS</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-emerald-900 uppercase tracking-wider">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {paginatedUsers.map((customer, idx) => (
                  <motion.tr
                    key={customer.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    whileHover={{ backgroundColor: "rgba(240, 253, 250, 0.5)" }}
                    className="hover:bg-white/30 transition backdrop-blur-sm"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0 shadow-md">
                          {customer.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-gray-900 text-sm">{customer.name}</p>
                          <p className="text-xs text-gray-600">{customer.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-sm text-gray-700">
                      {new Date(customer.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-5 text-sm font-semibold text-gray-900">{customer.totalOrders}</td>
                    <td className="px-6 py-5 text-sm font-semibold text-emerald-700">₹{customer.totalSpent}</td>
                    <td className="px-6 py-5">
                      <motion.span
                        whileHover={{ scale: 1.05 }}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold inline-flex items-center gap-1.5 shadow-sm ${
                          customer.status === "ACTIVE" 
                            ? "bg-emerald-100/80 text-emerald-700 border border-emerald-200" 
                            : "bg-red-100/80 text-red-700 border border-red-200"
                        }`}
                      >
                        <span className={`w-2 h-2 rounded-full ${customer.status === "ACTIVE" ? "bg-emerald-600" : "bg-red-600"}`}></span>
                        {customer.status}
                      </motion.span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <motion.button 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleViewDetails(customer.id)}
                          className="px-3 py-1.5 border border-emerald-500 text-emerald-600 rounded-lg text-xs font-semibold hover:bg-emerald-50 transition inline-flex items-center gap-1.5 bg-white/60 backdrop-blur-sm"
                        >
                          <Eye size={14} />
                          View
                        </motion.button>
                        <div className="relative group">
                          <motion.button
                            whileHover={{ rotate: 90 }}
                            className="p-2 text-gray-500 hover:bg-white/60 rounded-lg transition backdrop-blur-sm"
                          >
                            <MoreVertical size={16} />
                          </motion.button>
                          <div className="absolute right-0 mt-2 w-48 bg-white border border-emerald-200 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition z-20">
                            <motion.button
                              whileHover={{ x: 4, backgroundColor: "rgba(240, 253, 250, 1)" }}
                              onClick={() => handleDeactivateUser(customer.id, customer.status)}
                              className="w-full text-left px-4 py-2.5 hover:bg-emerald-50 text-gray-700 text-sm flex items-center gap-2 border-b border-emerald-100 transition"
                            >
                              <Lock size={14} />
                              {customer.status === "ACTIVE" ? "Block User" : "Unblock User"}
                            </motion.button>
                            <motion.button
                              whileHover={{ x: 4, backgroundColor: "rgba(254, 242, 242, 1)" }}
                              onClick={() => handleDeleteUser(customer.id)}
                              className="w-full text-left px-4 py-2.5 hover:bg-red-50 text-red-600 text-sm flex items-center gap-2 transition"
                            >
                              <Trash2 size={14} />
                              Delete User
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
            
            {paginatedUsers.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16 text-gray-500"
              >
                <p className="text-sm font-medium">No customers found</p>
              </motion.div>
            )}
          </div>

          {/* Pagination */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="px-8 py-6 border-t border-white/20 flex items-center justify-between bg-white/20 backdrop-blur-sm"
          >
            <p className="text-sm font-medium text-gray-700">
              Showing {totalUsers === 0 ? 0 : startIndex + 1}-{endIndex} of {totalUsers} users
            </p>
            
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-2 border border-emerald-300 rounded-lg text-emerald-600 hover:bg-white/60 disabled:opacity-50 disabled:cursor-not-allowed transition backdrop-blur-sm"
              >
                <ChevronLeft size={16} />
              </motion.button>

              <div className="flex items-center gap-1">
                {generatePageNumbers().map((page, index) => (
                  page === '...' ? (
                    <span key={`dots-${index}`} className="px-2 text-gray-600 font-medium">...</span>
                  ) : (
                    <motion.button
                      key={page}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setCurrentPage(page as number)}
                      className={`w-8 h-8 rounded-lg text-sm font-semibold transition ${
                        currentPage === page
                          ? 'bg-emerald-600 text-white border border-emerald-600 shadow-lg'
                          : 'border border-emerald-300 text-gray-700 hover:bg-white/60 backdrop-blur-sm'
                      }`}
                    >
                      {page}
                    </motion.button>
                  )
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages || totalPages === 0}
                className="p-2 border border-emerald-300 rounded-lg text-emerald-600 hover:bg-white/60 disabled:opacity-50 disabled:cursor-not-allowed transition backdrop-blur-sm"
              >
                <ChevronRight size={16} />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* User Details Modal */}
      <UserDetailsModal
        customerId={selectedCustomerId}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Users;
