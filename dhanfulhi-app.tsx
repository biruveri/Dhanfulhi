import { useState, useEffect, useRef } from "react";

// ── THEME & CONSTANTS ──────────────────────────────────────────────────────────
const GOLD = "#C9A84C";
const GOLD_LIGHT = "#E8C96A";
const GOLD_DARK = "#A07830";

const DARK = {
  bg: "#0A0A0A",
  surface: "#111111",
  card: "#181818",
  border: "#2A2A2A",
  text: "#F5F5F5",
  muted: "#888888",
  accent: GOLD,
};

const LIGHT = {
  bg: "#F8F6F2",
  surface: "#FFFFFF",
  card: "#F0EDE6",
  border: "#E2DDD4",
  text: "#1A1A1A",
  muted: "#888888",
  accent: GOLD_DARK,
};

const CLIENTS = [
  { id: 1, name: "Aisha Malik", age: 28, gender: "Female", height: "165cm", weight: "62kg", goal: "Weight Loss", plan: "Shred Protocol", status: "active", progress: 72, checkin: "Today", fat: 24, img: "AM" },
  { id: 2, name: "James Osei", age: 34, gender: "Male", height: "182cm", weight: "88kg", goal: "Muscle Gain", plan: "Hypertrophy X", status: "active", progress: 55, checkin: "Tomorrow", fat: 18, img: "JO" },
  { id: 3, name: "Priya Nair", age: 26, gender: "Female", height: "158cm", weight: "55kg", goal: "Toning", plan: "Lean Build", status: "active", progress: 88, checkin: "Wed", fat: 22, img: "PN" },
  { id: 4, name: "Marcus Teo", age: 41, gender: "Male", height: "175cm", weight: "95kg", goal: "Fat Loss", plan: "Metabolic Reset", status: "paused", progress: 33, checkin: "Thu", fat: 28, img: "MT" },
  { id: 5, name: "Layla Hassan", age: 31, gender: "Female", height: "170cm", weight: "70kg", goal: "Athletic Perf.", plan: "Power Cycle", status: "active", progress: 61, checkin: "Fri", fat: 20, img: "LH" },
];

const EXERCISES = [
  { id: 1, name: "Barbell Back Squat", muscle: "Quads", category: "Strength", sets: 4, reps: "8-10", rest: "90s" },
  { id: 2, name: "Romanian Deadlift", muscle: "Hamstrings", category: "Strength", sets: 3, reps: "10-12", rest: "75s" },
  { id: 3, name: "Incline Dumbbell Press", muscle: "Chest", category: "Hypertrophy", sets: 4, reps: "10-12", rest: "60s" },
  { id: 4, name: "Pull-Up", muscle: "Back", category: "Bodyweight", sets: 3, reps: "Max", rest: "90s" },
  { id: 5, name: "Bulgarian Split Squat", muscle: "Glutes", category: "Strength", sets: 3, reps: "12 each", rest: "60s" },
  { id: 6, name: "Cable Lateral Raise", muscle: "Shoulders", category: "Isolation", sets: 4, reps: "15-20", rest: "45s" },
];

const MESSAGES = [
  { id: 1, client: "Aisha Malik", initials: "AM", text: "Finished session! Felt amazing 💪", time: "2m ago", unread: true },
  { id: 2, client: "James Osei", initials: "JO", text: "Can we adjust Tuesday's workout?", time: "14m ago", unread: true },
  { id: 3, client: "Priya Nair", initials: "PN", text: "Meal plan received, thank you!", time: "1h ago", unread: false },
  { id: 4, client: "Marcus Teo", initials: "MT", text: "Struggling with the diet this week...", time: "3h ago", unread: false },
];

const REVENUE = [18400, 21200, 19800, 24500, 22100, 26800, 28300];
const MONTHS = ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May"];

// ── UTILITIES ──────────────────────────────────────────────────────────────────
function Avatar({ initials, size = 40, gold = false }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: gold ? `linear-gradient(135deg, ${GOLD_DARK}, ${GOLD_LIGHT})` : `linear-gradient(135deg, #2A2A2A, #444)`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: size * 0.35, fontWeight: 700, color: gold ? "#000" : GOLD,
      flexShrink: 0, fontFamily: "'Playfair Display', serif",
    }}>
      {initials}
    </div>
  );
}

function GoldBadge({ children, small }) {
  return (
    <span style={{
      background: `linear-gradient(135deg, ${GOLD_DARK}22, ${GOLD}33)`,
      border: `1px solid ${GOLD}44`,
      color: GOLD,
      padding: small ? "2px 8px" : "4px 12px",
      borderRadius: 20, fontSize: small ? 10 : 11,
      fontWeight: 600, letterSpacing: "0.05em",
    }}>{children}</span>
  );
}

function ProgressBar({ value, color = GOLD, height = 4 }) {
  return (
    <div style={{ background: "#ffffff18", borderRadius: 99, height, overflow: "hidden" }}>
      <div style={{
        width: `${value}%`, height: "100%",
        background: `linear-gradient(90deg, ${GOLD_DARK}, ${GOLD_LIGHT})`,
        borderRadius: 99, transition: "width 0.8s ease",
      }} />
    </div>
  );
}

