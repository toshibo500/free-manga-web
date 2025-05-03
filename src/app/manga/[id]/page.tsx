'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { getMangaById } from '@/data/mangaData';

export default function MangaDetail() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  
  const manga = getMangaById(id);
  
  // マンガが見つからない場合
  if (!manga) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
          <h1 className="text-2xl font-bold mb-4">マンガが見つかりません</h1>
          <button 
            onClick={() => router.push('/')} 
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            トップページに戻る
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          {/* 左側：表紙画像 */}
          <div className="md:w-1/3 relative">
            <div className="relative h-[500px] w-full">
              <Image 
                src={manga.coverImage} 
                alt={manga.title} 
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
          
          {/* 右側：詳細情報 */}
          <div className="md:w-2/3 p-6 flex flex-col">
            {/* ジャンル */}
            <div className="mb-4">
              <span className="inline-block bg-gray-200 text-gray-800 text-sm font-semibold px-3 py-1 rounded-full">
                {manga.category}
              </span>
            </div>
            
            {/* タイトル */}
            <h1 className="text-3xl font-bold mb-2">{manga.title}</h1>
            
            {/* 著者 */}
            <p className="text-gray-600 mb-6">著者：{manga.author}</p>
            
            {/* 作品概要 */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-2">作品概要</h2>
              <p className="text-gray-700 leading-relaxed">{manga.description}</p>
            </div>
            
            {/* 無料購読リンク */}
            <div className="mt-auto">
              <Link 
                href="#" 
                className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg text-center transition-colors"
              >
                無料{manga.freeChapters}冊を読む
              </Link>
            </div>
          </div>
        </div>
        
        {/* 戻るボタン */}
        <div className="p-6 bg-gray-50 border-t">
          <button 
            onClick={() => router.push('/')}
            className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
          >
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd"></path>
            </svg>
            ランキングに戻る
          </button>
        </div>
      </div>
    </div>
  );
}