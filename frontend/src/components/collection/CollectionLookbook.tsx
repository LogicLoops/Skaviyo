const CollectionLookbook = () => {
  const lookbookItems = [
    {
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=500&fit=crop',
      title: 'Casual Elegance',
      description: 'Effortless style for everyday wear',
    },
    {
      image: 'https://images.unsplash.com/photo-1503342217343-583ce714fbab?w=600&h=500&fit=crop',
      title: 'Office Ready',
      description: 'Professional meets comfortable',
    },
    {
      image: 'https://images.unsplash.com/photo-1512990415879-d21964eb0560?w=600&h=500&fit=crop',
      title: 'Weekend Vibes',
      description: 'Relaxed luxury for your downtime',
    },
    {
      image: 'https://images.unsplash.com/photo-1473966699461-d1d8cc4b2e16?w=600&h=500&fit=crop',
      title: 'Evening Sophistication',
      description: 'Elevated style for special moments',
    },
  ];

  return (
    <section className="px-4 md:px-8 py-16 md:py-24 bg-gradient-to-b from-emerald-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-teal-700 uppercase tracking-widest mb-3">
            Style Inspiration
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Lookbook
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover endless styling possibilities with The Royal Gentlemen collection
          </p>
        </div>

        {/* Lookbook Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {lookbookItems.map((item, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl cursor-pointer h-96 bg-teal-900"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-200 text-sm mb-4">{item.description}</p>
                <button className="inline-flex items-center px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold rounded-full text-sm transition-all duration-300 w-fit">
                  Explore Look
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Lookbook */}
        <div className="mt-16 bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative h-96 lg:h-auto bg-teal-900">
              <img
                src="https://images.unsplash.com/photo-1554521666-7efcaf00face?w=800&h=600&fit=crop"
                alt="Featured Lookbook"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <p className="text-sm font-semibold text-yellow-600 uppercase tracking-widest mb-3">
                Curated Collection
              </p>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                The Art of<br />
                <span className="text-teal-700">Minimalist Luxury</span>
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Less is more. Our philosophy centres on timeless pieces that work seamlessly together.
                Invest in quality over quantity, and build a wardrobe that stands the test of time.
              </p>
              <div className="flex gap-4">
                <button className="px-6 py-3 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-full transition-all duration-300">
                  View Collection
                </button>
                <button className="px-6 py-3 bg-white border-2 border-gray-200 hover:border-teal-700 text-gray-900 font-bold rounded-full transition-all duration-300">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollectionLookbook;
