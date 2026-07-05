# Portfolio Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the portfolio Home page — remove About/Skills, add a 5-project Cover Flow + iframe sandbox, draggable Hero sphere, amber accent, and update project tool labels.

**Architecture:** Home.jsx becomes Hero → CoverFlow+Sandbox → Contact. New `CoverFlow.jsx` and `ProjectSandbox.jsx` components encapsulate project display logic. A `useGitHubStats` hook fetches live repo data for Daily Tree and Word Universe.

**Tech Stack:** React 18, Vite, react-router-dom, @shadergradient/react, GitHub REST API (unauthenticated)

---

## File Map

| Action | Path | Responsibility |
|--------|------|----------------|
| Modify | `src/index.css` | Accent color variables |
| Modify | `src/components/Navbar.jsx` | Remove about/skills nav links |
| Modify | `src/pages/Home.jsx` | Skip word cloud, drag-to-rotate sphere, remove About/Skills, wire up CoverFlow |
| Modify | `src/pages/Coding.jsx` | Update AI tool labels for both projects |
| Create | `src/hooks/useGitHubStats.js` | Fetch GitHub repo stars + last push |
| Create | `src/components/CoverFlow.jsx` | Horizontal poster switcher with blur/scale |
| Create | `src/components/ProjectSandbox.jsx` | iframe embed + FiliTV case study card |

---

## Task 1: Update Accent Color Variables

**Files:**
- Modify: `src/index.css`

- [ ] **Step 1: Replace accent color variables**

In `src/index.css`, find the `:root` block (lines ~5-15) and replace:

```css
/* BEFORE */
--accent: #FF6B35;
--accent-subtle: rgba(255, 107, 53, 0.1);
--accent-glow: rgba(255, 107, 53, 0.3);
```

with:

```css
/* AFTER */
--accent: #c8972a;
--accent-subtle: rgba(200, 151, 42, 0.1);
--accent-glow: rgba(200, 151, 42, 0.3);
```

- [ ] **Step 2: Update gradient endpoints**

Find every occurrence of `#ffbb00` in `src/index.css` (progress bar, accent-line, btn gradients) and replace with `#e8b84b`.

Run: `grep -n "ffbb00" src/index.css` — should return 0 matches after replacement.

- [ ] **Step 3: Start dev server and verify color change**

```bash
cd "/Users/ericlu/Documents/文稿 - 朱鑫垚的MacBook Air/My projects/portfolio"
npm run dev
```

Open `http://localhost:5173`. Accent buttons, progress bars, and the accent line should show warm amber instead of orange. No red/yellow bleed.

- [ ] **Step 4: Commit**

```bash
git add src/index.css
git commit -m "style: change accent to warm amber #c8972a"
```

---

## Task 2: Navbar Cleanup

**Files:**
- Modify: `src/components/Navbar.jsx`

- [ ] **Step 1: Remove about and skills from mainLinks**

In `src/components/Navbar.jsx` lines 4-10, replace the `mainLinks` array:

```js
const mainLinks = [
  { id: 'hero', label: '首页' },
  { id: 'projects', label: '项目' },
  { id: 'contact', label: '联系' },
]
```

- [ ] **Step 2: Visual check**

With dev server running, open `http://localhost:5173`. Navbar should show only「首页 / 项目 / 联系」— no「关于」or「能力」.

- [ ] **Step 3: Commit**

```bash
git add src/components/Navbar.jsx
git commit -m "feat: remove about/skills from navbar"
```

---

## Task 3: Hero — Skip Word Cloud, Direct to Main

**Files:**
- Modify: `src/pages/Home.jsx`

- [ ] **Step 1: Simplify handleEnter**

In `src/pages/Home.jsx`, find `handleEnter` (around line 214) and replace with:

```js
const handleEnter = () => {
  setPhase('main')
}
```

- [ ] **Step 2: Remove word cloud state and effects**

Remove the following state variables (no longer needed):
- `litCount` and `setLitCount`
- `showName` and `setShowName`

Remove the `setTimeout` calls in `useEffect` that set `litCount` and `showName`.

The simplified state block should be:

```js
const [phase, setPhase] = useState('intro')
const [titleReady, setTitleReady] = useState(false)
const [subtitleReady, setSubtitleReady] = useState(false)
const [showHint, setShowHint] = useState(false)
const [showEnter, setShowEnter] = useState(false)
const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
const [expandedMethod, setExpandedMethod] = useState(null)
```

- [ ] **Step 3: Remove the words phase JSX block**

