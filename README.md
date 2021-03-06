# リネアワークス中途採用コーディングテスト

この度は、株式会社リネアワークスのフロントエンドエンジニア募集にご応募いただき、誠にありがとうございます。

## はじめに

弊社が通常のWEBサイトを制作する際に、使用しているフロントエンドの開発環境に近い構成の環境を使用して、実際にLPのコーディングを行っていただきます。  
本テストは、現状のHTML, CSS, JavaScriptの基本的なスキルと、弊社に入社いただけた際、スムーズに業務に合流できるかを確認させていただくためのものとなります。

## 課題内容

- 日本CLT技術研究所WEBサイト内、CLT CROSS LAMINATED TIMBER(<https://nc-labo.jp/lp/clt/>) ページを再現してください。※XDファイルの内容で実装。バックエンドの実装は不要です。DL先は下記`デザインファイルDL URL`を参照ください。
- 最終提出物は、GitHubのリポジトリにpushしていただいたソースコードと、テストサイトの表示となります。
- 現状公開されているサイトをご覧いただいても構いません。
- レスポンシブデザインとし、ブレークポイント768px。※768px以上がPCデザイン表示、それ未満がSPデザイン表示で実装してください。
- 使用するフォントは、お送りさせていただいたデザインファイルを確認の上、適切なWEBフォントをGoogle Fontsから使用してください。
- 実装に使用するフレームワーク、ライブラリやプラグインの選定は自由です。
- 課題に関する質問は、本リポジトリのissue(<https://github.com/lineaworks/recruit_trial/issues>)にて`question`のラベルを付けてトピックの作成をお願いいたします。

### 使用言語

用意させていただいたフロントエンドの開発言語・プリプロセッサは、弊社で通常使用している下記言語となります

- EJS (for HTML)
- SCSS (for stylesheet)
- ESNext (for javascript)

他の言語を使用される場合は、必要モジュールのインストール、各種ビルドスクリプトを書き換えをお願いいたします。

### デザインファイルDL URL

<https://www.dropbox.com/t/gXlvoB4PaeNbwQHq>  
※パスワードは別途で送付いたします。

### テストサイトURL

別途送付させていただくテストサイトのURLを参照してください。

### テストサイトFTP

別途送付させていただくFTP情報を参照してください。

## HOW TO START

### 1.リポジトリのFork

本リポジトリ(<https://github.com/lineaworks/recruit_trial>)をForkし、ソースコードを取得してください。  

※GitHubのアカウントが必要になります。お持ちでない方は作成してください。  
※お手数ですが、Fork後のリポジトリのURLを弊社までご連絡ください。

手順は、[forkしたリポジトリを更新する方法](https://qiita.com/taoki11111/items/6582dafeb971f66d1f79)の手順1、2をご参照ください。  
※本リポジトリへのpush、プルリクエストは受け付けておりませんので、upstream登録は不要です。

### 2.ローカル環境用の証明書発行

ローカル環境用の自己証明書を発行してください。

``` bash
cd certs
brew install mkcert # mkcertが未インストールの場合
mkcert -install # mkcertが未インストールの場合
mkcert -cert-file ./localhost.crt.pem -key-file ./localhost.key.pem localhost
```

### 3.npmパッケージのインストール

プロジェクトルートにて、
下記コマンドを実行して、必要なパッケージ群をインストールしてください。

```npm
npm i
```

### 4.フロントエンドビルド環境の起動

```npm
npm start
```

### 5.ブラウザで表示を確認

browser-syncが起動して、規定のブラウザが起動し、ページが表示されます。

## フロントエンドビルド環境について

### 各種コマンド

#### 開発開始用初期ビルド&ファイル監視&スタート

```npm
npm start
```

#### ファイル監視スタート

```npm
npm run start
```

#### プロダクションビルド

```npm
npm run build
```

#### ESLint

```npm
npm run lint-scripts
```

#### stylelint

```npm
npm run lint-styles
```

#### gulpタスク

個別のgulpタスクに関しては、`gulp/tasks`ディレクトリ内の各ファイルを参照ください。

### EJS

- テンプレートエンジンとして、EJSを使用しています。
- src/ejs/pages配下にファイルを公開ディレクトリ名と合わせて設置してください。

### SCSS

- サイト全体のスタイルはstyles.scssで定義しています。
- `src/scss`ディレクトリ内はご自由にご使用いただいて問題ありません。

### JavaScript

- `.babelrc`, `webpack.config.js`にビルドの設定を記載しています。
- エントリーファイルは、`src/index.js`となっています。追加が必要な場合は、`webpack.config.js`内の`entry`にファイルを追加して下さい。
- `src/js`ディレクトリ内はご自由にご使用いただいて問題ありません。

### Images

- 画像ファイルは`src/img`ディレクトリ内に配置してください。
- gulpを使用して圧縮をかけておりますので、圧縮の必要はございません。
- 監視対象にはなっておりますが、スタックする場合がございます。その際は、`gulp image-min`で手動でタスクを実行してください。
