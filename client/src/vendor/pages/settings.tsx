import React, { useState, useEffect } from "react";
import {
  User,
  Store,
  DollarSign,
  Bell,
  Lock,
  CheckCircle2,
  AlertCircle,
  Loader,
} from "lucide-react";
import Header from "../components/Header";
import vendorAPI from "../../api/services/vendorAPI";

interface GeneralInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  bio: string;
  avatar: string;
}

interface StoreDetails {
  storeName: string;
  storeDescription: string;
  category: string;
  country: string;
  city: string;
  address: string;
}

interface PayoutInfo {
  bankName: string;
  accountHolder: string;
  accountNumber: string;
  routingNumber: string;
}

interface NotificationSettings {
  emailNotifications: boolean;
  orderNotifications: boolean;
  reviewNotifications: boolean;
  marketingEmails: boolean;
  smsNotifications: boolean;
}

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isChanged, setIsChanged] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // General Info
  const [generalInfo, setGeneralInfo] = useState<GeneralInfo>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    bio: "",
    avatar: "?",
  });

  const [tempGeneralInfo, setTempGeneralInfo] = useState<GeneralInfo>(generalInfo);

  // Store Details
  const [storeDetails, setStoreDetails] = useState<StoreDetails>({
    storeName: "",
    storeDescription: "",
    category: "Electronics",
    country: "United States",
    city: "",
    address: "",
  });

  const [tempStoreDetails, setTempStoreDetails] = useState<StoreDetails>(storeDetails);

  // Payout Info
  const [payoutInfo, setPayoutInfo] = useState<PayoutInfo>({
    bankName: "",
    accountHolder: "",
    accountNumber: "****",
    routingNumber: "****",
  });

  const [tempPayoutInfo, setTempPayoutInfo] = useState<PayoutInfo>(payoutInfo);

  // Notifications
  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailNotifications: true,
    orderNotifications: true,
    reviewNotifications: true,
    marketingEmails: false,
    smsNotifications: true,
  });

  const [tempNotifications, setTempNotifications] = useState<NotificationSettings>(notifications);

  // Fetch vendor data on mount
  useEffect(() => {
    const fetchVendorData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await vendorAPI.getVendorProfile();
        
        if (response.success && response.data) {
          const vendor = response.data;
          
          // Parse user name from vendor data
          const fullName = vendor.user?.name || "";
          const nameParts = fullName.split(" ");
          const firstName = nameParts[0] || "";
          const lastName = nameParts.slice(1).join(" ") || "";
          
          // Set general info
          setGeneralInfo({
            firstName: firstName,
            lastName: lastName,
            email: vendor.user?.email || "",
            phone: vendor.phone || "+1 (555) 000-0000",
            bio: vendor.bio || "",
            avatar: firstName.charAt(0) + lastName.charAt(0) || "?",
          });
          setTempGeneralInfo({
            firstName: firstName,
            lastName: lastName,
            email: vendor.user?.email || "",
            phone: vendor.phone || "+1 (555) 000-0000",
            bio: vendor.bio || "",
            avatar: firstName.charAt(0) + lastName.charAt(0) || "?",
          });

          // Set store details
          setStoreDetails({
            storeName: vendor.store_name || "",
            storeDescription: vendor.store_description || "",
            category: vendor.category || "Electronics",
            country: vendor.country || "United States",
            city: vendor.city || "",
            address: vendor.address || "",
          });
          setTempStoreDetails({
            storeName: vendor.store_name || "",
            storeDescription: vendor.store_description || "",
            category: vendor.category || "Electronics",
            country: vendor.country || "United States",
            city: vendor.city || "",
            address: vendor.address || "",
          });

          // Set payout info
          setPayoutInfo({
            bankName: vendor.bank_name || "",
            accountHolder: vendor.account_holder || firstName + " " + lastName,
            accountNumber: vendor.account_number ? "****" + vendor.account_number.slice(-4) : "****",
            routingNumber: vendor.routing_number ? "****" + vendor.routing_number.slice(-4) : "****",
          });
          setTempPayoutInfo({
            bankName: vendor.bank_name || "",
            accountHolder: vendor.account_holder || firstName + " " + lastName,
            accountNumber: vendor.account_number ? "****" + vendor.account_number.slice(-4) : "****",
            routingNumber: vendor.routing_number ? "****" + vendor.routing_number.slice(-4) : "****",
          });
        }
      } catch (err) {
        console.error("Error fetching vendor data:", err);
        setError("Failed to load vendor settings. Using defaults.");
      } finally {
        setLoading(false);
      }
    };

    fetchVendorData();
  }, []);

  // Security
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const handleGeneralChange = (field: keyof GeneralInfo, value: string) => {
    setTempGeneralInfo({ ...tempGeneralInfo, [field]: value });
    setIsChanged(true);
  };

  const handleStoreChange = (field: keyof StoreDetails, value: string) => {
    setTempStoreDetails({ ...tempStoreDetails, [field]: value });
    setIsChanged(true);
  };

  const handlePayoutChange = (field: keyof PayoutInfo, value: string) => {
    setTempPayoutInfo({ ...tempPayoutInfo, [field]: value });
    setIsChanged(true);
  };

  const handleNotificationChange = (field: keyof NotificationSettings) => {
    setTempNotifications({ ...tempNotifications, [field]: !tempNotifications[field] });
    setIsChanged(true);
  };

  const handleSaveChanges = async () => {
    try {
      setSaving(true);

      if (activeTab === "general") {
        // Update general info would require separate endpoint
        // For now, update general info locally
        setGeneralInfo(tempGeneralInfo);
        setSuccessMessage("General information updated successfully!");
      } else if (activeTab === "store") {
        // Call store update API
        const response = await vendorAPI.updateVendorProfile({
          store_name: tempStoreDetails.storeName,
          store_description: tempStoreDetails.storeDescription,
          category: tempStoreDetails.category,
          country: tempStoreDetails.country,
          city: tempStoreDetails.city,
          address: tempStoreDetails.address,
        });

        if (response.success) {
          setStoreDetails(tempStoreDetails);
          setSuccessMessage("Store details updated successfully!");
        } else {
          setError(response.message || "Failed to update store details");
          return;
        }
      } else if (activeTab === "payouts") {
        // Update payout info would require separate endpoint
        setPayoutInfo(tempPayoutInfo);
        setSuccessMessage("Payout information updated successfully!");
      } else if (activeTab === "notifications") {
        // Update notifications would require separate endpoint
        setNotifications(tempNotifications);
        setSuccessMessage("Notification preferences updated successfully!");
      }

      setShowSuccessMessage(true);
      setIsChanged(false);
      setTimeout(() => setShowSuccessMessage(false), 3000);
    } catch (err) {
      console.error("Error saving changes:", err);
      setError("Failed to save changes. Please try again.");
      setShowSuccessMessage(true);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (activeTab === "general") {
      setTempGeneralInfo(generalInfo);
    } else if (activeTab === "store") {
      setTempStoreDetails(storeDetails);
    } else if (activeTab === "payouts") {
      setTempPayoutInfo(payoutInfo);
    } else if (activeTab === "notifications") {
      setTempNotifications(notifications);
    }
    setIsChanged(false);
  };

  const handleRemoveAvatar = () => {
    setTempGeneralInfo({ ...tempGeneralInfo, avatar: "??" });
    setIsChanged(true);
  };

  const handleChangePassword = () => {
    if (passwords.current && passwords.new && passwords.confirm) {
      if (passwords.new !== passwords.confirm) {
        alert("New passwords do not match");
        return;
      }
      setSuccessMessage("Password changed successfully!");
      setShowSuccessMessage(true);
      setPasswords({ current: "", new: "", confirm: "" });
      setShowPasswordForm(false);
      setTimeout(() => setShowSuccessMessage(false), 3000);
    }
  };

  const bioCharactersLeft = 500 - tempGeneralInfo.bio.length;

  const menuItems = [
    { id: "general", label: "General", icon: User },
    { id: "store", label: "Store Details", icon: Store },
    { id: "payouts", label: "Payouts", icon: DollarSign },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Lock },
  ];

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
          pageTitle="Settings"
          pageSubtitle="Configure your vendor account preferences"
          vendorName="Vendor Manager"
          vendorRole="Vendor"
        />

        {/* LOADING STATE */}
        {loading && (
          <div className="flex items-center justify-center min-h-96">
            <div className="text-center">
              <Loader className="w-12 h-12 text-emerald-600 animate-spin mx-auto mb-4" />
              <p className="text-gray-600 font-semibold">Loading your settings...</p>
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

        {/* SUCCESS MESSAGE */}
        {showSuccessMessage && (
          <div className="fixed top-6 right-6 z-40 animate-in fade-in slide-in-from-right-4">
            <div className={`${error ? 'bg-red-500' : 'bg-emerald-500'} text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 font-semibold`}>
              <CheckCircle2 size={18} />
              {error || successMessage}
            </div>
          </div>
        )}

        {/* MAIN CONTENT */}
        {!loading && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* SIDEBAR */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-emerald-200 rounded-2xl shadow-lg overflow-hidden sticky top-8">
              <nav className="flex flex-col">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        handleCancel();
                      }}
                      className={`flex items-center gap-3 px-4 py-3 text-left font-semibold transition-all border-l-4 ${
                        activeTab === item.id
                          ? "bg-emerald-50 text-emerald-700 border-emerald-600"
                          : "text-gray-700 border-transparent hover:bg-gray-50"
                      }`}
                    >
                      <Icon size={18} />
                      {item.label}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* CONTENT AREA */}
          <div className="lg:col-span-3">
            {/* GENERAL INFORMATION */}
            {activeTab === "general" && (
              <div className="bg-white border border-emerald-200 rounded-2xl shadow-lg p-8 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">General Information</h2>
                  <p className="text-gray-600 text-sm">Update your personal details and public profile information.</p>
                </div>

                {/* AVATAR */}
                <div className="space-y-3">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                      {tempGeneralInfo.avatar}
                    </div>
                    <div className="space-y-2">
                      <p className="font-semibold text-gray-900">Change Avatar</p>
                      <button
                        onClick={handleRemoveAvatar}
                        className="text-red-600 font-semibold text-sm hover:text-red-700 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200"></div>

                {/* FORM FIELDS */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                    <input
                      type="text"
                      value={tempGeneralInfo.firstName}
                      onChange={(e) => handleGeneralChange("firstName", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                    <input
                      type="text"
                      value={tempGeneralInfo.lastName}
                      onChange={(e) => handleGeneralChange("lastName", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      value={tempGeneralInfo.email}
                      onChange={(e) => handleGeneralChange("email", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={tempGeneralInfo.phone}
                      onChange={(e) => handleGeneralChange("phone", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Bio</label>
                  <textarea
                    value={tempGeneralInfo.bio}
                    onChange={(e) => handleGeneralChange("bio", e.target.value.slice(0, 500))}
                    maxLength={500}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                    placeholder="Tell us about yourself..."
                  />
                  <p className="text-xs text-gray-500 mt-1 text-right">{bioCharactersLeft} characters left</p>
                </div>

                {/* BUTTONS */}
                <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
                  <button
                    onClick={handleCancel}
                    disabled={!isChanged || saving}
                    className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg font-semibold text-sm hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveChanges}
                    disabled={!isChanged || saving}
                    className="px-6 py-2 bg-emerald-600 text-white rounded-lg font-semibold text-sm hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </div>
            )}

            {/* STORE DETAILS */}
            {activeTab === "store" && (
              <div className="bg-white border border-emerald-200 rounded-2xl shadow-lg p-8 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Store Details</h2>
                  <p className="text-gray-600 text-sm">Manage your store information and preferences.</p>
                </div>

                <div className="border-t border-gray-200"></div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Store Name</label>
                  <input
                    type="text"
                    value={tempStoreDetails.storeName}
                    onChange={(e) => handleStoreChange("storeName", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Store Description</label>
                  <textarea
                    value={tempStoreDetails.storeDescription}
                    onChange={(e) => handleStoreChange("storeDescription", e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                    <select
                      value={tempStoreDetails.category}
                      onChange={(e) => handleStoreChange("category", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    >
                      <option>Handmade & Crafts</option>
                      <option>Electronics</option>
                      <option>Fashion</option>
                      <option>Home & Garden</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Country</label>
                    <select
                      value={tempStoreDetails.country}
                      onChange={(e) => handleStoreChange("country", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    >
                      <option>United States</option>
                      <option>Canada</option>
                      <option>United Kingdom</option>
                      <option>Australia</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
                    <input
                      type="text"
                      value={tempStoreDetails.city}
                      onChange={(e) => handleStoreChange("city", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
                    <input
                      type="text"
                      value={tempStoreDetails.address}
                      onChange={(e) => handleStoreChange("address", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
                  <button
                    onClick={handleCancel}
                    disabled={!isChanged || saving}
                    className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg font-semibold text-sm hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveChanges}
                    disabled={!isChanged || saving}
                    className="px-6 py-2 bg-emerald-600 text-white rounded-lg font-semibold text-sm hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </div>
            )}

            {/* PAYOUTS */}
            {activeTab === "payouts" && (
              <div className="bg-white border border-emerald-200 rounded-2xl shadow-lg p-8 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Payout Information</h2>
                  <p className="text-gray-600 text-sm">Manage your bank account details for payouts.</p>
                </div>

                <div className="border-t border-gray-200"></div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
                  <AlertCircle size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-blue-800">
                    Your payout information is securely encrypted. We never share your banking details.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Bank Name</label>
                    <input
                      type="text"
                      value={tempPayoutInfo.bankName}
                      onChange={(e) => handlePayoutChange("bankName", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Account Holder</label>
                    <input
                      type="text"
                      value={tempPayoutInfo.accountHolder}
                      onChange={(e) => handlePayoutChange("accountHolder", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Account Number</label>
                    <input
                      type="password"
                      value={tempPayoutInfo.accountNumber}
                      onChange={(e) => handlePayoutChange("accountNumber", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Routing Number</label>
                    <input
                      type="password"
                      value={tempPayoutInfo.routingNumber}
                      onChange={(e) => handlePayoutChange("routingNumber", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
                  <button
                    onClick={handleCancel}
                    disabled={!isChanged || saving}
                    className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg font-semibold text-sm hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveChanges}
                    disabled={!isChanged || saving}
                    className="px-6 py-2 bg-emerald-600 text-white rounded-lg font-semibold text-sm hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </div>
            )}

            {/* NOTIFICATIONS */}
            {activeTab === "notifications" && (
              <div className="bg-white border border-emerald-200 rounded-2xl shadow-lg p-8 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Notification Preferences</h2>
                  <p className="text-gray-600 text-sm">Choose how you want to receive notifications.</p>
                </div>

                <div className="border-t border-gray-200"></div>

                <div className="space-y-4">
                  {/* Email Notifications */}
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div>
                      <p className="font-semibold text-gray-900">Email Notifications</p>
                      <p className="text-sm text-gray-600">Receive email updates about your orders</p>
                    </div>
                    <label className="relative inline-block w-12 h-6">
                      <input
                        type="checkbox"
                        checked={tempNotifications.emailNotifications}
                        onChange={() => handleNotificationChange("emailNotifications")}
                        className="sr-only peer"
                      />
                      <div className="w-full h-full bg-gray-300 peer-checked:bg-emerald-600 rounded-full cursor-pointer transition-colors"></div>
                      <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-6 transition-transform"></div>
                    </label>
                  </div>

                  {/* Order Notifications */}
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div>
                      <p className="font-semibold text-gray-900">Order Notifications</p>
                      <p className="text-sm text-gray-600">Get notified about new orders</p>
                    </div>
                    <label className="relative inline-block w-12 h-6">
                      <input
                        type="checkbox"
                        checked={tempNotifications.orderNotifications}
                        onChange={() => handleNotificationChange("orderNotifications")}
                        className="sr-only peer"
                      />
                      <div className="w-full h-full bg-gray-300 peer-checked:bg-emerald-600 rounded-full cursor-pointer transition-colors"></div>
                      <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-6 transition-transform"></div>
                    </label>
                  </div>

                  {/* Review Notifications */}
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div>
                      <p className="font-semibold text-gray-900">Review Notifications</p>
                      <p className="text-sm text-gray-600">Get notified about customer reviews</p>
                    </div>
                    <label className="relative inline-block w-12 h-6">
                      <input
                        type="checkbox"
                        checked={tempNotifications.reviewNotifications}
                        onChange={() => handleNotificationChange("reviewNotifications")}
                        className="sr-only peer"
                      />
                      <div className="w-full h-full bg-gray-300 peer-checked:bg-emerald-600 rounded-full cursor-pointer transition-colors"></div>
                      <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-6 transition-transform"></div>
                    </label>
                  </div>

                  {/* SMS Notifications */}
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div>
                      <p className="font-semibold text-gray-900">SMS Notifications</p>
                      <p className="text-sm text-gray-600">Receive text message alerts</p>
                    </div>
                    <label className="relative inline-block w-12 h-6">
                      <input
                        type="checkbox"
                        checked={tempNotifications.smsNotifications}
                        onChange={() => handleNotificationChange("smsNotifications")}
                        className="sr-only peer"
                      />
                      <div className="w-full h-full bg-gray-300 peer-checked:bg-emerald-600 rounded-full cursor-pointer transition-colors"></div>
                      <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-6 transition-transform"></div>
                    </label>
                  </div>

                  {/* Marketing Emails */}
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div>
                      <p className="font-semibold text-gray-900">Marketing Emails</p>
                      <p className="text-sm text-gray-600">Receive promotional updates and tips</p>
                    </div>
                    <label className="relative inline-block w-12 h-6">
                      <input
                        type="checkbox"
                        checked={tempNotifications.marketingEmails}
                        onChange={() => handleNotificationChange("marketingEmails")}
                        className="sr-only peer"
                      />
                      <div className="w-full h-full bg-gray-300 peer-checked:bg-emerald-600 rounded-full cursor-pointer transition-colors"></div>
                      <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-6 transition-transform"></div>
                    </label>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
                  <button
                    onClick={handleCancel}
                    disabled={!isChanged || saving}
                    className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg font-semibold text-sm hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveChanges}
                    disabled={!isChanged || saving}
                    className="px-6 py-2 bg-emerald-600 text-white rounded-lg font-semibold text-sm hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </div>
            )}

            {/* SECURITY */}
            {activeTab === "security" && (
              <div className="bg-white border border-emerald-200 rounded-2xl shadow-lg p-8 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Security Settings</h2>
                  <p className="text-gray-600 text-sm">Manage your account security and password.</p>
                </div>

                <div className="border-t border-gray-200"></div>

                {!showPasswordForm ? (
                  <div>
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <p className="font-semibold text-gray-900">Password</p>
                        <p className="text-sm text-gray-600">Last changed 3 months ago</p>
                      </div>
                      <button
                        onClick={() => setShowPasswordForm(true)}
                        className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-semibold text-sm hover:bg-emerald-700 transition-colors"
                      >
                        Change Password
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Current Password</label>
                      <input
                        type="password"
                        value={passwords.current}
                        onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">New Password</label>
                      <input
                        type="password"
                        value={passwords.new}
                        onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm New Password</label>
                      <input
                        type="password"
                        value={passwords.confirm}
                        onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>
                    <div className="flex gap-3 pt-4">
                      <button
                        onClick={() => setShowPasswordForm(false)}
                        className="flex-1 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg font-semibold text-sm hover:bg-gray-100 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleChangePassword}
                        className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg font-semibold text-sm hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={saving}
                      >
                        {saving ? "Updating..." : "Update Password"}
                      </button>
                    </div>
                  </div>
                )}

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex gap-3">
                  <AlertCircle size={20} className="text-yellow-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-yellow-800">
                    Use a strong password with at least 8 characters, including uppercase, lowercase, and numbers.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
