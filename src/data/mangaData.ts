import { Manga } from "@/types/manga";
import { fetchMangaById, fetchMangasByCategory } from "@/api/mangaApi";
import type { SwaggerManga } from "@/types/swagger-types";

// APIレスポンスからManga型への変換
type ApiManga = SwaggerManga;

// APIレスポンスをアプリケーション内で使用する型に変換
function convertToManga(apiManga: any): Manga {
  // anyタイプを使用して、APIの実際のレスポンスに適応できるようにする
  return {
    id: String(apiManga.id || ""), // idが数値の場合、文字列に変換
    title: apiManga.title || "",
    author: apiManga.author || "",
    coverImage: apiManga.cover_image || "/placeholder-cover.svg", // Swagger定義ではcover_imageを使用、空の場合はプレースホルダー
    description: apiManga.description || "",
    rating: apiManga.rating || 0,
    category:
      Array.isArray(apiManga.categories) && apiManga.categories.length > 0
        ? apiManga.categories[0]
        : "", // 後方互換性のため最初の要素を保持
    categories: Array.isArray(apiManga.categories) ? apiManga.categories : [], // 全てのカテゴリを配列として保持
    freeChapters: apiManga.free_chapters || 0, // APIからの値がない場合はデフォルト値を設定
    freeBooks: apiManga.free_books || 0, // APIからの値がない場合はデフォルト値を設定
  };
}

// カテゴリでフィルタリングしてTop10のマンガを取得する非同期関数
export async function getMangasByCategory(
  categoryId: string,
): Promise<Manga[]> {
  try {
    console.log(`カテゴリー ${categoryId} のマンガを取得しています...`);
    console.log(
      `実行環境: ${typeof window === "undefined" ? "サーバーサイド" : "クライアントサイド"}`,
    );

    const apiMangas = await fetchMangasByCategory(categoryId);
    return Array.isArray(apiMangas) ? apiMangas.map(convertToManga) : [];
  } catch (error) {
    console.error("Failed to fetch manga data:", error);
    return [];
  }
}

// ID指定でマンガデータを取得する非同期関数
export async function getMangaById(id: string): Promise<Manga | undefined> {
  try {
    console.log(`ID ${id} のマンガを取得しています...`);
    console.log(
      `実行環境: ${typeof window === "undefined" ? "サーバーサイド" : "クライアントサイド"}`,
    );

    const apiManga = await fetchMangaById(id);
    return convertToManga(apiManga);
  } catch (error) {
    console.error(`Failed to fetch manga with id ${id}:`, error);
    throw new Error(
      `マンガデータの取得に失敗しました。詳細: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}
