'use client';

import { useState, useEffect } from 'react';
import { getMangaById } from '@/data/mangaData';
import { Manga } from '@/types/manga';
import { getCategoryName } from '@/utils/categoryUtils';

export default function MangaDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [manga, setManga] = useState<Manga | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchMangaDetail() {
      setIsLoading(true);
      setError('');
      try {
        const data = await getMangaById(id);
        if (data) {
          setManga(data);
        } else {
          setError('マンガが見つかりませんでした。');
        }
      } catch (err) {
        setError('マンガデータの取得に失敗しました。');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMangaDetail();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !manga) {
    return (
      <div className="container mx-auto p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error || 'マンガ情報を取得できませんでした。'}</span>
        </div>
        <div className="mt-4">
          <a href="/" className="text-blue-500 hover:underline">ホームに戻る</a>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-8">
        {/* マンガのカバー画像 */}
        <div className="w-full md:w-1/3">
          <img 
            src={manga.coverImage} 
            alt={`${manga.title}のカバー`} 
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
        
        {/* マンガの詳細情報 */}
        <div className="w-full md:w-2/3 space-y-4">
          <h1 className="text-3xl font-bold">{manga.title}</h1>
          
          <div className="flex items-center space-x-2">
            <span className="text-yellow-500">★</span>
            <span>{manga.rating}</span>
          </div>
          
          <div>
            <span className="font-semibold">作者:</span> {manga.author}
          </div>
          
          <div>
            <span className="font-semibold">カテゴリー:</span> {getCategoryName(manga.category)}
          </div>
          
          <div>
            <span className="font-semibold">無料で読める巻数:</span> {manga.freeBooks || 0}巻
          </div>
          
          <div>
            <span className="font-semibold">無料で読める話数:</span> {manga.freeChapters}話
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-2">あらすじ</h2>
            <p className="text-gray-700">{manga.description}</p>
          </div>
          
          <div className="pt-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition duration-300">
              今すぐ無料で読む
            </button>
          </div>
        </div>
      </div>
      
      <div className="mt-8">
        <a href="/" className="text-blue-500 hover:underline">←　一覧に戻る</a>
      </div>
    </div>
  );
}