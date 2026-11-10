# demotest01

[HOTEL PLANISPHERE](https://hotel-example-site.takeyaqa.dev/ja/index.html) を対象にした手動テストケースと、その自動化（Playwright）のサンプルです。

## 対象サイト

- https://hotel-example-site.takeyaqa.dev/ja/index.html
- テスト自動化の学習用に公開されているホテル予約デモサイトです。

## 手動テストケース

### TC1: 正しい認証情報でログインできる

| 項目 | 内容 |
| --- | --- |
| 前提条件 | ログインページ（`/ja/login.html`）にアクセスしている |
| 手順 | 1. メールアドレスに `ichiro@example.com` を入力する<br>2. パスワードに `password` を入力する<br>3. ログインボタンをクリックする |
| 期待結果 | マイページ（`/ja/mypage.html`）に遷移し、メールアドレス「ichiro@example.com」と氏名「山田一郎」が表示される |

### TC2: 誤った認証情報でログインするとエラーが表示される

| 項目 | 内容 |
| --- | --- |
| 前提条件 | ログインページ（`/ja/login.html`）にアクセスしている |
| 手順 | 1. メールアドレスに `wrong@example.com` を入力する<br>2. パスワードに `wrongpass` を入力する<br>3. ログインボタンをクリックする |
| 期待結果 | ログインに失敗してログインページに留まり、「メールアドレスまたはパスワードが違います。」というエラーメッセージが表示される |

### TC3: 宿泊予約ページにアクセスするとおすすめプランが表示される

| 項目 | 内容 |
| --- | --- |
| 前提条件 | 未ログイン状態である |
| 手順 | 1. 「宿泊予約」ページ（`/ja/plans.html`）にアクセスする |
| 期待結果 | 「⭐おすすめプラン⭐」の見出しと「お得な特典付きプラン」のプランカードが表示される |

## 自動化（Playwright）

上記の手動テストケースを `tests/hotel.spec.ts` に Playwright で自動化しています。

### セットアップ

```bash
npm install
npx playwright install --with-deps chromium
```

### 実行

```bash
npm test
```

### レポート

```bash
npx playwright show-report
```

## CI での実行

`.github/workflows/playwright.yml` に GitHub Actions 用のワークフローを用意しています。内部では `npm ci` → `npx playwright install --with-deps` → `npm test` という、どの CI サービスでも使える標準的な npm コマンドのみを呼び出しているため、GitHub Actions 以外（GitLab CI、CircleCI、Jenkins など）でも同じコマンドをそのまま移植して利用できます。
