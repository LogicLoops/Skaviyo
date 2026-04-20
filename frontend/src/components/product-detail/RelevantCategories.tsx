interface RelevantProduct {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface RelevantCategoriesProps {
  onProductClick?: (productId: string) => void;
}

const RelevantCategories = ({ onProductClick }: RelevantCategoriesProps) => {
  const relevantProducts: RelevantProduct[] = [
    {
      id: 'classic-white',
      name: 'Signature White',
      price: 4500,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop'
    },
    {
      id: 'emerald-tee',
      name: 'Emerald Tee',
      price: 3999,
      image: 'https://images.unsplash.com/photo-1503342217343-583ce714fbab?w=400&h=500&fit=crop'
    },
    {
      id: 'blue-print',
      name: 'Blue Print',
      price: 4299,
      image: 'https://images.unsplash.com/photo-1554521666-7efcaf00face?w=400&h=500&fit=crop'
    },
    {
      id: 'the-weekender-pack',
      name: 'Weekender Pack',
      price: 12000,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop'
    },
    {
      id: 'signature-premium',
      name: 'Premium White',
      price: 5499,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop'
    },
    {
      id: 'vintage-classic',
      name: 'Vintage Classic',
      price: 3299,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop'
    },
    {
      id: 'vintage-heritage',
      name: 'Vintage Heritage',
      price: 3599,
      image: 'https://images.unsplash.com/photo-1503342217343-583ce714fbab?w=400&h=500&fit=crop'
    },
    {
      id: 'classic-white',
      name: 'Signature White',
      price: 4500,
      image: 'https://images.unsplash.com/photo-1554521666-7efcaf00face?w=400&h=500&fit=crop'
    }
  ];

  return (
    <section className="w-full bg-white rounded-lg border border-gray-200 p-1.5 md:p-2">
      <h3 className="text-xs font-bold text-gray-900 mb-1 px-0.5">Relevant Products</h3>
      <div className="grid grid-cols-8 gap-1 w-full">
        {relevantProducts.map((product) => (
          <button
            key={product.id}
            onClick={() => onProductClick?.(product.id)}
            className="flex flex-col overflow-hidden rounded border border-gray-200 hover:border-emerald-300 hover:shadow-sm transition-all duration-200 group"
          >
            <div className="relative w-full aspect-square overflow-hidden bg-gray-100">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-0.5 bg-white flex flex-col gap-0.5">
              <p className="text-xs font-semibold text-gray-900 truncate group-hover:text-emerald-700 leading-tight">{product.name}</p>
              <p className="text-xs font-bold text-emerald-700">₹{product.price.toLocaleString()}</p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};

export default RelevantCategories;
