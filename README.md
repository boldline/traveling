# Traveling · 旅行地图

用真实世界地图整理旅行计划。从首页的福冈标记进入日本九州亲子行程，查看每日路线、酒店、美食、交通和行前信息。

## 页面

- `/`：世界地图总览，可缩放、定位福冈并打开日本行程。
- `/japan/`：2026 年 9 月 25 日至 10 月 1 日的福冈、由布院、别府 7 天 6 晚亲子旅行手册。

日本页面包含每日真实地图、8 家酒店（含备选）、13 个美食地点、21 张带来源的实景照片、固定导航及手机快捷导航。

## 目录

```text
app/                    网站路由与总览页
  japan/                日本行程的路由入口
components/             世界地图组件
japan/                  原九州旅行网站的内容与组件
  app/                  日本页面与样式
  components/           每日地图、地点地图、照片、导航及 UI 组件
  hooks/                页面使用的 React hooks
  lib/                  行程、坐标、照片来源等数据
  public/               日本页面的图片与图标源文件
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

打开终端显示的本地地址。进入 `/japan/` 查看日本行程。启动前会自动把 `japan/public/` 同步到 `public/japan/`。

```bash
npm run typecheck
npm run build
npm run preview
```

静态构建产物位于 `dist/client/`。静态托管时上传该目录，保留 `/japan/` 和 `/_next/` 目录结构。地图底图与外部导航需要联网。

构建完成后会检查首页、日本页面及 21 张照片，并生成 `japan/index.html`，确保静态托管可以直接访问 `/japan/`。

## 修改内容

- 行程与吃住行：`japan/lib/trip.ts`
- 每日地图的坐标与顺序：`japan/lib/routes.ts`
- 酒店、美食地图：`japan/lib/place-data.ts`
- 照片、图注与来源：`japan/lib/place-photos.json` 和 `japan/public/places/`
- 世界地图的目的地：`components/world-map.tsx`

增加其他国家时，新建对应国家目录与 `app/` 路由，再添加世界地图标记。

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

照片逐项注明来源与原始链接；图片版权归相应权利人，未将其视为开放授权图库。详见 `japan/lib/place-photos.json`。
