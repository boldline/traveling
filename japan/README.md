# 日本 · 九州亲子旅行

2026-09-25 至 2026-10-01，福冈 → 由布院 → 别府 → 福冈，7 天 6 晚。

本目录保存原旅行网站的页面、固定导航、每日地图、酒店和美食地图、21 张实景照片及来源。网站通过根目录 `app/japan/` 挂载到 `/japan/`；在仓库根目录运行 `npm ci` 和 `npm run dev`，无需在这里单独安装依赖。

- `app/page.tsx`：完整旅行手册。
- `lib/trip.ts`：每日安排、酒店、美食、交通及来源。
- `lib/routes.ts`：每日地图坐标与路线顺序。
- `lib/place-data.ts`：8 家酒店、13 个美食地点的地图数据。
- `lib/place-photos.json`：照片路径、图注、来源、权利信息。
- `public/`：照片和图标源文件，启动/构建时同步到根目录的 `public/japan/`。

坐标与资料核对日期：2026-09-06。照片为对应地点的实景或料理示例，版权与来源见照片清单。`public/kinrin-lake.jpg` 是保留的原横幅素材，当前页面没有使用；摄影为 Nagono，来自 Wikimedia Commons，许可 CC BY-SA 3.0（https://commons.wikimedia.org/wiki/File:Kinrin_Lake_-_panoramio.jpg）。
