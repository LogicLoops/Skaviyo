import React from "react";

const Orders: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Orders Management</h1>
      <div className="bg-white rounded-lg shadow">
        <table className="w-full">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Order ID</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Customer</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Amount</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Date</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b hover:bg-gray-50">
              <td className="px-6 py-4 text-sm text-gray-700">#ORD001</td>
              <td className="px-6 py-4 text-sm text-gray-700">John Doe</td>
              <td className="px-6 py-4 text-sm text-gray-700">$99.99</td>
              <td className="px-6 py-4 text-sm text-gray-700">2024-01-15</td>
              <td className="px-6 py-4 text-sm"><span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Pending</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
