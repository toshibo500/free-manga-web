import { Manga } from '@/types/manga';

// 環境変数へのアクセス用関数（process.envの代替）
const getEnv = (key: string, defaultValue: string): string => {
  // Nodeの環境変数オブジェクト（サーバーサイド）
  // @ts-ignore コンパイラエラーを回避
  const processEnv = typeof process !== 'undefined' ? process.env : {};
  
  // サーバーサイドかクライアントサイドかで取得方法を変える
  if (typeof window === 'undefined') {
    // サーバーサイド
    return processEnv[key] || defaultValue;
  } else {
    // クライアントサイド (NEXT_PUBLIC_ で始まる環境変数のみアクセス可能)
    if (key.startsWith('NEXT_PUBLIC_')) {
      return processEnv[key] || defaultValue;
    }
    return defaultValue;
  }
};

// API ベースURL（環境変数から取得）
// Docker環境でサーバーサイドレンダリングする場合とブラウザからアクセスする場合で
// APIエンドポイントが異なるため、実行環境に応じて切り替え
const API_BASE_URL = typeof window === 'undefined'
  ? getEnv('INTERNAL_API_BASE_URL', 'http://api:8000') // サーバーサイド（Docker内部通信用）
  : getEnv('NEXT_PUBLIC_API_BASE_URL', 'http://localhost:8000'); // クライアントサイド

console.log(`APIエンドポイント: ${API_BASE_URL}（${typeof window === 'undefined' ? 'サーバーサイド' : 'クライアントサイド'}）`);

// フェッチオプション（サーバーサイドレンダリング用）
const fetchOptions = {
  cache: 'no-store' as const, // SSRでのキャッシュを無効化
  next: { revalidate: 0 }, // データを毎回再検証
};

// カテゴリでフィルタリングしてTop10のマンガを取得する非同期関数
export async function getMangasByCategory(categoryId: string): Promise<Manga[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/manga/popular-books/${categoryId}/`, fetchOptions);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch manga data:', error);
    return [];
  }
}

// ID指定でマンガデータを取得する非同期関数
export async function getMangaById(id: string): Promise<Manga | undefined> {
  try {
    console.log(`フェッチしています - URL: ${API_BASE_URL}/api/v1/manga/${id}/`);
    console.log(`実行環境: ${typeof window === 'undefined' ? 'サーバーサイド' : 'クライアントサイド'}`);
    
    const response = await fetch(`${API_BASE_URL}/api/v1/manga/${id}`, fetchOptions);
    
    if (!response.ok) {
      console.error(`API Error: Status ${response.status}`);
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch manga with id ${id}:`, error);
    throw new Error(`マンガデータの取得に失敗しました。詳細: ${error instanceof Error ? error.message : String(error)}`);
  }
}