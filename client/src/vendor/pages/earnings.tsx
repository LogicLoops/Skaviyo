import React, { useState, useEffect } from "react";
import {
  DollarSign,
  Download,
  FileText,
  Zap,
  X,
  CheckCircle2,
  CreditCard,
  Building2,
  Plus,
  Loader,
  AlertCircle,
} from "lucide-react";
import Header from "../components/Header";
import vendorAPI from "../../api/services/vendorAPI";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

interface RevenueData {
  month: string;
  revenue: number;
  projected: number;
}

interface PayoutMethod {
  id: string;
  name: string;
  type: "bank" | "card";
  last4: string;
  speed: string;
  fee: string;
  icon: React.ReactNode;
}

const glassEffect = "bg-white border border-emerald-200 rounded-2xl shadow-lg hover:shadow-xl transition-all";

const Earnings: React.FC = () => {
  const [earnings, setEarnings] = useState({
    totalRevenue: 0,
    availableBalance: 0,
    pendingClearance: 0,
    nextPayoutDate: "",
  });
  const [revenueChartData, setRevenueChartData] = useState<RevenueData[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [selectedMethod, setSelectedMethod] = useState("bank");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showAddMethod, setShowAddMethod] = useState(false);
  const [newMethodName, setNewMethodName] = useState("");
  const [newMethodType, setNewMethodType] = useState("bank");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch earnings and revenue data
  useEffect(() => {
    const fetchEarningsData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch earnings summary
        const earningsResponse = await vendorAPI.getVendorEarnings();
        if (earningsResponse.success && earningsResponse.data) {
          setEarnings({
            totalRevenue: earningsResponse.data.totalRevenue || 0,
            availableBalance: earningsResponse.data.availableBalance || 0,
            pendingClearance: earningsResponse.data.pendingClearance || 0,
            nextPayoutDate: earningsResponse.data.payoutDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
          });
          setWithdrawAmount(Math.floor((earningsResponse.data.availableBalance || 0) / 2));
        }

        // Fetch revenue chart data
        const revenueResponse = await vendorAPI.getRevenueChartData();
        if (revenueResponse.success && revenueResponse.data) {
          setRevenueChartData(revenueResponse.data);
        }

        // Fetch transactions
        const transactionsResponse = await vendorAPI.getTransactionHistory();
        if (transactionsResponse.success && transactionsResponse.data) {
          const txns = transactionsResponse.data.map((txn: any) => ({
            id: txn.id,
            date: new Date(txn.date).toLocaleDateString(),
            txnId: `TXN-${txn.id}`,
            description: txn.description || "Transaction",
            type: txn.type || "Credit",
            amount: txn.amount || 0,
            status: txn.status || "Pending",
            color: txn.status === "Pending" ? "yellow" : "emerald",
          }));
          setTransactions(txns);
        }
      } catch (err) {
        console.error("Error fetching earnings data:", err);
        setError("Failed to load earnings data");
      } finally {
        setLoading(false);
      }
    };

    fetchEarningsData();
  }, []);

  const fee = Math.round((withdrawAmount * 0.01) * 100) / 100;
  const netAmount = withdrawAmount - fee;

  const payoutMethods: PayoutMethod[] = [
    {
      id: "bank",
      name: "Chase Bank",
      type: "bank",
      last4: "4291",
      speed: "Instant",
      fee: "1%",
      icon: <Building2 size={18} />,
    },
    {
      id: "card",
      name: "Visa Debit",
      type: "card",
      last4: "8822",
      speed: "1-3 days",
      fee: "1%",
      icon: <CreditCard size={18} />,
    },
  ];

  // Download Statement
  const handleDownloadStatement = () => {
    const csvContent = [
      ["Date", "Transaction ID", "Description", "Type", "Amount", "Status"],
      ...transactions.map((t) => [
        t.date,
        t.txnId,
        t.description,
        t.type,
        `$${Math.abs(t.amount).toFixed(2)}`,
        t.status,
      ]),
    ]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `earnings_statement_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    setSuccessMessage("Statement downloaded successfully!");
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  // Handle Withdrawal
  const handleConfirmWithdraw = () => {
    if (withdrawAmount < 50) {
      alert("Minimum withdrawal is $50.00");
      return;
    }

    if (withdrawAmount > earnings.availableBalance) {
      alert("Insufficient balance");
      return;
    }

    // Update earnings
    setEarnings({
      ...earnings,
      availableBalance: earnings.availableBalance - netAmount,
      pendingClearance: earnings.pendingClearance + netAmount,
    });

    // Add transaction
    const newTransaction = {
      id: transactions.length + 1,
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      txnId: `TXN-${Math.floor(Math.random() * 100000)}`,
      description: `Withdrawal to ${
        selectedMethod === "bank" ? "Chase Bank" : "Visa"
      } •••••${payoutMethods.find((m) => m.id === selectedMethod)?.last4}`,
      type: "Payout",
      amount: -withdrawAmount,
      status: "Processing",
      color: "yellow",
    };

    setTransactions([newTransaction, ...transactions]);

    setSuccessMessage(
      `Withdrawal of $${netAmount.toFixed(2)} initiated successfully!`
    );
    setShowSuccessMessage(true);

    setTimeout(() => {
      setShowWithdraw(false);
      setWithdrawAmount(2500);
      setSuccessMessage("");
    }, 2000);
  };

  // Add New Payout Method
  const handleAddMethod = () => {
    if (newMethodName.trim()) {
      setSuccessMessage("Payout method added successfully!");
      setShowSuccessMessage(true);
      setShowAddMethod(false);
      setNewMethodName("");
      setTimeout(() => setShowSuccessMessage(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 overflow-hidden">
      <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <div className="h-screen overflow-y-auto scrollbar-hide p-8">
        {/* HEADER */}
        <Header
          pageTitle="Earnings"
          pageSubtitle="Track your revenue and detailed earnings"
          vendorName="Vendor Manager"
          vendorRole="Vendor"
        />

        {/* LOADING STATE */}
        {loading && (
          <div className="flex items-center justify-center min-h-96">
            <div className="text-center">
              <Loader className="w-12 h-12 text-emerald-600 animate-spin mx-auto mb-4" />
              <p className="text-gray-600 font-semibold">Loading earnings data...</p>
            </div>
          </div>
        )}

        {/* ERROR STATE */}
        {error && !loading && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3">
            <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {/* CONTENT */}
        {!loading && (
        <>
        {/* SUCCESS MESSAGE */}
        {showSuccessMessage && (
          <div className="fixed top-6 right-6 z-40 animate-in fade-in slide-in-from-right-4">
            <div className="bg-emerald-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 font-semibold">
              <CheckCircle2 size={18} />
              {successMessage}
            </div>
          </div>
        )}

        {/* ACTION BUTTONS */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={handleDownloadStatement}
            className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg font-semibold text-sm hover:bg-gray-50 transition-colors"
          >
            <FileText size={18} />
            Statement
          </button>
          <button
            onClick={() => setShowWithdraw(true)}
            className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-lg font-semibold text-sm hover:bg-emerald-700 transition-colors"
          >
            <Zap size={18} />
            Withdraw Funds
          </button>
        </div>

        {/* KPI CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className={`${glassEffect} p-6`}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-600 text-xs font-semibold">TOTAL REVENUE</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  ${earnings.totalRevenue.toLocaleString()}
                </p>
              </div>
              <div className="bg-yellow-50 p-3 rounded-xl text-yellow-600 border border-yellow-200">
                <DollarSign size={20} />
              </div>
            </div>
          </div>

          <div className={`${glassEffect} p-6`}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-600 text-xs font-semibold">AVAILABLE BALANCE</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  ${earnings.availableBalance.toLocaleString()}
                </p>
              </div>
              <div className="bg-blue-50 p-3 rounded-xl text-blue-600 border border-blue-200">
                <DollarSign size={20} />
              </div>
            </div>
          </div>

          <div className={`${glassEffect} p-6`}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-600 text-xs font-semibold">PENDING CLEARANCE</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  ${earnings.pendingClearance.toLocaleString()}
                </p>
              </div>
              <div className="bg-yellow-50 p-3 rounded-xl text-yellow-600 border border-yellow-200">
                <DollarSign size={20} />
              </div>
            </div>
          </div>

          <div className={`${glassEffect} p-6`}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-600 text-xs font-semibold">NEXT PAYOUT</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {earnings.nextPayoutDate}
                </p>
              </div>
              <div className="bg-emerald-50 p-3 rounded-xl text-emerald-600 border border-emerald-200">
                <DollarSign size={20} />
              </div>
            </div>
          </div>
        </div>

        {/* CHART */}
        <div className={`${glassEffect} p-8 mb-10`}>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Revenue Analytics</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #10B981",
                    borderRadius: "8px",
                  }}
                  formatter={(value) => `$${typeof value === 'number' ? value.toLocaleString() : value}`}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#10B981"
                  strokeWidth={2}
                  dot={false}
                  name="Actual Revenue"
                />
                <Line
                  type="monotone"
                  dataKey="projected"
                  stroke="#D1D5DB"
                  strokeWidth={2}
                  dot={false}
                  name="Projected Revenue"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* TRANSACTIONS TABLE */}
        <div className={`${glassEffect} p-8`}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Recent Transactions</h2>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold text-sm hover:bg-gray-200 transition-colors">
              <Download size={16} />
              Filter
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-gray-300">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Date</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Transaction ID</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Description</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Type</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Amount</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Status</th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((txn) => (
                  <tr key={txn.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">{txn.date}</td>
                    <td className="px-4 py-3 font-mono text-gray-600">{txn.txnId}</td>
                    <td className="px-4 py-3">{txn.description}</td>
                    <td className={`px-4 py-3 ${txn.amount > 0 ? "text-emerald-600" : "text-red-600"}`}>
                      {txn.type}
                    </td>
                    <td className={`px-4 py-3 font-semibold ${txn.amount > 0 ? "text-emerald-600" : "text-red-600"}`}>
                      {txn.amount > 0 ? "+" : ""} ${Math.abs(txn.amount).toFixed(2)}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          txn.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : txn.status === "Processed"
                            ? "bg-blue-100 text-blue-700"
                            : txn.status === "Cleared"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {txn.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button className="text-gray-400 hover:text-gray-600 transition-colors font-bold text-lg">
                        ⋯
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        </>
        )}

      {/* WITHDRAW MODAL OVERLAY */}
      {showWithdraw && (
        <div
          className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-4"
          onClick={() => setShowWithdraw(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl border border-emerald-100 w-full max-w-3xl max-h-[90vh] overflow-y-auto scrollbar-hide"
            onClick={(e) => e.stopPropagation()}
          >
            {/* HEADER */}
            <div className="flex justify-between items-start px-6 py-5 border-b border-gray-200 sticky top-0 bg-white z-10">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Withdraw funds</h3>
                <p className="text-sm text-gray-500">Move your available balance to your preferred payout method.</p>
              </div>
              <button
                onClick={() => setShowWithdraw(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* CONTENT */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 py-6">
              {/* LEFT */}
              <div className="space-y-5">
                {/* Amount */}
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700">Amount</span>
                    <span className="text-xs text-gray-500">
                      Available: ${earnings.availableBalance.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 border border-emerald-300 rounded-xl px-3 py-2 bg-emerald-50">
                    <span className="text-xs font-bold px-2 py-1 rounded bg-emerald-600 text-white">USD</span>
                    <input
                      type="number"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(Number(e.target.value))}
                      className="flex-1 bg-transparent text-2xl font-bold text-emerald-700 outline-none"
                    />
                    <button
                      onClick={() => setWithdrawAmount(earnings.availableBalance)}
                      className="text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
                    >
                      Max
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Minimum withdrawal is $50.00</p>
                </div>

                {/* Method */}
                <div className="space-y-3">
                  <p className="text-xs font-bold text-gray-600 uppercase">Payout method</p>

                  {payoutMethods.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setSelectedMethod(method.id)}
                      className={`w-full flex items-center justify-between gap-3 border rounded-xl px-4 py-3 transition-all ${
                        selectedMethod === method.id
                          ? "border-emerald-400 bg-emerald-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-emerald-100 text-emerald-700">
                          {method.icon}
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-semibold">
                            {method.name} •••• {method.last4}
                          </p>
                          <p className="text-xs text-gray-500">
                            {method.speed} • {method.fee} fee
                          </p>
                        </div>
                      </div>
                      <input
                        type="radio"
                        checked={selectedMethod === method.id}
                        readOnly
                        className="cursor-pointer"
                      />
                    </button>
                  ))}

                  <button
                    onClick={() => setShowAddMethod(true)}
                    className="w-full flex items-center gap-2 border border-dashed border-gray-300 rounded-xl px-4 py-3 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    <Plus size={16} />
                    Add new payout method
                  </button>
                </div>
              </div>

              {/* RIGHT */}
              <div className="space-y-4">
                <div className="border border-emerald-200 rounded-xl p-4 bg-emerald-50">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Withdrawal amount</span>
                      <span className="font-bold">${withdrawAmount.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-emerald-200"></div>
                    <div className="flex justify-between">
                      <span>Instant transfer fee (1%)</span>
                      <span className="font-bold">-${fee.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-emerald-200"></div>
                    <div className="flex justify-between font-bold text-emerald-700">
                      <span>You will receive</span>
                      <span>${netAmount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 border border-emerald-200 rounded-xl p-4 bg-emerald-50/50">
                  <CheckCircle2 size={20} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-gray-700">
                    Funds usually arrive within a few minutes for instant transfers.
                  </p>
                </div>
              </div>
            </div>

            {/* FOOTER */}
            <div className="flex justify-between items-center px-6 py-4 border-t border-gray-200 bg-gray-50 sticky bottom-0">
              <p className="text-xs text-gray-500">Next scheduled payout: {earnings.nextPayoutDate}</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowWithdraw(false)}
                  className="px-6 py-2 bg-white border border-gray-300 rounded-lg font-semibold text-sm hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmWithdraw}
                  className="px-6 py-2 bg-emerald-600 text-white rounded-lg font-semibold text-sm hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={withdrawAmount < 50 || withdrawAmount > earnings.availableBalance}
                >
                  Confirm & withdraw
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ADD PAYOUT METHOD MODAL */}
      {showAddMethod && (
        <div
          className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-4"
          onClick={() => setShowAddMethod(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl border border-emerald-100 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start px-6 py-5 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-900">Add payout method</h3>
              <button
                onClick={() => setShowAddMethod(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>

            <div className="px-6 py-6 space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Method Name</label>
                <input
                  type="text"
                  value={newMethodName}
                  onChange={(e) => setNewMethodName(e.target.value)}
                  placeholder="e.g., My Savings Account"
                  className="w-full px-4 py-2 border border-emerald-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Type</label>
                <select
                  value={newMethodType}
                  onChange={(e) => setNewMethodType(e.target.value)}
                  className="w-full px-4 py-2 border border-emerald-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="bank">Bank Account</option>
                  <option value="card">Debit Card</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowAddMethod(false)}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold text-sm hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddMethod}
                  className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg font-semibold text-sm hover:bg-emerald-700 transition-colors disabled:opacity-50"
                  disabled={!newMethodName.trim()}
                >
                  Add Method
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default Earnings;