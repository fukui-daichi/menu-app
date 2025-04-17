import React from 'react';
import { MenuItem } from '../../types/menu';
import { sendLineNotification, formatOrderMessage } from '../../api/line-notify';

interface OrderButtonProps {
  selectedItems: MenuItem[];
}

const OrderButton: React.FC<OrderButtonProps> = ({ selectedItems }) => {
  const handleOrder = async () => {
    if (selectedItems.length === 0) {
      alert('注文するメニューを選択してください');
      return;
    }

    try {
      // ユーザー自身のLINEユーザーIDを指定 (実際にはログイン機能などで取得)
      const userId = import.meta.env.VITE_LINE_USER_ID || '';
      
      if (!userId) {
        throw new Error('LINEユーザーIDが設定されていません');
      }

      const message = formatOrderMessage(
        selectedItems.map(item => ({
          name: item.name,
          category: item.category
        }))
      );
      
      await sendLineNotification(userId, message);
      alert('注文が送信されました！LINEで確認してください');
    } catch (error: unknown) {
      console.error('Error:', error);
      const errorMessage = error instanceof Error ? error.message : '不明なエラー';
      alert(`注文の送信中にエラーが発生しました: ${errorMessage}`);
    }
  };

  return (
    <button
      onClick={handleOrder}
      className="block ml-auto bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors"
    >
      カートに追加 ({selectedItems.length})
    </button>
  );
};

export default OrderButton;