Find and delete the entire `{phase === 'words' && ( ... )}` block (lines ~294-340 in the original).

- [ ] **Step 4: Verify**

Click「探索我的世界」— should jump immediately to main content with no word cloud animation.

- [ ] **Step 5: Commit**

```bash
git add src/pages/Home.jsx
git commit -m "feat: skip word cloud — enter button goes directly to main"
```

---

## Task 4: Hero — Draggable Sphere

**Files:**
- Modify: `src/pages/Home.jsx`

- [ ] **Step 1: Add drag state**

At the top of the `Home` component (after existing state), add:

```js
const [sphereAngles, setSphereAngles] = useState({ azimuth: 0, polar: 140 })
const dragRef = useRef(null)
```

- [ ] **Step 2: Add drag handlers**

After the existing `mousePos` useEffect, add:

```js
useEffect(() => {
  if (phase !== 'intro') return
  let dragging = false
  let lastX = 0
  let lastY = 0

  const onDown = (e) => {
    dragging = true
    lastX = e.clientX
    lastY = e.clientY
  }
  const onMove = (e) => {
    if (!dragging) return
    const dx = e.clientX - lastX
    const dy = e.clientY - lastY
    lastX = e.clientX
    lastY = e.clientY
    setSphereAngles(prev => ({
      azimuth: (prev.azimuth + dx * 0.4) % 360,
      polar: Math.max(10, Math.min(170, prev.polar + dy * 0.4)),
    }))
  }
  const onUp = () => { dragging = false }

  const el = dragRef.current
  if (!el) return
  el.addEventListener('mousedown', onDown)
  window.addEventListener('mousemove', onMove)
  window.addEventListener('mouseup', onUp)
  return () => {
    el.removeEventListener('mousedown', onDown)
    window.removeEventListener('mousemove', onMove)
    window.removeEventListener('mouseup', onUp)
  }
}, [phase])
```

- [ ] **Step 3: Attach ref and pass angles to ShaderGradient**

Find the gradient wrapper div and add `ref={dragRef}`:

```jsx
<div
  ref={dragRef}
  className="gradient-bg-persistent"
  style={phase === 'intro'
    ? { zIndex: 500, cursor: 'grab' }
    : { zIndex: -1, pointerEvents: 'none' }
  }
>
  <ShaderGradientCanvas style={{ position: 'absolute', inset: 0 }} pixelDensity={1.5} fov={45}>
    <ShaderGradient
      animate="on" brightness={1.1}
      cAzimuthAngle={sphereAngles.azimuth}
      cDistance={7.1}
      cPolarAngle={sphereAngles.polar}
      cameraZoom={17.3}
      color1="#ffffff" color2="#ffbb00" color3="#0700ff"
      envPreset="city" grain="off" lightType="3d" reflection={0.1}
      shader="defaults" type="sphere"
      uAmplitude={1.4} uDensity={1.1} uFrequency={5.5}
      uSpeed={0.1} uStrength={1} uTime={0}
      wireframe={false} enableTransition={true}
    />
  </ShaderGradientCanvas>
</div>
```

Also add this CSS override in the inline `<style>` block at the bottom of Home.jsx (or in index.css) to allow pointer events through to the canvas:

```css
.gradient-bg-persistent canvas {
  pointer-events: none;
}
```

