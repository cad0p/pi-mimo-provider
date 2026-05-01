# pi-mimo-provider

[![npm version](https://img.shields.io/npm/v/pi-mimo-provider)](https://www.npmjs.com/package/pi-mimo-provider)
[![npm downloads](https://img.shields.io/npm/dm/pi-mimo-provider)](https://www.npmjs.com/package/pi-mimo-provider)
[![license](https://img.shields.io/npm/l/pi-mimo-provider)](LICENSE)

Xiaomi MiMo LLM provider for the [pi](https://github.com/badlogic/pi-mono) coding agent.

Registers MiMo models (V2-Flash, V2-Pro, V2-Omni, 7B-RL) using the OpenAI-compatible chat completions API at `https://api.xiaomimimo.com/v1`.

## Models

| Model | Context | Reasoning | Images | Cost (in/out per 1M tok) |
|-------|---------|-----------|--------|--------------------------|
| MiMo-V2-Flash | 256k | ✅ | ❌ | $0.10 / $0.30 |
| MiMo-V2-Pro | 1M | ✅ | ❌ | $1.00 / $3.00 |
| MiMo-V2-Omni | 1M | ✅ | ✅ | TBD |
| MiMo-7B-RL | 32k | ✅ | ❌ | Free |

## Install

As a pi package (recommended):

```bash
pi install npm:pi-mimo-provider
```

Latest prerelease (calver builds between base releases):

```bash
pi install npm:pi-mimo-provider@next
```

Or via npm/bun for programmatic use:

```bash
npm install pi-mimo-provider
# or
bun add pi-mimo-provider
```

## Setup

### 1. Set your API key

```bash
export XIAOMI_MIMO_API_KEY="your-api-key-here"
```

### 2. Use as pi extension

If you installed via `pi install`, the extension is already registered.

Otherwise, add to `~/.pi/agent/settings.json`:

```json
{
  "packages": ["pi-mimo-provider/extension"]
}
```

Or via CLI flag:

```bash
pi --extension pi-mimo-provider/extension
```

### 3. Or use programmatically

```ts
import { createMiMoProvider } from "pi-mimo-provider";

// Register with pi
pi.registerProvider("xiaomi-mimo", createMiMoProvider());

// Or with custom options
pi.registerProvider("xiaomi-mimo", createMiMoProvider({
  apiKey: "sk-...",
  baseUrl: "https://custom.endpoint.com/v1",
  headers: { "X-Region": "cn" },
}));
```

## API

### `createMiMoProvider(options?)`

Creates a `ProviderConfig` for registration with pi.

**Options:**

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `apiKey` | `string` | `${XIAOMI_MIMO_API_KEY}` | API key (supports pi env var syntax) |
| `baseUrl` | `string` | `https://api.xiaomimimo.com/v1` | API base URL |
| `headers` | `Record<string, string>` | — | Custom HTTP headers |

### Exports

```ts
// Model configs
export const MIMO_V2_FLASH: MiMoModelConfig;
export const MIMO_V2_PRO: MiMoModelConfig;
export const MIMO_V2_OMNI: MiMoModelConfig;
export const MIMO_7B_RL: MiMoModelConfig;
export const MIMO_MODELS: MiMoModelConfig[];

// Constants
export const MIMO_BASE_URL: string;
export const MIMO_API_KEY_ENV: string;

// Factory
export function createMiMoProvider(options?: MiMoProviderOptions): ProviderConfig;
```

## Development

Requires [Bun](https://bun.sh) for running tests.

```bash
bun install        # Install deps
bun run typecheck  # Type check
bun run test       # Run tests
bun run build      # Build dist/
bun run check      # All of the above
```

## License

MIT © [cad0p](https://github.com/cad0p)
