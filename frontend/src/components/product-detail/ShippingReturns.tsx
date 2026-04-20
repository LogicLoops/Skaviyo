interface ShippingReturnsProps {
  shipping: string;
  returns: string;
  isOpen: boolean;
  onToggle: () => void;
}

const ShippingReturns = ({ shipping, returns, isOpen, onToggle }: ShippingReturnsProps) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full px-2 py-1.5 md:px-3 md:py-2 flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <h3 className="text-xs md:text-sm font-bold text-gray-900">Shipping & Returns</h3>
        <svg
          className={`w-4 h-4 text-teal-700 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </button>

      {isOpen && (
        <div className="px-2 py-1.5 md:px-3 md:py-2 border-t border-gray-200 bg-gray-50 space-y-1">
          <div>
            <h4 className="font-semibold text-gray-900 text-xs mb-0.5">Shipping</h4>
            <p className="text-xs text-gray-700 whitespace-pre-line">{shipping}</p>
          </div>
          <div className="border-t border-gray-200 pt-1">
            <h4 className="font-semibold text-gray-900 text-xs mb-0.5">Returns</h4>
            <p className="text-xs text-gray-700 whitespace-pre-line">{returns}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShippingReturns;
