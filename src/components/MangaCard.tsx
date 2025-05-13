import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Manga } from '@/types/manga';
import { getCategoryName } from '@/utils/categoryUtils';

type MangaCardProps = {
  manga: Manga;
  rank: number;
};

const MangaCard: React.FC<MangaCardProps> = ({ manga, rank }) => {
  return (
    <Link href={`/manga/${manga.id}`} className="block">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105 relative">
        <div className="relative h-64 w-full">
          <Image 
            src={manga.coverImage} 
            alt={manga.title} 
            fill
            className="object-cover"
          />
          {/* カテゴリ表示 - 左下に配置、最大3つのカテゴリを表示 */}
          <div className="absolute bottom-2 left-2 flex flex-wrap gap-1 z-10">
            {manga.categories && manga.categories.slice(0, 3).map((category, index) => (
              <span key={index} className="bg-blue-500/70 text-white text-xs py-1 px-2 rounded">
                {getCategoryName(category)}
              </span>
            ))}
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="text-xl font-bold mb-2">{manga.title}</h3>
          <p className="text-gray-600 mb-2">{manga.author}</p>
          <div className="flex items-center justify-between">
            <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">
              無料{manga.freeChapters}冊
            </span>
            <span className="text-sm text-gray-500">
              {manga.categories && manga.categories.length > 0 
                ? `${getCategoryName(manga.categories[0])}${manga.categories.length > 1 ? ' 他' : ''}` 
                : '未分類'}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MangaCard;