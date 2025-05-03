import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Manga } from '@/types/manga';

type MangaCardProps = {
  manga: Manga;
  rank: number;
};

const MangaCard: React.FC<MangaCardProps> = ({ manga, rank }) => {
  return (
    <Link href={`/manga/${manga.id}`} className="block">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105 relative">
        {/* ランキング表示 - 常に表示するようにスタイル修正 */}
        <div className="absolute top-0 left-0 bg-blue-600 text-white font-bold py-2 px-4 rounded-br-lg z-10">
          {rank}位
        </div>
        
        <div className="relative h-64 w-full">
          <Image 
            src={manga.coverImage} 
            alt={manga.title} 
            fill
            className="object-cover"
          />
        </div>
        
        <div className="p-4">
          <h3 className="text-xl font-bold mb-2">{manga.title}</h3>
          <p className="text-gray-600 mb-2">{manga.author}</p>
          <div className="flex items-center justify-between">
            <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">
              無料{manga.freeChapters}冊
            </span>
            <span className="text-sm text-gray-500">{manga.category}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MangaCard;