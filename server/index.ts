import express from 'express';
import path from 'path';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

// 環境変数の読み込みを確認
const envPath = path.resolve(process.cwd(), '.env.local');
console.log('Loading .env from:', envPath);
dotenv.config({ path: envPath });
console.log('LINE_ACCESS_TOKEN:', process.env.LINE_ACCESS_TOKEN ? 'Loaded' : 'Not loaded');

const app = express();
const PORT = 3001;

app.use(cors({
  origin: [
    'https://menu-app-wine-ten.vercel.app',
    'https://menu-dzao9n79q-fukuis-projects.vercel.app'
  ],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: true
}));
app.use(express.json());

const LINE_API_URL = 'https://api.line.me/v2/bot/message/push';
const CHANNEL_ACCESS_TOKEN = process.env.LINE_ACCESS_TOKEN || '5fnGX31x41Kfz6dS+5OUZLEmJKqzDaKxi0sTjhVvvBj7VsYp7MhEsW66SKKxnBCJHCBs8+kU7v7BO0Eh+N/xvM2cDRiZ56aBEca4mmZoI87IVWRgpSkyJCwOHvlx2/WlSYqNjLmphrJO1EdTsrs3CQdB04t89/1O/w1cDnyilFU=';

app.post('/api/line-notify', async (req, res) => {
  try {
    const { userId, message } = req.body;
    
    if (!CHANNEL_ACCESS_TOKEN) {
      throw new Error('LINEアクセストークンが設定されていません。.env.localファイルに以下の形式で設定してください:\nLINE_ACCESS_TOKEN=あなたのチャネルアクセストークン');
    }

    console.log('LINE通知リクエストデータ:', { userId, message });
    console.log('LINE_ACCESS_TOKEN:', CHANNEL_ACCESS_TOKEN ? '設定済み' : '未設定');

    const requestData = {
      to: userId,
      messages: [
        {
          type: 'text',
          text: message
        }
      ]
    };

    console.log('送信データ:', JSON.stringify(requestData, null, 2));

    const response = await axios.post(
      LINE_API_URL,
      requestData,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${CHANNEL_ACCESS_TOKEN}`
        }
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
