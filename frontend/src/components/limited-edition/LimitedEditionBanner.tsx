interface LimitedEditionBannerProps {
  onShopClick?: () => void;
}

const LimitedEditionBanner = ({ onShopClick }: LimitedEditionBannerProps) => {
  return (
    <section className="relative px-4 md:px-8 py-10 md:py-14 bg-gradient-to-b from-emerald-50 to-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Banner Container */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-teal-900 via-teal-800 to-emerald-900 p-6 md:p-12">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-600/10 rounded-full blur-3xl -mr-48 -mt-48" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-600/10 rounded-full blur-3xl -ml-48 -mb-48" />

          {/* Content */}
          <div className="relative z-10 max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-yellow-600/20 border border-yellow-600/40 mb-4">
              <span className="text-xs font-semibold text-yellow-300 uppercase tracking-wider">
                Limited Availability
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 leading-tight tracking-tight">
              Limited Edition Drop
            </h2>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-gray-200 mb-6 leading-relaxed max-w-lg">
              Exclusively designed pieces available for a short time only. Once they're gone, they're gone forever.
            </p>

            {/* Features - Optional */}
            <div className="flex flex-wrap gap-6 md:gap-8 mb-8">
              <div>
                <p className="text-sm text-gray-300 mb-1">Collection Size</p>
                <p className="text-2xl font-bold text-yellow-400">500 Pieces</p>
              </div>
              <div>
                <p className="text-sm text-gray-300 mb-1">Available Until</p>
                <p className="text-2xl font-bold text-yellow-400">Limited Period</p>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={onShopClick}
              className="inline-flex items-center px-8 py-4 bg-yellow-500 hover:bg-yellow-400 text-teal-900 font-bold rounded-full transition-all duration-300 hover:scale-105 text-lg"
            >
              Shop Now
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LimitedEditionBanner;
