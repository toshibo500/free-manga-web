export type Manga = {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  freeChapters: number;
  freeBooks: number; // API で提供されるフィールドを追加
  category: string; // 後方互換性のため残す
  categories: string[]; // 複数カテゴリに対応
  description?: string;
  rating?: number;
  ebookstores?: {
    ebookstore_name: string;
    manga_detail_url: string;
  }[];
};
