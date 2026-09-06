import { routePoints, type RoutePoint } from './routes';
import { hotels, foods } from './trip';
import type { MapPlace } from '../components/places-map';

const extraPoints: Record<string, RoutePoint> = {
  shinshin: {
    name: 'Shin Shin · 博多 DEITOS 店',
    query: 'Shin Shin 博多デイトス店',
    lat: 33.5908592,
    lng: 130.41991,
    source: 'https://map.yahoo.co.jp/v3/place/xPWJca92Dfg',
  },
  hirao: {
    name: '平尾 · ACROS 福冈店',
    query: '天麩羅処ひらお アクロス店',
    lat: 33.5911061,
    lng: 130.4022578,
    source: 'https://www.hirao-foods.net/shop/shop7/',
  },
  ritz: {
    name: 'The Ritz-Carlton, Fukuoka',
    query: 'ザ・リッツ・カールトン福岡',
    lat: 33.5896572,
    lng: 130.3948037,
    source:
      'https://www.ritzcarlton.com/en/hotels/fukrz-the-ritz-carlton-fukuoka/overview/',
  },
  onefukuoka: {
    name: 'ONE FUKUOKA HOTEL',
    query: 'ONE FUKUOKA HOTEL 天神',
    lat: 33.5907945,
    lng: 130.399842,
    source: 'https://www.openstreetmap.org/way/178497725',
  },
  kamenoi: {
    name: '龟之井别庄',
    query: '亀の井別荘 由布院',
    lat: 33.2660363,
    lng: 131.36834,
    source: 'https://www.kamenoi-bessou.jp/staticpages/index.php/access_ja',
  },
  murata: {
    name: '山庄无量塔',
    query: '山荘 無量塔 由布院',
    lat: 33.2757787,
    lng: 131.369751,
    source: 'https://www.openstreetmap.org/node/9892438595',
  },
  intercontinental: {
    name: 'ANA InterContinental Beppu',
    query: 'ANAインターコンチネンタル別府リゾート＆スパ',
    lat: 33.3181273,
    lng: 131.4608113,
    source: 'https://anaicbeppu.com/access/',
  },
};
const points: Record<string, RoutePoint> = {
  ...routePoints,
  ...extraPoints,
  'itsuki-dinner': routePoints.itsuki,
  'sora-dining': routePoints.suginoi,
};
export const alternativeHotels = [
  {
    id: 'ritz',
    city: '福冈',
    name: 'The Ritz-Carlton, Fukuoka',
    jp: 'ザ・リッツ・カールトン福岡',
    note: '天神、大名一侧；从博多站出发需另作接驳。',
    url: extraPoints.ritz.source,
  },
  {
    id: 'onefukuoka',
    city: '福冈',
    name: 'ONE FUKUOKA HOTEL',
    jp: 'ONE FUKUOKA HOTEL',
    note: '天神站直结，位于 ONE FUKUOKA BLDG. 18–19 层。',
    url: 'https://onefukuokahotel.jp/access/',
  },
  {
    id: 'kamenoi',
    city: '由布院',
    name: '龟之井别庄',
    jp: '亀の井別荘',
    note: '金鳞湖畔，比较房型温泉、餐饮套餐与儿童入住条件。',
    url: 'https://www.kamenoi-bessou.jp/',
  },
  {
    id: 'murata',
    city: '由布院',
    name: '山庄无量塔',
    jp: '山荘 無量塔',
    note: '由布院山坡一侧，抵达、离开时安排车辆接送。',
    url: 'https://sansou-murata.com/',
  },
  {
    id: 'intercontinental',
    city: '别府',
    name: 'ANA InterContinental Beppu Resort & Spa',
    jp: 'ANAインターコンチネンタル別府リゾート＆スパ',
    note: '别府山间度假备选；按具体套餐核对儿童与设施权益。',
    url: 'https://anaicbeppu.com/',
  },
];
export const hotelMapPlaces: MapPlace[] = [
  ...hotels.map((h, i) => ({
    ...points[h.id],
    id: h.id,
    name: h.name,
    query: h.jp,
    city: h.city,
    number: 'H' + (i + 1),
    detailId: 'hotel-' + h.id,
    note:
      h.id === 'suginoi' ? '杉乃井园区位置 · 入住请选择宙館入口' : h.address,
  })),
  ...alternativeHotels.map((h, i) => ({
    ...points[h.id],
    id: h.id,
    name: h.name,
    query: h.jp,
    city: h.city,
    number: 'A' + (i + 1),
    detailId: 'hotel-' + h.id,
    alternative: true,
    note: h.note,
  })),
];
export const foodMapPlaces: MapPlace[] = foods.map((f, i) => ({
  ...points[f.id],
  id: f.id,
  name: f.name,
  query: f.query,
  city: f.city,
  number: String(i + 1).padStart(2, '0'),
  detailId: 'food-' + f.id,
  note:
    f.id === 'shinshin'
      ? '博多 DEITOS 2F · 博多めん街道'
      : f.id === 'hirao'
        ? 'ACROS 福冈地下 2F'
        : f.id === 'sora-dining'
          ? '宙館内餐厅 · 地图标注杉乃井园区'
          : f.dish,
}));
