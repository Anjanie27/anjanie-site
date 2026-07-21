"use client";

import {
  Activity,
  ArrowDown,
  ArrowUp,
  BarChart3,
  BookOpen,
  CheckCircle2,
  Clock3,
  Crosshair,
  Download,
  ExternalLink,
  Gauge,
  Layers3,
  MousePointer2,
  Plus,
  Search,
  ShieldAlert,
  Target,
  Trash2,
  TrendingDown,
  TrendingUp,
  Waves,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { TradingViewWidget } from "./tradingview-widget";

const QUICK_SYMBOLS = [
  { label: "SPY", symbol: "AMEX:SPY" },
  { label: "QQQ", symbol: "NASDAQ:QQQ" },
  { label: "NVDA", symbol: "NASDAQ:NVDA" },
  { label: "TSLA", symbol: "NASDAQ:TSLA" },
  { label: "AAPL", symbol: "NASDAQ:AAPL" },
  { label: "META", symbol: "NASDAQ:META" },
  { label: "AMZN", symbol: "NASDAQ:AMZN" },
  { label: "MSFT", symbol: "NASDAQ:MSFT" },
];

const SYMBOL_MAP = Object.fromEntries(
  QUICK_SYMBOLS.map(({ label, symbol }) => [label, symbol]),
);

const STORAGE_KEY = "anjanie-trading-levels-v1";

const DASHBOARD_GUIDE = [
  {
    icon: Search,
    title: "Load a ticker",
    description: "Search a symbol or use a quick button. The chart opens on 1-minute candles.",
  },
  {
    icon: Waves,
    title: "Read the trend",
    description: "Use VWAP and EMA to see whether price is trending, pulling back, or moving sideways.",
  },
  {
    icon: MousePointer2,
    title: "Draw your level",
    description: "Choose the horizontal-line tool on the chart and place it at an important high or low.",
  },
  {
    icon: Target,
    title: "Log the mark",
    description: "Enter the price, time, and a short note in Session Levels so you can review it later.",
  },
  {
    icon: CheckCircle2,
    title: "Confirm, then act",
    description: "Look for agreement between price action, volume, RSI, and MACD instead of using one signal alone.",
  },
  {
    icon: Download,
    title: "Review your day",
    description: "Delete weak levels, keep useful notes, and export your journal to CSV after the session.",
  },
];

const SIGNAL_ROWS = [
  {
    indicator: "VWAP",
    bullish: "Price holds above VWAP; pullbacks reclaim it.",
    bearish: "Price stays below VWAP; rallies reject it.",
    caution: "Repeated crosses usually mean chop.",
  },
  {
    indicator: "EMA",
    bullish: "EMA slopes up and price respects it as support.",
    bearish: "EMA slopes down and price rejects it as resistance.",
    caution: "A flat EMA has little directional value.",
  },
  {
    indicator: "RSI",
    bullish: "RSI holds above 50 and pushes toward 60–70.",
    bearish: "RSI stays below 50 and falls toward 30–40.",
    caution: "Overbought or oversold alone is not an entry.",
  },
  {
    indicator: "MACD",
    bullish: "Bullish cross with a rising histogram.",
    bearish: "Bearish cross with a falling histogram.",
    caution: "Crosses lag and can whipsaw in ranges.",
  },
  {
    indicator: "Volume",
    bullish: "Expansion on a breakout or strong reclaim.",
    bearish: "Expansion on a breakdown or failed bounce.",
    caution: "Low-volume moves are easier to reverse.",
  },
  {
    indicator: "Levels",
    bullish: "Break, close above, then hold the retest.",
    bearish: "Break, close below, then fail the retest.",
    caution: "A wick through a level is not a confirmed break.",
  },
];

const TRADE_SETUPS = [
  {
    icon: TrendingUp,
    label: "Bullish continuation",
    tone: "emerald",
    points: [
      "Price above VWAP and a rising EMA",
      "Higher high and higher low structure",
      "Pullback holds support with lighter volume",
      "Momentum and volume strengthen on the next push",
    ],
  },
  {
    icon: TrendingDown,
    label: "Bearish continuation",
    tone: "rose",
    points: [
      "Price below VWAP and a falling EMA",
      "Lower high and lower low structure",
      "Bounce rejects resistance with lighter volume",
      "Selling volume expands on the next breakdown",
    ],
  },
  {
    icon: Target,
    label: "Breakout confirmation",
    tone: "sky",
    points: [
      "A clearly marked level is broken",
      "The candle closes beyond the level",
      "Volume is stronger than recent candles",
      "The retest holds before continuation",
    ],
  },
  {
    icon: ShieldAlert,
    label: "Stand aside",
    tone: "amber",
    points: [
      "VWAP and EMA are flat",
      "Candles overlap with long wicks",
      "Volume is fading near the middle of a range",
      "Indicators disagree and no level is confirmed",
    ],
  },
];

function getTodayKey() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Toronto",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

function getCurrentTime() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Toronto",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date());
}

