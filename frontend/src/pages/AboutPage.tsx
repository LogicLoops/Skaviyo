import { useNavigate } from 'react-router-dom';
import Header from '../components/header/Header';
import AnnouncementBar from '../components/announcement/AnnouncementBar';
import Footer from '../components/footer/Footer';

const AboutPage = () => {
  const navigate = useNavigate();

  const values = [
    {
      icon: '🌿',
      title: 'Sustainability First',
      description:
        'We use eco-friendly fabrics and responsible manufacturing practices to reduce our environmental footprint — because fashion and the planet can coexist.',
    },
    {
      icon: '✂️',
      title: 'Premium Craftsmanship',
      description:
        'Every Skaviyo garment is crafted with precision and care. We source premium cotton blends that feel great, wear well, and last long.',
    },
    {
      icon: '🎨',
      title: 'Original Designs',
      description:
        'From bold statement prints to subtle elegance, our in-house design team creates collections that reflect modern Indian and global aesthetics.',
    },
    {
      icon: '🤝',
      title: 'Inclusive Fashion',
      description:
        'We design for everyone — men, women, couples, groups, and even custom orders. Fashion that brings people together.',
    },
  ];

  const collections = [
    { name: 'Men', desc: 'The Royal Gentlemen Collection — sharp, sophisticated, bold.' },
    { name: 'Women', desc: 'Graceful designs with a modern edge for everyday elegance.' },
    { name: 'Couples', desc: 'Matching outfits designed for moments that matter.' },
    { name: 'Group & Team', desc: 'Bulk custom orders for teams, events, and celebrations.' },
    { name: 'Sports', desc: 'Performance meets style for an active lifestyle.' },
    { name: 'Create Your Own', desc: 'Your vision, your design. Fully personalised T-shirts.' },
  ];

  return (
    <div className="min-h-screen bg-green-50">
      <AnnouncementBar />
      <Header />

      {/* Hero */}
      <div className="bg-teal-900 py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About Skaviyo</h1>
          <p className="text-yellow-400 text-lg font-medium mb-4">Premium. Sustainable. Made for You.</p>
          <p className="text-gray-300 text-base max-w-2xl mx-auto">
            We're an Indian fashion brand on a mission to make premium, sustainable clothing accessible to everyone —
            without compromising on style or quality.
          </p>
        </div>
      </div>

      {/* Our Story */}
      <div className="max-w-4xl mx-auto px-4 py-14">
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 mb-8">
          <h2 className="text-2xl font-bold text-teal-900 mb-4">Our Story</h2>
          <div className="text-gray-700 leading-relaxed space-y-4">
            <p>
              Skaviyo was born from a simple idea: that everyday clothing should be something you're proud to wear.
              Too often, people settle for fast fashion that fades, shrinks, or falls apart after a few washes.
              We set out to change that.
            </p>
            <p>
              Founded in India, Skaviyo combines the finest sustainable fabrics with original, contemporary designs
              to create T-shirts and apparel that genuinely stand out. Whether you're dressing for a casual day out,
              a team event, or gifting a matching set to someone special — we've got you covered.
            </p>
            <p>
              From our first collection to the Royal Gentlemen range, every drop reflects our commitment to
              thoughtful design, responsible production, and the people who wear our clothes.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-teal-900 mb-6 text-center">What We Stand For</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {values.map((v) => (
              <div
                key={v.title}
                className="bg-white rounded-2xl shadow-sm p-6 flex gap-4 items-start"
              >
                <span className="text-3xl flex-shrink-0">{v.icon}</span>
                <div>
                  <h3 className="font-bold text-teal-900 mb-1">{v.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{v.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Collections */}
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 mb-8">
          <h2 className="text-2xl font-bold text-teal-900 mb-6">Our Collections</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {collections.map((c) => (
              <div key={c.name} className="bg-green-50 rounded-xl p-4 border border-green-100">
                <h3 className="font-bold text-teal-900 mb-1">{c.name}</h3>
                <p className="text-gray-600 text-sm">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact / Reach Us */}
        <div className="bg-teal-900 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-2xl font-bold mb-3">Get in Touch</h2>
          <p className="text-gray-300 mb-6 max-w-lg mx-auto text-sm">
            Have a question, a custom order request, or just want to say hello? Our team is always happy to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 text-sm mb-6">
            <div className="bg-white/10 rounded-xl px-6 py-4">
              <div className="text-yellow-400 font-semibold mb-1">Email</div>
              <a href="mailto:support@skaviyo.com" className="text-white hover:text-yellow-400 transition-colors">
                support@skaviyo.com
              </a>
            </div>
            <div className="bg-white/10 rounded-xl px-6 py-4">
              <div className="text-yellow-400 font-semibold mb-1">Support Hours</div>
              <div className="text-gray-300">Mon – Sat, 10 AM – 6 PM IST</div>
            </div>
            <div className="bg-white/10 rounded-xl px-6 py-4">
              <div className="text-yellow-400 font-semibold mb-1">Country</div>
              <div className="text-gray-300">India</div>
            </div>
          </div>
          <button
            onClick={() => navigate('/support')}
            className="px-8 py-3 bg-yellow-600 hover:bg-yellow-500 text-teal-900 font-bold rounded-full transition-all duration-300"
          >
            Contact Support
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutPage;
