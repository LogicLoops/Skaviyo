interface Review {
  id: string;
  name: string;
  title: string;
  content: string;
  rating: number;
  avatar?: string;
}

const Reviews = () => {
  const reviews: Review[] = [
    {
      id: '1',
      name: 'Sarah Anderson',
      title: 'Premium Quality & Comfort',
      content: "The fabric quality is exceptional. It's soft, durable, and feels like a luxury investment. I've worn mine almost daily and it still looks brand new. Highly recommend!",
      rating: 5,
    },
    {
      id: '2',
      name: 'Marcus Chen',
      title: 'Unique Designs',
      content: "Finally found a brand that understands minimalist luxury. The design details are subtle but so elegant. These aren't just t-shirts, they're wardrobe essentials.",
      rating: 5,
    },
    {
      id: '3',
      name: 'Emma Thompson',
      title: 'Perfect Fit & Fast Shipping',
      content: 'The fit is absolutely perfect, and they shipped my order in just 6 days! Customer service was friendly and helpful. Will definitely order again.',
      rating: 5,
    },
  ];

  const StarRating = ({ rating }: { rating: number }) => (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < rating ? 'text-yellow-500' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );

  return (
    <section className="px-4 md:px-8 py-10 md:py-14 bg-gradient-to-b from-white to-emerald-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            What Our Customers Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied customers who've elevated their everyday style
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-teal-700 to-yellow-600 mx-auto mt-4" />
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-yellow-200"
            >
              {/* Rating */}
              <div className="mb-3">
                <StarRating rating={review.rating} />
              </div>

              {/* Review Title */}
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {review.title}
              </h3>

              {/* Review Content */}
              <p className="text-gray-600 leading-relaxed mb-4">
                "{review.content}"
              </p>

              {/* Author */}
              <div className="pt-4 border-t border-gray-100">
                <p className="font-semibold text-gray-900">{review.name}</p>
                <p className="text-sm text-gray-500">Verified Buyer</p>
              </div>
            </div>
          ))}
        </div>

        {/* Social Proof - Optional */}
        <div className="mt-10 md:mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-50 border border-yellow-200 rounded-full">
            <span className="text-2xl">⭐</span>
            <span className="text-gray-900 font-semibold">
              4.9 out of 5 • 500+ Reviews
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
