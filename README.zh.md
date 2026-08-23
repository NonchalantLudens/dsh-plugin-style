# dsh-skin-collection

[![npm version](https://img.shields.io/npm/v/dsh-skin-collection)](https://www.npmjs.com/package/dsh-skin-collection)
[![license](https://img.shields.io/npm/l/dsh-skin-collection)](./LICENSE)
[![dsh-plugin](https://img.shields.io/badge/topic-dsh--plugin-blue)](https://github.com/topics/dsh-plugin)

[DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)（dsh）Web 界面的多风格皮肤合集。每个皮肤注册一套主题外加作用域装饰 CSS；侧边栏选择器独立管理皮肤与基础配色——选「默认样式」即完全恢复原生外观。

[English](./README.md) | 简体中文

## 皮肤一览

| 主题 id | 风格 | 明暗 | 招牌效果 |
|---|---|---|---|
| `wabi-sabi` | Wabi-Sabi 侘寂 | 浅 | 大地色系、纸纹颗粒、衬线字体、图片 sepia、圆相（Enso）启动淡出、朱红 DSH 印章 Logo |
| `terminal` | Terminal 终端 | 暗 | 虚空黑底磷光绿、VT323 等宽、CRT 扫描线 + 文字辉光、方块滚动条 |
| `cyberpunk` | Cyberpunk 赛博朋克 | 暗 | 青/品红/酸性绿霓虹、Space Grotesk、扫描线、切角图片 |
| `film-noir` | Film Noir 黑色电影 | 暗 | 明暗对照暗角、胶片颗粒、Oswald 标题 + 打字机正文、黑白照片悬停复色 |
| `swiss` | Swiss 国际主义 | 浅 | 米白网格、Inter 黑体大写标题、瑞士红强调、直角 |
| `bauhaus` | Bauhaus 包豪斯 | 浅 | 红黄蓝三原色扁平几何、Jost 字体、无阴影、红色滚动条 |
| `brutalism` | Brutalism 野性主义 | 浅 | 4px 黑边框、8px 硬阴影、警示黄色块、颗粒覆盖 |
| `dark-glass` | Dark Glass 暗黑玻璃 | 暗 | 深海军蓝 + 蓝/紫/青氛围光晕、毛玻璃代码块 |
| `pixel-retro` | Pixel Retro 像素复古 | 暗 | 靛蓝街机、Press Start 2P 像素标题、CRT 扫描线 + 暗角、像素投影 |

风格来源：[uiprompt.dev web-styles](https://www.uiprompt.dev/zh/web-styles) 的设计提示词；每个皮肤把提示词中的调色板映射为 `--dsw-alias-*` 令牌，招牌效果落地为作用域 CSS。

## 工作原理

- **皮肤 ≠ 主题偏好**。官方 ThemeRuntime 只持久化 `light/dark/system`；把皮肤 id 存进去会在每次设置保存或模式切换时回退。本插件用自有的持久化标记驱动 `body[data-dsh-skin-<id>]` 属性——没有任何自动路径能撤销它。
- **配色随属性走**：每个皮肤的 `--dsw-alias-*` 令牌同时以普通 CSS 形式输出到该属性上，客户端插件树重建后依然生效。
- **基础配色独立**：跟随系统 / 浅色 / 深色 只切换皮肤之下的底色方案。
- 在官方 **设置 → 外观** 里选择的皮肤 id 会被自动收编。

## 安装

```sh
# 从 npm
dsh plugin --profile web add dsh-skin-collection

# 或直接从 GitHub（lib/ 为预构建产物，安装时不执行任何构建脚本）
dsh plugin --profile web add github:NonchalantLudens/dsh-client-ui-skins
```

重启 `dsh web`。侧边栏底部的「皮肤」按钮负责切换；「默认样式」恢复原生外观。皮肤同样出现在 设置 → 外观 下拉里。

安装期零代码执行：包内全部是预构建产物，未声明任何构建脚本。

## 目录结构

- `lib/client.js` — 客户端产物，加载器闭包工厂格式（手写维护；纯 CSS/DOM 皮肤无需构建链）
- `lib/index.js` — Node 半边（no-op cordis 插件桩）
- `src/client/index.ts`、`src/skins/` — 可读源码留档，与 `lib/` 保持同步
- `cordis.patch.yml` — 安装时把插件插入 web roster

## 新增皮肤

1. 在 `lib/client.js` 的 `EXTRA_SKINS` 里追加条目（`id`、`label`、`theme.tokens`、可选 Google Fonts `imports`、作用域 `css`）。
2. 即可——注册、选择器菜单、调色板输出与属性守卫全部数据驱动。
3. 升版本号后重装。

注意：所有皮肤的 Google Fonts `@import` 会提升到合并样式表顶部（CSS 要求 `@import` 先于其它规则）；请把字体地址放进皮肤的 `imports` 数组，不要写进 CSS 正文。

## 许可

[MIT](./LICENSE)
