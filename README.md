# react-zh-stroker

A [stroke drawing](//g0v.github.io/react-zh-stroker/) React component for [zh-stroke-data][1].

## Quick Start

Install with following commands.

```bash
npm install react-zh-stroker
# or
yarn add react-zh-stroker
```

`react-zh-stroker` is designed to draw JSON stroke data from [常用國字標準字體筆順學習網][2],
which are processed and stored in [`zh-stroke-data`][1].

For example, if you want to draw 萌 (`json/840c.json`) in your app:

```javascript
import { data, Word } from 'react-zh-stroker';
import word from './json/840c.json';

const moe = data.computeLength(word);

function App() {
  return (
    <Word data={moe} progress={1.0} />
  );
}
```

By changing the `progress` property dynamically, you can animate the word.

Check [this example][3] for more information.

## APIs

### `Word` component

`Word` draws a JSON stroke data.

#### `onEnter` event

`onEnter` is triggered when a word is starting to draw.

#### `onLeave` event

`onLeave` is triggered when a word is finishing to draw.

#### `onEnterStroke` event

`onEnterStroke` is triggered when a stroke in a word is starting to draw.

#### `onLeaveStroke` event

`onLeaveStroke` is triggered when a stroke in a word is finishing to draw.

### `Stroke` component

`Stroke` draws a stroke in a JSON stroke data.

### `Track` component

`Track` draws a path.

### `data.fromXML`

`data.fromXML` is a helper to read a stroke data in XML format.

### `data.packedFromPath`

`data.packedFromPath` is a helper to compute the index of a word in a packed binary stroke data.

### `data.fromBinary`

`data.fromBinary` is a helper to read a stroke data in binary format.

### `data.fromScanline`

`data.fromScanline` is a helper to read a stroke data in scanline format.

### `data.computeLength`

`data.computeLength` is a helper to compute the length of a word.

## Development

```bash
yarn install
yarn start
```

## License

<p xmlns:dct="http://purl.org/dc/terms/">
  <a rel="license"
     href="http://creativecommons.org/publicdomain/zero/1.0/">
    <img src="http://i.creativecommons.org/p/zero/1.0/88x31.png" style="border-style: none;" alt="CC0" />
  </a>
  <br />
  To the extent possible under law,
  <a rel="dct:publisher"
     href="//github.com/g0v/react-zh-stroker">
    <span property="dct:title">caasi Huang</span></a>
  has waived all copyright and related or neighboring rights to
  <span property="dct:title">react-zh-stroker</span>.
</p>

[1]: https://github.com/g0v/zh-stroke-data
[2]: http://stroke-order.learningweb.moe.edu.tw/
[3]: https://github.com/g0v/react-zh-stroker/blob/gh-pages/examples/standalone/src/main.js
