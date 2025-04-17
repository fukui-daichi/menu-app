import React from 'react';
import { MenuItem } from '../../types/menu';

interface CategoryFilterProps {
  items: MenuItem[];
  currentCategory: string | null;
  onSelectCategory: (category: string | null) => void;
  onSelectRecommended: () => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ 
  items, 
  currentCategory,
  onSelectCategory,
  onSelectRecommended
}) => {
  const categories = Array.from(new Set(items.map(item => item.category)));

  return (
    <div className="space-y-0">
      <div 
        onClick={() => onSelectCategory(null)}
        className={`px-4 py-3 border-b cursor-pointer text-sm ${
          currentCategory === null ? 'bg-gray-100 font-medium' : 'hover:bg-gray-50'
        }`}
      >
        すべて
      </div>
      <div 
        onClick={onSelectRecommended}
        className={`px-4 py-3 border-b cursor-pointer text-sm ${
          currentCategory === 'recommended' ? 'bg-gray-100 font-medium' : 'hover:bg-gray-50'
        }`}
      >
        ⭐ おすすめ
      </div>
      {categories.map(category => (
        <div 
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`px-4 py-3 border-b cursor-pointer text-sm ${
            currentCategory === category ? 'bg-gray-100 font-medium' : 'hover:bg-gray-50'
          }`}
        >
          {category}
        </div>
      ))}
    </div>
  );
};

export default CategoryFilter;
