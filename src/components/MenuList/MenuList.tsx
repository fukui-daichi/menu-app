import React from 'react';
import { MenuItem } from '../../types/menu';

interface MenuListProps {
  items: MenuItem[];
  onSelectItem: (item: MenuItem) => void;
}

const MenuList: React.FC<MenuListProps> = ({ items, onSelectItem }) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <div 
          key={item.id}
          className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer relative"
          onClick={() => onSelectItem(item)}
        >
          {item.isRecommended && (
            <span className="absolute top-2 right-2 bg-yellow-400 text-xs font-bold px-2 py-1 rounded-full">
              おすすめ
            </span>
          )}
          {item.imageUrl && (
            <div className="mb-3 aspect-square overflow-hidden rounded-md">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
          )}
          <h3 className="text-lg font-semibold">{item.name}</h3>
          {item.description && (
            <p className="text-gray-600 mt-2">{item.description}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default MenuList;
