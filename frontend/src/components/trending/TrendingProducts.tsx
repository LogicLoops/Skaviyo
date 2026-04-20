import { useNavigate } from 'react-router-dom';
import { TRENDING_PRODUCTS } from '../../data/products';

interface TrendingProductsProps {
  onProductClick?: (productId: string) => void;
}

const TrendingProducts = ({ onProductClick }: TrendingProductsProps) => {
  const navigate = useNavigate();

  const handleClick = (productId: string) => {
    if (onProductClick) {
      onProductClick(productId);
    } else {
      navigate(`/products/${productId}`);
    }
  };

  return (
    <section className="px-4 md:px-8 py-10 md:py-14 bg-gradient-to-b from-white to-emerald-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Trending Now
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-teal-700 to-yellow-600 mx-auto" />
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {TRENDING_PRODUCTS.map((product) => (
            <button
              key={product.id}
              onClick={() => handleClick(product.id)}
              className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full text-left"
              aria-label={`View ${product.name}`}
            >
              {/* Image Container */}
              <div className="relative h-64 md:h-72 overflow-hidden bg-gray-100">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                {product.badge && (
                  <span className="absolute top-3 left-3 bg-teal-800 text-white text-xs font-semibold px-3 py-1 rounded-full capitalize">
                    {product.badge === 'bestseller' ? '⭐ Bestseller'
                      : product.badge === 'limited' ? '🔥 Limited'
                      : product.badge === 'new' ? '✨ New'
                      : 'Featured'}
                  </span>
                )}
              </div>

              {/* Product Info */}
              <div className="p-5 md:p-6 flex-1 flex flex-col justify-between">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-teal-700 transition-colors">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between pt-4">
                  <span className="text-2xl font-bold text-teal-700">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs font-semibold text-gray-400 group-hover:text-yellow-600 transition-colors tracking-widest uppercase">
                    View →
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingProducts;
