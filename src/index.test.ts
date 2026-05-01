import { describe, expect, test } from "bun:test";
import {
	createMiMoProvider,
	MIMO_MODELS,
	MIMO_V2_FLASH,
	MIMO_V2_PRO,
	MIMO_V2_OMNI,
	MIMO_7B_RL,
	MIMO_BASE_URL,
} from "./index.js";

describe("MiMo models", () => {
	test("all models have required fields", () => {
		for (const model of MIMO_MODELS) {
			expect(model.id).toBeTruthy();
			expect(model.name).toBeTruthy();
			expect(typeof model.reasoning).toBe("boolean");
			expect(model.input.length).toBeGreaterThan(0);
			expect(model.contextWindow).toBeGreaterThan(0);
			expect(model.maxTokens).toBeGreaterThan(0);
			expect(model.cost).toBeDefined();
			expect(typeof model.cost.input).toBe("number");
			expect(typeof model.cost.output).toBe("number");
			expect(typeof model.cost.cacheRead).toBe("number");
			expect(typeof model.cost.cacheWrite).toBe("number");
		}
	});

	test("model IDs are unique", () => {
		const ids = MIMO_MODELS.map((m) => m.id);
		expect(new Set(ids).size).toBe(ids.length);
	});

	test("all model IDs use xiaomi/ prefix", () => {
		for (const model of MIMO_MODELS) {
			expect(model.id).toMatch(/^xiaomi\//);
		}
	});

	test("all models have non-negative costs", () => {
		for (const model of MIMO_MODELS) {
			expect(model.cost.input).toBeGreaterThanOrEqual(0);
			expect(model.cost.output).toBeGreaterThanOrEqual(0);
			expect(model.cost.cacheRead).toBeGreaterThanOrEqual(0);
			expect(model.cost.cacheWrite).toBeGreaterThanOrEqual(0);
		}
	});

	test("MIMO_V2_FLASH has expected config", () => {
		expect(MIMO_V2_FLASH.id).toBe("xiaomi/mimo-v2-flash");
		expect(MIMO_V2_FLASH.contextWindow).toBe(256_000);
		expect(MIMO_V2_FLASH.reasoning).toBe(true);
		expect(MIMO_V2_FLASH.input).toEqual(["text"]);
		expect(MIMO_V2_FLASH.cost.input).toBe(0.1);
		expect(MIMO_V2_FLASH.cost.output).toBe(0.3);
	});

	test("MIMO_V2_PRO has expected config", () => {
		expect(MIMO_V2_PRO.id).toBe("xiaomi/mimo-v2-pro");
		expect(MIMO_V2_PRO.contextWindow).toBe(1_000_000);
		expect(MIMO_V2_PRO.reasoning).toBe(true);
		expect(MIMO_V2_PRO.cost.input).toBe(1.0);
		expect(MIMO_V2_PRO.cost.output).toBe(3.0);
	});

	test("MIMO_V2_OMNI supports images", () => {
		expect(MIMO_V2_OMNI.input).toContain("image");
		expect(MIMO_V2_OMNI.input).toContain("text");
		expect(MIMO_V2_OMNI.contextWindow).toBe(256_000);
	});

	test("MIMO_7B_RL has compact context", () => {
		expect(MIMO_7B_RL.contextWindow).toBe(32_768);
		expect(MIMO_7B_RL.cost.input).toBe(0); // Free
	});

	test("constants are correct", () => {
		expect(MIMO_BASE_URL).toBe("https://api.xiaomimimo.com/v1");
	});
});

describe("createMiMoProvider", () => {
	test("creates valid provider config with defaults", () => {
		const config = createMiMoProvider();

		expect(config.api).toBe("openai-completions");
		expect(config.baseUrl).toBe("https://api.xiaomimimo.com/v1");
		expect(config.apiKey).toBe("XIAOMI_API_KEY");
		expect(config.models).toBeDefined();
		expect(config.models!.length).toBe(MIMO_MODELS.length);
	});

	test("respects custom apiKey", () => {
		const config = createMiMoProvider({ apiKey: "sk-test-123" });
		expect(config.apiKey).toBe("sk-test-123");
	});

	test("respects custom baseUrl", () => {
		const config = createMiMoProvider({ baseUrl: "https://custom.api.com/v1" });
		expect(config.baseUrl).toBe("https://custom.api.com/v1");
	});

	test("respects custom headers", () => {
		const config = createMiMoProvider({
			headers: { "X-Custom": "value" },
		});
		expect(config.headers).toEqual({ "X-Custom": "value" });
	});

	test("models have contextWindow (not maxContext)", () => {
		// This was the critical bug in the original: maxContext instead of contextWindow
		const config = createMiMoProvider();
		for (const model of config.models!) {
			expect(model.contextWindow).toBeGreaterThan(0);
			// @ts-expect-check: ensure maxContext is NOT in the model config
			expect((model as any).maxContext).toBeUndefined();
		}
	});

	test("model configs match source models", () => {
		const config = createMiMoProvider();
		for (let i = 0; i < MIMO_MODELS.length; i++) {
			const src = MIMO_MODELS[i];
			const cfg = config.models![i];
			expect(cfg.id).toBe(src.id);
			expect(cfg.name).toBe(src.name);
			expect(cfg.reasoning).toBe(src.reasoning);
			expect(cfg.input).toEqual(src.input);
			expect(cfg.contextWindow).toBe(src.contextWindow);
			expect(cfg.maxTokens).toBe(src.maxTokens);
			expect(cfg.cost).toEqual(src.cost);
		}
	});

	test("no TTS model included", () => {
		// TTS models can't work with openai-completions API
		const config = createMiMoProvider();
		const hasTts = config.models!.some((m) => m.id.includes("tts"));
		expect(hasTts).toBe(false);
	});

	test("default env var name in apiKey", () => {
		const config = createMiMoProvider();
		// Should be a bare env var name for pi's resolveConfigValue
		expect(config.apiKey).toBe("XIAOMI_API_KEY");
	});
});
