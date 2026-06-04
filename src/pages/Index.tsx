import { useState } from "react";
import Icon from "@/components/ui/icon";

const ATAMAN_IMG = "https://cdn.poehali.dev/projects/403d8963-9179-4d46-867d-8b109429cbd1/files/62f0e3ff-eba4-478a-bed2-496c4ce54534.jpg";
const MAP_IMG = "https://cdn.poehali.dev/projects/403d8963-9179-4d46-867d-8b109429cbd1/files/1b400a2b-251d-410b-b0e8-686494f774eb.jpg";
const FOCUS_BG = "https://cdn.poehali.dev/projects/403d8963-9179-4d46-867d-8b109429cbd1/files/6ee49128-f2dd-43f9-a59e-a837bfb60058.jpg";

const tabs = [
  { id: "overview", label: "Обзор", icon: "Globe" },
  { id: "territory", label: "Территория", icon: "Map" },
  { id: "politics", label: "Политика", icon: "Crown" },
  { id: "focuses", label: "Фокусы", icon: "GitBranch" },
  { id: "spirits", label: "Духи нации", icon: "Shield" },
  { id: "decisions", label: "Решения", icon: "Scroll" },
  { id: "events", label: "События", icon: "BookOpen" },
];

const focusTrees = {
  political: {
    label: "Политическая",
    color: "#c87a7a",
    icon: "Crown",
    nodes: [
      {
        id: "p1", name: "Воля Атамана", time: 70,
        desc: "Провозглашение Григорьева верховным командующим Войска. Единоличная власть узаконена.",
        effects: ["+15% Stability", "+10% War Support"],
      },
      {
        id: "p2", name: "Рада Отаманів", time: 70,
        desc: "Созыв совета полевых командиров. Децентрализация власти с сохранением лидерства Григорьева.",
        effects: ["+1 Political Power/day", "-5% Stability"],
      },
      {
        id: "p3", name: "Чёрный Кулак", time: 70,
        desc: "Тайная полиция атамана. Расправы над предателями и дезертирами.",
        effects: ["+20% Division Org.", "-10% War Support"],
      },
      {
        id: "p4", name: "Идеология Вольницы", time: 70,
        desc: "Официальное закрепление анархо-атаманства как государственной идеологии.",
        effects: ["Unlock: Ataman Republic", "+5% Recruitable Pop."],
      },
      {
        id: "p5", name: "Народный Трибунал", time: 70,
        desc: "Суды «воли народной». Репрессии против спекулянтов и комиссаров.",
        effects: ["+8% Stability", "Release: 2 Political Prisoners"],
      },
    ]
  },
  military: {
    label: "Военная",
    color: "#7a9ec8",
    icon: "Sword",
    nodes: [
      {
        id: "m1", name: "Бронепоезд «Вільна Україна»", time: 70,
        desc: "Реквизированный бронепоезд становится символом войска и мощным тактическим инструментом.",
        effects: ["+1 Train Equipment", "+15% Rail Gun Attack"],
      },
      {
        id: "m2", name: "Конный Рейд", time: 70,
        desc: "Тактика стремительных кавалерийских ударов по тылам противника.",
        effects: ["+20% Cavalry Speed", "+10% Cavalry Attack"],
      },
      {
        id: "m3", name: "Пулемётные Тачанки", time: 70,
        desc: "Массовое оснащение войск пулемётными повозками — главная огневая сила Григорьева.",
        effects: ["+25% Tachanka Hardness", "Unlock: Tachanka Doctrine"],
      },
      {
        id: "m4", name: "Армия Вольных", time: 70,
        desc: "Реорганизация отрядов в регулярные полки с командирами-выборщиками.",
        effects: ["+2 Army XP/month", "+10% Max Planning"],
      },
      {
        id: "m5", name: "Операция «Херсон»", time: 70,
        desc: "Стратегическое наступление на Херсонскую область. Расширение контроля над Причерноморьем.",
        effects: ["War Goal: Kherson", "+5 War Support"],
      },
    ]
  },
  economic: {
    label: "Экономическая",
    color: "#7ac87a",
    icon: "BarChart3",
    nodes: [
      {
        id: "e1", name: "Реквизиции и Трофеи", time: 70,
        desc: "Систематический сбор трофеев с разбитых частей. Войско кормит само себя.",
        effects: ["+10% Loot Factor", "+5% Supply Efficiency"],
      },
      {
        id: "e2", name: "Зерно Херсонщины", time: 70,
        desc: "Контроль над плодородными землями юга. Продовольственное самообеспечение.",
        effects: ["+15% Consumer Goods reduction", "+8% Stability"],
      },
      {
        id: "e3", name: "Николаевские Верфи", time: 70,
        desc: "Захват судостроительных заводов Николаева. Производство речных судов.",
        effects: ["+2 Civilian Factories", "Unlock: River Flotilla"],
      },
      {
        id: "e4", name: "Торговля с Нейтралами", time: 70,
        desc: "Контрабандные сделки с румынскими и польскими купцами через Бессарабию.",
        effects: ["+30 Trade Deals", "+10% Import Efficiency"],
      },
      {
        id: "e5", name: "Военная Экономика Войска", time: 70,
        desc: "Переориентация всей экономики на нужды армии. Мобилизация ресурсов.",
        effects: ["+20% Military Factory Output", "-10% Consumer Goods"],
      },
    ]
  },
  diplomatic: {
    label: "Дипломатическая",
    color: "#c8b87a",
    icon: "Handshake",
    nodes: [
      {
        id: "d1", name: "Ни Белые, Ни Красные", time: 70,
        desc: "Декларация нейтралитета в Гражданской войне. Война только за вольницу.",
        effects: ["+10% Non-Aligned Popularity", "Start: Neutrality Ideology"],
      },
      {
        id: "d2", name: "Союз с Махно", time: 70,
        desc: "Переговоры с Нестором Махно. Создание Чёрно-Зелёного союза анархистов.",
        effects: ["Alliance: Makhno", "+15% Partisan Activity"],
      },
      {
        id: "d3", name: "Контакт с Петлюрой", time: 70,
        desc: "Тайные переговоры с УНР Петлюры. Возможность вхождения в украинский лагерь.",
        effects: ["Trade Deal: UNR", "+20 PP"],
      },
      {
        id: "d4", name: "Признание де Факто", time: 70,
        desc: "Добиться признания Войска как самостоятельного образования от европейских держав.",
        effects: ["+1 Diplomat", "+20% Trade Income"],
      },
      {
        id: "d5", name: "Вольная Южная Конфедерация", time: 70,
        desc: "Проект федерации вольных казачьих формирований юга Украины.",
        effects: ["Unlock: Confederation Path", "+25% Faction Cohesion"],
      },
    ]
  }
};

