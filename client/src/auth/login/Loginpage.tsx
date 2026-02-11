import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeSlash, EnvelopeSimple, LockSimple, UserCircle } from "phosphor-react";
import { login } from "../../api/services/authServices";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("CUSTOMER");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      console.log("Logging in with:", { email, password, role });
      const data = await login({ email, password, role });
      console.log("Logged in:", data);
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", role);
      if (role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/vendor-dashboard");
      }
    } catch (error) {
      console.error("Login failed", error);
      setError("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 100, damping: 10 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

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
          background: rgba(255, 255, 255, 0.5);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.6);
        }
        .glass-effect:hover {
          background: rgba(255, 255, 255, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.8);
        }
      `}</style>

      {/* Main container */}
      <div className="w-full max-w-5xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left side - Branding */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="hidden lg:flex flex-col justify-center"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="mb-8"
            >
              <div className="bg-gradient-to-br from-emerald-500 to-green-600 w-20 h-20 rounded-2xl flex items-center justify-center shadow-2xl">
                <span className="text-4xl font-bold text-white">S</span>
              </div>
            </motion.div>

            <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-900 via-green-800 to-teal-800 bg-clip-text text-transparent mb-4">
              Skaviyo
            </h1>
            <p className="text-xl text-gray-700 font-semibold mb-2">
              Premium E-Commerce Platform
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Manage your business efficiently with our powerful admin dashboard. Real-time analytics, inventory management, and seamless order processing all in one place.
            </p>

            {/* Features list */}
            <div className="space-y-4">
              {[
                { icon: "📊", text: "Real-time Analytics & Reports" },
                { icon: "🛒", text: "Complete Order Management" },
                { icon: "👥", text: "User & Vendor Management" },
                { icon: "📦", text: "Inventory Tracking" },
              ].map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <span className="text-2xl">{feature.icon}</span>
                  <span className="text-gray-700 font-medium">{feature.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right side - Login form */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="glass-effect rounded-3xl p-8 lg:p-10 shadow-2xl"
          >
            {/* Logo for mobile */}
            <motion.div variants={itemVariants} className="lg:hidden text-center mb-8">
              <div className="bg-gradient-to-br from-emerald-500 to-green-600 w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-4">
                <span className="text-3xl font-bold text-white">S</span>
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-900 to-green-700 bg-clip-text text-transparent">
                Skaviyo
              </h2>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="text-3xl font-bold text-center text-gray-900 mb-2"
            >
              Welcome Back
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-center text-gray-600 mb-8"
            >
              Sign in to your account to continue
            </motion.p>

            {/* Error message */}
            {error && (
              <motion.div
                variants={itemVariants}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-gradient-to-r from-red-100 to-red-50 text-red-700 rounded-xl text-sm font-medium border border-red-200 flex items-center gap-2"
              >
                <span className="text-lg">⚠️</span>
                {error}
              </motion.div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email input */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <EnvelopeSimple
                    size={20}
                    color="#013b10ff"
                    className="absolute left-4 top-3.5 text-emerald-600 pointer-events-none"
                    weight="duotone"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@skaviyo.com"
                    required
                    className="w-full pl-12 pr-4 py-3 bg-white/80 backdrop-blur border border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none transition-all duration-300 placeholder-gray-400"
                  />
                </div>
              </motion.div>

              {/* Password input */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <LockSimple
                    size={20}
                    className="absolute left-4 top-3.5 text-emerald-600 pointer-events-none"
                    weight="duotone"
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="w-full pl-12 pr-12 py-3 bg-white/80 backdrop-blur border border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none transition-all duration-300 placeholder-gray-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-3.5 text-emerald-600 hover:text-emerald-700 transition-colors"
                  >
                    {showPassword ? (
                      <EyeSlash size={20} weight="duotone" />
                    ) : (
                      <Eye size={20} weight="duotone" />
                    )}
                  </button>
                </div>
              </motion.div>

              {/* Role selector tabs */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Login As
                </label>
                <div className="flex gap-3">
                  <motion.button
                    type="button"
                    onClick={() => setRole("ADMIN")}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                      role === "ADMIN"
                        ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg shadow-emerald-500/50"
                        : "bg-white/60 border border-emerald-200 text-gray-700 hover:bg-white/80 hover:border-emerald-300"
                    }`}
                  >
                    <span>👑</span>
                    <span>Admin</span>
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={() => setRole("VENDOR")}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                      role === "VENDOR"
                        ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg shadow-emerald-500/50"
                        : "bg-white/60 border border-emerald-200 text-gray-700 hover:bg-white/80 hover:border-emerald-300"
                    }`}
                  >
                    <span>🏪</span>
                    <span>Vendor</span>
                  </motion.button>
                </div>
              </motion.div>

              {/* Login button */}
              <motion.button
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-emerald-500 to-green-600 text-white py-3 rounded-xl hover:from-emerald-600 hover:to-green-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-emerald-500/50 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Signing in...
                  </span>
                ) : (
                  "Sign In"
                )}
              </motion.button>
            </form>

            {/* Footer links */}
            <motion.div variants={itemVariants} className="mt-8 pt-6 border-t border-white/40">
              <p className="text-center text-sm text-gray-600">
                Forgot your password?{" "}
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className="text-emerald-600 font-semibold cursor-pointer hover:text-emerald-700 transition-colors"
                >
                  Reset here
                </motion.span>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
