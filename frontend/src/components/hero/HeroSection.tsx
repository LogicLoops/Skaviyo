import Button from '../shared/Button';

interface HeroSectionProps {
  onShopClick?: () => void;
  onCreateClick?: () => void;
}

const HeroSection = ({ onShopClick, onCreateClick }: HeroSectionProps) => {
  return (
    <div className="relative w-full h-96 md:h-[500px] lg:h-[600px] overflow-hidden bg-gray-900">
      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1600&h=800&fit=crop"
        alt="Premium clothing collection"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Left Side Gradient Overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-teal-900/70 via-teal-900/40 to-transparent" />

      {/* Content Container */}
      <div className="relative h-full flex items-center px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full">
          <div className="max-w-md md:max-w-xl">
            {/* Main Heading */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 leading-tight tracking-tight">
              Elevate Your
            </h2>

            {/* Subheading with Heading */}
            <div className="mb-6 md:mb-8">
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-1 leading-tight tracking-tight">
                Everyday
              </h3>
              <p className="text-4xl md:text-5xl lg:text-5xl font-bold text-yellow-500 leading-tight tracking-tight">
                Royalty
                <span className="text-white">.</span>
              </p>
            </div>

            {/* Description */}
            <p className="text-sm md:text-base text-gray-100 mb-6 md:mb-7 leading-relaxed max-w-sm font-light">
              Experience the finest cotton blends designed for modern elegance and supreme comfort.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-5 md:gap-6">
              <Button
                variant="primary"
                size="lg"
                onClick={onShopClick}
              >
                Shop Collection
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={onCreateClick}
              >
                Create Your Own
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