const spirits = [
  {
    name: "Дух Повстанця",
    icon: "⚔️",
    desc: "Войско Григорьева — вчерашние крестьяне и дезертиры всех армий. Они сражаются не за идею, а за землю и волю.",
    bonuses: ["+15% Partisan Efficiency", "+10% Guerrilla Attack", "-5% Division Organization"],
    color: "#c87a7a"
  },
  {
    name: "Атаманщина",
    icon: "🐴",
    desc: "Полная децентрализация командования. Каждый полковник сам себе генерал, но вместе они — сила.",
    bonuses: ["+20% Cavalry Attack", "+10% Army Morale", "-10% Command Power"],
    color: "#c8a94a"
  },
  {
    name: "Тачанка — Бог Войны",
    icon: "🔫",
    desc: "Пулемётные тачанки Григорьева наводили ужас на красные и белые части. Скорость + огонь = победа.",
    bonuses: ["+25% Light Tank Recon", "+15% Tachanka Breakthrough", "+5% Motorized Speed"],
    color: "#7a9ec8"
  },
  {
    name: "Юг — Наш Дом",
    icon: "🌾",
    desc: "Херсонские степи, Николаев, Елизаветград — сердце Войска. Здесь каждый житель — потенциальный солдат.",
    bonuses: ["+12% Recruitable Population", "+8% Stability in Core Provinces", "+6% Supply"],
    color: "#7ac87a"
  }
];

