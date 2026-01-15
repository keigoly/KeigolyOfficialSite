# Decap CMS OAuth Worker

Decap CMS を GitHub OAuth で認証するための Cloudflare Worker です。

## セットアップ手順

### 1. GitHub OAuth App の作成

1. [GitHub Developer Settings](https://github.com/settings/developers) にアクセス
2. **OAuth Apps** → **New OAuth App** をクリック
3. 以下の情報を入力：
   - **Application name**: `Keigoly Blog CMS`
   - **Homepage URL**: `https://keigoly.jp`
   - **Authorization callback URL**: `https://decap-oauth.keigoly.jp/callback`
4. **Register application** をクリック
5. **Client ID** をメモ
6. **Generate a new client secret** をクリックして **Client Secret** をメモ

### 2. Cloudflare Worker のデプロイ

```bash
cd decap-oauth-worker

# 依存関係のインストール
npm install

# Cloudflare にログイン
npx wrangler login

# Client ID を環境変数として設定
npx wrangler secret put GITHUB_CLIENT_ID
# → GitHub OAuth App の Client ID を入力

# Client Secret を環境変数として設定
npx wrangler secret put GITHUB_CLIENT_SECRET
# → GitHub OAuth App の Client Secret を入力

# Worker をデプロイ
npm run deploy
```

### 3. カスタムドメインの設定（推奨）

1. Cloudflare Dashboard → Workers & Pages → decap-oauth
2. **Settings** → **Triggers** → **Custom Domains**
3. `decap-oauth.keigoly.jp` を追加

または、デフォルトの `decap-oauth.<your-subdomain>.workers.dev` を使用する場合は、
`config.yml` の `base_url` を更新してください。

## 確認

デプロイ後、以下のURLにアクセス：
- `https://decap-oauth.keigoly.jp/auth` → GitHub のログイン画面にリダイレクトされればOK

## トラブルシューティング

### 「Missing code parameter」エラー
→ GitHub OAuth App の Callback URL が正しく設定されているか確認

### 「OAuth Error」
→ Client ID と Client Secret が正しく設定されているか確認
