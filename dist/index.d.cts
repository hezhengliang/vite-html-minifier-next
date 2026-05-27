import { Plugin } from "vite";
import { MinifierOptions } from "html-minifier-next";

//#region src/index.d.ts
interface Options extends MinifierOptions {
  /**
   * Files to include for minification.
   * Supports string, RegExp, or array of either.
   * Matches against the HTML file's virtual path (e.g. "/index.html").
   * When not specified, all HTML files are included.
   */
  include?: string | RegExp | Array<string | RegExp>;
  /**
   * Files to exclude from minification.
   * Supports string, RegExp, or array of either.
   * Matches against the HTML file's virtual path (e.g. "/index.html").
   */
  exclude?: string | RegExp | Array<string | RegExp>;
}
/**
 * @param options [html-minifier-next options](https://github.com/j9t/html-minifier-next)
 *
 * @default
 */
declare function ViteHtmlMinifyNextPlugin(options?: Options): Plugin;
//#endregion
export { Options, ViteHtmlMinifyNextPlugin, ViteHtmlMinifyNextPlugin as default };