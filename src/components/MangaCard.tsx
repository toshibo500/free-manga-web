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
        <div className="relative h-64 w-full">
          <Image 
            src={manga.coverImage} 
            alt={manga.title} 
            fill
            className="object-cover"
          />
          {/* カテゴリ表示 - 左下に配置、より小さく、色も薄く */}
          <div className="absolute bottom-2 left-2 bg-blue-500/70 text-white text-xs py-1 px-2 rounded z-10">
            {manga.category}
          </div>
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