function MiniChart({ data, color = GOLD }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 120, h = 40;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * (h - 6) - 3}`).join(" ");
  return (
    <svg width={w} height={h} style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={`0,${h} ${pts} ${w},${h}`} fill="url(#cg)" />
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── AI MODAL ───────────────────────────────────────────────────────────────────
function AIModal({ onClose, type, theme }) {
  const t = theme;
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const placeholder = type === "workout"
    ? "e.g. 3-day split for intermediate female client, fat loss goal, gym access..."
    : "e.g. 2000 cal plan for 80kg male, high protein, lactose intolerant...";

  const systemPrompt = type === "workout"
    ? "You are an elite personal trainer. Generate a detailed, structured workout program based on the client description. Include days, exercises, sets, reps, rest periods, and coaching notes. Format clearly with headings."
    : "You are a certified nutritionist. Generate a detailed meal plan based on the client description. Include meals, macros, calories, and preparation tips. Format clearly with headings.";

  async function generate() {
    if (!prompt.trim()) return;
    setLoading(true);
    setResult("");
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: systemPrompt,
          messages: [{ role: "user", content: prompt }],
        }),
      });
      const data = await res.json();
      setResult(data.content?.[0]?.text || "No result generated.");
    } catch (e) {
      setResult("Error generating. Please try again.");
    }
    setLoading(false);
  }

  return (
    <div style={{
      position: "fixed", inset: 0, background: "#000000CC", zIndex: 1000,
      display: "flex", alignItems: "flex-end", justifyContent: "center",
    }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        background: t.card, borderRadius: "24px 24px 0 0",
        width: "100%", maxWidth: 430, maxHeight: "90vh",
        display: "flex", flexDirection: "column",
        border: `1px solid ${GOLD}33`, borderBottom: "none",
        animation: "slideUp 0.3s ease",
      }}>
        <div style={{ padding: "20px 20px 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 11, color: GOLD, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}>
              AI Generator
            </div>
            <div style={{ fontSize: 20, fontWeight: 800, color: t.text, fontFamily: "'Playfair Display', serif" }}>
              {type === "workout" ? "⚡ Workout Plan" : "🥗 Meal Plan"}
            </div>
          </div>
          <button onClick={onClose} style={{ background: t.border, border: "none", color: t.muted, borderRadius: "50%", width: 32, height: 32, cursor: "pointer", fontSize: 16 }}>×</button>
        </div>

        <div style={{ padding: 20, flex: 1, overflowY: "auto" }}>
          <textarea
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            placeholder={placeholder}
            rows={4}
            style={{
              width: "100%", background: t.surface, border: `1px solid ${t.border}`,
              borderRadius: 12, padding: 14, color: t.text, fontSize: 14, resize: "none",
              outline: "none", fontFamily: "inherit", boxSizing: "border-box",
            }}
          />

          <button onClick={generate} disabled={loading || !prompt.trim()} style={{
            width: "100%", padding: 14, marginTop: 10,
            background: loading ? t.border : `linear-gradient(135deg, ${GOLD_DARK}, ${GOLD_LIGHT})`,
            border: "none", borderRadius: 12, color: loading ? t.muted : "#000",
            fontWeight: 800, fontSize: 15, cursor: loading ? "not-allowed" : "pointer",
            letterSpacing: "0.05em",
          }}>
            {loading ? "✨ Generating..." : "✨ Generate with AI"}
          </button>

          {result && (
            <div style={{
              marginTop: 16, background: t.surface, borderRadius: 12,
              padding: 16, border: `1px solid ${GOLD}22`,
              fontSize: 13, color: t.text, lineHeight: 1.7,
              whiteSpace: "pre-wrap", maxHeight: 300, overflowY: "auto",
            }}>
              {result}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── SCREENS ───────────────────────────────────────────────────────────────────

function Dashboard({ theme: t, onNav }) {
  const [aiModal, setAiModal] = useState(null);

  const stats = [
    { label: "Total Clients", value: "24", sub: "+3 this month", icon: "👥" },
    { label: "Active Plans", value: "19", sub: "5 plans paused", icon: "📋" },
    { label: "Check-ins Due", value: "6", sub: "Today", icon: "✅" },
    { label: "Revenue", value: "$8.4k", sub: "+12% vs last mo.", icon: "💰" },
  ];

  return (
    <div style={{ paddingBottom: 32 }}>
      {aiModal && <AIModal onClose={() => setAiModal(null)} type={aiModal} theme={t} />}

      {/* Header */}
      <div style={{
        padding: "20px 20px 16px",
        background: `linear-gradient(180deg, ${GOLD}18 0%, transparent 100%)`,
        borderBottom: `1px solid ${t.border}`,
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontSize: 12, color: GOLD, fontWeight: 700, letterSpacing: "0.15em" }}>GOOD MORNING</div>
            <div style={{ fontSize: 26, fontWeight: 800, color: t.text, fontFamily: "'Playfair Display', serif", lineHeight: 1.2 }}>
              Coach Hassan 👋
            </div>
          </div>
          <Avatar initials="CH" size={48} gold />
        </div>

        {/* AI Quick Access */}
        <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
          <button onClick={() => setAiModal("workout")} style={{
            flex: 1, padding: "10px 12px",
            background: `linear-gradient(135deg, ${GOLD_DARK}33, ${GOLD}22)`,
            border: `1px solid ${GOLD}44`, borderRadius: 12,
            color: GOLD, fontSize: 12, fontWeight: 700, cursor: "pointer",
            display: "flex", alignItems: "center", gap: 6,
          }}>
            <span>⚡</span> AI Workout
          </button>
          <button onClick={() => setAiModal("meal")} style={{
            flex: 1, padding: "10px 12px",
            background: `linear-gradient(135deg, #2A6644, #1a4428)`,
            border: `1px solid #4CAF7044`, borderRadius: 12,
            color: "#6BCB8B", fontSize: 12, fontWeight: 700, cursor: "pointer",
            display: "flex", alignItems: "center", gap: 6,
          }}>
            <span>🥗</span> AI Meal Plan
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, padding: "16px 20px 0" }}>
        {stats.map((s, i) => (
          <div key={i} style={{
            background: t.card, borderRadius: 16, padding: 16,
            border: `1px solid ${t.border}`,
            position: "relative", overflow: "hidden",
          }}>
            <div style={{ position: "absolute", top: -8, right: -8, fontSize: 40, opacity: 0.08 }}>{s.icon}</div>
            <div style={{ fontSize: 24 }}>{s.icon}</div>
            <div style={{ fontSize: 26, fontWeight: 900, color: t.text, fontFamily: "'Playfair Display', serif", lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: t.text, marginTop: 2 }}>{s.label}</div>
            <div style={{ fontSize: 11, color: GOLD, marginTop: 2 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Revenue Chart */}
      <div style={{ margin: "16px 20px 0", background: t.card, borderRadius: 16, padding: 16, border: `1px solid ${t.border}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: t.text }}>Revenue</div>
          <GoldBadge small>+18% YTD</GoldBadge>
        </div>
        <div style={{ overflowX: "auto" }}>
          <svg width="100%" height={80} viewBox="0 0 320 80" preserveAspectRatio="none">
            <defs>
              <linearGradient id="rg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={GOLD} stopOpacity="0.3" />
                <stop offset="100%" stopColor={GOLD} stopOpacity="0" />
              </linearGradient>
            </defs>
            {(() => {
              const max = Math.max(...REVENUE);
              const min = Math.min(...REVENUE) * 0.9;
              const pts = REVENUE.map((v, i) => `${(i / 6) * 300 + 10},${70 - ((v - min) / (max - min)) * 60}`);
              const path = pts.join(" ");
              return (
                <>
                  <polygon points={`10,75 ${path} 310,75`} fill="url(#rg)" />
                  <polyline points={path} fill="none" stroke={GOLD} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  {pts.map((p, i) => {
                    const [x, y] = p.split(",");
                    return <circle key={i} cx={x} cy={y} r="3.5" fill={GOLD} />;
                  })}
                </>
              );
            })()}
          </svg>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
          {MONTHS.map(m => <div key={m} style={{ fontSize: 10, color: t.muted }}>{m}</div>)}
        </div>
      </div>

      {/* Today's Check-ins */}
      <div style={{ padding: "16px 20px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div style={{ fontSize: 16, fontWeight: 800, color: t.text, fontFamily: "'Playfair Display', serif" }}>Today's Check-ins</div>
          <button onClick={() => onNav("checkins")} style={{ background: "none", border: "none", color: GOLD, fontSize: 12, fontWeight: 700, cursor: "pointer" }}>View All</button>
        </div>
        {CLIENTS.slice(0, 3).map(c => (
          <div key={c.id} style={{
            display: "flex", alignItems: "center", gap: 12,
            background: t.card, borderRadius: 14, padding: "12px 14px",
            border: `1px solid ${t.border}`, marginBottom: 8,
          }}>
            <Avatar initials={c.img} size={40} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: t.text }}>{c.name}</div>
              <div style={{ fontSize: 12, color: t.muted }}>{c.plan}</div>
              <ProgressBar value={c.progress} height={3} />
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: GOLD }}>{c.progress}%</div>
              <GoldBadge small>{c.checkin}</GoldBadge>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Clients({ theme: t }) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const filtered = CLIENTS.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  if (selected) {
    const c = selected;
    return (
      <div>
        <div style={{ padding: "16px 20px", display: "flex", alignItems: "center", gap: 12, borderBottom: `1px solid ${t.border}` }}>
          <button onClick={() => setSelected(null)} style={{ background: t.card, border: `1px solid ${t.border}`, color: t.text, borderRadius: 10, padding: "6px 12px", cursor: "pointer", fontSize: 13 }}>← Back</button>
          <div style={{ fontSize: 16, fontWeight: 800, color: t.text, fontFamily: "'Playfair Display', serif" }}>Client Profile</div>
        </div>

        <div style={{ padding: "20px 20px 0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
            <Avatar initials={c.img} size={64} gold />
            <div>
              <div style={{ fontSize: 22, fontWeight: 800, color: t.text, fontFamily: "'Playfair Display', serif" }}>{c.name}</div>
              <div style={{ color: t.muted, fontSize: 13 }}>{c.goal} · {c.plan}</div>
              <GoldBadge small>{c.status === "active" ? "Active" : "Paused"}</GoldBadge>
            </div>
          </div>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 16 }}>
            {[["Age", c.age], ["Height", c.height], ["Weight", c.weight]].map(([l, v]) => (
              <div key={l} style={{ background: t.card, borderRadius: 14, padding: 14, border: `1px solid ${t.border}`, textAlign: "center" }}>
                <div style={{ fontSize: 20, fontWeight: 900, color: t.text, fontFamily: "'Playfair Display', serif" }}>{v}</div>
                <div style={{ fontSize: 11, color: t.muted }}>{l}</div>
              </div>
            ))}
          </div>

          {/* Progress */}
          <div style={{ background: t.card, borderRadius: 16, padding: 16, border: `1px solid ${t.border}`, marginBottom: 12 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: t.text, marginBottom: 12 }}>Progress Overview</div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontSize: 12, color: t.muted }}>Plan Completion</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: GOLD }}>{c.progress}%</span>
            </div>
            <ProgressBar value={c.progress} height={6} />
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12 }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: t.text }}>{c.fat}%</div>
                <div style={{ fontSize: 11, color: t.muted }}>Body Fat</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: GOLD }}>12</div>
                <div style={{ fontSize: 11, color: t.muted }}>Workouts</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: "#6BCB8B" }}>87%</div>
                <div style={{ fontSize: 11, color: t.muted }}>Adherence</div>
              </div>
            </div>
          </div>

          {/* Fitness Goal */}
          <div style={{ background: `linear-gradient(135deg, ${GOLD_DARK}22, ${GOLD}11)`, borderRadius: 16, padding: 16, border: `1px solid ${GOLD}33`, marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: GOLD, letterSpacing: "0.1em" }}>FITNESS GOAL</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: t.text, fontFamily: "'Playfair Display', serif", marginTop: 4 }}>{c.goal}</div>
            <div style={{ fontSize: 12, color: t.muted, marginTop: 4 }}>Next check-in: {c.checkin}</div>
          </div>

          {/* Medical Notes */}
          <div style={{ background: t.card, borderRadius: 16, padding: 16, border: `1px solid ${t.border}` }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: t.text, marginBottom: 8 }}>Medical Notes</div>
            <div style={{ fontSize: 13, color: t.muted, lineHeight: 1.6 }}>No known allergies or conditions on file. Client cleared for all exercise types. Last medical check: Jan 2026.</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ padding: "16px 20px", borderBottom: `1px solid ${t.border}` }}>
        <div style={{ fontSize: 24, fontWeight: 800, color: t.text, fontFamily: "'Playfair Display', serif", marginBottom: 12 }}>Clients</div>
        <input
          value={search} onChange={e => setSearch(e.target.value)}
          placeholder="🔍 Search clients..."
          style={{
            width: "100%", background: t.card, border: `1px solid ${t.border}`,
            borderRadius: 12, padding: "10px 14px", color: t.text, fontSize: 14,
            outline: "none", boxSizing: "border-box",
          }}
        />
      </div>

      <div style={{ padding: "12px 20px" }}>
        {filtered.map(c => (
          <div key={c.id} onClick={() => setSelected(c)} style={{
            display: "flex", alignItems: "center", gap: 12,
            background: t.card, borderRadius: 16, padding: "14px 14px",
            border: `1px solid ${t.border}`, marginBottom: 10, cursor: "pointer",
            transition: "border-color 0.2s",
          }}>
            <Avatar initials={c.img} size={46} />
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: t.text }}>{c.name}</div>
                <GoldBadge small>{c.status === "active" ? "Active" : "Paused"}</GoldBadge>
              </div>
              <div style={{ fontSize: 12, color: t.muted, marginTop: 2 }}>{c.goal} · {c.plan}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6 }}>
                <div style={{ flex: 1 }}><ProgressBar value={c.progress} height={3} /></div>
                <div style={{ fontSize: 11, fontWeight: 700, color: GOLD, minWidth: 30 }}>{c.progress}%</div>
              </div>
            </div>
          </div>
        ))}

        <button style={{
          width: "100%", padding: 14, marginTop: 8,
          background: `linear-gradient(135deg, ${GOLD_DARK}, ${GOLD_LIGHT})`,
          border: "none", borderRadius: 14, color: "#000",
          fontWeight: 800, fontSize: 15, cursor: "pointer",
        }}>
          + Add New Client
        </button>
      </div>
    </div>
  );
}

function Workouts({ theme: t }) {
  const [aiModal, setAiModal] = useState(null);
  const [activeDay, setActiveDay] = useState(0);
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div>
      {aiModal && <AIModal onClose={() => setAiModal(null)} type="workout" theme={t} />}

      <div style={{ padding: "16px 20px 12px", borderBottom: `1px solid ${t.border}` }}>
        <div style={{ fontSize: 24, fontWeight: 800, color: t.text, fontFamily: "'Playfair Display', serif", marginBottom: 4 }}>Workout Planner</div>
        <button onClick={() => setAiModal("workout")} style={{
          padding: "8px 16px",
          background: `linear-gradient(135deg, ${GOLD_DARK}, ${GOLD_LIGHT})`,
          border: "none", borderRadius: 10, color: "#000",
          fontWeight: 800, fontSize: 12, cursor: "pointer",
        }}>⚡ AI Generate</button>
      </div>

      {/* Day selector */}
      <div style={{ display: "flex", gap: 8, padding: "12px 20px", overflowX: "auto" }}>
        {days.map((d, i) => (
          <button key={d} onClick={() => setActiveDay(i)} style={{
            minWidth: 48, height: 48, borderRadius: 12,
            background: activeDay === i ? `linear-gradient(135deg, ${GOLD_DARK}, ${GOLD_LIGHT})` : t.card,
            border: `1px solid ${activeDay === i ? "transparent" : t.border}`,
            color: activeDay === i ? "#000" : t.text,
            fontWeight: 700, fontSize: 13, cursor: "pointer",
          }}>{d}</button>
        ))}
      </div>

      {/* Exercise List */}
      <div style={{ padding: "0 20px" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: t.muted, marginBottom: 10, letterSpacing: "0.1em" }}>
          EXERCISES · {["PUSH DAY", "PULL DAY", "LEG DAY", "REST", "FULL BODY", "CARDIO", "REST"][activeDay]}
        </div>
        {activeDay !== 3 && activeDay !== 6 ? EXERCISES.map((ex, i) => (
          <div key={ex.id} style={{
            background: t.card, borderRadius: 14, padding: 14,
            border: `1px solid ${t.border}`, marginBottom: 10,
            display: "flex", alignItems: "center", gap: 12,
          }}>
            <div style={{
              width: 46, height: 46, borderRadius: 12,
              background: `linear-gradient(135deg, ${GOLD_DARK}33, ${GOLD}22)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 20, flexShrink: 0,
            }}>
              {["🏋️", "🦵", "💪", "🔄", "🍑", "🏊"][i % 6]}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: t.text }}>{ex.name}</div>
              <div style={{ fontSize: 11, color: t.muted }}>{ex.muscle}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: GOLD }}>{ex.sets}×{ex.reps}</div>
              <div style={{ fontSize: 11, color: t.muted }}>Rest {ex.rest}</div>
            </div>
          </div>
        )) : (
          <div style={{
            background: t.card, borderRadius: 14, padding: 24,
            border: `1px solid ${t.border}`, textAlign: "center",
          }}>
            <div style={{ fontSize: 36 }}>😴</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: t.text, marginTop: 8 }}>Rest Day</div>
            <div style={{ fontSize: 13, color: t.muted }}>Recovery is part of the plan.</div>
          </div>
        )}

        <button style={{
          width: "100%", padding: 14, marginTop: 8,
          background: t.card, border: `2px dashed ${GOLD}44`,
          borderRadius: 14, color: GOLD,
          fontWeight: 700, fontSize: 14, cursor: "pointer",
        }}>
          + Add Exercise
        </button>
      </div>
    </div>
  );
}

