# Traveling · 旅行地图

用真实世界地图整理旅行计划。从首页的福冈标记进入日本九州亲子行程，查看每日路线、酒店、美食、交通和行前信息。

## 页面

- `/`：世界地图总览，可缩放、定位福冈并打开日本行程。
- `/japan/`：日本目的地目录。
- `/japan/fukuoka/`：2026 年 9 月 25 日至 10 月 1 日的福冈、由布院、别府 7 天 6 晚亲子旅行手册。

日本页面包含每日真实地图、8 家酒店（含备选）、13 个美食地点、21 张带来源的实景照片、固定导航及手机快捷导航。

## GitHub Pages

- 世界地图：https://boldline.github.io/traveling/
- 日本目录：https://boldline.github.io/traveling/japan/
- 福冈攻略：https://boldline.github.io/traveling/japan/fukuoka/

使用公开仓库的免费 GitHub Pages 托管，网站可以公开访问。合并到 `main` 后，`.github/workflows/pages.yml` 会自动安装依赖、检查类型、构建并发布；PR 仅构建检查。发布进度见仓库 Actions，发布来源设置为 GitHub Actions。

工作流根据 GitHub Pages 的 `base_path` 自动配置链接、照片及脚本路径。本地模拟项目路径构建：

```bash
NEXT_PUBLIC_BASE_PATH=/traveling npm run build
NEXT_PUBLIC_BASE_PATH=/traveling npm run preview
```

原 Sites 构建无需设置这个环境变量，仍使用根路径。当前 Vinext `1.0.0-beta.5` 的预渲染请求遗漏 `basePath`，安装依赖时由 `scripts/patch-vinext-prerender.mjs` 应用精确兼容修复；升级该依赖时需重新评估并移除或更新补丁。

## 目录

```text
app/                    网站路由与总览页
  japan/                日本目的地目录
    fukuoka/            福冈攻略路由入口
components/             世界地图组件
japan/
  destinations.ts       日本目的地清单
  legacy-link.tsx        旧栏目书签跳转
  fukuoka/              福冈与九州攻略
    app/                页面与样式
    components/         每日地图、地点地图、照片、导航及 UI 组件
    hooks/              React hooks
    lib/                行程、坐标、照片来源等数据
    public/             福冈攻略的图片与图标源文件
scripts/                资源同步、静态导出检查与预览服务
public/japan/           运行或构建前生成，不提交 Git
.openai/hosting.json     现有私人 Sites 网站配置
```

## 本地运行

需要 Node.js 22.13 或更高版本及 npm。

```bash
npm ci
npm run dev
```

打开终端显示的本地地址。进入 `/japan/` 查看目的地目录，进入 `/japan/fukuoka/` 查看福冈攻略。启动前会自动把每个城市的 `public/` 同步到 `public/japan/<城市>/`。

```bash
npm run typecheck
npm run build
npm run preview
```

静态构建产物位于 `dist/client/`。静态托管时上传该目录，保留 `/japan/` 和 `/_next/` 目录结构。地图底图与外部导航需要联网。

构建完成后会检查首页、日本目录、福冈攻略及 21 张照片，并生成各级 `index.html`，确保三级路径可以直接访问。

## 修改内容

- 行程与吃住行：`japan/fukuoka/lib/trip.ts`
- 每日地图的坐标与顺序：`japan/fukuoka/lib/routes.ts`
- 酒店、美食地图：`japan/fukuoka/lib/place-data.ts`
- 照片、图注与来源：`japan/fukuoka/lib/place-photos.json` 和 `japan/fukuoka/public/places/`
- 世界地图的目的地：`components/world-map.tsx`

新增日本目的地时，新建 `japan/<城市>/` 和 `app/japan/<城市>/` 路由，在 `japan/destinations.ts` 注册卡片数据，并将路由加入 `scripts/finalize-static.mjs` 的检查列表。每个城市的 `public/` 资源会自动同步。其他国家可以沿用同一层级结构。

旧的 `/japan/#journey` 等栏目书签会自动转到 `/japan/fukuoka/` 对应栏目；`/japan/` 本身现在展示日本目录。

## GitHub 个人账号

仓库属于 `boldline`。使用个人账号授权的 GitHub CLI 提交、推送及合并；在自己的终端中先安装 `gh`，再执行：

```bash
gh auth login --hostname github.com --git-protocol https --web
gh auth setup-git
gh api user --jq .login
```

确认输出为 `boldline` 后再推送。不要把密码、访问令牌或登录凭据写进仓库。Git 的提交署名与登录凭据是两回事；仅修改 `user.name` 不等于已登录。

## 技术与资料

React 19、TypeScript、Vinext / Vite、Leaflet、OpenStreetMap，以及原项目已有的 Shadcn / Base UI 组件。GitHub 保存源代码；现有 Sites 网址保留私人访问控制，GitHub 仓库的可见性不会改变该访问权限。

旅行资料核对日期为 2026-09-06。行程为建议，未代订机票、酒店、餐厅或门票；班次、营业时间和预订权益以运营方最新信息为准。每日地图连线表示行程顺序，并非精确道路或铁路轨迹。

照片逐项注明来源与原始链接；图片版权归相应权利人，未将其视为开放授权图库。详见 `japan/fukuoka/lib/place-photos.json`。
