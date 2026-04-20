interface FeaturedProductHighlightProps {
  onViewProduct?: () => void;
}

const FeaturedProductHighlight = ({ onViewProduct }: FeaturedProductHighlightProps) => {
  return (
    <section className="px-4 md:px-8 py-12 md:py-20 bg-gradient-to-r from-emerald-900 via-teal-800 to-emerald-900 rounded-3xl overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left: Image */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-600/20 to-teal-600/20 rounded-2xl blur-3xl" />
            <img
              src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=700&fit=crop"
              alt="Featured Product"
              className="relative w-full rounded-2xl shadow-2xl"
            />
            <div className="absolute top-4 right-4 bg-yellow-600 text-white px-4 py-2 rounded-full text-xs font-bold uppercase">
              Best Seller
            </div>
          </div>

          {/* Right: Content */}
          <div className="text-white">
            <p className="text-sm font-semibold text-yellow-300 uppercase tracking-widest mb-3">
              Signature Piece
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              The <span className="text-yellow-400">Signature White</span>
            </h2>
            <p className="text-lg text-gray-100 mb-6 leading-relaxed">
              Our most iconic piece. Crafted from premium Egyptian cotton with meticulous attention to detail. A wardrobe staple that transcends seasons and trends.
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div>
                <p className="text-sm text-gray-200 mb-1">Premium Material</p>
                <p className="font-semibold text-yellow-300">100% Egyptian Cotton</p>
              </div>
              <div>
                <p className="text-sm text-gray-200 mb-1">Rating</p>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>

            {/* Price & CTA */}
            <div className="flex items-center gap-4 mb-8">
              <div>
                <p className="text-sm text-gray-200 mb-1">Starting from</p>
                <p className="text-3xl font-bold text-yellow-300">₹4,500</p>
              </div>
              <button
                onClick={onViewProduct}
                className="flex-1 px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Explore Now
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 border-t border-gray-600 pt-6">
              <div>
                <p className="text-2xl font-bold text-yellow-300">50K+</p>
                <p className="text-xs text-gray-300">Happy Customers</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-yellow-300">4.9★</p>
                <p className="text-xs text-gray-300">Average Rating</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-yellow-300">1st</p>
                <p className="text-xs text-gray-300">Best Seller</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProductHighlight;
