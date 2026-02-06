import React from "react";

const Products: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Products Management</h1>
      <div className="bg-white rounded-lg shadow">
        <table className="w-full">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">ID</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Product Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Category</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Price</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Stock</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b hover:bg-gray-50">
              <td className="px-6 py-4 text-sm text-gray-700">1</td>
              <td className="px-6 py-4 text-sm text-gray-700">T-Shirt</td>
              <td className="px-6 py-4 text-sm text-gray-700">Clothing</td>
              <td className="px-6 py-4 text-sm text-gray-700">$19.99</td>
              <td className="px-6 py-4 text-sm text-gray-700">150</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
