// Swagger 2.0定義から手動で定義した型
// manga-api.jsonの定義に基づいて作成

export interface SwaggerManga {
  id: number;
  title: string;
  author: string;
  cover_image: string;
  categories: string[];
  description?: string;
  rating?: number;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface SwaggerResponses {
  // 単一マンガの取得レスポンス
  getManga: SwaggerManga;

  // マンガ一覧の取得レスポンス
  getMangaList: PaginatedResponse<SwaggerManga>;

  // カテゴリ別人気マンガの取得レスポンス
  getPopularMangas: SwaggerManga[];
}

// components型をES2015モジュール構文で定義して互換性を保つ
export type Components = {
  schemas: {
    Manga: SwaggerManga;
  };
};

export const components = {
  schemas: {
    Manga: {} as SwaggerManga,
  },
} as const;

// API のパスとエンドポイント定義
export interface ApiPaths {
  "/manga/{id}/": {
    get: {
      responses: {
        "200": {
          content: {
            "application/json": SwaggerManga;
          };
        };
      };
    };
  };
  "/manga/": {
    get: {
      responses: {
        "200": {
          content: {
            "application/json": PaginatedResponse<SwaggerManga>;
          };
        };
      };
    };
  };
  "/manga/popular-books/{category}/": {
    get: {
      responses: {
        "200": {
          content: {
            "application/json": SwaggerManga[];
          };
        };
      };
    };
  };
}

export type paths = ApiPaths;
