interface GoldStandardBannerProps {
  onLearnMore?: () => void;
}

const GoldStandardBanner = ({ onLearnMore }: GoldStandardBannerProps) => {
  return (
    <section className="px-4 md:px-8 py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-teal-700 via-teal-800 to-emerald-900 p-8 md:p-16 shadow-2xl">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-600/10 rounded-full blur-3xl -mr-48 -mt-48" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-600/10 rounded-full blur-3xl -ml-48 -mb-48" />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left Content */}
            <div>
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-yellow-600/20 border border-yellow-600/40 mb-6">
                <span className="text-xs font-semibold text-yellow-300 uppercase tracking-wider">
                  The Gold Standard
                </span>
              </div>

              {/* Heading */}
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                Premium Collection Launch
              </h2>

              {/* Description */}
              <p className="text-lg md:text-xl text-gray-100 mb-8 leading-relaxed">
                Experience our most exclusive line of gentleman's wear. Handcrafted with meticulous attention to detail, featuring premium Italian fabrics and artisanal finishing.
              </p>

              {/* Features */}
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                  <span className="text-white text-sm">Limited edition collection</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                  <span className="text-white text-sm">Premium Italian & Swiss fabrics</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                  <span className="text-white text-sm">Handcrafted by master artisans</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={onLearnMore}
                  className="px-8 py-4 bg-yellow-500 hover:bg-yellow-400 text-teal-900 font-bold rounded-full transition-all duration-300 hover:scale-105 text-lg flex items-center justify-center gap-2"
                >
                  Learn More
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </button>
                <button className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-full border border-white/30 transition-all duration-300 text-lg">
                  View Collection
                </button>
              </div>
            </div>

            {/* Right - Image */}
            <div className="relative hidden md:block">
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=500&fit=crop"
                  alt="Premium gentleman"
                  className="w-full h-full object-cover"
                />
                {/* Premium Badge */}
                <div className="absolute top-6 right-6 bg-yellow-500 text-teal-900 px-4 py-2 rounded-full font-bold text-sm">
                  Premium
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoldStandardBanner;
