# TASK.md - 任务进度

## 当前任务：Phase 6 Step 4 — 每周刷新商城
派发时间：2026-02-20 02:12（北京时间）
优先级：P0
背景：Phase 6 Step 1-3 已完成，这是 Phase 6 的最后一步。
目标：实现每周刷新商城特殊货架，提供稀有基因/传说种子/限定装饰随机上架。

## 子任务
- [x] 商城特殊货架 UI（第三个 tab）（完成 02:26）
- [x] 每周刷新逻辑（每周一 00:00 UTC）（完成 02:26）
- [x] 随机商品生成（3-5件）（完成 02:26）
- [x] 稀有基因片段商品（⭐⭐⭐/⭐⭐⭐⭐基因，200-500瓜币）（完成 02:26）
- [x] 传说种子商品（随机星系⭐⭐⭐品种种子，300瓜币）（完成 02:26）
- [x] 限定装饰商品（瓜田装饰物，100-200瓜币）（完成 02:26）
- [x] 购买逻辑 + 余额检查（完成 02:26）
- [x] i18n 8 语言翻译（完成 02:26）
- [x] E2E 测试（完成 02:33，7/7 通过）
- [x] Claude Code 审查（完成 02:54，0 个严重问题，代码质量良好）

## 验收标准
- 每周一 00:00 UTC 商城特殊货架刷新（E2E 测试覆盖）
- 随机生成 3-5 件商品，每种类型至少 1 件（E2E 测试覆盖）
- 购买后瓜币扣除 + 商品添加到背包 + 库存-1（E2E 测试覆盖）
- 售罄后按钮置灰（E2E 测试覆盖）
- 刷新倒计时正确显示（E2E 测试覆盖）
- i18n 8 语言正确显示（视觉验收）
- E2E 测试覆盖刷新逻辑 + 购买流程

## 技术方案（参考你的计划）

**数据结构：**
```typescript
// types/market.ts 新增
interface WeeklyItem {
  id: string;
  type: 'rare-gene' | 'legend-seed' | 'decoration';
  name: string; // i18n key
  price: number;
  stock: number; // 限购数量
  data: any; // 具体内容（基因/种子/装饰）
}

interface WeeklyShop {
  items: WeeklyItem[];
  refreshAt: number; // 下次刷新时间戳
  lastRefreshAt: number; // 上次刷新时间戳
}
```

**核心逻辑：**
- 刷新时机：每次打开 app 检查当前时间是否跨过了下一个周一 00:00 UTC，是则刷新
- 商品生成：随机 3-5 件，每种类型至少 1 件
  - 稀有基因：从⭐⭐⭐/⭐⭐⭐⭐品种池随机，价格 200-500 瓜币
  - 传说种子：从五星系⭐⭐⭐品种池随机，价格 300 瓜币
  - 限定装饰：预设 5-10 种装饰物，随机选 1-2 种，价格 100-200 瓜币
- 购买：检查余额 → 扣瓜币 → 添加到背包 → stock-1

**UI 布局：**
- 商城新增第三个 tab："每周特惠"
- 显示刷新倒计时（距离下周一还有X天X小时）
- 商品卡片：图标 + 名字 + 价格 + 限购数量 + 购买按钮
- 售罄后按钮置灰

**集成点：**
- `src/store/marketStore.ts` 新增 `weeklyShop` state + `refreshWeeklyShop()` + `buyWeeklyItem()`
- `src/components/Market/WeeklyTab.tsx` 新组件
- `src/utils/weeklyShop.ts` 商品生成逻辑
- `src/locales/*.json` 新增商品名称 i18n key

## 相关文件
- `/home/ycz87/cosmelon/docs/FARM-DESIGN-v3.md` — 农场设计完整文档
- `/home/ycz87/cosmelon/docs/FARM-ROADMAP-v1.md` — Phase 6 详细说明

## 阻塞
无

---

## 历史记录
- Phase 6 Step 3 (v0.35.0): 天气 + 生命感 ✅
- Phase 6 Step 2 (v0.34.0): 暗物质星 ✅
- Phase 6 Step 1 (v0.33.0): 五行融合 + 幻彩星 ✅
- Phase 5 Step 2 (v0.32.0): 星际大盗 + 防护道具 + 月神甘露 ✅
- Phase 5 Step 1 (v0.31.0): 变异系统 ✅
- Phase 4 Step 2 (v0.30.0): 买道具 + 地块购买 ✅
- Phase 4 Step 1 (v0.29.0): 瓜币系统 + 商城框架 + 卖瓜 ✅
- Phase 3 Step 3 (v0.28.0): 双元素融合 + 杂交品种 ✅
- Phase 3 Step 2 (v0.27.0): 基因注入系统 ✅
- Phase 3 Step 1 (v0.26.0): 基因片段系统 + 基因实验室 UI ✅
- Phase 2 (v0.22.0): 生长机制 + 四大星系 + 图鉴升级 ✅
