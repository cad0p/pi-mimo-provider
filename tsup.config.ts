import { defineConfig } from "tsup";

export default defineConfig({
	entry: {
		index: "src/index.ts",
		extension: "index.ts",
	},
	format: ["esm"],
	dts: true,
	clean: true,
	sourcemap: true,
	target: "es2022",
});
