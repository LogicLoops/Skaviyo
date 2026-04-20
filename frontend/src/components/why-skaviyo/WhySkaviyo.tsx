const WhySkaviyo = () => {
  const features = [
    {
      id: 1,
      icon: '✨',
      title: 'Premium Fabric',
      description: 'Finest cotton blends sourced sustainably for supreme comfort and durability',
    },
    {
      id: 2,
      icon: '🎨',
      title: 'Unique Designs',
      description: 'Curated collections from independent artists and celebrated designers',
    },
    {
      id: 3,
      icon: '⚡',
      title: 'Fast Delivery',
      description: '5-7 business day turnaround with free shipping on orders over $150',
    },
    {
      id: 4,
      icon: '↩️',
      title: 'Easy Returns',
      description: '30-day money-back guarantee. No questions asked, no hassle returns',
    },
  ];

  return (
    <section className="px-4 md:px-8 py-8 md:py-10 bg-gradient-to-b from-emerald-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Why Skaviyo
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're committed to delivering premium quality, exceptional design, and outstanding customer experience
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-teal-700 to-yellow-600 mx-auto mt-4" />
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-yellow-200"
            >
              {/* Icon */}
              <div className="text-5xl mb-4">{feature.icon}</div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed text-sm">
                {feature.description}
              </p>

              {/* Accent Line */}
              <div className="h-1 w-8 bg-gradient-to-r from-yellow-600 to-teal-700 mt-6" />
            </div>
          ))}
        </div>

        {/* Bottom Stats - Optional */}
        <div className="mt-10 md:mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 bg-gradient-to-r from-teal-900 to-emerald-900 rounded-3xl p-8 md:p-10">
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">50K+</div>
            <p className="text-gray-200">Happy Customers</p>
          </div>
          <div className="text-center border-l border-r border-gray-700">
            <div className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">100%</div>
            <p className="text-gray-200">Premium Quality</p>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">150+</div>
            <p className="text-gray-200">Design Collections</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhySkaviyo;
