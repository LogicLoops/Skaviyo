import React from "react";

const Vendors: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Vendors Management</h1>
      <div className="bg-white rounded-lg shadow">
        <table className="w-full">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">ID</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Vendor Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Email</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Products</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b hover:bg-gray-50">
              <td className="px-6 py-4 text-sm text-gray-700">1</td>
              <td className="px-6 py-4 text-sm text-gray-700">Fashion Store</td>
              <td className="px-6 py-4 text-sm text-gray-700">vendor@fashion.com</td>
              <td className="px-6 py-4 text-sm text-gray-700">45</td>
              <td className="px-6 py-4 text-sm"><span className="bg-green-100 text-green-800 px-2 py-1 rounded">Active</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Vendors;
