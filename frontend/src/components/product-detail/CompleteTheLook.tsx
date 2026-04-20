interface Product {
  id: string;
  name: string;
  price: number;
  rating: number;
  reviews: number;
  images: string[];
}

interface CompleteTheLookProps {
  relatedProducts: Product[];
  onProductClick: (productId: string) => void;
}

const CompleteTheLook = ({ relatedProducts, onProductClick }: CompleteTheLookProps) => {
  if (!relatedProducts || relatedProducts.length === 0) {
    return null;
  }

  return (
    <section className="bg-gradient-to-br from-white via-emerald-50 to-white rounded-3xl border-2 border-gray-100 p-8 md:p-12 shadow-xl">
      <div className="mb-10">
        <p className="text-xs font-bold text-teal-700 uppercase tracking-widest mb-2">
          Curated Selection
        </p>
        <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-3">
          Complete the Look
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl">
          Discover the perfect companion pieces to elevate your style and create a complete wardrobe moment.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {relatedProducts.map((product) => (
          <div
            key={product.id}
            onClick={() => onProductClick(product.id)}
            className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-teal-300 cursor-pointer hover:scale-105 transform"
          >
            {/* Image Container */}
            <div className="relative h-80 bg-gradient-to-br from-gray-100 to-emerald-50 overflow-hidden">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Wishlist Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  console.log('Wishlist clicked:', product.id);
                }}
                className="absolute top-5 right-5 w-12 h-12 bg-white/95 backdrop-blur rounded-full flex items-center justify-center shadow-lg hover:bg-teal-50 hover:scale-110 transition-all duration-300"
              >
                <svg
                  className="w-6 h-6 text-gray-700 hover:text-red-600 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>

              {/* Quick Add Badge */}
              <div className="absolute bottom-5 left-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-teal-700 text-white px-4 py-2 rounded-full text-sm font-bold">
                  ➕ Quick Add
                </div>
              </div>
            </div>

            {/* Info Section */}
            <div className="p-7 md:p-8">
              {/* Product Name */}
              <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-teal-700 transition-colors">
                {product.name}
              </h3>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                  {product.rating} • {product.reviews} reviews
                </span>
              </div>

              {/* Price */}
              <p className="text-2xl font-black text-teal-700 mb-6">
                ₹{product.price.toLocaleString('en-IN')}
              </p>

              {/* CTA Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onProductClick(product.id);
                }}
                className="w-full px-5 py-4 bg-gradient-to-r from-teal-700 to-teal-800 hover:from-teal-800 hover:to-teal-900 text-white font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group/btn"
              >
                <span>View Collection</span>
                <svg className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CompleteTheLook;
