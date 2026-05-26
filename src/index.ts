import type { Plugin } from 'vite'
import type { MinifierOptions } from 'html-minifier-next'
import { minify } from 'html-minifier-next'

export interface Options extends MinifierOptions {
  /**
   * Files to include for minification.
   * Supports string, RegExp, or array of either.
   * Matches against the HTML file's virtual path (e.g. "/index.html").
   * When not specified, all HTML files are included.
   */
  include?: string | RegExp | Array<string | RegExp>
  /**
   * Files to exclude from minification.
   * Supports string, RegExp, or array of either.
   * Matches against the HTML file's virtual path (e.g. "/index.html").
   */
  exclude?: string | RegExp | Array<string | RegExp>
}

function matchFilter(
  path: string,
  filter?: string | RegExp | Array<string | RegExp>
): boolean {
  if (!filter) return false
  const filters = Array.isArray(filter) ? filter : [filter]
  return filters.some((f) => {
    if (typeof f === 'string') {
      return path === f || path.endsWith(f)
    }
    return f.test(path)
  })
}

/**
 * @param options [html-minifier-next options](https://github.com/j9t/html-minifier-next)
 *
 * @default
 */
export function ViteHtmlMinifyNextPlugin(options?: Options): Plugin {
  const { include, exclude, ...minifierOptions } = options ?? {}

  return {
    name: 'vite-html-minifier-next',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        const path = ctx.path

        if (include && !matchFilter(path, include)) {
          return html
        }
        if (exclude && matchFilter(path, exclude)) {
          return html
        }

        return minify(html, {
          removeComments: true,
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeEmptyAttributes: true,
          minifyCSS: true,
          minifyJS: true,
          minifySVG: true,
          continueOnMinifyError: true,
          ...minifierOptions,
        })
      },
    },
  }
}

export default ViteHtmlMinifyNextPlugin
