import { useNavigate } from 'react-router-dom';
import Header from '../components/header/Header';
import AnnouncementBar from '../components/announcement/AnnouncementBar';
import Footer from '../components/footer/Footer';

const steps = [
  { step: '01', icon: '👕', title: 'Choose Your Base', desc: 'Pick from our premium cotton blanks — white, black, or any custom colour. Select your fit (regular, oversized, crop).' },
  { step: '02', icon: '🎨', title: 'Upload Your Design', desc: 'Upload your artwork, logo, or photo. Our team will optimise it for the best print quality.' },
  { step: '03', icon: '📐', title: 'Customise Placement', desc: 'Choose print placement — front chest, full front, back, sleeve, or all over. We\'ll send a digital proof for approval.' },
  { step: '04', icon: '✅', title: 'Approve & Order', desc: 'Review your digital proof, confirm sizes and quantities, and place your order. Production begins on approval.' },
];

const options = [
  { icon: '🖨️', title: 'DTG Printing', desc: 'Direct-to-garment for photorealistic detail on light or dark fabric.' },
  { icon: '🧵', title: 'Embroidery', desc: 'Textured, premium stitched designs — ideal for logos and brand marks.' },
  { icon: '🎭', title: 'Screen Printing', desc: 'Bold, vibrant colours for bulk orders. Best for 10+ units.' },
  { icon: '✨', title: 'Vinyl / Heat Transfer', desc: 'Metallic, glitter, and specialty finishes for standout designs.' },
];

const CreateYourOwnPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-green-50">
      <AnnouncementBar />
      <Header
        onCartClick={() => navigate('/cart')}
        onWishlistClick={() => {}}
        onSignInClick={() => {}}
        onSearch={() => {}}
        onCustomerCareClick={() => navigate('/support')}
      />

      {/* Hero */}
      <div className="bg-gradient-to-br from-teal-900 via-emerald-900 to-teal-800 py-16 md:py-24 relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/5" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-white/5" />
        <div className="max-w-4xl mx-auto px-4 text-center relative">
          <span className="inline-block px-4 py-1.5 rounded-full bg-yellow-500/20 text-yellow-300 text-xs font-semibold uppercase tracking-widest mb-4">
            Fully Customisable
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
            Create Your Own
          </h1>
          <p className="text-yellow-400 text-xl font-medium mb-4">Your vision. Your tee. Your story.</p>
          <p className="text-gray-300 text-base max-w-2xl mx-auto leading-relaxed">
            Design a truly one-of-a-kind tee using our premium cotton blanks. Upload your artwork,
            choose your print technique, and we'll bring it to life with the same quality as our own collections.
          </p>
          <button
            onClick={() => navigate('/support')}
            className="mt-8 px-8 py-4 bg-yellow-600 hover:bg-yellow-500 text-teal-900 font-bold rounded-full text-base transition-all duration-300 inline-block"
          >
            Start Your Design → Contact Us
          </button>
        </div>
      </div>

      {/* How It Works */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-teal-900">How It Works</h2>
          <div className="w-12 h-1 bg-gradient-to-r from-teal-700 to-yellow-500 mx-auto mt-3" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s) => (
            <div key={s.step} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{s.icon}</span>
                <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2 py-1 rounded-full">Step {s.step}</span>
              </div>
              <h3 className="font-bold text-teal-900 mb-2">{s.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Print Options */}
      <div className="bg-white py-14">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-teal-900">Print Techniques</h2>
            <p className="text-gray-500 mt-2 text-sm">Choose the technique that best suits your design and quantity</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {options.map((o) => (
              <div key={o.title} className="flex gap-4 items-start">
                <span className="text-3xl flex-shrink-0">{o.icon}</span>
                <div>
                  <h4 className="font-bold text-teal-900 mb-1">{o.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{o.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="bg-teal-900 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-2xl font-bold mb-3">Pricing</h2>
          <p className="text-gray-300 mb-6 max-w-lg mx-auto text-sm">
            Custom pricing depends on your design, print technique, and quantity.
            Single pieces start from ₹1,499 extra on top of the base tee price.
            Bulk orders of 10+ get a 15% discount.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 text-sm">
            <div className="bg-white/10 rounded-xl p-4">
              <div className="text-yellow-400 font-bold text-lg mb-1">1–4 pieces</div>
              <div className="text-gray-300">+₹1,499 / tee<br />Standard processing</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <div className="text-yellow-400 font-bold text-lg mb-1">5–9 pieces</div>
              <div className="text-gray-300">+₹999 / tee<br />5% off base price</div>
            </div>
            <div className="bg-yellow-600/30 border border-yellow-500/30 rounded-xl p-4">
              <div className="text-yellow-400 font-bold text-lg mb-1">10+ pieces</div>
              <div className="text-gray-300">+₹699 / tee<br />15% off base price</div>
            </div>
          </div>
          <button
            onClick={() => navigate('/support')}
            className="px-8 py-3 bg-yellow-600 hover:bg-yellow-500 text-teal-900 font-bold rounded-full transition-all"
          >
            Get a Custom Quote
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CreateYourOwnPage;
