import { build } from "esbuild";

// Imports for bunding JS
import esbuildSvelte from "esbuild-svelte";
import sveltePreprocess from "svelte-preprocess";

// Imports for bunding HTML & CSS
import esbuildHTML from "./plugins/esbuild-html.js";
import autoprefixer from "autoprefixer";
import stylePlugin from "esbuild-style-plugin";
import postcssPresetEnv from "postcss-preset-env";
import purgecss from "@fullhuman/postcss-purgecss";

const watch = process.argv[2] === "watch";

build({
	entryPoints: ["./src/main.ts"],
	bundle: true,
	tsconfig: "./tsconfig.json",
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
						content: ["./public/index.html", "./src/App.svelte", "./src/**/*.svelte"]
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
