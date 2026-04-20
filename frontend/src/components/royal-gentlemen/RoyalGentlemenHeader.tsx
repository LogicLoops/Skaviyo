interface RoyalGentlemenHeaderProps {
  onBreadcrumbClick?: (section: string) => void;
  onNavigateHome?: () => void;
}

const RoyalGentlemenHeader = ({ onBreadcrumbClick, onNavigateHome }: RoyalGentlemenHeaderProps) => {
  return (
    <section className="px-4 md:px-8 py-8 md:py-12 bg-gradient-to-b from-white to-emerald-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb Navigation */}
        <nav className="mb-8 flex items-center gap-2 text-sm">
          <button
            onClick={() => {
              onNavigateHome?.();
              onBreadcrumbClick?.('home');
            }}
            className="text-teal-700 hover:text-teal-800 transition-colors"
          >
            Home
          </button>
          <span className="text-gray-400">/</span>
          <button
            onClick={() => onBreadcrumbClick?.('collections')}
            className="text-teal-700 hover:text-teal-800 transition-colors"
          >
            Collections
          </button>
          <span className="text-gray-400">/</span>
          <span className="text-gray-600">The Royal Gentlemen</span>
        </nav>

        {/* Main Title */}
        <div className="text-center mb-8">
          <p className="text-sm font-semibold text-teal-700 uppercase tracking-widest mb-3">
            This Season's Elite
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-4">
            The <span className="text-yellow-600">Royal</span> Gentlemen
          </h1>
          
          {/* Collection Description */}
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-6">
            Curated essentials for the discerning gentleman. Experience premium comfort, sophisticated style, and timeless elegance in every piece.
          </p>

          {/* Collection Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-8">
            <div>
              <p className="text-2xl font-bold text-teal-700">150+</p>
              <p className="text-xs text-gray-600 uppercase tracking-wider">Premium Items</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-yellow-600">⭐ 4.9</p>
              <p className="text-xs text-gray-600 uppercase tracking-wider">Customer Rating</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-teal-700">50K+</p>
              <p className="text-xs text-gray-600 uppercase tracking-wider">Happy Customers</p>
            </div>
          </div>
        </div>

        {/* Premium Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3">
          <button className="px-6 py-3 bg-gradient-to-r from-teal-700 to-teal-800 hover:from-teal-800 hover:to-teal-900 text-white rounded-full text-sm font-semibold transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105">
            ✨ All Items
          </button>
          <button className="px-6 py-3 bg-white hover:bg-gradient-to-b hover:from-gray-50 hover:to-white text-gray-900 border-2 border-gray-200 hover:border-teal-300 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer">
            👕 T-Shirts
          </button>
          <button className="px-6 py-3 bg-white hover:bg-gradient-to-b hover:from-gray-50 hover:to-white text-gray-900 border-2 border-gray-200 hover:border-teal-300 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer">
            🎽 Polos
          </button>
          <button className="px-6 py-3 bg-white hover:bg-gradient-to-b hover:from-gray-50 hover:to-white text-gray-900 border-2 border-yellow-300 hover:border-yellow-400 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer">
            💎 Premium
          </button>
          <button className="px-6 py-3 bg-white hover:bg-gradient-to-b hover:from-gray-50 hover:to-white text-gray-900 border-2 border-gray-200 hover:border-teal-300 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer">
            ⭐ Reviews
          </button>
        </div>
      </div>
    </section>
  );
};

export default RoyalGentlemenHeader;
