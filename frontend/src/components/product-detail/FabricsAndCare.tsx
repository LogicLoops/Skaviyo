interface FabricsAndCareProps {
  fabricCare: string;
  isOpen: boolean;
  onToggle: () => void;
}

const FabricsAndCare = ({ fabricCare, isOpen, onToggle }: FabricsAndCareProps) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full px-2 py-1.5 md:px-3 md:py-2 flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <h3 className="text-xs md:text-sm font-bold text-gray-900">Fabrics & Care</h3>
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
        <div className="px-2 py-1.5 md:px-3 md:py-2 border-t border-gray-200 bg-gray-50">
          <p className="text-xs md:text-xs text-gray-700 leading-tight whitespace-pre-line">
            {fabricCare}
          </p>
        </div>
      )}
    </div>
  );
};

export default FabricsAndCare;
