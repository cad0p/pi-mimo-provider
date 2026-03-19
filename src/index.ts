/**
 * Xiaomi MiMo provider for pi coding agent.
 *
 * Programmatic API — use this to register the MiMo provider
 * in custom setups or other tools that accept `ProviderConfig`.
 */

export type { MiMoModelConfig } from "./models.js";
export {
	MIMO_MODELS,
	MIMO_V2_FLASH,
	MIMO_V2_PRO,
	MIMO_V2_OMNI,
	MIMO_7B_RL,
	MIMO_BASE_URL,
	MIMO_API_KEY_ENV,
} from "./models.js";

import type { ProviderConfig } from "@mariozechner/pi-coding-agent";
import { MIMO_BASE_URL, MIMO_API_KEY_ENV, MIMO_MODELS } from "./models.js";

export interface MiMoProviderOptions {
	/** API key. Defaults to XIAOMI_MIMO_API_KEY env var. */
	apiKey?: string;
	/** Override the base URL. Defaults to https://api.xiaomimimo.com/v1 */
	baseUrl?: string;
	/** Custom headers to include in requests. */
	headers?: Record<string, string>;
}

/**
 * Create a `ProviderConfig` for the MiMo provider.
 *
 * @example
 * ```ts
 * const config = createMiMoProvider({ apiKey: "sk-..." });
 * pi.registerProvider("xiaomi-mimo", config);
 * ```
 */
export function createMiMoProvider(options: MiMoProviderOptions = {}): ProviderConfig {
	return {
		api: "openai-completions",
		apiKey: options.apiKey ?? `\${${MIMO_API_KEY_ENV}}`,
		baseUrl: options.baseUrl ?? MIMO_BASE_URL,
		headers: options.headers,
		models: MIMO_MODELS.map((m) => ({
			id: m.id,
			name: m.name,
			reasoning: m.reasoning,
			input: m.input,
			cost: m.cost,
			contextWindow: m.contextWindow,
			maxTokens: m.maxTokens,
		})),
	};
}
