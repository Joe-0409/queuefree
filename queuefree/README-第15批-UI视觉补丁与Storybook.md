# QueueFree 第15批：UI视觉补丁与 Storybook

这批只做视觉与实现层增强，不改已冻结的业务契约。

## 本批重点
1. `packages/ui-tokens` 增加 promo token
2. Mobile 重点页面视觉升级：
   - Welcome
   - Login / OTP
   - Home
   - Queue（卡片形态）
   - Product Detail
   - Wallet
3. 新增关键视觉组件
4. 新增 mobile 组件 Storybook 配置与 stories
5. 新增 `verify:ui-stories`

## 启动
```bash
pnpm install
pnpm verify:frontend-guardrails
pnpm dev:mobile
```

## Storybook
```bash
pnpm storybook:mobile
```

默认端口：
```text
http://localhost:6007
```

## 说明
- 本批不新增 route / env var / API path / request field / response field
- `packages/api-client` 不放手写 adapter
- 只在 `apps/mobile/src/generated-bridge/**` 和页面组件层做视觉增强
- Admin / Web 本批只补充 token，不新增视觉页面改造
