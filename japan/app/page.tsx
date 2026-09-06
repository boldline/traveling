'use client';
import Link from 'next/link';
import { useState, useSyncExternalStore } from 'react';
import TravelNavigation from '@/japan/components/travel-navigation';
import { SidebarProvider } from '@/japan/components/ui/sidebar';
import DayRouteMap from '@/japan/components/day-route-map';
import PlacesMap, { type MapFocus } from '@/japan/components/places-map';
import PlacePhoto from '@/japan/components/place-photo';
import {
  alternativeHotels,
  hotelMapPlaces,
  foodMapPlaces,
} from '@/japan/lib/place-data';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/japan/components/ui/tabs';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableCell,
  TableCaption,
  TableRow,
} from '@/japan/components/ui/table';
import {
  Compass,
  Globe2,
  CalendarDays,
  MapPin,
  ArrowUpRight,
  ArrowRight,
  TrainFront,
  BedDouble,
  Utensils,
  Backpack,
  Navigation,
  CloudRain,
  Info,
  Phone,
  Ticket,
  ChevronDown,
  Wallet,
  Check,
} from 'lucide-react';
import {
  days,
  hotels,
  foods,
  transfers,
  sources,
  verifiedDate,
  type Day,
} from '@/japan/lib/trip';
const map = (q: string) =>
  'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(q);
const directions = (from: string, to: string, mode = 'driving') =>
  'https://www.google.com/maps/dir/?api=1&origin=' +
  encodeURIComponent(from) +
  '&destination=' +
  encodeURIComponent(to) +
  '&travelmode=' +
  mode;
