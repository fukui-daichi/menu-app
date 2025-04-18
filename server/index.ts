import express from 'express';
import path from 'path';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

// 環境変数の読み込み (開発環境のみ)
if (process.env.NODE_ENV !== 'production') {
  const envPath = path.resolve(process.cwd(), '.env.local');
  dotenv.config({ path: envPath });
}

// 必須環境変数のバリデーション
const requiredEnvVars = ['LINE_ACCESS_TOKEN', 'ALLOWED_ORIGINS'];
const missingVars = requiredEnvVars.filter(v => !process.env[v]);

if (missingVars.length > 0) {
  console.error('以下の必須環境変数が設定されていません:');
  missingVars.forEach(v => console.error(`- ${v}`));
  process.exit(1);
}

// ログ設定
const log = {
  info: (...args: any[]) => console.log('[INFO]', ...args),
  error: (...args: any[]) => console.error('[ERROR]', ...args),
  debug: (...args: any[]) => {
    if (process.env.NODE_ENV !== 'production') {
      console.debug('[DEBUG]', ...args);
    }
  }
};

const app = express();
const PORT = process.env.PORT || 3001;

// CORS設定
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || [],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: true
}));

// ミドルウェア
app.use(express.json());

// ヘルスチェックエンドポイント
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK',
    timestamp: new Date().toISOString()
  });
});

const LINE_API_URL = process.env.LINE_API_URL || 'https://api.line.me/v2/bot/message/push';
const CHANNEL_ACCESS_TOKEN = process.env.LINE_ACCESS_TOKEN;

interface LineNotifyRequest {
  userId: string;
  message: string;
}

app.post('/api/line-notify', async (req, res) => {
  try {
    const { userId, message }: LineNotifyRequest = req.body;
    
    log.debug('LINE通知リクエスト受信:', { userId, message });

    const requestData = {
      to: userId,
      messages: [{
        type: 'text',
        text: message
      }]
    };

    log.debug('LINE API送信データ:', requestData);

    const response = await axios.post(LINE_API_URL, requestData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${CHANNEL_ACCESS_TOKEN}`
      }
    });

    log.info('LINE通知送信成功:', response.data);
    res.json(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      log.error('LINE APIエラー:', {
        status: error.response?.status,
        data: error.response?.data,
        url: error.config?.url
      });
    } else {
      log.error('LINE通知エラー:', error);
    }
    res.status(500).json({ 
      error: 'LINE通知に失敗しました',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

app.listen(PORT, () => {
  log.info(`Server started on port ${PORT}`);
  log.debug('Allowed origins:', process.env.ALLOWED_ORIGINS?.split(','));
});
