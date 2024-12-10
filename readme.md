# LineMap

Source code line mapping utility

## Installation

```
npm install --save toptensoftware/line-map
```

## Usage

Create a line map

```js
let lm = new LineMap(text);
```

Convert a line position to a character offset

```js
let offset = lm.toOffset(lineNumber, columnNumber);
```

Convert a character offset to a line position

```js
let lp = lm.fromOffset(offset);
console.log(`${lp.line} ${lp.column}`);
```

You can also pass a `{ line: number, column: number }` to `toOffset`

```js
let offset = lm.toOffset(lp);
```

## Options

By default, all line and column numbers are zero based.  To specify one based
for either, pass a options object to the LineMap constructor specifying
the line and column bases.

```js
let lm = new LineMap(text, { lineBase: 1, columnBase: 1 });
```


