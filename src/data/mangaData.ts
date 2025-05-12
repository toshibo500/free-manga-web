import { Manga } from '@/types/manga';

// フェッチオプション（サーバーサイドレンダリング用）
const fetchOptions = {
  cache: 'no-store' as const, // SSRでのキャッシュを無効化
  next: { revalidate: 0 }, // データを毎回再検証
};

// 環境に応じたAPI Base URLを取得する関数
function getApiBaseUrl(): string {
  return typeof window !== 'undefined'
    ? process.env.NEXT_PUBLIC_API_BASE_URL || 'https://example.com'
    : process.env.INTERNAL_API_BASE_URL || 'https://example.com';
}

// カテゴリでフィルタリングしてTop10のマンガを取得する非同期関数
export async function getMangasByCategory(categoryId: string): Promise<Manga[]> {
  try {
    // API Base URLを取得
    const API_BASE_URL = getApiBaseUrl();

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
    // API Base URLを取得
    const API_BASE_URL = getApiBaseUrl();
      
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