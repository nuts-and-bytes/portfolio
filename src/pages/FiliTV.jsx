import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { useScrollReveal } from '../hooks/useScrollReveal'

export default function FiliTV({ isInline = false }) {
  useScrollReveal()

  useEffect(() => {
    if (!isInline) {
      document.title = "FILI TV 海外产品运营 | Eric Lu"
    }
  }, [isInline])

  const content = (
    <>
      {/* Hero Banner */}
      <section style={{ padding: isInline ? '0 0 32px' : '80px 0 0', background: isInline ? 'none' : 'linear-gradient(180deg, rgba(29, 78, 216, 0.06) 0%, transparent 100%)' }}>
        <div className="container" style={{ maxWidth: 800 }}>
          <div className="animate-in" style={{ marginBottom: 48 }}>
            <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
              <span className="tag-status tag-active">进行中</span>
              <span className="tag">海外运营</span>
              <span className="tag">2026</span>
            </div>
            <h1 className="section-title">FILI TV · 海外产品运营</h1>
            <p className="animate-in delay-1" style={{ color: 'var(--secondary)', marginTop: 16, fontSize: '1.0625rem', lineHeight: 1.7 }}>
              菲律宾流媒体平台跨文化内容运营项目
            </p>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: isInline ? 0 : 48, paddingBottom: 32 }}>
        <div className="container" style={{ maxWidth: 800 }}>

          {/* Background */}
          <div className="reveal" style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ width: 4, height: 20, background: 'var(--accent)', borderRadius: 2 }} />
              项目背景
            </h2>
            <p style={{ fontSize: '0.9375rem', color: 'var(--secondary)', lineHeight: 1.8, marginBottom: 0 }}>
              FILI TV 是面向菲律宾本地市场的流媒体服务。我作为远程端的内容运营负责人，与菲律宾当地执行团队协同工作，探索适合本地文化的内容增长路径。团队分工明确：本地成员 Jiel 与 Benjie 负责菲语内容拍摄与 TikTok 发布，我负责内容方向策划、工作流设计与 AI 工具应用，项目目前处于测试阶段，正在持续打磨内容策略。
            </p>
          </div>

          {/* Team & Collaboration */}
          <div className="reveal" style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ width: 4, height: 20, background: 'var(--accent)', borderRadius: 2 }} />
              跨文化团队协作
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
              {[
                {
                  role: '内容策略 & AI 工具（我）',
                  items: ['内容方向规划与主题策划', '发布 SOP 与工作流设计', 'AI 简报工具辅助脚本生成', '跨时区异步协作管理'],
                  accent: 'var(--accent)',
                },
                {
                  role: '本地执行团队（Jiel / Benjie）',
                  items: ['菲律宾本地语言内容拍摄', 'TikTok 账号运营与发布', '本地热点捕捉与用户互动', '一线市场反馈收集'],
                  accent: '#7C3AED',
                },
              ].map((col, i) => (
                <div key={i} className="card-shell">
                  <div className="card-core" style={{ padding: '18px 20px', cursor: 'default' }}>
                    <p style={{ fontSize: '0.75rem', fontWeight: 700, color: col.accent, marginBottom: 12, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                      {col.role}
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {col.items.map((item, j) => (
                        <div key={j} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                          <span style={{ color: col.accent, fontWeight: 700, fontSize: '0.75rem', marginTop: 1 }}>·</span>
                          <p style={{ fontSize: '0.875rem', color: 'var(--secondary)', lineHeight: 1.5 }}>{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* How I work */}
          <div className="reveal" style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ width: 4, height: 20, background: 'var(--accent)', borderRadius: 2 }} />
              我的工作方式
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                {
                  title: '内容策略设计',
                  desc: '根据菲律宾本地文化背景与 TikTok 内容趋势，制定差异化的内容方向，并定期与本地团队同步调整。',
                },
                {
                  title: 'AI 简报辅助工具',
                  desc: '设计提示词工作流，将竞品热门视频的核心信息快速转化为本地化的视频脚本大纲，降低内容生产门槛。',
                },
                {
                  title: '发布 SOP 与异步协同',
                  desc: '制定内容发布标准流程，通过文档与模板跨时区传递执行指令，保证本地团队有清晰的操作路径。',
                },
              ].map((item, idx) => (
                <div key={idx} className="card-shell">
                  <div className="card-core card-interactive" style={{ padding: 18, cursor: 'default' }}>
                    <h3 style={{ fontSize: '0.9375rem', fontWeight: 600, marginBottom: 6 }}>{item.title}</h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--secondary)', lineHeight: 1.6 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Current Status */}
          <div className="reveal" style={{ marginBottom: isInline ? 0 : 48 }}>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ width: 4, height: 20, background: 'var(--accent)', borderRadius: 2 }} />
              当前进展
            </h2>
            <div className="card-shell">
              <div className="card-core" style={{ padding: '18px 20px', cursor: 'default' }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 12 }}>
                  <span className="tag-status tag-active">测试中</span>
                  <span style={{ fontSize: '0.8125rem', color: 'var(--muted)' }}>2026.03 — 至今</span>
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--secondary)', lineHeight: 1.75 }}>
                  目前已完成首批内容视频的制作与发布，正在根据数据反馈持续迭代内容策略。此阶段重点在于摸清本地受众偏好，建立可复用的内容生产节奏，测试结果将指导后续规模化方向。
                </p>
              </div>
            </div>
          </div>

          {/* Tools */}
          <div className="reveal" style={{ marginBottom: isInline ? 0 : 48 }}>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: 12 }}>工具 & 技能</h2>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['Claude / AI 工具', 'TikTok', '提示词工程', '跨文化沟通', '内容策略', '异步协作'].map(t => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>
          </div>

          {!isInline && (
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
          )}
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
      <Footer />
    </main>
  )
}
