import fs from "node:fs";
// import type { PluginBuild } from "esbuild";

const esbuildHTML = {
	name: "esbuild-html",
	setup(build) {
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

export default esbuildHTML;
