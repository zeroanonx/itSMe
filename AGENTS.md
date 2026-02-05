# Agents Configuration for itSMe

## 项目概览

这是一个基于 Next.js 16 的个人博客网站，使用 TypeScript、Tailwind CSS 和 Radix UI 构建。

## 构建命令

### 开发环境

```bash
pnpm dev              # 启动开发服务器 (端口 3001，使用 Turbopack)
```

### 生产环境

```bash
pnpm build            # 构建生产版本
pnpm start            # 启动生产服务器
```

### 代码质量

```bash
pnpm format           # 格式化代码 (Prettier)
pnpm format:check     # 检查代码格式
pnpm build:search     # 构建搜索索引
```

### 单个测试运行

⚠️ 此项目目前没有配置测试框架。如需添加测试，建议使用：

```bash
# 如果将来添加 Jest/Testing Library
npm test -- --testPathPattern=具体的测试文件
# 或
pnpm test path/to/specific.test.ts
```

## 代码风格指南

### 导入规范

- 使用绝对路径导入：`@/app/components/...`
- React 相关导入放在最前面
- 第三方库按字母顺序排列
- 相对导入使用 `./` 或 `../`

```tsx
// ✅ 正确示例
import React from "react";
import { Icon } from "@iconify-icon/react";
import { Button } from "@/app/components/shadcn/button";
import { cn } from "@/app/utils/modules/tw";
import { Post } from "@/app/types/modules/post";
```

### TypeScript 规范

- 启用严格模式 (`strict: true`)
- 优先使用 `interface` 而非 `type`（除非需要联合类型）
- 组件 Props 使用 `interface` 定义
- 使用 `React.FC` 或函数声明定义组件

```tsx
// ✅ 正确示例
interface ButtonProps {
  variant?: "default" | "destructive";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = "default",
  size = "md",
  children,
}) => {
  return <button className={cn(/* ... */)}>{children}</button>;
};
```

### 命名规范

- **组件文件**: PascalCase (如 `Button.tsx`, `SearchDialog.tsx`)
- **组件名称**: PascalCase (使用 `export default function ComponentName()`)
- **变量/函数**: camelCase
- **常量**: UPPER_SNAKE_CASE
- **类型/接口**: PascalCase，描述性前缀 (如 `PostListItem`, `UserInfo`)

### 错误处理

- API 路由使用 try/catch 包装
- 组件中使用错误边界处理渲染错误
- 异步操作要有适当的错误处理

```tsx
// ✅ API 路由示例
export async function POST(request: Request) {
  try {
    const data = await request.json();
    // 处理逻辑
    return Response.json({ success: true });
  } catch (error) {
    console.error("API Error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
```

### 样式规范

- 使用 Tailwind CSS 进行样式开发
- 复杂样式使用 `cva` (class-variance-authority) 创建变体
- 工具函数使用 `cn()` 进行 className 合并

```tsx
// ✅ 组件样式示例
import { cva } from "class-variance-authority";
import { cn } from "@/app/utils/modules/tw";

const cardVariants = cva("rounded-lg border p-4", {
  variants: {
    variant: {
      default: "bg-background text-foreground",
      destructive: "border-destructive bg-destructive/10",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
```

### 文件结构规范

```
src/app/
├── components/
│   ├── ui/           # 基础 UI 组件
│   ├── shadcn/       # shadcn/ui 组件
│   ├── layout/       # 布局组件
│   └── mdx/          # MDX 相关组件
├── hooks/            # 自定义 Hooks
├── utils/            # 工具函数
├── types/            # TypeScript 类型定义
├── store/            # 状态管理 (Zustand)
├── server/           # 服务端逻辑
└── constants/        # 常量定义
```

### 状态管理

- 使用 Zustand 进行全局状态管理
- 本地状态优先使用 React Hooks
- 复杂状态逻辑使用自定义 Hook 封装

### 性能优化

- 使用 `React.memo` 包装纯组件
- 图片使用 `next/image` 优化
- 代码分割使用 `React.lazy()` 和 `dynamic`
- 搜索索引预构建 (`build:search`)

### 特殊约定

- 所有组件使用默认导出
- 类型定义集中管理在 `types/` 目录
- 工具函数使用 `export *` 统一导出
- API 路由文件以 `route.ts` 结尾

### Prettier 配置

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": false,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "arrowParens": "always",
  "endOfLine": "lf"
}
```

### Git 提交前检查

提交前请确保运行：

```bash
pnpm format:check    # 检查代码格式
pnpm build:search    # 构建搜索索引
```

## 技术栈

- **框架**: Next.js 16.1.0 (App Router)
- **语言**: TypeScript (严格模式)
- **样式**: Tailwind CSS + styled-components
- **UI**: Radix UI + shadcn/ui
- **图标**: @iconify-icon/react
- **状态**: Zustand
- **表单**: React Hook Form + Zod
- **动画**: GSAP + Motion
- **包管理**: pnpm