function Nutrition({ theme: t }) {
  const [aiModal, setAiModal] = useState(null);
  const macros = [
    { label: "Protein", value: 165, target: 200, color: "#E87C5A", unit: "g" },
    { label: "Carbs", value: 220, target: 280, color: "#5A9DE8", unit: "g" },
    { label: "Fats", value: 58, target: 70, color: GOLD, unit: "g" },
  ];
  const meals = [
    { name: "Breakfast", cal: 480, items: "Oats · Protein Shake · Banana", time: "7:00 AM", done: true },
    { name: "Lunch", cal: 620, items: "Chicken Rice Bowl · Salad", time: "12:30 PM", done: true },
    { name: "Pre-Workout", cal: 250, items: "Rice Cakes · Peanut Butter", time: "4:00 PM", done: false },
    { name: "Dinner", cal: 580, items: "Salmon · Sweet Potato · Veg", time: "7:30 PM", done: false },
  ];
  const totalCal = meals.reduce((a, m) => a + m.cal, 0);
  const caloriesConsumed = meals.filter(m => m.done).reduce((a, m) => a + m.cal, 0);

  return (
    <div>
      {aiModal && <AIModal onClose={() => setAiModal(null)} type="meal" theme={t} />}

      <div style={{ padding: "16px 20px 12px", borderBottom: `1px solid ${t.border}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div style={{ fontSize: 24, fontWeight: 800, color: t.text, fontFamily: "'Playfair Display', serif" }}>Nutrition</div>
          <button onClick={() => setAiModal("meal")} style={{
            padding: "8px 14px",
            background: `linear-gradient(135deg, #2A6644, #1a4428)`,
            border: "none", borderRadius: 10, color: "#6BCB8B",
            fontWeight: 700, fontSize: 12, cursor: "pointer",
          }}>🥗 AI Plan</button>
        </div>
      </div>

      <div style={{ padding: "16px 20px 0" }}>
        {/* Calorie ring */}
        <div style={{ background: t.card, borderRadius: 16, padding: 16, border: `1px solid ${t.border}`, marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div style={{ position: "relative", width: 90, height: 90 }}>
              <svg width="90" height="90" style={{ transform: "rotate(-90deg)" }}>
                <circle cx="45" cy="45" r="38" fill="none" stroke={t.border} strokeWidth="8" />
                <circle cx="45" cy="45" r="38" fill="none" stroke={GOLD}
                  strokeWidth="8" strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 38}
                  strokeDashoffset={2 * Math.PI * 38 * (1 - caloriesConsumed / totalCal)} />
              </svg>
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <div style={{ fontSize: 18, fontWeight: 900, color: t.text }}>{caloriesConsumed}</div>
                <div style={{ fontSize: 9, color: t.muted }}>kcal</div>
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: t.text, marginBottom: 4 }}>Daily Calories</div>
              <div style={{ fontSize: 12, color: t.muted }}>{caloriesConsumed} / {totalCal} kcal consumed</div>
              <div style={{ fontSize: 12, color: GOLD, marginTop: 2 }}>{totalCal - caloriesConsumed} remaining</div>

              {/* Water */}
              <div style={{ marginTop: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: t.muted, marginBottom: 4 }}>
                  <span>💧 Water</span><span>1.8 / 3L</span>
                </div>
                <ProgressBar value={60} height={4} />
              </div>
            </div>
          </div>

          {/* Macros */}
          <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
            {macros.map(m => (
              <div key={m.label} style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: t.muted, marginBottom: 4 }}>
                  <span>{m.label}</span><span>{m.value}{m.unit}</span>
                </div>
                <div style={{ background: t.border, borderRadius: 99, height: 4, overflow: "hidden" }}>
                  <div style={{ width: `${(m.value / m.target) * 100}%`, height: "100%", background: m.color, borderRadius: 99 }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Meal List */}
        <div style={{ fontSize: 13, fontWeight: 700, color: t.muted, marginBottom: 10, letterSpacing: "0.1em" }}>TODAY'S MEALS</div>
        {meals.map((m, i) => (
          <div key={i} style={{
            background: t.card, borderRadius: 14, padding: 14,
            border: `1px solid ${m.done ? GOLD + "44" : t.border}`, marginBottom: 10,
            display: "flex", gap: 12, alignItems: "center", opacity: m.done ? 1 : 0.75,
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: m.done ? `linear-gradient(135deg, ${GOLD_DARK}, ${GOLD_LIGHT})` : t.surface,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 16, flexShrink: 0,
            }}>
              {m.done ? "✓" : ["🌅", "🥗", "💪", "🌙"][i]}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: t.text }}>{m.name}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: GOLD }}>{m.cal} kcal</div>
              </div>
              <div style={{ fontSize: 11, color: t.muted }}>{m.items}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Messages({ theme: t }) {
  const [active, setActive] = useState(null);
  const [msg, setMsg] = useState("");
  const [chats, setChats] = useState({ 1: [
    { from: "client", text: "Finished session! Felt amazing 💪", time: "2:34 PM" },
    { from: "trainer", text: "Great work Aisha! How were those Bulgarian split squats?", time: "2:36 PM" },
    { from: "client", text: "Brutal but I survived 😅", time: "2:37 PM" },
  ]});

  const [aiLoading, setAiLoading] = useState(false);

  async function sendWithAI() {
    if (!msg.trim()) return;
    const userMsg = msg;
    setMsg("");
    const key = active.id;
    setChats(prev => ({
      ...prev,
      [key]: [...(prev[key] || []), { from: "trainer", text: userMsg, time: "Now" }]
    }));

    setAiLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 200,
          system: `You are ${active.client}, a fitness coaching client. Respond naturally and briefly to your trainer's message. Keep it conversational and realistic.`,
          messages: [{ role: "user", content: userMsg }],
        }),
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text || "Got it, thanks!";
      setChats(prev => ({
        ...prev,
        [key]: [...(prev[key] || []), { from: "client", text: reply, time: "Now" }]
      }));
    } catch (e) { }
    setAiLoading(false);
  }

  if (active) {
    const conv = chats[active.id] || [];
    return (
      <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <div style={{ padding: "14px 20px", borderBottom: `1px solid ${t.border}`, display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={() => setActive(null)} style={{ background: t.card, border: `1px solid ${t.border}`, color: t.text, borderRadius: 10, padding: "6px 12px", cursor: "pointer", fontSize: 13 }}>←</button>
          <Avatar initials={active.initials} size={36} />
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: t.text }}>{active.client}</div>
            <div style={{ fontSize: 11, color: "#6BCB8B" }}>● Online (AI-Simulated)</div>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
          {conv.map((m, i) => (
            <div key={i} style={{ display: "flex", justifyContent: m.from === "trainer" ? "flex-end" : "flex-start", marginBottom: 10 }}>
              <div style={{
                maxWidth: "78%", padding: "10px 14px", borderRadius: m.from === "trainer" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                background: m.from === "trainer" ? `linear-gradient(135deg, ${GOLD_DARK}, ${GOLD_LIGHT})` : t.card,
                color: m.from === "trainer" ? "#000" : t.text,
                fontSize: 14, fontWeight: m.from === "trainer" ? 600 : 400,
                border: m.from === "client" ? `1px solid ${t.border}` : "none",
              }}>
                {m.text}
                <div style={{ fontSize: 10, color: m.from === "trainer" ? "#00000066" : t.muted, marginTop: 4 }}>{m.time}</div>
              </div>
            </div>
          ))}
          {aiLoading && (
            <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: 10 }}>
              <div style={{ background: t.card, borderRadius: "18px 18px 18px 4px", padding: "10px 14px", border: `1px solid ${t.border}` }}>
                <div style={{ color: t.muted, fontSize: 13 }}>typing...</div>
              </div>
            </div>
          )}
        </div>

        <div style={{ padding: 16, borderTop: `1px solid ${t.border}`, display: "flex", gap: 10 }}>
          <input value={msg} onChange={e => setMsg(e.target.value)}
            onKeyDown={e => e.key === "Enter" && sendWithAI()}
            placeholder="Message..."
            style={{ flex: 1, background: t.card, border: `1px solid ${t.border}`, borderRadius: 12, padding: "10px 14px", color: t.text, fontSize: 14, outline: "none" }}
          />
          <button onClick={sendWithAI} style={{
            background: `linear-gradient(135deg, ${GOLD_DARK}, ${GOLD_LIGHT})`,
            border: "none", borderRadius: 12, padding: "10px 16px", color: "#000", fontWeight: 800, cursor: "pointer",
          }}>↑</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ padding: "16px 20px 12px", borderBottom: `1px solid ${t.border}` }}>
        <div style={{ fontSize: 24, fontWeight: 800, color: t.text, fontFamily: "'Playfair Display', serif" }}>Messages</div>
      </div>
      <div style={{ padding: "12px 20px" }}>
        {MESSAGES.map(m => (
          <div key={m.id} onClick={() => setActive(m)} style={{
            display: "flex", alignItems: "center", gap: 12,
            background: t.card, borderRadius: 16, padding: "14px 14px",
            border: `1px solid ${m.unread ? GOLD + "44" : t.border}`, marginBottom: 10, cursor: "pointer",
          }}>
            <div style={{ position: "relative" }}>
              <Avatar initials={m.initials} size={46} />
              {m.unread && <div style={{ position: "absolute", top: 0, right: 0, width: 12, height: 12, background: GOLD, borderRadius: "50%", border: `2px solid ${t.card}` }} />}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: t.text }}>{m.client}</div>
                <div style={{ fontSize: 11, color: t.muted }}>{m.time}</div>
              </div>
              <div style={{ fontSize: 13, color: t.muted, marginTop: 2 }}>{m.text}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CheckIns({ theme: t }) {
  const moods = ["😔", "😐", "🙂", "😊", "🤩"];
  const [selected, setSelected] = useState(null);

  return (
    <div>
      <div style={{ padding: "16px 20px 12px", borderBottom: `1px solid ${t.border}` }}>
        <div style={{ fontSize: 24, fontWeight: 800, color: t.text, fontFamily: "'Playfair Display', serif" }}>Check-ins</div>
        <div style={{ fontSize: 13, color: t.muted }}>Week of May 26 – June 1, 2026</div>
      </div>

      <div style={{ padding: "12px 20px" }}>
        {CLIENTS.map(c => (
          <div key={c.id} style={{ background: t.card, borderRadius: 16, padding: 16, border: `1px solid ${t.border}`, marginBottom: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <Avatar initials={c.img} size={36} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: t.text }}>{c.name}</div>
                <div style={{ fontSize: 11, color: t.muted }}>Due: {c.checkin}</div>
              </div>
              <GoldBadge small>{c.checkin === "Today" ? "🔴 Due" : "Upcoming"}</GoldBadge>
            </div>

            <div style={{ marginBottom: 10 }}>
              <div style={{ fontSize: 11, color: t.muted, marginBottom: 6, fontWeight: 600 }}>MOOD THIS WEEK</div>
              <div style={{ display: "flex", gap: 8 }}>
                {moods.map((m, i) => (
                  <button key={i} onClick={() => setSelected({ id: c.id, mood: i })}
                    style={{
                      fontSize: 22, background: selected?.id === c.id && selected?.mood === i ? GOLD + "33" : "none",
                      border: selected?.id === c.id && selected?.mood === i ? `2px solid ${GOLD}` : "2px solid transparent",
                      borderRadius: 10, padding: 4, cursor: "pointer",
                    }}>{m}</button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 10 }}>
              <div style={{ fontSize: 11, color: t.muted, marginBottom: 6, fontWeight: 600 }}>ENERGY LEVEL</div>
              <ProgressBar value={[45, 70, 90, 35, 80][c.id - 1]} height={6} />
            </div>

            <textarea placeholder="Trainer notes & feedback..." rows={2} style={{
              width: "100%", background: t.surface, border: `1px solid ${t.border}`,
              borderRadius: 10, padding: 10, color: t.text, fontSize: 13, resize: "none",
              outline: "none", fontFamily: "inherit", boxSizing: "border-box",
            }} />

            <button style={{
              width: "100%", padding: 10, marginTop: 8,
              background: `linear-gradient(135deg, ${GOLD_DARK}, ${GOLD_LIGHT})`,
              border: "none", borderRadius: 10, color: "#000",
              fontWeight: 700, fontSize: 13, cursor: "pointer",
            }}>Send Feedback</button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── NAV BAR ───────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { id: "dashboard", icon: "◈", label: "Home" },
  { id: "clients", icon: "◉", label: "Clients" },
  { id: "workouts", icon: "▲", label: "Workouts" },
  { id: "nutrition", icon: "◎", label: "Nutrition" },
  { id: "messages", icon: "◻", label: "Messages" },
  { id: "checkins", icon: "◆", label: "Check-ins" },
];

// ── ROOT APP ──────────────────────────────────────────────────────────────────
export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [screen, setScreen] = useState("dashboard");
  const t = darkMode ? DARK : LIGHT;

  const screens = {
    dashboard: <Dashboard theme={t} onNav={setScreen} />,
    clients: <Clients theme={t} />,
    workouts: <Workouts theme={t} />,
    nutrition: <Nutrition theme={t} />,
    messages: <Messages theme={t} />,
    checkins: <CheckIns theme={t} />,
  };

  return (
    <div style={{
      minHeight: "100vh", background: t.bg, color: t.text,
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      display: "flex", justifyContent: "center", alignItems: "flex-start",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=DM+Sans:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 99px; }
        button { font-family: inherit; }
        textarea, input { font-family: inherit; }
        @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      {/* iPhone Frame */}
      <div style={{
        width: 390, minHeight: "100vh", background: t.bg,
        display: "flex", flexDirection: "column",
        boxShadow: "0 0 60px #00000066",
        position: "relative",
      }}>
        {/* Status Bar */}
        <div style={{
          background: t.bg, padding: "12px 24px 8px",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexShrink: 0,
        }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: t.text }}>9:41</div>
          <div style={{ width: 120, height: 28, background: "#000", borderRadius: 20, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 10, height: 10, background: "#1a1a1a", borderRadius: "50%", marginRight: 4 }} />
            <div style={{ width: 6, height: 6, background: "#222", borderRadius: "50%" }} />
          </div>
          <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
            <button onClick={() => setDarkMode(!darkMode)} style={{
              background: t.card, border: `1px solid ${t.border}`, color: t.text,
              borderRadius: 8, padding: "3px 8px", fontSize: 11, cursor: "pointer",
            }}>{darkMode ? "☀️" : "🌙"}</button>
          </div>
        </div>

        {/* App Header Brand */}
        <div style={{
          padding: "0 20px 12px",
          background: `linear-gradient(180deg, ${t.bg} 0%, transparent 100%)`,
          display: "flex", alignItems: "center", gap: 10,
          flexShrink: 0,
        }}>
          <div style={{
            width: 32, height: 32,
            background: `linear-gradient(135deg, ${GOLD_DARK}, ${GOLD_LIGHT})`,
            borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 16,
          }}>⚡</div>
          <div style={{ fontSize: 18, fontWeight: 900, color: t.text, fontFamily: "'Playfair Display', serif", letterSpacing: "0.05em" }}>
            DHANFULHI
          </div>
          <div style={{ fontSize: 9, color: GOLD, fontWeight: 700, letterSpacing: "0.15em", alignSelf: "flex-end", paddingBottom: 2 }}>PRO</div>
        </div>

        {/* Screen Content */}
        <div style={{ flex: 1, overflowY: "auto" }} key={screen}>
          {screens[screen]}
        </div>

        {/* Bottom Nav */}
        <div style={{
          background: t.surface, borderTop: `1px solid ${t.border}`,
          display: "flex", padding: "8px 0 20px",
          flexShrink: 0,
        }}>
          {NAV_ITEMS.map(n => (
            <button key={n.id} onClick={() => setScreen(n.id)} style={{
              flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
              background: "none", border: "none", cursor: "pointer", padding: "6px 0",
            }}>
              <div style={{
                fontSize: 18, color: screen === n.id ? GOLD : t.muted,
                transition: "color 0.2s, transform 0.2s",
                transform: screen === n.id ? "scale(1.2)" : "scale(1)",
              }}>{n.icon}</div>
              <div style={{
                fontSize: 9, fontWeight: 700, letterSpacing: "0.05em",
                color: screen === n.id ? GOLD : t.muted,
              }}>{n.label.toUpperCase()}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
