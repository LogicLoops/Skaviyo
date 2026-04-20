interface Collection {
  id: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
}

interface RelatedCollectionsProps {
  onCollectionClick?: (collectionId: string) => void;
}

const RelatedCollections = ({ onCollectionClick }: RelatedCollectionsProps) => {
  const collections: Collection[] = [
    {
      id: 'women',
      name: 'The Royal Women',
      description: 'Elegance redefined. Premium pieces crafted for the modern woman.',
      image: 'https://images.unsplash.com/photo-1503342217343-583ce714fbab?w=600&h=500&fit=crop',
      productCount: 42
    },
    {
      id: 'couples',
      name: 'Couples Collection',
      description: 'Complementary pieces designed to celebrate togetherness in style.',
      image: 'https://images.unsplash.com/photo-1534622666114-3b6ba168d378?w=600&h=500&fit=crop',
      productCount: 28
    },
    {
      id: 'limited',
      name: 'Limited Edition',
      description: 'Exclusive designs available only for a limited time. Seize the moment.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=500&fit=crop',
      productCount: 15
    }
  ];

  return (
    <section className="px-4 md:px-8 py-16 md:py-24 bg-gradient-to-b from-white to-emerald-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-teal-700 uppercase tracking-widest mb-3">
            Explore More
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Related <span className="text-yellow-600">Collections</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover other premium collections carefully curated for you
          </p>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {collections.map((collection) => (
            <div
              key={collection.id}
              onClick={() => onCollectionClick?.(collection.id)}
              className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-yellow-300"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden bg-gray-100">
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent" />

                {/* Badge */}
                <div className="absolute top-4 right-4 bg-yellow-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                  {collection.productCount} Items
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {collection.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {collection.description}
                </p>

                {/* CTA */}
                <button className="w-full px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-between group/btn">
                  <span>Explore</span>
                  <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Hover Effect */}
              <div className="h-1 bg-gradient-to-r from-yellow-600 to-teal-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Can't find what you're looking for? Browse our complete collection of premium fashion pieces.
          </p>
          <button className="px-8 py-3 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl">
            View All Collections
          </button>
        </div>
      </div>
    </section>
  );
};

export default RelatedCollections;
