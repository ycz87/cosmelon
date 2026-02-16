# AGENTS.md - Cosmelon 项目规范（供 Codex 读取）

## 项目概况

- **产品：** 西瓜时钟（Watermelon Clock）— 番茄钟 + 农场养成
- **技术栈：** React 19 + Vite 7 + Tailwind CSS 4 + TypeScript
- **后端：** Cloudflare Workers（Hono）+ D1 数据库
- **部署：** Cloudflare Pages（前端）+ Workers（API）
- **线上地址：** https://clock.cosmelon.app

## 目录结构

```
cosmelon/
├── src/              # 前端源码（React）
│   ├── components/   # UI 组件
│   ├── hooks/        # 自定义 hooks
│   ├── i18n/         # 国际化（8 种语言）
│   ├── stores/       # 状态管理
│   ├── types/        # TypeScript 类型定义
│   └── utils/        # 工具函数
├── api/              # 业务 API（Cloudflare Workers + Hono）
├── auth/             # 认证服务（Cloudflare Workers + Hono）
├── admin/            # 管理后台
├── public/           # 静态资源
└── docs/             # 文档
```

## 编码规范

- TypeScript strict mode，不允许 any
- 组件用函数式 + hooks，不用 class
- 样式用 Tailwind CSS，不写自定义 CSS（除非 Tailwind 无法实现）
- 国际化：所有用户可见文本必须走 i18n，不硬编码中文/英文
- 命名：组件 PascalCase，函数/变量 camelCase，常量 UPPER_SNAKE_CASE
- 文件命名：组件文件 PascalCase.tsx，其他 camelCase.ts

## 禁止事项

- 不要修改 .env 文件或任何包含密钥的配置
- 不要修改 wrangler.toml（Cloudflare 部署配置）
- 不要删除任何现有文件，只新增或修改
- 不要引入新的依赖包，除非任务明确要求
- 不要修改 CI/CD 配置（.github/workflows/）

## 验收标准

每次改动完成后必须：
1. `npm run build` 无报错
2. 如果有测试：`npm test` 全部通过
3. 不引入新的 TypeScript 错误
4. 不破坏现有功能
