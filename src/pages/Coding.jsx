import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { useScrollReveal } from '../hooks/useScrollReveal'

const projects = [
  {
    title: 'Fitness Daily 健身打卡',
    status: '已完成',
    date: '2026 年 3 月',
    icon: '🏋️',
    desc: '由于市面上已有的健身打卡 App 广告过多且常强制收费，我为自己写了这个极简的无广告打卡工具。它支持羽毛球、篮球和力量训练记录，并能在本地直接呈现运动周报与月历热力图，轻量便携。',
    highlights: ['没有任何多余的三方统计，只保留纯粹的打卡动作', '根据羽毛球/篮球等不同类型，动态适配字段与图标', '使用 localStorage 存储，秒开且不丢失数据'],
    tools: ['React', 'Vite', 'CSS Grid', 'GitHub Pages'],
    link: 'https://nuts-and-bytes.github.io/fitness-daily/',
  },
  {
    title: '每日心情打卡',
    status: '已完成',
    date: '2026 年 2 月',
    icon: '😊',
    desc: '一个记录日常情绪碎片的手账工具。为了最快地捕获情绪，我将其精简为「选择 Emoji」单次点击记录。附带周趋势对比及心情占比色块，方便复盘近期的压力与恢复状态。',
    highlights: ['设计了丝滑的按钮交互动效，点击有模拟物理阻尼的缩放反馈', '支持多情绪按周聚合，直观呈现情绪波形', '静态托管，在移动端和桌面端均有良好的离线支持'],
    tools: ['React', 'Local Storage', 'CSS Transitions'],
    link: 'https://nuts-and-bytes.github.io/omm-daily-happy/',
  },
  {
    title: 'AI 松鼠花园 · 个人博客',
    status: '持续更新',
    date: '2026 年',
    icon: '🐿️',
    desc: '个人博客与知识花园，记录用 AI 重塑学习和工作的全过程。分享 AI 工具实战经验、独立开发心得与跨境运营洞察，持续输出有深度的思考与实验记录。',
    highlights: ['以「松鼠囤果实」为隐喻，建立个人知识管理体系', '记录 AI 工具在真实工作流中的落地实践', '探索 AI 时代下个体效能的边界与可能性'],
    tools: ['GitHub Pages', 'Markdown', 'AI 辅助写作'],
    link: 'https://nuts-and-bytes.github.io/ai-songshu-garden/',
  },
]

