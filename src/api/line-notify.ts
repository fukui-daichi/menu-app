import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

export const sendLineNotification = async (userId: string, message: string) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/line-notify`,
      {
        userId,
        message
      }
    );
    return response.data;
  } catch (error) {
    console.error('LINE通知エラー:', error);
    throw error;
  }
};

export const formatOrderMessage = (items: Array<{name: string, category: string}>) => {
  let message = '🍴【注文内容】🍴\n\n';
  items.forEach((item, index) => {
    message += `${index + 1}. ${item.name} (${item.category})\n`;
  });
  message += '\n--------------------\n';
  message += `✅ 合計: ${items.length}品\n`;
  message += 'ご注文ありがとうございます！';
  return message;
};
