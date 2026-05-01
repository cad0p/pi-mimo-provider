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
 * Set the `XIAOMI_API_KEY` environment variable, or use `/login` in pi
 * to store an API key in `~/.pi/agent/auth.json`.
 */

import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";
import { createMiMoProvider } from "./src/index.js";

export default function (pi: ExtensionAPI) {
	pi.registerProvider("xiaomi-mimo", createMiMoProvider());
}
