interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  description: string;
  colors: string[];
  sizes: string[];
  inStock: boolean;
  features: string[];
  badge?: 'bestseller' | 'limited' | 'new' | 'featured';
}

interface ProductInfoProps {
  product: Product;
  selectedSize: string;
  selectedColor: string;
  onSizeChange: (size: string) => void;
  onColorChange: (color: string) => void;
  onAddToBag: () => void;
  cartCount: number;
}

const getColorHex = (colorName: string): string => {
  const colorMap: { [key: string]: string } = {
    white: '#FFFFFF',
    black: '#1F2937',
    emerald: '#065F46',
    teal: '#0d9488',
    navy: '#001f3f',
    blue: '#3b82f6',
    slate: '#64748B',
  };
  return colorMap[colorName.toLowerCase()] || colorName;
};

const ProductInfo = ({
  product,
  selectedSize,
  selectedColor,
  onSizeChange,
  onColorChange,
  onAddToBag,
  cartCount,
}: ProductInfoProps) => {
  const getBadgeLabel = (badge?: string) => {
    const badges: { [key: string]: { label: string; icon: string } } = {
      bestseller: { label: '⭐ Best Seller', icon: '⭐' },
      limited: { label: '🔥 Limited Edition', icon: '🔥' },
      new: { label: '✨ New Arrival', icon: '✨' },
      featured: { label: '💎 Featured', icon: '💎' }
    };
    return badges[badge || ''] || null;
  };

  const getBadgeColor = (badge?: string) => {
    const colors: { [key: string]: string } = {
      bestseller: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      limited: 'bg-red-100 text-red-800 border-red-300',
      new: 'bg-teal-100 text-teal-800 border-teal-300',
      featured: 'bg-purple-100 text-purple-800 border-purple-300'
    };
    return colors[badge || ''] || '';
  };

  return (
    <div className="flex flex-col bg-white rounded-2xl border-2 border-gray-100 shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 md:p-7">
      
      {/* Badge */}
      {product.badge && getBadgeLabel(product.badge) && (
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border w-fit mb-4 font-semibold text-xs ${getBadgeColor(product.badge)}`}>
          <span>{getBadgeLabel(product.badge)?.icon}</span>
          <span>{getBadgeLabel(product.badge)?.label}</span>
        </div>
      )}

      {/* Product Header */}
      <div className="mb-5">
        <p className="text-xs font-bold text-teal-700 uppercase tracking-wider mb-2">
          Premium
        </p>
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight mb-3">
          {product.name}
        </h1>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex gap-0.5">
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
          <span className="text-xs font-semibold text-gray-700">
            {product.rating} • {product.reviews} reviews
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-3">
          <span className="text-4xl font-black text-teal-700">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          {product.originalPrice && (
            <>
              <span className="text-lg text-gray-500 line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-bold">
                Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
              </span>
            </>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-700 leading-relaxed mb-6 text-sm">
        {product.description}
      </p>

      {/* Product Highlights */}
      <div className="mb-6 space-y-2 pb-6 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <span className="text-emerald-600 font-bold">✓</span>
          <span className="text-sm font-semibold text-gray-900">Premium Fabric</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-emerald-600 font-bold">✓</span>
          <span className="text-sm font-semibold text-gray-900">Perfect Fit</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-emerald-600 font-bold">✓</span>
          <span className="text-sm font-semibold text-gray-900">Breathable Material</span>
        </div>
      </div>

      {/* Color Selection */}
      <div className="mb-5">
        <label className="block text-xs font-bold text-gray-900 mb-2 uppercase tracking-wider">
          Color
        </label>
        <div className="flex flex-wrap gap-2">
          {product.colors.map((color) => (
            <button
              key={color}
              onClick={() => onColorChange(color)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-full border-2 transition-all duration-300 capitalize text-xs font-semibold ${
                selectedColor === color
                  ? 'border-emerald-600 bg-emerald-50 shadow-sm scale-105'
                  : 'border-gray-200 hover:border-gray-400 bg-white'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full border-2 ${selectedColor === color ? 'border-emerald-600' : 'border-gray-300'}`}
                style={{ backgroundColor: getColorHex(color) }}
              />
              <span>{color}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Size Selection */}
      <div className="mb-5">
        <label className="block text-xs font-bold text-gray-900 mb-2 uppercase tracking-wider">
          Size
        </label>
        <div className="flex flex-wrap gap-2">
          {product.sizes.map((size) => (
            <button
              key={size}
              onClick={() => onSizeChange(size)}
              className={`w-11 h-11 rounded-lg border-2 font-bold text-sm transition-all duration-300 flex items-center justify-center ${
                selectedSize === size
                  ? 'border-emerald-600 bg-emerald-700 text-white shadow-md'
                  : 'border-gray-200 bg-white text-gray-900 hover:border-gray-400'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Stock Status */}
      <div className="mb-5 p-2.5 bg-emerald-50 rounded-lg border border-emerald-200">
        <p className={`text-xs font-bold flex items-center gap-2 ${product.inStock ? 'text-emerald-700' : 'text-red-700'}`}>
          <span className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-emerald-600 animate-pulse' : 'bg-red-600'}`} />
          {product.inStock ? '✓ In Stock • Ships in 1–2 days' : 'Out of Stock'}
        </p>
      </div>

      {/* Add to Bag Button */}
      <button
        onClick={onAddToBag}
        disabled={!product.inStock}
        className={`w-full py-4 px-4 rounded-full font-bold text-base transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg mb-3 flex items-center justify-center gap-2 ${
          product.inStock
            ? 'bg-gradient-to-r from-emerald-700 to-teal-700 hover:from-emerald-800 hover:to-teal-800 text-white'
            : 'bg-gray-300 text-gray-600 cursor-not-allowed'
        }`}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        {product.inStock ? 'ADD TO BAG' : 'OUT OF STOCK'}
        {cartCount > 0 && <span className="ml-2 text-xs bg-yellow-500 text-white px-2 py-0.5 rounded-full font-bold">{cartCount}</span>}
      </button>

      {/* Wishlist */}
      <button className="w-full py-3 rounded-full border-2 border-emerald-600 text-emerald-700 font-bold hover:bg-emerald-50 transition-all duration-300 flex items-center justify-center gap-2 mb-5">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
        </svg>
        <span className="text-sm">WISHLIST</span>
      </button>

      {/* Trust Indicators - Compact */}
      <div className="space-y-2 pt-4 border-t border-gray-200">
        <div className="flex items-start gap-2">
          <svg className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          <div>
            <p className="text-xs font-bold text-gray-900">Secure Checkout</p>
            <p className="text-xs text-gray-600">SSL encrypted</p>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <svg className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
            <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
          </svg>
          <div>
            <p className="text-xs font-bold text-gray-900">Free Returns</p>
            <p className="text-xs text-gray-600">30-day returns</p>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <svg className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5.951-1.429 5.951 1.429a1 1 0 001.169-1.409l-7-14z" />
          </svg>
          <div>
            <p className="text-xs font-bold text-gray-900">Quality Guaranteed</p>
            <p className="text-xs text-gray-600">Premium materials</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
