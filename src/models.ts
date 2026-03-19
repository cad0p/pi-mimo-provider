/**
 * Xiaomi MiMo model definitions.
 *
 * All MiMo models use the OpenAI-compatible chat completions API.
 * See: https://api.xiaomimimo.com for API documentation.
 */

export interface MiMoModelConfig {
	/** Model ID as used in API requests (e.g., "xiaomi/mimo-v2-pro"). */
	id: string;
	/** Human-readable display name. */
	name: string;
	/** Whether the model supports extended thinking / reasoning. */
	reasoning: boolean;
	/** Supported input content types. */
	input: ("text" | "image")[];
	/** Cost per million tokens in USD (0 = free / pricing unknown). */
	cost: {
		input: number;
		output: number;
		cacheRead: number;
		cacheWrite: number;
	};
	/** Maximum context window size in tokens. */
	contextWindow: number;
	/** Maximum output tokens per request. */
	maxTokens: number;
}

/**
 * MiMo V2 Flash — fast, cost-effective reasoning model.
 * 256k context. Good for quick tasks and prototyping.
 */
export const MIMO_V2_FLASH: MiMoModelConfig = {
	id: "xiaomi/mimo-v2-flash",
	name: "MiMo-V2-Flash",
	reasoning: true,
	input: ["text"],
	cost: { input: 0.1, output: 0.3, cacheRead: 0.01, cacheWrite: 0 },
	contextWindow: 256_000,
	maxTokens: 8192,
};

/**
 * MiMo V2 Pro — flagship reasoning model.
 * 1M context. Best quality, higher cost.
 */
export const MIMO_V2_PRO: MiMoModelConfig = {
	id: "xiaomi/mimo-v2-pro",
	name: "MiMo-V2-Pro",
	reasoning: true,
	input: ["text"],
	cost: { input: 1.0, output: 3.0, cacheRead: 0.2, cacheWrite: 0 },
	contextWindow: 1_000_000,
	maxTokens: 8192,
};

/**
 * MiMo V2 Omni — multimodal model supporting text + images.
 * 1M context. Pricing not yet published.
 */
export const MIMO_V2_OMNI: MiMoModelConfig = {
	id: "xiaomi/mimo-v2-omni",
	name: "MiMo-V2-Omni",
	reasoning: true,
	input: ["text", "image"],
	cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
	contextWindow: 1_000_000,
	maxTokens: 8192,
};

/**
 * MiMo 7B RL — compact reasoning model.
 * 32k context. Good for edge / local deployment.
 */
export const MIMO_7B_RL: MiMoModelConfig = {
	id: "xiaomi/mimo-7b-rl",
	name: "MiMo-7B-RL",
	reasoning: true,
	input: ["text"],
	cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
	contextWindow: 32_768,
	maxTokens: 8192,
};

/** All available MiMo chat models. */
export const MIMO_MODELS: MiMoModelConfig[] = [
	MIMO_V2_FLASH,
	MIMO_V2_PRO,
	MIMO_V2_OMNI,
	MIMO_7B_RL,
];

/** MiMo API base URL. */
export const MIMO_BASE_URL = "https://api.xiaomimimo.com/v1";

/** Default environment variable name for the API key. */
export const MIMO_API_KEY_ENV = "XIAOMI_MIMO_API_KEY";
