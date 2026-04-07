
# TextFlow (txt.manpuc.me)

高品質で高速なテキスト変換ツールサイト。

## 概要
開発者から一般ユーザーまで使える、直感的かつ高性能なテキスト変換ツール群を提供します。
Astro + React + TypeScript で構成され、軽量かつ高速な操作性を実現しています。

## 🚀 主要機能
- **20種類以上の変換ツール** (ケース変換、多言語変換、コード整理、エンコード等)
- **AI補助提案チップ** (ブラウザ内判定による自動サジェスト)
- **コマンドパレット** (`Cmd/Ctrl + K`) によるクイックアクセス
- **キーボードショートカット全対応**
- **ダーク / ライトモード対応**
- **累計変換数カウンター**
- **日本語 / 英語完全対応 (i18n)**

## 🛠 技術スタック
- **Framework**: Astro
- **UI Architecture**: React (Interactive states)
- **Styling**: Vanilla CSS (CSS Variables)
- **Language**: TypeScript
- **Icons**: Lucide-inspired SVG components
- **Fonts**: Zen Maru Gothic / JetBrains Mono

## 📁 プロジェクト構成
- `src/components/Shell.tsx`: アプリケーションのメインロジック。
- `src/lib/conversions.ts`: テキスト変換の純粋関数群。
- `src/data/tools.ts`: ツール定義のデータ駆動管理。
- `src/i18n/`: 日英翻訳辞書。
- `src/styles/global.css`: テーマ変数とデザインシステム。

## ⌨️ キーボードショートカット
- `Cmd/Ctrl + K`: コマンドパレットを開く
- `Cmd/Ctrl + Enter`: 変換を実行
- `Cmd/Ctrl + Shift + C`: 結果をコピー
- `Alt + Shift + T`: ダーク/ライトテーマ切替
- `Alt + Shift + L`: 言語切替
- `?`: ショートカットヘルプを表示
- `Esc`: モーダルを閉じる

## 🔧 セットアップ
```bash
# 依存関係のインストール
pnpm install

# 開発サーバーの起動
pnpm dev
```

## 🏗 今後の改善点・未実装項目
- **履歴機能**: 過去の変換を数件ローカルに保存（プライバシー配慮）。
- **カスタムプリセット**: よく使う変換をセットで保存。
- **プラグイン拡張**: ユーザー独自のJS関数を変換ツールとして追加可能にする。
- **より高度なAI推定**: ブラウザ内での軽量なLLM統合。

## 優先タスク
1. **変換ツールの拡充**: 正規表現置換ツールやDiff（比較）ツールの実装。
2. **パフォーマンス計測**: Cloudflare Insights のトークン設定とイベント発火の最適化。
3. **PWA対応**: オフラインでも利用可能なように Service Worker を導入。

---
Made with ❤️ by **manpuc**