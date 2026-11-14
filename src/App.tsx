import { useEffect, useMemo, useRef, useState, type ReactNode, type TouchEvent } from "react";

type Screen = "home" | "explore" | "battle" | "ranking" | "settings";
type IconName =
  | "user-cog"
  | "search"
  | "clock"
  | "swords"
  | "trophy"
  | "arrow-left"
  | "home"
  | "flame"
  | "bolt"
  | "chevron"
  | "bell"
  | "shield"
  | "help"
  | "heart"
  | "download"
  | "users"
  | "user"
  | "camera"
  | "check"
  | "book"
  | "sparkles"
  | "crown";

const photos = [
  "https://images.unsplash.com/photo-1517971071642-34a2d3ecc9cd?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1587135991058-8816b028691f?auto=format&fit=crop&w=900&q=85",
];

function Icon({
  name,
  size = 22,
  strokeWidth = 2,
}: {
  name: IconName;
  size?: number;
  strokeWidth?: number;
}) {
  const paths: Record<IconName, ReactNode> = {
    "user-cog": (
      <>
        <circle cx="9" cy="7" r="3" />
        <path d="M3 19c.4-3.2 2.4-5 6-5 2 0 3.6.6 4.6 1.7" />
        <circle cx="17.5" cy="17.5" r="2.5" />
        <path d="M17.5 13.5v1m0 6v1m4-4h-1m-6 0h-1m6.8-2.8-.7.7m-4.2 4.2-.7.7m5.6 0-.7-.7m-4.2-4.2-.7-.7" />
      </>
    ),
    search: (
      <>
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="m15.5 15.5 5 5" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 7v5l3.5 2" />
      </>
    ),
    swords: (
      <>
        <path d="m5 3 5.5 5.5-2 2L3 5l2-2Zm14 0-6.5 6.5 2 2L21 5l-2-2ZM8.5 13.5 4 18l2 2 4.5-4.5m5-2L20 18l-2 2-4.5-4.5" />
      </>
    ),
    trophy: (
      <>
        <path d="M8 4h8v4c0 3-1.5 5-4 5S8 11 8 8V4Zm4 9v4m-4 3h8M8 6H4v2c0 2 1.5 3 4 3m8-5h4v2c0 2-1.5 3-4 3" />
      </>
    ),
    "arrow-left": (
      <>
        <path d="m15 18-6-6 6-6" />
      </>
    ),
    home: (
      <>
        <path d="m3 11 9-7 9 7M5 10v10h14V10M9 20v-6h6v6" />
      </>
    ),
    flame: (
      <>
        <path d="M12 22c4 0 7-2.8 7-7 0-3.3-1.8-6-5.2-9.5.1 3-1.2 4.2-2.2 4.8.1-2.3-1-4.8-3.1-6.3.1 3.8-3.5 6.4-3.5 11 0 4.2 3 7 7 7Z" />
        <path d="M9.5 17.5c0-1.8 1-3.1 2.6-4.6.1 1.5.8 2.3 1.5 3 .5.5.9 1.2.9 2 0 1.6-1 2.6-2.5 2.6s-2.5-1.1-2.5-3Z" />
      </>
    ),
    bolt: <path d="M13 2 5 14h6l-1 8 9-13h-6V2Z" />,
    chevron: <path d="m9 18 6-6-6-6" />,
    bell: (
      <>
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9ZM10 21h4" />
      </>
    ),
    shield: <path d="M12 3 4.5 6v5c0 4.8 3 8 7.5 10 4.5-2 7.5-5.2 7.5-10V6L12 3Z" />,
    help: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M9.5 9a2.6 2.6 0 0 1 5 1c0 2-2.5 2.2-2.5 4m0 3.5h.01" />
      </>
    ),
    heart: (
      <path d="M20.8 5.8a5.2 5.2 0 0 0-7.4 0L12 7.2l-1.4-1.4a5.2 5.2 0 0 0-7.4 7.4L12 22l8.8-8.8a5.2 5.2 0 0 0 0-7.4Z" />
    ),
    download: (
      <>
        <path d="M12 3v12m-5-5 5 5 5-5M5 21h14" />
      </>
    ),
    users: (
      <>
        <circle cx="9" cy="8" r="3" />
        <path d="M3 20c0-4 2-6 6-6s6 2 6 6m1-13a3 3 0 0 1 0 6m1.5 2c2.3.5 3.5 2.1 3.5 5" />
      </>
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c.5-4.5 3.2-7 8-7s7.5 2.5 8 7" />
      </>
    ),
    camera: (
      <>
        <path d="M4 7h3l1.5-2h7L17 7h3v12H4V7Z" />
        <circle cx="12" cy="13" r="3.5" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    book: (
      <>
        <path d="M4 5c3-1 5-.3 8 2v13c-3-2.3-5-3-8-2V5Zm16 0c-3-1-5-.3-8 2v13c3-2.3 5-3 8-2V5Z" />
      </>
    ),
    sparkles: (
      <>
        <path d="m12 3 1.2 3.8L17 8l-3.8 1.2L12 13l-1.2-3.8L7 8l3.8-1.2L12 3Zm6 10 .8 2.2L21 16l-2.2.8L18 19l-.8-2.2L15 16l2.2-.8L18 13ZM5 14l.9 2.6L8.5 18l-2.6.9L5 21.5l-.9-2.6L1.5 18l2.6-1.4L5 14Z" />
      </>
    ),
    crown: <path d="m4 18-1-11 5 3.5L12 4l4 6.5L21 7l-1 11H4Zm0 3h16" />,
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

function Avatar({
  initials,
  color = "mint",
  image,
  decoration = "none",
}: {
  initials: string;
  color?: string;
  image?: string;
  decoration?: "none" | "crown";
}) {
  return (
    <div
      className={`avatar ${color}`}
      style={image ? { backgroundImage: `url(${image})` } : undefined}
    >
      {!image && initials}
      {decoration === "crown" && (
        <span className="avatar-crown">
          <Icon name="crown" size={9} strokeWidth={2.4} />
        </span>
      )}
    </div>
  );
}

function TopBar({
  title,
  subtitle,
  trailing,
}: {
  title: string;
  subtitle?: string;
  trailing?: ReactNode;
}) {
  return (
    <header className="top-bar">
      <div>
        <div className="eyebrow">{subtitle}</div>
        <h1>{title}</h1>
      </div>
      {trailing}
    </header>
  );
}

function BottomNav({
  screen,
  onNavigate,
}: {
  screen: Screen;
  onNavigate: (screen: Screen) => void;
}) {
  const items: { id: Screen; icon: IconName; label: string }[] = [
    { id: "settings", icon: "user-cog", label: "設定" },
    { id: "explore", icon: "search", label: "見つける" },
    { id: "home", icon: "clock", label: "タイマー" },
    { id: "battle", icon: "swords", label: "陣地バトル" },
    { id: "ranking", icon: "trophy", label: "ランキング" },
  ];
  return (
    <nav className="bottom-nav" aria-label="メインナビゲーション">
      {items.map((item) => (
        <button
          key={item.id}
          className={`nav-item ${screen === item.id ? "active" : ""}`}
          onClick={() => onNavigate(item.id)}
          aria-label={item.label}
        >
          <span className="nav-icon">
            <Icon name={item.icon} size={screen === item.id ? 24 : 22} />
          </span>
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  );
}

function Taskbar({ onBack, onHome }: { onBack: () => void; onHome: () => void }) {
  return (
    <nav className="taskbar" aria-label="画面操作">
      <button onClick={onBack} aria-label="戻る">
        <Icon name="arrow-left" />
        <span>戻る</span>
      </button>
      <button className="taskbar-home" onClick={onHome} aria-label="ホーム">
        <Icon name="home" />
        <span>ホーム</span>
      </button>
    </nav>
  );
}

function HomeScreen() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [modal, setModal] = useState<"log" | "post" | "manual" | null>(null);
  const [entryPoints, setEntryPoints] = useState(0);
  const [manualHours, setManualHours] = useState(0);
  const [manualMinutes, setManualMinutes] = useState(30);
  const [subject, setSubject] = useState("数学");
  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => setSeconds((value) => value + 1), 1000);
    return () => window.clearInterval(timer);
  }, [running]);
  const goalSeconds = 180 * 60;
  const progress = Math.min(100, (seconds / goalSeconds) * 100);
  const earnedPoints = Math.floor(seconds / 60) * 5;
  const remainingMinutes = Math.max(0, 180 - Math.floor(seconds / 60));
  const time = useMemo(() => {
    const h = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, "0");
    const m = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${h}:${m}:${s}`;
  }, [seconds]);

  const stop = () => {
    setRunning(false);
    setEntryPoints(Math.floor(seconds / 60) * 5);
    setModal("log");
  };
  return (
    <div className="screen home-screen">
      <TopBar
        title="こんにちは、葵さん"
        subtitle="テラスタディ"
        trailing={
          <button className="streak">
            <Icon name="flame" size={17} />
            <strong>12</strong>
          </button>
        }
      />
      <section className="hero-card">
        <div className="soft-orb orb-one" />
        <div className="soft-orb orb-two" />
        <div className="daily-label">
          <span>今日の集中度</span>
          <b>{Math.round(progress)}%</b>
        </div>
        <div
          className="timer-ring"
          style={{ "--progress": `${progress}%` } as React.CSSProperties}
        >
          <div className="timer-inner">
            <span>{running ? "集中中" : "今日の学習時間"}</span>
            <strong>{time}</strong>
            <small>
              <Icon name="bolt" size={13} />
              {remainingMinutes > 0 ? `目標まであと${remainingMinutes}分` : "目標達成！"}
            </small>
          </div>
        </div>
        <button
          className={`study-button ${running ? "stop" : ""}`}
          onClick={() => (running ? stop() : setRunning(true))}
        >
          <span className={running ? "stop-square" : "play-triangle"} />
          {running ? "学習を終了" : "学習を始める"}
        </button>
        <button className="manual-entry-button" onClick={() => setModal("manual")}>
          <Icon name="clock" size={14} />
          手動で学習時間を入力
        </button>
        <p className="encourage">
          {running ? "集中できています。その調子！" : "小さな積み重ねが、大きな成果に。"}
        </p>
      </section>
      <div className="section-heading">
        <div>
          <span>今日の記録</span>
          <h2>学習の進み具合</h2>
        </div>
        <button>詳細</button>
      </div>
      <div className="stat-grid">
        <div className="stat-card">
          <div className="stat-icon purple">
            <Icon name="book" size={19} />
          </div>
          <span>学習時間</span>
          <strong>2時間18分</strong>
          <small>
            昨日より <b>+24%</b>
          </small>
        </div>
        <div className="stat-card">
          <div className="stat-icon amber">
            <Icon name="bolt" size={19} />
          </div>
          <span>学習ポイント</span>
          <strong>
            {(1240 + earnedPoints).toLocaleString("ja-JP")} <em>点</em>
          </strong>
          <small>
            今週の上位 <b>8%</b>
          </small>
        </div>
      </div>
      <div className="subject-card">
        <div className="subject-badge">数</div>
        <div className="grow">
          <b>数学</b>
          <span>今日 · 45分</span>
          <div className="mini-progress">
            <i />
          </div>
        </div>
        <strong>
          320 <small>点</small>
        </strong>
      </div>

      {modal && (
        <div
          className="modal-backdrop"
          onMouseDown={(e) => e.target === e.currentTarget && setModal(null)}
        >
          {modal === "manual" ? (
            <div className="modal-card">
              <div className="modal-handle" />
              <div className="modal-icon">
                <Icon name="clock" />
              </div>
              <span className="eyebrow">手動記録</span>
              <h2>学習時間を入力</h2>
              <p>タイマーを使わずに行った学習の時間を入力してください。</p>
              <div className="manual-inputs">
                <div>
                  <input
                    type="number"
                    min={0}
                    max={12}
                    value={manualHours}
                    aria-label="時間"
                    onChange={(e) =>
                      setManualHours(Math.max(0, Math.min(12, Number(e.target.value) || 0)))
                    }
                  />
                  <span>時間</span>
                </div>
                <div>
                  <input
                    type="number"
                    min={0}
                    max={59}
                    value={manualMinutes}
                    aria-label="分"
                    onChange={(e) =>
                      setManualMinutes(Math.max(0, Math.min(59, Number(e.target.value) || 0)))
                    }
                  />
                  <span>分</span>
                </div>
              </div>
              <button
                className="primary-button"
                disabled={manualHours * 60 + manualMinutes === 0}
                onClick={() => {
                  setEntryPoints((manualHours * 60 + manualMinutes) * 5);
                  setModal("log");
                }}
              >
                学習内容を選ぶ
                <span>+{((manualHours * 60 + manualMinutes) * 5).toLocaleString("ja-JP")}点</span>
              </button>
              <button className="text-button" onClick={() => setModal(null)}>
                キャンセル
              </button>
            </div>
          ) : modal === "log" ? (
            <div className="modal-card">
              <div className="modal-handle" />
              <div className="modal-icon">
                <Icon name="check" />
              </div>
              <span className="eyebrow">学習完了</span>
              <h2>よく集中できました！</h2>
              <p>学習内容を記録してポイントを獲得しましょう。</p>
              <label>科目</label>
              <div className="chips">
                {["数学", "英語", "歴史", "理科"].map((item) => (
                  <button
                    className={subject === item ? "selected" : ""}
                    onClick={() => setSubject(item)}
                    key={item}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <label htmlFor="notes">学習内容</label>
              <textarea
                id="notes"
                placeholder="今日は何を学びましたか？"
                defaultValue="二次関数と練習問題"
              />
              <button className="primary-button" onClick={() => setModal("post")}>
                記録を完了 <span>+{entryPoints.toLocaleString("ja-JP")}点</span>
              </button>
            </div>
          ) : (
            <div className="modal-card post-modal">
              <div className="modal-handle" />
              <div className="modal-icon">
                <Icon name="sparkles" />
              </div>
              <h2>学習記録を共有しますか？</h2>
              <p>ノートを投稿して、ほかの学生にも学びを届けましょう。</p>
              <button className="photo-box">
                <img src={photos[0]} alt="学習ノートのプレビュー" />
                <span>
                  <Icon name="camera" size={19} /> 写真を追加
                </span>
              </button>
              <button className="primary-button" onClick={() => setModal(null)}>
                ノートを投稿
              </button>
              <button className="text-button" onClick={() => setModal(null)}>
                今は投稿しない
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function BattleScreen() {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 60000);
    return () => window.clearInterval(timer);
  }, []);
  const seasonEnd = new Date(now);
  seasonEnd.setDate(seasonEnd.getDate() + ((7 - seasonEnd.getDay()) % 7));
  seasonEnd.setHours(24, 0, 0, 0);
  const remaining = Math.max(0, seasonEnd.getTime() - now);
  const leftDays = Math.floor(remaining / 86400000);
  const leftHours = Math.floor((remaining % 86400000) / 3600000);
  return (
    <div className="screen battle-screen" aria-label="陣地バトル">
      <TopBar
        title="陣地バトル"
        subtitle="チームの戦況"
        trailing={
          <div className="battle-team-mark">
            <Icon name="swords" size={19} />
          </div>
        }
      />
      <section className="battle-points-card">
        <div className="battle-card-glow" />
        <div className="battle-countdown">
          <Icon name="clock" size={11} />
          シーズン終了まで: <b>{leftDays}日 {leftHours}時間</b>
        </div>
        <div className="battle-points-heading">
          <div className="battle-points-icon">
            <Icon name="trophy" size={22} />
          </div>
          <span>チーム総ポイント</span>
        </div>
        <div className="battle-total">
          <strong>24,860</strong>
          <span>ポイント</span>
        </div>
        <div className="battle-breakdown">
          <div>
            <span>購入した建物の合計ポイント</span>
            <strong>18,420</strong>
          </div>
          <i />
          <div>
            <span>保有しているポイント</span>
            <strong>6,440</strong>
          </div>
        </div>
      </section>
      <button className="battle-start-card">
        <span className="battle-start-icon">
          <Icon name="swords" size={27} />
        </span>
        <span className="battle-start-copy">
          <small>準備はできましたか？</small>
          <strong>対戦を始める</strong>
        </span>
        <span className="battle-start-arrow">
          <Icon name="chevron" size={20} />
        </span>
      </button>
    </div>
  );
}

const leaders = [
  {
    name: "田中 美緒",
    school: "青葉高校 · チームテラ",
    minutes: 1450,
    initials: "美",
    color: "mint",
    premium: true,
  },
  {
    name: "佐藤 蓮",
    school: "明星学園 · ノヴァ",
    minutes: 1380,
    initials: "蓮",
    color: "purple",
    premium: false,
  },
  {
    name: "木村 結菜",
    school: "青葉高校 · チームテラ",
    minutes: 1290,
    initials: "結",
    color: "amber",
    premium: true,
  },
  {
    name: "伊藤 悠人",
    school: "光陽高校 · オリオン",
    minutes: 1100,
    initials: "悠",
    color: "blue",
    premium: false,
  },
  {
    name: "森 咲希",
    school: "明星学園 · ノヴァ",
    minutes: 985,
    initials: "咲",
    color: "pink",
    premium: true,
  },
];

const formatMinutes = (minutes: number) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h > 0 ? `${h}時間${m > 0 ? `${m}分` : ""}` : `${m}分`;
};

const weekDays = ["月", "火", "水", "木", "金", "土", "日"];
const weeklyMinutes = [95, 140, 60, 175, 120, 210, 150];
const subjectBreakdown = [
  { subject: "国語", minutes: 210 },
  { subject: "数学", minutes: 390 },
  { subject: "理科", minutes: 260 },
  { subject: "英語", minutes: 330 },
  { subject: "社会", minutes: 180 },
  { subject: "その他", minutes: 90 },
];

function BarChart() {
  const max = Math.max(...weeklyMinutes);
  return (
    <div className="chart-card">
      <div className="chart-title">
        <b>今週の学習時間</b>
        <span>過去1週間（月〜日）</span>
      </div>
      <div className="bar-chart">
        {weeklyMinutes.map((minutes, index) => (
          <div className="bar-col" key={weekDays[index]}>
            <small>{minutes >= 60 ? `${(minutes / 60).toFixed(1)}h` : `${minutes}m`}</small>
            <div className="bar-track">
              <i style={{ height: `${Math.round((minutes / max) * 100)}%` }} />
            </div>
            <span>{weekDays[index]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function RadarChart() {
  const size = 190;
  const center = size / 2;
  const radius = 66;
  const axes = subjectBreakdown.map((item, index) => {
    const angle = (Math.PI * 2 * index) / subjectBreakdown.length - Math.PI / 2;
    return { ...item, angle };
  });
  const maxMinutes = Math.max(...subjectBreakdown.map((s) => s.minutes));
  const polygon = axes
    .map((axis) => {
      const value = axis.minutes / maxMinutes;
      const x = center + Math.cos(axis.angle) * radius * value;
      const y = center + Math.sin(axis.angle) * radius * value;
      return `${x},${y}`;
    })
    .join(" ");
  const ring = (scale: number) =>
    axes
      .map((axis) => {
        const x = center + Math.cos(axis.angle) * radius * scale;
        const y = center + Math.sin(axis.angle) * radius * scale;
        return `${x},${y}`;
      })
      .join(" ");
  return (
    <div className="chart-card">
      <div className="chart-title">
        <b>科目別の学習バランス</b>
        <span>6科目の学習時間配分</span>
      </div>
      <svg className="radar-chart" viewBox={`0 0 ${size} ${size + 34}`}>
        {[1, 0.66, 0.33].map((scale) => (
          <polygon key={scale} className="radar-ring" points={ring(scale)} />
        ))}
        {axes.map((axis) => {
          const x = center + Math.cos(axis.angle) * radius;
          const y = center + Math.sin(axis.angle) * radius;
          return <line key={axis.subject} className="radar-axis" x1={center} y1={center} x2={x} y2={y} />;
        })}
        <polygon className="radar-fill" points={polygon} />
        {axes.map((axis) => {
          const x = center + Math.cos(axis.angle) * (radius + 21);
          const y = center + Math.sin(axis.angle) * (radius + 15);
          return (
            <text key={axis.subject} className="radar-label" x={x} y={y} textAnchor="middle">
              {axis.subject}
            </text>
          );
        })}
      </svg>
    </div>
  );
}

function PersonalRecordScreen() {
  const totalMinutes = weeklyMinutes.reduce((sum, value) => sum + value, 0);
  return (
    <>
      <div className="personal-summary">
        <div>
          <span>今週の合計</span>
          <strong>{formatMinutes(totalMinutes)}</strong>
        </div>
        <i />
        <div>
          <span>1日平均</span>
          <strong>{formatMinutes(Math.round(totalMinutes / 7))}</strong>
        </div>
      </div>
      <BarChart />
      <RadarChart />
    </>
  );
}

function RankingScreen() {
  const [tab, setTab] = useState("チーム内ランキング");
  const ranked = [...leaders].sort((a, b) => b.minutes - a.minutes);
  return (
    <div className="screen detail-screen ranking-screen">
      <TopBar
        title="ランキング"
        subtitle="第12週 · 日曜日まで"
        trailing={
          <div className="season-badge">
            <Icon name="trophy" size={17} /> 第4期
          </div>
        }
      />
      <div className="segmented two">
        {["チーム内ランキング", "個人の学習記録"].map((item) => (
          <button key={item} className={tab === item ? "active" : ""} onClick={() => setTab(item)}>
            {item}
          </button>
        ))}
      </div>
      {tab === "個人の学習記録" ? (
        <PersonalRecordScreen />
      ) : (
        <>
          <div className="league-card">
            <div className="league-top">
              <div>
                <span>現在のリーグ</span>
                <h2>エメラルドリーグ</h2>
              </div>
              <div className="league-icon">
                <Icon name="trophy" />
              </div>
            </div>
            <div className="league-progress">
              <i />
            </div>
            <div className="league-foot">
              <span>上位10名が昇格</span>
              <b>残り4日</b>
            </div>
          </div>
          <div className="podium">
            {[1, 0, 2].map((index, order) => (
              <div className={`podium-player place-${index + 1}`} key={ranked[index].name}>
                {index === 0 && <div className="crown">1</div>}
                <Avatar
                  initials={ranked[index].initials}
                  color={ranked[index].color}
                  decoration={ranked[index].premium ? "crown" : "none"}
                />
                <b>{ranked[index].name.split(" ")[1]}</b>
                <span>{formatMinutes(ranked[index].minutes)}</span>
                <div className="podium-base">{index + 1}</div>
              </div>
            ))}
          </div>
          <div className="leader-list">
            {ranked.slice(3).map((person, index) => (
              <div className="leader-row" key={person.name}>
                <b className="rank-num">{index + 4}</b>
                <Avatar
                  initials={person.initials}
                  color={person.color}
                  decoration={person.premium ? "crown" : "none"}
                />
                <div className="grow">
                  <strong>{person.name}</strong>
                  <span>{person.school}</span>
                </div>
                <div className="points">
                  <b>{formatMinutes(person.minutes)}</b>
                  <span>学習時間</span>
                </div>
              </div>
            ))}
            <div className="leader-row current">
              <b className="rank-num">12</b>
              <Avatar initials="葵" />
              <div className="grow">
                <strong>
                  中村 葵 <i>あなた</i>
                </strong>
                <span>青葉高校 · チームテラ</span>
              </div>
              <div className="points">
                <b>8時間20分</b>
                <span>学習時間</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

const feed = [
  {
    name: "田中 美緒",
    school: "青葉高校",
    time: "12分前",
    subject: "物理",
    title: "電磁誘導 — 重要公式まとめ",
    text: "明日のテストに向けて、1ページにまとめました。参考になればうれしいです！",
    image: photos[0],
    likes: 128,
    color: "purple",
    initials: "美",
  },
  {
    name: "佐藤 蓮",
    school: "明星学園",
    time: "36分前",
    subject: "世界史",
    title: "産業革命の年表",
    text: "主な出来事と影響を色分けしました。復習用に保存してね！",
    image: photos[1],
    likes: 84,
    color: "amber",
    initials: "蓮",
  },
  {
    name: "木村 結菜",
    school: "青葉高校",
    time: "1時間前",
    subject: "化学",
    title: "有機化学の反応マップ",
    text: "今日の2時間集中学習で作ったまとめです。",
    image: photos[2],
    likes: 61,
    color: "mint",
    initials: "結",
  },
];

const myNotes = [
  {
    name: "中村 葵",
    school: "青葉高校",
    time: "昨日",
    subject: "数学",
    title: "二次関数のグラフと解き方",
    text: "テスト前に見直したいポイントを、例題と一緒にまとめました。",
    image: photos[2],
    likes: 42,
    color: "mint",
    initials: "葵",
  },
];

function ExploreScreen() {
  const [query, setQuery] = useState("");
  const [liked, setLiked] = useState<number[]>([]);
  const [noteTab, setNoteTab] = useState("みんなのノート");
  const noteSource = noteTab === "みんなのノート" ? feed : myNotes;
  const visibleNotes = noteSource.filter((post) =>
    `${post.subject} ${post.title}`.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <div className="screen detail-screen explore-screen">
      <TopBar title="学習フィード" subtitle="見つけて学ぶ" trailing={<Avatar initials="葵" />} />
      <div className="search-box">
        <Icon name="search" size={20} />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="科目や学習テーマを検索"
        />
      </div>
      <div className="note-tabs" aria-label="ノートの表示切り替え">
        {["みんなのノート", "自分のノート"].map((item) => (
          <button
            key={item}
            className={noteTab === item ? "active" : ""}
            onClick={() => setNoteTab(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="topic-row">
        {["おすすめ", "物理", "歴史", "テスト対策"].map((topic, index) => (
          <button className={index === 0 ? "active" : ""} key={topic}>
            {topic}
          </button>
        ))}
      </div>
      <div className="feed-list">
        {visibleNotes.map((post, index) => (
          <article className="feed-card" key={post.title}>
            <div className="feed-author">
              <Avatar initials={post.initials} color={post.color} />
              <div>
                <b>{post.name}</b>
                <span>
                  {post.school} · {post.time}
                </span>
              </div>
              <button>•••</button>
            </div>
            <div className="note-photo">
              <img src={post.image} alt={`${post.title}の学習ノート`} />
              <span>{post.subject}</span>
              <div className="earned">
                <Icon name="clock" size={13} /> 45分
              </div>
            </div>
            <div className="feed-copy">
              <h2>{post.title}</h2>
              <p>{post.text}</p>
            </div>
            <div className="reaction-row">
              <button
                className={liked.includes(index) ? "liked" : ""}
                onClick={() =>
                  setLiked((items) =>
                    items.includes(index) ? items.filter((i) => i !== index) : [...items, index],
                  )
                }
              >
                <Icon name="heart" size={18} /> {post.likes + (liked.includes(index) ? 1 : 0)}
              </button>
              <button>ありがとう</button>
              <button>なるほど</button>
            </div>
            <button className="download-button">
              <Icon name="download" size={17} /> 参考ノートを保存
            </button>
          </article>
        ))}
        {visibleNotes.length === 0 && (
          <div className="empty-search">
            <Icon name="search" size={28} />
            <h3>ノートが見つかりません</h3>
            <p>別の科目や学習テーマで検索してみてください。</p>
          </div>
        )}
      </div>
    </div>
  );
}

function Toggle({ initial = false }: { initial?: boolean }) {
  const [on, setOn] = useState(initial);
  return (
    <button
      className={`toggle ${on ? "on" : ""}`}
      onClick={() => setOn(!on)}
      aria-label={on ? "オフにする" : "オンにする"}
    >
      <i />
    </button>
  );
}

function SettingsScreen() {
  return (
    <div className="screen settings-screen">
      <TopBar
        title="設定"
        subtitle="あなたの学習環境"
        trailing={<button className="settings-button">完了</button>}
      />
      <div className="profile-card">
        <Avatar initials="葵" />
        <div>
          <h2>中村 葵</h2>
          <p>青葉高校 · 2年生</p>
          <span>エメラルドリーグ</span>
        </div>
        <button>
          <Icon name="chevron" />
        </button>
      </div>
      <h3 className="group-title">アカウント</h3>
      <div className="settings-group">
        <SettingRow icon="user-cog" color="green" title="プロフィール設定" value="編集" />
        <SettingRow icon="shield" color="purple" title="プライバシーと安全" />
      </div>
      <h3 className="group-title">通知</h3>
      <div className="settings-group">
        <SettingRow
          icon="swords"
          color="orange"
          title="陣地バトル通知"
          description="マスの獲得とチームの更新"
          control={<Toggle initial />}
        />
        <SettingRow
          icon="bell"
          color="blue"
          title="学習リマインダー"
          description="毎日 午後6:00"
          control={<Toggle initial />}
        />
      </div>
      <h3 className="group-title">学習モード</h3>
      <div className="settings-group">
        <SettingRow
          icon="clock"
          color="green"
          title="スクリーンタイム連携"
          description="集中セッションを自動で記録"
          control={<Toggle initial />}
        />
        <SettingRow
          icon="shield"
          color="pink"
          title="集中ロック"
          description="学習中は気が散るアプリを制限"
          control={<Toggle />}
        />
      </div>
      <h3 className="group-title">サポート</h3>
      <div className="settings-group">
        <SettingRow icon="help" color="slate" title="ヘルプとサポート" />
        <SettingRow icon="sparkles" color="amber" title="新着情報" value="2.4版" />
      </div>
      <p className="version">テラスタディ 2.4.0版</p>
    </div>
  );
}

function SettingRow({
  icon,
  color,
  title,
  description,
  value,
  control,
}: {
  icon: IconName;
  color: string;
  title: string;
  description?: string;
  value?: string;
  control?: ReactNode;
}) {
  return (
    <div className="setting-row">
      <div className={`setting-icon ${color}`}>
        <Icon name={icon} size={18} />
      </div>
      <div className="grow">
        <b>{title}</b>
        {description && <span>{description}</span>}
      </div>
      {control || (
        <>
          <small>{value}</small>
          <Icon name="chevron" size={17} />
        </>
      )}
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const swipeStart = useRef<{ x: number; y: number } | null>(null);
  const hiddenNav = screen === "explore";
  const navigate = (next: Screen) => setScreen(next);
  const goBack = () => setScreen("home");
  const screens: Screen[] = ["settings", "explore", "home", "battle", "ranking"];
  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest(".topic-row")) {
      swipeStart.current = null;
      return;
    }
    const touch = event.touches[0];
    swipeStart.current = { x: touch.clientX, y: touch.clientY };
  };
  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (!swipeStart.current) return;
    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - swipeStart.current.x;
    const deltaY = touch.clientY - swipeStart.current.y;
    swipeStart.current = null;
    if (Math.abs(deltaX) < 55 || Math.abs(deltaX) < Math.abs(deltaY) * 1.2) return;
    const currentIndex = screens.indexOf(screen);
    const nextIndex = deltaX < 0 ? currentIndex + 1 : currentIndex - 1;
    if (nextIndex >= 0 && nextIndex < screens.length) navigate(screens[nextIndex]);
  };
  return (
    <main className="app-shell">
      <div className="phone-frame">
        <div className="status-bar">
          <span>9:41</span>
          <div>
            <i />
            <i />
            <b />
          </div>
        </div>
        <div
          className={`app-content ${hiddenNav ? "no-tabs" : ""}`}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {screen === "home" && <HomeScreen />}
          {screen === "battle" && <BattleScreen />}
          {screen === "ranking" && <RankingScreen />}
          {screen === "explore" && <ExploreScreen />}
          {screen === "settings" && <SettingsScreen />}
        </div>
        {!hiddenNav && <BottomNav screen={screen} onNavigate={navigate} />}
        {hiddenNav && <Taskbar onBack={goBack} onHome={() => navigate("home")} />}
      </div>
    </main>
  );
}
