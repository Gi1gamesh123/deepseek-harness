# DeepSeek Harness Auth

[English](README.md) | 中文

本仓库是 DeepSeek Harness 的二开版本，面向自托管 Web 部署。它增加了公网绑定和账号密码认证，同时保留基于 Cordis 的插件架构。

这是一个只提供源码的开发仓库。这个二开版本没有预构建 npm 包，每次部署前都需要在本地安装依赖并完成编译。

## 本仓库增加的功能

- Web 服务绑定到 `0.0.0.0` 时自动启用主机认证插件。
- 登录保护覆盖 Web UI、API 路由、SPA 回退和 WebSocket 升级。
- 浏览器端使用兼容 Linux 的 UUID 回退；服务重启导致会话失效时自动回到登录页。
- 登录使用 CSRF 双提交 Cookie、进程内存会话和失败登录限流。
- 密码从 `DSH_WEB_PASSWORD` 读取；凭据、Cookie 和会话令牌不会提交到仓库。

## 环境要求

- Node.js `22.19` 或更高版本，以及 `pnpm`。
- 模型请求需要 `DEEPSEEK_API_KEY`。
- 为 `DSH_WEB_PASSWORD` 准备一个足够长的随机值。

<a id="run"></a><a id="run-from-source"></a>

## 编译和运行

克隆本仓库，并在本地编译运行时和浏览器资源：

```sh
git clone https://github.com/Gi1gamesh123/deepseek-harness-auth.git
cd deepseek-harness-auth
pnpm install
export DEEPSEEK_API_KEY='your-deepseek-api-key'
export DSH_WEB_PASSWORD='choose-a-long-random-password'
pnpm run build
pnpm dsh web --host 0.0.0.0 --port 3080
```

打开 `http://<server-ip>:3080/`，使用用户名 `admin` 和 `DSH_WEB_PASSWORD` 的值登录。不带 `--host 0.0.0.0` 运行 `pnpm dsh web` 时，服务只绑定本机回环地址，不会启用公网绑定认证配置。

## 公网部署要求

内置监听器使用明文 HTTP。暴露到互联网前，请放在 HTTPS 反向代理后面，并将防火墙限制为只允许代理访问；`DSH_WEB_PASSWORD` 应通过服务管理器的环境文件提供，不要写入代码仓库。默认 Cookie 配置兼容直接使用 HTTP；使用 HTTPS 部署时，应在 Web auth 配置中设置 `secureCookie: true`。

认证会话只保存在服务进程内存中，服务重启后会全部失效。浏览器检测到会话消失时会回到 `/auth/login`，因此重启后用户需要重新登录。

## 常用检查

```sh
pnpm run test
pnpm run typecheck
pnpm run doc-sync
pnpm run lint
```

包级契约见 [`packages/host/web-auth/README.md`](packages/host/web-auth/README.md) 和 [`packages/bundle/web-app/README.md`](packages/bundle/web-app/README.md)。组合方式和扩展模型见 [`docs/architecture.md`](docs/architecture.md)。

## 许可证

[MIT](LICENSE)

第三方依赖及其许可证见 [`THIRD_PARTY_NOTICES.md`](THIRD_PARTY_NOTICES.md)。
