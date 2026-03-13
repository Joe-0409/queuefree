# QueueFree 前端视觉实现补丁 v2（Batch 15 落地说明）

## 作用范围
本文件只补充视觉与实现层，不改变：
- 已锁定技术栈
- 已锁定目录结构
- `packages/shared`
- `packages/api-client`
- 已冻结路由
- PRD 规则

## 本批实际采用
### 来自参考图的视觉语气
- coral / pink / orange 的 promo accent
- 大圆角卡片
- 强 CTA 按钮
- 商品图优先的卡片构图
- Wallet summary hero card
- 轻促销氛围的顶部 hero

### 明确不采用
- Home / Free / Special / Own 导航结构
- password login
- 满屏高饱和红背景
- 跑马灯 / fake ticker / 假热闹 feed
- 真人头像主导列表
- guaranteed free / earn money / jackpot / free soon 之类刺激型文案
- 新增后台 rules 路由

## Token 策略
在 `packages/ui-tokens` 中增加 `promo`：
- `gradientStart`
- `gradientEnd`
- `softBackground`
- `strongTextOnColor`
- `badgeBackground`
- `badgeText`

约束：
- base surface 仍以 neutral / trust 为主
- promo 只用于 Home hero / featured product / wallet hero / CTA emphasis
- Queue / Rules / Delete Account 不允许大面积 promo 背景

## 页面层改造
### 已改
- Welcome
- Login / OTP
- Home
- Queue（卡片形态）
- Product Detail
- Wallet

### 未改
- 写操作页面逻辑
- Admin / Web 视觉大改
- 新 contract / 新字段 / 新 env

## Storybook
新增 mobile 组件 stories：
- PromoBadge
- PromoHeroCard
- WalletHeroCard
- MechanismStepStrip
- LightweightRuleEntryRow
- ProductCard
- QueueEntryCard
- SlotSummaryCard
- PrimaryButton
- SectionCard
- TextField
