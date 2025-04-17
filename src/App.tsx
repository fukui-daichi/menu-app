import React, { useState, useMemo } from 'react';
import MenuList from './components/MenuList/MenuList';
import CategoryFilter from './components/CategoryFilter/CategoryFilter';
import SearchBar from './components/SearchBar/SearchBar';
import OrderButton from './components/OrderButton/OrderButton';
import { MenuItem } from './types/menu';
import menuData from './data/menu.json';

const App: React.FC = () => {
  const [selectedItems, setSelectedItems] = useState<MenuItem[]>([]);
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<MenuItem[] | null>(null);
  const menuItems: MenuItem[] = menuData as MenuItem[];

  const filteredItems = useMemo(() => {
    let result = menuItems;
    
    if (currentCategory === 'recommended') {
      result = result.filter(item => item.isRecommended);
    } else if (currentCategory) {
      result = result.filter(item => item.category === currentCategory);
    }
    
    if (searchResults) {
      result = result.filter(item => 
        searchResults.some(r => r.id === item.id)
      );
    }
    
    return result;
  }, [menuItems, currentCategory, searchResults]);

  const handleSelectItem = (item: MenuItem) => {
    setSelectedItems(prev => {
      // 既に選択済みの場合は何もしない
      if (prev.some(selected => selected.id === item.id)) {
        return prev;
      }
      return [...prev, {...item, quantity: 1}];
    });
  };

  return (
    <div className="bg-gray-100 flex justify-center items-center h-[100svh]">
      {/* スマートフォンフレーム */}
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-md h-full flex flex-col">
        {/* ヘッダー */}
        <div className="px-4 py-3 border-b sticky top-0 bg-primary text-white z-10">
          <div className="text-xl font-semibold">Menu</div>
        </div>

        {/* 検索バー */}
        <div className="px-4 py-2 border-b">
          <SearchBar 
            items={menuItems}
            onSearch={setSearchResults}
          />
        </div>

        {/* メインコンテンツ */}
        <div className="flex flex-1 overflow-y-auto">
          {/* カテゴリメニュー */}
          <div className="w-1/4 bg-gray-50 border-r overflow-y-auto">
            <CategoryFilter 
              items={menuItems}
              currentCategory={currentCategory}
              onSelectCategory={setCurrentCategory}
              onSelectRecommended={() => {
                setCurrentCategory('recommended');
                setSearchResults(null); // 検索結果をクリア
              }}
            />
          </div>

          {/* メニューリスト */}
          <div className="w-3/4 overflow-y-auto">
            <MenuList 
              items={filteredItems}
              selectedItems={selectedItems}
              onSelectItem={handleSelectItem}
              onQuantityChange={(id, quantity) => {
                if (id === '') {
                  setSelectedItems([]); // 全削除
                } else {
                  setSelectedItems(prev => 
                    prev.filter(item => item.id !== id)
                  );
                }
              }}
            />
          </div>
        </div>

        {/* フッター/カート */}
        <div className="bg-white border-t px-4 py-3">
          <OrderButton 
            selectedItems={selectedItems}
            onQuantityChange={(id, quantity) => {
              setSelectedItems(prev => 
                prev.filter(item => item.id !== id)
              );
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
