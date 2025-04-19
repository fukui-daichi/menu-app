import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
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
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (modalRef.current && overlayRef.current) {
      // アニメーション初期状態
      gsap.set(modalRef.current, { y: 50, opacity: 0 });
      gsap.set(overlayRef.current, { opacity: 0 });

      // 表示アニメーション
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.3 });
      gsap.to(modalRef.current, { 
        y: 0, 
        opacity: 1, 
        duration: 0.4,
        ease: "back.out"
      });
    }
  }, []);
  return (
    <div 
      ref={overlayRef}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onCancel();
        }
      }}
    >
      <div 
        ref={modalRef}
        className="bg-white rounded-lg w-full max-w-md p-6" 
        onClick={(e) => e.stopPropagation()}
      >
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
                    className="p-1.5 bg-red-50 text-red-600 rounded-full hover:bg-red-100"
                    aria-label="削除"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
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
