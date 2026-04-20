import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Header from '../components/header/Header';
import AnnouncementBar from '../components/announcement/AnnouncementBar';
import Footer from '../components/footer/Footer';
import { TrashIcon } from '../components/shared/Icons';
import { CART_SUGGESTIONS } from '../data/products';

const CartPage = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);

  // Brand colors - Strict palette
  const COLORS = {
    primary: '#065F46',
    accent: '#D1B06B',
    background: '#F0FDF4',
    card: '#FFFFFF',
    textDark: '#064E3B',
  };

  // Handle promo code
  const handleApplyPromo = () => {
    if (!promoCode.trim()) {
      alert('Please enter a promo code');
      return;
    }

    const promoCodes: { [key: string]: number } = {
      SAVE10: 0.1,
      SAVE20: 0.2,
      WELCOME: 0.15,
    };

    const discount = promoCodes[promoCode.toUpperCase()];
    if (discount) {
      setPromoDiscount(discount);
      setPromoApplied(true);
      alert(`Promo code applied! You saved ₹${(totalPrice * discount).toLocaleString('en-IN')}`);
    } else {
      alert('Invalid promo code');
      setPromoDiscount(0);
      setPromoApplied(false);
    }
  };

  // Calculate totals
  const subtotal = totalPrice;
  const discountAmount = promoApplied ? subtotal * promoDiscount : 0;
  const shipping = subtotal > 15000 ? 0 : 300;
  const tax = (subtotal - discountAmount) * 0.1;
  const total = subtotal - discountAmount + shipping + tax;

  // Handle quantity change
  const handleQuantityChange = (id: string, size: string, color: string, newQuantity: number) => {
    if (newQuantity >= 0) {
      updateQuantity(id, size, color, newQuantity);
    }
  };

  // Handle checkout
  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Your cart is empty');
      return;
    }
    // Navigate to checkout page
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: COLORS.background }}>
      <AnnouncementBar />
      <Header onCartClick={() => {}} />

      {/* Main Content */}
      <main className="flex-grow px-4 md:px-6 lg:px-8 py-8 md:py-10">
        <div className="max-w-7xl mx-auto">
          {/* Page Header - Minimal & Clean */}
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-bold" style={{ color: COLORS.textDark }}>
              Your Bag
            </h1>
            <p className="text-sm mt-1" style={{ color: '#6B7280' }}>
              {cart.length} {cart.length === 1 ? 'item' : 'items'}
            </p>
          </div>

          {cart.length === 0 ? (
            // Empty Cart State - Clean
            <div className="rounded-2xl p-8 text-center" style={{ backgroundColor: COLORS.card, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
              <p className="text-lg mb-3" style={{ color: '#6B7280' }}>Your bag is empty</p>
              <button
                onClick={() => navigate('/')}
                className="font-semibold py-3 px-8 rounded-full transition-all duration-200 hover:opacity-90 transform hover:scale-105"
                style={{ backgroundColor: COLORS.primary, color: '#FFFFFF' }}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start">
              {/* Left: Cart Items - Premium Cards */}
              <div>
                <div
                  className="rounded-2xl overflow-hidden"
                  style={{ backgroundColor: COLORS.card, boxShadow: '0 2px 8px rgba(0,0,0,0.12)' }}
                >
                  <div className="divide-y" style={{ borderColor: '#F0F0F0' }}>
                    {cart.map((item) => (
                      <div
                        key={`${item.id}-${item.size}-${item.color}`}
                        className="p-5 hover:bg-gradient-to-r hover:from-gray-50 hover:to-transparent transition-colors duration-200"
                      >
                        <div className="flex gap-5 mb-4">
                          {/* Product Image */}
                          <div className="flex-shrink-0 relative">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-28 h-28 object-cover rounded-xl"
                              style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
                            />
                            {/* Stock Indicator - Green Dot */}
                            {item.inStock && (
                              <div
                                className="absolute top-1 right-1 w-5 h-5 rounded-full border-2 border-white"
                                style={{ backgroundColor: '#10B981' }}
                                title="In Stock"
                              />
                            )}
                          </div>

                          {/* Product Details */}
                          <div className="flex-grow">
                            <h3 className="font-semibold text-base mb-2.5" style={{ color: COLORS.textDark }}>
                              {item.name}
                            </h3>
                            <div className="space-y-1 mb-4">
                              <p className="text-sm" style={{ color: '#6B7280' }}>
                                Size: <span className="font-medium" style={{ color: COLORS.textDark }}>{item.size}</span>
                              </p>
                              <p className="text-sm" style={{ color: '#6B7280' }}>
                                Color: <span className="font-medium capitalize" style={{ color: COLORS.textDark }}>{item.color}</span>
                              </p>
                            </div>

                            {/* Quantity Controls - Clean & Refined */}
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() =>
                                  handleQuantityChange(item.id, item.size, item.color, item.quantity - 1)
                                }
                                className="w-8 h-8 flex items-center justify-center rounded-lg text-sm font-semibold transition-all duration-200 hover:scale-110"
                                style={{ backgroundColor: COLORS.background, color: COLORS.primary }}
                              >
                                −
                              </button>
                              <span className="w-8 text-center font-medium text-sm" style={{ color: COLORS.textDark }}>{item.quantity}</span>
                              <button
                                onClick={() =>
                                  handleQuantityChange(item.id, item.size, item.color, item.quantity + 1)
                                }
                                className="w-8 h-8 flex items-center justify-center rounded-lg text-sm font-semibold transition-all duration-200 hover:scale-110"
                                style={{ backgroundColor: COLORS.background, color: COLORS.primary }}
                              >
                                +
                              </button>
                            </div>
                          </div>

                          {/* Price & Remove */}
                          <div className="flex flex-col items-end justify-between min-w-max">
                            <p className="font-semibold text-base" style={{ color: COLORS.primary }}>
                              ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                            </p>
                            <button
                              onClick={() => removeFromCart(item.id, item.size, item.color)}
                              className="text-gray-300 hover:text-red-500 transition-colors duration-200 p-2 hover:bg-red-50 rounded-lg"
                              title="Remove item"
                            >
                              <TrashIcon className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Order Summary - Hero Section */}
              <div>
                <div
                  className="rounded-2xl p-7 sticky top-20"
                  style={{ backgroundColor: COLORS.card, boxShadow: '0 2px 8px rgba(0,0,0,0.12)' }}
                >
                  {/* Title */}
                  <h2 className="text-lg font-semibold mb-5" style={{ color: COLORS.textDark }}>
                    Order Summary
                  </h2>

                  {/* Summary Items */}
                  <div className="space-y-2.5 mb-5 pb-5" style={{ borderBottomWidth: '1px', borderColor: '#E5E7EB' }}>
                    <div className="flex justify-between text-sm">
                      <span style={{ color: '#6B7280' }}>Subtotal</span>
                      <span style={{ color: COLORS.textDark, fontWeight: '500' }}>₹{subtotal.toLocaleString('en-IN')}</span>
                    </div>

                    {promoApplied && (
                      <div className="flex justify-between text-sm rounded-lg p-2" style={{ backgroundColor: '#ECFDF5' }}>
                        <span style={{ color: COLORS.primary }}>Discount ({(promoDiscount * 100).toFixed(0)}%)</span>
                        <span style={{ color: COLORS.primary, fontWeight: '600' }}>
                          -₹{discountAmount.toLocaleString('en-IN')}
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between text-sm">
                      <span style={{ color: '#6B7280' }}>Shipping</span>
                      <span style={{ color: COLORS.primary, fontWeight: shipping === 0 ? '600' : '400' }}>
                        {shipping === 0 ? 'FREE' : `₹${shipping}`}
                      </span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span style={{ color: '#6B7280' }}>Tax</span>
                      <span style={{ color: COLORS.textDark, fontWeight: '500' }}>₹{tax.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  {/* Total - Visually Separated & Emphasized */}
                  <div className="mb-5 pb-5" style={{ borderBottomWidth: '2px', borderColor: '#E5E7EB' }}>
                    <div className="flex justify-between items-center">
                      <span style={{ color: '#6B7280', fontSize: '13px' }}>Total</span>
                      <span className="text-2xl font-bold" style={{ color: COLORS.primary }}>
                        ₹{total.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  {/* Tax Inclusive Note */}
                  <p className="text-xs mb-4" style={{ color: '#9CA3AF' }}>
                    ✓ Inclusive of all taxes
                  </p>

                  {/* Promo Code Input */}
                  <div className="mb-4">
                    <label className="block text-xs font-semibold mb-2 tracking-wide" style={{ color: '#6B7280' }}>
                      PROMO CODE
                    </label>
                    <div className="flex gap-2" style={{ opacity: promoApplied ? 0.6 : 1 }}>
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                        placeholder="Enter code"
                        disabled={promoApplied}
                        className="flex-grow px-3 py-2 text-sm rounded-lg border transition-all duration-200 outline-none"
                        style={{
                          borderColor: '#E5E7EB',
                          color: COLORS.textDark,
                          backgroundColor: promoApplied ? '#F9FAFB' : COLORS.card,
                        }}
                      />
                      <button
                        onClick={handleApplyPromo}
                        disabled={promoApplied}
                        className="px-3 py-2 text-sm font-semibold rounded-lg transition-all duration-200 hover:scale-102"
                        style={{
                          backgroundColor: promoApplied ? '#F3F4F6' : COLORS.accent,
                          color: promoApplied ? '#9CA3AF' : '#FFFFFF',
                          cursor: promoApplied ? 'not-allowed' : 'pointer',
                        }}
                      >
                        {promoApplied ? '✓' : 'Apply'}
                      </button>
                    </div>
                    <p className="text-xs mt-1.5" style={{ color: '#9CA3AF' }}>
                      Try: SAVE10 • SAVE20 • WELCOME
                    </p>
                  </div>

                  {/* Micro Message - Premium Touch */}
                  <div className="mb-5 p-2.5 rounded-lg text-center text-xs" style={{ backgroundColor: '#F9FAFB', color: '#6B7280' }}>
                    You're one step away from owning premium comfort
                  </div>

                  {/* CTA Button - Conversion Focused */}
                  <button
                    onClick={handleCheckout}
                    disabled={cart.length === 0}
                    className="w-full font-semibold rounded-full py-3.5 transition-all duration-300 hover:scale-102 transform mb-4 text-white"
                    style={{
                      backgroundColor: COLORS.primary,
                      opacity: cart.length === 0 ? 0.6 : 1,
                      cursor: cart.length === 0 ? 'not-allowed' : 'pointer',
                      boxShadow: '0 4px 12px rgba(6, 95, 70, 0.2)',
                      height: '56px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    Secure Checkout
                  </button>

                  {/* Trust Indicators */}
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2" style={{ color: '#6B7280' }}>
                      <span>🔒</span>
                      <span>Secure Checkout (SSL)</span>
                    </div>
                    <div className="flex items-center gap-2" style={{ color: '#6B7280' }}>
                      <span>↩</span>
                      <span>30-Day Easy Returns</span>
                    </div>
                    <div className="flex items-center gap-2" style={{ color: '#6B7280' }}>
                      <span>🚚</span>
                      <span>Fast & Free Delivery</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* You Might Also Like - Premium Horizontal Scroll */}
          {cart.length > 0 && (
            <div className="mt-12">
              <div className="mb-5">
                <h2 className="text-2xl font-semibold" style={{ color: COLORS.textDark }}>
                  You Might Also Like
                </h2>
                <p className="text-sm mt-1" style={{ color: '#9CA3AF' }}>Curated selections for you</p>
              </div>
              
              {/* Horizontal Scroll Container */}
              <div 
                className="flex gap-5 overflow-x-auto pb-2 scroll-smooth scrollbar-hide"
                style={{ scrollBehavior: 'smooth' }}
              >
                {CART_SUGGESTIONS.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => navigate(`/products/${product.id}`)}
                    className="flex-shrink-0 cursor-pointer group rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg"
                    style={{ 
                      width: '240px',
                      backgroundColor: COLORS.card,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                    }}
                  >
                    <div className="relative overflow-hidden bg-gray-100 h-48">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div
                        className="absolute top-2 right-2 text-xs font-semibold px-2 py-1 rounded-full text-white"
                        style={{ backgroundColor: COLORS.primary }}
                      >
                        {product.badge}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-sm line-clamp-2 mb-2" style={{ color: COLORS.textDark }}>
                        {product.name}
                      </h3>
                      <div className="flex justify-between items-center">
                        <p className="font-bold text-sm" style={{ color: COLORS.primary }}>
                          ₹{product.price.toLocaleString('en-IN')}
                        </p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/products/${product.id}`);
                          }}
                          className="text-xs font-semibold py-1.5 px-2.5 rounded-lg transition-all duration-200 hover:scale-102"
                          style={{ backgroundColor: '#F3F4F6', color: COLORS.primary }}
                        >
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CartPage;
