import React, { useState, useMemo } from 'react';
import MenuList from './components/MenuList/MenuList';
import CategoryFilter from './components/CategoryFilter/CategoryFilter';
import SearchBar from './components/SearchBar/SearchBar';
import { MenuItem } from './types/menu';
import menuData from './data/menu.json';

const App: React.FC = () => {
  const [selectedItems, setSelectedItems] = useState<MenuItem[]>([]);
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<MenuItem[] | null>(null);
  const menuItems: MenuItem[] = menuData as MenuItem[];

  const filteredItems = useMemo(() => {
    let result = menuItems;
    
    // カテゴリでフィルタリング
    if (currentCategory) {
      result = result.filter(item => item.category === currentCategory);
    }
    
    // 検索結果がある場合はさらにフィルタリング
    if (searchResults) {
      result = result.filter(item => 
        searchResults.some(r => r.id === item.id)
      );
    }
    
    return result;
  }, [menuItems, currentCategory, searchResults]);

  const handleSelectItem = (item: MenuItem) => {
    setSelectedItems([...selectedItems, item]);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">メニュー一覧</h1>
      <SearchBar 
        items={menuItems}
        onSearch={setSearchResults}
      />
      <CategoryFilter 
        items={menuItems}
        currentCategory={currentCategory}
        onSelectCategory={setCurrentCategory}
      />
      <MenuList items={filteredItems} onSelectItem={handleSelectItem} />
      
      {selectedItems.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">選択したメニュー</h2>
          <ul>
            {selectedItems.map(item => (
              <li key={item.id} className="mb-2">{item.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
