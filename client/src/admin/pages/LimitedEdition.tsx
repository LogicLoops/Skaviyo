import React from "react";

const LimitedEdition: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Limited Edition Items</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="h-48 bg-gray-200 flex items-center justify-center">
            <p className="text-gray-500">Product Image</p>
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-gray-800">Limited Item 1</h3>
            <p className="text-sm text-gray-500 mt-1">Only 5 left in stock</p>
            <p className="text-lg font-bold text-green-600 mt-2">$299.99</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LimitedEdition;
