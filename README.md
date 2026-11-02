# Shrek Wang · 个人网站

纯静态网站，无需安装依赖或构建。双击 `index.html` 即可打开。

站点地址：https://shrekwang-netizen.github.io/personal-site/

## 页面

- `index.html`：海报首页、插画导航、明暗切换。
- `about.html`：个人介绍与联系方式。
- `onclock.html`：岗位简介与 AIFLOW 入口。
- `offclock.html`：鸡尾酒笔记、搜索与音乐。

## 修改内容和样式

主要内容在 `data.js`：`SITE` 个人资料及邮箱、微信、`ABOUT` 介绍、`JOBS` 岗位、`FEATURED_SITE` 站点入口、`COCKTAILS` 酒单笔记、`SPOTIFY` 专辑。它是 JavaScript 文件，编辑时保留引号和逗号。栏目标题、按钮与元描述还需在对应 HTML 或 `assets/app.js` 中修改。

`assets/theme.css` 管理全站配色、字体和通用组件，颜色变量位于文件开头；`assets/home.css` 管理首页构图。`assets/theme-mode.js` 控制明暗切换。字体已随项目打包。

首页默认字标与副标题使用 SVG 路径。修改 `SITE.title` 或 `SITE.hero.subtitle` 后，会自动切换为本地字体排版。插画源文件为 `assets/doodles.svg`，各页内联符号以支持直接打开 HTML；改插画时需同步相应符号。

## 预览与发布

在项目目录运行：

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

访问 `http://127.0.0.1:8765`。按 `Ctrl+C` 停止。也可直接双击 HTML 文件。

GitHub Pages 使用 `main` 分支的根目录发布。推送更新后自动重新部署。`.gitignore` 只收录当前站点需要的文件；本地存档、笔记和未使用的图片不提交。
