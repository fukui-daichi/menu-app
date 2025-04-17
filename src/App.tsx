import React, { useState } from 'react';
import MenuList from './components/MenuList/MenuList';
import { MenuItem } from './types/menu';
import menuData from './data/menu.json';

const App: React.FC = () => {
  const [selectedItems, setSelectedItems] = useState<MenuItem[]>([]);
  const menuItems: MenuItem[] = menuData as MenuItem[];

  const handleSelectItem = (item: MenuItem) => {
    setSelectedItems([...selectedItems, item]);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">メニュー一覧</h1>
      <MenuList items={menuItems} onSelectItem={handleSelectItem} />
      
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
