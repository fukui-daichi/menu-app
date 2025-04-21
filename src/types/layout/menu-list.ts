import { MenuItem } from '../menu';

interface MenuListProps {
  items: MenuItem[];
  selectedItems: MenuItem[];
  onSelectItem: (item: MenuItem) => void;
  onQuantityChange: (id: string, quantity: number) => void;
}

export type { MenuListProps };
