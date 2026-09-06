export const verifiedDate = '2026-09-06';
export const sources = {
  train: 'https://www.jrkyushu.co.jp/trains/yufuinnomori/',
  trainNotice:
    'https://www.jrkyushu.co.jp/trains/yufuinnomori/__icsFiles/afieldfile/2026/08/18/20260818_yuhuin_no_mori_train_plan_0919_1.pdf',
  marine: 'https://marine-world.jp/general-guide/hours/',
  marineTickets: 'https://marine-world.jp/walletpass/',
  safari: 'https://africansafari.co.jp/information/',
  safariFaq: 'https://africansafari.co.jp/faq/',
  aqua: 'https://global-suginoi.orixhotelsandresorts.com/LUC2ORISUG/cdata/luc2orisug_14_jaen.html',
  miyako: 'https://www.miyakohotels.ne.jp/hakata/spa/',
  itsuki: 'https://bettei-itsuki.jp/en/',
  sora: 'https://suginoi.orixhotelsandresorts.com/sorakan/',
  airport: 'https://www.fukuoka-airport.jp/en/access/subway.html',
  hells: 'https://beppu-jigoku.com/fee/index.html',
  steam: 'https://beppu-tourism.com/experience/jigokumushikouboukannawa/',
  amami: 'https://amamichaya.greater.jp/',
  shin: 'https://www.yufumabushi-shin.com/index.html',
  emergency: 'https://www.japan.travel/en/plan/emergencies/',
  medical: 'https://www.jnto.go.jp/emergency/index.html',
};
export type Stop = {
  time: string;
  title: string;
  body: string;
  query?: string;
  tag?: string;
  source?: string;
  sourceLabel?: string;
};
export type Day = {
  date: string;
  weekday: string;
  city: string;
  title: string;
  subtitle: string;
  theme: string;
  stay: number | null;
  food: string;
  transport: string;
  bag: string;
  rain: string;
  reminder: string;
  stops: Stop[];
};
export const days: Day[] = [
  {
    date: '2026-09-25',
    weekday: '周五',
    city: '福冈',
    title: '抵达 · 博多初味',
    subtitle: '先安顿下来，再用一碗拉面开启假期。',
    theme: '城市散步 / 豚骨拉面 / 水炊锅',
    stay: 0,
    food: '午餐博多一双；晚餐とり田水炊锅。口味清淡可改 Shin Shin。',
    transport:
      '机场 → 博多：行李多建议出租车；地铁方案须先换航站楼。市内步行＋地铁。',
    bag: '护照、酒店确认单、少量日元、充电宝。泳衣留在随手可取的位置。',
    rain: '缩短旧城散步，改博多站商场、运河城；户外 Spa 看酒店当天开放情况。',
    reminder:
      '抵达和出发时间尚未提供。以下中午抵达的安排为建议，按实际航班整体后移即可。',
    stops: [
      {
        time: '抵达后',
        title: '福冈机场 → 都酒店博多',
        body: '香港航班抵达国际航站楼。可打车直达酒店；或坐免费接驳巴士到国内航站楼，再坐地铁到博多。所谓“机场 5 分钟到博多”仅指地铁车程。',
        query: '都ホテル 博多',
        tag: '先放行李',
        source: sources.airport,
        sourceLabel: '机场接驳说明',
      },
      {
        time: '午餐',
        title: '博多豚骨拉面，假期的第一碗',
        body: '博多一双本店是浓厚泡沫豚骨汤。若孩子不喜欢浓重气味，选择 Shin Shin；热门店排队长时，就近吃饭更舒服。',
        query: '博多一双 博多駅東本店',
      },
      {
        time: '15:00',
        title: '櫛田神社 → 博多运河城',
        body: '建议入住后轻装出门。旧城街巷与运河城随走随停，不把第一天排满。若想用酒店泳装 Spa，可把散步挪后，19:00 前结束亲子泡汤。',
        query: '櫛田神社 福岡',
      },
      {
        time: '18:00',
        title: 'とり田 · 水炊锅晚餐',
        body: '先尝鸡汤，再吃鸡肉和蔬菜，最后以杂炊收尾。预约时说明有一名 8 岁孩子；具体分店和到店时间以预约为准，推荐导航到博多本店。',
        query: '博多水炊き とり田 博多本店',
        tag: '建议预约',
      },
      {
        time: '饭后',
        title: '中洲夜游，早点回酒店',
        body: '屋台可以当作散步风景，孩子累了直接回酒店。第一晚以恢复体力为主。',
        query: '中洲 福岡',
      },
    ],
  },
  {
    date: '2026-09-26',
    weekday: '周六',
    city: '福冈',
    title: '去海边，遇见海豚',
    subtitle: '把这一天留给海洋馆，公园只是天气好的加分项。',
    theme: 'Marine World / 海滨 / 福冈晚餐',
    stay: 0,
    food: '馆内午餐；晚餐やま中味噌牛肠锅。孩子不吃内脏时改平尾天妇罗。',
    transport:
      '博多 → 香椎（JR 鹿儿岛本线）→ 海之中道（JR 香椎线，西户崎方向），下车步行。建议门到门预留约 60–75 分钟，按当天换乘调整。',
    bag: '水杯、遮阳帽、轻便雨具、防晒用品、备用薄外套。',
    rain: '海洋馆为主，取消海滨公园。大风或台风天气先确认 JR 与场馆是否正常开放。',
    reminder:
      '9/26 不在官网列出的夏季夜间开放日期内，按通常 9:30–17:30 安排。海豚表演场次当日查看。',
    stops: [
      {
        time: '09:00',
        title: '早餐后，从博多出发',
        body: 'JR 换乘到海之中道站。换乘时认准开往西户崎方向；站到馆仍需步行。车船班次均可能变化，出门前在导航中选公共交通。',
        query: 'マリンワールド海の中道',
      },
      {
        time: '10:00',
        title: 'Marine World 海之中道',
        body: '先查海豚、海狮表演时间，再围绕表演安排外洋大水槽、企鹅和九州海域展区。成人 ¥2,500，小中学生 ¥1,200；体验项目另计。',
        query: 'マリンワールド海の中道',
        tag: '本日主体验',
        source: sources.marineTickets,
        sourceLabel: '官方门票',
      },
      {
        time: '12:00',
        title: '馆内午餐，继续看海',
        body: '在馆内解决午餐，坐下来休息。原计划停留至 14:30；若孩子喜欢某个展区，就多留一会。',
      },
      {
        time: '15:00',
        title: '海滨公园 · 视体力加选',
        body: '天气好且孩子仍有精神时，再安排约 60–90 分钟。公园另需门票，不必横穿整个园区；否则直接回市区。',
        query: '海の中道海浜公園',
        tag: '可省略',
      },
      {
        time: '18:00',
        title: 'やま中，或一份现炸天妇罗',
        body: 'やま中博多店适合尝试味噌牛肠锅，先确认孩子是否接受内脏口感。天妇罗备选为平尾 ACROS 福冈店，位于天神一侧；不想再坐车可在博多站就近选餐厅。',
        query: '博多もつ鍋 やま中 博多店',
      },
    ],
  },
  {
    date: '2026-09-27',
    weekday: '周日',
    city: '由布院',
    title: '坐进森林，住进温泉',
    subtitle: '今天的火车也是景点。下午三点以后，把时间交给私汤。',
    theme: '由布院之森 / 金鳞湖 / 一泊二食',
    stay: 1,
    food: '由布まぶし 心丰后牛釜饭；晚餐和翌日早餐订在旅馆。',
    transport:
      '博多 → 由布院：由布院之森 1 号，计划 09:17–11:31。小镇步行，行李交旅馆或车站寄存。',
    bag: '火车票/取票所需资料、一晚随身包、孩子换洗衣物。提前问都酒店是否可跨夜寄存部分行李。',
    rain: '缩短汤之坪街道和金鳞湖散步，打车到旅馆；按旅馆可接待时间寄存或入住。',
    reminder:
      '指定席已进入发售期：9/27 车票通常从 8/27 日本时间 10:00 起发售。不要等临出发才订；此网站未代订。',
    stops: [
      {
        time: '08:45',
        title: '到博多站，确认站台和车票',
        body: '建议至少提前 30 分钟到站，若还要取票再多预留。全车指定席，必须提前选定座位；8 岁孩子按儿童类别购买，不默认免费。',
        query: '博多駅',
        tag: '提前到站',
        source: sources.train,
        sourceLabel: 'JR 官方时刻与预约',
      },
      {
        time: '09:17',
        title: '由布院之森 1 号 → 11:31 抵达',
        body: '约 2 小时 14 分钟，绿色列车穿过九州乡村。JR 8/18 公告计划 9/19–9/30 全部 1–6 号恢复正常运行；仍需关注临时运营变更。',
        query: '由布院駅',
        tag: '计划班次',
        source: sources.trainNotice,
        sourceLabel: '9 月最新运转公告',
      },
      {
        time: '11:45',
        title: '由布まぶし 心 · 站前店',
        body: '站前店就在由布院站附近，避免拖箱子去金鳞湖本店。丰后牛或鳗鱼釜饭：先原味，再加药味，最后加高汤。两店电话不同，导航和预约要对上分店。',
        query: '由布まぶし 心 由布院駅前店',
        source: sources.shin,
        sourceLabel: '分店与菜单',
      },
      {
        time: '13:00',
        title: '汤之坪街道 → 金鳞湖',
        body: '寄存行李后慢逛小店，沿街散步到湖边。建议约 14:30 收尾，不用追逐所有网红甜品店。',
        query: '金鱗湖 由布院',
      },
      {
        time: '15:00',
        title: '由布院别邸 树 · 私汤时间',
        body: '选择带独立温泉的房型与一泊二食。房间设施、儿童寝具及餐食逐项确认；入住和用餐时间以预订为准。抵达后向前台再次确认明早包车。',
        query: '由布院別邸 樹',
        tag: '今晚重点',
        source: sources.itsuki,
        sourceLabel: '旅馆官网',
      },
      {
        time: '晚间',
        title: '旅馆晚餐 → 再泡一次温泉',
        body: '今晚不外出。享用所订套餐的晚餐，饭后休息再短时泡汤；孩子全程由成人照看。',
      },
    ],
  },
  {
    date: '2026-09-28',
    weekday: '周一',
    city: '别府',
    title: 'Safari 奇遇日',
    subtitle: '上午遇见狮子，下午玩水。精彩的一天，也可以随时减量。',
    theme: 'Jungle Bus / Aqua Beat / 泳装温泉',
    stay: 2,
    food: '早餐提前和由布院旅馆协调；Safari 园内简单午餐；晚餐杉乃井 SORA。',
    transport:
      '提前约车：由布院旅馆 → African Safari → 杉乃井宙馆。确认司机是否等待、行李如何存放，以及中途超时费用。',
    bag: '泳衣、防滑拖鞋、干衣服、泳镜、湿衣袋。带少量零食和饮水，喂动物只用园方提供的食物。',
    rain: '轻雨以园方运营为准；暴雨或 Safari 停运时，和司机改为直接去杉乃井。室内 Aqua Beat 也可能因恶劣天气调整。',
    reminder:
      '官方目前写明 Jungle Bus 当天先到先得、售完为止；不能保证早到一定买到。未将“9 月绝不接受网约”当作已独立核实的政策。',
    stops: [
      {
        time: '07:45',
        title: '早餐从简，包车出发',
        body: '计划 07:45–08:00 从旅馆出发，目标约 08:40 抵达，具体车程交司机评估。先问旅馆能否提早供应早餐，避免一泊二食的早餐与早出发冲突。',
        query: '九州自然動物公園 アフリカンサファリ',
        tag: '包车须提前确认',
      },
      {
        time: '08:50',
        title: '受付购票，优先 Jungle Bus',
        body: '3–10 月常规受付 08:50 起，开园 09:15。门票成人 ¥2,600、儿童 ¥1,500；Jungle Bus 4 岁以上另付 ¥1,500/人。到场先看可售班次，再安排互动区。',
        source: sources.safari,
        sourceLabel: '官方时间与票价',
      },
      {
        time: '上午',
        title: '约 50 分钟，驶进动物世界',
        body: 'Jungle Bus 是核心体验，喂食对象以当天线路为准。之后看袋鼠、迷你马、兔子等互动区；部分项目另收费。原计划约 2.5–3 小时，需随巴士班次调整。',
        tag: '本日主体验',
      },
      {
        time: '13:00',
        title: '午餐后，驶向杉乃井',
        body: '下午先办理入住手续或寄存，约 14:00–15:00 到酒店是行程缓冲安排，并非固定车程。若巴士排到下午，优先保留 Safari，缩短今天玩水。',
        query: '杉乃井ホテル 宙館',
      },
      {
        time: '15:00',
        title: 'Aqua Beat · 波浪池与滑道',
        body: '9/28 公布营业时间 10:00–18:00，最晚入场 17:00、最晚游泳至 17:30。住客使用费包含在房费中，租借项目可能另计。滑道有身高、游泳能力等限制，按现场要求选择。',
        tag: '体力不足可挪到明天',
        source: sources.aqua,
        sourceLabel: 'Aqua Beat 官方开放表',
      },
      {
        time: '18:00',
        title: 'SORA 晚餐 → Aqua Garden',
        body: '确认所订宙馆套餐含 TERRACE & DINING SORA 晚餐。之后可穿泳衣到 Aqua Garden 泡温泉、看夜景，喷泉场次看酒店当天公布；两处水设施进出需分别办理手续。',
        query: '杉乃井ホテル アクアガーデン',
      },
    ],
  },
  {
    date: '2026-09-29',
    weekday: '周二',
    city: '别府',
    title: '地球冒烟的一天',
    subtitle: '看地热、蒸午饭，下午回酒店。地狱巡游挑两三个就很好。',
    theme: '海地狱 / 地狱蒸 / 别府海鲜',
    stay: 2,
    food: '地狱蒸工房午餐；岡本屋布丁为可选；晚餐亀正或甘味茶屋。若房价含晚餐，优先在酒店吃。',
    transport:
      '杉乃井 → 铁轮建议出租车，区域内步行；岡本屋在明礬，需额外乘车，不当作铁轮顺路步行点。',
    bag: '好走的鞋、饮水、小毛巾、遮阳帽。地热池是观赏用，不可下水或触碰。',
    rain: '减少露天池参观，保留能正常营业的地狱蒸和酒店活动；蒸汽大时远离围栏，拍照也不探身。',
    reminder:
      '原稿安排四个地狱，实际可压缩为海地狱＋灶地狱，再按兴趣加鬼石坊主。共通券未必比少数单买便宜，现场比较。',
    stops: [
      {
        time: '09:30',
        title: '出发去铁轮 · 海地狱',
        body: '从钴蓝色海地狱开始，再选鬼石坊主的泥浆泡或灶地狱。白池地狱视体力加选；不需要走完七个。开放 08:00–17:00，七处共通券成人 ¥2,400、小中学生 ¥1,200。',
        query: '海地獄 別府',
        source: sources.hells,
        sourceLabel: '地狱巡游官方票价',
      },
      {
        time: '11:30',
        title: '地狱蒸工房 铁轮 · 把午餐变成实验',
        body: '选肉类、海鲜、蔬菜等，用天然蒸汽烹饪。成人依工作人员指导操作高温蒸笼，孩子观察和参与选食材。参考营业 10:00–19:00，食材费另加蒸釜费；排队情况现场看。',
        query: '地獄蒸し工房 鉄輪',
        tag: '本日主体验',
        source: sources.steam,
        sourceLabel: '别府官方介绍',
      },
      {
        time: '13:30',
        title: '岡本屋 · 一份地狱蒸布丁',
        body: '喜欢原味与苦焦糖可去明礬地区尝一份。这里需额外乘车，排队长或孩子累了就取消，别为了甜品折返奔波。',
        query: '岡本屋売店 別府',
        tag: '可省略',
      },
      {
        time: '15:00',
        title: '回杉乃井，玩水或发呆',
        body: '9/29 Aqua Beat 公布 11:00–18:00 开放。Aqua Beat、Aqua Garden、保龄球、回房休息任选一两项；保龄球等娱乐可能另收费。',
        query: '杉乃井ホテル',
        source: sources.aqua,
        sourceLabel: '水乐园使用说明',
      },
      {
        time: '晚餐',
        title: '亀正寿司，或甘味茶屋',
        body: '亀正适合尝当天大分海鲜，但营业与取号截止尚未核实，不设为固定晚餐承诺；先致电询问，别等到傍晚才赶过去。甘味茶屋可吃鸡天、团子汁和やせうま。若已订酒店两餐套餐，外食改到翌日午餐更合理。',
        query: '亀正くるくる寿司 別府',
        tag: '先确认营业',
      },
    ],
  },
  {
    date: '2026-09-30',
    weekday: '周三',
    city: '福冈',
    title: '慢慢回到城市',
    subtitle: '别府的最后半天不赶路，给福冈留一个自在的晚上。',
    theme: '大分地方菜 / Sonic / 天神购物',
    stay: 0,
    food: '甘味茶屋鸡天＋团子汁；晚餐元祖博多明太重。孩子不喜欢鱼籽可改寿司或烤肉。',
    transport:
      '杉乃井 → 别府站：酒店接驳或出租车；别府 → 博多：特急 Sonic，约 2 小时。实际班次与指定席以订票结果为准。',
    bag: '把湿泳衣单独装袋；检查温泉区储物柜、房间插座和证件。',
    rain: '上午在酒店休息，购物集中在博多站或天神地下街；若 JR 受天气影响，先联络车站再决定替代交通。',
    reminder:
      '原稿 13:53–15:52 仅作为 Sonic 选班示例，未确认为 9/30 班次。若上午再玩水，压缩午餐或选更晚的火车。',
    stops: [
      {
        time: '上午',
        title: '早餐、休息，办理退房',
        body: '若想最后一次玩水，9/30 Aqua Beat 11:00 开门。酒店官网说明住客可在退房后使用，仍要确认当日手续和行李寄存；不要因此错过火车。',
        query: '杉乃井ホテル',
        source: sources.aqua,
        sourceLabel: 'Aqua Beat 营业表',
      },
      {
        time: '11:30',
        title: '甘味茶屋 · 补上大分家常味',
        body: '鸡天（とり天）配团子汁（だんご汁），再尝やせうま。别府店官网参考营业 10:00–21:00，末点 20:30；当日休业或排队仍需确认。赶车时改别府站附近午餐。',
        query: '別府甘味茶屋',
        source: sources.amami,
        sourceLabel: '门店官网',
      },
      {
        time: '午后',
        title: '特急 Sonic · 别府 → 博多',
        body: '计划选 13:30–15:00 左右出发的合适班次，约两小时后到博多。建议预订相邻指定席，提前到站；原稿示例 13:53–15:52 请在 JR 当日时刻中再次确认。',
        query: '別府駅 大分',
        tag: '班次待确认',
      },
      {
        time: '16:00+',
        title: '回都酒店博多，轻装去天神',
        body: '继续住同一家酒店。取回寄存行李、放下采购包，再去天神与大名逛街。当天到达较晚就留在博多站周边。',
        query: '天神 福岡',
      },
      {
        time: '晚餐',
        title: '元祖博多明太重 · 西中洲',
        body: '明太子配海苔米饭，适合喜欢鱼籽的家人。注意辛辣程度和孩子口味，不必为完成当地名物清单强求。',
        query: '元祖博多めんたい重 西中洲',
      },
    ],
  },
  {
    date: '2026-10-01',
    weekday: '周四',
    city: '回程',
    title: '带着回忆回家',
    subtitle: '今天只留早餐、最后采购和回程，不再加太宰府。',
    theme: '博多手信 / 福冈 → 香港 → 深圳',
    stay: null,
    food: '酒店早餐；午餐与机场餐按航班时间安排。',
    transport:
      '博多 → 福冈机场国际航站楼 → 香港 → 深圳。航空与跨境交通尚未确定，预留各段办理手续和等候时间。',
    bag: '随身核对护照、手机、钱包、车票和返程凭证；充电宝按航空公司要求随身携带。',
    rain: '更早出发去机场。若天气影响航空或陆路接驳，以航空公司及运营方通知为准。',
    reminder:
      '建议至少提前 2–3 小时到国际航站楼，并以航空公司值机截止为准。10/1 返深处于假期，香港至深圳交通应提前确定。',
    stops: [
      {
        time: '起床后',
        title: '早餐，最后检查一次行李',
        body: '确认航班和航站楼、香港入境或中转安排，以及深圳接驳方式。不要把购物安排压到值机前。',
      },
      {
        time: '有余量',
        title: '博多站最后采购',
        body: '可看博多通りもん、草莓甜品和九州限定零食。生鲜、明太子等涉及冷藏与入境携带规定的商品，购买前向海关和商家确认；优先选易携带的常温点心。',
        query: '博多駅',
      },
      {
        time: '按航班',
        title: '前往福冈机场国际航站楼',
        body: '出租车直接指定“国際線”。坐地铁则先到国内航站楼，再乘免费接驳，额外预留换乘和排队。航班时间未提供，暂不写死酒店出发时刻。',
        query: '福岡空港 国際線ターミナル',
        source: sources.airport,
        sourceLabel: '机场交通说明',
      },
      {
        time: '抵港后',
        title: '香港 → 深圳，回家',
        body: '按已订跨境巴士、铁路或其他接驳方案出发。若香港至深圳交通尚未订，出发前把营业时间、过关点和末班时间核对好。',
      },
    ],
  },
];
export const hotels = [
  {
    name: '都酒店博多',
    en: 'MIYAKO HOTEL HAKATA',
    jp: '都ホテル 博多',
    city: '福冈',
    dates: '9/25–9/27 · 2 晚\n9/30–10/1 · 1 晚',
    badge: '把方便留给城市',
    room: '舒适双床优先，按实际成人数＋1 名 8 岁儿童选择入住方案',
    description:
      '靠近博多站筑紫口，接机场、坐由布院之森和 Sonic 都方便。第一段两晚，回福冈后再住一晚。',
    details: [
      '确认儿童加床、同床和早餐计费，不默认 8 岁免费。',
      '户外 Spa 06:30–12:00 / 14:00–23:00；19:00 后只限 18 岁以上。',
      '户外池要求身高至少 120cm；不足 120cm 可用迷你池。12 岁以下须成人陪同。',
      '退房后跨夜寄存非必然服务，9/27 前请酒店确认。',
    ],
    address: '福岡市博多区博多駅東2-1-1',
    tel: '+81924413111',
    displayTel: '092-441-3111',
    url: 'https://www.miyakohotels.ne.jp/hakata/',
    source: sources.miyako,
  },
  {
    name: '由布院别邸 树',
    en: 'YUFUIN BETTEI ITSUKI',
    jp: '由布院別邸 樹',
    city: '由布院',
    dates: '9/27–9/28 · 1 晚',
    badge: '把预算留给私汤',
    room: '带独立温泉的离馆 / 独栋客房＋一泊二食',
    description:
      '这晚以房间私汤、安静休息和旅馆晚餐为主。不同房型的室内、半露天或露天温泉配置不同。',
    details: [
      '按具体房型确认私人温泉，不只看预订平台的酒店总图。',
      '一泊二食包含晚餐和次日早餐；儿童餐、寝具与过敏情况提前说明。',
      '9/28 计划 07:45 左右出发，需要先协调早餐时间。',
      '请旅馆协助询价包车至 Safari，再送杉乃井；等待和行李安排一起确认。',
    ],
    address: '由布市湯布院町川上2652-2',
    tel: '',
    displayTel: '通过官网联系旅馆',
    url: 'https://bettei-itsuki.jp/',
    source: sources.itsuki,
  },
  {
    name: '杉乃井酒店 · 宙馆',
    en: 'SUGINOI HOTEL · SORA KAN',
    jp: '杉乃井ホテル 宙館',
    city: '别府',
    dates: '9/28–9/30 · 2 晚',
    badge: '把下午留给玩水',
    room: '明确选择 SORA KAN 宙馆，核对海侧 / 山侧与餐饮套餐',
    description:
      '保留原稿选择的宙馆，享受客房、宙湯和酒店水设施。酒店另有星馆、虹馆，楼栋与用餐权益按套餐确认。',
    details: [
      '订房确认页应明确写“宙館”；是否含 SORA 早晚餐需另外核对。',
      'Aqua Beat 当前公告开放至 2026/11/1，覆盖本次 9/28–9/30。',
      '宙湯为分男女浴场，7 岁以上不能随成人进入异性浴场；8 岁孩子亲子共用可选泳装 Aqua Garden。',
      '若两晚均含酒店晚餐，亀正/甘味茶屋改到午餐，避免重复付费。',
    ],
    address: '別府市観海寺1',
    tel: '+81977788888',
    displayTel: '0977-78-8888',
    url: 'https://suginoi.orixhotelsandresorts.com/',
    source: sources.sora,
  },
];
export type Food = {
  name: string;
  jp: string;
  city: string;
  dish: string;
  when: string;
  note: string;
  query: string;
  url?: string;
  tel?: string;
  priority?: boolean;
};
export const foods: Food[] = [
  {
    name: '博多一双 · 本店',
    jp: '博多一双 博多駅東本店',
    city: '福冈',
    dish: '浓厚泡沫豚骨拉面',
    when: 'D1 午餐',
    note: '原稿首推。汤底浓厚，排队过长或孩子不习惯气味时换店；营业状态请当天确认。',
    query: '博多一双 博多駅東本店',
    tel: '+81924727739',
    priority: true,
  },
  {
    name: 'Shin Shin',
    jp: '博多らーめん Shin Shin',
    city: '福冈',
    dish: '博多豚骨拉面',
    when: '拉面备选',
    note: '原稿认为相对容易接受。可导航至博多站内分店，地图确认营业楼层，避免跑到天神本店。',
    query: 'Shin Shin 博多デイトス店',
  },
  {
    name: 'とり田 · 博多本店',
    jp: '博多水炊き とり田',
    city: '福冈',
    dish: '水炊锅＋收尾杂炊',
    when: 'D1 晚餐',
    note: '先汤、再肉菜、最后煮饭。建议预订，说明儿童年龄与用餐偏好。',
    query: '博多水炊き とり田 博多本店',
    tel: '+81922720920',
    priority: true,
  },
  {
    name: 'やま中 · 博多店',
    jp: '博多もつ鍋 やま中 博多店',
    city: '福冈',
    dish: '味噌牛肠锅',
    when: 'D2 晚餐候选',
    note: '博多站东侧。孩子不接受内脏口感就选天妇罗；预约时确认儿童同行。',
    query: '博多もつ鍋 やま中 博多店',
    url: 'https://motsunabe-yamanaka.com/en/hakata/',
    tel: '+81922608517',
  },
  {
    name: '平尾 · ACROS 福冈店',
    jp: '天麩羅処ひらお アクロス店',
    city: '福冈',
    dish: '现炸天妇罗定食',
    when: 'D2 晚餐备选',
    note: '虾、鱼、鸡肉和蔬菜现炸上桌。位于天神一侧，从博多要额外移动；以分店当天菜单为准。',
    query: '天麩羅処ひらお アクロス店',
    tel: '+81927165511',
  },
  {
    name: '元祖博多明太重',
    jp: '元祖博多めんたい重',
    city: '福冈',
    dish: '明太子重',
    when: 'D6 晚餐候选',
    note: '西中洲一带。孩子喜欢鱼籽才选，先问辣度；也可以换寿司或烤肉。',
    query: '元祖博多めんたい重 西中洲',
    tel: '+81927257220',
  },
  {
    name: '由布まぶし 心 · 站前店',
    jp: '由布まぶし 心 由布院駅前店',
    city: '由布院',
    dish: '丰后牛 / 鳗鱼釜饭',
    when: 'D3 午餐',
    note: '先原味、再加药味、最后高汤茶泡饭。站前店电话 0977-84-5825；原稿 0977-85-7880 是金鳞湖本店。',
    query: '由布まぶし 心 由布院駅前店',
    url: sources.shin,
    tel: '+81977845825',
    priority: true,
  },
  {
    name: '别邸树 · 旅馆晚餐',
    jp: '由布院別邸 樹',
    city: '由布院',
    dish: '所订一泊二食的晚餐',
    when: 'D3 晚餐',
    note: '把这晚留在旅馆。料理形式和菜单随套餐、季节变化；预订时确认儿童餐与早餐时间。',
    query: '由布院別邸 樹',
    url: sources.itsuki,
    priority: true,
  },
  {
    name: '地狱蒸工房 铁轮',
    jp: '地獄蒸し工房 鉄輪',
    city: '别府',
    dish: '天然蒸汽蒸肉、海鲜与蔬菜',
    when: 'D5 午餐',
    note: '蒸釜参考小 ¥400 / 大 ¥600（15 分钟内），食材另计。第 3 个周三通常休息，9 月公布休馆日为 9/16。',
    query: '地獄蒸し工房 鉄輪',
    url: sources.steam,
    tel: '+81977663775',
    priority: true,
  },
  {
    name: '岡本屋卖店',
    jp: '岡本屋売店',
    city: '别府',
    dish: '地狱蒸布丁',
    when: 'D5 可选下午茶',
    note: '明礬地区，需额外乘车。原味＋苦焦糖，一份即可；不是铁轮地狱巡游的步行顺路点。',
    query: '岡本屋売店 別府',
  },
  {
    name: '亀正回转寿司',
    jp: '亀正くるくる寿司',
    city: '别府',
    dish: '大分海鲜寿司',
    when: 'D5 候选，先询营业',
    note: '看当天鱼货选择竹荚鱼、鲭鱼、鲷鱼等。营业、取号截止和预约政策未独立核实，先电话确认；排队长就换甘味茶屋。',
    query: '亀正くるくる寿司 別府',
    tel: '+81977665225',
    priority: true,
  },
  {
    name: '甘味茶屋 · 别府店',
    jp: '別府甘味茶屋',
    city: '别府',
    dish: '鸡天＋团子汁＋やせうま',
    when: 'D5 备选 / D6 午餐',
    note: '官网参考 10:00–21:00，末点 20:30；临时休业另看公告。可电话咨询，官网有限制预约规则和线上取号入口。',
    query: '別府甘味茶屋',
    url: sources.amami,
    tel: '+81977676024',
  },
  {
    name: 'TERRACE & DINING SORA',
    jp: '杉乃井ホテル TERRACE & DINING SORA',
    city: '别府',
    dish: '酒店自助餐',
    when: 'D4 晚餐 / 套餐内用餐',
    note: '当天 Safari 加玩水后，在酒店吃最省力。餐厅选择、儿童餐费和用餐时间以住宿套餐为准。',
    query: '杉乃井ホテル TERRACE DINING SORA',
    url: sources.sora,
  },
];
export const transfers = [
  {
    day: 'D1 / D7',
    title: '机场国际线 ⇄ 博多',
    mode: '出租车 / 接驳＋地铁',
    detail:
      '行李多可打车，向司机展示“福岡空港 国際線”。地铁只接国内航站楼，国际线需免费巴士接驳。别把约 5 分钟地铁车程当成全程。',
    from: '福岡空港 国際線ターミナル',
    to: '都ホテル 博多',
    travelmode: 'transit',
    url: sources.airport,
  },
  {
    day: 'D2',
    title: '博多 ⇄ 海之中道',
    mode: 'JR，两段铁路',
    detail:
      '博多站乘鹿儿岛本线到香椎，转香椎线往西户崎，在海之中道下车步行。门到门建议预留 60–75 分钟，属规划估计。',
    from: '博多駅',
    to: 'マリンワールド海の中道',
    travelmode: 'transit',
    url: 'https://marine-world.jp/',
  },
  {
    day: 'D3',
    title: '博多 → 由布院',
    mode: '由布院之森 1 号',
    detail:
      '计划 09:17–11:31，全车指定席。先订票和相邻座位，再安排当天午餐；若满席，查其他由布院之森或特急由布班次。',
    from: '博多駅',
    to: '由布院駅',
    travelmode: 'transit',
    url: sources.train,
  },
  {
    day: 'D4',
    title: '由布院 → Safari → 别府',
    mode: '预约包车 / 出租车',
    detail:
      '请旅馆协助安排，报价一次覆盖两段行程。确认车容量、儿童乘坐安排、等待费、高速与停车费、取消政策，以及司机能否保存行李。',
    from: '由布院別邸 樹',
    to: '九州自然動物公園 アフリカンサファリ',
    travelmode: 'driving',
    url: 'https://africansafari.co.jp/',
  },
  {
    day: 'D5',
    title: '杉乃井 ⇄ 铁轮 / 明礬',
    mode: '出租车＋区域步行',
    detail:
      '先海地狱，再向铁轮街区和地狱蒸工房移动。岡本屋在明礬，单独乘车往返；取消这一站也不影响完整体验。',
    from: '杉乃井ホテル 宙館',
    to: '海地獄 別府',
    travelmode: 'driving',
    url: sources.hells,
  },
  {
    day: 'D6',
    title: '别府 → 博多',
    mode: '特急 Sonic，约 2 小时',
    detail:
      '先查酒店至别府站接驳，再选午后 Sonic 指定席。13:53–15:52 是原稿示例，9/30 最终班次、票价与余票以 JR 查询为准。',
    from: '別府駅 大分',
    to: '博多駅',
    travelmode: 'transit',
    url: 'https://www.jrkyushu.co.jp/',
  },
];
