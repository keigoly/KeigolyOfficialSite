# KEIGOLY オフィシャルサイト

KEIGOLYのオフィシャルWebサイトです。

## 🌐 サイト概要

デジタル体験を創造するクリエイター「KEIGOLY」のポートフォリオサイトです。

### 主な機能

- **ホーム**: 画像スライドショーによるインパクトのあるトップページ
- **About**: プロフィール、活動概要、タイムライン（ブログ連携）
- **Works**: 開発プロジェクトの紹介
- **Blog**: 技術記事やお知らせの発信
- **Contact**: お問い合わせフォーム

### v1.0.3 新機能

- **多言語対応（日英切り替え）**: JP/ENボタンで言語切り替え可能
- **SNS共有ボタン**: X、Instagram、URLコピー機能
- **コメント機能**: Supabase連携の独自コメントシステム
- **Decap CMS**: ブログ記事の管理画面

## 🛠️ 技術スタック

- **フレームワーク**: Astro
- **スタイリング**: Tailwind CSS
- **アニメーション**: Framer Motion
- **言語**: TypeScript, React
- **データベース**: Supabase (コメント機能)
- **CMS**: Decap CMS

## 🚀 開発コマンド

プロジェクトルートで以下のコマンドを実行できます：

| コマンド               | 説明                                    |
| :--------------------- | :-------------------------------------- |
| `npm install`          | 依存関係をインストール                  |
| `npm run dev`          | 開発サーバーを起動 (`localhost:4321`)   |
| `npm run build`        | 本番環境用にビルド (`./dist/`)          |
| `npm run preview`      | ビルド結果をローカルでプレビュー        |
| `npm run cms`          | CMSプロキシサーバーを起動               |

## 📁 プロジェクト構成

```text
/
├── public/           # 静的ファイル（画像、フォントなど）
│   └── admin/        # Decap CMS設定
├── src/
│   ├── components/   # UIコンポーネント
│   ├── content/      # ブログ・Works記事（MDX）
│   ├── layouts/      # ページレイアウト
│   ├── lib/          # ユーティリティ（i18n, Supabase）
│   ├── pages/        # ページファイル
│   │   └── en/       # 英語版ページ
│   └── styles/       # グローバルスタイル
└── package.json
```

## 📝 ライセンス

© 2026 KEIGOLY. All Rights Reserved.
