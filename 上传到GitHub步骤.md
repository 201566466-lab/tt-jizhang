# 上传到 GitHub 并构建 IPA 步骤

## 方法一：使用 GitHub Desktop（推荐）

1. **下载 GitHub Desktop**
   - 访问 https://desktop.github.com/
   - 下载并安装

2. **登录 GitHub**
   - 打开 GitHub Desktop
   - 使用你的 GitHub 账号登录（201566466@qq.com）

3. **添加本地仓库**
   - File → Add local repository
   - 选择文件夹：`C:\Users\Administrator\Desktop\脚本项目\网页记账7.13-cordova`

4. **发布到 GitHub**
   - 点击 "Publish repository"
   - 仓库名称填写：`tt-tally-ios`
   - 选择 "Public" 或 "Private"
   - 点击 "Publish repository"

5. **等待自动构建**
   - 推送完成后，访问 https://github.com/你的用户名/tt-tally-ios/actions
   - 等待构建完成（约 5-10 分钟）

## 方法二：使用命令行

1. **在 GitHub 上创建仓库**
   - 访问 https://github.com/new
   - 仓库名称：`tt-tally-ios`
   - 不要勾选 "Initialize this repository with a README"
   - 点击 "Create repository"

2. **在本地执行以下命令**
   ```bash
   cd "C:\Users\Administrator\Desktop\脚本项目\网页记账7.13-cordova"
   git remote add origin https://github.com/你的用户名/tt-tally-ios.git
   git branch -M main
   git push -u origin main
   ```

3. **输入 GitHub 凭据**
   - 用户名：`201566466@qq.com`
   - 密码：使用 Personal Access Token（不是登录密码）

## 方法三：直接下载 IPA（备用方案）

如果你无法使用 GitHub Actions，我可以帮你准备一个本地构建脚本，你可以：

1. 找一台 Mac 电脑
2. 安装 Xcode 和 Cordova
3. 运行构建命令生成本地 IPA

## 构建完成后的下载

1. 访问 GitHub 仓库页面
2. 点击 "Actions" 标签
3. 等待最新的 workflow 运行完成（绿色勾号）
4. 点击 workflow 名称 → 找到 "Upload IPA" 步骤
5. 下载 IPA 文件

或者等 Actions 自动创建 Release：
- 访问仓库的 "Releases" 页面
- 下载最新的 IPA 文件

## 安装到越狱设备

1. 将 IPA 传输到 iPhone（通过 AirDrop、微信文件传输等）
2. 使用 TrollStore 或 Filza 安装
3. 安装完成后即可使用
