import { useNavigate } from 'react-router-dom';
import Header from '../components/header/Header';
import AnnouncementBar from '../components/announcement/AnnouncementBar';
import HeroSection from '../components/hero/HeroSection';
import CategorySection from '../components/category/CategorySection';
import TrendingProducts from '../components/trending/TrendingProducts';
import LimitedEditionBanner from '../components/limited-edition/LimitedEditionBanner';
import CreateYourOwn from '../components/create-own/CreateYourOwn';
import WhySkaviyo from '../components/why-skaviyo/WhySkaviyo';
import Lookbook from '../components/lookbook/Lookbook';
import Reviews from '../components/reviews/Reviews';
import Newsletter from '../components/newsletter/Newsletter';
import Footer from '../components/footer/Footer';

const CATEGORY_ROUTES: { [key: string]: string } = {
  men: '/collections/men',
  women: '/collections/women',
  couples: '/collections/couples',
  'group-team': '/collections/group-team',
  sports: '/collections/sports',
  animated: '/collections/animated',
  'create-own': '/create-your-own',
  'limited-edition': '/collections/limited-edition',
};

const HomePage = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId: string) => {
    const route = CATEGORY_ROUTES[categoryId];
    if (route) navigate(route);
  };

  const handleProductClick = (productId: string) => {
    navigate(`/products/${productId}`);
  };

  const handleShopClick = () => {
    navigate('/collections/men');
  };

  const handleCreateClick = () => {
    navigate('/support');
  };

  const handleLimitedEditionClick = () => {
    navigate('/collections/men');
  };

  const handleStartCreatingClick = () => {
    navigate('/support');
  };

  return (
    <div className="min-h-screen bg-white">
      <Header
        onCartClick={() => navigate('/cart')}
        onWishlistClick={() => {}}
        onSignInClick={() => {}}
        onSearch={(q) => console.log('Search:', q)}
        onCustomerCareClick={() => navigate('/support')}
      />

      <AnnouncementBar />

      <HeroSection
        onShopClick={handleShopClick}
        onCreateClick={handleCreateClick}
      />

      <CategorySection onCategoryClick={handleCategoryClick} />

      <TrendingProducts onProductClick={handleProductClick} />

      <LimitedEditionBanner onShopClick={handleLimitedEditionClick} />

      <CreateYourOwn onStartCreating={handleStartCreatingClick} />

      <WhySkaviyo />

      <Lookbook />

      <Reviews />

      <Newsletter />

      <Footer />
    </div>
  );
};

export default HomePage;
