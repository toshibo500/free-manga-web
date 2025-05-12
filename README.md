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
