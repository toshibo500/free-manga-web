import { getMangaById } from "@/data/mangaData";
import { Manga } from "@/types/manga";
import { getCategoryName } from "@/utils/categoryUtils";
import { notFound } from "next/navigation";

// サーバーコンポーネントとしてasync/awaitを直接使用可能
export default async function MangaDetailPage({
  params,
}: {
  params: { id: string };
}) {
    const resolvedParams = await params;
    const { id } = resolvedParams;

  // サーバーサイドでデータを直接フェッチ
  let manga: Manga | undefined;
  try {
    manga = await getMangaById(id);

    // マンガが見つからない場合は404ページを表示
    if (!manga) {
      notFound();
    }
  } catch (err) {
    console.error("マンガデータの取得に失敗しました。", err);
    throw new Error("マンガデータの取得に失敗しました。");
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
            <span className="font-semibold">カテゴリー:</span>{" "}
            {getCategoryName(manga.category)}
          </div>

          <div>
            <span className="font-semibold">無料で読める巻数:</span>{" "}
            {manga.freeBooks || 0}巻
          </div>

          <div>
            <span className="font-semibold">無料で読める話数:</span>{" "}
            {manga.freeChapters}話
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">あらすじ</h2>
            <p className="text-gray-700">{manga.description}</p>
          </div>

          <div className="pt-4 flex flex-col gap-3">
            {Array.isArray(manga.ebookstores) && manga.ebookstores.length > 0 ? (
              manga.ebookstores.map((store, idx) => {
                const colors = [
                  "bg-blue-600 hover:bg-blue-700",
                  "bg-green-600 hover:bg-green-700",
                  "bg-pink-600 hover:bg-pink-700",
                  "bg-yellow-500 hover:bg-yellow-600 text-gray-900",
                  "bg-purple-600 hover:bg-purple-700",
                ];
                const color = colors[idx % colors.length];
                return (
                  <a
                    key={store.ebookstore_name}
                    href={store.manga_detail_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${color} text-white font-bold py-2 px-6 rounded-full transition duration-300 block text-center`}
                  >
                    {store.ebookstore_name} で読む
                    {(store.free_books > 0 || store.free_chapters > 0) && (
                      <span className="block text-xs font-normal mt-1">
                        {store.free_books > 0 && `無料${store.free_books}冊`}
                        {store.free_books > 0 && store.free_chapters > 0 && '・'}
                        {store.free_chapters > 0 && `無料${store.free_chapters}話`}
                      </span>
                    )}
                  </a>
                );
              })
            ) : (
              <span className="text-gray-400">配信サイト情報はありません</span>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <a href="/" className="text-blue-500 hover:underline">
          ← 一覧に戻る
        </a>
      </div>
    </div>
  );
}
