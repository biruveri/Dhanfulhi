/* ── Global Reset & Base ─────────────────────────────────────────────────── */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  -webkit-text-size-adjust: 100%;
  -webkit-tap-highlight-color: transparent;
}

body {
  font-family: 'DM Sans', 'Segoe UI', system-ui, -apple-system, sans-serif;
  background-color: #0a0a0a;
  color: #f5f5f5;
  min-height: 100dvh;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#root {
  min-height: 100dvh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

/* ── Scrollbars ──────────────────────────────────────────────────────────── */
::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: #2a2a2a;
  border-radius: 99px;
}
::-webkit-scrollbar-thumb:hover {
  background: #444;
}

/* ── Form Elements ───────────────────────────────────────────────────────── */
button {
  font-family: inherit;
  cursor: pointer;
}

input,
textarea,
select {
  font-family: inherit;
}

/* ── Animations ──────────────────────────────────────────────────────────── */
@keyframes slideUp {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.animate-slideUp {
  animation: slideUp 0.32s cubic-bezier(0.32, 0.72, 0, 1);
}

.animate-fadeIn {
  animation: fadeIn 0.25s ease forwards;
}

/* ── Utility ─────────────────────────────────────────────────────────────── */
.overflow-hidden { overflow: hidden; }
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
