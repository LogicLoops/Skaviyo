import { useState } from 'react';
import { SearchIcon } from '../shared/Icons';

interface SearchBarProps {
  onSearch?: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(query);
  };

  return (
    <div className="px-4 md:px-6 py-4 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto">
        <form onSubmit={handleSubmit} className="relative">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={handleChange}
              placeholder="Search for t-shirts, styles, collections..."
              className="w-full px-4 py-3 pl-11 rounded-full border-2 border-gray-200 focus:border-teal-500 focus:outline-none transition-colors text-sm md:text-base placeholder:text-gray-400"
              aria-label="Search products"
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <SearchIcon className="w-4 h-4 md:w-5 md:h-5" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
