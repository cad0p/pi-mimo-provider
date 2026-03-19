# pi-mimo-provider

Xiaomi MiMo LLM provider for the [pi](https://github.com/badlogic/pi-mono) coding agent.

Registers MiMo models (V2-Flash, V2-Pro, V2-Omni, 7B-RL) using the OpenAI-compatible chat completions API at `https://api.xiaomimimo.com/v1`.

## Models

| Model | Context | Reasoning | Images | Cost (in/out per 1M tok) |
|-------|---------|-----------|--------|--------------------------|
| MiMo-V2-Flash | 256k | ✅ | ❌ | $0.10 / $0.30 |
| MiMo-V2-Pro | 1M | ✅ | ❌ | $1.00 / $3.00 |
| MiMo-V2-Omni | 1M | ✅ | ✅ | TBD |
| MiMo-7B-RL | 32k | ✅ | ❌ | Free |

## Setup

### 1. Install

```bash
bun add pi-mimo-provider
```

### 2. Set your API key

```bash
export XIAOMI_MIMO_API_KEY="your-api-key-here"
```

### 3. Use as pi extension

Add to `~/.pi/agent/settings.json`:

```json
{
  "packages": ["pi-mimo-provider/extension"]
}
```

Or via CLI flag:

```bash
pi --extension pi-mimo-provider/extension
```

### 4. Or use programmatically

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

```bash
bun install        # Install deps
bun run typecheck  # Type check
bun run test       # Run tests
bun run build      # Build dist/
bun run check      # All of the above
```

## License

MIT
