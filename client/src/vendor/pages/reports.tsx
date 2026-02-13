import React from "react";
import Header from "../components/Header";

const Reports: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 p-8">
      <Header pageTitle="Reports" pageSubtitle="Review sales and performance insights" vendorName="Vendor Manager" />
      <div className="bg-white border border-emerald-200 rounded-2xl p-6 shadow-lg">
        <p className="text-gray-700">Reports panel UI now matches the admin dashboard style.</p>
      </div>
    </div>
  );
};

export default Reports;
