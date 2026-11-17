# stone · 个人网站

个人项目、文章与 Moments 的统一入口，方便从一页了解我在做什么、直接打开作品和继续阅读。

[访问网站](https://heystone.site/) · [阅读博客](https://blog.heystone.site/) · [游荡集](https://youdang.heystone.site/) · [English](#english)

## 从哪里开始

| 入口 | 内容 |
| --- | --- |
| 首页 | 项目介绍、作品体验、工具与文章入口 |
| Moments | 个人动态与媒体展示；写入依赖服务端认证和存储配置 |
| 独立博客 | AI 工具、工作流与个人实践；由另一个仓库维护 |
| 游荡集 | 非官方播客精读专题站，独立维护与发布 |

## 项目展示采用的当前名称

| 项目 | 当前展示与体验 |
| --- | --- |
| Product Quest · 产品经理大冒险 | 3D 开放群岛、蓝山调查与任务关联演出 |
| Daily Tree · 记忆森林 | 文字、图片与随记录生长的树；当前应用使用 Canvas |
| Word Universe · 词义星系 | 词汇星空、掌握度和可选 OpenAI 语义向量 |
| 铁证 IRONPROOF | 训练、营养、体重、数据回看与训练海报 |
| 哦莫日常 | 保留的单文件日常记录原型，AI 入口未配置 |
| 游荡集 | 播客精读、地图与人物作品索引 |
| Research Edition | 独立的 AI 产业长文与报告阅读入口 |

项目名称与描述以相应代码和明确的产品资料为依据。页面中的猎光累计数字已注明统计截止日期，是历史快照，不作为实时业务量。

## 本地开发

需要 Node.js 与 npm；当前 GitHub Actions 使用 Node.js 24。

```sh
git clone https://github.com/nuts-and-bytes/portfolio.git
cd portfolio
npm ci
npm run dev
```

打开 Vite 输出的本地地址。构建和预览：

```sh
npm run build
npm run preview
```

## 目录

- `src/pages/`：首页与 Moments 页面。
- `src/components/`：导航、项目展示与共用组件。
- `src/config.js`：博客和 GitHub Pages 项目链接。
- `api/`、`server/`：Moments 的认证、写入和存储逻辑。
- `public/brand/`：stone 字标与品牌素材；规范见 [BRAND.md](BRAND.md)。
- `tests/`：导航与 Moments 相关的 Node.js 测试。

## 发布与边界

`main` 推送会触发 [.github/workflows/deploy.yml](.github/workflows/deploy.yml) 的 GitHub Pages 构建发布。仓库也有 Vercel API 代码和配置；纯静态托管不能替代 Moments 服务端。演示网站可读与管理员可写是两项不同能力，凭据和私有配置不应提交到仓库。

这是个人网站源码。复制代码不会自动获得作者的 Moments 数据或服务配置。当前仓库没有独立 `LICENSE` 文件，代码许可与个人品牌素材使用范围待维护者明确。

## English

The stone personal website brings together projects, writing and Moments. [Visit the site](https://heystone.site/) or [read the blog](https://blog.heystone.site/).

For local development, run `npm ci` and `npm run dev`. Build with `npm run build`. Moments writes require separately configured authentication and server-side storage; static hosting alone does not supply that backend. This repository currently has no standalone LICENSE file.
