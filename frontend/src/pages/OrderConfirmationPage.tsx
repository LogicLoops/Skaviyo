import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Header from '../components/header/Header';
import AnnouncementBar from '../components/announcement/AnnouncementBar';
import Footer from '../components/footer/Footer';

interface OrderData {
  orderNumber: string;
  date: string;
  totalAmount: number;
  paymentMethod: string;
  cardLast4: string;
  estimatedDelivery: string;
  email: string;
  items: any[];
  delivery: any;
}

const OrderConfirmationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { clearCart } = useCart();

  // Get order data from location state
  const orderData: OrderData | null = location.state?.orderData;

  // Color palette
  const COLORS = {
    primary: '#065F46',
    accent: '#D1B06B',
    background: '#F0FDF4',
    card: '#FFFFFF',
    textDark: '#064E3B',
  };

  // Generate order number if not provided
  const generateOrderNumber = () => {
    return `#SK-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`;
  };

  // Format date
  const formatDate = (date: Date | string) => {
    const d = typeof date === 'string' ? new Date(date) : date;
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return d.toLocaleDateString('en-US', options);
  };

  // Calculate estimated delivery (2-3 business days from now)
  const getEstimatedDelivery = () => {
    const today = new Date();
    const deliveryStart = new Date(today.setDate(today.getDate() + 2));
    const deliveryEnd = new Date(today.setDate(today.getDate() + 1));

    return `${deliveryStart.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })} - ${deliveryEnd.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}`;
  };

  const finalOrderData = {
    orderNumber: orderData?.orderNumber || generateOrderNumber(),
    date: orderData?.date || formatDate(new Date()),
    totalAmount: orderData?.totalAmount || 222.60,
    paymentMethod: orderData?.paymentMethod || 'Visa',
    cardLast4: orderData?.cardLast4 || '4242',
    estimatedDelivery: orderData?.estimatedDelivery || getEstimatedDelivery(),
    email: orderData?.email || 'alex@example.com',
  };

  const handleContinueShopping = () => {
    clearCart();
    navigate('/');
  };

  const handleTrackOrder = () => {
    // Placeholder for order tracking page
    alert(`Track order ${finalOrderData.orderNumber} - Coming soon`);
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: COLORS.background }}>
      <AnnouncementBar />
      <Header onCartClick={() => {}} />

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          from {
            transform: scale(0.5);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes checkStroke {
          0% {
            stroke-dashoffset: 100;
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            stroke-dashoffset: 0;
            opacity: 1;
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        @keyframes confetti {
          to {
            transform: translateY(100px) rotate(360deg);
            opacity: 0;
          }
        }

        /* Staggered animations for sections */
        .success-header {
          animation: slideUp 0.6s ease-out forwards;
        }

        .order-card {
          animation: slideUp 0.6s ease-out 0.2s forwards;
          opacity: 0;
        }

        .delivery-card {
          animation: slideUp 0.6s ease-out 0.3s forwards;
          opacity: 0;
        }

        .trust-message {
          animation: slideUp 0.6s ease-out 0.4s forwards;
          opacity: 0;
        }

        .action-buttons {
          animation: slideUp 0.6s ease-out 0.5s forwards;
          opacity: 0;
        }

        .support-link {
          animation: slideUp 0.6s ease-out 0.6s forwards;
          opacity: 0;
        }

        /* Button hover effects */
        .action-button {
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative;
          overflow: hidden;
        }

        .action-button:hover {
          transform: scale(1.02);
        }

        .action-button:active {
          transform: scale(0.98);
        }

        /* Card subtle hover */
        .info-card {
          transition: all 0.3s ease;
        }

        .info-card:hover {
          box-shadow: 0 4px 20px rgba(0,0,0,0.1) !important;
          transform: translateY(-2px);
        }

        /* Checkmark animation */
        .checkmark-icon {
          animation: scaleIn 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        /* Confetti animation */
        .confetti-piece {
          position: fixed;
          pointer-events: none;
          font-size: 1.5rem;
          animation: confetti 2.5s ease-in forwards;
        }
      `}</style>

      <main className="flex-grow px-4 md:px-6 lg:px-8 py-8 md:py-10">
        <div className="max-w-3xl mx-auto">
          {/* Success Header Section */}
          <div className="text-center mb-6 success-header">
            {/* Checkmark Icon */}
            <div className="flex justify-center mb-4">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-3xl checkmark-icon"
                style={{
                  backgroundColor: '#ECFDF5',
                  color: '#10B981',
                }}
              >
                ✓
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold mb-1" style={{ color: COLORS.textDark }}>
              Order Confirmed
            </h1>

            {/* Subtitle */}
            <p className="text-sm md:text-base mb-3" style={{ color: '#6B7280' }}>
              Thank you for shopping with us
            </p>

            {/* Order ID */}
            <p className="text-sm font-semibold" style={{ color: COLORS.primary }}>
              Order ID: {finalOrderData.orderNumber}
            </p>
          </div>

          {/* Main Card - Order Details */}
          <div
            className="rounded-2xl p-6 md:p-7 mb-5 transition-all duration-300 order-card info-card"
            style={{
              backgroundColor: COLORS.card,
              boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
            }}
          >
            {/* Total Amount - Highlighted */}
            <div className="mb-5 pb-5" style={{ borderBottomWidth: '1px', borderColor: '#E5E7EB' }}>
              <p className="text-xs font-semibold uppercase mb-1.5" style={{ color: '#9CA3AF', letterSpacing: '0.5px' }}>
                Total Amount
              </p>
              <p className="text-3xl md:text-4xl font-bold" style={{ color: COLORS.primary }}>
                ${finalOrderData.totalAmount.toFixed(2)}
              </p>
            </div>

            {/* Order Info Grid */}
            <div className="grid grid-cols-2 gap-4 mb-5 pb-5" style={{ borderBottomWidth: '1px', borderColor: '#E5E7EB' }}>
              {/* Date */}
              <div>
                <p className="text-xs font-semibold uppercase mb-1.5" style={{ color: '#9CA3AF', letterSpacing: '0.5px' }}>
                  Order Date
                </p>
                <p className="text-sm font-medium" style={{ color: COLORS.textDark }}>
                  {finalOrderData.date}
                </p>
              </div>

              {/* Payment */}
              <div>
                <p className="text-xs font-semibold uppercase mb-1.5" style={{ color: '#9CA3AF', letterSpacing: '0.5px' }}>
                  Payment Method
                </p>
                <p className="text-sm font-medium" style={{ color: COLORS.textDark }}>
                  {finalOrderData.paymentMethod} •••• {finalOrderData.cardLast4}
                </p>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="flex items-start gap-3 p-3 rounded-lg" style={{ backgroundColor: '#F9FAFB' }}>
              <span className="text-xl mt-0.5">🚚</span>
              <div className="flex-1">
                <p className="text-xs font-semibold uppercase mb-0.5" style={{ color: '#9CA3AF', letterSpacing: '0.5px' }}>
                  Estimated Delivery
                </p>
                <p className="text-sm font-medium" style={{ color: COLORS.textDark }}>
                  {finalOrderData.estimatedDelivery}
                </p>
              </div>
            </div>
          </div>

          {/* Delivery Address Section */}
          {orderData?.delivery && (
            <div
              className="rounded-2xl p-6 md:p-7 mb-5 transition-all duration-300 delivery-card info-card"
              style={{
                backgroundColor: COLORS.card,
                boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
              }}
            >
              <h3 className="text-sm font-semibold uppercase mb-3" style={{ color: COLORS.textDark, letterSpacing: '0.5px' }}>
                📍 Delivery Address
              </h3>
              <p className="text-sm mb-1" style={{ color: '#6B7280' }}>
                {orderData.delivery.fullName}
              </p>
              <p className="text-sm mb-1" style={{ color: '#6B7280' }}>
                {orderData.delivery.address}
                {orderData.delivery.apartment && `, ${orderData.delivery.apartment}`}
              </p>
              <p className="text-sm mb-1" style={{ color: '#6B7280' }}>
                {orderData.delivery.city}, {orderData.delivery.state} {orderData.delivery.zipCode}
              </p>
              <p className="text-sm" style={{ color: '#6B7280' }}>
                {orderData.delivery.country}
              </p>
            </div>
          )}

          {/* Trust Message */}
          <div className="text-center mb-5 p-3 rounded-lg trust-message" style={{ backgroundColor: '#ECFDF5' }}>
            <p className="text-xs md:text-sm" style={{ color: '#059669' }}>
              ✓ You will receive a confirmation email shortly at <span style={{ fontWeight: '600' }}>{finalOrderData.email}</span>
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mb-5 action-buttons">
            <button
              onClick={handleTrackOrder}
              className="flex-1 font-semibold py-3 px-6 rounded-full transition-all duration-300 hover:shadow-lg text-white action-button"
              style={{
                backgroundColor: COLORS.primary,
                boxShadow: '0 2px 10px rgba(6, 95, 70, 0.15)',
              }}
            >
              Track Order
            </button>

            <button
              onClick={handleContinueShopping}
              className="flex-1 font-semibold py-3 px-6 rounded-full transition-all duration-300 border-2 hover:bg-gray-50 action-button"
              style={{
                borderColor: COLORS.primary,
                color: COLORS.primary,
                backgroundColor: '#FFFFFF',
              }}
            >
              Continue Shopping
            </button>
          </div>

          {/* Support Link */}
          <div className="text-center support-link">
            <p className="text-xs" style={{ color: '#9CA3AF' }}>
              Need help?{' '}
              <a
                href="#support"
                className="transition-colors duration-200 hover:text-opacity-80 hover:opacity-100"
                style={{ color: COLORS.primary, fontWeight: '600', textDecoration: 'none' }}
              >
                Contact Support
              </a>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OrderConfirmationPage;
