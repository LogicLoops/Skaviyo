import type { CategoryCardProps } from '../../types';

const CategoryCard = ({ id, title, image, onClick }: CategoryCardProps) => {
  return (
    <button
      onClick={() => onClick?.(id)}
      className="w-full h-full group relative overflow-hidden rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
      aria-label={`Shop ${title}`}
    >
      {/* Fallback background shown if image fails */}
      <div className="relative w-full h-full overflow-hidden bg-teal-800">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

      {/* Always-visible dark gradient at bottom for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      {/* Title */}
      <div className="absolute inset-0 flex items-end justify-center pb-6">
        <h3 className="text-lg md:text-2xl font-bold text-white drop-shadow-lg">
          {title}
        </h3>
      </div>
    </button>
  );
};

export default CategoryCard;
