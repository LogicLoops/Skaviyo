interface ProductData {
  id: string;
  name: string;
  price: number;
  image: string;
  colors?: string[];
}

interface VintageCollectionProps {
  onProductClick?: (product: ProductData) => void;
  onAddToCart?: (product: ProductData) => void;
  onShopNow?: () => void;
}

const VintageCollection = ({
  onProductClick,
  onAddToCart,
  onShopNow,
}: VintageCollectionProps) => {
  const vintageProducts: ProductData[] = [
    {
      id: 'vintage-black',
      name: 'Vintage Black Print',
      price: 4800,
      image: 'https://images.unsplash.com/photo-1554521666-7efcaf00face?w=400&h=500&fit=crop',
      colors: ['black', 'navy'],
    },
    {
      id: 'vintage-tones',
      name: 'The Vintage Tones',
      price: 5299,
      image: 'https://images.unsplash.com/photo-1505886657187-7dae51e27e22?w=400&h=500&fit=crop',
      colors: ['brown', 'tan', 'cream'],
    },
  ];

  return (
    <section className="px-4 md:px-8 py-12 md:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <p className="text-sm font-semibold text-teal-700 uppercase tracking-widest mb-2">
            Timeless Classics
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            The Vintage Favorites
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl">
            Handpicked vintage collections that transcend time. Each piece tells a story of craftsmanship and heritage.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {vintageProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300"
            >
              {/* Product Image */}
              <div
                className="relative h-96 bg-gray-200 overflow-hidden cursor-pointer"
                onClick={() => onProductClick?.(product)}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h3>

                {/* Rating and Reviews */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4 text-yellow-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 font-semibold">
                    4.8 (127 reviews)
                  </span>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4">
                  Vintage aesthetic meets modern comfort. Sourced from our heritage archives.
                </p>

                {/* Colors */}
                {product.colors && product.colors.length > 0 && (
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-semibold text-gray-600 uppercase">
                      Colors:
                    </span>
                    <div className="flex gap-2">
                      {product.colors.map((color) => (
                        <button
                          key={color}
                          className="w-6 h-6 rounded-full border-2 border-gray-300 hover:border-gray-600 transition-colors"
                          style={{
                            backgroundColor:
                              color === 'black'
                                ? '#000'
                                : color === 'navy'
                                  ? '#001f3f'
                                  : color === 'brown'
                                    ? '#8B4513'
                                    : color === 'tan'
                                      ? '#D2B48C'
                                      : color === 'cream'
                                        ? '#FFFDD0'
                                        : color,
                          }}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Price */}
                <p className="text-2xl font-bold text-gray-900 mb-4">
                  ₹{product.price.toLocaleString('en-IN')}
                </p>

                {/* Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => onProductClick?.(product)}
                    className="flex-1 px-4 py-3 bg-white border-2 border-teal-700 text-teal-700 font-bold rounded-lg hover:bg-teal-50 transition-all duration-300"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => onAddToCart?.(product)}
                    className="flex-1 px-4 py-3 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-lg transition-all duration-300"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Shop Now CTA */}
        <div className="text-center">
          <button
            onClick={onShopNow}
            className="px-10 py-4 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-full text-lg transition-all duration-300 hover:shadow-lg inline-flex items-center gap-2"
          >
            Explore Full Collection
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default VintageCollection;
