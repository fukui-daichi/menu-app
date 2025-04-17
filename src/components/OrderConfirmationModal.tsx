import React from 'react';
import { MenuItem } from '../types/menu';

interface OrderConfirmationModalProps {
  selectedItems: MenuItem[];
  onConfirm: () => void;
  onCancel: () => void;
  onQuantityChange: (id: string, quantity: number) => void;
}

const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  selectedItems,
  onConfirm,
  onCancel,
  onQuantityChange
}) => {
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onCancel();
        }
      }}
    >
      <div className="bg-white rounded-lg w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-xl font-bold mb-4">注文内容の確認</h2>
        
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {selectedItems.length === 0 ? (
            <div className="text-center py-4 text-gray-500">
              メニューが選択されていません
            </div>
          ) : (
            selectedItems.map(item => (
              <div key={item.id} className="flex items-center justify-between border-b pb-2">
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-8 text-center">
                    {item.quantity || 1}
                  </span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onQuantityChange(item.id, -1);
                    }}
                    className="px-2 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
                  >
                    削除
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onCancel}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            キャンセル
          </button>
          <button
            onClick={selectedItems.length > 0 ? onConfirm : undefined}
            disabled={selectedItems.length === 0}
            className={`px-4 py-2 text-white rounded ${
              selectedItems.length > 0 
                ? 'bg-primary hover:bg-primary-dark cursor-pointer' 
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            注文を確定
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationModal;
