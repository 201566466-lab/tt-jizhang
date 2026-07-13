# TT日常记账 iOS 版

基于 Cordova 打包的 iOS 应用，将网页版记账工具转换为原生 IPA。

## 项目结构

```
.
├── www/                    # 网页资源
│   ├── index.html         # 主页面
│   ├── css/               # 样式文件
│   ├── js/                # JavaScript
│   ├── icons/             # 应用图标
│   └── sounds/            # 音效文件
├── config.xml             # Cordova 配置
├── package.json           # Node.js 依赖
└── .github/workflows/     # GitHub Actions 自动构建
```

## 自动构建

本项目使用 GitHub Actions 自动构建 IPA：

1. 推送代码到 GitHub
2. Actions 会自动在 macOS 上构建
3. 构建完成后可在 Releases 下载 IPA

## 手动构建

```bash
# 安装依赖
npm install -g cordova
npm install

# 添加 iOS 平台
cordova platform add ios

# 构建
cordova build ios --release --device
```

## 安装到越狱设备

1. 下载 IPA 文件
2. 使用 TrollStore、Filza 或 AltStore 安装
3. 无需签名，直接安装即可使用

## 注意事项

- 此 IPA 未签名，仅适用于越狱设备
- 支持 iOS 14.0+
- 竖屏显示，适配 iPhone
