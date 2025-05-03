export type Manga = {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  freeChapters: number;
  category: string;
  description?: string;
  rating?: number;
};