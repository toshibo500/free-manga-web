# マンガデータベース Web アプリケーション

Next.jsで構築された無料マンガデータベースのWebアプリケーションです。

## 開発環境のセットアップ

### 前提条件

- Docker と Docker Compose がインストールされていること
- Node.js 18.x 以上（ローカル開発用）

### 環境変数の設定

1. リポジトリのルートディレクトリに `.env.local` ファイルを作成します：

```bash
# .env.example をコピーして作成
cp .env.example .env.local
```

2. 必要に応じて環境変数の値を編集します：

```bash
# クライアントサイド（ブラウザ）からアクセスするAPI URL
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000

# サーバーサイド（Docker内部）からアクセスするAPI URL
INTERNAL_API_BASE_URL=http://api:8000
```

### アプリケーションの起動

Docker Compose を使用してアプリケーションを起動します：

```bash
docker-compose up -d
```

アプリケーションは http://localhost:3000 でアクセスできます。

## 本番環境用のビルド

本番環境用のビルドを作成するには：

```bash
# 本番用環境変数を使用
cp .env.example .env.production
# 環境変数を編集
nano .env.production
# ビルドとスタート
docker-compose -f docker-compose.prod.yml up -d
```

## 環境変数について

本アプリケーションでは、以下の環境変数ファイルを使用しています：

- `.env.local` - 開発環境用（Gitで追跡されません）
- `.env.staging` - ステージング環境用（Gitで追跡されません）
- `.env.production` - 本番環境用（Gitで追跡されません）

`.env.example` ファイルをコピーして、適切な環境用の設定ファイルを作成してください。

## OpenAPIスキーマとTypeScript型の活用

このプロジェクトではOpenAPIスキーマを使用してAPIとの型安全な連携を実現しています。

### OpenAPI型の生成

OpenAPIスキーマからTypeScript型定義を生成するには以下のコマンドを実行します：

```bash
# Docker環境内で実行する場合
docker-compose exec next-app npm run generate-types

# ローカル環境で実行する場合
npm run generate-types
```

これにより、`src/schema/manga-api.json`のスキーマを読み取り、`src/types/manga-api.generated.ts`に型定義が生成されます。

### APIクライアントの使用方法

生成された型を使用したAPIクライアントは`src/api/mangaApi.ts`で実装されています。このクライアントは、実行環境（サーバーサイドかクライアントサイドか）に応じて適切なベースURLを使用します。

```typescript
// データ層でAPIクライアントを使用する例
import { fetchMangaById } from '@/api/mangaApi';

// 型安全なAPIリクエスト
const manga = await fetchMangaById('manga-001');
```

### 型の更新

APIスキーマに変更があった場合は、`src/schema/manga-api.json`を更新し、`npm run generate-types`を再実行して型定義を更新してください。

## Swagger 2.0との統合

このプロジェクトはSwagger 2.0形式のAPI仕様に対応しています。

### Swagger 2.0スキーマの使用

APIの仕様は`src/schema/manga-api.json`ファイルにSwagger 2.0形式で定義されています。この仕様書には以下の情報が含まれています：

- APIエンドポイントのパスとHTTPメソッド
- リクエストパラメータとレスポンス形式
- データモデルの定義

### 手動型定義

Swagger 2.0形式は自動型生成ツールとの互換性の問題があるため、手動で型定義を作成しています：

```typescript
// src/types/swagger-types.ts を使用して
import { SwaggerManga } from '@/types/swagger-types';
```

### API呼び出しの例

```typescript
// マンガ詳細の取得（ID指定）
const manga = await fetchMangaById('1');

// カテゴリ別マンガリストの取得
const mangaList = await fetchMangasByCategory('shounen');
```
