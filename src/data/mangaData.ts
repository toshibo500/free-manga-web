import { Manga } from '@/types/manga';

// ダミーのマンガデータ
const mangaData: Manga[] = [
  {
    id: '1',
    title: 'ワンピース',
    author: '尾田栄一郎',
    coverImage: 'https://picsum.photos/400/600?random=1',
    freeChapters: 3,
    category: '少年マンガ',
    rating: 4.9,
    description: '海賊王を夢見る少年モンキー・D・ルフィが仲間たちと共に冒険する物語。世界中の海を舞台に、ルフィと仲間たちが自由を求めて様々な冒険に挑む。'
  },
  {
    id: '2',
    title: '鬼滅の刃',
    author: '吾峠呼世晴',
    coverImage: 'https://picsum.photos/400/600?random=2',
    freeChapters: 5,
    category: '少年マンガ',
    rating: 4.8,
    description: '家族を鬼に殺された少年・竈門炭治郎が、鬼になってしまった妹を人間に戻すため、鬼殺隊に入隊し鬼と戦う物語。'
  },
  {
    id: '3',
    title: '進撃の巨人',
    author: '諫山創',
    coverImage: 'https://picsum.photos/400/600?random=3',
    freeChapters: 2,
    category: '少年マンガ',
    rating: 4.7,
    description: '巨大な壁に囲まれた人類最後の砦で暮らす少年・エレンが、人を食らう「巨人」との壮絶な戦いを繰り広げる物語。'
  },
  {
    id: '4',
    title: '僕のヒーローアカデミア',
    author: '堀越耕平',
    coverImage: 'https://picsum.photos/400/600?random=4',
    freeChapters: 4,
    category: '少年マンガ',
    rating: 4.6,
    description: '生まれつき特殊能力「個性」を持った人間が当たり前の世界で、無個性の少年・緑谷出久がヒーローを目指す物語。'
  },
  {
    id: '5',
    title: '約束のネバーランド',
    author: '白井カイウ・出水ぽすか',
    coverImage: 'https://picsum.photos/400/600?random=5',
    freeChapters: 3,
    category: '少年マンガ',
    rating: 4.5,
    description: '孤児院「グレイス＝フィールドハウス」で暮らす子どもたちが、恐ろしい真実を知り、施設からの脱出を試みる物語。'
  },
  {
    id: '6',
    title: 'フルーツバスケット',
    author: '高屋奈月',
    coverImage: 'https://picsum.photos/400/600?random=6',
    freeChapters: 3,
    category: '少女マンガ',
    rating: 4.8,
    description: '十二支の呪いを受けた「草摩家」の人々と、彼らに関わることになった高校生・本田透との交流を描いた物語。'
  },
  {
    id: '7',
    title: '黒執事',
    author: '枢やな',
    coverImage: 'https://picsum.photos/400/600?random=7',
    freeChapters: 2,
    category: '少女マンガ',
    rating: 4.6,
    description: 'ヴィクトリア朝時代のイギリスを舞台に、完璧な執事・セバスチャンとその主人・シエル・ファントムハイヴの物語。'
  },
  {
    id: '8',
    title: '東京喰種',
    author: '石田スイ',
    coverImage: 'https://picsum.photos/400/600?random=8',
    freeChapters: 1,
    category: '青年マンガ',
    rating: 4.7,
    description: '人を喰らう怪人「喰種（グール）」が潜む東京で、人間と喰種の二つの顔を持つことになった金木研の苦悩を描く物語。'
  },
  {
    id: '9',
    title: 'キングダム',
    author: '原泰久',
    coverImage: 'https://picsum.photos/400/600?random=9',
    freeChapters: 2,
    category: '青年マンガ',
    rating: 4.9,
    description: '中国・春秋戦国時代を舞台に、天下の大将軍を目指す少年・信と、後の始皇帝・政の友情と活躍を描く歴史大河ドラマ。'
  },
  {
    id: '10',
    title: 'ちはやふる',
    author: '末次由紀',
    coverImage: 'https://picsum.photos/400/600?random=10',
    freeChapters: 4,
    category: '女性マンガ',
    rating: 4.6,
    description: '競技かるたに青春をかける少女・千早と仲間たちの友情、恋愛、成長を描く青春ストーリー。'
  }
];

// カテゴリでフィルタリングしてTop10のマンガを取得する関数
export function getMangasByCategory(categoryId: string): Manga[] {
  // 'all'の場合は全てのマンガを返す、それ以外はカテゴリでフィルター
  let filteredMangas = mangaData;
  
  if (categoryId !== 'all') {
    const categoryMap = {
      'shounen': '少年マンガ',
      'shoujo': '少女マンガ',
      'seinen': '青年マンガ',
      'josei': '女性マンガ',
    };
    
    filteredMangas = mangaData.filter(manga => 
      manga.category === categoryMap[categoryId as keyof typeof categoryMap]
    );
  }
  
  // レーティングでソートしてTop10を返す
  return filteredMangas
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 10);
}

// ID指定でマンガデータを取得する関数
export function getMangaById(id: string): Manga | undefined {
  return mangaData.find(manga => manga.id === id);
}