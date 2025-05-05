import { Manga } from '@/types/manga';

// API ベースURL（環境変数から取得）
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4010';

// カテゴリでフィルタリングしてTop10のマンガを取得する非同期関数
export async function getMangasByCategory(categoryId: string): Promise<Manga[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/manga/popular-books/${categoryId}`);
    
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
    const response = await fetch(`${API_BASE_URL}/api/v1/manga/${id}`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch manga with id ${id}:`, error);
    return undefined;
  }
}