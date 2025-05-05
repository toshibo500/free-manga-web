export type Manga = {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  freeChapters: number;
  freeBooks: number;  // API で提供されるフィールドを追加
  category: string;
  description?: string;
  rating?: number;
};