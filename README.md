# 🦊 DanoDay - Portfolio

<div align="center">

![Style](https://img.shields.io/badge/Style-Minimalist%20Vercel-black)
![Tech](https://img.shields.io/badge/Tech-Next.js%20%2B%20React%20%2B%20TS-blue)
![Framework](https://img.shields.io/badge/Framework-Next.js%2016-black)
![Sass](https://img.shields.io/badge/Style-Sass-CF649A)
![Animation](https://img.shields.io/badge/Motion-Framer%20Motion-FF00C1)
![3D](https://img.shields.io/badge/3D-Three.js-000000)

**基于 Vercel 极简主义风格的个人主页 - 融合 3D 交互与流畅动效的数字作品集。**

[预览主页 (GitHub Pages)](https://DanoAndHolidays.github.io/danoday/)

</div>

---

### 🌌 核心特性

- **Minimalist UI**: 采用 Vercel 风格的极简设计，黑白灰配色，视觉清晰
- **3D Interactive**: 集成 Three.js 技术栈，打造沉浸式 3D 交互体验
- **Smooth Animation**: 利用 Framer Motion 实现流畅的滚动动画与组件过渡效果
- **Dynamic Content**: 整合个人项目、核心技能、实时数据与学习笔记
- **Responsive Design**: 完美适配移动端与桌面端，支持多种设备访问
- **PlayGround**: 保留交互式实验区域，用于展示前端创意与技术探索

### 🛠️ 技术架构

- **框架**: [Next.js 16](https://nextjs.org/) + React 19 + TypeScript 5.9
- **3D 引擎**: [Three.js](https://threejs.org/) + React Three Fiber + React Three Drei
- **样式**: Sass (SCSS) + CSS Modules + Mixins
- **动画**: [Framer Motion 12](https://www.framer.com/motion/)
- **图标**: Lucide React
- **构建**: Vite (Rolldown) + ESBuild
- **部署**: GitHub Actions CI/CD

### 🚀 快速开始

```bash
# 克隆仓库
git clone https://github.com/DanoAndHolidays/danoday.git

# 进入目录
cd danoday

# 安装依赖
npm install

# 启动开发环境
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm start
```

### 📁 项目结构

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # 根布局组件
│   ├── page.tsx           # 主页组件
│   └── globals.scss       # 全局样式
├── components/            # React 组件
│   ├── Articles/          # 文章展示组件
│   ├── PlayGround/        # 交互实验区域
│   ├── Projects/          # 项目展示组件
│   ├── Skills/            # 技能展示组件
│   ├── SocialLinks/       # 社交链接组件
│   ├── Stats/             # 数据统计组件
│   └── Timeline/          # 时间线组件
└── styles/                # 样式文件
    └── _variables.scss    # SCSS 变量定义
```

### 🎯 开发指南

- 使用 TypeScript 进行类型安全的开发
- 遵循 React 19 的最佳实践和新的 Hooks 特性
- 使用 Sass 模块化和变量系统维护样式一致性
- 3D 组件使用 React Three Fiber 进行声明式开发
- 动画效果优先使用 Framer Motion 实现

### 📬 联系我

- **Email**: [Danoday@Foxmail.com](mailto:Danoday@Foxmail.com)
- **B站**: [DanoDay 主页](https://space.bilibili.com/111616585)
- **GitHub**: [@DanoAndHolidays](https://github.com/DanoAndHolidays)

<div align="center">
  <i>"Crafting high-performance, immersive digital experiences where code meets art."</i>
  <br>
  <i>打造高性能、沉浸式的数字体验，让代码与艺术完美融合。</i>
</div>