(The drag is captured on the parent div, not the canvas itself — the canvas stays non-interactive so the parent div's cursor: grab works correctly.)

- [ ] **Step 4: Verify drag**

In the browser, drag the sphere on the Hero page. It should rotate (change shape/gradient flow) smoothly in response to mouse movement.

- [ ] **Step 5: Commit**

```bash
git add src/pages/Home.jsx
git commit -m "feat: draggable shader gradient sphere on hero"
```

---

## Task 5: Remove About & Skills Sections from Home

**Files:**
- Modify: `src/pages/Home.jsx`

- [ ] **Step 1: Delete the entire About section**

Find `{/* ── ABOUT ── */}` (around line 384) and delete the entire `<section id="about">` block through its closing `</section>` tag. This includes all of:
- About Me header + SkillCloud
- Chapter 01 背景 timeline
- Chapter 02 方法论
- Chapter 03 正在做的事

- [ ] **Step 2: Delete the Skills section**

Find `{/* ── SKILLS ── */}` (around line 510) and delete the entire `<section id="skills">` block through its closing `</section>`.

- [ ] **Step 3: Remove unused variables**

Remove these now-unused variables/data from Home.jsx:
- `qualities` array (line 7-14)
- `SKILL_TAGS`, `TAG_ACCENT`, `TAG_BASE`, `ROW_OFFSETS` constants
- `SkillCloud` component function
- `timeline` array
- `methods` array
- `currentWork` array
- `skillsData` array
- `expandedMethod` state and `setExpandedMethod`

Also remove the `TiltCard` and `SchoolLogo` component functions if they're only used in deleted sections.

- [ ] **Step 4: Verify**

Page should scroll: Hero → Projects → Contact → Footer. No About or Skills section visible.

- [ ] **Step 5: Commit**

```bash
git add src/pages/Home.jsx
git commit -m "feat: remove About and Skills sections from homepage"
```

---

## Task 6: useGitHubStats Hook

**Files:**
- Create: `src/hooks/useGitHubStats.js`

- [ ] **Step 1: Create the hook**

```js
// src/hooks/useGitHubStats.js
import { useState, useEffect } from 'react'

export function useGitHubStats(owner, repo) {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    if (!owner || !repo) return
    fetch(`https://api.github.com/repos/${owner}/${repo}`)
      .then(r => r.json())
      .then(data => {
        if (data.stargazers_count === undefined) return
        const pushed = new Date(data.pushed_at)
        const diffDays = Math.floor((Date.now() - pushed) / 86400000)
        const daysAgo = diffDays === 0 ? '今天' : diffDays === 1 ? '昨天' : `${diffDays} 天前`
        setStats({
          stars: data.stargazers_count,
          forks: data.forks_count,
          daysAgo,
          description: data.description,
        })
      })
      .catch(() => {})
  }, [owner, repo])

  return stats
}
```

- [ ] **Step 2: Manual test in browser console**

With dev server running, in browser console run:
```js
fetch('https://api.github.com/repos/zhuxinyao99-jpg/daily-tree').then(r=>r.json()).then(d=>console.log(d.stargazers_count, d.pushed_at))
```
Expected: numeric star count and ISO date string in console.

- [ ] **Step 3: Commit**

```bash
git add src/hooks/useGitHubStats.js
git commit -m "feat: useGitHubStats hook for live repo data"
```

---

## Task 7: CoverFlow Component

**Files:**
- Create: `src/components/CoverFlow.jsx`

This component renders the horizontal poster switcher. It takes `projects`, `activeIndex`, and `onSelect(i)` props.

- [ ] **Step 1: Create CoverFlow.jsx**

```jsx
// src/components/CoverFlow.jsx
import { useRef } from 'react'
import { useGitHubStats } from '../hooks/useGitHubStats'

function GitHubBadge({ owner, repo }) {
  const stats = useGitHubStats(owner, repo)
  if (!stats) return null
  return (
    <div style={{ display: 'flex', gap: 10, marginTop: 10, fontSize: '0.7rem', color: 'var(--secondary)' }}>
      <span>⭐ {stats.stars}</span>
      <span>🕐 {stats.daysAgo}更新</span>
    </div>
  )
}

export default function CoverFlow({ projects, activeIndex, onSelect }) {
  const itemRefs = useRef([])

  const handleSelect = (i) => {
    onSelect(i)
    setTimeout(() => {
      itemRefs.current[i]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
    }, 50)
  }

  return (
    <div style={{
      display: 'flex',
      gap: 20,
      overflowX: 'auto',
      padding: '24px 40px 32px',
      scrollSnapType: 'x mandatory',
      scrollbarWidth: 'none',
    }}>
      <style>{`.cover-flow-track::-webkit-scrollbar { display: none; }`}</style>
      {projects.map((project, i) => {
        const isActive = i === activeIndex
        return (
          <div
            key={project.id}
            ref={el => itemRefs.current[i] = el}
            onClick={() => handleSelect(i)}
            style={{
              flexShrink: 0,
              width: 220,
              scrollSnapAlign: 'center',
              borderRadius: 18,
              border: isActive ? '2px solid var(--accent)' : '1px solid var(--border)',
              background: isActive ? 'var(--white)' : 'var(--canvas)',
              padding: '24px 20px',
              cursor: 'pointer',
              transform: `scale(${isActive ? 1 : 0.82}) translateZ(0)`,
              filter: isActive ? 'blur(0px)' : 'blur(2px)',
              opacity: isActive ? 1 : 0.45,
              transition: [
                'transform 0.35s cubic-bezier(0.16,1,0.3,1)',
                'filter 0.35s ease',
                'opacity 0.3s ease',
                'border-color 0.25s ease',
                'box-shadow 0.3s ease',
              ].join(', '),
              willChange: 'transform, filter, opacity',
              boxShadow: isActive ? '0 8px 32px var(--accent-glow)' : 'none',
            }}
          >
            <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>{project.icon}</div>
            <p style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: 4 }}>{project.title}</p>
            <p style={{ fontSize: '0.775rem', color: 'var(--secondary)', lineHeight: 1.5, marginBottom: 10 }}>
              {project.shortDesc}
            </p>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {project.tags.slice(0, 2).map(t => (
                <span key={t} style={{
                  fontSize: '0.65rem', padding: '2px 8px', borderRadius: 99,
                  background: 'var(--accent-subtle)', color: 'var(--accent)', fontWeight: 500,
                }}>{t}</span>
              ))}
            </div>
            {project.githubRepo && (
              <GitHubBadge owner="zhuxinyao99-jpg" repo={project.githubRepo} />
            )}
          </div>
        )
      })}
    </div>
  )
}
```

- [ ] **Step 2: Verify component renders (quick smoke test)**

Temporarily import and render `<CoverFlow projects={[]} activeIndex={0} onSelect={()=>{}} />` in Home.jsx, check no console errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/CoverFlow.jsx src/hooks/useGitHubStats.js
git commit -m "feat: CoverFlow poster switcher component"
```

