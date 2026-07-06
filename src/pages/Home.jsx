import { useState, useEffect, lazy, Suspense } from 'react'
import Footer from '../components/Footer'
import { useScrollReveal } from '../hooks/useScrollReveal'
import DailyTree from './DailyTree'
import WordUniverse from './WordUniverse'
import FiliTV from './FiliTV'
import Coding from './Coding'

// three.js 体积较大，延迟加载，避免拖慢首屏
import { ghUrl } from '../config'

const ShaderScene = lazy(() => import('../components/ShaderScene'))

const projectsData = [
  {
    id: 'daily-tree',
    title: 'DAILY TREE',
    tag: '3D Memory Forest',
    badge: 'WebGL / Three.js',
    gradient: 'linear-gradient(135deg, #022c22 0%, #065f46 60%, #10b981 100%)',
    accentColor: '#10b981',
    shot: `${import.meta.env.BASE_URL}shots/daily-tree.png`,
    details: {
      desc: '用 Three.js 构建的 3D 日记花园，每条记录都长成一棵树，在 WebGL 场景里漫游回忆。',
      tech: ['Three.js', 'WebGL', 'React'],
      link: ghUrl('daily-tree/app/'),
    },
    illustration: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#FFF' }}>
        <path d="M12 22V12" /><path d="M17 12H7" /><path d="M12 12L17 7" />
        <path d="M12 12L7 7" /><path d="M12 8V2" /><path d="M12 2L16 6" /><path d="M12 2L8 6" />
      </svg>
    )
  },
  {
    id: 'word-universe',
    title: 'WORD UNIVERSE',
    tag: 'Word Semantics Galaxy',
    badge: 'D3.js / LLM Embed',
    gradient: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 60%, #6366f1 100%)',
    accentColor: '#6366f1',
    shot: `${import.meta.env.BASE_URL}shots/word-universe.png`,
    details: {
      desc: '用 D3.js 将词语语义可视化为星系，通过 LLM embedding 计算词义相似度与距离。',
      tech: ['D3.js', 'React', 'LLM Embed'],
      link: null,
    },
    illustration: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#FFF' }}>
        <path d="M12 3a9 9 0 1 0 9 9" /><path d="M12 21a9 9 0 0 0 9-9" />
        <path d="M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
        <circle cx="18" cy="6" r="1" fill="currentColor" /><circle cx="6" cy="18" r="1" fill="currentColor" />
      </svg>
    )
  },
  {
    id: 'coding',
    title: 'AI DEVELOPER',
    tag: 'AI Assisted Coding',
    badge: 'React / Vite / Claude',
    gradient: 'linear-gradient(135deg, #431407 0%, #7c2d12 60%, #ea580c 100%)',
    accentColor: '#ea580c',
    shot: `${import.meta.env.BASE_URL}shots/product-quest.png`,
    details: {
      desc: '借助 AI 工具独立完成多个生活类 App，展示 vibe coding 的创意执行力。',
      tech: ['React', 'Vite', 'GitHub Pages'],
      link: null,
    },
    illustration: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#FFF' }}>
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    )
  },
  {
    id: 'fili-tv',
    title: 'FILI TV',
    tag: '海外产品运营',
    badge: '进行中',
    gradient: 'linear-gradient(135deg, #09090E 0%, #1D4ED8 60%, #7C3AED 100%)',
    accentColor: '#7C3AED',
    details: {
      desc: '与菲律宾本地团队远程协作，设计内容策略与发布 SOP，运用 AI 工具辅助脚本生成。',
      tech: ['AI 工具', '内容策略', 'TikTok'],
      link: null,
    },
    illustration: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#FFF' }}>
        <rect x="2" y="7" width="20" height="15" rx="2" ry="2"/>
        <polyline points="17 2 12 7 7 2"/><circle cx="12" cy="14" r="2" />
      </svg>
    )
  }
]

