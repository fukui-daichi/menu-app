import React, { useEffect, useRef } from 'react';
import { MenuItem } from '../../types/menu';
import { gsap } from 'gsap';
import SkeletonImage from '../common/SkeletonImage';

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
      // タップフィードバックアニメーション
      gsap.to(ref, {
        scale: 0.95,
        duration: 0.05,
        yoyo: true,
        repeat: 1,
        ease: "power1.out",
        onComplete: () => {
          // 選択状態に応じたアニメーション
          if (selectedItems.some(selected => selected.id === item.id)) {
            // 選択解除時のアニメーション
            gsap.to(ref, {
              backgroundColor: "#ffffff",
              duration: 0.2,
              ease: "power2.out"
            });
            onQuantityChange(item.id, -1);
          } else {
            // 選択時の背景色アニメーション
            gsap.to(ref, {
              backgroundColor: "#FFB38A", // secondaryカラー
              duration: 0.2,
              ease: "power2.out"
            });
            // アイテム追加エフェクト
            gsap.fromTo(ref.querySelector('img'), 
              { scale: 0.8, opacity: 0 },
              { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" }
            );
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
            className="flex items-center p-2 border-b cursor-pointer hover:bg-gray-50"
            onClick={() => handleSelectWithAnimation(item)}
          >
          <div className="flex-1 min-w-[180px]">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-1">
                {item.isRecommended && (
                  <span className="text-yellow-500 text-xs">⭐</span>
                )}
                <h3 className="font-medium text-xs">{item.name}</h3>
              </div>
              <span className="text-sm text-gray-500">
                {/* 選択済み表示はAppコンポーネントで管理 */}
              </span>
            </div>
          </div>
            {item.imageUrl && (
              <div className="w-24 ml-4">
                <SkeletonImage 
                  src={item.imageUrl}
                  alt={item.name}
                  className="rounded-lg"
                  imageClassName="rounded-lg"
                />
              </div>
            )}
        </div>
      ))}
    </div>
  );
};

export default MenuList;
