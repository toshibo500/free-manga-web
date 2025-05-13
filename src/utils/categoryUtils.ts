// カテゴリーIDから表示名へのマッピング
export const categoryMap: Record<string, string> = {
  all: "全て",
  shounen: "少年マンガ",
  shoujo: "少女マンガ",
  seinen: "青年マンガ",
  josei: "女性マンガ",
};

// カテゴリーIDから表示名を取得する関数
export function getCategoryName(categoryId: string): string {
  return categoryMap[categoryId] || categoryId;
}

// カテゴリーの一覧を取得する関数
export function getCategories() {
  return Object.entries(categoryMap).map(([id, name]) => ({
    id,
    name,
  }));
}
