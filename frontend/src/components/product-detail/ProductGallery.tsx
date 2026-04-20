import { useState } from 'react';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

const ProductGallery = ({ images, productName }: ProductGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="flex flex-col gap-5">
      {/* Main Image - Fixed Height, Not Scrollable */}
      <div className="relative bg-white rounded-3xl overflow-hidden shadow-lg h-[500px] md:h-[550px] border border-gray-200 hover:shadow-xl transition-shadow duration-300 flex items-center justify-center">
        <img
          src={images[selectedImage]}
          alt={productName}
          className="w-full h-full object-contain"
        />
        {/* Badge */}
        <div className="absolute top-6 left-6 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-5 py-2 rounded-full text-xs font-bold tracking-wider shadow-lg">
          PREMIUM
        </div>
        {/* Image Counter */}
        <div className="absolute bottom-6 right-6 bg-black/70 backdrop-blur text-white px-4 py-2 rounded-full text-xs font-semibold">
          {selectedImage + 1}/{images.length}
        </div>
      </div>

      {/* Thumbnail Gallery */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden transition-all duration-300 border-2 ${
              selectedImage === index
                ? 'border-emerald-600 shadow-md ring-2 ring-emerald-400 ring-offset-1'
                : 'border-gray-300 hover:border-gray-400 shadow-sm'
            }`}
          >
            <img
              src={image}
              alt={`${productName} view ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