---

## Task 8: ProjectSandbox Component

**Files:**
- Create: `src/components/ProjectSandbox.jsx`

- [ ] **Step 1: Create ProjectSandbox.jsx**

```jsx
// src/components/ProjectSandbox.jsx
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function ProjectSandbox({ project }) {
  const [loading, setLoading] = useState(true)
  const [key, setKey] = useState(0)

  useEffect(() => {
    setLoading(true)
    setKey(k => k + 1)
  }, [project?.id])

  if (!project) return null

  if (!project.liveUrl) {
    return (
      <div style={{
        border: '1px solid var(--border)', borderRadius: 16,
        padding: '48px 40px', textAlign: 'center',
        background: 'var(--canvas)',
      }}>
        <div style={{ fontSize: '3rem', marginBottom: 16 }}>{project.icon}</div>
        <h3 style={{ fontWeight: 700, marginBottom: 8 }}>{project.title}</h3>
        <p style={{ color: 'var(--secondary)', lineHeight: 1.7, maxWidth: 480, margin: '0 auto 24px' }}>
          {project.desc}
        </p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
          {project.tags.map(t => (
            <span key={t} style={{
              fontSize: '0.75rem', padding: '4px 12px', borderRadius: 99,
              background: 'var(--accent-subtle)', color: 'var(--accent)', fontWeight: 500,
            }}>{t}</span>
          ))}
        </div>
        {project.detailPath && (
          <Link to={project.detailPath} style={{
            display: 'inline-block', marginTop: 28,
            padding: '10px 24px', borderRadius: 99,
            background: 'var(--accent)', color: '#fff',
            fontWeight: 600, fontSize: '0.875rem', textDecoration: 'none',
          }}>
            查看完整案例 →
          </Link>
        )}
      </div>
    )
  }

  return (
    <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', border: '1px solid var(--border)' }}>
      {loading && (
        <div style={{
          position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'var(--canvas)', zIndex: 2,
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: 12 }}>{project.icon}</div>
            <p style={{ color: 'var(--secondary)', fontSize: '0.875rem' }}>加载中…</p>
          </div>
        </div>
      )}
      <iframe
        key={key}
        src={project.liveUrl}
        title={project.title}
        style={{ width: '100%', height: 640, border: 'none', display: 'block' }}
        onLoad={() => setLoading(false)}
        sandbox="allow-scripts allow-same-origin allow-forms allow-modals"
      />
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ProjectSandbox.jsx
git commit -m "feat: ProjectSandbox iframe embed + case study fallback"
```

---

## Task 9: Wire CoverFlow + Sandbox into Home

**Files:**
- Modify: `src/pages/Home.jsx`

- [ ] **Step 1: Define projects data array**

At the top of `src/pages/Home.jsx` (after imports), add:

