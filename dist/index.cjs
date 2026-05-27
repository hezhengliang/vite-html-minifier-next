Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
let html_minifier_next = require("html-minifier-next");
//#region src/index.ts
function matchFilter(path, filter) {
	if (!filter) return false;
	return (Array.isArray(filter) ? filter : [filter]).some((f) => {
		if (typeof f === "string") return path === f || path.endsWith(f);
		return f.test(path);
	});
}
/**
* @param options [html-minifier-next options](https://github.com/j9t/html-minifier-next)
*
* @default
*/
function ViteHtmlMinifyNextPlugin(options) {
	const { include, exclude, ...minifierOptions } = options ?? {};
	return {
		name: "vite-html-minifier-next",
		apply: "build",
		transformIndexHtml: {
			order: "post",
			handler(html, ctx) {
				const path = ctx.path;
				if (include && !matchFilter(path, include)) return html;
				if (exclude && matchFilter(path, exclude)) return html;
				return (0, html_minifier_next.minify)(html, {
					removeComments: true,
					collapseWhitespace: true,
					collapseBooleanAttributes: true,
					removeEmptyAttributes: true,
					minifyCSS: true,
					minifyJS: true,
					minifySVG: true,
					continueOnMinifyError: true,
					...minifierOptions
				});
			}
		}
	};
}
//#endregion
exports.ViteHtmlMinifyNextPlugin = ViteHtmlMinifyNextPlugin;
exports.default = ViteHtmlMinifyNextPlugin;
