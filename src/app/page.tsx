"use client";

import { useState, useEffect } from "react";
import MangaCard from "@/components/MangaCard";
import CategorySelector from "@/components/CategorySelector";
import { getMangasByCategory } from "@/data/mangaData";
import { Manga } from "@/types/manga";
import { getCategories } from "@/utils/categoryUtils";

// カテゴリー定義を utils から取得
const categories = getCategories();

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [mangaList, setMangaList] = useState<Manga[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // カテゴリーが変更されたときにマンガデータを取得
  useEffect(() => {
    async function fetchMangaData() {
      setIsLoading(true);
      setError("");
      try {
        const data = await getMangasByCategory(selectedCategory);
        setMangaList(data);
      } catch (err) {
        setError("マンガデータの取得に失敗しました。");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMangaData();
  }, [selectedCategory]);

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-center my-8">
        人気マンガランキング
      </h2>

      {/* カテゴリ選択コンポーネント */}
      <CategorySelector
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* エラーメッセージ */}
      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {/* ローディング表示 */}
      {isLoading && (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {/* マンガランキングリスト */}
      {!isLoading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mangaList.map((manga, index) => (
            <MangaCard key={manga.id} manga={manga} rank={index + 1} />
          ))}
        </div>
      )}

      {/* データが空の場合 */}
      {!isLoading && !error && mangaList.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-500">マンガが見つかりませんでした。</p>
        </div>
      )}
    </div>
  );
}
