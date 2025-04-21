import { MenuItem } from '../menu';

interface OrderButtonProps {
  selectedItems: MenuItem[];
  onQuantityChange: (id: string, quantity: number) => void;
}

interface OrderConfirmationModalProps {
  selectedItems: MenuItem[];
  onConfirm: () => void;
  onCancel: () => void;
  onQuantityChange: (id: string, quantity: number) => void;
}

export type { OrderButtonProps, OrderConfirmationModalProps };
