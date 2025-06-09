import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Manga } from "@/types/manga";
import { getCategoryName } from "@/utils/categoryUtils";

type MangaCardProps = {
  manga: Manga;
  rank: number;
};

const MangaCard: React.FC<MangaCardProps> = ({ manga, rank }) => {
  return (
    <Link href={`/manga/${manga.id}`} className="block">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105 relative">
        <div className="flex items-start">
          <div className="relative h-80 w-78 flex-shrink-0">
            <Image
              src={manga.coverImage}
              alt={manga.title}
              width={180}
              height={224}
              className="object-cover"
            />
          </div>
          <div className="ml-4 flex flex-col justify-between flex-grow py-2">
            <div className="flex flex-wrap gap-1 mb-2">
              {manga.categories &&
                manga.categories.slice(0, 3).map((category: string, index: number) => (
                  <span
                    key={index}
                    className="bg-blue-500/70 text-white text-xs py-1 px-2 rounded"
                  >
                    {getCategoryName(category)}
                  </span>
                ))}
            </div>
            <h3 className="text-xl font-bold mb-2">{manga.title}</h3>
            <p className="text-gray-600 mb-2">{manga.author}</p>
            <div className="flex items-center">
              <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded w-fit min-w-[56px] text-center mr-2">
                無料{manga.freeBooks}冊
              </span>
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded w-fit min-w-[56px] text-center">
                無料{manga.freeChapters}話
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MangaCard;
