# 🚀 GitHub Pages 部署检查清单

## ✅ 部署前检查

### 1. 代码完整性
- [ ] 所有图片路径已更新为使用 `assetUrls` 工具函数
- [ ] 没有硬编码的绝对路径 `/image.png`
- [ ] manifest 文件路径已修正
- [ ] Vite 配置中的基础路径设置正确

### 2. 本地测试
- [ ] `npm run build` 成功完成
- [ ] `npm run preview` 正常显示所有图片
- [ ] 所有三个主题（Retro、MacOS、Linux）的图片都显示正常
- [ ] 终端图标、项目图标、关于图标、邮件图标、文件夹图标都正确加载

### 3. 构建验证
- [ ] 构建输出包含正确的图片路径：`/Open-Bio-Template/*.png`
- [ ] 所有 PNG 文件都被复制到 `dist/` 目录
- [ ] JavaScript 文件中包含正确的图片引用

## 🔄 部署步骤

### 1. 提交代码
```bash
git add .
git commit -m "Fix GitHub Pages static asset paths"
git push origin main
```

### 2. 等待部署
- [ ] GitHub Actions 工作流成功完成
- [ ] 没有构建错误
- [ ] 部署状态显示成功

### 3. 验证部署
访问 `https://[username].github.io/[repository-name]/` 并检查：

#### 🎨 主题验证
- [ ] **Retro 主题**: 终端启动界面图片正常显示
- [ ] **MacOS 主题**: Finder 图标、文件夹图标、关于图标正常显示
- [ ] **Linux 主题**: 终端图标、项目图标正常显示

#### 📸 具体图片验证
- [ ] `/terminal.png` - 终端应用图标
- [ ] `/projects.png` - 项目应用图标
- [ ] `/about.png` - 关于应用图标
- [ ] `/mail.png` - 邮件应用图标
- [ ] `/folders.png` - 文件夹图标（MacOS 主题）
- [ ] `/preferences.png` - 设置应用图标
- [ ] `/apple-logo.png` - Apple 图标（MacOS 主题）

#### 🔍 浏览器开发者工具验证
- [ ] 打开浏览器开发者工具 (F12)
- [ ] 切换到 Network 标签页
- [ ] 刷新页面
- [ ] 确认所有 PNG 文件加载状态为 200
- [ ] 没有 404 错误

## 🐛 常见问题快速修复

### 问题：图片显示为破损图标
**解决方案**：
1. 检查浏览器控制台是否有 404 错误
2. 验证图片 URL 是否包含 `/Open-Bio-Template/` 前缀
3. 确认图片文件存在于 `dist/` 目录

### 问题：某些主题图片不显示
**解决方案**：
1. 切换到不同主题测试
2. 检查该主题特有的图片文件是否存在
3. 验证代码中该主题的图片引用是否正确

### 问题：本地正常但 GitHub Pages 不正常
**解决方案**：
1. 清除浏览器缓存
2. 检查 GitHub Pages 设置是否正确
3. 验证部署分支是否正确

## 📊 成功指标

✅ **所有图片正常显示**：无破损图标，无 404 错误  
✅ **所有主题正常工作**：Retro、MacOS、Linux 主题切换正常  
✅ **响应式设计**：在不同屏幕尺寸下图片显示正常  
✅ **性能良好**：图片加载速度快，无延迟  

## 🎯 最终验证

完成部署后，请在 GitHub Pages 站点上测试以下功能：

1. **主题切换**：点击主题切换器，确认所有主题图片都正常
2. **应用启动**：点击各个应用图标，确认图标显示正常
3. **窗口操作**：打开窗口，确认窗口内图标正常
4. **响应式**：在手机和平板上测试图片显示

## 📞 获取帮助

如果部署后仍有问题：
1. 检查 [GitHub Pages Assets Guide](GITHUB_PAGES_ASSETS_GUIDE.md)
2. 查看浏览器开发者工具中的 Network 标签
3. 在 GitHub Issues 中报告具体问题，包含：
   - 浏览器控制台错误截图
   - 具体的 404 错误 URL
   - 部署仓库名称

---

**🎉 部署成功！** 你的 OpenBio Template 现在应该在 GitHub Pages 上完美运行了！