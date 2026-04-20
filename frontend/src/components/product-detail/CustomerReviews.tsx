interface Review {
  id: string;
  name: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

interface CustomerReviewsProps {
  rating: number;
  totalReviews: number;
}

const CustomerReviews = ({ rating, totalReviews }: CustomerReviewsProps) => {
  const reviews: Review[] = [
    {
      id: '1',
      name: 'Arjun Kumar',
      rating: 5,
      date: '2 weeks ago',
      comment: 'Absolutely love this! The quality is premium and fits perfectly. Wearing it daily now.',
      verified: true
    },
    {
      id: '2',
      name: 'Rahul Singh',
      rating: 5,
      date: '1 month ago',
      comment: 'Best investment for my wardrobe. The fabric feels amazing and it lasts long.',
      verified: true
    }
  ];

  return (
    <section className="bg-white rounded-lg border-2 border-gray-100 shadow-lg p-2 md:p-3">
      {/* Header */}
      <div className="mb-2">
        <h2 className="text-lg md:text-xl font-black text-gray-900 mb-1">Customer Reviews</h2>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
            </div>
            <span className="text-xs font-bold text-gray-900">{rating}</span>
            <span className="text-xs text-gray-600">({totalReviews})</span>
          </div>
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {reviews.map((review) => (
          <div key={review.id} className="bg-gradient-to-br from-emerald-50 to-white rounded-lg border border-emerald-100 p-3 hover:shadow-sm transition-shadow duration-300">
            {/* Review Header */}
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="font-bold text-gray-900 text-xs">{review.name}</p>
                <p className="text-xs text-gray-600">{review.date}</p>
              </div>
              {review.verified && (
                <div className="flex items-center gap-0.5 px-1.5 py-0.5 bg-emerald-100 text-emerald-700 rounded-full text-xs font-semibold">
                  <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Verified
                </div>
              )}
            </div>

            {/* Rating */}
            <div className="flex gap-0.5 mb-2">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-3 h-3 ${
                    i < review.rating
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
            </div>

            {/* Review Text */}
            <p className="text-xs text-gray-700 leading-normal line-clamp-2">
              {review.comment}
            </p>

            {/* Helpful Button */}
            <div className="mt-2 pt-2 border-t border-emerald-100">
              <button className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 transition-colors flex items-center gap-0.5">
                <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.646 7.23a2 2 0 01-1.788 1.106H7a2 2 0 01-2-2V9a6 6 0 0112-6z" />
                </svg>
                Helpful
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* View All Reviews CTA */}
      <div className="mt-2 pt-2 border-t border-gray-200 text-center">
        <button className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-full transition-all duration-300 transform hover:scale-105">
          View All {totalReviews}
        </button>
      </div>
    </section>
  );
};

export default CustomerReviews;
