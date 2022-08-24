import fs from "node:fs";
import { build, PluginBuild } from "esbuild";

// Imports for bunding JS
import esbuildSvelte from "esbuild-svelte";
import sveltePreprocess from "svelte-preprocess";

// Imports for bunding CSS
import autoprefixer from "autoprefixer";
import stylePlugin from "esbuild-style-plugin";
import postcssPresetEnv from "postcss-preset-env";
import purgecss from "@fullhuman/postcss-purgecss";
import stylelint from "stylelint";

// Simple HTML bundler
const esbuildHTML = {
	name: "esbuild-html",
	setup(build: PluginBuild) {
		build.onStart(() => {
			fs.copyFile("./public/index.html", "./build/public/index.html", (err) => {
				if (err) {
					return console.error(err);
				}
				return true;
			});
		});
	}
};

const watch = process.argv[2] === "watch";

build({
	entryPoints: ["./src/main.ts"],
	bundle: true,
	tsconfig: "./src/tsconfig.json",
	minify: true,
	treeShaking: true,
	outfile: "./build/public/assets/bundle.js",
	watch: watch,
	sourcemap: true,
	platform: "browser",
	plugins: [
		stylePlugin({
			postcss: {
				plugins: [
					autoprefixer,
					postcssPresetEnv({
						stage: 1
					}),
					purgecss({
						content: [
							"./public/index.html",
							"./src/App.svelte",
							"./src/**/*.svelte"
						]
					}),
					stylelint({
						rules: {
							"color-no-invalid-hex": true
						}
					})
				]
			}
		}),
		esbuildSvelte({
			preprocess: sveltePreprocess()
		}),
		esbuildHTML
	]
}).catch(() => process.exit(1));