```js
const PROJECTS = [
  {
    id: 'daily-tree',
    icon: '🌳',
    title: 'Daily Tree',
    shortDesc: '每日记录，看着你的树林生长',
    desc: '个人日记应用——每天写一条，看着 3D 树在一年里慢慢长大。跨季节色彩、可拖拽旋转视角。',
    tags: ['React', 'Three.js', 'Claude Code'],
    liveUrl: 'https://zhuxinyao99-jpg.github.io/daily-tree/app/',
    githubRepo: 'daily-tree',
  },
  {
    id: 'word-universe',
    icon: '🌌',
    title: 'Word Universe',
    shortDesc: '你的词汇表，变成一片星系',
    desc: '单词学习工具——用语义向量定位每个单词在宇宙中的位置，D3.js 力导向图实时渲染。',
    tags: ['React', 'D3.js', 'Claude Code'],
    liveUrl: 'https://zhuxinyao99-jpg.github.io/word-universe/app/',
    githubRepo: 'word-universe',
  },
  {
    id: 'fitness-daily',
    icon: '🏋️',
    title: 'Fitness Daily',
    shortDesc: '每日健身打卡 + 多运动类型',
    desc: '记录每日健身数据的生活工具，支持篮球、羽毛球等多种运动，周数据 + 月历双重视图。',
    tags: ['Stitch 前端设计', 'OpenClaw 主体', 'GitHub 部署'],
    liveUrl: 'https://zhuxinyao99-jpg.github.io/fitness-daily/',
  },
  {
    id: 'mood-tracker',
    icon: '😊',
    title: '每日心情打卡',
    shortDesc: '用 emoji 记录情绪，看见趋势',
    desc: '用 emoji 表达情绪状态，支持周趋势分析和历史回顾，纯前端实现，数据本地存储。',
    tags: ['OpenClaw 设计', 'GitHub 部署'],
    liveUrl: 'https://zhuxinyao99-jpg.github.io/omm-daily-happy/',
  },
  {
    id: 'fili-tv',
    icon: '📺',
    title: 'FiliTV',
    shortDesc: '菲律宾流媒体增长运营',
    desc: '菲律宾流媒体平台增长项目，负责 TikTok 内容策略与 AI 工具应用，探索内容驱动用户获取的增长飞轮。',
    tags: ['TikTok', 'AI 工具', '内容运营', '海外市场'],
    liveUrl: null,
    detailPath: '/projects/fili-tv',
  },
]
```

- [ ] **Step 2: Add activeProject state and sandbox ref**

In the `Home` component state block, add:

```js
const [activeProject, setActiveProject] = useState(0)
const sandboxRef = useRef(null)
```

- [ ] **Step 3: Add imports**

At top of `src/pages/Home.jsx`, add:

```js
import CoverFlow from '../components/CoverFlow'
import ProjectSandbox from '../components/ProjectSandbox'
```

- [ ] **Step 4: Replace the Projects section**

Find the `{/* ── PROJECTS ── */}` section and replace entirely with:

```jsx
{/* ── PROJECTS ── */}
<section id="projects" style={{ borderTop: '1px solid var(--border)' }}>
  <div className="section">
    <div className="container">
      <div className="accent-line" />
      <p className="section-label">Work</p>
      <h2 className="section-title animate-in" style={{ marginBottom: 8 }}>项目展示柜</h2>
      <p className="animate-in delay-1" style={{ color: 'var(--secondary)', marginBottom: 32, maxWidth: 500 }}>
        点击海报切换 · 直接在页面内预览
      </p>
    </div>

    <CoverFlow
      projects={PROJECTS}
      activeIndex={activeProject}
      onSelect={(i) => {
        setActiveProject(i)
        setTimeout(() => sandboxRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80)
      }}
    />

    <div ref={sandboxRef} className="container" style={{ paddingTop: 8, paddingBottom: 32 }}>
      <ProjectSandbox project={PROJECTS[activeProject]} />
    </div>
  </div>
</section>
```

- [ ] **Step 5: Remove old static project cards**

Verify the old `<Link to="/projects/fili-tv">` and `<Link to="/projects/coding">` card JSX is gone (it was inside the replaced projects section).

- [ ] **Step 6: Remove old Hero CTA that referenced about section**

In the Hero section, find and remove the button:
```jsx
<button onClick={() => document.getElementById('about')?.scrollIntoView(...)} className="btn btn-outline">关于我</button>
```
Replace with a Projects CTA only, or keep as single CTA. Final hero-ctas block:

```jsx
<div className="animate-in delay-6 hero-ctas">
  <button
    onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
    className="btn btn-primary"
  >
    看看我做了什么
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </button>
</div>
```

- [ ] **Step 7: Visual check**

