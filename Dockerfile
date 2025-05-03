FROM node:18-alpine

WORKDIR /app

# パッケージのインストール
COPY package*.json ./
RUN npm install

# ソースコードのコピー
COPY . .

# ポート公開
EXPOSE 3000

# 開発モードで実行
CMD ["npm", "run", "dev"]