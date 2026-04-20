import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FacebookIcon, TwitterIcon, InstagramIcon } from '../shared/Icons';

interface FooterProps {
  onNewsletterSubmit?: (email: string) => void;
  onContactUsClick?: () => void;
}

const Footer = ({ onNewsletterSubmit, onContactUsClick }: FooterProps) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleContactUsClick = () => {
    if (onContactUsClick) {
      onContactUsClick();
    } else {
      navigate('/support');
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      onNewsletterSubmit?.(email);
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-teal-900 text-white bg-opacity-95">
      {/* Soft divider line */}
      <div className="h-px bg-gradient-to-r from-transparent via-yellow-600 to-transparent opacity-40" />

      {/* Main Footer Content */}
      <div className="px-4 md:px-8 py-10 md:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 mb-8">
            
            {/* Brand Column */}
            <div className="flex flex-col">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Skaviyo
              </h3>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-4">
                Elevate your everyday style with premium, sustainable fashion designed for modern elegance and supreme comfort.
              </p>
              <div className="flex gap-4">
                <button 
                  aria-label="Facebook"
                  className="text-gray-400 hover:text-yellow-500 transition-colors"
                >
                  <FacebookIcon className="w-5 h-5" />
                </button>
                <button 
                  aria-label="Twitter"
                  className="text-gray-400 hover:text-yellow-500 transition-colors"
                >
                  <TwitterIcon className="w-5 h-5" />
                </button>
                <button 
                  aria-label="Instagram"
                  className="text-gray-400 hover:text-yellow-500 transition-colors"
                >
                  <InstagramIcon className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Explore Column */}
            <div className="flex flex-col">
              <h4 className="text-lg font-semibold text-white mb-4">Explore</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/collections/men"
                    className="text-gray-300 hover:text-yellow-500 transition-colors text-sm md:text-base"
                  >
                    Men
                  </Link>
                </li>
                <li>
                  <Link
                    to="/collections/women"
                    className="text-gray-300 hover:text-yellow-500 transition-colors text-sm md:text-base"
                  >
                    Women
                  </Link>
                </li>
                <li>
                  <Link
                    to="/collections/couples"
                    className="text-gray-300 hover:text-yellow-500 transition-colors text-sm md:text-base"
                  >
                    Couples
                  </Link>
                </li>
                <li>
                  <Link
                    to="/collections/limited-edition"
                    className="text-gray-300 hover:text-yellow-500 transition-colors text-sm md:text-base"
                  >
                    Limited Edition
                  </Link>
                </li>
                <li>
                  <Link
                    to="/create-your-own"
                    className="text-gray-300 hover:text-yellow-500 transition-colors text-sm md:text-base"
                  >
                    Create Your Own
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support Column */}
            <div className="flex flex-col">
              <h4 className="text-lg font-semibold text-white mb-4">Support</h4>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={handleContactUsClick}
                    className="text-gray-300 hover:text-yellow-500 transition-colors text-sm md:text-base bg-transparent border-none cursor-pointer"
                  >
                    Contact Us
                  </button>
                </li>
                <li>
                  <Link
                    to="/refund-policy"
                    className="text-gray-300 hover:text-yellow-500 transition-colors text-sm md:text-base"
                  >
                    Returns & Exchanges
                  </Link>
                </li>
                <li>
                  <Link
                    to="/shipping-policy"
                    className="text-gray-300 hover:text-yellow-500 transition-colors text-sm md:text-base"
                  >
                    Shipping Info
                  </Link>
                </li>
                <li>
                  <Link
                    to="/support"
                    className="text-gray-300 hover:text-yellow-500 transition-colors text-sm md:text-base"
                  >
                    Size Guide
                  </Link>
                </li>
                <li>
                  <Link
                    to="/support"
                    className="text-gray-300 hover:text-yellow-500 transition-colors text-sm md:text-base"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Newsletter Column */}
            <div className="flex flex-col">
              <h4 className="text-lg font-semibold text-white mb-4">Newsletter</h4>
              <p className="text-gray-300 text-sm md:text-base mb-4">
                Subscribe to get special offers and updates delivered to your inbox.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-3">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full px-4 py-3 rounded-full bg-white/10 border border-yellow-600/30 text-white placeholder:text-gray-400 focus:outline-none focus:border-yellow-500 focus:bg-white/20 transition-colors text-sm md:text-base"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-yellow-600 text-teal-900 font-semibold rounded-full hover:bg-yellow-500 transition-all duration-300 text-sm md:text-base"
                >
                  {subscribed ? '✓ Subscribed' : 'Subscribe'}
                </button>
              </form>
            </div>
          </div>

          {/* Bottom Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-yellow-600 to-transparent opacity-30 mb-8" />

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-xs md:text-sm">
            <p>© {currentYear} Skaviyo. All rights reserved.</p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              <Link to="/about" className="hover:text-yellow-500 transition-colors">
                About Us
              </Link>
              <Link to="/privacy-policy" className="hover:text-yellow-500 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="hover:text-yellow-500 transition-colors">
                Terms of Service
              </Link>
              <Link to="/refund-policy" className="hover:text-yellow-500 transition-colors">
                Refund Policy
              </Link>
              <Link to="/shipping-policy" className="hover:text-yellow-500 transition-colors">
                Shipping Policy
              </Link>
              <Link to="/cookie-policy" className="hover:text-yellow-500 transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
