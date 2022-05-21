# Switch Case in JavaScript

！まだパッケージをデプロイしていません。

## これは何？

JavaScript の `Switch` や `if`~`else if` を利用すると、[循環的複雑度](https://ja.wikipedia.org/wiki/%E5%BE%AA%E7%92%B0%E7%9A%84%E8%A4%87%E9%9B%91%E5%BA%A6)が増大します。

分岐が単純で少ない場合は問題ないのですが。そうでなくなると、メンテナンス性に大きな影響があります。また、`switch`では`break`のつけ忘れが問題になることが多いです。

これを解決するには、ポリモーフィズムを利用した、条件テーブルを利用することがあります。このパッケージはそれを支援するためのものです。

## インストール

npm パッケージとして提供されます。

```
npm install @ebi311/switch-case
# or
yarn add @ebi311/switch-case
# or
pnpm add @ebi311/switch-case
```

## 使用方法

TypeScript での利用を推奨しますが、もちろん、JavaScript でも使えます。

`new Switch()` でインスタンスを作成し、`case` で、条件と条件に一致するときに返す値、または実行する関数（ここでは、これらを対象オブジェクトと呼びます）を指定します。別の条件と値または関数をメソッドチェーンで、`case`を続けて書くことができます。

`reduce` を呼び出すと、はじめに条件に一致した値が返る、または関数が実行されます。

条件には、値と関数を指定することができます。値を指定した場合は、`reduce`で指定した値と厳密に同一（`===`での比較）したものが選択されます。関数の場合は、関数を実行して `true` を返したものが選択されます。

対象オブジェクトで関数を指定した場合は、戻り値を返すこともできます。

例

```ts
const sc = new Switch<number, string>()
  .case(0, 'white')
  .case(1, () => 'red')
  .case(2, 3, (value) => `[${value}]`)
  .case(value => (value % 2 === 0), () => console.log('even'))
  .default('other');

sc.reduce(0); // 'white'
sc.reduce(1); // 'red'
sc.reduce(2); // '[2]'
sc.reduce(3); // '[3]'
sc.reduce(4); // 'even'
sc.reduce(5); // 'other' out of console
```

## API

### constructor

```
new Switch<T, P>()
```

ジェネリック型

- T: `reduce`に渡す値、または各条件関数、対象オブエクトの値および関数の引数の値の型を指定します。
- P: 値オブジェクトおよび値オブジェクトの関数が返す型を指定します。

### case

```
.case(condition, condition, ... , target);
```

条件と、条件に一致したときに返す値、または実行する関数を指定します。

引数

- `condition`: 条件を指定します。`T | (value:T) => boolean` が指定できます。関数の場合、引数の `value` は `reduce` で指定したときの引数が入ります。戻り値は、条件をみたすときに`true` とします。条件は複数指定できます。
- `target`: 不定数引数の最後とします。いずれかの `condition` の条件に一致したときに返す値 もしくは 関数を指定します。`P | ((value: T) => P | void)` 型が指定できます。

### default

```
.default(target)
```

いずれの条件にもあてはまらなかった場合に返す値または関数を指定します。

### reduce

```
.reduce(value)
```

値を投入して、条件にあった値オブジェクトを返したり、関数を実行します。

引数

- `value`: 条件となる値を指定します。`T` 型とします。値オブジェクトに値を指定した場合や関数で引数を返す場合は、その値を返します。
