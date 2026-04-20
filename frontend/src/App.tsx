import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';

import HomePage from './pages/HomePage';
import RoyalGentlemenPage from './pages/RoyalGentlemenPage';
import WomenPage from './pages/WomenPage';
import CouplesPage from './pages/CouplesPage';
import GroupTeamPage from './pages/GroupTeamPage';
import SportsPage from './pages/SportsPage';
import AnimatedPage from './pages/AnimatedPage';
import LimitedEditionPage from './pages/LimitedEditionPage';
import CreateYourOwnPage from './pages/CreateYourOwnPage';

import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import SupportPage from './pages/SupportPage';
import AboutPage from './pages/AboutPage';

import TermsOfServicePage from './pages/TermsOfServicePage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import RefundPolicyPage from './pages/RefundPolicyPage';
import ShippingPolicyPage from './pages/ShippingPolicyPage';
import CookiePolicyPage from './pages/CookiePolicyPage';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          {/* Home */}
          <Route path="/" element={<HomePage />} />

          {/* Collections */}
          <Route path="/collections/men" element={<RoyalGentlemenPage />} />
          <Route path="/collections/royal-gentlemen" element={<RoyalGentlemenPage />} />
          <Route path="/collections/women" element={<WomenPage />} />
          <Route path="/collections/couples" element={<CouplesPage />} />
          <Route path="/collections/group-team" element={<GroupTeamPage />} />
          <Route path="/collections/sports" element={<SportsPage />} />
          <Route path="/collections/animated" element={<AnimatedPage />} />
          <Route path="/collections/limited-edition" element={<LimitedEditionPage />} />
          <Route path="/create-your-own" element={<CreateYourOwnPage />} />

          {/* Product */}
          <Route path="/products/:productId" element={<ProductDetailPage />} />

          {/* Cart & Checkout */}
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-confirmation" element={<OrderConfirmationPage />} />

          {/* Info */}
          <Route path="/support" element={<SupportPage />} />
          <Route path="/about" element={<AboutPage />} />

          {/* Legal */}
          <Route path="/terms-of-service" element={<TermsOfServicePage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/refund-policy" element={<RefundPolicyPage />} />
          <Route path="/shipping-policy" element={<ShippingPolicyPage />} />
          <Route path="/cookie-policy" element={<CookiePolicyPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
