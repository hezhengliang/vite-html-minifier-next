# vite-html-minifier-next

A Vite plugin for minifying HTML in production builds.

## Usage

```js
// vite.config.ts
import { defineConfig } from 'vite'
import { ViteHtmlMinifyNextPlugin } from 'vite-html-minifier-next'

export default defineConfig({
  plugins: [
    ViteHtmlMinifyNextPlugin(),
  ],
})
```

## Options

### `include` / `exclude`

Limit which HTML files are minified. By default, all HTML entry files are processed.

```js
ViteHtmlMinifyNextPlugin({
  // Only minify index.html
  include: '/index.html',
})
```

```js
ViteHtmlMinifyNextPlugin({
  // Minify all HTML files except admin.html
  exclude: '/other.html',
})
```

Supports `string`, `RegExp`, or an array of either:

```js
ViteHtmlMinifyNextPlugin({
  include: ['/index.html', /^\/pages\//],
})
```

### Recommended Minifier Options

For more aggressive minification, pass [html-minifier-next options](https://github.com/j9t/html-minifier-next):

```js
ViteHtmlMinifyNextPlugin({
  removeAttributeQuotes: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  removeOptionalTags: true,
  useShortDoctype: true,
  decodeEntities: true,
  sortAttributes: true,
  sortClassNames: true,
})
```
