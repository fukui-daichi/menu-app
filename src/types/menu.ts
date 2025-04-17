interface MenuItem {
  id: string;
  name: string;        // 料理名
  category: string;    // カテゴリ（肉料理、パスタなど）
  isRecommended: boolean; // おすすめフラグ
  imageUrl?: string;   // 画像URL（ない場合はオプショナル）
  description?: string; // 料理の説明（オプショナル）
  recipe?: {           // レシピ情報
    ingredients: Array<{
      name: string;    // 素材名
      amount: string;  // 数量（100g、1個など）
    }>;
    steps?: string[];  // 調理手順（オプショナル）
  };
  tags?: string[];     // タグ情報（辛い、甘い、など検索用）
}

export type { MenuItem };