const decisions = [
  {
    name: "Погром Комиссаров",
    icon: "⚡",
    cost: "50 PP | 10 Stability",
    cooldown: "180 дней",
    desc: "Массовая ликвидация советских комиссаров на подконтрольных территориях.",
    effects: ["+25 War Support", "+2 Army XP", "-15 Stability", "USSR Threat +10"],
    danger: true
  },
  {
    name: "Мобилизация Сёл",
    icon: "👥",
    cost: "30 PP | 5% Consumer Goods",
    cooldown: "90 дней",
    desc: "Принудительная мобилизация крестьян Херсонщины и Николаевщины в ряды Войска.",
    effects: ["+8% Recruitable Pop", "+1 Division/30 days", "-5% Stability"],
    danger: false
  },
  {
    name: "Захват Бронепоезда",
    icon: "🚂",
    cost: "100 PP",
    cooldown: "Единоразово",
    desc: "Рейд на железнодорожный узел и захват бронепоезда противника.",
    effects: ["+1 Train Equipment", "+20% Rail Superiority", "Prestige +5"],
    danger: false
  },
  {
    name: "Чёрный Рынок Одессы",
    icon: "💰",
    cost: "20 PP | 5% Stability",
    cooldown: "60 дней",
    desc: "Тайная торговля реквизированным зерном и оружием через одесских контрабандистов.",
    effects: ["+40 Equipment", "+30 Resource Income", "-3% Stability"],
    danger: false
  },
  {
    name: "Провозгласить Вольную Область",
    icon: "🏴",
    cost: "150 PP | 20 Stability",
    cooldown: "Единоразово",
    desc: "Официальное провозглашение Григорьевской Вольной Области. Заявка на государственность.",
    effects: ["Unlock Ataman Republic", "+20% Stability long-term", "Casus Belli на соседей"],
    danger: false
  }
];

const events = [
  {
    id: "GRG.1",
    title: "Выбор Григорьева",
    date: "Январь 1936",
    img: "⚔️",
    flavor: "«Я не красный и не белый — я зелёный. Цвет воли, цвет степи, цвет жизни.»\n— Атаман Григорьев",
    desc: "Атаман стоит перед историческим выбором: к кому примкнуть в великой смуте? Красные обещают землю, белые — порядок, Петлюра — незалежность. Но есть и четвёртый путь...",
    choices: [
      { label: "Примкнуть к Красным", effect: "+50 PP, Alliance USSR, -20% Non-Aligned" },
      { label: "Поддержать Петлюру", effect: "+30 PP, Alliance UNR, +10% Stability" },
      { label: "Идти своим путём", effect: "Unlock Ataman Path, +15% War Support" },
    ]
  },
  {
    id: "GRG.2",
    title: "Восстание в Елизаветграде",
    date: "Март 1936",
    img: "🔥",
    flavor: "Город горел три дня. Когда огонь утих — Григорьев стал хозяином Херсонщины.",
    desc: "Восстание в Елизаветграде охватило весь регион. Местные советы разогнаны, комиссары бежали. Войско захватило склады с оружием и продовольствием. Как распорядиться победой?",
    choices: [
      { label: "Раздать оружие крестьянам", effect: "+15% Recruitable Pop, -10% Army Discipline" },
      { label: "Укрепить позиции в городе", effect: "+2 Fortification, +10% Stability" },
      { label: "Двигаться на Херсон немедленно", effect: "War Goal: Kherson, +20 Army XP" },
    ]
  },
  {
    id: "GRG.3",
    title: "Предложение Махно",
    date: "Июнь 1936",
    img: "🤝",
    flavor: "«Батько Махно — мой враг и мой брат. Степь нас рассудит.»",
    desc: "Гонцы от Нестора Махно прибыли с предложением объединить силы. Повстанческая армия Махно и Войско Григорьева могли бы стать непобедимой силой на юге Украины. Но Махно — анархист. Григорьев — атаман. Двум медведям тесно в одной берлоге...",
    choices: [
      { label: "Принять союз", effect: "Alliance: Makhno, +30 Division Strength, -10% Command Power" },
      { label: "Отвергнуть — действовать в одиночку", effect: "+15% Autonomy, Makhno becomes rival" },
      { label: "Временное перемирие", effect: "+20 PP, Non-aggression Pact: 1 year" },
    ]
  }
];

