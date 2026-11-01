# 日本橋 寿司幸 LP

静的HTML／CSS＋少量のJavaScript（ビルド不要）。`index.html` をブラウザで開けば確認できます。

```
site/
├─ index.html          日本語ページ
├─ en/index.html       英語ページ
└─ assets/
   ├─ css/style.css    共通スタイル（色は :root の変数で管理）
   ├─ js/main.js       メインビジュアルのカルーセル
   └─ images/          写真・ロゴ・ダミー地図・OGP画像
```

## 公開前に差し替える箇所（`[ ]` で囲んだ仮テキスト）

| 項目 | 日本語版 | 英語版 |
|---|---|---|
| 電話番号 | `[電話番号]`（tel: リンク）／`[03-XXXX-XXXX]`（表示） | `[PHONE]`／`+81 [3-XXXX-XXXX]` |
| 予約ページURL | `[予約ページURL]` | `[RESERVATION URL]` |
| サイトURL（canonical / OGP / hreflang） | `[サイトURL]` | `[SITE URL]` |
| 郵便番号・住所 | `〒[XXX-XXXX]`／`[東京都XX区XXXX X-XX-X]` | `[X-XX-X XXXX, XX-ku,]` ほか |
| 最寄駅・徒歩分数 | `[最寄駅・徒歩◯分：要確認]` | `[Nearest station & walking time: TBC]` |
| 「地図アプリで開く」リンク | `[Google マップURL]` | `[Google Maps URL]` |
| Uber Eats / menu | `[Uber Eats 店舗URL]`／`[menu 店舗URL]` | `[Uber Eats URL]`／`[menu URL]` |
| SNS | `[Instagram URL]`／`[X URL]` | 同左 |

※ `<head>` 内の構造化データ（JSON-LD）にも電話番号・住所の仮テキストがあります。

### Google マップの埋め込み
`.info__map` の中に埋め込み `<iframe>` を設置済みです（サイズはCSSで自動調整）。地図を変える場合は Google マップの「共有 → 地図を埋め込む」で取得した `src` に差し替えてください。

### 背景
`assets/images/washi.jpg`（和紙テクスチャ）を `body` にリピート表示しています。継ぎ目が出ないよう端をなじませて加工済みです。

## 仕様メモ
- メインビジュアル：店内・握り・店主の3枚を5秒ごとにフェード切替（ドットで選択、スマホはスワイプ可、「視差効果を減らす」設定時は自動再生なし）。間隔は `main.js` の `INTERVAL` で変更
- 読み込み時：写真がフェードイン → サブコピー → 1秒後にキャッチ1行目 → 2行目の順に文字が上から現れる（`style.css` の `hero-fade` / `hero-text-in`。秒数は各 `animation` の値で調整）
- ブレイクポイント：820px（以下はスマホ表示。メニュー非表示、画面下に電話／WEB予約の固定ボタン）
- フォント：Google Fonts（Shippori Mincho B1／Zen Kaku Gothic New／Cormorant Garamond）
- 画像は `loading="lazy"`、メインビジュアルのみ先読み
- OGP画像：`assets/images/ogp.jpg`（1200×630）
