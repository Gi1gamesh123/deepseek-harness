# dsh-random-uuid

[English](README.md) | 中文

`@deepseek-ai/dsh-random-uuid` 提供浏览器端和 Host 端共用的 `randomUuid()`。它使用 `crypto.getRandomValues()`，不依赖 `crypto.randomUUID()`，因此普通 HTTP 页面也能生成 UUID。

## 模型体验

无。UUID 生成属于运行时基础设施，不会产生提示词、工具、消息或提供方请求。

#### KV Cache 影响

无；该包生成的标识符不会由该包送入模型请求。

## 已知限制与暂缓事项

- 运行时必须提供 Web Crypto 的 `crypto.getRandomValues()`；不支持该 API 的运行时会明确失败，不会回退到较弱的随机数。
