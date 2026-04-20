interface Review {
  name: string;
  role: string;
  rating: number;
  text: string;
  avatar: string;
}

const CollectionReviews = () => {
  const reviews: Review[] = [
    {
      name: 'Arjun Kumar',
      role: 'Entrepreneur',
      rating: 5,
      text: 'The quality is exceptional. I\'ve owned these pieces for over a year and they still feel brand new. Worth every penny.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
    },
    {
      name: 'Rahul Singh',
      role: 'Corporate Executive',
      rating: 5,
      text: 'Finally found a brand that understands luxury without pretense. The fit, comfort, and durability are unmatched.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop'
    },
    {
      name: 'Vikas Patel',
      role: 'Designer',
      rating: 5,
      text: 'As someone in fashion, I\'m impressed by the attention to detail. Every stitch, every seam is deliberately crafted.',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop'
    },
    {
      name: 'Amit Sharma',
      role: 'Fitness Coach',
      rating: 5,
      text: 'Perfect for an active lifestyle. Comfortable, durable, and looks great. My go-to choice now.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
    }
  ];

  return (
    <section className="px-4 md:px-8 py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-teal-700 uppercase tracking-widest mb-3">
            Customer Testimonials
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Loved by <span className="text-yellow-600">Gentlemen</span> Worldwide
          </h2>
          <div className="flex items-center justify-center gap-2 mb-4">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-6 h-6 text-yellow-400 fill-current" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
            ))}
          </div>
          <p className="text-gray-600">4.9 out of 5 from 2,500+ reviews</p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-emerald-50 to-white p-6 rounded-2xl border border-emerald-100 hover:border-yellow-300 hover:shadow-lg transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>

              {/* Review Text */}
              <p className="text-gray-700 text-sm mb-6 leading-relaxed">
                "{review.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-bold text-gray-900 text-sm">
                    {review.name}
                  </p>
                  <p className="text-xs text-gray-600">
                    {review.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 bg-gradient-to-r from-teal-900 to-emerald-900 rounded-3xl p-8 md:p-12">
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">
              50K+
            </p>
            <p className="text-gray-200 text-sm">
              Happy Customers Worldwide
            </p>
          </div>
          <div className="text-center border-l border-r border-gray-700">
            <p className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">
              4.9★
            </p>
            <p className="text-gray-200 text-sm">
              Average Rating
            </p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">
              98%
            </p>
            <p className="text-gray-200 text-sm">
              Satisfaction Rate
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollectionReviews;
