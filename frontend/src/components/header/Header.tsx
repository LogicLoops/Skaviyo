import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { WishlistIcon, CartIcon, ReturnIcon, MenuIcon, LocationIcon, SearchIcon } from '../shared/Icons';

interface HeaderIconItemProps {
  icon: React.ReactNode;
  label: string;
  badge?: number;
  onClick?: () => void;
}

const HeaderIconItem = ({ icon, label, badge, onClick }: HeaderIconItemProps) => (
  <button
    onClick={onClick}
    className="flex flex-col items-center justify-center gap-0.5 px-1 hover:opacity-80 transition-opacity relative group"
    aria-label={label}
    title={label}
  >
    <div className="relative">
      {icon}
      {badge !== undefined && badge > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold text-center leading-none">
          {badge}
        </span>
      )}
    </div>
    <span className="text-xs font-medium text-gray-700 whitespace-nowrap">{label}</span>
  </button>
);

interface HeaderProps {
  onCartClick?: () => void;
  onWishlistClick?: () => void;
  onSignInClick?: () => void;
  onSearch?: (query: string) => void;
  onCustomerCareClick?: () => void;
}

const Header = ({ 
  onCartClick, 
  onWishlistClick, 
  onSignInClick,
  onSearch,
  onCustomerCareClick 
}: HeaderProps) => {
  const navigate = useNavigate();
  const { cartCount } = useCart();
  const [searchQuery, setSearchQuery] = useState('');

  const handleCustomerCareClick = () => {
    if (onCustomerCareClick) {
      onCustomerCareClick();
    } else {
      navigate('/support');
    }
  };

  const handleCartClick = () => {
    navigate('/cart');
    onCartClick?.();
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Main Header - Compact Amazon Style */}
      <div className="bg-white px-4 md:px-8 py-2">
        <div className="max-w-full flex items-center gap-2 md:gap-4 justify-between md:justify-start">
          
          {/* Left: Logo */}
          <div className="flex-shrink-0">
            <h1
              onClick={() => navigate('/')}
              className="text-lg md:text-xl font-bold text-teal-900 hover:text-teal-700 cursor-pointer transition-colors"
            >
              Skaviyo
            </h1>
          </div>

          {/* Location Section - Hidden on smaller screens */}
          <div className="hidden md:flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-100 transition-colors cursor-pointer flex-shrink-0">
            <LocationIcon className="w-4 h-4 text-yellow-600 flex-shrink-0" />
            <div className="text-xs leading-tight">
              <div className="text-gray-500">Delivering To</div>
              <div className="font-medium text-gray-800">New York, USA</div>
            </div>
          </div>

          {/* Center: Search Bar - Main focus */}
          <form 
            onSubmit={handleSearch}
            className="flex-grow min-w-0 mx-2 md:mx-3"
          >
            <div className="relative flex items-center bg-white rounded-full border border-gray-300 hover:border-yellow-500 focus-within:border-yellow-500 transition-colors">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search for t-shirts, styles, collections..."
                className="w-full px-3 py-1 rounded-full outline-none text-sm placeholder:text-gray-400"
                aria-label="Search products"
              />
              <button
                type="submit"
                className="px-2 py-1 text-yellow-600 hover:text-yellow-700 transition-colors flex-shrink-0"
                aria-label="Submit search"
              >
                <SearchIcon className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Right: Account and Features */}
          <div className="flex items-center gap-0.5 flex-shrink-0">
            
            {/* Sign In / Customer Care - Hidden on mobile */}
            <div className="hidden sm:flex items-center gap-1">
              <button
                onClick={onSignInClick}
                className="text-xs text-gray-700 font-medium hover:text-yellow-600 transition-colors px-1"
              >
                Sign In
              </button>
              <span className="text-xs text-gray-400">/</span>
              <button
                onClick={handleCustomerCareClick}
                className="text-xs text-gray-700 font-medium hover:text-yellow-600 transition-colors px-1"
              >
                Customer Care
              </button>
            </div>

            {/* Wishlist Icon */}
            <HeaderIconItem
              icon={<WishlistIcon className="w-5 h-5 md:w-6 md:h-6 text-yellow-600" />}
              label="Wishlist"
              onClick={onWishlistClick}
            />

            {/* Cart Icon with Badge */}
            <HeaderIconItem
              icon={<CartIcon className="w-5 h-5 md:w-6 md:h-6 text-yellow-600" />}
              label="Cart"
              badge={cartCount}
              onClick={handleCartClick}
            />

            {/* Returns Icon */}
            <HeaderIconItem
              icon={<ReturnIcon className="w-5 h-5 md:w-6 md:h-6 text-yellow-600" />}
              label="Returns"
            />

            {/* Mobile Menu Button */}
            <button className="sm:hidden p-1 hover:bg-gray-100 rounded transition-colors">
              <MenuIcon className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sign In / Customer Care - Shown only on mobile */}
      <div className="sm:hidden border-t border-gray-100 px-4 py-1.5">
        <div className="flex gap-3 justify-center">
          <button
            onClick={onSignInClick}
            className="text-xs font-medium text-yellow-600 hover:text-yellow-700 transition-colors"
          >
            Sign In
          </button>
          <span className="text-gray-300">/</span>
          <button
            onClick={handleCustomerCareClick}
            className="text-xs font-medium text-yellow-600 hover:text-yellow-700 transition-colors"
          >
            Customer Care
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
