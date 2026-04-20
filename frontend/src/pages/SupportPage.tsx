import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/header/Header';
import AnnouncementBar from '../components/announcement/AnnouncementBar';
import Footer from '../components/footer/Footer';

const SupportPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Color palette
  const COLORS = {
    primary: '#065F46',
    accent: '#D1B06B',
    background: '#F0FDF4',
    card: '#FFFFFF',
    textDark: '#064E3B',
  };

  const supportCategories = [
    {
      icon: '📦',
      title: 'Orders & Status',
      description: 'Track your order and check status',
    },
    {
      icon: '↩',
      title: 'Returns & Exchange',
      description: 'Easy returns and exchanges',
    },
    {
      icon: '👕',
      title: 'Product & Sizing',
      description: 'Find the right size and fit',
    },
    {
      icon: '💳',
      title: 'Billing & Payment',
      description: 'Payment and billing help',
    },
  ];

  const quickSupport = [
    {
      icon: '💬',
      title: 'Live Chat',
      description: 'Wait time < 2 mins',
      tag: 'Available Now',
    },
    {
      icon: '✉',
      title: 'Email Support',
      description: 'support@skaviyo.com',
      tag: '24/7 Available',
    },
    {
      icon: '☎',
      title: 'Call Concierge',
      description: 'Mon-Fri, 9am - 6pm EST',
      tag: '+1 (800) SKV-HELP',
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Support message:', formData);
      setIsLoading(false);
      setSubmitted(true);
      
      setTimeout(() => {
        setFormData({ name: '', email: '', message: '' });
        setSubmitted(false);
      }, 3000);
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col support-main" style={{ backgroundColor: COLORS.background }}>
      {/* Floating Background Shapes */}
      <div className="floating-shape shape-1" />
      <div className="floating-shape shape-2" />
      <div className="floating-shape shape-3" />

      <AnnouncementBar />
      <Header onCartClick={() => {}} />

      <style>{`
        /* Gradient Background */
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        /* Hero Animations */
        @keyframes heroFadeInUp {
          from {
            opacity: 0;
            transform: translateY(25px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Slide Up with Stagger */
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

        /* Icon Animations */
        @keyframes iconBounce {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-8px) scale(1.05);
          }
        }

        @keyframes iconRotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        /* Input Focus Glow */
        @keyframes inputGlow {
          0% {
            box-shadow: 0 0 0 0 rgba(6, 95, 70, 0.2);
          }
          70% {
            box-shadow: 0 0 0 8px rgba(6, 95, 70, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(6, 95, 70, 0);
          }
        }

        /* Button Loading Spinner */
        @keyframes buttonSpin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        /* Success Checkmark */
        @keyframes checkmarkScale {
          0% {
            transform: scale(0) rotate(-45deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.1) rotate(10deg);
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }

        @keyframes successSlideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Pulse Glow */
        @keyframes pulseGlow {
          0%, 100% {
            box-shadow: 0 2px 12px rgba(6, 95, 70, 0.1);
          }
          50% {
            box-shadow: 0 2px 20px rgba(6, 95, 70, 0.25);
          }
        }

        /* Hero Title */
        .hero-title {
          animation: heroFadeInUp 0.8s ease-out;
        }

        /* Hero Subtitle */
        .hero-subtitle {
          animation: heroFadeInUp 0.8s ease-out 0.2s both;
        }

        /* Category Cards */
        .category-card {
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          animation: slideUp 0.6s ease-out;
          position: relative;
          overflow: hidden;
        }

        .category-card::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(209, 176, 107, 0.05) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .category-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 12px 28px rgba(6, 95, 70, 0.12);
        }

        .category-card:hover::before {
          opacity: 1;
        }

        /* Category Icon */
        .category-icon {
          transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
          display: inline-block;
        }

        .category-card:hover .category-icon {
          animation: iconBounce 0.6s ease-out;
        }

        /* Form Section */
        .form-section {
          animation: slideUp 0.6s ease-out 0.1s both;
        }

        .form-input {
          transition: all 0.3s ease;
          border: 2px solid #E5E7EB;
          position: relative;
        }

        .form-input:focus {
          border-color: ${COLORS.primary};
          box-shadow: 0 0 0 4px rgba(6, 95, 70, 0.1), inset 0 0 0 1px ${COLORS.primary};
          animation: inputGlow 0.6s ease-out;
          background-color: rgba(240, 253, 244, 0.6);
        }

        .form-input::placeholder {
          color: #D1D5DB;
          transition: color 0.3s ease;
        }

        .form-input:focus::placeholder {
          color: #9CA3AF;
        }

        /* Submit Button */
        .submit-btn {
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative;
          overflow: hidden;
          font-weight: 700;
          font-size: 1rem;
          letter-spacing: 0.3px;
        }

        .submit-btn:hover:not(:disabled) {
          transform: scale(1.03);
          box-shadow: 0 4px 16px rgba(6, 95, 70, 0.25);
        }

        .submit-btn:active:not(:disabled) {
          transform: scale(0.98);
        }

        .submit-btn:disabled {
          opacity: 0.85;
          cursor: not-allowed;
        }

        .submit-btn::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          transform: translate(-50%, -50%);
          transition: width 0.6s, height 0.6s;
        }

        .submit-btn:active::after {
          width: 100px;
          height: 100px;
        }

        /* Spinner Animation */
        .spinner {
          display: inline-block;
          width: 16px;
          height: 16px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: buttonSpin 1s linear infinite;
          margin-right: 6px;
          vertical-align: middle;
        }

        /* Success Message */
        .success-message {
          animation: successSlideIn 0.5s ease-out;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .success-checkmark {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 20px;
          height: 20px;
          font-weight: bold;
          animation: checkmarkScale 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        /* Quick Support Section */
        .quick-support-section {
          animation: slideUp 0.6s ease-out 0.2s both;
        }

        .quick-support-item {
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative;
          overflow: hidden;
        }

        .quick-support-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(6, 95, 70, 0.05), transparent);
          transition: left 0.5s ease;
        }

        .quick-support-item:hover {
          transform: translateX(6px);
          background-color: rgba(240, 253, 244, 0.8);
          border-color: ${COLORS.primary};
          box-shadow: 0 4px 16px rgba(6, 95, 70, 0.1);
        }

        .quick-support-item:hover::before {
          left: 100%;
        }

        /* Support Icon Animation */
        .support-icon {
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .quick-support-item:hover .support-icon {
          animation: iconRotate 0.6s ease-out;
        }

        /* Tag Styling */
        .support-tag {
          transition: all 0.3s ease;
          font-weight: 600;
          letter-spacing: 0.2px;
        }

        .quick-support-item:hover .support-tag {
          background-color: ${COLORS.primary};
          color: white;
          box-shadow: 0 2px 8px rgba(6, 95, 70, 0.2);
        }

        /* Back Button */
        .back-button {
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          position: relative;
        }

        .back-button::before {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background: ${COLORS.accent};
          transition: width 0.3s ease;
        }

        .back-button:hover::before {
          width: 100%;
        }

        .back-button:hover {
          transform: translateX(-2px);
        }

        /* Floating Background Shapes */
        .floating-shape {
          position: fixed;
          border-radius: 50%;
          opacity: 0.03;
          pointer-events: none;
          filter: blur(40px);
        }

        .shape-1 {
          width: 300px;
          height: 300px;
          background: linear-gradient(135deg, ${COLORS.primary}, ${COLORS.accent});
          top: -50px;
          right: -50px;
          animation: gradientShift 8s ease-in-out infinite;
        }

        .shape-2 {
          width: 250px;
          height: 250px;
          background: linear-gradient(135deg, ${COLORS.accent}, ${COLORS.primary});
          bottom: 100px;
          left: -80px;
          animation: gradientShift 10s ease-in-out infinite;
        }

        .shape-3 {
          width: 200px;
          height: 200px;
          background: linear-gradient(135deg, ${COLORS.primary}, ${COLORS.accent});
          bottom: -50px;
          right: 100px;
          animation: gradientShift 12s ease-in-out infinite;
        }

        /* Main Container */
        .support-main {
          background: linear-gradient(135deg, ${COLORS.background} 0%, rgba(209, 176, 107, 0.02) 100%);
          position: relative;
          overflow: hidden;
        }

        /* Category Grid */
        .category-grid {
          animation: fadeIn 0.6s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        /* Contact Section */
        .contact-section {
          animation: slideUp 0.6s ease-out 0.15s both;
        }

        /* Responsive Animations */
        @media (max-width: 768px) {
          .category-card:hover {
            transform: translateY(-4px) scale(1.01);
          }

          .submit-btn:hover:not(:disabled) {
            transform: scale(1.02);
          }

          .quick-support-item:hover {
            transform: translateX(3px);
          }
        }
      `}</style>

      <main className="flex-grow px-4 md:px-6 lg:px-8 py-10 md:py-14 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-14 relative z-10">
            <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl font-bold mb-4" style={{ color: COLORS.textDark }}>
              How can we assist you?
            </h1>
            <p className="hero-subtitle text-base md:text-lg" style={{ color: '#6B7280' }}>
              Our concierge team is here to help with your orders,<br />
              styling advice, and more.
            </p>
          </div>

          {/* Support Categories Grid */}
          <div className="category-grid grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
            {supportCategories.map((category, idx) => (
              <div
                key={idx}
                className="category-card rounded-2xl p-6 text-center cursor-pointer"
                style={{
                  backgroundColor: COLORS.card,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  animationDelay: `${idx * 0.08}s`,
                }}
              >
                <div className="category-icon text-4xl md:text-5xl mb-4">{category.icon}</div>
                <h3 className="text-sm md:text-base font-semibold mb-2" style={{ color: COLORS.textDark }}>
                  {category.title}
                </h3>
                <p className="text-xs md:text-sm" style={{ color: '#9CA3AF' }}>
                  {category.description}
                </p>
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <div className="contact-section grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Left: Contact Form */}
            <div
              className="form-section lg:col-span-2 rounded-2xl p-6 md:p-8"
              style={{
                backgroundColor: COLORS.card,
                boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
              }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-7" style={{ color: COLORS.textDark }}>
                Send us a message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Input */}
                <div className="group">
                  <label className="block text-sm font-semibold mb-3" style={{ color: '#6B7280' }}>
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Alex Doe"
                    className="form-input w-full px-4 py-3 border-2 rounded-xl text-sm outline-none bg-white"
                    style={{ borderColor: '#E5E7EB', color: COLORS.textDark }}
                    required
                  />
                </div>

                {/* Email Input */}
                <div className="group">
                  <label className="block text-sm font-semibold mb-3" style={{ color: '#6B7280' }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="alex@example.com"
                    className="form-input w-full px-4 py-3 border-2 rounded-xl text-sm outline-none bg-white"
                    style={{ borderColor: '#E5E7EB', color: COLORS.textDark }}
                    required
                  />
                </div>

                {/* Message Input */}
                <div className="group">
                  <label className="block text-sm font-semibold mb-3" style={{ color: '#6B7280' }}>
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Describe your issue or question..."
                    rows={5}
                    className="form-input w-full px-4 py-3 border-2 rounded-xl text-sm outline-none resize-none bg-white"
                    style={{ borderColor: '#E5E7EB', color: COLORS.textDark }}
                    required
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="submit-btn w-full font-bold py-3 px-6 rounded-full text-white transition-all duration-300 flex items-center justify-center"
                  style={{
                    backgroundColor: COLORS.primary,
                    boxShadow: '0 2px 10px rgba(6, 95, 70, 0.15)',
                  }}
                >
                  {isLoading ? (
                    <>
                      <span className="spinner"></span>
                      Sending...
                    </>
                  ) : submitted ? (
                    <>
                      <span style={{ marginRight: '8px' }}>✓</span>
                      Message Sent
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>

                {submitted && (
                  <div className="success-message p-4 rounded-xl text-center font-semibold" style={{ backgroundColor: '#ECFDF5', color: '#10B981' }}>
                    <span className="success-checkmark">✓</span>
                    Thank you! We'll respond within 24 hours.
                  </div>
                )}
              </form>
            </div>

            {/* Right: Quick Support */}
            <div
              className="quick-support-section rounded-2xl p-6 md:p-8"
              style={{
                backgroundColor: COLORS.card,
                boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
              }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: COLORS.textDark }}>
                Quick Support
              </h2>
              <p className="text-sm mb-7" style={{ color: '#9CA3AF' }}>
                Need faster answers? Connect with our team directly.
              </p>

              <div className="space-y-4">
                {quickSupport.map((item, idx) => (
                  <div
                    key={idx}
                    className="quick-support-item p-4 rounded-xl border-2 transition-all duration-400 cursor-pointer"
                    style={{
                      borderColor: '#E5E7EB',
                      backgroundColor: '#F9FAFB',
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <span className="support-icon text-3xl flex-shrink-0 mt-0.5 transition-all duration-500">{item.icon}</span>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold mb-1" style={{ color: COLORS.textDark }}>
                          {item.title}
                        </h3>
                        <p className="text-xs mb-2" style={{ color: '#9CA3AF' }}>
                          {item.description}
                        </p>
                        <span className="support-tag inline-block text-xs px-3 py-1.5 rounded-full transition-all duration-300" style={{ backgroundColor: '#ECFDF5', color: COLORS.primary }}>
                          {item.tag}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Contact Info */}
              <div className="mt-8 pt-8" style={{ borderTopWidth: '1px', borderColor: '#E5E7EB' }}>
                <p className="text-xs font-semibold mb-3" style={{ color: '#6B7280', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                  General Inquiries
                </p>
                <a 
                  href="mailto:hello@skaviyo.com"
                  className="text-sm font-semibold transition-all duration-300 hover:text-yellow-600" 
                  style={{ color: COLORS.textDark }}
                >
                  hello@skaviyo.com
                </a>
              </div>
            </div>
          </div>

          {/* Back to Home */}
          <div className="text-center mt-12">
            <button
              onClick={() => navigate('/')}
              className="back-button text-sm font-semibold transition-all duration-300 hover:opacity-80 relative"
              style={{ color: COLORS.primary }}
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SupportPage;
