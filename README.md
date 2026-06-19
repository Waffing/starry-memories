# ✦ Starry Memories · 星河回忆

> 把我们的回忆，放进一片星河。  \n> *Turn our memories into a galaxy of stars.*

一个纯前端的 3D 梦幻相册网站，使用 Three.js 在浏览器中呈现浪漫的星空照片展示。适合送给女朋友、纪念日、生日礼物。

<p align="center">
  <img src="https://img.shields.io/badge/Three.js-r168-000000?logo=threedotjs" alt="Three.js">
  <img src="https://img.shields.io/badge/No_Build_Step-just_open_html-brightgreen" alt="No Build">
  <img src="https://img.shields.io/badge/Storage-IndexedDB-orange" alt="IndexedDB">
  <img src="https://img.shields.io/badge/License-MIT-blue" alt="MIT">
</p>

---

## ✨ 效果预览

- 🎬 10 个章节，10 种 3D 照片队形自动切换
- 🌌 深紫星空背景 + 粉色爱心粒子 + 金色微光
- 💫 照片云团 / 照片墙 / 心形环 / 旋转圆环 / 波浪长廊 / 螺旋 / 钻石 / 十字 / 漩涡 / 终极心形
- 🎥 镜头缓慢推进、环绕、拉远，电影感运镜
- 🖱 点击照片放大查看 + 淡入文案
- ⌨ 键盘左右方向键切换章节
- 📱 桌面和手机端自适应全屏
- 🎵 背景音乐开关（预留）

## 🚀 快速开始

### 方式一：直接打开（推荐）

```bash
# 下载项目后，直接用浏览器打开
dreamy-album.html
```

无需 `npm install`，无需构建，零依赖本地部署。

### 方式二：本地服务器

```bash
# Python
python -m http.server 8080

# Node.js
npx serve .

# VS Code Live Server 插件
```

然后访问 `http://localhost:8080/dreamy-album.html`

## 📁 项目结构

```
outputs/
├── dreamy-album.html      # 🏠 3D 相册首页
├── admin.html             # ⚙ 后台管理（上传照片 / 编辑文案）
├── css/
│   ├── album.css          # 相册样式
│   └── admin.css          # 后台样式
└── js/
    ├── album-config.js    # 配置常量 (CAPTIONS / ACCENTS / 章节)
    ├── album-db.js        # IndexedDB 读写
    ├── album-formations.js # 10 种 3D 队形算法
    ├── album-textures.js  # 纹理生成与加载
    └── admin-app.js       # 后台交互逻辑
```

## 🎨 自定义指南

### 上传你的照片

1. 用浏览器打开 `admin.html`
2. 点击或拖拽上传照片（支持原片，单张可达数十 MB）
3. 为每张照片填写文案、选择主题色
4. 点击「💾 保存设置」
5. 打开 `dreamy-album.html` 查看效果

> 照片存储在浏览器 IndexedDB 中，不会上传到任何服务器。**隐私安全，完全本地。**

### 修改 Logo

在 `admin.html` → 全局设置 → Logo 文字中修改（默认 `WXY`）

### 修改章节文案和队形

在 `admin.html` → 章节设置中为每个章节自定义：
- 标题
- 两行文案
- 3D 队形类型（10 种可选）

### 修改每章时长

全局设置 → 章节时长（毫秒），默认 5000（5 秒）

### 数据备份

后台支持：
- 📜 **导出** — 下载 JSON 备份文件
- 📛 **导入** — 从备份恢复数据

## 🛠 技术栈

| 技术 | 用途 |
|------|------|
| Three.js (r168) | 3D 场景渲染、粒子系统、光影 |
| IndexedDB | 浏览器端数据持久化 |
| Canvas 2D API | 占位纹理生成 / 照片预处理 |
| 原生 JS (ES6+) | 无框架依赖 |
| CSS3 | UI 层、动画、响应式 |

## 🌐 部署

纯静态文件，可部署到任何静态托管：

```bash
# Vercel
vercel --prod

# Netlify (拖拽文件夹即可)

# GitHub Pages
# 推送到 gh-pages 分支即可

# Cloudflare Pages
# 连接 Git 仓库自动部署

# 任何静态服务器 (Nginx / Apache / Caddy)
```

## 📝 默认占位图

未上传照片时，自动使用 24 张 [picsum.photos](https://picsum.photos) 随机美图作为占位。

## 🔒 隐私说明

- 所有照片存储在浏览器本地 IndexedDB
- 不上传任何数据到服务器
- 导出/导入功能完全本地操作
- 无埋点、无追踪、无后端

## 📄 License

MIT © 2025

---

<p align="center">💕 愿你眼中的光，永远有我守护 💕</p>
