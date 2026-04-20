interface ProductData {
  id: string;
  name: string;
  price: number;
  image: string;
  rating?: number;
}

interface SignatureCollectionProps {
  onProductClick?: (product: ProductData) => void;
  onAddToCart?: (product: ProductData) => void;
}

const SignatureCollection = ({
  onProductClick,
  onAddToCart,
}: SignatureCollectionProps) => {
  const signatureProduct: ProductData = {
    id: 'signature-white',
    name: 'The Signature White',
    price: 4500,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=700&fit=crop',
    rating: 4.9,
  };

  const similarProducts: ProductData[] = [
    {
      id: 'cream-classic',
      name: 'Premium Cream Classic',
      price: 4200,
      image: 'https://images.unsplash.com/photo-1512990415879-d21964eb0560?w=400&h=500&fit=crop',
    },
    {
      id: 'black-elegance',
      name: 'Black Elegance',
      price: 4500,
      image: 'https://images.unsplash.com/photo-1473966699461-d1d8cc4b2e16?w=400&h=500&fit=crop',
    },
  ];

  return (
    <section className="px-4 md:px-8 py-12 md:py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Left - Featured Image */}
          <div
            className="group cursor-pointer"
            onClick={() => onProductClick?.(signatureProduct)}
          >
            <div className="relative overflow-hidden rounded-2xl bg-gray-100 h-96 md:h-[500px] shadow-lg hover:shadow-2xl transition-all duration-300">
              <img
                src={signatureProduct.image}
                alt={signatureProduct.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                <h3 className="text-2xl md:text-3xl font-bold text-white">
                  {signatureProduct.name}
                </h3>
              </div>
            </div>
          </div>

          {/* Right - Product Details */}
          <div className="flex flex-col justify-start">
            <div className="mb-6">
              <p className="text-sm font-semibold text-teal-700 uppercase tracking-widest mb-2">
                Collection Highlight
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                The Signature Line
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our most iconic collection. Crafted from premium cotton with an ergonomic fit that adapts to your lifestyle. The Signature White is a wardrobe essential that transcends seasons and occasions.
              </p>
            </div>

            {/* Key Features */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="flex items-center justify-center h-6 w-6 rounded-full bg-yellow-100">
                    <svg
                      className="h-4 w-4 text-yellow-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">100% Premium Cotton</h4>
                  <p className="text-sm text-gray-600">Soft, breathable, and durable for all-day comfort</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="flex items-center justify-center h-6 w-6 rounded-full bg-yellow-100">
                    <svg
                      className="h-4 w-4 text-yellow-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Tailored Fit</h4>
                  <p className="text-sm text-gray-600">Designed for the modern gentleman with perfect proportions</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="flex items-center justify-center h-6 w-6 rounded-full bg-yellow-100">
                    <svg
                      className="h-4 w-4 text-yellow-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Lifetime Warranty</h4>
                  <p className="text-sm text-gray-600">Guaranteed quality with our comprehensive warranty</p>
                </div>
              </div>
            </div>

            {/* Price and Rating */}
            <div className="border-t border-b border-gray-200 py-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <p className="text-3xl font-bold text-gray-900">
                  ₹{signatureProduct.price.toLocaleString('en-IN')}
                </p>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(signatureProduct.rating || 0)
                            ? 'text-yellow-500'
                            : 'text-gray-300'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 font-semibold">
                    {signatureProduct.rating}
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-500">Available in 8 colors • Size XS-XXL</p>
            </div>

            {/* CTA Button */}
            <button
              onClick={() => onAddToCart?.(signatureProduct)}
              className="w-full px-8 py-4 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-lg transition-all duration-300 hover:shadow-lg text-lg mb-4"
            >
              Add to Cart
            </button>

            {/* Similar Products */}
            <div className="mt-10 pt-8 border-t border-gray-200">
              <p className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">
                You might also like
              </p>
              <div className="grid grid-cols-2 gap-4">
                {similarProducts.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => onProductClick?.(product)}
                    className="text-left group"
                  >
                    <div className="relative h-40 bg-gray-100 rounded-lg overflow-hidden mb-2">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <p className="font-semibold text-gray-900 text-sm line-clamp-2">
                      {product.name}
                    </p>
                    <p className="text-teal-700 font-bold text-sm">
                      ₹{product.price.toLocaleString('en-IN')}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignatureCollection;
