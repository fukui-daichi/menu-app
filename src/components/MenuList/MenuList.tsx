import React from 'react';
import { MenuItem } from '../../types/menu';

interface MenuListProps {
  items: MenuItem[];
  selectedItems: MenuItem[];
  onSelectItem: (item: MenuItem) => void;
  onQuantityChange: (id: string, quantity: number) => void;
}

const MenuList: React.FC<MenuListProps> = ({ items, selectedItems, onSelectItem, onQuantityChange }) => {
  return (
    <div className="px-2">
      {items.map((item) => (
          <div
            key={item.id}
            className={`flex items-center p-2 border-b cursor-pointer ${
              selectedItems.some(selected => selected.id === item.id) 
                ? 'bg-secondary' 
                : 'hover:bg-gray-50'
            }`}
            onClick={() => {
              if (selectedItems.some(selected => selected.id === item.id)) {
                onQuantityChange(item.id, -1); // 選択解除
              } else {
                onSelectItem({...item, quantity: 1}); // 選択
              }
            }}
          >
          <div className="flex-1">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-1">
                {item.isRecommended && (
                  <span className="text-yellow-500 text-xs">⭐</span>
                )}
                <h3 className="font-medium text-sm">{item.name}</h3>
              </div>
              <span className="text-sm text-gray-500">
                {/* 選択済み表示はAppコンポーネントで管理 */}
              </span>
            </div>
          </div>
          {item.imageUrl && (
            <div className="w-24 ml-4 aspect-[3/2]">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-full object-cover rounded-lg"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MenuList;
