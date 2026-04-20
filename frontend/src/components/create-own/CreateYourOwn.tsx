interface CreateYourOwnProps {
  onStartCreating?: () => void;
}

const CreateYourOwn = ({ onStartCreating }: CreateYourOwnProps) => {
  return (
    <section className="px-4 md:px-8 py-10 md:py-14 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Content */}
          <div className="flex flex-col justify-center">
            <div className="inline-flex w-fit px-4 py-2 rounded-full bg-yellow-100/50 border border-yellow-300/50 mb-4">
              <span className="text-xs font-semibold text-yellow-700 uppercase tracking-wider">
                Customization
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3 leading-tight tracking-tight">
              Design Your Own
              <span className="text-yellow-600"> T-Shirt</span>
            </h2>

            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Express your creativity. Customize colors, add designs, and create something uniquely yours. From concept to your wardrobe.
            </p>

            {/* Features */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-yellow-100">
                    <svg className="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Premium Quality</h3>
                  <p className="text-gray-600">Finest cotton blends for comfort and durability</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-yellow-100">
                    <svg className="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.5a2 2 0 00-1 .267" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Easy Customization</h3>
                  <p className="text-gray-600">Intuitive design tool, no experience needed</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-yellow-100">
                    <svg className="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Quick Turnaround</h3>
                  <p className="text-gray-600">Made and shipped within 5-7 business days</p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={onStartCreating}
              className="w-full sm:w-fit px-10 py-4 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-full transition-all duration-300 hover:scale-105 text-lg"
            >
              Start Creating
            </button>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-teal-50 to-emerald-50 p-8">
              <img
                src="https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=600&h=700&fit=crop"
                alt="Design your own t-shirt"
                className="w-full h-auto rounded-xl object-cover"
              />
              {/* Decorative badge */}
              <div className="absolute top-6 right-6 bg-white rounded-full p-4 shadow-lg">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m0 0l-2-1m2 1v2.5M14 4l-2 1m0 0L10 4m2 1v2.5" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateYourOwn;