const experienceData = [
  {
    period: '2026.03 — 至今',
    role: '海外产品运营',
    org: 'FILI TV · 菲律宾',
    active: true,
    desc: '与菲律宾本地执行团队远程协作，协同推进跨文化内容策略测试；负责内容方向规划与发布 SOP 设计；运用 AI 工具辅助脚本生成，持续优化内容生产流程。',
    tags: ['跨文化协作', '内容策略', 'AI 提效', '海外运营'],
  },
  {
    period: '2025.12 — 2026.01',
    role: '实习助理 · 海外业务部',
    org: '北京海创易富投资管理有限公司',
    active: false,
    desc: '运用 AI 视频生成工具制作投融资宣传视频，辅助海外业务推广内容生产。',
    tags: ['AI 视频工具', '海外业务', '内容生产', '投融资'],
  },
  {
    period: '2025.11 — 2025.12',
    role: '实习助理 · 猎头海外部',
    org: '清小猎科技有限公司',
    active: false,
    desc: '搭建海外岗位人才库，搜集候选人并进行初步沟通，完成初筛与需求匹配。',
    tags: ['人才寻访', '海外招聘', '跨文化沟通', 'HR'],
  },
  {
    period: '2025.09 — 至今',
    role: '国际商务硕士',
    org: '北京外国语大学（北外）',
    active: false,
    desc: '主修国际商务管理、跨境电商策略、商业数据分析及国际贸易政策与实务。',
    tags: ['国际商务', '跨境电商', '商业分析', '贸易政策'],
  },
  {
    period: '2021.09 — 2025.06',
    role: '商务英语专业 · 文学学士',
    org: '西安外国语大学（西外）',
    active: false,
    desc: '主修商务英语（ACCA 方向）；校级二等奖学金（前5%）；全国商务英语实践大赛国家级三等奖。',
    tags: ['商务英语', 'ACCA', '跨文化沟通', '语言'],
  },
]

let hasSeenIntro = false

