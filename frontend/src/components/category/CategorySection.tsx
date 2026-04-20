import { useState } from 'react';
import CategoryCard from './CategoryCard';
import { CATEGORIES } from '../../constants/categories';

interface CategorySectionProps {
  onCategoryClick?: (categoryId: string) => void;
}

const CategorySection = ({ onCategoryClick }: CategorySectionProps) => {
  const [isLoading] = useState(false);

  // Separate featured categories from regular ones
  const featuredCategories = CATEGORIES.filter(cat => 
    ['create-own', 'limited-edition'].includes(cat.id)
  );

  const regularCategories = CATEGORIES.filter(cat => 
    !['create-own', 'limited-edition'].includes(cat.id)
  );

  return (
    <section className="px-4 md:px-8 py-8 md:py-10 bg-white">
      <div className="max-w-full">
        {/* Section Title */}
        <div className="mb-8 md:mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Shop by Category
          </h2>
        </div>

        {/* Featured Categories Row - 50/50 Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-10 px-4 md:px-0">
          {featuredCategories.map((category) => (
            <div key={category.id} className="w-full h-72 md:h-96">
              <CategoryCard
                {...category}
                onClick={() => onCategoryClick?.(category.id)}
              />
            </div>
          ))}
        </div>

        {/* Regular Categories Horizontal Scroll */}
        {!isLoading && (
          <div className="overflow-x-auto pb-4 -mx-4 md:-mx-8 px-4 md:px-8 scrollbar-hide">
            <div className="flex gap-4 md:gap-6 min-w-min">
              {regularCategories.map((category) => (
                <div key={category.id} className="flex-shrink-0 w-60 md:w-72 h-56 md:h-64">
                  <CategoryCard
                    {...category}
                    onClick={() => onCategoryClick?.(category.id)}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CategorySection;
