import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Header from '../components/header/Header';
import AnnouncementBar from '../components/announcement/AnnouncementBar';
import Footer from '../components/footer/Footer';
import {
  ProductGallery,
  ProductInfo,
  FabricsAndCare,
  ShippingReturns,
  CompleteTheLook,
  CustomerReviews,
  RelevantCategories,
} from '../components/product-detail';
import { PRODUCTS } from '../data/products';

const ProductDetailPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { addToCart, cartCount } = useCart();

  const product = PRODUCTS[productId || ''];

  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [selectedColor, setSelectedColor] = useState<string>(
    product?.colors[0] || 'white'
  );
  const [fabricCareOpen, setFabricCareOpen] = useState(false);
  const [shippingOpen, setShippingOpen] = useState(false);

  const handleAddToBag = () => {
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        size: selectedSize,
        color: selectedColor,
        image: product.images[0],
        inStock: product.inStock,
      });
      navigate('/cart');
    }
  };

  const handleRelatedProductClick = (relatedProductId: string) => {
    navigate(`/products/${relatedProductId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-emerald-50">
        <Header
          onCartClick={() => navigate('/cart')}
          onWishlistClick={() => {}}
          onSignInClick={() => {}}
          onSearch={() => {}}
          onCustomerCareClick={() => navigate('/support')}
        />
        <div className="flex flex-col items-center justify-center h-96 gap-4">
          <p className="text-xl text-gray-600">Product not found</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-teal-700 text-white rounded-full hover:bg-teal-800 transition-colors"
          >
            Back to Home
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-emerald-50">
      <Header
        onCartClick={() => navigate('/cart')}
        onWishlistClick={() => {}}
        onSignInClick={() => {}}
        onSearch={() => {}}
        onCustomerCareClick={() => navigate('/support')}
      />

      <AnnouncementBar />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100 px-4 md:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-sm">
          <button
            onClick={() => navigate('/')}
            className="text-teal-700 hover:text-teal-800 transition-colors"
          >
            Home
          </button>
          <span className="text-gray-400">/</span>
          <button
            onClick={() => navigate('/collections/men')}
            className="text-teal-700 hover:text-teal-800 transition-colors"
          >
            Collections
          </button>
          <span className="text-gray-400">/</span>
          <span className="text-gray-600">{product.name}</span>
        </div>
      </div>

      {/* Main Content */}
      <main className="px-4 md:px-8 py-6 md:py-10 bg-emerald-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:items-stretch">
            {/* Left: Gallery + Reviews + Details */}
            <div className="flex flex-col gap-2">
              <ProductGallery images={product.images} productName={product.name} />

              <FabricsAndCare
                fabricCare={product.fabricCare}
                isOpen={fabricCareOpen}
                onToggle={() => setFabricCareOpen(!fabricCareOpen)}
              />

              <ShippingReturns
                shipping={product.shipping}
                returns={product.returns}
                isOpen={shippingOpen}
                onToggle={() => setShippingOpen(!shippingOpen)}
              />

              <CustomerReviews
                rating={product.rating}
                totalReviews={product.reviews}
              />
            </div>

            {/* Right: Product Info */}
            <div className="flex flex-col justify-start">
              <ProductInfo
                product={product}
                selectedSize={selectedSize}
                selectedColor={selectedColor}
                onSizeChange={setSelectedSize}
                onColorChange={setSelectedColor}
                onAddToBag={handleAddToBag}
                cartCount={cartCount}
              />
            </div>
          </div>

          {/* Relevant Products - Full Width */}
          <div className="mt-2">
            <RelevantCategories onProductClick={handleRelatedProductClick} />
          </div>

          {/* Complete the Look */}
          <div className="mt-12 md:mt-16">
            <CompleteTheLook
              relatedProducts={product.relatedProducts}
              onProductClick={handleRelatedProductClick}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetailPage;
