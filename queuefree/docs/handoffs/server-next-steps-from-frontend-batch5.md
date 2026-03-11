# Server Next Steps from Frontend Batch 5

## 前端本轮已完成

- Mobile 公开 env 已清理回 registry baseline
- Web / Admin 公开路由继续保持不变
- `packages/api-client` 之后只允许承载 OpenAPI 生成结果

## 你接下来需要做的事

1. 保持当前域名矩阵不变
2. 保持当前 env 分组不变
3. 补齐 EAS / Vercel / Render / Cloudflare 的部署与发布文档
4. 准备前端需要的环境矩阵说明，并标注哪些 `.env.example` 可以现在生成、哪些仍需等待 identifiers / registry 补齐

## 你当前不要做的事

- 不要新增未登记公开 env
- 不要更改 Web `/contact`
- 不要更改 Admin / Web / API 已登记域名基线
- 不要把当前仓库描述成完全 pre-OpenAPI
