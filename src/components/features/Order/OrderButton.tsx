import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { sendLineNotification, formatOrderMessage } from '../../../api/line-notify';
import OrderConfirmationModal from './OrderConfirmationModal';
import type { OrderButtonProps } from '../../../types/features/order';

const OrderButton: React.FC<OrderButtonProps> = ({ 
  selectedItems,
  onQuantityChange
}) => {
  const [showModal, setShowModal] = useState(false);
  const clearAllItems = () => {
    selectedItems.forEach(item => {
      onQuantityChange(item.id, -1); // 各アイテムを個別に削除
    });
  };

  const handleOrder = async () => {
    if (selectedItems.length === 0) {
      toast.error('注文するメニューを選択してください');
      return;
    }
    setShowModal(true);
  };

  const confirmOrder = async () => {
    try {
      const userId = import.meta.env.VITE_LINE_USER_ID || '';
      if (!userId) {
        throw new Error('LINEユーザーIDが設定されていません');
      }

      const message = formatOrderMessage(
        selectedItems.map(item => ({
          name: item.name,
          category: item.category,
          quantity: item.quantity || 1
        }))
      );
      
      await sendLineNotification(userId, message);
      setShowModal(false);
      // 注文完了後に全選択解除
      selectedItems.forEach(item => {
        onQuantityChange(item.id, -1);
      });
    } catch (error: unknown) {
      console.error('Error:', error);
      const errorMessage = error instanceof Error ? error.message : '不明なエラー';
      toast.error(`注文の送信中にエラーが発生しました: ${errorMessage}`);
    }
  };

  return (
    <>
      <div className="flex gap-2 justify-center">
        <button
          onClick={clearAllItems}
          className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
        >
          全選択解除
        </button>
        <button
          onClick={handleOrder}
          className="bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded transition-colors"
        >
          注文する ({selectedItems.length})
        </button>
      </div>

      {showModal && (
        <OrderConfirmationModal
          selectedItems={selectedItems}
          onConfirm={confirmOrder}
          onCancel={() => setShowModal(false)}
          onQuantityChange={onQuantityChange}
        />
      )}
    </>
  );
};

export default OrderButton;
