# ポモドーロタイマーWebアプリケーション アーキテクチャ案

## 概要
Flask（Python）＋HTML/CSS/JavaScriptで実装するポモドーロタイマーWebアプリの設計方針をまとめます。

---

## 1. 構成概要
- **バックエンド**: Flask（Python）
  - タイマー・進捗管理ロジック
  - API（進捗データ取得・保存）
  - ルーティング（トップページ、APIエンドポイント）
- **フロントエンド**: HTML/CSS/JavaScript
  - タイマーUI（円グラフ、残り時間表示、開始・リセットボタン）
  - 進捗表示（完了数、集中時間）
  - APIとの通信（fetch/Ajax）

---

## 2. ディレクトリ構成例
```
/ (プロジェクトルート)
├── app.py                # Flaskアプリ本体
├── templates/
│   └── index.html        # メイン画面
├── static/
│   ├── css/
│   │   └── style.css     # UIスタイル
│   └── js/
│       ├── timer.js      # タイマー・進捗ロジック
│       └── api.js        # API通信抽象化
├── services/
│   ├── timer_service.py  # タイマーロジック
│   └── progress_service.py # 進捗管理ロジック
├── data/
│   └── progress.json     # 進捗データ（DBでも可）
├── tests/
│   ├── test_timer_service.py
│   └── test_progress_service.py
└── README.md
```

---

## 3. ユニットテストのしやすさへの配慮
- バックエンドのロジック（タイマー・進捗管理）はFlaskルートから分離し、`services/`配下にクラス・関数として実装。
- データ保存先（JSON/DB）は依存性注入（DI）で切り替え可能にし、テスト時はモックや一時ファイルを利用。
- APIはRESTfulに設計し、入出力を明確化。
- `tests/`ディレクトリでpytest等による自動テストを実施。
- フロントエンドのロジックも関数化し、Jest等で単体テスト可能に。

---

## 4. 技術選定
- **Flask**: 軽量Webフレームワーク
- **HTML5/CSS3**: UI構築
- **JavaScript**: タイマー・API通信
- **Chart.jsやSVG**: 円グラフ描画
- **JSON/SQLite**: 進捗データ保存
- **pytest/Jest**: ユニットテスト

---

## 5. 実装の流れ
1. Flaskで基本ルーティングとAPIを作成
2. HTML/CSSでUIモックを再現
3. JSでタイマー・進捗ロジック実装
4. API連携（進捗保存・取得）
5. テスト・デザイン調整

---

## 6. その他
- CI/CD導入（GitHub Actions等）でテスト自動化
- ドキュメント整備（README.mdやdocs/）

---

このアーキテクチャにより、拡張性・保守性・テスト容易性を高めつつ、添付UIモックの再現が可能です。
