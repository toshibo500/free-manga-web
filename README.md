# マンガデータベース Web アプリケーション

Next.jsで構築された無料マンガデータベースのWebアプリケーションです。

> 📋 **技術仕様・アーキテクチャ詳細**: [Architecture.md](./Architecture.md) をご確認ください

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

## 本番環境での更新手順 (PM2使用)

本番環境で PM2 を使用している場合のコードや環境変数の更新手順：

### 1. コードの更新手順

```bash
# 本番サーバー上で、アプリのディレクトリに移動
cd /var/www/free-manga/free-manga-web

# 最新のコードを取得
git pull origin master

# 依存パッケージのインストール（必要な場合）
npm install

# 本番用にビルド
npm run build

# PM2でアプリケーションを再起動
pm2 restart freemangadb
```

### 2. 環境変数(.env.production)の更新手順

```bash
# ローカル環境で.env.productionを編集した場合、サーバーにアップロード
scp .env.production ユーザー名@サーバーIP:/var/www/free-manga/free-manga-web/

# または、サーバー上で直接編集
nano .env.production

# 重要: 環境変数の変更を反映するには再ビルドが必要
npm run build

# アプリケーションを再起動（環境変数の変更を反映）
pm2 list                            # 現在のプロセス名を確認
pm2 restart プロセス名 --update-env  # 環境変数の更新を反映して再起動
```

### 3. PM2ログの確認方法

```bash
# すべてのアプリケーションのステータス確認
pm2 status

# 特定のアプリケーションのログを表示
pm2 logs freemangadb

# 最新の10行だけ表示
pm2 logs freemangadb --lines 10
```

### 4. メンテナンス・トラブルシューティング

```bash
# PM2プロセスの詳細情報を表示
pm2 show freemangadb

# メモリ使用量などのモニタリング
pm2 monit

# PM2設定を再ロード（設定ファイル変更後）
pm2 reload ecosystem.config.js

# Nginxの設定やログ確認
sudo nginx -t
sudo tail -f /var/log/nginx/error.log
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
