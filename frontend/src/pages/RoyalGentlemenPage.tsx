import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Header from '../components/header/Header';
import AnnouncementBar from '../components/announcement/AnnouncementBar';
import {
  RoyalGentlemenHeader,
  FeaturedProducts,
  SignatureCollection,
  GoldStandardBanner,
  VintageCollection,
} from '../components/royal-gentlemen';
import FeaturedProductHighlight from '../components/collection/FeaturedProductHighlight';
import WhyThisCollection from '../components/collection/WhyThisCollection';
import CollectionLookbook from '../components/collection/CollectionLookbook';
import CollectionReviews from '../components/collection/CollectionReviews';
import RelatedCollections from '../components/collection/RelatedCollections';
import Footer from '../components/footer/Footer';
import { PRODUCTS } from '../data/products';

interface ProductData {
  id: string;
  name: string;
  price: number;
  image: string;
  rating?: number;
  reviews?: number;
  colors?: string[];
}

const RoyalGentlemenPage = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleProductClick = (product: ProductData) => {
    navigate(`/products/${product.id}`);
  };

  const handleAddToCart = (product: ProductData) => {
    const fullProduct = PRODUCTS[product.id];
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      size: 'M',
      color: fullProduct?.colors[0] || 'default',
      image: product.image,
      inStock: true,
    });
    navigate('/cart');
  };

  const handleViewDetails = (product: ProductData) => {
    navigate(`/products/${product.id}`);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header
        onCartClick={() => navigate('/cart')}
        onWishlistClick={() => {}}
        onSignInClick={() => {}}
        onSearch={() => {}}
        onCustomerCareClick={() => navigate('/support')}
      />

      <AnnouncementBar />

      <RoyalGentlemenHeader onNavigateHome={() => navigate('/')} />

      <FeaturedProducts
        onProductClick={handleProductClick}
        onAddToCart={handleAddToCart}
        onViewDetails={handleViewDetails}
      />

      <div className="px-4 md:px-8 py-8 md:py-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <FeaturedProductHighlight onViewProduct={() => navigate('/products/classic-white')} />
        </div>
      </div>

      <WhyThisCollection />

      <SignatureCollection
        onProductClick={handleProductClick}
        onAddToCart={handleAddToCart}
      />

      <CollectionLookbook />

      <GoldStandardBanner onLearnMore={() => navigate('/about')} />

      <CollectionReviews />

      <VintageCollection
        onProductClick={handleProductClick}
        onAddToCart={handleAddToCart}
        onShopNow={() => navigate('/collections/men')}
      />

      <RelatedCollections onCollectionClick={(id) => {
        if (id === 'men') navigate('/collections/men');
      }} />

      <Footer />
    </div>
  );
};

export default RoyalGentlemenPage;
