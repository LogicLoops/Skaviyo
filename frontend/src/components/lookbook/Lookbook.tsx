const Lookbook = () => {
  const lookbookImages = [
    { id: 1, url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500&h=600&fit=crop', title: 'Urban Style' },
    { id: 2, url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=600&fit=crop', title: 'Classic Elegance' },
    { id: 3, url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=600&fit=crop', title: 'Casual Premium' },
    { id: 4, url: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=500&h=600&fit=crop', title: 'Modern Minimal' },
    { id: 5, url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=600&fit=crop', title: 'Lifestyle' },
    { id: 6, url: 'https://images.unsplash.com/photo-1505886657187-7dae51e27e22?w=500&h=600&fit=crop', title: 'Street Wear' },
  ];

  return (
    <section className="px-4 md:px-8 py-10 md:py-14 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Style Stories
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover how our community styles their Skaviyo collection
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-teal-700 to-yellow-600 mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 auto-rows-max">
          {lookbookImages.map((image, index) => (
            <button
              key={image.id}
              className={`group relative overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-2xl bg-teal-900 ${
                index === 0 || index === 5 ? 'sm:col-span-2 lg:col-span-1' : ''
              }`}
              aria-label={image.title}
            >
              <div className="relative w-full aspect-square sm:aspect-auto overflow-hidden">
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 flex items-end justify-start p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-xl font-semibold text-white">{image.title}</h3>
              </div>
            </button>
          ))}
        </div>

        <div className="text-center mt-12 md:mt-16">
          <button className="inline-flex items-center px-8 py-4 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-full transition-all duration-300 hover:scale-105">
            Follow Our Instagram
          </button>
        </div>
      </div>
    </section>
  );
};

export default Lookbook;