function normalizeSymbol(value) {
  const cleaned = value.trim().toUpperCase().replace(/\s+/g, "");
  if (!cleaned) return "NASDAQ:AAPL";
  if (cleaned.includes(":")) return cleaned;
  return SYMBOL_MAP[cleaned] ?? `NASDAQ:${cleaned}`;
}

function symbolLabel(symbol) {
  return symbol.split(":").at(-1) ?? symbol;
}

function marketSession(now) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(now);

  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  const minutes = Number(values.hour) * 60 + Number(values.minute);
  const weekday = values.weekday;
  const weekdayOpen = !["Sat", "Sun"].includes(weekday);

  if (!weekdayOpen) {
    return { label: "Weekend", detail: "Regular session closed", open: false };
  }
  if (minutes < 4 * 60) {
    return { label: "Closed", detail: "Pre-market begins at 4:00 ET", open: false };
  }
  if (minutes < 9 * 60 + 30) {
    return { label: "Pre-market", detail: "Regular session opens at 9:30 ET", open: true };
  }
  if (minutes < 16 * 60) {
    return { label: "Market open", detail: "Regular session closes at 4:00 ET", open: true };
  }
  if (minutes < 20 * 60) {
    return { label: "After-hours", detail: "Extended session closes at 8:00 ET", open: true };
  }
  return { label: "Closed", detail: "Pre-market begins at 4:00 ET", open: false };
}

function escapeCsv(value) {
  const text = String(value ?? "");
  return `"${text.replaceAll('"', '""')}"`;
}

