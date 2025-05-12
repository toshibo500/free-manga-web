// 環境変数の型定義
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test' | 'staging' | 'local';
    NEXT_PUBLIC_API_BASE_URL?: string;
    INTERNAL_API_BASE_URL?: string;
  }
}
