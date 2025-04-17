import React, { useEffect, useRef } from 'react';
import { MenuItem } from '../../types/menu';
import { gsap } from 'gsap';

interface MenuListProps {
  items: MenuItem[];
  selectedItems: MenuItem[];
  onSelectItem: (item: MenuItem) => void;
  onQuantityChange: (id: string, quantity: number) => void;
}

const MenuList: React.FC<MenuListProps> = ({ items, selectedItems, onSelectItem, onQuantityChange }) => {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // カテゴリ変更時のアニメーション
  useEffect(() => {
    if (items.length > 0) {
      itemRefs.current.forEach((ref, index) => {
        if (ref) {
          gsap.fromTo(ref, 
            { opacity: 0, y: 10 },
            {
              opacity: 1,
              y: 0,
              duration: 0.2,
              delay: index * 0.03,
              ease: "power1.out"
            }
          );
        }
      });
    }
  }, [items]);

  const handleSelectWithAnimation = (item: MenuItem) => {
    const index = items.findIndex(i => i.id === item.id);
    const ref = itemRefs.current[index];
    
    if (ref) {
      gsap.to(ref, {
        scale: 0.92,
        duration: 0.08,
        yoyo: true,
        repeat: 1,
        ease: "back.out(1.7)",
        onComplete: () => {
          if (selectedItems.some(selected => selected.id === item.id)) {
            onQuantityChange(item.id, -1);
          } else {
            onSelectItem({...item, quantity: 1});
          }
        }
      });
    }
  };
  return (
    <div className="px-2">
      {items.map((item) => (
          <div
            key={item.id}
            ref={el => {
              if (el) {
                itemRefs.current[items.indexOf(item)] = el;
              }
            }}
            className={`flex items-center p-2 border-b cursor-pointer ${
              selectedItems.some(selected => selected.id === item.id) 
                ? 'bg-secondary' 
                : 'hover:bg-gray-50'
            }`}
            onClick={() => handleSelectWithAnimation(item)}
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