export function TradingDashboard() {
  const [symbol, setSymbol] = useState("NASDAQ:AAPL");
  const [symbolInput, setSymbolInput] = useState("AAPL");
  const [levels, setLevels] = useState([]);
  const [levelType, setLevelType] = useState("high");
  const [price, setPrice] = useState("");
  const [time, setTime] = useState(getCurrentTime);
  const [note, setNote] = useState("");
  const [clock, setClock] = useState(new Date());
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
      if (Array.isArray(stored)) setLevels(stored);
    } catch {
      setLevels([]);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(levels));
  }, [hydrated, levels]);

  useEffect(() => {
    const timer = window.setInterval(() => setClock(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const today = getTodayKey();
  const currentSymbolLevels = useMemo(
    () => levels.filter((level) => level.date === today && level.symbol === symbol),
    [levels, symbol, today],
  );

  const summary = useMemo(() => {
    const highs = currentSymbolLevels.filter((level) => level.type === "high");
    const lows = currentSymbolLevels.filter((level) => level.type === "low");
    return {
      high: highs.length ? Math.max(...highs.map((level) => level.price)) : null,
      low: lows.length ? Math.min(...lows.map((level) => level.price)) : null,
      total: currentSymbolLevels.length,
    };
  }, [currentSymbolLevels]);

  const session = marketSession(clock);
  const clockLabel = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Toronto",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
  }).format(clock);

  const chartConfig = useMemo(
    () => ({
      autosize: true,
      symbol,
      interval: "1",
      timezone: "America/New_York",
      theme: "light",
      backgroundColor: "rgba(255, 255, 255, 1)",
      gridColor: "rgba(125, 166, 242, 0.10)",
      style: "1",
      locale: "en",
      allow_symbol_change: true,
      withdateranges: true,
      hide_side_toolbar: false,
      hide_top_toolbar: false,
      hide_legend: false,
      hide_volume: false,
      save_image: true,
      details: false,
      hotlist: false,
      calendar: false,
      studies: [
        "VWAP@tv-basicstudies",
        "MAExp@tv-basicstudies",
        "RSI@tv-basicstudies",
        "MACD@tv-basicstudies",
      ],
      watchlist: QUICK_SYMBOLS.map((item) => item.symbol),
      support_host: "https://www.tradingview.com",
    }),
    [symbol],
  );

  const tickerConfig = useMemo(
    () => ({
      symbols: [
        { proName: "FOREXCOM:SPXUSD", title: "S&P 500" },
        { proName: "NASDAQ:NDX", title: "Nasdaq 100" },
        { proName: "DJ:DJI", title: "Dow 30" },
        { proName: "AMEX:SPY", title: "SPY" },
        { proName: "NASDAQ:QQQ", title: "QQQ" },
        { proName: "NASDAQ:NVDA", title: "NVDA" },
        { proName: "NASDAQ:TSLA", title: "TSLA" },
        { proName: "NASDAQ:AAPL", title: "AAPL" },
      ],
      showSymbolLogo: true,
      isTransparent: true,
      displayMode: "adaptive",
      colorTheme: "light",
      locale: "en",
    }),
    [],
  );

  const screenerConfig = useMemo(
    () => ({
      width: "100%",
      height: "100%",
      defaultColumn: "overview",
      defaultScreen: "top_gainers",
      showToolbar: true,
      locale: "en",
      market: "us",
      colorTheme: "light",
    }),
    [],
  );

  function applySymbol(nextValue = symbolInput) {
    const normalized = normalizeSymbol(nextValue);
    setSymbol(normalized);
    setSymbolInput(symbolLabel(normalized));
  }

  function addLevel(event) {
    event.preventDefault();
    const numericPrice = Number(price);
    if (!Number.isFinite(numericPrice) || numericPrice <= 0) return;

    const level = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      symbol,
      date: today,
      type: levelType,
      price: numericPrice,
      time: time || getCurrentTime(),
      note: note.trim(),
    };

    setLevels((current) => [level, ...current]);
    setPrice("");
    setTime(getCurrentTime());
    setNote("");
  }

  function removeLevel(id) {
    setLevels((current) => current.filter((level) => level.id !== id));
  }

  function clearSymbolDay() {
    setLevels((current) =>
      current.filter((level) => !(level.date === today && level.symbol === symbol)),
    );
  }

  function exportLevels() {
    const rows = [
      ["Date", "Time", "Symbol", "Type", "Price", "Note"],
      ...levels.map((level) => [
        level.date,
        level.time,
        level.symbol,
        level.type,
        level.price,
        level.note,
      ]),
    ];

    const csv = rows.map((row) => row.map(escapeCsv).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `trading-levels-${today}.csv`;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main className="relative min-h-screen overflow-hidden pb-16">
      <div className="pointer-events-none absolute left-[-8rem] top-24 h-80 w-80 rounded-full bg-skyblue/20 blur-3xl" />
      <div className="pointer-events-none absolute right-[-8rem] top-[30rem] h-96 w-96 rounded-full bg-[#f9a8d4]/15 blur-3xl" />

      <section className="mx-auto max-w-[1600px] px-4 lg:px-8">
        <div className="glass-card overflow-hidden rounded-[2rem]">
          <TradingViewWidget
            scriptSrc="https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js"
            config={tickerConfig}
            className="min-h-[74px] w-full"
            ariaLabel="Live market ticker tape"
          />
        </div>

        <div className="mt-6 flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-jordyblue/20 bg-white/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-jordyblue shadow-sm">
              <Activity size={15} /> Live Trading Workspace
            </div>
            <h1 className="text-4xl font-black tracking-tight text-slate-800 md:text-5xl">
              Intraday <span className="animated-gradient-text">Trading Dashboard</span>
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600 md:text-base">
              Follow 1-minute candles, use the chart drawing toolbar for horizontal levels,
              and journal each intraday high or low beside the chart.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/70 bg-white/72 px-4 py-3 shadow-sm backdrop-blur-xl">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                <Clock3 size={14} /> Toronto
              </div>
              <div className="mt-1 font-mono text-lg font-bold text-slate-700">{clockLabel}</div>
            </div>
            <div className="rounded-2xl border border-white/70 bg-white/72 px-4 py-3 shadow-sm backdrop-blur-xl">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Session</div>
              <div className="mt-1 flex items-center gap-2 text-sm font-bold text-slate-700">
                <span
                  className={`h-2.5 w-2.5 rounded-full ${session.open ? "bg-emerald-500" : "bg-slate-400"}`}
                />
                {session.label}
              </div>
              <div className="mt-1 text-[11px] text-slate-400">{session.detail}</div>
            </div>
            <div className="col-span-2 rounded-2xl border border-white/70 bg-white/72 px-4 py-3 shadow-sm backdrop-blur-xl sm:col-span-1">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Chart</div>
              <div className="mt-1 text-lg font-black text-slate-700">{symbolLabel(symbol)} · 1m</div>
              <div className="text-[11px] text-slate-400">Candles + indicators</div>
            </div>
          </div>
        </div>

        <section className="mt-7 grid gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="min-w-0 space-y-5">
            <div className="glass-card rounded-[2rem] p-3 md:p-5">
              <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    applySymbol();
                  }}
                  className="flex w-full max-w-xl items-center gap-2"
                >
                  <div className="relative flex-1">
                    <Search
                      size={17}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      value={symbolInput}
                      onChange={(event) => setSymbolInput(event.target.value)}
                      placeholder="Ticker or EXCHANGE:TICKER"
                      className="w-full rounded-2xl border border-jordyblue/20 bg-white/85 py-3 pl-11 pr-4 text-sm font-bold uppercase text-slate-700 outline-none transition focus:border-jordyblue focus:ring-4 focus:ring-jordyblue/10"
                    />
                  </div>
                  <button
                    type="submit"
                    className="rounded-2xl bg-gradient-to-r from-jordyblue to-skyblue px-5 py-3 text-sm font-bold text-white shadow-lg shadow-jordyblue/20 transition hover:-translate-y-0.5"
                  >
                    Load
                  </button>
                </form>

                <a
                  href="https://www.tradingview.com/markets/stocks-usa/market-movers-gainers/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-jordyblue/20 bg-white/75 px-4 py-3 text-sm font-bold text-jordyblue transition hover:bg-white"
                >
                  Full US gainers <ExternalLink size={15} />
                </a>
              </div>

              <div className="mb-4 flex flex-wrap gap-2">
                {QUICK_SYMBOLS.map((item) => {
                  const active = symbol === item.symbol;
                  return (
                    <button
                      key={item.symbol}
                      onClick={() => {
                        setSymbol(item.symbol);
                        setSymbolInput(item.label);
                      }}
                      className={`rounded-xl border px-3 py-2 text-xs font-black transition ${
                        active
                          ? "border-jordyblue bg-jordyblue text-white shadow-md shadow-jordyblue/20"
                          : "border-slate-200 bg-white/75 text-slate-600 hover:border-jordyblue/40 hover:text-jordyblue"
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>

              <div className="h-[680px] overflow-hidden rounded-[1.35rem] border border-slate-200 bg-white shadow-inner md:h-[760px]">
                <TradingViewWidget
                  scriptSrc="https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js"
                  config={chartConfig}
                  ariaLabel={`${symbolLabel(symbol)} one-minute candlestick chart`}
                />
              </div>

              <div className="mt-4 grid gap-3 text-xs text-slate-500 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  [Crosshair, "Mark levels", "Use the left toolbar to draw horizontal lines."],
                  [Layers3, "VWAP + EMA", "Trend and intraday fair-value overlays."],
                  [Gauge, "RSI", "Momentum pane for strength and exhaustion."],
                  [BarChart3, "MACD", "Momentum and trend-change confirmation."],
                ].map(([Icon, title, description]) => (
                  <div key={title} className="rounded-2xl border border-slate-200 bg-white/72 p-3">
                    <div className="flex items-center gap-2 font-bold text-slate-700">
                      <Icon size={15} className="text-jordyblue" /> {title}
                    </div>
                    <p className="mt-1 leading-5">{description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card rounded-[2rem] p-4 md:p-6">
              <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center gap-2 text-lg font-black text-slate-800">
                    <ArrowUp size={19} className="text-emerald-500" /> US Market Gainers
                  </div>
                  <p className="mt-1 text-sm text-slate-500">
                    Live TradingView screener sorted by top gainers.
                  </p>
                </div>
              </div>
              <div className="h-[620px] overflow-hidden rounded-[1.35rem] border border-slate-200 bg-white">
                <TradingViewWidget
                  scriptSrc="https://s3.tradingview.com/external-embedding/embed-widget-screener.js"
                  config={screenerConfig}
                  ariaLabel="US top gainers stock screener"
                />
              </div>
            </div>
          </div>

          <aside className="space-y-5 xl:sticky xl:top-32 xl:self-start">
            <div className="glass-card rounded-[2rem] p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.2em] text-jordyblue">
                    Session Levels
                  </div>
                  <h2 className="mt-1 text-2xl font-black text-slate-800">
                    {symbolLabel(symbol)} Highs & Lows
                  </h2>
                </div>
                <button
                  onClick={exportLevels}
                  title="Export all saved levels"
                  className="rounded-xl border border-jordyblue/20 bg-white/75 p-2.5 text-jordyblue transition hover:bg-white"
                >
                  <Download size={17} />
                </button>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-2">
                <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-3">
                  <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-emerald-600">
                    <ArrowUp size={12} /> High
                  </div>
                  <div className="mt-1 truncate text-lg font-black text-slate-800">
                    {summary.high === null ? "—" : `$${summary.high.toFixed(2)}`}
                  </div>
                </div>
                <div className="rounded-2xl border border-rose-100 bg-rose-50/70 p-3">
                  <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-rose-500">
                    <ArrowDown size={12} /> Low
                  </div>
                  <div className="mt-1 truncate text-lg font-black text-slate-800">
                    {summary.low === null ? "—" : `$${summary.low.toFixed(2)}`}
                  </div>
                </div>
                <div className="rounded-2xl border border-sky-100 bg-sky-50/70 p-3">
                  <div className="text-[10px] font-black uppercase tracking-wider text-sky-600">Marks</div>
                  <div className="mt-1 text-lg font-black text-slate-800">{summary.total}</div>
                </div>
              </div>

              <form onSubmit={addLevel} className="mt-5 space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setLevelType("high")}
                    className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-black transition ${
                      levelType === "high"
                        ? "border-emerald-400 bg-emerald-500 text-white"
                        : "border-slate-200 bg-white/75 text-slate-500"
                    }`}
                  >
                    <ArrowUp size={15} /> High
                  </button>
                  <button
                    type="button"
                    onClick={() => setLevelType("low")}
                    className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-black transition ${
                      levelType === "low"
                        ? "border-rose-400 bg-rose-500 text-white"
                        : "border-slate-200 bg-white/75 text-slate-500"
                    }`}
                  >
                    <ArrowDown size={15} /> Low
                  </button>
                </div>

                <div className="grid grid-cols-[1fr_112px] gap-2">
                  <label className="block">
                    <span className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Price
                    </span>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      required
                      value={price}
                      onChange={(event) => setPrice(event.target.value)}
                      placeholder="0.00"
                      className="w-full rounded-xl border border-slate-200 bg-white/85 px-3 py-2.5 text-sm font-bold text-slate-700 outline-none focus:border-jordyblue focus:ring-4 focus:ring-jordyblue/10"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Time
                    </span>
                    <input
                      type="time"
                      value={time}
                      onChange={(event) => setTime(event.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white/85 px-3 py-2.5 text-sm font-bold text-slate-700 outline-none focus:border-jordyblue focus:ring-4 focus:ring-jordyblue/10"
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Note
                  </span>
                  <input
                    value={note}
                    onChange={(event) => setNote(event.target.value)}
                    placeholder="e.g. pre-market high, VWAP rejection"
                    className="w-full rounded-xl border border-slate-200 bg-white/85 px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-jordyblue focus:ring-4 focus:ring-jordyblue/10"
                  />
                </label>

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-slate-800 to-slate-700 px-4 py-3 text-sm font-black text-white shadow-lg shadow-slate-500/15 transition hover:-translate-y-0.5"
                >
                  <Plus size={16} /> Add {levelType}
                </button>
              </form>
            </div>

            <div className="glass-card rounded-[2rem] p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="font-black text-slate-800">Today&apos;s marks</h3>
                  <p className="text-xs text-slate-400">Stored locally in this browser.</p>
                </div>
                {currentSymbolLevels.length > 0 && (
                  <button
                    onClick={clearSymbolDay}
                    className="rounded-xl border border-rose-200 bg-rose-50 p-2 text-rose-500 transition hover:bg-rose-100"
                    title="Clear today's marks for this symbol"
                  >
                    <Trash2 size={15} />
                  </button>
                )}
              </div>

              <div className="custom-scrollbar mt-4 max-h-[370px] space-y-2 overflow-y-auto pr-1">
                {currentSymbolLevels.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-slate-200 bg-white/45 px-4 py-8 text-center">
                    <Crosshair size={24} className="mx-auto text-slate-300" />
                    <p className="mt-2 text-sm font-bold text-slate-500">No levels marked yet</p>
                    <p className="mt-1 text-xs leading-5 text-slate-400">
                      Draw a line on the chart, then log its price here.
                    </p>
                  </div>
                ) : (
                  currentSymbolLevels.map((level) => (
                    <div
                      key={level.id}
                      className="group rounded-2xl border border-slate-200 bg-white/78 p-3 shadow-sm"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span
                              className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-black uppercase tracking-wider ${
                                level.type === "high"
                                  ? "bg-emerald-100 text-emerald-700"
                                  : "bg-rose-100 text-rose-600"
                              }`}
                            >
                              {level.type === "high" ? <ArrowUp size={11} /> : <ArrowDown size={11} />}
                              {level.type}
                            </span>
                            <span className="text-xs font-bold text-slate-400">{level.time}</span>
                          </div>
                          <div className="mt-2 text-xl font-black text-slate-800">
                            ${Number(level.price).toFixed(2)}
                          </div>
                          {level.note && (
                            <p className="mt-1 break-words text-xs leading-5 text-slate-500">{level.note}</p>
                          )}
                        </div>
                        <button
                          onClick={() => removeLevel(level.id)}
                          className="rounded-lg p-2 text-slate-300 opacity-70 transition hover:bg-rose-50 hover:text-rose-500 group-hover:opacity-100"
                          title="Delete level"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="glass-card rounded-[2rem] p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-jordyblue to-skyblue text-white shadow-lg shadow-jordyblue/20">
                  <BookOpen size={20} />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.2em] text-jordyblue">Quick Manual</div>
                  <h3 className="text-xl font-black text-slate-800">How to use the dashboard</h3>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                {DASHBOARD_GUIDE.map(({ icon: Icon, title, description }, index) => (
                  <div
                    key={title}
                    className="flex gap-3 rounded-2xl border border-slate-200 bg-white/72 p-3.5"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-jordyblue/10 text-jordyblue">
                      <Icon size={15} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <h4 className="text-sm font-black text-slate-700">{title}</h4>
                      </div>
                      <p className="mt-1 text-xs leading-5 text-slate-500">{description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-2xl border border-jordyblue/15 bg-jordyblue/5 p-4 text-xs leading-5 text-slate-600">
                <strong className="text-slate-700">Simple workflow:</strong> level first, setup second, confirmation third. Avoid entering only because one indicator flashes a signal.
              </div>
            </div>

            <div className="rounded-[2rem] border border-amber-200/70 bg-amber-50/80 p-5 text-xs leading-5 text-amber-900 shadow-sm backdrop-blur-xl">
              <strong>Market-data note:</strong> TradingView controls exchange coverage and whether a
              quote is real-time or delayed. This dashboard is for charting and journaling, not order
              execution or financial advice.
            </div>
          </aside>
        </section>

        <section className="glass-card mt-7 rounded-[2rem] p-4 md:p-7">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-jordyblue/20 bg-white/75 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-jordyblue">
                <BarChart3 size={14} /> Reference Guide
              </div>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-800">
                Charting Signal <span className="animated-gradient-text">Cheat Sheet</span>
              </h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
                Use these clues as confirmation around a marked level. Stronger setups normally have trend, structure, momentum, and volume pointing in the same direction.
              </p>
            </div>
            <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs leading-5 text-amber-900 lg:max-w-sm">
              <strong>Rule of thumb:</strong> never treat an indicator as a guarantee. Define your invalidation level and risk before entering.
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {TRADE_SETUPS.map(({ icon: Icon, label, tone, points }) => {
              const toneClasses = {
                emerald: "border-emerald-200 bg-emerald-50/70 text-emerald-700",
                rose: "border-rose-200 bg-rose-50/70 text-rose-600",
                sky: "border-sky-200 bg-sky-50/70 text-sky-700",
                amber: "border-amber-200 bg-amber-50/70 text-amber-700",
              };
              return (
                <article key={label} className={`rounded-2xl border p-4 ${toneClasses[tone]}`}>
                  <div className="flex items-center gap-2 font-black">
                    <Icon size={18} /> {label}
                  </div>
                  <ul className="mt-3 space-y-2 text-xs leading-5 text-slate-600">
                    {points.map((point) => (
                      <li key={point} className="flex gap-2">
                        <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-70" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>

          <div className="mt-6 overflow-hidden rounded-[1.35rem] border border-slate-200 bg-white/75">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] border-collapse text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/90 text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">
                    <th className="px-4 py-3">Indicator</th>
                    <th className="px-4 py-3 text-emerald-600">Bullish clue</th>
                    <th className="px-4 py-3 text-rose-500">Bearish clue</th>
                    <th className="px-4 py-3 text-amber-600">Watch out</th>
                  </tr>
                </thead>
                <tbody>
                  {SIGNAL_ROWS.map((row) => (
                    <tr key={row.indicator} className="border-b border-slate-100 last:border-0">
                      <th className="px-4 py-3.5 text-sm font-black text-slate-700">{row.indicator}</th>
                      <td className="px-4 py-3.5 leading-5 text-slate-600">{row.bullish}</td>
                      <td className="px-4 py-3.5 leading-5 text-slate-600">{row.bearish}</td>
                      <td className="px-4 py-3.5 leading-5 text-slate-500">{row.caution}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {[
              ["1. Mark", "Identify pre-market high/low, prior-day levels, VWAP, and clean support or resistance."],
              ["2. Wait", "Let price reach the level and show a break, rejection, reclaim, or retest."],
              ["3. Confirm", "Check candle close, volume, trend, RSI/MACD agreement, and a clear invalidation point."],
            ].map(([title, description]) => (
              <div key={title} className="rounded-2xl border border-slate-200 bg-white/72 p-4">
                <div className="font-black text-slate-700">{title}</div>
                <p className="mt-1 text-xs leading-5 text-slate-500">{description}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 overflow-hidden rounded-[1.5rem] border border-slate-700/20 bg-[#172126] shadow-xl shadow-slate-900/10">
            <div className="flex flex-col gap-3 border-b border-white/10 bg-[#11191d] px-4 py-4 sm:flex-row sm:items-center sm:justify-between md:px-6">
              <div>
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-sky-300">
                  Visual reference
                </div>
                <h3 className="mt-1 text-lg font-black text-white md:text-xl">
                  Candlestick & Chart Pattern Cheat Sheet
                </h3>
                <p className="mt-1 text-xs leading-5 text-slate-300">
                  Review common bullish, bearish, breakout, and divergence patterns while planning a setup.
                </p>
              </div>
              <a
                href="/images/candlestick-chart-pattern-cheat-sheet.png"
                target="_blank"
                rel="noreferrer"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 py-2.5 text-xs font-black text-white transition hover:bg-white/15"
              >
                Open full size <ExternalLink size={14} />
              </a>
            </div>
            <a
              href="/images/candlestick-chart-pattern-cheat-sheet.png"
              target="_blank"
              rel="noreferrer"
              aria-label="Open the candlestick and chart pattern cheat sheet at full size"
              className="block bg-[#1b262b]"
            >
              <img
                src="/images/candlestick-chart-pattern-cheat-sheet.png"
                alt="Candlestick cheat sheet showing bullish, neutral, and bearish candlestick patterns, breakout chart patterns, trading patterns, and divergence examples"
                loading="lazy"
                className="mx-auto h-auto w-full max-w-[1100px] object-contain"
              />
            </a>
          </div>
        </section>
      </section>
    </main>
  );
}
