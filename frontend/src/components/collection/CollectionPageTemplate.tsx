import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import Header from '../header/Header';
import AnnouncementBar from '../announcement/AnnouncementBar';
import Footer from '../footer/Footer';
import type { Product } from '../../data/products';

export interface CollectionFeature {
  icon: string;
  title: string;
  desc: string;
}

interface CollectionPageTemplateProps {
  collectionName: string;
  tagline: string;
  description: string;
  heroBgClass: string;       // Tailwind gradient e.g. "from-rose-900 to-pink-800"
  accentClass: string;       // badge/pill colour e.g. "bg-rose-600"
  products: Product[];
  features: CollectionFeature[];
}

const getBadgeLabel = (badge?: string) => {
  switch (badge) {
    case 'bestseller': return '⭐ Bestseller';
    case 'limited':    return '🔥 Limited';
    case 'new':        return '✨ New';
    case 'featured':   return '⚡ Featured';
    default:           return null;
  }
};

const CollectionPageTemplate = ({
  collectionName,
  tagline,
  description,
  heroBgClass,
  accentClass,
  products,
  features,
}: CollectionPageTemplateProps) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleAddToBag = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      size: 'M',
      color: product.colors[0] || 'default',
      image: product.images[0],
      inStock: product.inStock,
    });
    navigate('/cart');
  };

  return (
    <div className="min-h-screen bg-green-50">
      <AnnouncementBar />
      <Header
        onCartClick={() => navigate('/cart')}
        onWishlistClick={() => {}}
        onSignInClick={() => {}}
        onSearch={() => {}}
        onCustomerCareClick={() => navigate('/support')}
      />

      {/* Hero Banner */}
      <div className={`bg-gradient-to-br ${heroBgClass} py-16 md:py-24 relative overflow-hidden`}>
        {/* decorative circles */}
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/5" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-white/5" />
        <div className="max-w-4xl mx-auto px-4 text-center relative">
          <span className="inline-block px-4 py-1.5 rounded-full bg-yellow-500/20 text-yellow-300 text-xs font-semibold uppercase tracking-widest mb-4">
            New Collection
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
            {collectionName}
          </h1>
          <p className="text-yellow-400 text-xl font-medium mb-4">{tagline}</p>
          <p className="text-gray-300 text-base max-w-2xl mx-auto leading-relaxed">{description}</p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-14">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-teal-900">Shop the Collection</h2>
          <div className="w-12 h-1 bg-gradient-to-r from-teal-700 to-yellow-500 mx-auto mt-3" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {products.map((product) => {
            const badgeLabel = getBadgeLabel(product.badge);
            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-yellow-200 flex flex-col group"
              >
                {/* Image */}
                <div
                  className="relative h-72 bg-teal-900 overflow-hidden cursor-pointer"
                  onClick={() => navigate(`/products/${product.id}`)}
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                  {badgeLabel && (
                    <span className={`absolute top-3 right-3 ${accentClass} text-white text-xs font-semibold px-3 py-1 rounded-full`}>
                      {badgeLabel}
                    </span>
                  )}
                  {/* Wishlist */}
                  <button className="absolute top-3 left-3 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-yellow-50 transition-colors">
                    <svg className="w-4 h-4 text-gray-500 hover:text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>

                {/* Info */}
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-2">{product.name}</h3>

                  {/* Color swatches */}
                  <div className="flex gap-1.5 mb-3">
                    {product.colors.slice(0, 4).map((color) => (
                      <span
                        key={color}
                        className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full capitalize"
                      >
                        {color}
                      </span>
                    ))}
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-2xl font-bold text-teal-700">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-400 line-through">
                        ₹{product.originalPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3 mt-auto">
                    <button
                      onClick={() => navigate(`/products/${product.id}`)}
                      className="flex-1 py-2.5 bg-white border border-teal-700 text-teal-700 font-semibold rounded-xl hover:bg-teal-50 transition-all text-sm"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleAddToBag(product)}
                      className="flex-1 py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-semibold rounded-xl transition-all text-sm"
                    >
                      Add to Bag
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div key={f.title} className="flex gap-4 items-start">
                <span className="text-3xl flex-shrink-0">{f.icon}</span>
                <div>
                  <h4 className="font-bold text-teal-900 mb-1">{f.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related Collections CTA */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="bg-teal-900 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">Explore More Collections</h3>
            <p className="text-gray-300 text-sm">Discover the full Skaviyo universe — premium fashion for every style.</p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => navigate('/collections/men')}
              className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold rounded-full transition-all"
            >
              Men
            </button>
            <button
              onClick={() => navigate('/collections/women')}
              className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold rounded-full transition-all"
            >
              Women
            </button>
            <button
              onClick={() => navigate('/collections/limited-edition')}
              className="px-5 py-2.5 bg-yellow-600 hover:bg-yellow-500 text-white text-sm font-bold rounded-full transition-all"
            >
              Limited Edition
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CollectionPageTemplate;
