# keigoly.jp サイト再編のまとめ（2026-07-10）

KEIGOLY のWebサイトをFromSoftware公式サイト風のポータル構成へ再編した記録。
コード変更は各リポジトリの `main` に反映済み・本番稼働中（Cloudflare は `main` から自動デプロイ）。本書はその集約記録。

## 1. ドメイン構成（Before → After）

| | Before | After |
| --- | --- | --- |
| `keigoly.jp`（apex） | ポートフォリオ本体 | **ポータル**（OFFICIAL / CLAW の二択ゲート） |
| `official.keigoly.jp` | （無し） | **ポートフォリオ本体**（旧 keigoly.jp を移設） |
| `claw.keigoly.jp` | Clawくんと歩む | 変更なし |

- apex はポータル用 Worker `keigoly-jp`（新規リポジトリ [keigoly/keigoly-jp](https://github.com/keigoly/keigoly-jp)）のカスタムドメイン。
- ポータルの Worker は旧ポートフォリオのパス（`/about` `/works` `/blog` `/contact` `/privacy` `/tokushoho` `/en` `/admin` `/images`）を `official.keigoly.jp` へ **301 転送**し、SEO・被リンクを温存。
- 本サイト（KeigolyOfficialSite）は Cloudflare Pages プロジェクト `keigolyofficialsite`。カスタムドメインを `official.keigoly.jp` に変更。
- Search Console はドメインプロパティ `keigoly.jp` 1本で3サイトを管理。official / claw のサイトマップを登録済み。

## 2. ポータル keigoly.jp（別リポジトリ keigoly/keigoly-jp）

- Astro 5 + Tailwind 4（`kg-` デザイントークンは本サイトと共通）、Cloudflare Worker + static assets。
- FromSoftware 公式サイト風の**斜めスライスゲート**: 全画面を対角シームで OFFICIAL / CLAW に分割。通常時は減光・脱色し、ホバー/フォーカスしたスライスだけ発色して拡がる。
- OFFICIAL スライス＝モノクロポートレート。CLAW スライス＝claw.keigoly.jp の hero-dusk（薄暮＋珊瑚色グロー）に keigoly と Clawくんの歩き姿。
- レスポンシブ（モバイルは縦積み）、`prefers-reduced-motion` 対応、タッチ環境は常時発色。

## 3. 本サイト（official.keigoly.jp）の変更

| 変更 | 内容 | commit |
| --- | --- | --- |
| サイトURL移行 | `astro.config.mjs` の `site` と特商法ページ表記を `official.keigoly.jp` へ | `6470cd4` |
| サイトマップ | `@astrojs/sitemap` 導入 + `robots.txt`（Search Console 準備） | `237a044` |
| BLOG 撤去 | ナビ/ホーム/About タイムライン/`/blog` ページを撤去。記事・CMS はリポジトリに温存 | `dfdb859` |
| 404 ページ | Pages は 404.html 無しだと未定義URLをホーム(200)で返す挙動 → `src/pages/404.astro` 新設で正しく 404 に | `2f4aaf9` |
| APPS 更新 | PICKUP（ウラヨミ！）を撤去、PUBLISHED EXTENSIONS に「ネトフリで実況」を追加 | `05b0c58` |
| フッター | ポータルへ戻る「← KEIGOLY.JP」リンクを追加 | `1e9c848` |

### BLOG 復活の手順

`dfdb859` を revert すれば、ナビ・ホームのBLOGセクション・Aboutのタイムライン・`/blog`ページが丸ごと戻る。
記事4本（`src/content/blog/*.md`）・コレクション定義・Decap CMS（`/admin`）はリポジトリに温存済み。
復活時は「ドラフト作成フロー」を Decap CMS 手動入力から改善する想定。

## 4. 既知の別件（本再編とは無関係・未対応）

- **コメント機能**: Supabase プロジェクト（`merhmnwbhgzdayxnokza.supabase.co`）が消滅（NXDOMAIN）。移行前から停止しており、復旧 or Worker+KV 置換が要検討。
- **Decap CMS**: backend repo 設定が `keigoly/MyBlog` を指す（リネーム残骸の可能性）。

## 5. 運用メモ

- 本サイト（Pages）は `main` push で自動ビルド・デプロイ。
- ポータル（Worker）は `main` push で GitHub Actions がデプロイ（要 `CLOUDFLARE_API_TOKEN` シークレット）。手動は `npx wrangler deploy`。
- 新規サブドメイン作成直後はネガティブDNSキャッシュに注意（`curl --resolve` で迂回検証、または DNS フラッシュ）。