function MoodSandbox() {
  const moodEmojis = [
    { emoji: '😊', label: '开心', color: '#10B981' },
    { emoji: '😭', label: '难过', color: '#3B82F6' },
    { emoji: '😡', label: '愤怒', color: '#EF4444' },
    { emoji: '😴', label: '疲惫', color: '#F59E0B' },
    { emoji: '🎉', label: '兴奋', color: '#8B5CF6' }
  ]

  const [logs, setLogs] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolio_mood_logs')
      return saved ? JSON.parse(saved) : [
        { emoji: '😊', time: '周一' },
        { emoji: '😴', time: '周二' },
        { emoji: '😊', time: '周三' },
        { emoji: '🎉', time: '周四' }
      ]
    } catch {
      return [
        { emoji: '😊', time: '周一' },
        { emoji: '😴', time: '周二' },
        { emoji: '😊', time: '周三' },
        { emoji: '🎉', time: '周四' }
      ]
    }
  })

  const [activeMood, setActiveMood] = useState(null)

  const handleAddMood = (emoji) => {
    setActiveMood(emoji)
    const newLog = {
      emoji,
      time: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'][new Date().getDay() === 0 ? 6 : new Date().getDay() - 1]
    }
    const updated = [...logs.slice(-6), newLog] // Keep last 7 logs
    setLogs(updated)
    try {
      localStorage.setItem('portfolio_mood_logs', JSON.stringify(updated))
    } catch (e) {
      // ignore
    }
    setTimeout(() => setActiveMood(null), 300)
  }

  const moodCounts = logs.reduce((acc, log) => {
    acc[log.emoji] = (acc[log.emoji] || 0) + 1
    return acc
  }, {})

  const totalLogs = logs.length

  return (
    <div style={{
      background: 'rgba(0, 0, 0, 0.015)',
      border: '1px solid rgba(0, 0, 0, 0.05)',
      borderRadius: '12px',
      padding: '16px',
      marginTop: '16px',
      marginBottom: '20px',
      boxSizing: 'border-box'
    }}>
      <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--secondary)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
        🕹️ 互动沙盒：试着点击打卡，体验真实的心情分析逻辑
      </p>

      {/* Emoji Buttons */}
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px', marginBottom: '16px' }}>
        {moodEmojis.map((m) => (
          <button
            key={m.emoji}
            onClick={() => handleAddMood(m.emoji)}
            style={{
              flex: 1,
              padding: '8px 4px',
              background: activeMood === m.emoji ? 'var(--accent-subtle)' : 'var(--white)',
              border: `1px solid ${activeMood === m.emoji ? 'var(--accent)' : 'rgba(0, 0, 0, 0.08)'}`,
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '2px',
              transition: 'all 0.2s var(--ease-haptic)',
              transform: activeMood === m.emoji ? 'scale(0.92)' : 'none',
              boxShadow: activeMood === m.emoji ? 'inset 0 2px 4px rgba(0,0,0,0.05)' : '0 2px 4px rgba(0,0,0,0.01)'
            }}
          >
            <span style={{
              transform: activeMood === m.emoji ? 'scale(1.2)' : 'none',
              transition: 'transform 0.2s var(--ease-haptic)'
            }}>{m.emoji}</span>
            <span style={{ fontSize: '0.6875rem', color: 'var(--secondary)' }}>{m.label}</span>
          </button>
        ))}
      </div>

      {/* History Trend Viz */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <p style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>近 7 次打卡历史流：</p>
        <div style={{ display: 'flex', gap: '4px', background: 'rgba(0,0,0,0.02)', borderRadius: '8px', padding: '6px', overflowX: 'auto', minHeight: '36px', alignItems: 'center' }}>
          {logs.map((log, idx) => (
            <div
              key={idx}
              style={{
                background: 'var(--white)',
                border: '1px solid rgba(0,0,0,0.04)',
                borderRadius: '6px',
                padding: '2px 6px',
                fontSize: '0.8125rem',
                display: 'flex',
                alignItems: 'center',
                gap: '2px',
                boxShadow: '0 1px 2px rgba(0,0,0,0.02)'
              }}
            >
              <span>{log.emoji}</span>
              <span style={{ fontSize: '0.625rem', color: 'var(--muted)' }}>{log.time}</span>
            </div>
          ))}
        </div>

        {/* Progress Fill breakdown */}
        <div style={{ display: 'flex', height: '6px', borderRadius: '3px', overflow: 'hidden', background: 'rgba(0,0,0,0.05)', marginTop: '4px' }}>
          {moodEmojis.map((m) => {
            const count = moodCounts[m.emoji] || 0
            const pct = totalLogs > 0 ? (count / totalLogs) * 100 : 0
            return (
              <div
                key={m.emoji}
                style={{
                  width: `${pct}%`,
                  background: m.color,
                  transition: 'width 0.4s var(--ease-haptic)'
                }}
                title={`${m.label}: ${count}次 (${Math.round(pct)}%)`}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default function Coding({ isInline = false }) {
  useScrollReveal()

  useEffect(() => {
    if (!isInline) {
      document.title = "AI Coding 项目 | Eric Lu"
    }
  }, [isInline])

  const content = (
    <>
      <section style={{ padding: isInline ? '0 0 32px' : '80px 0 0', background: isInline ? 'none' : 'linear-gradient(180deg, rgba(21, 128, 61, 0.04) 0%, transparent 100%)' }}>
        <div className="container" style={{ maxWidth: 800 }}>
          <div className="animate-in">
            <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
              <span className="tag-status tag-done">已完成</span>
              <span className="tag">AI Coding</span>
            </div>
            <h1 className="section-title">AI 辅助 Coding 项目</h1>
            <p className="animate-in delay-1" style={{ color: 'var(--secondary)', marginTop: 16, fontSize: '1.0625rem' }}>
              用 AI 工具独立完成的生活工具应用与个人知识博客
            </p>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: isInline ? 0 : 48, paddingBottom: 32 }}>
        <div className="container" style={{ maxWidth: 800 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            {projects.map((p, i) => (
              <div key={i} className="card-shell reveal" style={{ transitionDelay: `${i * 0.15}s` }}>
                <div className="card-core card-interactive" style={{ cursor: 'default' }}>
                  <div style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
                    <div style={{ width: 56, height: 56, borderRadius: 16, background: 'var(--accent-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem', flexShrink: 0 }}>
                      {p.icon}
                    </div>
                    <div>
                      <div style={{ display: 'flex', gap: 12, marginBottom: 4 }}>
                        <span className={`tag-status ${p.status === '持续更新' ? 'tag-active' : 'tag-done'}`}>{p.status}</span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{p.date}</span>
                      </div>
                      <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>{p.title}</h2>
                    </div>
                  </div>

                  <p style={{ fontSize: '0.9375rem', color: 'var(--secondary)', lineHeight: 1.7, marginBottom: 20 }}>{p.desc}</p>

                  {/* Render Mood Sandbox inside the Mood Tracker card */}
                  {p.title === '每日心情打卡' && <MoodSandbox />}

                  <h3 style={{ fontSize: '0.8125rem', fontWeight: 600, marginBottom: 12, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>核心亮点</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
                    {p.highlights.map((h, j) => (
                      <div key={j} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                        <span style={{ color: 'var(--accent)', fontWeight: 700 }}>✓</span>
                        <p style={{ fontSize: '0.875rem', color: 'var(--secondary)' }}>{h}</p>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginTop: 'auto' }}>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      {p.tools.map(t => <span key={t} className="tag">{t}</span>)}
                    </div>
                    <a href={p.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: '10px 20px' }}>
                      查看 Demo
                      <span className="btn-icon-circle">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )

  if (isInline) {
    return <div className="project-detail-inline">{content}</div>
  }

  return (
    <main style={{ paddingTop: 80 }}>
      <div className="page-gradient" />
      {content}
      <section style={{ padding: '40px 0 80px' }}>
        <div className="container" style={{ maxWidth: 800 }}>
          <div className="reveal">
            <Link to="/" className="btn btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <span className="btn-icon-circle" style={{ margin: '0 4px 0 0', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </span>
              返回首页
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