function Out({
  href,
  children,
  className = 'text-link',
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
      <ArrowUpRight size={15} />
    </a>
  );
}
function NavLink({
  query,
  label = '地图导航',
}: {
  query: string;
  label?: string;
}) {
  return (
    <Out href={map(query)}>
      <Navigation size={14} />
      {label}
    </Out>
  );
}
function DayView({ day, index }: { day: Day; index: number }) {
  const hotel = day.stay === null ? null : hotels[day.stay];
  return (
    <div className="day-layout">
      <section className="day-panel">
        <div className="day-heading">
          <span className="eyebrow">
            DAY 0{index + 1}
            <span className="day-place">{day.city}</span>
          </span>
          <h2>{day.title}</h2>
          <p>{day.subtitle}</p>
          <div className="theme-line">{day.theme}</div>
        </div>
        <DayRouteMap dayIndex={index} />
        <div className="timeline">
          {day.stops.map((s, i) => (
            <article key={s.title}>
              <time>{s.time}</time>
              <div>
                <div className="stop-heading">
                  <h3>{s.title}</h3>
                  {s.tag && <span className="tiny-tag">{s.tag}</span>}
                </div>
                <p>{s.body}</p>
                <div className="link-row">
                  {s.query && <NavLink query={s.query} />}{' '}
                  {s.source && (
                    <Out href={s.source}>{s.sourceLabel || '官方说明'}</Out>
                  )}
                </div>
                {index === 3 && i === 3 && (
                  <Out
                    href={directions(
                      '九州自然動物公園 アフリカンサファリ',
                      '杉乃井ホテル 宙館',
                    )}
                  >
                    Safari → 宙馆路线
                  </Out>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
      <aside className="day-aside">
        <div className="stay-mini">
          <span className="eyebrow">
            <BedDouble size={16} /> {hotel ? '今晚住这里' : '今天回家'}
          </span>
          <h3>{hotel ? hotel.name : '福冈 → 香港 → 深圳'}</h3>
          <p>{hotel ? hotel.en : '按实际航班与接驳方案安排'}</p>
          {hotel ? (
            <NavLink query={hotel.jp} label="回酒店" />
          ) : (
            <NavLink query="福岡空港 国際線ターミナル" label="去国际航站楼" />
          )}
        </div>
        <div className="quick-card">
          <h3>当日随身卡</h3>
          <div>
            <Utensils />
            <p>
              <b>吃什么</b>
              {day.food}
            </p>
          </div>
          <div>
            <TrainFront />
            <p>
              <b>怎么走</b>
              {day.transport}
            </p>
          </div>
          <div>
            <Backpack />
            <p>
              <b>带上这些</b>
              {day.bag}
            </p>
          </div>
        </div>
        <div className="rain-card">
          <h3>
            <CloudRain size={19} /> 下雨 / 想慢一点
          </h3>
          <p>{day.rain}</p>
        </div>
      </aside>
      <div className="day-reminder">
        <Info size={19} />
        <p>{day.reminder}</p>
      </div>
    </div>
  );
}
function subscribeDay(callback: () => void) {
  window.addEventListener('hashchange', callback);
  return () => window.removeEventListener('hashchange', callback);
}
function readDay() {
  const hash = window.location.hash.match(/^#day-([1-7])$/);
  if (hash) {
    return String(Number(hash[1]) - 1);
  }
  const today = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Tokyo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date());
  const i = days.findIndex((d) => d.date === today);
  return i >= 0 ? String(i) : '0';
}
export default function Home() {
  const [hotelFocus, setHotelFocus] = useState<MapFocus>(null);
  const [foodFocus, setFoodFocus] = useState<MapFocus>(null);
  const initialDay = useSyncExternalStore(subscribeDay, readDay, () => '0');
  const [chosenDay, setChosenDay] = useState<string | null>(null);
  const selected = chosenDay ?? initialDay;
  function changeDay(v: unknown) {
    const n = String(v);
    setChosenDay(n);
    window.history.replaceState(null, '', '#day-' + (Number(n) + 1));
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  }
  return (
    <>
      <a className="skip-link" href="#journey">
        跳到每日行程
      </a>
      <SidebarProvider className="travel-shell">
        <TravelNavigation />
        <main className="page" id="top">
          <h1 className="sr-only">九州慢旅 · 7 日亲子旅行手册</h1>
          <div className="mobile-trip-summary">
            <Link href="/" className="world-back-link">
              <Globe2 size={15} />
              返回世界地图
            </Link>
            <b>九州慢旅</b>
            <span>2026.09.25 — 10.01 · 7 天 6 晚</span>
            <p>福冈 2 晚 → 由布院 1 晚 → 别府 2 晚 → 福冈 1 晚</p>
            <small>旅行建议方案 · 机酒及门票未确认预订</small>
          </div>
          <section id="journey">
            <Tabs
              value={selected}
              onValueChange={changeDay}
              className="itinerary"
            >
              <div className="section-heading">
                <h2>
                  <CalendarDays /> 每日行程
                </h2>
                <span>
                  日本时间 UTC+9
                  <br className="mobile-only" /> · 比中国快 1 小时
                </span>
              </div>
              <TabsList className="day-list" aria-label="选择旅行日期">
                {days.map((d, i) => (
                  <TabsTrigger
                    className="day-tab"
                    value={String(i)}
                    key={d.date}
                    aria-label={`${i === 6 ? '10' : '9'}月${Number(d.date.slice(8))}日 ${d.weekday} ${d.city}`}
                  >
                    <small>
                      {i === 6 ? '10 月' : '9 月'} / {d.weekday}
                    </small>
                    <b>{d.date.slice(8)}</b>
                    <span>{d.city}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
              {days.map((day, i) => (
                <TabsContent key={day.date} value={String(i)}>
                  {i === Number(selected) && <DayView day={day} index={i} />}
                </TabsContent>
              ))}
            </Tabs>
          </section>
          <section className="major-section" id="stays">
            <div className="section-heading">
              <div>
                <span className="eyebrow">STAY WELL</span>
                <h2>三间酒店，六晚好好休息</h2>
              </div>
              <span>
                按“实际成人数＋1 名小学生”询价
                <br />
                空房、房价与餐食均以订单为准
              </span>
            </div>
            <PlacesMap
              id="hotel-map"
              title="酒店位置，一张图看清"
              places={hotelMapPlaces}
              focus={hotelFocus}
            />
            <div className="hotel-grid">
              {hotels.map((h, i) => (
                <article
                  className="hotel-card"
                  key={h.name}
                  id={'hotel-' + h.id}
                >
                  <div className="hotel-top">
                    <span className="hotel-number">H{i + 1}</span>
                    <span>
                      {h.city}
                      <small>{h.badge}</small>
                    </span>
                  </div>
                  <PlacePhoto id={h.id} />
                  <div className="hotel-body">
                    <div className="hotel-dates">
                      {h.dates.split('\n').map((d) => (
                        <span key={d}>{d}</span>
                      ))}
                    </div>
                    <h3>{h.name}</h3>
                    <span className="latin-name">{h.en}</span>
                    <p>{h.description}</p>
                    <div className="room-tip">
                      <BedDouble size={17} />
                      <span>{h.room}</span>
                    </div>
                    <details>
                      <summary>
                        订房与儿童使用须知 <ChevronDown size={16} />
                      </summary>
                      <ul>
                        {h.details.map((t) => (
                          <li key={t}>{t}</li>
                        ))}
                      </ul>
                      <Out href={h.source}>查看对应官方说明</Out>
                    </details>
                    <div className="hotel-actions">
                      <a
                        className="place-location-button"
                        href="#hotel-map"
                        onClick={() => setHotelFocus({ id: h.id })}
                      >
                        <MapPin size={15} />
                        地图定位
                      </a>
                      <NavLink query={h.jp} />
                      <Out href={h.url}>官网 / 订房</Out>
                    </div>
                    <div className="place-address" lang="ja">
                      {h.address}
                    </div>
                    {h.tel && (
                      <a className="phone-link" href={'tel:' + h.tel}>
                        <Phone size={13} />
                        {h.displayTel}
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
            <details className="wide-details">
              <summary>
                如果想升级或换酒店，原方案有哪些备选？
                <ChevronDown size={18} />
              </summary>
              <p>
                <b>福冈：</b>The Ritz-Carlton, Fukuoka、ONE FUKUOKA
                HOTEL；原方案偏向都酒店的博多交通便利。<b>由布院：</b>
                龟之井别庄、山庄无量塔；比较儿童入住、房间私汤和套餐。
                <b>别府：</b>ANA InterContinental Beppu Resort &
                Spa；偏安静度假，杉乃井更侧重孩子玩水。这些是原稿备选，房价与儿童政策未逐项核实。
              </p>
              <div className="alternative-hotels-grid">
                {alternativeHotels.map((h, i) => (
                  <article
                    className="alternative-hotel"
                    id={'hotel-' + h.id}
                    key={h.id}
                  >
                    <PlacePhoto id={h.id} />
                    <div className="alternative-hotel-body">
                      <span>
                        A{i + 1} · {h.city} · 备选酒店
                      </span>
                      <h3>{h.name}</h3>
                      <p>{h.note}</p>
                      <div className="link-row">
                        <a
                          className="place-location-button"
                          href="#hotel-map"
                          onClick={() => setHotelFocus({ id: h.id })}
                        >
                          <MapPin size={15} />
                          地图定位
                        </a>
                        <NavLink query={h.jp} />
                        <Out href={h.url}>官网</Out>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </details>
            <p className="photo-note">
              照片展示酒店实景与部分房型，不代表已订房型。每张照片均附来源，入住权益以订单为准。
            </p>
          </section>
          <section className="major-section" id="food">
            <div className="section-heading">
              <div>
                <span className="eyebrow">TASTE KYUSHU</span>
                <h2>把想吃的，放在顺路的地方</h2>
              </div>
              <span>
                不必每家都打卡
                <br />
                标记“优先”的 6 味来自原方案
              </span>
            </div>
            <PlacesMap
              id="food-map"
              title="想吃的店，都在这里"
              places={foodMapPlaces}
              focus={foodFocus}
            />
            <div className="food-intro">
              <Utensils size={19} />
              <p>
                未标注官方营业时间的店，出发前打开地图或电话确认。导航已尽量指定分店；营业、排队和余量不会在本站实时更新。
              </p>
            </div>
            {['福冈', '由布院', '别府'].map((city, i) => (
              <div className="food-city" key={city}>
                <div className="city-label">
                  <span>0{i + 1}</span>
                  <h3>{city}</h3>
                  <p>
                    {i === 0
                      ? '一碗面，一锅汤'
                      : '由布院' === city
                        ? '牛肉釜饭与旅馆料理'
                        : '地热蒸汽里的地方味'}
                  </p>
                </div>
                <div className="food-grid">
                  {foods
                    .filter((f) => f.city === city)
                    .map((f) => (
                      <article
                        key={f.name}
                        className="food-card"
                        id={'food-' + f.id}
                      >
                        <PlacePhoto id={f.id} />
                        <div className="food-card-body">
                          <div className="food-card-top">
                            <span>
                              <span className="food-number">
                                {
                                  foodMapPlaces.find((p) => p.id === f.id)
                                    ?.number
                                }
                              </span>
                              {f.when}
                            </span>
                            {f.priority && <b>优先尝味</b>}
                          </div>
                          <h3>{f.name}</h3>
                          <span className="jp-name" lang="ja">
                            {f.jp}
                          </span>
                          <p className="dish">{f.dish}</p>
                          <p className="food-note">{f.note}</p>
                          <div className="food-links">
                            <a
                              className="place-location-button"
                              href="#food-map"
                              onClick={() => setFoodFocus({ id: f.id })}
                            >
                              <MapPin size={15} />
                              地图定位
                            </a>
                            <NavLink query={f.query} />
                            {f.url && <Out href={f.url}>官方信息</Out>}
                            {f.tel && (
                              <a
                                className="text-link"
                                href={'tel:' + f.tel}
                                aria-label={'拨打' + f.name + '电话'}
                              >
                                <Phone size={14} />
                                电话
                              </a>
                            )}
                          </div>
                        </div>
                      </article>
                    ))}
                </div>
              </div>
            ))}
            <p className="photo-note">
              照片为对应店铺的门店、用餐空间或料理实拍；菜品随季节及套餐变化，照片不代表当天供应。
            </p>
          </section>
          <section className="major-section" id="transport">
            <div className="section-heading">
              <div>
                <span className="eyebrow">ON THE WAY</span>
                <h2>跨城坐火车，Safari 那天约车</h2>
              </div>
              <span>
                地图会在新页打开
                <br />
                时间为计划参考，不代表实时路况
              </span>
            </div>
            <div className="transport-list">
              {transfers.map((t) => (
                <article key={t.title}>
                  <span className="transfer-day">{t.day}</span>
                  <div>
                    <h3>{t.title}</h3>
                    <span className="transport-mode">{t.mode}</span>
                    <p>{t.detail}</p>
                    <div className="link-row">
                      <Out href={directions(t.from, t.to, t.travelmode)}>
                        <Navigation size={14} />
                        路线查询
                      </Out>
                      <Out href={t.url}>运营方信息</Out>
                    </div>
                  </div>
                  <ArrowRight className="transfer-arrow" size={22} />
                </article>
              ))}
            </div>
            <div className="transport-note">
              <Ticket />
              <div>
                <h3>两段长途票，先按单买比较</h3>
                <p>
                  由布院之森和 Sonic 的座位与价格先在 JR
                  查询；不要仅凭“有两次火车”就默认 JR Pass 更省。8
                  岁孩子选儿童票 / 小学生类别。包车另询含等待的总价。
                </p>
              </div>
            </div>
          </section>
          <section className="major-section" id="essentials">
            <div className="section-heading">
              <div>
                <span className="eyebrow">POCKET NOTES</span>
                <h2>出发前确认，路上少操心</h2>
              </div>
              <span>
                信息核对日 {verifiedDate}
                <br />
                短时变化请以当日官方通知为准
              </span>
            </div>
            <div className="essentials-grid">
              <article className="essentials-card">
                <h3>
                  <Check /> 优先完成这 5 件事
                </h3>
                <ol className="booking-list">
                  <li>
                    <b>机票与香港 ⇄ 深圳接驳</b>
                    <p>
                      确定去回程时间、航站楼与跨境方式，补上 D1 / D7
                      实际出发时刻。
                    </p>
                  </li>
                  <li>
                    <b>三家酒店与儿童权益</b>
                    <p>
                      先订由布院私汤一泊二食和宙馆，再确认福冈三晚；核对儿童餐、床位与取消期限。
                    </p>
                  </li>
                  <li>
                    <b>9/27 由布院之森指定席</b>
                    <p>
                      已到通常发售期，尽早查票。官网 9/19
                      起计划恢复全班次，仍留意临时变更。
                    </p>
                  </li>
                  <li>
                    <b>9/28 Safari 包车</b>
                    <p>
                      确认接送两段、司机等待、行李、早餐时间，以及巴士售罄时的改程方式。
                    </p>
                  </li>
                  <li>
                    <b>9/30 Sonic ＋想吃的餐厅</b>
                    <p>
                      返福冈班次按退房后安排选择；水炊锅先预订，寿司店先确认营业和取号。
                    </p>
                  </li>
                </ol>
              </article>
              <article className="essentials-card">
                <h3>
                  <Backpack /> 随身行李与亲子提醒
                </h3>
                <div className="packing-groups">
                  <div>
                    <b>证件与联网</b>
                    <p>
                      护照、有效入境材料、机酒确认单、保险资料、可用的手机网络、充电宝。保留关键凭证的本地副本。
                    </p>
                  </div>
                  <div>
                    <b>温泉与玩水</b>
                    <p>
                      泳衣、泳镜、防滑拖鞋、湿衣袋、换洗衣物。Aqua Garden
                      穿泳衣；宙湯是分男女浴场。儿童滑道资格按现场规定。
                    </p>
                  </div>
                  <div>
                    <b>走路与天气</b>
                    <p>
                      舒适步行鞋、遮阳帽、防晒、轻便雨具、薄外套、水杯。山间与海边体感不同，出门前看实际天气。
                    </p>
                  </div>
                  <div>
                    <b>现金与饮食</b>
                    <p>
                      准备少量日元和可用银行卡；小店和交通的支付方式不同。过敏原提前告知，给孩子留清淡熟食选项。
                    </p>
                  </div>
                </div>
                <div className="jp-help">
                  <span>可给司机看</span>
                  <p lang="ja">ここまでお願いします。</p>
                  <small>请送我们到这里。（同时展示导航目的地）</small>
                </div>
              </article>
            </div>
            <div className="ticket-section">
              <div className="section-heading">
                <h3>
                  <Wallet size={20} /> 已核实的门票参考
                </h3>
                <span>日元 JPY · 单人价格</span>
              </div>
              <div className="ticket-table-wrap">
                <Table>
                  <TableCaption className="sr-only">
                    景点成人及八岁小学生票价，日元
                  </TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>体验</TableHead>
                      <TableHead>成人</TableHead>
                      <TableHead>8 岁小学生</TableHead>
                      <TableHead>怎么用</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableHead>Marine World</TableHead>
                      <TableCell>¥2,500</TableCell>
                      <TableCell>¥1,200</TableCell>
                      <TableCell>
                        <Out href={sources.marineTickets}>
                          普通入馆，体验另计
                        </Out>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableHead>Safari 入园</TableHead>
                      <TableCell>¥2,600</TableCell>
                      <TableCell>¥1,500</TableCell>
                      <TableCell>
                        <Out href={sources.safari}>巴士另买</Out>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableHead>Jungle Bus</TableHead>
                      <TableCell>¥1,500</TableCell>
                      <TableCell>¥1,500</TableCell>
                      <TableCell>
                        <Out href={sources.safari}>
                          4 岁以上同价，当日先到先得
                        </Out>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableHead>七地狱共通券</TableHead>
                      <TableCell>¥2,400</TableCell>
                      <TableCell>¥1,200</TableCell>
                      <TableCell>
                        <Out href={sources.hells}>少量参观先比较单买</Out>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableHead>Aqua Beat</TableHead>
                      <TableCell colSpan={2}>
                        住客使用费包含在住宿费内
                      </TableCell>
                      <TableCell>
                        <Out href={sources.aqua}>租借等另计，依住宿权益</Out>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              <p className="small-note">
                成人人数尚未提供，因此不合计家庭总预算。酒店、火车、包车与餐饮需要按日期和人数报价；以上并非整趟旅行费用。
              </p>
            </div>
            <div className="emergency-bar">
              <div>
                <Phone size={23} />
                <span>
                  <b>需要帮助时</b>
                  <small>日本境内拨打</small>
                </span>
              </div>
              <a href="tel:119">
                <b>119</b>
                <span>急救 / 消防</span>
              </a>
              <a href="tel:110">
                <b>110</b>
                <span>警察</span>
              </a>
              <a href="tel:+815038162787">
                <b>050-3816-2787</b>
                <span>JNTO 游客热线 · 中文 · 24 小时</span>
              </a>
              <Out href={sources.emergency} className="emergency-source">
                官方说明
              </Out>
            </div>
            <details className="wide-details sources-details">
              <summary>
                信息来源与使用说明
                <ChevronDown size={18} />
              </summary>
              <p>
                行程主题、酒店排序、餐厅候选来自你提供的原稿；网站做了顺路与亲子节奏调整。标注“官方”的时刻、设施政策及票价于{' '}
                {verifiedDate}{' '}
                核对。计划时段、交通预留时长为建议；未查询实时空房、余票、餐厅排队或天气。
              </p>
              <div className="source-grid">
                {[
                  [sources.train, 'JR 九州 · 由布院之森'],
                  [sources.trainNotice, 'JR 9 月运转公告'],
                  [sources.marine, 'Marine World 营业时间'],
                  [sources.marineTickets, 'Marine World 门票'],
                  [sources.safari, 'African Safari 时间与票价'],
                  [sources.safariFaq, 'Safari 常见问题'],
                  [sources.miyako, '都酒店 Spa 儿童使用规则'],
                  [sources.itsuki, '由布院别邸树'],
                  [sources.sora, '杉乃井宙馆及浴场须知'],
                  [sources.aqua, 'Aqua Beat 2026 开放表'],
                  [sources.hells, '地狱巡游营业与票价'],
                  [sources.steam, '别府旅游 · 地狱蒸'],
                  [sources.shin, '由布まぶし 心分店'],
                  [sources.amami, '甘味茶屋门店'],
                  [sources.airport, '福冈机场航站楼与地铁'],
                  [sources.medical, 'JNTO 紧急求助指南'],
                ].map(([url, title]) => (
                  <Out key={url} href={url}>
                    {title}
                  </Out>
                ))}
              </div>
              <p>
                餐厅只显示原稿提供或已核对的实用信息，未沿用易过时的评分和“营业中”标签。网站为随身参考手册，所有预订需另行完成；地图与官方链接需要联网。
              </p>
            </details>
          </section>
          <footer className="footer">
            <div>
              <Compass size={20} />
              <span>
                九州慢旅<small>愿这趟旅程，有冒险，也有好好休息。</small>
              </span>
            </div>
            <p>2026.09.25 — 10.01 · 亲子旅行手册</p>
          </footer>
        </main>
      </SidebarProvider>
    </>
  );
}
