import { MenuItem } from '../menu';

interface CategoryFilterProps {
  items: MenuItem[];
  currentCategory: string | null;
  onSelectCategory: (category: string | null) => void;
  onSelectRecommended: () => void;
}

export type { CategoryFilterProps };
