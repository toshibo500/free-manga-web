'use client';

import { useState } from 'react';
import MangaCard from '@/components/MangaCard';
import CategorySelector from '@/components/CategorySelector';
import { getMangasByCategory } from '@/data/mangaData';

// カテゴリー定義
const categories = [
  { id: 'all', name: '全て' },
  { id: 'shounen', name: '少年マンガ' },
  { id: 'shoujo', name: '少女マンガ' },
  { id: 'seinen', name: '青年マンガ' },
  { id: 'josei', name: '女性マンガ' },
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // 選択されたカテゴリーのマンガデータを取得
  const mangaList = getMangasByCategory(selectedCategory);

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-center my-8">人気無料マンガまとめ</h2>
      
      {/* カテゴリ選択コンポーネント */}
      <CategorySelector 
        categories={categories} 
        selectedCategory={selectedCategory} 
        onSelectCategory={setSelectedCategory}
      />

      {/* マンガランキングリスト */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mangaList.map((manga, index) => (
          <MangaCard 
            key={manga.id} 
            manga={manga} 
            rank={index + 1} 
          />
        ))}
      </div>
    </div>
  );
}