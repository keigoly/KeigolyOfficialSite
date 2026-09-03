# Keigoly Official Site — DEVELOPMENT.md

## 1. このディレクトリの役割

KEIGOLY の公式ポートフォリオサイト(official.keigoly.jp・日英・Astro 5 + React 19 + Tailwind v4・Decap CMS)。Cloudflare Pages へ main push で自動デプロイ。

## 2. 母艦連携(写し。正本は母艦の登録簿 `claw_bot/config/projects.json`)

| 項目 | 値 |
|---|---|
| slug | `keigolyofficialsite` |
| owner | 登録簿参照(非公開) |
| class | `public` |
| runtime | `none`(常駐なし。デプロイは Cloudflare Pages) |
| sync | `git`(mini `~/Developments/KeigolyOfficialSite` は `origin/main` の写し・`pull --ff-only`) |
| link(連携型) | `none` |
| Discord | `#keigoly-official-site` |
| Vault カード | `01_Projects/KeigolyOfficialSite/_Index.md` |
| data_dir(work のみ) | — |
| 母艦側アダプタ | — |

登録簿とこの表がずれたら登録簿を正とし、この表を直す。2026-09-03 に衛星として契約(S6)。

## 3. 現在の問題点

- Supabase コメント機能が死んでいる(2026-07-10 発見・未対応。母艦 memory `keigoly-jp-portal-restructure`)。

## 4. バグ修正時の手順(user CLAUDE.md 準拠・一気に直さない)

### Step 1: 調査とログ追加(見える化)
- `npm run build` / `npm run preview`・Cloudflare Pages のデプロイログ・ブラウザの Network(Supabase 等の外部呼び出し)。
- 結果を確認してから Step 2 へ。

### Step 2: 原因箇所のみ最小限の改修
- 日英は別 `.astro` ファイル(`src/pages/en/`)。片方だけ直さない。
- 結果を確認してから Step 3 へ。

### Step 3: 周辺の整合性確認と改修
- keigoly-jp(ポータル)の 301 表とデザイントークンの整合。Vault カードの更新。
- 動作確認が終わるまで旧経路は残す。

## 5. 開発の作法

- 共有ディレクトリのため **新しいブランチは必ず専用 worktree** で(`/Users/Shared/Developments/ai-context-engine/scripts/mac/new-worktree.sh <branch>` を `REPO_ROOT=<この dir>` で呼ぶ)。正本は `main`。
- 母艦のコードを import しない。連携は無し。
- mini がリーダー(org/13 D9)。Lane B(git ff-only)で mini `~/Developments/KeigolyOfficialSite` に実在させる。Mutagen には乗せない。

## 6. 関連ドキュメント

- `CLAUDE.md`(コマンド・アーキテクチャ・i18n)・`docs/`・`README.md`
- 母艦: `ai-context-engine/org/13-satellite-projects.md`・Vault カード `01_Projects/KeigolyOfficialSite/_Index.md`・決定事項 `Decisions.md`
