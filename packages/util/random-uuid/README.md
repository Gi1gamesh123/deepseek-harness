# dsh-random-uuid

English | [中文](README.zh.md)

`@deepseek-ai/dsh-random-uuid` provides the shared `randomUuid()` helper for browser-visible and host code. It uses `crypto.getRandomValues()` and therefore does not require `crypto.randomUUID()` or a secure browser origin.

## Model Experience

None, as UUID generation is runtime infrastructure and contributes no prompt, tool, message, or provider request.

#### KV Cache effect

None; generated identifiers do not enter model requests by this package.

## Known Limitations and Deferred Work

- The runtime must provide Web Crypto's `crypto.getRandomValues()`; unsupported runtimes fail loudly instead of falling back to weaker randomness.