Open browser. Projects section should show:
- 5 poster cards in a horizontal scrollable track
- Active (first) card is clear + scaled up + amber border
- Inactive cards are blurred/small/faded
- Clicking a card selects it and scrolls to the sandbox
- Sandbox shows the iframe or FiliTV case study card

- [ ] **Step 8: Commit**

```bash
git add src/pages/Home.jsx
git commit -m "feat: Cover Flow + iframe sandbox replaces static project grid"
```

---

## Task 10: Update Coding.jsx AI Tool Labels

**Files:**
- Modify: `src/pages/Coding.jsx`

- [ ] **Step 1: Update projects data**

In `src/pages/Coding.jsx` lines 5-26, replace the `projects` array:

```js
const projects = [
  {
    title: 'Fitness Daily 健身打卡',
    status: '已完成',
    date: '2026 年 3 月',
    icon: '🏋️',
    desc: '记录每日健身数据的生活工具，支持篮球、羽毛球等多种运动。',
    highlights: ['用 AI 工具从零开始，独立完成产品设计到部署', '支持多运动类型（篮球/羽毛球/其他）', '周数据 + 月历双重视图'],
    tools: ['Stitch 前端设计', 'OpenClaw 主体', 'GitHub 部署'],
    link: 'https://zhuxinyao99-jpg.github.io/fitness-daily/',
  },
  {
    title: '每日心情打卡',
    status: '已完成',
    date: '2026 年 2 月',
    icon: '😊',
    desc: '用 emoji 表达情绪状态，支持周趋势分析和历史回顾。',
    highlights: ['用 AI 独立完成从需求到上线全流程', 'emoji 情绪表达 + 周趋势图', '纯前端实现，数据本地存储'],
    tools: ['OpenClaw 设计', 'GitHub 部署'],
    link: 'https://zhuxinyao99-jpg.github.io/omm-daily-happy/',
  },
]
```

- [ ] **Step 2: Verify**

Navigate to `http://localhost:5173/projects/coding`. Both cards should show updated tool tags.

- [ ] **Step 3: Commit**

```bash
git add src/pages/Coding.jsx
git commit -m "feat: update AI tool labels for Fitness Daily and mood tracker"
```

---

## Task 11: Final Polish & Local Preview

**Files:**
- Modify: `src/pages/Home.jsx` (minor CSS tweaks if needed)

- [ ] **Step 1: Check overall flow**

Walk through the full page:
1. Hero intro screen loads with amber accent ✓
2. Drag sphere — it rotates ✓
3. Click「探索我的世界」— jumps immediately to main ✓
4. Hero → scroll to Projects ✓
5. Cover Flow: click each of 5 posters — blur/scale/opacity transitions are smooth ✓
6. Click poster → sandbox scrolls into view ✓
7. Daily Tree / Word Universe iframes load (may take a few seconds) ✓
8. GitHub badges (⭐ stars, 🕐 X 天前) appear on Daily Tree + Word Universe posters ✓
9. FiliTV poster → shows case study card with「查看完整案例」link ✓
10. Navbar: only 首页 / 项目 / 联系 ✓
11. No yellow/orange remaining — all amber ✓

- [ ] **Step 2: CoverFlow container class fix**

The CoverFlow div needs `className="cover-flow-track"` on the outer scroll container so the webkit-scrollbar rule applies. In `src/components/CoverFlow.jsx`, update the outer div:

```jsx
<div
  className="cover-flow-track"
  style={{
    display: 'flex',
    gap: 20,
    overflowX: 'auto',
    padding: '24px 40px 32px',
    scrollSnapType: 'x mandatory',
    scrollbarWidth: 'none',
  }}
>
```

- [ ] **Step 3: Build check**

```bash
cd "/Users/ericlu/Documents/文稿 - 朱鑫垚的MacBook Air/My projects/portfolio"
npm run build
```

Expected: build completes with no errors. Warnings about unused imports are acceptable but investigate any errors.

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "feat: portfolio overhaul — cover flow, draggable sphere, amber accent, clean nav"
```

---

## Summary of Changes

| Area | Change |
|------|--------|
| Colors | `#FF6B35` → `#c8972a` throughout |
| Navbar | Removed About / Skills links |
| Hero | Word cloud skipped; direct to main; sphere drag-to-rotate |
| Home | Removed About (all Chapters) and Skills sections |
| Projects | Static cards → CoverFlow + iframe sandbox |
| GitHub | Live star count + last push on Daily Tree / Word Universe |
| Coding | Updated tool labels for both apps |
