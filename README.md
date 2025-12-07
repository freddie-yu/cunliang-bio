<div align="center">

# Open Bio Template

### *A Stunning Multi-Theme Personal Website Template*

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Made with React](https://img.shields.io/badge/Made%20with-React-61DAFB?logo=react)](https://reactjs.org/)
[![Powered by Vite](https://img.shields.io/badge/Powered%20by-Vite-646CFF?logo=vite)](https://vitejs.dev/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

[English](#english) | [中文](#中文)

---

### Choose Your Style

<table>
<tr>
<td align="center"><b>Retro Theme</b><br/>Hand-drawn indie vibe</td>
<td align="center"><b>MacOS Theme</b><br/>Clean & Professional</td>
<td align="center"><b>Linux Theme</b><br/>Hacker Terminal</td>
</tr>
</table>

### Deploy in 30 Seconds

<table>
<tr>
<td align="center" width="33%">
<a href="https://vercel.com/new/clone?repository-url=https://github.com/chenyibai9527/Open-Bio-Template">
<img src="https://vercel.com/button" alt="Deploy with Vercel"/>
</a>
<br/>
<b>Vercel</b>
<br/>
<sub>Recommended</sub>
</td>
<td align="center" width="33%">
<a href="https://pages.cloudflare.com/">
<img src="https://img.shields.io/badge/Deploy%20to-Cloudflare%20Pages-F38020?style=for-the-badge&logo=cloudflare&logoColor=white" alt="Deploy to Cloudflare Pages"/>
</a>
<br/>
<b>Cloudflare Pages</b>
<br/>
<sub>Super Fast</sub>
</td>
<td align="center" width="33%">
<a href="https://app.netlify.com/start/deploy?repository=https://github.com/chenyibai9527/Open-Bio-Template">
<img src="https://www.netlify.com/img/deploy/button.svg" alt="Deploy to Netlify"/>
</a>
<br/>
<b>Netlify</b>
<br/>
<sub>Easy Setup</sub>
</td>
<td align="center" width="33%">
<a href="https://pages.github.com/">
<img src="https://img.shields.io/badge/Deploy%20to-GitHub%20Pages-24292e?style=for-the-badge&logo=github&logoColor=white" alt="Deploy to GitHub Pages"/>
</a>
<br/>
<b>GitHub Pages</b>
<br/>
<sub>Direct Integration</sub>
</td>
</tr>
</table>

</div>

---

## English

### Why Choose This Template?

- **3 Unique Themes** - Switch between Retro, MacOS, and Linux styles
- **Zero Coding Required** - Just edit one config file
- **Mobile Optimized** - Looks perfect on all devices
- **Lightning Fast** - Built with Vite for instant loading
- **100% Free Hosting** - Deploy to Vercel, Cloudflare, or Netlify
- **Animated & Interactive** - Smooth transitions with Framer Motion

---

### Quick Start (For Everyone!)

> **No coding experience needed!** Follow these 3 simple steps:

#### Step 1: Get Your Copy

Click the button below to create your own copy:

[![Use This Template](https://img.shields.io/badge/Use%20This%20Template-2ea44f?style=for-the-badge)](https://github.com/chenyibai9527/Open-Bio-Template/generate)

Or click the green **"Use this template"** button at the top of this page.

#### Step 2: Customize Your Info

1. Open the `config.ts` file in your repository
2. Click the **pencil icon** to edit
3. Replace the example data with your own information:

```typescript
export const userProfile = {
  name: "Your Name",                    // Your name
  role: "Your Title",                   // Your job title
  bio: "Your bio here...",              // Short bio
  avatar_url: "https://...",            // Your photo URL
  // ... more fields
};
```

4. Scroll down and click **"Commit changes"**

#### Step 3: Deploy (FREE!)

Choose your favorite platform:

<details>
<summary><b>Option A: Vercel (Recommended - Easiest)</b></summary>

1. Click here: [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/chenyibai9527/Open-Bio-Template)
2. Sign in with GitHub
3. Click **"Deploy"**
4. Wait 2 minutes
5. **Done!** Your site is live at `https://your-project.vercel.app`

**Bonus:** Every time you edit `config.ts`, Vercel automatically updates your site!

</details>

<details>
<summary><b>Option B: Cloudflare Pages (Super Fast)</b></summary>

1. Go to [Cloudflare Pages](https://pages.cloudflare.com/)
2. Sign in with GitHub
3. Click **"Create a project"**
4. Select your repository
5. Set build settings:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
6. Click **"Save and Deploy"**
7. **Done!** Your site is live at `https://your-project.pages.dev`

</details>

<details>
<summary><b>Option C: Netlify (Also Great)</b></summary>

1. Click here: [![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/chenyibai9527/Open-Bio-Template)
2. Sign in with GitHub
3. Click **"Connect to GitHub"**
4. Click **"Deploy site"**
5. **Done!** Your site is live!

</details>

<details>
<summary><b>Option D: GitHub Pages (Direct Integration)</b></summary>

1. Go to your repository **Settings** → **Pages**
2. Under **Source**, select **GitHub Actions**
3. Create `.github/workflows/deploy.yml` file in your repository:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

# Sets permissions of the GITHUB_TOKEN to allow deployment to GitHub Pages
permissions:
  contents: read
  pages: write
  id-token: write

# Allow only one concurrent deployment
concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v4
      with:
        fetch-depth: 0
    
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build
      run: npm run build
    
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v4
      if: github.ref == 'refs/heads/main'
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
        publish_branch: gh-pages
        force_orphan: true
```

4. **Important:** Go to your repository **Settings** → **Actions** → **General** → **Workflow permissions** and select **Read and write permissions**
5. Commit the workflow file
6. Go to **Actions** tab and wait for the workflow to complete
7. **Done!** Your site will be live at `https://yourusername.github.io/your-repo-name`

**Pro tip:** GitHub Pages automatically rebuilds whenever you push changes to the main branch!

**Troubleshooting:** If you still get permission errors, make sure:
1. Go to repository **Settings** → **Actions** → **General** → **Workflow permissions**
2. Select **Read and write permissions** and **Allow GitHub Actions to create and approve pull requests**
3. **Important:** Also check **Settings** → **Pages** → **Build and deployment** → **Source** is set to **GitHub Actions**
4. If problems persist, the workflow now uses GitHub's official deployment actions which should resolve most permission issues
5. For detailed troubleshooting, see [GitHub Pages Troubleshooting Guide](GITHUB_PAGES_TROUBLESHOOTING.md)
6. **Images not showing?** See [GitHub Pages Assets Guide](GITHUB_PAGES_ASSETS_GUIDE.md) for picture resource path fixes

</details>

---

### Pro Tips

| Tip | How To |
|-----|--------|
| **Change your avatar** | Update `avatar_url` in `config.ts` with your image URL |
| **Add social links** | Edit the `socials` array in `config.ts` |
| **Add projects** | Add items to the `projects` array |
| **Custom domain** | Add your domain in Vercel/Cloudflare settings |
| **Change theme** | Visitors can choose their favorite theme on load |
| **GitHub Pages** | Use the new GitHub Actions workflow for automatic deployment |

---

### FAQ

<details>
<summary><b>Where do I get an avatar URL?</b></summary>

Upload your photo to:
- [Imgur](https://imgur.com/) (Free, no account needed)
- [GitHub](https://github.com/) (Use your GitHub profile picture)
- Any image hosting service

Then copy the direct image link.
</details>

<details>
<summary><b>My changes aren't showing up!</b></summary>

1. Make sure you clicked **"Commit changes"** after editing
2. Wait 1-2 minutes for the deployment to complete
3. Hard refresh your browser (Ctrl+Shift+R or Cmd+Shift+R)
</details>

<details>
<summary><b>Can I use my own domain?</b></summary>

Yes! All platforms support custom domains:
- **Vercel:** Settings → Domains → Add
- **Cloudflare:** Custom Domains → Set up
- **Netlify:** Domain Settings → Add custom domain
</details>

<details>
<summary><b>Is this really free?</b></summary>

**100% FREE!**
- GitHub hosting: Free
- Vercel: Free tier (perfect for personal sites)
- Cloudflare Pages: Free unlimited
- Netlify: Free tier (100GB bandwidth/month)
</details>

---

### For Developers

```bash
# Clone and install
git clone https://github.com/chenyibai9527/Open-Bio-Template.git
cd open-bio-template
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

**Tech Stack:** React 18 + TypeScript + Vite + Tailwind CSS + Framer Motion

---

## 中文

### 为什么选择这个模板？

- **3 种独特主题** - 复古、MacOS、Linux 风格随心切换
- **零代码要求** - 只需编辑一个配置文件
- **移动端优化** - 在所有设备上完美显示
- **闪电般快速** - 使用 Vite 构建，瞬间加载
- **100% 免费托管** - 部署到 Vercel、Cloudflare 或 Netlify
- **动画交互** - 使用 Framer Motion 实现流畅过渡

---

### 快速开始（人人都会！）

> **不需要任何编程经验！** 只需 3 步：

#### 第 1 步：获取你的副本

点击下方按钮创建你自己的副本：

[![使用此模板](https://img.shields.io/badge/%E4%BD%BF%E7%94%A8%E6%AD%A4%E6%A8%A1%E6%9D%BF-2ea44f?style=for-the-badge)](https://github.com/chenyibai9527/Open-Bio-Template/generate)

或点击页面顶部的绿色 **"Use this template"** 按钮。

#### 第 2 步：修改你的信息

1. 在你的仓库中打开 `config.ts` 文件
2. 点击 **铅笔图标** 开始编辑
3. 把示例数据替换成你自己的信息：

```typescript
export const userProfile = {
  name: "你的名字",                     // 填写你的名字
  role: "你的职位",                     // 填写你的职位
  bio: "你的简介...",                   // 简短介绍
  avatar_url: "https://...",           // 你的头像链接
  // ... 更多字段
};
```

4. 向下滚动并点击 **"Commit changes"**（提交更改）

#### 第 3 步：部署（完全免费！）

选择你喜欢的平台：

<details>
<summary><b>方案 A：Vercel（推荐 - 最简单）</b></summary>

1. 点击这里：[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/chenyibai9527/Open-Bio-Template)
2. 使用 GitHub 账号登录
3. 点击 **"Deploy"**（部署）
4. 等待 2 分钟
5. **完成！** 你的网站已上线：`https://你的项目名.vercel.app`

**福利：** 每次你修改 `config.ts`，Vercel 会自动更新你的网站！

</details>

<details>
<summary><b>方案 B：Cloudflare Pages（超快速度）</b></summary>

1. 访问 [Cloudflare Pages](https://pages.cloudflare.com/)
2. 使用 GitHub 账号登录
3. 点击 **"Create a project"**（创建项目）
4. 选择你的仓库
5. 设置构建选项：
   - **构建命令（Build command）：** `npm run build`
   - **构建输出目录（Build output directory）：** `dist`
6. 点击 **"Save and Deploy"**（保存并部署）
7. **完成！** 你的网站已上线：`https://你的项目名.pages.dev`

</details>

<details>
<summary><b>方案 C：Netlify（也很棒）</b></summary>

1. 点击这里：[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/chenyibai9527/Open-Bio-Template)
2. 使用 GitHub 账号登录
3. 点击 **"Connect to GitHub"**（连接到 GitHub）
4. 点击 **"Deploy site"**（部署网站）
5. **完成！** 你的网站已上线！

</details>

<details>
<summary><b>方案 D：GitHub Pages（直接集成）</b></summary>

1. 进入你的仓库 **Settings（设置）** → **Pages（页面）**
2. 在 **Source（源）** 下，选择 **GitHub Actions**
3. 在你的仓库中创建 `.github/workflows/deploy.yml` 文件：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

# 设置 GITHUB_TOKEN 权限，允许部署到 GitHub Pages
permissions:
  contents: read
  pages: write
  id-token: write

# 允许并发部署
concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v4
      with:
        fetch-depth: 0
    
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build
      run: npm run build
    
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v4
      if: github.ref == 'refs/heads/main'
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
        publish_branch: gh-pages
        force_orphan: true
```

4. **重要：** 进入仓库 **Settings（设置）** → **Actions（操作）** → **General（常规）** → **Workflow permissions（工作流权限）** 并选择 **Read and write permissions（读写权限）**
5. 提交工作流文件
6. 进入 **Actions（操作）** 标签页，等待工作流完成
7. **完成！** 你的网站将在 `https://你的用户名.github.io/你的仓库名` 上线

**专业提示：** 每当你推送更改到主分支时，GitHub Pages 会自动重新构建！

**故障排除：** 如果你仍然遇到权限错误，请确保：
1. 进入仓库 **Settings（设置）** → **Actions（操作）** → **General（常规）** → **Workflow permissions（工作流权限）**
2. 选择 **Read and write permissions（读写权限）** 和 **Allow GitHub Actions to create和批准拉取请求）**
3. **重要：** 同时检查 **Settings（设置）** → **Pages（页面）** → **Build and deployment（构建和部署）** → **Source（源）** 设置为 **GitHub Actions**
4. 如果问题仍然存在，现在的工作流使用了 GitHub 的官方部署 actions，应该能解决大部分权限问题
5. 详细故障排除请参考 [GitHub Pages 故障排除指南](GITHUB_PAGES_TROUBLESHOOTING.md)
6. **图片不显示？** 请参考 [GitHub Pages 资源指南](GITHUB_PAGES_ASSETS_GUIDE.md) 获取图片路径修复方案

</details>

---

### 实用技巧

| 技巧 | 如何操作 |
|-----|---------|
| **更换头像** | 在 `config.ts` 中更新 `avatar_url` 为你的图片链接 |
| **添加社交链接** | 编辑 `config.ts` 中的 `socials` 数组 |
| **添加项目** | 在 `projects` 数组中添加项目 |
| **自定义域名** | 在 Vercel/Cloudflare 设置中添加你的域名 |
| **切换主题** | 访客可以在加载时选择他们喜欢的主题 |
| **GitHub Pages** | 使用新的 GitHub Actions 工作流实现自动部署 |

---

### 常见问题

<details>
<summary><b>如何获取头像链接？</b></summary>

上传你的照片到：
- [Imgur](https://imgur.com/)（免费，无需注册）
- [GitHub](https://github.com/)（使用你的 GitHub 头像）
- 任何图片托管服务

然后复制直接图片链接。
</details>

<details>
<summary><b>我的修改没有显示出来！</b></summary>

1. 确保编辑后点击了 **"Commit changes"**（提交更改）
2. 等待 1-2 分钟让部署完成
3. 强制刷新浏览器（Ctrl+Shift+R 或 Cmd+Shift+R）
</details>

<details>
<summary><b>可以使用自己的域名吗？</b></summary>

可以！所有平台都支持自定义域名：
- **Vercel：** 设置 → 域名 → 添加
- **Cloudflare：** 自定义域名 → 设置
- **Netlify：** 域名设置 → 添加自定义域名
</details>

<details>
<summary><b>这真的免费吗？</b></summary>

**100% 免费！**
- GitHub 托管：免费
- Vercel：免费套餐（非常适合个人网站）
- Cloudflare Pages：无限制免费
- Netlify：免费套餐（每月 100GB 流量）
</details>

---

### 开发者指南

```bash
# 克隆并安装
git clone https://github.com/chenyibai9527/Open-Bio-Template.git
cd open-bio-template
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

**技术栈：** React 18 + TypeScript + Vite + Tailwind CSS + Framer Motion

## 🔄 更新日志 (Changelog)

### v1.1.0 (2025-11-28)
- ✨ 新增 GitHub Pages 一键部署支持
- 📝 完善部署文档，新增 GitHub Actions 工作流配置
- 🛠️ 优化 Vite 配置，支持 GitHub Pages 路径
- 🎨 更新 README 文档结构
- 📦 版本号升级至 1.1.0
- 🐛 修复 Tailwind CSS 生产构建配置问题
- 🔧 修复资源路径和样式加载问题
- 🎯 **重要修复**: 降级 Tailwind CSS v4→v3，完全恢复自定义样式兼容性
- 📸 **新增**: 静态资源路径工具函数，完美解决 GitHub Pages 图片显示问题
- 🎯 **重要修复**: 降级 Tailwind CSS v4→v3，完全恢复自定义样式兼容性
- 🐛 修复 Tailwind CSS 生产构建配置问题
- 🔧 修复资源路径和样式加载问题

### v1.0.0 (2025-11-28)
- 🎉 初始版本发布
- 🎨 三种主题风格：复古、MacOS、Linux
- 📱 完全响应式设计
- ⚡ 基于 Vite 的快速构建
- 🎯 零代码配置，只需修改 config.ts
- 🚀 支持 Vercel、Cloudflare Pages、Netlify 部署

---

<div align="center">

### Star This Repo If You Like It!

Made with love by the Open Source Community

[![GitHub stars](https://img.shields.io/github/stars/chenyibai9527/Open-Bio-Template?style=social)](https://github.com/chenyibai9527/Open-Bio-Template)
[![GitHub forks](https://img.shields.io/github/forks/chenyibai9527/Open-Bio-Template?style=social)](https://github.com/chenyibai9527/Open-Bio-Template/fork)

[Report Bug](https://github.com/chenyibai9527/Open-Bio-Template/issues) · [Request Feature](https://github.com/chenyibai9527/Open-Bio-Template/issues)

</div>
