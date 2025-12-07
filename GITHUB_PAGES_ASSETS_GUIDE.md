# GitHub Pages 静态资源部署指南

## 问题描述

在 GitHub Pages 部署中，图片资源（PNG、ICO 等）无法正常显示，尽管在本地预览时工作正常。

## 根本原因

GitHub Pages 部署时，项目的基础路径包含仓库名称（例如 `/Open-Bio-Template/`），而代码中的图片路径使用了绝对路径（例如 `/terminal.png`），导致资源请求被发送到错误的 URL。

## 解决方案

### ✅ 已实施的修复

1. **创建工具函数** (`utils/assetPaths.ts`):
   ```typescript
   export const getAssetUrl = (path: string): string => {
     const baseUrl = import.meta.env.BASE_URL || '/';
     const cleanPath = path.startsWith('/') ? path.slice(1) : path;
     return baseUrl.endsWith('/') ? `${baseUrl}${cleanPath}` : `${baseUrl}/${cleanPath}`;
   };
   ```

2. **更新所有图片引用** (`components/Desktop.tsx`):
   - 使用 `assetUrls.terminal` 替代 `/terminal.png`
   - 使用 `assetUrls.projects` 替代 `/projects.png`
   - 使用 `assetUrls.about` 替代 `/about.png`
   - 使用 `assetUrls.mail` 替代 `/mail.png`
   - 使用 `assetUrls.folders` 替代 `/folders.png`
   - 使用 `assetUrls.preferences` 替代 `/preferences.png`

3. **修复 manifest 文件** (`public/site.webmanifest`):
   - 将 `/android-chrome-192x192.png` 改为 `android-chrome-192x192.png`
   - 将 `/android-chrome-512x512.png` 改为 `android-chrome-512x512.png`

### 🔧 Vite 配置

确保 `vite.config.ts` 正确设置了基础路径：
```typescript
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    let base = '/';
    if (mode === 'production') {
      base = env.VITE_BASE_PATH || '/Open-Bio-Template/';
    }
    return {
      base: base,
      // ... 其他配置
    };
});
```

### 🚀 GitHub Actions 工作流

确保工作流正确传递了基础路径：
```yaml
- name: Build
  run: npm run build
  env:
    VITE_BASE_PATH: '/${{ github.event.repository.name }}/'
```

## 验证步骤

### 1. 本地构建验证
```bash
npm run build
```

### 2. 检查构建输出
构建后的 JavaScript 文件应该包含正确的路径：
```bash
strings dist/assets/*.js | grep "/Open-Bio-Template/" | head -5
```

期望输出：
```
/Open-Bio-Template/terminal.png
/Open-Bio-Template/projects.png
/Open-Bio-Template/about.png
/Open-Bio-Template/mail.png
/Open-Bio-Template/folders.png
```

### 3. 本地预览验证
```bash
npm run preview
```
访问 `http://localhost:4173/Open-Bio-Template/` 检查图片是否正常显示。

### 4. GitHub Pages 验证
- 推送代码到主分支
- 等待 GitHub Actions 完成部署
- 访问 `https://[username].github.io/[repository-name]/`
- 检查所有主题下的图片是否正常显示

## 常见问题排查

### ❌ 图片仍然不显示
1. **检查浏览器控制台**: 查看 404 错误的具体路径
2. **验证文件存在**: 确保 `dist/` 目录中包含所有图片文件
3. **检查路径大小写**: GitHub Pages 区分大小写
4. **清除浏览器缓存**: 强制刷新页面 (Ctrl+Shift+R)

### ❌ 构建路径不正确
1. **检查仓库名称**: 确保 `github.event.repository.name` 正确
2. **验证环境变量**: 检查 `VITE_BASE_PATH` 是否正确传递
3. **手动设置路径**: 在 `vite.config.ts` 中硬编码正确的路径

### ❌ 本地正常但 GitHub Pages 不正常
1. **检查 GitHub Pages 设置**: Settings → Pages → Source 设置为 GitHub Actions
2. **验证部署分支**: 确保部署到正确的分支
3. **检查 Actions 日志**: 查看构建过程是否有错误

## 成功指标

✅ **构建输出包含正确路径**: `/Open-Bio-Template/*.png`
✅ **本地预览正常**: 所有图片在 `npm run preview` 下显示
✅ **GitHub Pages 正常**: 所有图片在部署后显示
✅ **所有主题**: Retro、MacOS、Linux 主题下的图片都正常
✅ **所有图片类型**: PNG 图标、ICO 图标都正确加载

## 总结

通过使用 Vite 的 `import.meta.env.BASE_URL` 和创建工具函数，我们确保了所有静态资源路径都能正确适配 GitHub Pages 的基础路径要求。这个解决方案既适用于开发环境，也适用于生产部署。