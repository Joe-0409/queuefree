# Memory: 2026-03-12 (Batch 8A Registry Patch)

- 已将 Batch 8A 的 C 端只读 Core API 注册表（Me, Products, Queue Guard, Queue Entries）应用到 `docs/registry/registry-baseline-v1.2.md`。
- 此次 patch 严格收敛于只读接口，未包含鉴权刷新或 Admin 接口。
- 完成 Git 提交：`7914a31` (`docs: patch core read-only registry for batch 8a`)。
- 后续步骤：等待后端根据此 Registry Patch 更新 OpenAPI 定义。
