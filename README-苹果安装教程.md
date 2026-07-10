# TT记账 - iOS IPA 构建说明

## 前提条件
- 已配置好 Capacitor（已完成）
- 一个 GitHub 账号（免费）
- 越狱 iPhone + Sideloadly 工具

---

## 第一步：上传到 GitHub

### 1.1 创建 GitHub 仓库
1. 打开 https://github.com 并登录（注册一个免费账号）
2. 点击右上角 **+** → **New repository**
3. 填写：
   - Repository name: `tt-jizhang`
   - 选择 **Public**（Public 仓库才能用免费的 macOS 构建机）
   - 不勾选 "Add a README file"（已有）
4. 点击 **Create repository**

### 1.2 本地上传到 GitHub
在命令行执行（把仓库地址替换成你实际的）：

```bash
cd "C:\Users\Administrator\Desktop\脚本项目\网页记账"
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/你的用户名/tt-jizhang.git
git push -u origin main
```

> 如果没有安装 Git，先安装：https://git-scm.com/download/win

---

## 第二步：自动构建 IPA

### 2.1 检查构建状态
1. 打开你的 GitHub 仓库页面
2. 点击 **Actions** 标签
3. 第一次会自动触发构建（因为有 workflow_dispatch）
4. 看到绿色的 ✅ 说明构建成功

### 2.2 下载 IPA 文件
1. 进入 **Actions** → 点击构建任务
2. 点击右侧 **Summary**
3. 找到 **TT-jizhang-ipa** 的 Artifacts
4. 点击 **Download** 下载压缩包

---

## 第三步：安装到 iPhone（Sideloadly）

### 3.1 下载 Sideloadly
- 官网：https://sideloadly.io/
- 下载 Windows 版本

### 3.2 安装 IPA
1. 用数据线连接 iPhone 到电脑
2. 打开 Sideloadly
3. 把下载的 `App.ipa` 拖入 Sideloadly
4. 输入你的 **Apple ID 邮箱**（仅用于签名，自签名免费）
5. 点击 **Start**
6. 等待完成，App 会出现在 iPhone 桌面上

---

## 注意事项

- **免费 Apple ID** 即可，无需付费开发者账号
- 7天内要重新签名（免费 Apple ID 的限制）
- 越狱 iPhone 可以用 **AppSync Unified** 绕过签名验证，实现永久免签名

---

## 文件说明

```
ios/                        ← Xcode 项目
  App/                      ← App 源码
    App.xcodeproj/          ← Xcode 项目文件
    App/                    ← App 资源
      public/              ← 网页文件（由 Capacitor 自动管理）
  ExportOptions.plist       ← IPA 导出配置
.github/workflows/          ← GitHub Actions 自动构建脚本
  ios-build.yml              ← iOS 构建流程
www/                        ← 打包用的网页文件
capacitor.config.json       ← Capacitor 配置
```
