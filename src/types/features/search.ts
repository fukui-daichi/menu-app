import { MenuItem } from '../menu';

interface SearchBarProps {
  items: MenuItem[];
  onSearch: (results: MenuItem[]) => void;
}

interface Suggestions {
  menuNames: string[];
  tags: string[];
  categories: string[];
}

export type { SearchBarProps, Suggestions };
