import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Plus, X } from "lucide-react";
import Header from "../components/Header";

interface FinancialConfig {
  platformCommission: string;
  gstPercentage: string;
  gstin: string;
}

interface LogisticsConfig {
  standardShipping: string;
  freeShippingThreshold: string;
  enableExpress: boolean;
  allowInternational: boolean;
}

interface Coupon {
  id: string;
  code: string;
  discount: string;
  expiryInfo: string;
  status: "Active" | "Expired";
  usedCount: number;
}

interface AdminControls {
  maintenanceMode: boolean;
  vendorRegistration: boolean;
}

const Settings: React.FC = () => {
  const [financial, setFinancial] = useState<FinancialConfig>({
    platformCommission: "12.5",
    gstPercentage: "18",
    gstin: "29AABCU9603R1ZJ",
  });

  const [logistics, setLogistics] = useState<LogisticsConfig>({
    standardShipping: "5.99",
    freeShippingThreshold: "150",
    enableExpress: true,
    allowInternational: false,
  });

  const [adminControls, setAdminControls] = useState<AdminControls>({
    maintenanceMode: false,
    vendorRegistration: true,
  });

  const [coupons, setCoupons] = useState<Coupon[]>([
    {
      id: "1",
      code: "WELCOME20",
      discount: "20% Off First Order",
      expiryInfo: "Used 1,242 times • Max Discount $50",
      status: "Active",
      usedCount: 1242,
    },
    {
      id: "2",
      code: "SUMMER15",
      discount: "15% Off Summer Collection",
      expiryInfo: "Expires in 12 days • Min Order $100",
      status: "Active",
      usedCount: 856,
    },
    {
      id: "3",
      code: "FREESHIP",
      discount: "Free Shipping",
      expiryInfo: "Expired on Oct 01 • Used 850 times",
      status: "Expired",
      usedCount: 850,
    },
  ]);

  const [showCouponModal, setShowCouponModal] = useState(false);
  const [couponForm, setCouponForm] = useState({
    code: "",
    discount: "",
    expiryInfo: "",
  });

  const handleFinancialChange = (field: keyof FinancialConfig, value: string) => {
    setFinancial({ ...financial, [field]: value });
  };

  const handleLogisticsChange = (field: keyof LogisticsConfig, value: string | boolean) => {
    setLogistics({ ...logistics, [field]: value });
  };

  const handleAdminControlToggle = (field: keyof AdminControls) => {
    setAdminControls({ ...adminControls, [field]: !adminControls[field] });
  };

  const handleCouponFormChange = (field: string, value: string) => {
    setCouponForm({ ...couponForm, [field]: value });
  };

  const handleAddCoupon = () => {
    if (couponForm.code.trim()) {
      setCoupons([
        ...coupons,
        {
          id: Date.now().toString(),
          code: couponForm.code,
          discount: couponForm.discount,
          expiryInfo: couponForm.expiryInfo,
          status: "Active",
          usedCount: 0,
        },
      ]);
      setCouponForm({ code: "", discount: "", expiryInfo: "" });
      setShowCouponModal(false);
    }
  };

  const handleDeleteCoupon = (id: string) => {
    setCoupons(coupons.filter((coupon) => coupon.id !== id));
  };

  const handleExportData = () => {
    console.log("Exporting system data...");
    alert("System data exported successfully!");
  };

  const handleClearCache = () => {
    console.log("Clearing cache...");
    alert("Cache cleared successfully!");
  };

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
          pageTitle="Platform Settings"
          pageSubtitle="Configure financial, logistics, and platform settings"
        />
        {/* Financial & Logistics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Financial Configuration */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="glass-effect rounded-2xl p-8 border border-white/20 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">%</span>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Financial Configuration</h3>
                <p className="text-sm text-gray-600">Manage commissions and tax settings</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Platform Commission (%)
                </label>
                <input
                  type="text"
                  value={financial.platformCommission}
                  onChange={(e) => handleFinancialChange("platformCommission", e.target.value)}
                  className="w-full px-4 py-3 bg-white/50 border border-white/30 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:outline-none text-gray-800 placeholder-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  GST Percentage (%)
                </label>
                <input
                  type="text"
                  value={financial.gstPercentage}
                  onChange={(e) => handleFinancialChange("gstPercentage", e.target.value)}
                  className="w-full px-4 py-3 bg-white/50 border border-white/30 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:outline-none text-gray-800 placeholder-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Company GSTIN
                </label>
                <input
                  type="text"
                  value={financial.gstin}
                  onChange={(e) => handleFinancialChange("gstin", e.target.value)}
                  className="w-full px-4 py-3 bg-white/50 border border-white/30 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:outline-none text-gray-800 placeholder-gray-500"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
              >
                Save Changes
              </motion.button>
            </div>
          </motion.div>

          {/* Logistics & Shipping */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="glass-effect rounded-2xl p-8 border border-white/20 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">📦</span>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Logistics & Shipping</h3>
                <p className="text-sm text-gray-600">Configure delivery charges and thresholds</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Standard Shipping Charge ($)
                </label>
                <input
                  type="text"
                  value={logistics.standardShipping}
                  onChange={(e) => handleLogisticsChange("standardShipping", e.target.value)}
                  className="w-full px-4 py-3 bg-white/50 border border-white/30 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:outline-none text-gray-800 placeholder-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Free Shipping Threshold ($)
                </label>
                <input
                  type="text"
                  value={logistics.freeShippingThreshold}
                  onChange={(e) => handleLogisticsChange("freeShippingThreshold", e.target.value)}
                  className="w-full px-4 py-3 bg-white/50 border border-white/30 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:outline-none text-gray-800 placeholder-gray-500"
                />
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <div
                    className={`w-12 h-6 rounded-full transition-colors ${
                      logistics.enableExpress ? "bg-emerald-500" : "bg-gray-300"
                    }`}
                    onClick={() => handleLogisticsChange("enableExpress", !logistics.enableExpress)}
                  >
                    <motion.div
                      animate={{ x: logistics.enableExpress ? 24 : 2 }}
                      className="w-5 h-5 bg-white rounded-full mt-0.5"
                    />
                  </div>
                  <span className="text-gray-800 font-medium">Enable Express Delivery</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <div
                    className={`w-12 h-6 rounded-full transition-colors ${
                      logistics.allowInternational ? "bg-emerald-500" : "bg-gray-300"
                    }`}
                    onClick={() =>
                      handleLogisticsChange("allowInternational", !logistics.allowInternational)
                    }
                  >
                    <motion.div
                      animate={{ x: logistics.allowInternational ? 24 : 2 }}
                      className="w-5 h-5 bg-white rounded-full mt-0.5"
                    />
                  </div>
                  <span className="text-gray-800 font-medium">Allow International Shipping</span>
                </label>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
              >
                Update Logistics
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Active Coupons Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="glass-effect rounded-2xl p-8 border border-white/20 shadow-lg mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Active Coupons</h3>
              <p className="text-sm text-gray-600">Manage discount codes and offers</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowCouponModal(true)}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors font-semibold"
            >
              <Plus size={18} />
              Create New
            </motion.button>
          </div>

          <div className="space-y-3">
            <AnimatePresence>
              {coupons.map((coupon, index) => (
                <motion.div
                  key={coupon.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center justify-between bg-white/30 hover:bg-white/50 p-4 rounded-lg border border-white/20 transition-all"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-bold text-gray-800 text-lg">{coupon.code}</span>
                      <span
                        className={`text-xs px-3 py-1 rounded-full font-medium ${
                          coupon.status === "Active"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {coupon.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 font-medium">{coupon.discount}</p>
                    <p className="text-xs text-gray-600">{coupon.expiryInfo}</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleDeleteCoupon(coupon.id)}
                    className="ml-4 text-red-500 hover:text-red-700 transition-colors"
                  >
                    <Trash2 size={18} />
                  </motion.button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Admin Controls Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="glass-effect rounded-2xl p-8 border border-white/20 shadow-lg"
        >
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Admin Controls</h3>
              <p className="text-sm text-gray-600">System maintenance and management</p>
            </div>
            <span className="text-2xl">🛡️</span>
          </div>

          <div className="space-y-4 mb-6">
            <label className="flex items-center justify-between cursor-pointer p-3 bg-white/30 hover:bg-white/50 rounded-lg transition-all">
              <span className="text-gray-800 font-medium">Maintenance Mode</span>
              <div
                className={`w-12 h-6 rounded-full transition-colors ${
                  adminControls.maintenanceMode ? "bg-red-500" : "bg-gray-300"
                }`}
                onClick={() => handleAdminControlToggle("maintenanceMode")}
              >
                <motion.div
                  animate={{ x: adminControls.maintenanceMode ? 24 : 2 }}
                  className="w-5 h-5 bg-white rounded-full mt-0.5"
                />
              </div>
            </label>

            <label className="flex items-center justify-between cursor-pointer p-3 bg-white/30 hover:bg-white/50 rounded-lg transition-all">
              <span className="text-gray-800 font-medium">Vendor Registration</span>
              <div
                className={`w-12 h-6 rounded-full transition-colors ${
                  adminControls.vendorRegistration ? "bg-emerald-500" : "bg-gray-300"
                }`}
                onClick={() => handleAdminControlToggle("vendorRegistration")}
              >
                <motion.div
                  animate={{ x: adminControls.vendorRegistration ? 24 : 2 }}
                  className="w-5 h-5 bg-white rounded-full mt-0.5"
                />
              </div>
            </label>
          </div>

          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleExportData}
              className="flex items-center gap-2 flex-1 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-3 rounded-lg font-semibold transition-colors"
            >
              ⬇️ Export System Data
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleClearCache}
              className="flex items-center gap-2 flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-lg font-semibold transition-colors"
            >
              🗑️ Clear Cache
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Create Coupon Modal */}
      <AnimatePresence>
        {showCouponModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowCouponModal(false)}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-effect rounded-2xl p-8 w-full max-w-md border border-white/20 shadow-lg"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Create Coupon</h3>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowCouponModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </motion.button>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Coupon Code
                  </label>
                  <input
                    type="text"
                    value={couponForm.code}
                    onChange={(e) => handleCouponFormChange("code", e.target.value)}
                    placeholder="e.g., SUMMER20"
                    className="w-full px-4 py-3 bg-white/50 border border-white/30 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:outline-none text-gray-800 placeholder-gray-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Discount Description
                  </label>
                  <input
                    type="text"
                    value={couponForm.discount}
                    onChange={(e) => handleCouponFormChange("discount", e.target.value)}
                    placeholder="e.g., 20% Off Summer Collection"
                    className="w-full px-4 py-3 bg-white/50 border border-white/30 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:outline-none text-gray-800 placeholder-gray-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Expiry Information
                  </label>
                  <input
                    type="text"
                    value={couponForm.expiryInfo}
                    onChange={(e) => handleCouponFormChange("expiryInfo", e.target.value)}
                    placeholder="e.g., Expires in 7 days"
                    className="w-full px-4 py-3 bg-white/50 border border-white/30 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:outline-none text-gray-800 placeholder-gray-500"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowCouponModal(false)}
                  className="flex-1 px-4 py-3 border border-white/30 text-gray-700 font-semibold rounded-lg hover:bg-white/20 transition-colors"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddCoupon}
                  className="flex-1 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-colors"
                >
                  Create Coupon
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Settings;
