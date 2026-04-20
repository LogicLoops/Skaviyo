import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Header from '../components/header/Header';
import AnnouncementBar from '../components/announcement/AnnouncementBar';
import Footer from '../components/footer/Footer';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, totalPrice } = useCart();

  // Brand colors
  const COLORS = {
    primary: '#065F46',
    accent: '#D1B06B',
    background: '#F0FDF4',
    card: '#FFFFFF',
    textDark: '#064E3B',
  };

  // Step Flow State
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  // Form State
  const [formData, setFormData] = useState({
    country: '',
    state: '',
    fullName: '',
    email: '',
    address: '',
    apartment: '',
    city: '',
    zipCode: '',
    phone: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardData, setCardData] = useState({
    cardNumber: '',
    nameOnCard: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
  });

  const [isProcessing, setIsProcessing] = useState(false);

  // Calculate totals
  const subtotal = totalPrice;
  const shipping = subtotal > 15000 ? 0 : 300;
  const tax = (subtotal) * 0.1;
  const total = subtotal + shipping + tax;

  // Step 1: Validate and save address
  const handleSaveAddress = () => {
    const errors: string[] = [];
    if (!formData.country) errors.push('Country/Region is required');
    if (!formData.fullName) errors.push('Full Name is required');
    if (!formData.address) errors.push('Street Address is required');
    if (!formData.city) errors.push('City is required');
    if (!formData.zipCode) errors.push('ZIP Code is required');
    if (!formData.phone) errors.push('Phone Number is required');

    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }

    setValidationErrors([]);
    setCompletedSteps([...new Set([...completedSteps, 1])]);
    setSuccessMessage('✓ Address saved successfully');
    setTimeout(() => {
      setSuccessMessage('');
      setCurrentStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1500);
  };

  // Step 2: Select payment method
  const handlePaymentMethodSelect = (method: string) => {
    setPaymentMethod(method);
    setCompletedSteps([...new Set([...completedSteps, 2])]);
    setSuccessMessage(`✓ ${method === 'card' ? 'Card' : 'PayPal'} selected`);
    setTimeout(() => {
      setSuccessMessage('');
      setCurrentStep(3);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1500);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardData(prev => ({ ...prev, [name]: value }));
  };

  // Handle place order (Step 3)
  const handlePlaceOrder = async () => {
    if (paymentMethod === 'card') {
      if (!cardData.cardNumber || !cardData.nameOnCard || !cardData.cvv) {
        setValidationErrors(['Please fill in all card details']);
        return;
      }
    }

    setIsProcessing(true);
    setValidationErrors([]);

    try {
      // Generate order number
      const orderNumber = `#SK-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`;
      const today = new Date();
      const orderDate = today.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

      // Calculate estimated delivery (2-3 business days)
      const deliveryStart = new Date(today.setDate(today.getDate() + 2));
      const deliveryEnd = new Date(today.setDate(today.getDate() + 1));
      const estimatedDelivery = `${deliveryStart.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })} - ${deliveryEnd.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}`;

      const orderData = {
        items: cart,
        delivery: formData,
        payment: paymentMethod === 'card' ? { type: 'card', lastFour: cardData.cardNumber.slice(-4) } : { type: 'paypal' },
        totals: { subtotal, shipping, tax, total },
        timestamp: new Date(),
        orderNumber,
        date: orderDate,
        totalAmount: total,
        paymentMethod: paymentMethod === 'card' ? 'Visa' : 'PayPal',
        cardLast4: paymentMethod === 'card' ? cardData.cardNumber.slice(-4) : '0000',
        estimatedDelivery,
        email: formData.email,
      };

      console.log('Order placed:', orderData);

      // Simulate processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Navigate to order confirmation with order data
      navigate('/order-confirmation', { state: { orderData } });
    } catch (error) {
      setValidationErrors(['Error processing order. Please try again.']);
      setIsProcessing(false);
    }
  };

  // Redirect if no cart items
  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: COLORS.background }}>
        <AnnouncementBar />
        <Header onCartClick={() => {}} />
        <main className="flex-grow flex items-center justify-center px-4">
          <div className="text-center">
            <p className="text-lg mb-4" style={{ color: '#6B7280' }}>Your cart is empty</p>
            <button
              onClick={() => navigate('/')}
              className="font-semibold py-3 px-8 rounded-full transition-all duration-200 hover:opacity-90"
              style={{ backgroundColor: COLORS.primary, color: '#FFFFFF' }}
            >
              Continue Shopping
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: COLORS.background }}>
      <AnnouncementBar />
      <Header onCartClick={() => {}} />

      <style>{`
        input:focus, select:focus {
          border-color: ${COLORS.primary} !important;
          box-shadow: 0 0 0 3px rgba(6, 95, 70, 0.1);
        }
      `}</style>

      <main className="flex-grow px-4 md:px-6 lg:px-8 py-8 md:py-12">
        <div className="max-w-7xl mx-auto">
          {/* Page Header with Progress */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-2" style={{ color: COLORS.textDark }}>Checkout</h1>
            <p className="text-sm mb-6" style={{ color: '#9CA3AF' }}>Step-by-step secure checkout</p>
            
            {/* Enhanced Progress Indicator */}
            <div className="flex items-center justify-between gap-2 max-w-md">
              {/* Step 1 */}
              <div className="flex-1 text-center">
                <div className="flex justify-center mb-2">
                  {completedSteps.includes(1) ? (
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-lg" style={{ backgroundColor: '#10B981', color: '#FFFFFF' }}>
                      ✓
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm" style={{ backgroundColor: currentStep === 1 ? COLORS.primary : '#E5E7EB', color: '#FFFFFF' }}>
                      {currentStep === 1 ? '●' : '○'}
                    </div>
                  )}
                </div>
                <p className="text-xs font-semibold" style={{ color: completedSteps.includes(1) ? '#10B981' : currentStep === 1 ? COLORS.primary : '#9CA3AF' }}>Address</p>
              </div>

              {/* Step 2 */}
              <div className="flex-1 text-center">
                <div className="flex justify-center mb-2">
                  {completedSteps.includes(2) ? (
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-lg" style={{ backgroundColor: '#10B981', color: '#FFFFFF' }}>
                      ✓
                    </div>
                  ) : currentStep >= 2 ? (
                    <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm" style={{ backgroundColor: COLORS.primary, color: '#FFFFFF' }}>
                      ●
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border-2" style={{ borderColor: '#D1D5DB', color: '#9CA3AF', opacity: 0.5 }}>
                      ○
                    </div>
                  )}
                </div>
                <p className="text-xs font-semibold" style={{ color: completedSteps.includes(2) ? '#10B981' : currentStep >= 2 ? COLORS.primary : '#9CA3AF', opacity: currentStep < 2 ? 0.5 : 1 }}>Payment</p>
              </div>

              {/* Step 3 */}
              <div className="flex-1 text-center">
                <div className="flex justify-center mb-2">
                  {completedSteps.includes(3) ? (
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-lg" style={{ backgroundColor: '#10B981', color: '#FFFFFF' }}>
                      ✓
                    </div>
                  ) : currentStep >= 3 ? (
                    <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm" style={{ backgroundColor: COLORS.primary, color: '#FFFFFF' }}>
                      ●
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border-2" style={{ borderColor: '#D1D5DB', color: '#9CA3AF', opacity: 0.5 }}>
                      ○
                    </div>
                  )}
                </div>
                <p className="text-xs font-semibold" style={{ color: completedSteps.includes(3) ? '#10B981' : currentStep >= 3 ? COLORS.primary : '#9CA3AF', opacity: currentStep < 3 ? 0.5 : 1 }}>Review</p>
              </div>
            </div>

            {/* Success Message */}
            {successMessage && (
              <div className="mt-4 p-3 rounded-lg text-sm font-medium" style={{ backgroundColor: '#ECFDF5', color: '#10B981' }}>
                {successMessage}
              </div>
            )}

            {/* Validation Errors */}
            {validationErrors.length > 0 && (
              <div className="mt-4 p-3 rounded-lg text-sm" style={{ backgroundColor: '#FEF2F2', color: '#DC2626' }}>
                {validationErrors.map((err, i) => (
                  <div key={i}>• {err}</div>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1.2fr] gap-6 items-start">
            {/* Left: Checkout Form */}
            <div className="space-y-4">
              {/* Step 1: Delivery Address */}
              <div
                className="rounded-2xl p-6 transition-all duration-300 hover:shadow-lg"
                style={{ backgroundColor: COLORS.card, boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}
              >
                <h2 className="text-lg font-bold mb-5 flex items-center gap-3" style={{ color: COLORS.textDark }}>
                  <span className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm" style={{ backgroundColor: COLORS.primary, color: '#FFFFFF' }}>
                    1
                  </span>
                  Delivery Address
                </h2>

                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold mb-1.5" style={{ color: '#6B7280' }}>Country/Region</label>
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                      className="w-full px-3 py-3 border-2 rounded-lg text-sm outline-none transition-all duration-200"
                        style={{ borderColor: '#E5E7EB', color: COLORS.textDark }}
                      >
                        <option value="">Select Country</option>
                        <option value="India">India</option>
                        <option value="USA">USA</option>
                        <option value="UK">UK</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1.5" style={{ color: '#6B7280' }}>State</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        placeholder="State/Province"
                        className="w-full px-3 py-3 border-2 rounded-lg text-sm outline-none transition-all duration-200"
                        style={{ borderColor: '#E5E7EB', color: COLORS.textDark }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1.5" style={{ color: '#6B7280' }}>Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                      className="w-full px-3 py-3 border-2 rounded-lg text-sm outline-none transition-all duration-200"
                      style={{ borderColor: '#E5E7EB', color: COLORS.textDark }}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1.5" style={{ color: '#6B7280' }}>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      className="w-full px-3 py-3 border-2 rounded-lg text-sm outline-none transition-all duration-200"
                      style={{ borderColor: '#E5E7EB', color: COLORS.textDark }}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1.5" style={{ color: '#6B7280' }}>Street Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Street address, P.O. box, company name, etc."
                      className="w-full px-3 py-3 border-2 rounded-lg text-sm outline-none transition-all duration-200"
                      style={{ borderColor: '#E5E7EB', color: COLORS.textDark }}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1.5" style={{ color: '#6B7280' }}>Apartment, suite, etc. (optional)</label>
                    <input
                      type="text"
                      name="apartment"
                      value={formData.apartment}
                      onChange={handleInputChange}
                      placeholder="Apartment, suite, unit, building, floor, etc."
                      className="w-full px-3 py-3 border-2 rounded-lg text-sm outline-none transition-all duration-200"
                      style={{ borderColor: '#E5E7EB', color: COLORS.textDark }}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold mb-1.5" style={{ color: '#6B7280' }}>City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="City"
                        className="w-full px-3 py-3 border-2 rounded-lg text-sm outline-none transition-all duration-200"
                        style={{ borderColor: '#E5E7EB', color: COLORS.textDark }}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1.5" style={{ color: '#6B7280' }}>ZIP Code</label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        placeholder="ZIP Code"
                        className="w-full px-3 py-3 border-2 rounded-lg text-sm outline-none transition-all duration-200"
                        style={{ borderColor: '#E5E7EB', color: COLORS.textDark }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1.5" style={{ color: '#6B7280' }}>Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="May need to contact you about delivery"
                      className="w-full px-3 py-3 border-2 rounded-lg text-sm outline-none transition-all duration-200"
                      style={{ borderColor: '#E5E7EB', color: COLORS.textDark }}
                    />
                  </div>

                  <button
                    onClick={handleSaveAddress}
                    disabled={completedSteps.includes(1)}
                    className="w-full font-semibold py-3 rounded-lg transition-all duration-300 hover:shadow-lg text-white mt-2"
                    style={{ backgroundColor: completedSteps.includes(1) ? '#10B981' : COLORS.primary, opacity: completedSteps.includes(1) ? 0.7 : 1, cursor: completedSteps.includes(1) ? 'default' : 'pointer' }}
                  >
                    {completedSteps.includes(1) ? '✓ Address Saved' : 'Save Address & Continue'}
                  </button>
                </div>
              </div>

              {/* Step 2: Payment Method */}
              <div
                className="rounded-2xl p-6 transition-all duration-300 hover:shadow-lg"
                style={{
                  backgroundColor: COLORS.card,
                  boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                  opacity: currentStep < 2 ? 0.5 : 1,
                  pointerEvents: currentStep < 2 ? 'none' : 'auto',
                }}
              >
                <h2 className="text-lg font-bold mb-5 flex items-center gap-3" style={{ color: COLORS.textDark }}>
                  <span className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm" style={{ backgroundColor: currentStep < 2 ? '#D1D5DB' : COLORS.primary, color: '#FFFFFF' }}>
                    {completedSteps.includes(2) ? '✓' : '2'}
                  </span>
                  Payment Method {currentStep < 2 && <span style={{ fontSize: '12px', marginLeft: '8px', color: '#9CA3AF' }}>🔒 Locked</span>}
                </h2>

                {/* Credit Card Option */}
                <div
                  className="rounded-2xl p-4 mb-3 cursor-pointer border-2 transition-all duration-300"
                  style={{
                    borderColor: paymentMethod === 'card' ? COLORS.primary : '#E5E7EB',
                    backgroundColor: paymentMethod === 'card' ? '#F0FDF4' : '#FFFFFF',
                  }}
                  onClick={() => currentStep >= 2 && handlePaymentMethodSelect('card')}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                      style={{ borderColor: COLORS.primary }}
                    >
                      {paymentMethod === 'card' && (
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS.primary }}></div>
                      )}
                    </div>
                    <div className="flex items-center gap-2 flex-1">
                      <span style={{ fontWeight: '700', color: COLORS.textDark, fontSize: '14px' }}>💳 Credit or Debit Card</span>
                      <svg width="40" height="24" viewBox="0 0 40 24" fill="none">
                        <rect width="40" height="24" rx="2" fill="#1a1f71" />
                        <circle cx="12" cy="12" r="5" fill="#FF5F00" />
                        <circle cx="28" cy="12" r="5" fill="#EB001B" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Card Details Form */}
                {paymentMethod === 'card' && currentStep >= 2 && (
                  <div className="space-y-3 mb-4 pb-4" style={{ borderBottomWidth: '1px', borderColor: '#E5E7EB' }}>
                    <div>
                      <label className="block text-xs font-semibold mb-1.5" style={{ color: '#6B7280' }}>Card Number</label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={cardData.cardNumber}
                        onChange={handleCardChange}
                        placeholder="0000 0000 0000 0000"
                        maxLength={19}
                        className="w-full px-3 py-3 border-2 rounded-lg text-sm outline-none transition-all duration-200"
                        style={{ borderColor: '#E5E7EB', color: COLORS.textDark }}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1.5" style={{ color: '#6B7280' }}>Name on Card</label>
                      <input
                        type="text"
                        name="nameOnCard"
                        value={cardData.nameOnCard}
                        onChange={handleCardChange}
                        placeholder="Name exactly as it appears on card"
                        className="w-full px-3 py-3 border-2 rounded-lg text-sm outline-none transition-all duration-200"
                        style={{ borderColor: '#E5E7EB', color: COLORS.textDark }}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold mb-1.5" style={{ color: '#6B7280' }}>Expiration Date</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            name="expiryMonth"
                            value={cardData.expiryMonth}
                            onChange={handleCardChange}
                            placeholder="MM"
                            maxLength={2}
                            className="w-1/2 px-3 py-3 border-2 rounded-lg text-sm outline-none transition-all duration-200"
                            style={{ borderColor: '#E5E7EB', color: COLORS.textDark }}
                          />
                          <input
                            type="text"
                            name="expiryYear"
                            value={cardData.expiryYear}
                            onChange={handleCardChange}
                            placeholder="YY"
                            maxLength={2}
                            className="w-1/2 px-3 py-3 border-2 rounded-lg text-sm outline-none transition-all duration-200"
                            style={{ borderColor: '#E5E7EB', color: COLORS.textDark }}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold mb-1.5" style={{ color: '#6B7280' }}>Security Code</label>
                        <input
                          type="text"
                          name="cvv"
                          value={cardData.cvv}
                          onChange={handleCardChange}
                          placeholder="CVV"
                          maxLength={4}
                          className="w-full px-3 py-3 border-2 rounded-lg text-sm outline-none transition-all duration-200"
                          style={{ borderColor: '#E5E7EB', color: COLORS.textDark }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* PayPal Option */}
                <div
                  className="rounded-2xl p-4 cursor-pointer border-2 transition-all duration-300"
                  style={{
                    borderColor: paymentMethod === 'paypal' ? COLORS.primary : '#E5E7EB',
                    backgroundColor: paymentMethod === 'paypal' ? '#F0FDF4' : '#FFFFFF',
                  }}
                  onClick={() => currentStep >= 2 && handlePaymentMethodSelect('paypal')}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                      style={{ borderColor: COLORS.primary }}
                    >
                      {paymentMethod === 'paypal' && (
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS.primary }}></div>
                      )}
                    </div>
                    <span style={{ fontWeight: '700', color: COLORS.textDark, fontSize: '14px' }}>🅿 PayPal</span>
                  </div>
                </div>
              </div>

              {/* Step 3: Review Items and Shipping */}
              <div
                className="rounded-2xl p-6 transition-all duration-300 hover:shadow-lg"
                style={{
                  backgroundColor: COLORS.card,
                  boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                  opacity: currentStep < 3 ? 0.5 : 1,
                  pointerEvents: currentStep < 3 ? 'none' : 'auto',
                }}
              >
                <h2 className="text-lg font-bold mb-5 flex items-center gap-3" style={{ color: COLORS.textDark }}>
                  <span className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm" style={{ backgroundColor: currentStep < 3 ? '#D1D5DB' : COLORS.primary, color: '#FFFFFF' }}>
                    {completedSteps.includes(3) ? '✓' : '3'}
                  </span>
                  Review Items & Shipping {currentStep < 3 && <span style={{ fontSize: '12px', marginLeft: '8px', color: '#9CA3AF' }}>🔒 Locked</span>}
                </h2>

                <div className="space-y-2 mb-4 pb-4" style={{ borderBottomWidth: '1px', borderColor: '#E5E7EB' }}>
                  {cart.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-start pb-2">
                      <div>
                        <p className="font-medium text-sm" style={{ color: COLORS.textDark }}>{item.name}</p>
                        <p className="text-xs mt-0.5" style={{ color: '#6B7280' }}>Qty: {item.quantity} | Size: {item.size}</p>
                      </div>
                      <p className="font-semibold text-sm" style={{ color: COLORS.primary }}>₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-sm">
                    <span style={{ color: '#6B7280' }}>Arriving Thursday, Oct 25</span>
                    <span className="font-medium" style={{ color: COLORS.textDark }}>Free Shipping</span>
                  </div>
                  <p className="text-xs" style={{ color: '#9CA3AF' }}>
                    You'll receive tracking information by email
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Order Summary */}
            <div>
              <div
                className="rounded-2xl p-6 sticky top-20 transition-all duration-300 hover:shadow-lg"
                style={{ backgroundColor: COLORS.card, boxShadow: '0 4px 20px rgba(0,0,0,0.12)' }}
              >
                <h2 className="text-lg font-bold mb-4" style={{ color: COLORS.textDark }}>Order Summary</h2>

                <div className="space-y-2 mb-4 pb-4" style={{ borderBottomWidth: '1px', borderColor: '#E5E7EB' }}>
                  <div className="flex justify-between text-sm">
                    <span style={{ color: '#6B7280' }}>Items:</span>
                    <span style={{ color: COLORS.textDark, fontWeight: '500' }}>₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span style={{ color: '#6B7280' }}>Shipping:</span>
                    <span style={{ color: COLORS.primary, fontWeight: shipping === 0 ? '600' : '400' }}>
                      {shipping === 0 ? 'FREE' : `₹${shipping}`}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span style={{ color: '#6B7280' }}>Tax:</span>
                    <span style={{ color: COLORS.textDark, fontWeight: '500' }}>₹{tax.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div className="mb-5 pb-5" style={{ borderBottomWidth: '2px', borderColor: '#E5E7EB' }}>
                  <div className="flex justify-between items-center">
                    <span style={{ color: '#6B7280', fontSize: '13px', fontWeight: '600' }}>Total</span>
                    <span className="text-3xl font-bold" style={{ color: COLORS.primary }}>
                      ₹{total.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handlePlaceOrder}
                  disabled={isProcessing || currentStep !== 3}
                  className="w-full font-bold text-base rounded-lg py-3 transition-all duration-500 hover:scale-105 transform mb-4 text-white"
                  style={{
                    backgroundColor: currentStep !== 3 ? '#D1D5DB' : COLORS.primary,
                    opacity: isProcessing || currentStep !== 3 ? 0.7 : 1,
                    cursor: isProcessing || currentStep !== 3 ? 'not-allowed' : 'pointer',
                    boxShadow: currentStep !== 3 ? 'none' : '0 4px 16px rgba(6, 95, 70, 0.2)',
                  }}
                >
                  {isProcessing ? 'Processing...' : currentStep !== 3 ? 'Complete Steps Above' : 'Place your order'}
                </button>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2 p-2.5 rounded-lg" style={{ backgroundColor: '#F9FAFB' }}>
                    <span>🔒</span>
                    <span style={{ color: '#6B7280', fontWeight: '500' }}>Secure Checkout</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-lg" style={{ backgroundColor: '#F9FAFB' }}>
                    <span>↩</span>
                    <span style={{ color: '#6B7280', fontWeight: '500' }}>30-Day Returns</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-lg" style={{ backgroundColor: '#F9FAFB' }}>
                    <span>🚚</span>
                    <span style={{ color: '#6B7280', fontWeight: '500' }}>Fast Delivery</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CheckoutPage;
