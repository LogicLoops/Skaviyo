const WhyThisCollection = () => {
  const reasons = [
    {
      icon: '✨',
      title: 'Timeless Design',
      description: 'Each piece is designed to transcend trends and seasons, becoming a wardrobe staple for years to come.'
    },
    {
      icon: '🌿',
      title: 'Sustainable Luxury',
      description: 'We source premium cotton responsibly, ensuring our pieces are as kind to the planet as they are to your skin.'
    },
    {
      icon: '🏆',
      title: 'Artisan Crafted',
      description: 'Every garment is crafted with meticulous attention to detail by skilled artisans. Quality you can feel.'
    },
    {
      icon: '💎',
      title: 'Premium Materials',
      description: 'Egyptian cotton, premium blends, and fine craftsmanship ensure unmatched comfort and durability.'
    },
    {
      icon: '👥',
      title: 'Versatile Style',
      description: 'Perfect for any occasion. Dress up or down. The Royal Gentlemen collection adapts to your lifestyle.'
    },
    {
      icon: '🔄',
      title: 'Lifetime Support',
      description: '30-day hassle-free returns, repairs, and lifetime customer support. We stand behind every piece.'
    }
  ];

  return (
    <section className="px-4 md:px-8 py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-teal-700 uppercase tracking-widest mb-3">
            The Collection
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why The <span className="text-yellow-600">Royal Gentlemen</span>?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We believe in creating more than just clothes. We create pieces that tell a story, pieces that last, and pieces that make you feel exceptional.
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="group bg-gradient-to-br from-emerald-50 to-white p-8 rounded-2xl border border-emerald-100 hover:border-yellow-300 hover:shadow-lg transition-all duration-300"
            >
              {/* Icon */}
              <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                {reason.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {reason.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed text-sm">
                {reason.description}
              </p>

              {/* Accent Line */}
              <div className="h-1 w-8 bg-gradient-to-r from-yellow-600 to-teal-700 mt-4" />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-6">
            Ready to experience the difference premium quality makes?
          </p>
          <button className="px-8 py-3 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl">
            Shop The Collection
          </button>
        </div>
      </div>
    </section>
  );
};

export default WhyThisCollection;
