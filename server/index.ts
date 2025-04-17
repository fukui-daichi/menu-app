import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3001;

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());

const LINE_API_URL = 'https://api.line.me/v2/bot/message/push';
const CHANNEL_ACCESS_TOKEN = process.env.LINE_ACCESS_TOKEN;

app.post('/api/line-notify', async (req, res) => {
  try {
    const { userId, message } = req.body;
    
    if (!CHANNEL_ACCESS_TOKEN) {
      throw new Error('LINEアクセストークンが設定されていません');
    }

    console.log('LINE通知リクエストデータ:', { userId, message });
    console.log('LINE_ACCESS_TOKEN:', CHANNEL_ACCESS_TOKEN ? '設定済み' : '未設定');

    const requestData = {
      to: userId,
      messages: [{ type: 'text', text: message }]
    };

    console.log('送信データ:', JSON.stringify(requestData, null, 2));

    const response = await axios.post(
      LINE_API_URL,
      JSON.stringify(requestData), // 明示的にJSON化
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${CHANNEL_ACCESS_TOKEN}`
        },
        transformRequest: [] // axiosのデフォルト変換を無効化
      }
    );

    res.json(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('LINE APIエラー詳細:', {
        status: error.response?.status,
        data: error.response?.data,
        config: {
          url: error.config?.url,
          method: error.config?.method,
          data: error.config?.data
        }
      });
    } else {
      console.error('LINE通知エラー:', error);
    }
    res.status(500).json({ 
      error: 'LINE通知に失敗しました',
      details: axios.isAxiosError(error) ? error.response?.data : error.message 
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
