import { defineConfig } from "tsup";

export default defineConfig({
	entry: {
		index: "src/index.ts",
		extension: "src/extension.ts",
	},
	format: ["esm"],
	dts: true,
	clean: true,
	sourcemap: true,
	target: "es2022",
});
