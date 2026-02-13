import React from "react";
import Header from "../components/Header";

const Categories: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 p-8">
      <Header pageTitle="Categories" pageSubtitle="Organize products by category" vendorName="Vendor Manager" />
      <div className="bg-white border border-emerald-200 rounded-2xl p-6 shadow-lg">
        <p className="text-gray-700">Categories panel UI now matches the admin dashboard style.</p>
      </div>
    </div>
  );
};

export default Categories;
