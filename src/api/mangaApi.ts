import axios, { AxiosError } from 'axios';
import { components, SwaggerManga } from '@/types/swagger-types';

// APIのレスポンス型を取得
type MangaResponse = SwaggerManga;
type MangaListResponse = SwaggerManga[];

// 環境に応じたAPIのベースURLを取得する
function getApiBaseUrl(): string {
  // Swagger 2.0では`host`フィールドが使用されるが、環境によって異なる値を使用する必要がある
  
  // サーバーサイド（Node.js）環境の場合
  if (typeof window === 'undefined') {
    // Docker内部通信用のURL
    return process.env.INTERNAL_API_BASE_URL || 'http://api:8000';
  }
  
  // クライアントサイド（ブラウザ）環境の場合
  return process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
}

// APIクライアントの作成
const apiClient = axios.create({
  baseURL: getApiBaseUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
});

// APIエラーを処理する共通関数
function handleApiError(error: unknown, defaultMessage: string): never {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    console.error(`APIエラー: ${axiosError.message}`);
    console.error(`ステータスコード: ${axiosError.response?.status}`);
    console.error(`レスポンスデータ:`, axiosError.response?.data);
    
    if (axiosError.response?.status === 404) {
      throw new Error('リソースが見つかりません');
    } else if (axiosError.response?.status === 403) {
      throw new Error('アクセス権限がありません');
    } else if (axiosError.response?.status === 401) {
      throw new Error('認証が必要です');
    }
  } else {
    console.error(`予期しないエラー:`, error);
  }
  
  throw new Error(defaultMessage);
}

// マンガの詳細を取得する関数
export async function fetchMangaById(id: string): Promise<MangaResponse> {
  try {
    console.log(`APIクライアント: マンガ詳細取得 (ID: ${id})`);
    console.log(`BaseURL: ${apiClient.defaults.baseURL}`);
    
    // Swagger 2.0のパスパターンに合わせる
    const response = await apiClient.get<MangaResponse>(`/api/v1/manga/${id}/`);
    
    console.log(`APIレスポンス: ${response.status}`);
    return response.data;
  } catch (error) {
    handleApiError(error, `マンガデータの取得に失敗しました (ID: ${id})`);
    // エラーハンドラーが例外を投げるので、この行は実行されません
    throw new Error(`マンガデータの取得に失敗しました (ID: ${id})`);
  }
}

// カテゴリー別のマンガ一覧を取得する関数
export async function fetchMangasByCategory(categoryId: string): Promise<MangaListResponse> {
  try {
    console.log(`APIクライアント: カテゴリー別マンガ一覧取得 (カテゴリー: ${categoryId})`);
    
    // Swagger 2.0のパスパターンに合わせる
    const response = await apiClient.get<MangaListResponse>(`/api/v1/manga/popular-books/${categoryId}/`);
    return response.data;
  } catch (error) {
    handleApiError(error, `カテゴリー別マンガ一覧の取得に失敗しました (カテゴリー: ${categoryId})`);
    // エラーハンドラーが例外を投げるので、この行は実行されません
    throw new Error(`カテゴリー別マンガ一覧の取得に失敗しました (カテゴリー: ${categoryId})`);
  }
}
