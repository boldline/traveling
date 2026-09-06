/** Positions verified against OSM objects and venue map links on 2026-09-06.
 * Map lines express stop order only; they are not road or rail routing geometry. */
export type RoutePoint = {
  name: string;
  query: string;
  lat: number;
  lng: number;
  source: string;
};
export type RouteStop = {
  id: string;
  note?: string;
  optional?: boolean;
  mode?: 'train';
};
export type DayRoute = { title: string; note: string; stops: RouteStop[] };
export const routePoints: Record<string, RoutePoint> = {
  mentai: {
    name: '元祖博多明太重 · 西中洲',
    query: '元祖博多めんたい重 西中洲',
    lat: 33.5912518,
    lng: 130.4041125,
    source: 'https://fan7000.gorp.jp/',
  },
  miyako: {
    name: '都酒店博多',
    query: '都ホテル 博多',
    lat: 33.5896582,
    lng: 130.4227959,
    source: 'https://www.openstreetmap.org/node/792896230',
  },
  hakata: {
    name: '博多站',
    query: '博多駅',
    lat: 33.5900413,
    lng: 130.4199026,
    source: 'https://www.openstreetmap.org/way/72653571',
  },
  issou: {
    name: '博多一双 · 本店',
    query: '博多一双',
    lat: 33.5863665,
    lng: 130.4251099,
    source: 'https://www.openstreetmap.org/node/4274752291',
  },
  kushida: {
    name: '櫛田神社',
    query: '櫛田神社 福岡',
    lat: 33.59307,
    lng: 130.4106837,
    source: 'https://www.openstreetmap.org/way/45779975',
  },
  canal: {
    name: '博多运河城',
    query: 'キャナルシティ博多',
    lat: 33.5896715,
    lng: 130.411141,
    source: 'https://www.openstreetmap.org/way/751001483',
  },
  toriden: {
    name: 'とり田 · 博多本店',
    query: 'とり田 博多',
    lat: 33.5960002,
    lng: 130.4059236,
    source: 'https://www.openstreetmap.org/node/5030004322',
  },
  nakasu: {
    name: '中洲',
    query: '中洲 福岡',
    lat: 33.5934757,
    lng: 130.4056216,
    source: 'https://www.openstreetmap.org/relation/19383249',
  },
  marine: {
    name: 'Marine World',
    query: 'マリンワールド海の中道',
    lat: 33.661407,
    lng: 130.36335,
    source: 'https://www.openstreetmap.org/node/1423776966',
  },
  parkarea: {
    name: '海之中道海滨公园',
    query: 'Uminonakamichi Seaside Park',
    lat: 33.6626271,
    lng: 130.3557112,
    source: 'https://www.openstreetmap.org/relation/15512029',
  },
  yufu: {
    name: '由布院站',
    query: '由布院駅',
    lat: 33.2626128,
    lng: 131.3551264,
    source: 'https://www.openstreetmap.org/way/411437588',
  },
  shin: {
    name: '由布釜饭 心 · 站前店',
    query: '由布まぶし 心 由布院駅前店',
    lat: 33.2630538,
    lng: 131.3556233,
    source: 'https://www.openstreetmap.org/node/5284610023',
  },
  kinrin: {
    name: '金鳞湖',
    query: '金鱗湖',
    lat: 33.2667196,
    lng: 131.3690386,
    source: 'https://www.openstreetmap.org/way/162781794',
  },
  safari: {
    name: 'African Safari',
    query: 'アフリカンサファリ',
    lat: 33.3539976,
    lng: 131.4114362,
    source: 'https://www.openstreetmap.org/way/484154154',
  },
  suginoi: {
    name: '杉乃井酒店',
    query: '杉乃井ホテル 宙館',
    lat: 33.2841003,
    lng: 131.4728661,
    source: 'https://www.openstreetmap.org/way/1079488682',
  },
  umi: {
    name: '海地狱',
    query: '海地獄',
    lat: 33.3158884,
    lng: 131.4696829,
    source: 'https://www.openstreetmap.org/way/417893209',
  },
  kamado: {
    name: '灶地狱',
    query: 'かまど地獄',
    lat: 33.3164456,
    lng: 131.4724531,
    source: 'https://www.openstreetmap.org/way/417446108',
  },
  steam: {
    name: '地狱蒸工房 铁轮',
    query: '地獄蒸し工房 鉄輪',
    lat: 33.3154574,
    lng: 131.4762027,
    source: 'https://www.openstreetmap.org/node/5195225021',
  },
  okamoto: {
    name: '岡本屋卖店',
    query: '岡本屋売店',
    lat: 33.318009,
    lng: 131.4527236,
    source: 'https://www.openstreetmap.org/way/364712573',
  },
  amami: {
    name: '甘味茶屋 · 别府店',
    query: '甘味茶屋 別府',
    lat: 33.3105721,
    lng: 131.4866423,
    source: 'https://www.openstreetmap.org/way/364631871',
  },
  tenjin: {
    name: '天神',
    query: '天神 福岡',
    lat: 33.5903225,
    lng: 130.3998391,
    source: 'https://www.openstreetmap.org/node/3555317380',
  },
  onishi: {
    name: '鬼石坊主地狱',
    query: '鬼石坊主地獄',
    lat: 33.3153898,
    lng: 131.4700547,
    source: 'https://www.openstreetmap.org/way/219982795',
  },
  shiraike: {
    name: '白池地狱',
    query: '白池地獄',
    lat: 33.3153269,
    lng: 131.4741443,
    source: 'https://www.openstreetmap.org/way/412898359',
  },
  itsuki: {
    name: '由布院别邸 树',
    query: '由布院別邸 樹',
    lat: 33.264563,
    lng: 131.365673,
    source: 'https://bettei-itsuki.jp/access/',
  },
  beppu: {
    name: '别府站',
    query: '別府駅 大分',
    lat: 33.2796163,
    lng: 131.5003073,
    source: 'https://www.openstreetmap.org/node/8269550070',
  },
  kamesho: {
    name: '亀正回转寿司',
    query: '亀正くるくる寿司 別府',
    lat: 33.3121035,
    lng: 131.4841652,
    source: 'https://www.openstreetmap.org/way/364660591',
  },
  yamanaka: {
    name: 'やま中 · 博多店',
    query: '博多もつ鍋 やま中 博多店',
    lat: 33.5887907,
    lng: 130.4236257,
    source: 'https://motsunabe-yamanaka.com/en/hakata/',
  },
  airport: {
    name: '福冈机场 · 国际航站楼',
    query: '福岡空港 国際線ターミナル',
    lat: 33.58495,
    lng: 130.44472,
    source: 'https://www.openstreetmap.org/way/164790583',
  },
};
export const dayRoutes: DayRoute[] = [
  {
    title: '国际航站楼 → 博多 → 旧城 → 回酒店',
    note: '显示抵达后的福冈当地路线；香港出发航段未绘制。',
    stops: [
      { id: 'airport', note: '国际线抵达' },
      { id: 'miyako', note: '放下行李' },
      { id: 'issou', note: '午餐' },
      { id: 'kushida', note: '下午散步' },
      { id: 'canal', note: '博多运河城' },
      { id: 'toriden', note: '晚餐需预约' },
      { id: 'nakasu', note: '饭后散步', optional: true },
      { id: 'miyako', note: '回酒店' },
    ],
  },
  {
    title: '博多 → 海之中道 → 博多',
    note: 'JR 在香椎换乘；地图铁路连线仅表达出行方向。公园标记为园区位置。',
    stops: [
      { id: 'miyako', note: '酒店出发' },
      { id: 'hakata', note: '乘坐 JR' },
      { id: 'marine', note: '经香椎换乘后，海之中道站下车步行', mode: 'train' },
      { id: 'parkarea', note: '天气和体力允许再去', optional: true },
      { id: 'hakata', note: 'JR 返回博多', mode: 'train' },
      { id: 'yamanaka', note: '晚餐候选', optional: true },
      { id: 'miyako', note: '回酒店' },
    ],
  },
  {
    title: '博多 → 由布院 → 金鳞湖 → 私汤旅馆',
    note: '跨城图缩放后可查看由布院步行段；点击下面的地点可直接放大。',
    stops: [
      { id: 'miyako', note: '退房' },
      { id: 'hakata', note: '09:17 计划发车' },
      { id: 'yufu', note: '11:31 计划抵达', mode: 'train' },
      { id: 'shin', note: '站前店午餐' },
      { id: 'kinrin', note: '沿汤之坪街道慢逛' },
      { id: 'itsuki', note: '15:00 左右入住；晚餐在旅馆' },
    ],
  },
  {
    title: '由布院 → African Safari → 杉乃井',
    note: '全天包车接送；Safari 与杉乃井标记为园区位置，入口及宙馆前台请用导航确认。',
    stops: [
      { id: 'itsuki', note: '07:45–08:00 计划出发' },
      { id: 'safari', note: '先购买当天 Jungle Bus' },
      { id: 'suginoi', note: '宙馆入住 → 玩水 → SORA 晚餐' },
    ],
  },
  {
    title: '杉乃井 → 铁轮地热 → 明礬 → 杉乃井',
    note: '金色标记为可省略或需确认的停靠；已含酒店晚餐时，晚间外食可取消。',
    stops: [
      { id: 'suginoi', note: '早餐后出发' },
      { id: 'umi', note: '海地狱为优先' },
      { id: 'onishi', note: '泥浆泡，按兴趣加选', optional: true },
      { id: 'kamado', note: '灶地狱' },
      { id: 'shiraike', note: '按体力加选', optional: true },
      { id: 'steam', note: '地狱蒸午餐' },
      { id: 'okamoto', note: '明礬布丁，需额外乘车', optional: true },
      { id: 'suginoi', note: '15:00 后回酒店休息' },
      {
        id: 'kamesho',
        note: '营业和取号需确认；也可改甘味茶屋',
        optional: true,
      },
      { id: 'suginoi', note: '回酒店' },
    ],
  },
  {
    title: '别府 → 博多 → 天神 → 回酒店',
    note: '长段虚线代表 Sonic 方向，不是铁路轨迹；放大查看两端的市内安排。',
    stops: [
      { id: 'suginoi', note: '早餐、退房' },
      { id: 'amami', note: '午餐；赶车时改车站周边', optional: true },
      { id: 'beppu', note: '乘坐特急 Sonic' },
      { id: 'hakata', note: '约两小时到达，按所订班次', mode: 'train' },
      { id: 'miyako', note: '入住、放下行李' },
      { id: 'tenjin', note: '天神与大名购物' },
      { id: 'mentai', note: '晚餐候选；也可改寿司或烤肉', optional: true },
      { id: 'miyako', note: '晚餐后回酒店' },
    ],
  },
  {
    title: '都酒店 → 博多站 → 机场国际航站楼',
    note: '本图显示福冈离境前的当地路线。之后飞香港，再按已订方式前往深圳；跨境接驳终点尚未确定。',
    stops: [
      { id: 'miyako', note: '早餐、退房' },
      { id: 'hakata', note: '时间允许时最后采购', optional: true },
      { id: 'airport', note: '留足值机时间，认准国际航站楼' },
    ],
  },
];
