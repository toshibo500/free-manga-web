import { Manga } from '@/types/manga';

// API ベースURL（環境変数から取得）
// Docker環境でサーバーサイドレンダリングする場合とブラウザからアクセスする場合で
// APIエンドポイントが異なるため、実行環境に応じて切り替え
const API_BASE_URL = typeof window === 'undefined'
  ? process.env.API_INTERNAL_URL || 'http://prism-mock:4010' // サーバーサイド（Docker内部通信用）
  : process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4010'; // クライアントサイド

// フェッチオプション（サーバーサイドレンダリング用）
const fetchOptions = {
  cache: 'no-store' as const, // SSRでのキャッシュを無効化
  next: { revalidate: 0 }, // データを毎回再検証
};

// カテゴリでフィルタリングしてTop10のマンガを取得する非同期関数
export async function getMangasByCategory(categoryId: string): Promise<Manga[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/manga/popular-books/${categoryId}`, fetchOptions);
    
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
    console.log(`フェッチしています - URL: ${API_BASE_URL}/api/v1/manga/${id}`);
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