/**
 * Xiaomi MiMo provider — pi extension.
 *
 * Drop-in extension that registers the MiMo provider.
 *
 * Usage in `~/.pi/agent/settings.json`:
 * ```json
 * {
 *   "packages": ["pi-mimo-provider/extension"]
 * }
 * ```
 *
 * Or via CLI:
 * ```
 * pi --extension pi-mimo-provider/extension
 * ```
 *
 * Set the `XIAOMI_MIMO_API_KEY` environment variable before launching pi.
 */

import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";
import { createMiMoProvider } from "./index.js";

export default function (pi: ExtensionAPI) {
	pi.registerProvider("xiaomi-mimo", createMiMoProvider());
}
