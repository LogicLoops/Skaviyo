interface ProductData {
  id: string;
  name: string;
  price: number;
  image: string;
  colors?: string[];
  badge?: 'bestseller' | 'limited' | 'new' | 'featured';
}

interface FeaturedProductsProps {
  onProductClick?: (product: ProductData) => void;
  onAddToCart?: (product: ProductData) => void;
  onViewDetails?: (product: ProductData) => void;
}

const FeaturedProducts = ({
  onProductClick,
  onAddToCart,
  onViewDetails,
}: FeaturedProductsProps) => {
  const products: ProductData[] = [
    {
      id: 'classic-white',
      name: 'The Signature White',
      price: 4500,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=600&fit=crop',
      colors: ['white', 'black', 'navy'],
      badge: 'bestseller',
    },
    {
      id: 'emerald-tee',
      name: 'Royal Emerald Tee',
      price: 3999,
      image: 'https://images.unsplash.com/photo-1512990415879-d21964eb0560?w=500&h=600&fit=crop',
      colors: ['emerald', 'teal'],
      badge: 'featured',
    },
    {
      id: 'blue-print',
      name: 'Royal Blue Print',
      price: 4299,
      image: 'https://images.unsplash.com/photo-1473966699461-d1d8cc4b2e16?w=500&h=600&fit=crop',
      colors: ['blue', 'navy', 'white'],
      badge: 'limited',
    },
  ];

  const getBadgeColor = (badgeType?: string) => {
    switch (badgeType) {
      case 'bestseller':
        return 'bg-yellow-600';
      case 'limited':
        return 'bg-red-600';
      case 'new':
        return 'bg-teal-700';
      default:
        return 'bg-yellow-600';
    }
  };

  const getBadgeText = (badgeType?: string) => {
    switch (badgeType) {
      case 'bestseller':
        return '⭐ Best Seller';
      case 'limited':
        return '🔥 Limited';
      case 'new':
        return '✨ New';
      default:
        return 'Featured';
    }
  };

  return (
    <section className="px-4 md:px-8 py-10 md:py-14 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Featured Tag */}
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-yellow-100/50 border border-yellow-300/50 mb-8">
          <span className="text-xs font-semibold text-yellow-700 uppercase tracking-wider">
            Featured Collection
          </span>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-yellow-200 flex flex-col"
            >
              {/* Product Image */}
              <div
                className="relative h-80 bg-gray-100 overflow-hidden cursor-pointer"
                onClick={() => onProductClick?.(product)}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                {/* Badge */}
                <div className={`absolute top-4 right-4 ${getBadgeColor(product.badge)} text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg`}>
                  {getBadgeText(product.badge)}
                </div>

                {/* Wishlist Button */}
                <button
                  className="absolute top-4 left-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-yellow-50 transition-colors"
                  aria-label="Add to wishlist"
                >
                  <svg
                    className="w-5 h-5 text-gray-600 hover:text-yellow-600"
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
              </div>

              {/* Product Info */}
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                  {product.name}
                </h3>

                {/* Colors */}
                {product.colors && (
                  <div className="flex gap-2 mb-4">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        className="w-5 h-5 rounded-full border-2 border-gray-200 hover:border-gray-400 transition-colors capitalize"
                        style={{
                          backgroundColor:
                            color === 'emerald'
                              ? '#065F46'
                              : color === 'teal'
                                ? '#0d9488'
                                : color === 'navy'
                                  ? '#001f3f'
                                  : color === 'blue'
                                    ? '#3b82f6'
                                    : color,
                        }}
                        title={color}
                      />
                    ))}
                  </div>
                )}

                {/* Price */}
                <p className="text-2xl font-bold text-gray-900 mb-4">
                  ₹{product.price.toLocaleString('en-IN')}
                </p>

                {/* Buttons */}
                <div className="flex gap-3 mt-auto">
                  <button
                    onClick={() => onViewDetails?.(product)}
                    className="flex-1 px-4 py-2 bg-white border border-teal-700 text-teal-700 font-semibold rounded-lg hover:bg-teal-50 transition-all duration-300"
                  >
                    View
                  </button>
                  <button
                    onClick={() => onAddToCart?.(product)}
                    className="flex-1 px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white font-semibold rounded-lg transition-all duration-300"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
