import React, { useState, useMemo } from 'react';
import type { SearchBarProps, Suggestions } from '../../../types/features/search';

const SearchBar: React.FC<SearchBarProps> = ({ items, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  // サジェストデータ生成
  const suggestions = useMemo<Suggestions>(() => {
    if (!searchTerm.trim()) return { menuNames: [], tags: [], categories: [] };
    
    const term = searchTerm.toLowerCase();
    const menuNames = items
      .filter(item => item.name.toLowerCase().includes(term))
      .map(item => item.name);
      
    const tags = Array.from(new Set(
      items.flatMap(item => 
        item.tags?.filter(tag => tag.toLowerCase().includes(term)) || []
      )
    ));
      
    const categories = Array.from(new Set(
      items
        .filter(item => item.category.toLowerCase().includes(term))
        .map(item => item.category)
    ));
    
    return {
      menuNames: menuNames.slice(0, 3),
      tags: tags.slice(0, 3),
      categories: categories.slice(0, 2)
    };
  }, [searchTerm, items]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setShowSuggestions(term.length > 0);
    
    if (!term.trim()) {
      onSearch(items);
      return;
    }

    const results = items.filter(item => {
      const nameMatch = item.name.toLowerCase().includes(term.toLowerCase());
      const tagMatch = item.tags?.some(tag => 
        tag.toLowerCase().includes(term.toLowerCase())
      );
      const categoryMatch = item.category.toLowerCase().includes(term.toLowerCase());
      return nameMatch || tagMatch || categoryMatch;
    });

    onSearch(results);
  };

  const handleSuggestionClick = (suggestion: string): void => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
    handleSearch(suggestion);
  };

  return (
    <div className="relative">
      <div>
        <input
          type="text"
          placeholder="料理名や材料で検索..."
          className="w-full p-2 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setShowSuggestions(searchTerm.length > 0)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        />
        <div className="absolute left-3 top-3 text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {showSuggestions && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-[300px] overflow-y-auto">
          {suggestions.menuNames.length > 0 && (
            <div className="p-2">
              <h3 className="text-xs font-semibold text-gray-500 px-2 py-1">メニュー名</h3>
              {suggestions.menuNames.map((name: string) => (
                <div 
                  key={name}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer truncate"
                  onMouseDown={() => handleSuggestionClick(name)}
                  title={name}
                >
                  {name}
                </div>
              ))}
            </div>
          )}
          
          {suggestions.tags.length > 0 && (
            <div className="p-2 border-t">
              <h3 className="text-xs font-semibold text-gray-500 px-2 py-1">タグ</h3>
              {suggestions.tags.map((tag: string) => (
                <div 
                  key={tag}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer truncate"
                  onMouseDown={() => handleSuggestionClick(tag)}
                  title={tag}
                >
                  #{tag}
                </div>
              ))}
            </div>
          )}
          
          {suggestions.categories.length > 0 && (
            <div className="p-2 border-t">
              <h3 className="text-xs font-semibold text-gray-500 px-2 py-1">カテゴリ</h3>
              {suggestions.categories.map((category: string) => (
                <div 
                  key={category}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer truncate"
                  onMouseDown={() => handleSuggestionClick(category)}
                  title={category}
                >
                  {category}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