const territories = [
  { name: "Елизаветград (Кропивницкий)", status: "core", pop: "80 000", industry: "Низкая", strategic: "Столица Войска" },
  { name: "Николаев", status: "controlled", pop: "100 000", industry: "Высокая (верфи)", strategic: "Судостроение" },
  { name: "Херсон", status: "contested", pop: "75 000", industry: "Средняя", strategic: "Порт, зерно" },
  { name: "Вознесенск", status: "core", pop: "30 000", industry: "Низкая", strategic: "Ж/д узел" },
  { name: "Новый Буг", status: "core", pop: "15 000", industry: "Низкая", strategic: "Степной форпост" },
  { name: "Ольвиополь", status: "controlled", pop: "20 000", industry: "Низкая", strategic: "Речная переправа" },
];

export default function Index() {
  const [activeTab, setActiveTab] = useState("overview");
  const [activeFocusTree, setActiveFocusTree] = useState<keyof typeof focusTrees>("political");

  return (
    <div className="min-h-screen bg-[#0d0a06] scrollbar-custom">
      {/* Header */}
      <div className="relative overflow-hidden border-b-2 border-[#c8a94a]" style={{ background: "linear-gradient(180deg, #1e1508 0%, #0d0a06 100%)" }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url(${FOCUS_BG})`, backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="relative z-10 container mx-auto px-4 py-6">
          <div className="flex items-center gap-6 flex-wrap">
            <div className="w-20 h-20 rounded border-2 border-[#c8a94a] overflow-hidden flex-shrink-0 pulse-glow">
              <img src={ATAMAN_IMG} alt="Атаман Григорьев" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="text-[#c8a94a] text-xs font-mono tracking-[0.3em] mb-1 uppercase opacity-70">Hearts of Iron IV • Mod Design Document</div>
              <h1 className="hoi-title text-3xl md:text-4xl font-black tracking-wide glow-gold">
                HOI4: Григорьевский Рейд
              </h1>
              <div className="flex items-center gap-3 mt-2 flex-wrap">
                <span className="ideology-badge border-[#c8a94a] text-[#c8a94a] text-xs px-2 py-0.5">Атаманство</span>
                <span className="ideology-badge border-[#7ac87a] text-[#7ac87a] text-xs px-2 py-0.5">Вольница</span>
                <span className="text-[#8a7040] text-xs font-mono">v1.0 • 1936</span>
              </div>
            </div>
            <div className="ml-auto hidden md:block text-right">
              <div className="text-[#c8a94a] text-xs opacity-60 mb-1">Командующий</div>
              <div className="hoi-title text-lg text-[#c8a94a]">Никифор Григорьев</div>
              <div className="text-[#8a7040] text-xs">Атаман Войска Григорьевского</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-[#3d2b1a] bg-[#0d0a06]">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto scrollbar-custom">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`hoi-tab flex items-center gap-2 px-4 py-3 whitespace-nowrap border-b-2 ${activeTab === tab.id ? "active border-b-[#c8a94a]" : "border-b-transparent"}`}
              >
                <Icon name={tab.icon} size={14} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">

        {/* OVERVIEW */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div className="hoi-panel p-6 rounded">
                <div className="hoi-section-title mb-4">О Моде</div>
                <p className="text-[#d4b483] leading-relaxed text-lg mb-4">
                  «Григорьевский Рейд» — исторический мод для Hearts of Iron IV, воссоздающий одно из самых ярких повстанческих движений Гражданской войны на Украине.
                </p>
                <p className="text-[#8a7040] leading-relaxed mb-4">
                  Атаман Никифор Григорьев — бывший офицер царской армии, воевавший под знамёнами петлюровцев и красных, — в мае 1919 года поднял знаменитое восстание, захватив Херсон, Николаев и Елизаветград.
                </p>
                <div className="hoi-divider" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { label: "Провинций", value: "6", icon: "Map" },
                    { label: "Фокусов", value: "20", icon: "GitBranch" },
                    { label: "Нац. Духов", value: "4", icon: "Shield" },
                    { label: "Событий", value: "3+", icon: "BookOpen" },
                  ].map(s => (
                    <div key={s.label} className="hoi-stat-badge flex flex-col items-center p-3 text-center rounded">
                      <Icon name={s.icon} size={20} className="mb-1 text-[#c8a94a]" />
                      <div className="text-[#c8a94a] text-xl font-bold">{s.value}</div>
                      <div className="text-[#8a7040] text-xs">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="hoi-panel p-6 rounded">
                <div className="hoi-section-title mb-4">Историческая Справка</div>
                <div className="space-y-3 text-sm leading-relaxed">
                  <p className="text-[#8a7040]"><span className="text-[#c8a94a]">Никифор Александрович Григорьев</span> (1885–1919) — украинский военный деятель, атаман повстанческих формирований. Прапорщик царской армии, участник Первой мировой.</p>
                  <p className="text-[#8a7040]">В 1919 году командовал советскими войсками на Херсонском направлении. В <span className="text-[#c8a94a]">мае 1919</span> поднял восстание против большевиков, захватив крупные города юга Украины.</p>
                  <p className="text-[#8a7040]">Его войска насчитывали до <span className="text-[#c8a94a]">20 000 бойцов</span>, 52 орудия, 700 пулемётов и несколько бронепоездов. Символ — <span className="text-[#c8a94a]">чёрно-зелёное знамя</span> вольницы.</p>
                  <p className="text-[#8a7040]">Убит Нестором Махно в июле 1919 года после разоблачения в сотрудничестве с белыми.</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="hoi-card p-4 rounded">
                <div className="hoi-section-title mb-3">Стартовые Параметры (1936)</div>
                <div className="space-y-2">
                  {[
                    { key: "Stability", val: "35%", color: "#c87a7a" },
                    { key: "War Support", val: "65%", color: "#c8a94a" },
                    { key: "Manpower", val: "120 000", color: "#7ac87a" },
                    { key: "Civilian Factories", val: "3", color: "#7a9ec8" },
                    { key: "Military Factories", val: "2", color: "#7a9ec8" },
                    { key: "Divisions", val: "4 нач.", color: "#c8b87a" },
                    { key: "Ideology", val: "Non-Aligned", color: "#8a7040" },
                  ].map(p => (
                    <div key={p.key} className="flex justify-between items-center py-1 border-b border-[#1e1508]">
                      <span className="text-[#8a7040] text-xs">{p.key}</span>
                      <span className="text-sm font-bold" style={{ color: p.color }}>{p.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="hoi-card p-4 rounded">
                <div className="hoi-section-title mb-3">Уникальные Юниты</div>
                <div className="space-y-2">
                  {[
                    { name: "Тачанка Григорьева", icon: "🔫", desc: "Пулемётная повозка. +25% скорость, +30% огонь" },
                    { name: "Повстанческий Полк", icon: "⚔️", desc: "Пехота-партизаны. +20% лесной и степной бой" },
                    { name: "Бронепоезд «Вільна»", icon: "🚂", desc: "Уникальный жел.-дор. юнит войска" },
                  ].map(u => (
                    <div key={u.name} className="flex gap-2 p-2 bg-[#1a1208] border border-[#2d2010] rounded">
                      <span className="text-lg">{u.icon}</span>
                      <div>
                        <div className="text-[#c8a94a] text-xs font-bold">{u.name}</div>
                        <div className="text-[#8a7040] text-xs">{u.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TERRITORY */}
        {activeTab === "territory" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="hoi-panel p-6 rounded">
              <div className="hoi-section-title mb-4">Подконтрольные Территории на 1 Января 1936</div>
              <div className="space-y-3">
                {territories.map(t => (
                  <div key={t.name} className="flex items-start gap-3 p-3 bg-[#1a1208] border border-[#2d2010] rounded">
                    <div className={`w-3 h-3 rounded-full mt-1 flex-shrink-0 ${t.status === "core" ? "bg-[#c8a94a]" : t.status === "controlled" ? "bg-[#7a9ec8]" : "bg-[#c87a7a]"}`} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between flex-wrap gap-1">
                        <span className="text-[#d4b483] text-sm font-semibold">{t.name}</span>
                        <span className={`text-xs px-2 py-0.5 rounded ${t.status === "core" ? "bg-[#c8a94a20] text-[#c8a94a]" : t.status === "controlled" ? "bg-[#7a9ec820] text-[#7a9ec8]" : "bg-[#c87a7a20] text-[#c87a7a]"}`}>
                          {t.status === "core" ? "КОРЕННАЯ" : t.status === "controlled" ? "КОНТРОЛЬ" : "СПОРНАЯ"}
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-1 mt-1">
                        <span className="text-[#8a7040] text-xs">Нас: {t.pop}</span>
                        <span className="text-[#8a7040] text-xs">Пром: {t.industry}</span>
                        <span className="text-[#8a7040] text-xs">{t.strategic}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="hoi-divider" />
              <div className="flex gap-4 text-xs text-[#8a7040] flex-wrap">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#c8a94a] inline-block" /> Коренные земли</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#7a9ec8] inline-block" /> Под контролем</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#c87a7a] inline-block" /> Спорные</span>
              </div>
            </div>
            <div className="hoi-panel p-6 rounded">
              <div className="hoi-section-title mb-4">Карта Региона</div>
              <div className="rounded border border-[#3d2b1a] overflow-hidden mb-4">
                <img src={MAP_IMG} alt="Карта Григорьевщины" className="w-full object-cover" style={{ maxHeight: "280px" }} />
              </div>
              <div className="hoi-card p-4 rounded">
                <div className="hoi-section-title mb-3">Геополитическое Окружение</div>
                <div className="space-y-2 text-sm">
                  {[
                    { name: "СССР (Советская Украина)", rel: "Враг", color: "#c87a7a" },
                    { name: "УНР (Петлюра)", rel: "Нейтрал", color: "#c8b87a" },
                    { name: "ВСЮР (Деникин)", rel: "Враг", color: "#c87a7a" },
                    { name: "Румыния", rel: "Нейтрал", color: "#c8b87a" },
                    { name: "Войско Махно", rel: "Потенц. союзник", color: "#7ac87a" },
                  ].map(r => (
                    <div key={r.name} className="flex justify-between items-center py-1 border-b border-[#1a1208]">
                      <span className="text-[#8a7040]">{r.name}</span>
                      <span className="text-xs font-semibold" style={{ color: r.color }}>{r.rel}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* POLITICS */}
        {activeTab === "politics" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="hoi-panel p-6 rounded">
              <div className="hoi-section-title mb-4">Политическая Система</div>
              <div className="text-center mb-6">
                <div className="inline-block p-6 border-2 border-[#c8a94a] rounded bg-[#1a1208] pulse-glow">
                  <div className="text-5xl mb-3">🏴</div>
                  <div className="hoi-title text-xl text-[#c8a94a]">Атаманская Республика</div>
                  <div className="text-[#8a7040] text-sm mt-1">«Вільна Вольниця»</div>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                {[
                  { title: "Форма правления", body: "Военно-атаманская диктатура с элементами казачьей демократии. Выборность командиров на уровне полка, единоначалие — на уровне Войска." },
                  { title: "Идеология", body: "Non-Aligned (Ataman Sub-ideology). Близко к анархо-традиционализму: против красных и белых, за «вільну Україну» без чужих господ." },
                  { title: "Законодательный орган", body: "Рада Командирів — собрание полковых атаманов. Совещательный орган без права вето на решения Григорьева." },
                  { title: "Экономическая политика", body: "Реквизиционная экономика. Зерно и промтовары изымаются у «буржуев» и распределяются среди войска и лояльных крестьян." },
                ].map(item => (
                  <div key={item.title} className="p-3 bg-[#1a1208] border border-[#2d2010] rounded">
                    <div className="text-[#c8a94a] font-semibold mb-1">{item.title}</div>
                    <div className="text-[#8a7040]">{item.body}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="hoi-panel p-6 rounded">
              <div className="hoi-section-title mb-4">Идеологический Компас</div>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {[
                  { name: "Non-Aligned", val: 55, color: "#c8b87a" },
                  { name: "Fascist", val: 5, color: "#c87a7a" },
                  { name: "Democratic", val: 10, color: "#7a9ec8" },
                  { name: "Communist", val: 30, color: "#c87a7a" },
                ].map(i => (
                  <div key={i.name} className="p-3 bg-[#1a1208] border border-[#2d2010] rounded">
                    <div className="flex justify-between mb-1">
                      <span className="text-xs text-[#8a7040]">{i.name}</span>
                      <span className="text-xs font-bold" style={{ color: i.color }}>{i.val}%</span>
                    </div>
                    <div className="h-2 bg-[#0d0a06] rounded overflow-hidden">
                      <div className="h-full rounded" style={{ width: `${i.val}%`, backgroundColor: i.color }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="hoi-card p-4 rounded">
                <div className="hoi-section-title mb-3">Уникальная Суб-Идеология</div>
                <div className="text-center p-4 border border-[#c8a94a] rounded bg-[#1a1508]">
                  <div className="hoi-title text-[#c8a94a] text-lg mb-2">Атаманство</div>
                  <div className="text-[#8a7040] text-xs leading-relaxed">
                    Особый путь — ни красный, ни белый. Казачья вольница нового времени. Власть силы, харизмы и традиции.
                  </div>
                  <div className="mt-3 space-y-1">
                    <div className="text-[#7ac87a] text-xs">▲ +10% War Support постоянно</div>
                    <div className="text-[#7ac87a] text-xs">▲ +15% Partisan Efficiency</div>
                    <div className="text-[#c87a7a] text-xs">▼ -10% Diplomatic Relations</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* FOCUSES */}
        {activeTab === "focuses" && (
          <div>
            <div className="flex gap-2 mb-6 flex-wrap">
              {(Object.keys(focusTrees) as Array<keyof typeof focusTrees>).map(key => (
                <button
                  key={key}
                  onClick={() => setActiveFocusTree(key)}
                  className={`hoi-tab flex items-center gap-2 px-4 py-2 rounded ${activeFocusTree === key ? "active" : ""}`}
                >
                  <Icon name={focusTrees[key].icon} size={14} />
                  {focusTrees[key].label}
                </button>
              ))}
            </div>

            <div className="hoi-panel p-6 rounded">
              <div className="hoi-section-title mb-6" style={{ borderColor: focusTrees[activeFocusTree].color }}>
                <span style={{ color: focusTrees[activeFocusTree].color }}>▶</span>{" "}
                {focusTrees[activeFocusTree].label} Ветка
              </div>

              <div className="flex flex-col items-center gap-0">
                {focusTrees[activeFocusTree].nodes.map((node, idx) => (
                  <div key={node.id} className="flex flex-col items-center w-full max-w-lg">
                    <div className="hoi-focus-node rounded p-4 w-full" style={{ borderColor: idx === 0 ? focusTrees[activeFocusTree].color : undefined }}>
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 flex-shrink-0 border rounded flex items-center justify-center" style={{ borderColor: focusTrees[activeFocusTree].color, background: "#0d0a06" }}>
                          <Icon name={focusTrees[activeFocusTree].icon} size={18} style={{ color: focusTrees[activeFocusTree].color }} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1 gap-2">
                            <span className="hoi-title text-sm" style={{ color: focusTrees[activeFocusTree].color }}>{node.name}</span>
                            <span className="text-[#8a7040] text-xs whitespace-nowrap">{node.time} дней</span>
                          </div>
                          <p className="text-[#8a7040] text-xs leading-relaxed mb-2">{node.desc}</p>
                          <div className="flex flex-wrap gap-1">
                            {node.effects.map(e => (
                              <span key={e} className="hoi-bonus text-xs px-2 py-0.5 bg-[#0d1a0d] border border-[#2d4a1e] rounded">{e}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    {idx < focusTrees[activeFocusTree].nodes.length - 1 && (
                      <div className="w-0.5 h-8 bg-gradient-to-b from-[#c8a94a] to-transparent opacity-40" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SPIRITS */}
        {activeTab === "spirits" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {spirits.map(s => (
              <div key={s.name} className="hoi-spirit rounded p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-4xl">{s.icon}</div>
                  <div>
                    <div className="hoi-title text-lg" style={{ color: s.color }}>{s.name}</div>
                    <div className="text-[#8a7040] text-xs mt-0.5">Национальный Дух</div>
                  </div>
                </div>
                <p className="text-[#8a7040] text-sm leading-relaxed mb-4 italic border-l-2 pl-3" style={{ borderColor: s.color }}>
                  {s.desc}
                </p>
                <div className="hoi-section-title mb-2">Эффекты:</div>
                <div className="space-y-1">
                  {s.bonuses.map(b => (
                    <div key={b} className="flex items-center gap-2 text-sm">
                      <span className="text-[#7ac87a]">▲</span>
                      <span className="hoi-bonus">{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* DECISIONS */}
        {activeTab === "decisions" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {decisions.map(d => (
              <div key={d.name} className={`hoi-card rounded p-5 ${d.danger ? "border-[#8b1a1a]" : ""}`}>
                <div className="flex items-start gap-3 mb-3">
                  <div className="text-3xl">{d.icon}</div>
                  <div>
                    <div className="hoi-title text-sm text-[#c8a94a]">{d.name}</div>
                    {d.danger && <span className="text-xs text-[#c87a7a] border border-[#c87a7a] px-1 rounded mt-0.5 inline-block">ОПАСНО</span>}
                  </div>
                </div>
                <p className="text-[#8a7040] text-xs leading-relaxed mb-3">{d.desc}</p>
                <div className="hoi-divider" />
                <div className="grid grid-cols-2 gap-1 mb-3">
                  <div>
                    <div className="text-[#8a7040] text-xs">Стоимость</div>
                    <div className="text-[#c8a94a] text-xs font-semibold">{d.cost}</div>
                  </div>
                  <div>
                    <div className="text-[#8a7040] text-xs">Кулдаун</div>
                    <div className="text-[#c8a94a] text-xs font-semibold">{d.cooldown}</div>
                  </div>
                </div>
                <div className="space-y-1">
                  {d.effects.map(e => (
                    <div key={e} className="flex items-center gap-1 text-xs">
                      <span className="text-[#7ac87a]">→</span>
                      <span className="text-[#7ac87a]">{e}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* EVENTS */}
        {activeTab === "events" && (
          <div className="space-y-6 max-w-3xl mx-auto">
            {events.map(ev => (
              <div key={ev.id} className="hoi-event rounded p-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{ev.img}</span>
                  <div>
                    <div className="hoi-title text-xl text-[#c8a94a]">{ev.title}</div>
                    <div className="flex items-center gap-3 text-xs text-[#8a7040]">
                      <span>ID: {ev.id}</span>
                      <span>•</span>
                      <span>{ev.date}</span>
                    </div>
                  </div>
                </div>
                <div className="hoi-divider" />
                <p className="text-[#c8a94a] italic text-sm mb-3 opacity-80 border-l-2 border-[#c8a94a40] pl-3 whitespace-pre-line">
                  {ev.flavor}
                </p>
                <p className="text-[#8a7040] text-sm leading-relaxed mb-4">{ev.desc}</p>
                <div className="hoi-section-title mb-3">Варианты выбора:</div>
                <div className="space-y-2">
                  {ev.choices.map((c, i) => (
                    <div key={i} className="hoi-choice-btn rounded flex items-start gap-3 p-3">
                      <span className="text-[#c8a94a] font-bold text-sm flex-shrink-0">{i + 1}.</span>
                      <div className="flex-1">
                        <div className="text-[#c8a94a] text-sm font-semibold mb-0.5">{c.label}</div>
                        <div className="text-[#7ac87a] text-xs">{c.effect}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div className="hoi-card p-4 rounded text-center">
              <div className="text-[#8a7040] text-sm">Полная версия мода включает 30+ событий</div>
              <div className="text-[#c8a94a] text-xs mt-1">Григорьевский рейд • Восстание • Переговоры • Гибель Атамана</div>
            </div>
          </div>
        )}

      </div>

      {/* Footer */}
      <div className="border-t border-[#3d2b1a] mt-8 py-4">
        <div className="container mx-auto px-4 text-center">
          <div className="text-[#4a3520] text-xs font-mono">HOI4: Григорьевский Рейд • Mod Design Document v1.0 • Hearts of Iron IV Compatible</div>
        </div>
      </div>
    </div>
  );
}