import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

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
  let message = '【注文内容】\n';
  items.forEach(item => {
    message += `・${item.name} (${item.category})\n`;
  });
  message += `\n合計 ${items.length}品`;
  return message;
};
