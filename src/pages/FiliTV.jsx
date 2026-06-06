import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { useScrollReveal } from '../hooks/useScrollReveal'

export default function FiliTV({ isInline = false }) {
  useScrollReveal()

  useEffect(() => {
    if (!isInline) {
      document.title = "FILI TV TikTok 内容运营 | Eric Lu"
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
            <h1 className="section-title">FILI TV TikTok 内容运营</h1>
            <p className="animate-in delay-1" style={{ color: 'var(--secondary)', marginTop: 16, fontSize: '1.0625rem', lineHeight: 1.7 }}>
              菲律宾市场流媒体增长项目全案
            </p>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: isInline ? 0 : 48, paddingBottom: 32 }}>
        <div className="container" style={{ maxWidth: 800 }}>
          {/* Background & Funnel Chart */}
          <div className="reveal" style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ width: 4, height: 20, background: 'var(--accent)', borderRadius: 2 }} />
              项目背景
            </h2>
            <p style={{ fontSize: '0.9375rem', color: 'var(--secondary)', lineHeight: 1.8, marginBottom: 28 }}>
              FILI TV 是面向菲律宾本地的流媒体服务。为了以极低成本获取新用户，我们避开了传统买量渠道，主攻 TikTok 这一在东南亚极具渗透率的内容平台，探索<strong>「内容驱动下载→转化」</strong>的增长路径。
            </p>

            <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 16 }}>增长漏斗拆解</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginBottom: 16 }}>
              <div className="funnel-stage">
                <div className="funnel-bar stage-download">
                  <span className="funnel-label">
                    <span className="funnel-label-icon">📥</span>
                    1. 视频引导应用下载 (Downloads)
                  </span>
                  <span className="funnel-value">100%</span>
                </div>
              </div>
              <div className="funnel-connector">
                <div className="funnel-connector-line" />
                <span className="funnel-dropoff">流失率 40%</span>
              </div>
              <div className="funnel-stage">
                <div className="funnel-bar stage-install">
                  <span className="funnel-label">
                    <span className="funnel-label-icon">⚙️</span>
                    2. 应用安装与打开 (Installs)
                  </span>
                  <span className="funnel-value">60%</span>
                </div>
              </div>
              <div className="funnel-connector">
                <div className="funnel-connector-line" />
                <span className="funnel-dropoff">流失率 42%</span>
              </div>
              <div className="funnel-stage">
                <div className="funnel-bar stage-activate">
                  <span className="funnel-label">
                    <span className="funnel-label-icon">✨</span>
                    3. 新注册与激活订阅 (Activations)
                  </span>
                  <span className="funnel-value">35%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Strategy */}
          <div className="reveal" style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ width: 4, height: 20, background: 'var(--accent)', borderRadius: 2 }} />
              内容运营策略
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { title: '本地化内容配音与配乐', desc: '根据菲律宾本地热点与方言（如 Tagalog）精制口播与文案，避免生硬的英译。' },
                { title: '高频发布策略', desc: '每日稳定发布 3-5 条短视频，通过高频触达获取 TikTok 算法的推荐放大。' },
                { title: 'AI 简报提效工具', desc: '通过自己设计的 AI 助手，将竞品热度视频在几分钟内转化为可执行的本地化视频拍摄脚本，产能提升 3 倍。' },
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

          {/* Insights */}
          <div className="reveal" style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ width: 4, height: 20, background: 'var(--accent)', borderRadius: 2 }} />
              关键洞察
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { icon: '🔍', text: '发现核心问题不是「点击」而是「下载→激活」漏斗流失' },
                { icon: '📈', text: '三阶段增长路径：养号期→测试期→KOC 规模化' },
                { icon: '🤝', text: '与本地协作方建立分工 SOP，策略与执行分离' },
              ].map((insight, i) => (
                <div key={i} className="card-shell reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
                  <div className="card-core card-interactive" style={{ display: 'flex', flexDirection: 'row', gap: 16, alignItems: 'center', padding: '16px 20px', cursor: 'default' }}>
                    <span style={{ fontSize: '1.5rem' }}>{insight.icon}</span>
                    <p style={{ fontSize: '0.9375rem', color: 'var(--secondary)' }}>{insight.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tools */}
          <div className="reveal" style={{ marginBottom: isInline ? 0 : 48 }}>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: 12 }}>使用的工具</h2>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['Claude Code', 'TikTok', 'Figma', 'Google Sheets'].map(t => (
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
