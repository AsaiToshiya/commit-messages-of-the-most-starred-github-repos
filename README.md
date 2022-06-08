# commit-messages-of-the-most-starred-github-repos

## セットアップ

```bash
git clone https://github.com/AsaiToshiya/commit-messages-of-the-most-starred-github-repos.git
cd commit-messages-of-the-most-starred-github-repos
npm install
```

### GitHub トークンを生成

  1. https://github.com/settings/tokens を開く
  2. 「Generate new token」をクリックする
  3. 「Note」に「commit-messages-of-the-most-starred-github-repos」を入力する
  4. 「Generate token」をクリックする


## 実行

```bash
node index.js (-t|--token) <token>
```

### 例

```bash
node index.js -t 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 > commit-messages.txt
```


## ライセンス

    MIT License
    
    Copyright (c) 2022 Asai Toshiya
    
    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:
    
    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.
    
    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.