export default function Home() {
  const [phase, setPhase] = useState(() => hasSeenIntro ? 'main' : 'intro')
  const [titleReady, setTitleReady] = useState(false)
  const [subtitleReady, setSubtitleReady] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [showEnter, setShowEnter] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [selectedProj, setSelectedProj] = useState(null)

  // 移动端 / 低动效偏好：跳过 1MB 的 three.js 3D 球体，用纯 CSS 渐变兜底，省流量与 GPU
  const [lite] = useState(() =>
    typeof window !== 'undefined' &&
    (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ||
      window.matchMedia?.('(max-width: 768px)').matches ||
      window.matchMedia?.('(pointer: coarse)').matches)
  )

  // 手风琴开合：点已开的行则收起；展开时把该行滚到视口顶部，让下方展开的案例可见
  const toggleProject = (id) => {
    const next = selectedProj === id ? null : id
    setSelectedProj(next)
    if (next) {
      requestAnimationFrame(() => {
        document.getElementById(`feature-row-${next}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    }
  }

  useScrollReveal(phase)

  useEffect(() => {
    if (phase !== 'intro') return
    const t1 = setTimeout(() => setTitleReady(true), 400)
    const t2 = setTimeout(() => setSubtitleReady(true), 900)
    const t3 = setTimeout(() => setShowHint(true), 1400)
    const t4 = setTimeout(() => setShowEnter(true), 1800)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4) }
  }, [phase])

  useEffect(() => {
    if (phase !== 'intro') return
    const handler = (e) => setMousePos({
      x: (e.clientX / window.innerWidth - 0.5) * 20,
      y: (e.clientY / window.innerHeight - 0.5) * 20,
    })
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [phase])

  const handleEnter = () => {
    // Skip word cloud — go straight to main
    hasSeenIntro = true
    setPhase('main')
  }

  const handleSkip = () => {
    hasSeenIntro = true
    setPhase('main')
  }

  return (
    <>
      <div
        className="gradient-bg-persistent"
        style={
          phase === 'intro'
            ? (lite ? { zIndex: 500, pointerEvents: 'none' } : { zIndex: 500, cursor: 'grab' })
            : { zIndex: -1, pointerEvents: 'none', opacity: 0.14 }
        }
      >
        {lite ? (
          <div className="shader-fallback" />
        ) : (
          <Suspense fallback={<div className="shader-fallback" />}>
            <ShaderScene />
          </Suspense>
        )}
      </div>

      {/* ===== SKIP BUTTON ===== */}
      {phase === 'intro' && (
        <button className="intro-skip-btn" onClick={handleSkip}>
          跳过
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginLeft: 6 }}>
            <path d="M5 4l10 8-10 8V4zM19 5v14" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}

      {/* ===== INTRO ===== */}
      {phase === 'intro' && (
        <div className="intro-screen intro-bright">
          <div className="intro-content">
            <h1
              className={`luminous-title ${titleReady ? 'luminous-visible' : ''}`}
              style={{ transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)` }}
            >
              <span className="luminous-letter">E</span>
              <span className="luminous-letter">R</span>
              <span className="luminous-letter">I</span>
              <span className="luminous-letter">C</span>
              <span className="luminous-dot">.</span>
            </h1>
            <p
              className={`luminous-sub ${subtitleReady ? 'luminous-sub-visible' : ''}`}
              style={{ transform: `translate(${mousePos.x * 0.15}px, ${mousePos.y * 0.15}px)` }}
            >
              Product &amp; AI Builder
            </p>
          </div>

          {showHint && !lite && (
            <div className="intro-hint intro-hint-dark">
              <div className="intro-hint-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4 12a8 8 0 018-8M20 12a8 8 0 00-8-8" strokeLinecap="round" opacity="0.6"/>
                  <path d="M15 9l-3 3 3 3M9 9l3 3-3 3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span>拖拽旋转 · 探索 3D 渐变</span>
            </div>
          )}

          {showEnter && (
            <button className="intro-enter intro-enter-dark" onClick={handleEnter}>
              <span className="intro-enter-text intro-enter-text-dark">探索我的世界</span>
              <span className="intro-enter-arrow intro-enter-arrow-dark">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 5v14M19 12l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </button>
          )}
        </div>
      )}

      {/* ===== MAIN ===== */}
      {phase === 'main' && (
        <div className="main-content-enter">

          {/* ── HERO ── */}
          <section className="hero-section" id="hero">
            <div className="hero-inner">
              <h1 className="hero-h1" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: 'italic', fontWeight: 700 }}>
                <span className="hero-line animate-in delay-2">Think deep.</span>
                <br />
                <span className="hero-line animate-in delay-4">Build real.</span>
              </h1>
              <div className="animate-in delay-6 hero-ctas" style={{ pointerEvents: 'auto' }}>
                <button
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                  className="btn btn-primary"
                >
                  看看我做了什么
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}
                  className="btn btn-outline"
                >
                  关于我
                </button>
              </div>
              <div className="animate-in delay-7 hero-stats" style={{ pointerEvents: 'auto' }}>
                {[
                  { value: '2', label: 'AI 独立开发 App' },
                  { value: '1', label: '海外运营项目' },
                  { value: '0→1', label: '全流程落地能力' },
                ].map((s, i) => (
                  <div key={i} className="hero-stat">
                    <span className="hero-stat-value" style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--accent)', display: 'block', letterSpacing: '-0.02em' }}>{s.value}</span>
                    <span className="hero-stat-label" style={{ fontSize: '0.75rem', color: 'var(--secondary)', letterSpacing: '0.02em' }}>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── PROJECTS ── */}
          <section id="projects" style={{ borderTop: '1px solid var(--border)' }}>
            <div className="section">
              <div className="container">
                <div className="accent-line" />
                <p className="section-label">Work</p>
                <h2 className="section-title animate-in" style={{ marginBottom: 16 }}>项目案例柜</h2>
                <p className="animate-in delay-1" style={{ color: 'var(--secondary)', marginBottom: 56, maxWidth: 520 }}>
                  向下浏览我独立开发与主导的项目，点开任意一个即可展开完整案例与交互沙盒
                </p>

                {/* Feature Rows — 竖向叙事行，桌面左右交替，移动端堆叠 */}
                <div className="feature-rows">
                  {projectsData.map((proj, i) => {
                    const isOpen = selectedProj === proj.id
                    return (
                      <div key={proj.id} id={`feature-row-${proj.id}`} className="feature-block reveal">
                        <div className={`feature-row${i % 2 === 1 ? ' reverse' : ''}`}>
                          {/* Visual poster */}
                          <div
                            className="feature-visual"
                            style={{ '--cover-gradient': proj.gradient, '--active-accent': proj.accentColor }}
                            onClick={() => toggleProject(proj.id)}
                            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleProject(proj.id) } }}
                            role="button"
                            tabIndex={0}
                            aria-label={`${isOpen ? '收起' : '展开'}项目：${proj.title}`}
                            aria-expanded={isOpen}
                          >
                            <div className="feature-poster">
                              {proj.shot ? (
                                <img className="feature-shot" src={proj.shot} alt={proj.title} loading="lazy" />
                              ) : (
                                <>
                                  <div className="feature-poster-top">
                                    <span className="project-poster-badge">{proj.badge}</span>
                                    <div className="feature-poster-logo">{proj.illustration}</div>
                                  </div>
                                  <div className="feature-poster-bottom">
                                    <p className="project-poster-tag">{proj.tag}</p>
                                    <h3 className="feature-poster-title">{proj.title}</h3>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>

                          {/* Body */}
                          <div className="feature-body">
                            <p className="feature-eyebrow" style={{ color: proj.accentColor }}>{proj.tag}</p>
                            <h3 className="feature-title">{proj.title}</h3>
                            <p className="feature-desc">{proj.details?.desc}</p>
                            <div className="feature-tags">
                              {proj.details?.tech.map(t => <span key={t} className="tag">{t}</span>)}
                            </div>
                            <button
                              className="feature-cta"
                              onClick={() => toggleProject(proj.id)}
                              style={{ '--active-accent': proj.accentColor }}
                              aria-expanded={isOpen}
                            >
                              {isOpen ? '收起案例 ↑' : '查看完整案例 ↓'}
                            </button>
                          </div>
                        </div>

                        {/* 就地展开的完整案例（复用现有 inline 详情组件） */}
                        {isOpen && (
                          <div className="feature-detail">
                            {proj.id === 'daily-tree' && <DailyTree isInline={true} />}
                            {proj.id === 'word-universe' && <WordUniverse isInline={true} />}
                            {proj.id === 'coding' && <Coding isInline={true} />}
                            {proj.id === 'fili-tv' && <FiliTV isInline={true} />}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* ── EXPERIENCE / EDUCATION ── */}
          <section id="experience" style={{ borderTop: '1px solid var(--border)' }}>
            <div className="section">
              <div className="container" style={{ maxWidth: 800 }}>
                <div className="accent-line" />
                <p className="section-label">Background</p>
                <h2 className="section-title animate-in" style={{ marginBottom: 16 }}>经历 & 教育</h2>
                <p className="animate-in delay-1" style={{ color: 'var(--secondary)', marginBottom: 56, maxWidth: 500 }}>
                  从学术研究到实战项目，我始终在构建与交付之间找到平衡
                </p>

                <div className="timeline">
                  {experienceData.map((item, i) => (
                    <div
                      key={i}
                      className={`timeline-item reveal ${item.active ? 'timeline-item-active' : ''}`}
                      style={{ transitionDelay: `${i * 0.12}s` }}
                    >
                      <div style={{
                        background: 'rgba(0,0,0,0.02)',
                        border: `1px solid ${item.active ? 'rgba(255, 107, 53, 0.2)' : 'rgba(0,0,0,0.07)'}`,
                        borderRadius: 16,
                        padding: '24px 28px',
                        transition: 'all 0.4s var(--ease)',
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8, flexWrap: 'wrap', gap: 8 }}>
                          <div>
                            <p style={{ fontSize: '0.75rem', color: item.active ? 'var(--accent)' : 'var(--muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em', marginBottom: 4 }}>
                              {item.period}
                            </p>
                            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--primary)', marginBottom: 2 }}>{item.role}</h3>
                            <p style={{ fontSize: '0.875rem', color: 'var(--secondary)' }}>{item.org}</p>
                          </div>
                          {item.active && (
                            <span style={{
                              display: 'inline-flex', alignItems: 'center', gap: 6,
                              padding: '4px 12px', borderRadius: 100,
                              background: 'rgba(255, 107, 53, 0.1)', border: '1px solid rgba(255, 107, 53, 0.25)',
                              fontSize: '0.6875rem', fontWeight: 600, color: 'var(--accent)',
                              letterSpacing: '0.08em', textTransform: 'uppercase',
                              flexShrink: 0
                            }}>
                              <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--accent)', animation: 'pulse-dot 2s infinite' }} />
                              进行中
                            </span>
                          )}
                        </div>
                        <p style={{ fontSize: '0.9rem', color: 'var(--secondary)', lineHeight: 1.75, marginTop: 12, marginBottom: 16 }}>
                          {item.desc}
                        </p>
                        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                          {item.tags.map(t => (
                            <span key={t} style={{
                              padding: '3px 10px', borderRadius: 6,
                              background: 'rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.08)',
                              fontSize: '0.75rem', color: 'var(--muted)', fontFamily: 'var(--font-mono)'
                            }}>{t}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ── CONTACT ── */}
          <section id="contact" style={{ borderTop: '1px solid var(--border)' }}>
            <div className="section">
              <div className="container" style={{ maxWidth: 640 }}>
                <div className="accent-line" style={{ margin: '0 0 24px' }} />
                <p className="section-label">Get in Touch</p>
                <h2 className="section-title animate-in" style={{ marginBottom: 16 }}>联系我</h2>
                <p className="animate-in delay-1" style={{ color: 'var(--secondary)', lineHeight: 1.7, marginBottom: 40 }}>
                  对我的项目感兴趣，或有任何合作机会，随时欢迎联系。
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
                  {[
                    {
                      icon: (
                        <svg width="24" height="24" viewBox="0 0 98 96" fill="currentColor">
                          <path fillRule="evenodd" clipRule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" />
                        </svg>
                      ),
                      title: 'GitHub', subtitle: 'nuts-and-bytes', link: 'https://github.com/nuts-and-bytes', external: true
                    },
                    {
                      icon: (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                        </svg>
                      ),
                      title: 'Email', subtitle: 'zxy200204@126.com', link: 'mailto:zxy200204@126.com', external: false
                    },
                    {
                      icon: (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                        </svg>
                      ),
                      title: 'Gmail', subtitle: 'zhuxinyao99@gmail.com', link: 'mailto:zhuxinyao99@gmail.com', external: false
                    },
                    {
                      icon: (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                        </svg>
                      ),
                      title: 'Telegram', subtitle: '@ericlibro', link: 'https://t.me/ericlibro', external: true
                    },
                  ].map((c, i) => (
                    <a
                      key={i}
                      href={c.link}
                      target={c.external ? '_blank' : undefined}
                      rel={c.external ? 'noopener noreferrer' : undefined}
                      className="reveal"
                      style={{
                        padding: '18px 24px',
                        textDecoration: 'none',
                        transitionDelay: `${i * 0.08}s`,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 18,
                        background: 'rgba(0,0,0,0.02)',
                        border: '1px solid rgba(0,0,0,0.07)',
                        borderRadius: 16,
                        transition: 'all 0.3s var(--ease)',
                        color: 'inherit',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = 'rgba(255, 107, 53, 0.06)'
                        e.currentTarget.style.borderColor = 'rgba(255, 107, 53, 0.25)'
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = 'rgba(0,0,0,0.02)'
                        e.currentTarget.style.borderColor = 'rgba(0,0,0,0.07)'
                      }}
                    >
                      <div style={{
                        width: 48, height: 48, borderRadius: 12,
                        background: 'var(--accent-subtle)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'var(--accent)', flexShrink: 0
                      }}>{c.icon}</div>
                      <div style={{ textAlign: 'left', flex: 1 }}>
                        <p style={{ fontWeight: 600, marginBottom: 2, color: 'var(--primary)' }}>{c.title}</p>
                        <p style={{ fontSize: '0.875rem', color: 'var(--secondary)' }}>{c.subtitle}</p>
                      </div>
                      <svg style={{ color: 'var(--muted)', flexShrink: 0 }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  ))}
                </div>

              </div>
            </div>
          </section>

          <Footer />

          <style>{`
            @keyframes pulse-dot {
              0%, 100% { transform: scale(1); opacity: 1; }
              50% { transform: scale(1.4); opacity: 0.7; }
            }
          `}</style>
        </div>
      )}
    </>
  )
}
