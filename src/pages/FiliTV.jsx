import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { useScrollReveal } from '../hooks/useScrollReveal'

export default function FiliTV() {
  useScrollReveal()

  useEffect(() => {
    document.title = "FILI TV TikTok 内容运营 | Eric Lu"
  }, [])

  return (
    <main style={{ paddingTop: 80 }}>
      <div className="page-gradient" />

      {/* Hero Banner */}
      <section style={{ padding: '80px 0 0', background: 'linear-gradient(180deg, rgba(29, 78, 216, 0.06) 0%, transparent 100%)' }}>
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

      <section className="section" style={{ paddingTop: 48 }}>
        <div className="container" style={{ maxWidth: 800 }}>
          {/* Background & Funnel Chart */}
          <div className="reveal" style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ width: 4, height: 20, background: 'var(--accent)', borderRadius: 2 }} />
              项目背景
            </h2>
            <div className="card-shell">
              <div className="card-core card-glass" style={{ cursor: 'default' }}>
                <p style={{ fontSize: '0.9375rem', color: 'var(--secondary)', lineHeight: 1.8 }}>
                  FILI TV 是一款面向菲律宾市场的流媒体聚合平台，提供 PBA 篮球、NBA、UFC 等体育内容以及 Netflix、Disney+ 等影视内容。核心问题：<strong style={{ color: 'var(--primary)' }}>下载 → 安装 → 激活的漏斗存在严重流失</strong>。
                </p>
              </div>
            </div>

            {/* CSS Funnel Chart Component */}
            <div className="card-shell funnel-card">
              <div className="card-core" style={{ padding: '24px 28px', cursor: 'default' }}>
                <h3 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: 20, color: 'var(--secondary)', display: 'flex', alignItems: 'center', gap: 8 }}>
                  📊 增长流失漏斗分析 (Conversion Funnel Dropoff Analysis)
                </h3>
                <div className="funnel-container">
                  {/* Step 1 */}
                  <div className="funnel-stage">
                    <div className="funnel-bar stage-download">
                      <div className="funnel-label">
                        <span className="funnel-label-icon">📥</span>
                        <span>下载 (Download)</span>
                      </div>
                      <div className="funnel-value">100%</div>
                    </div>
                  </div>

                  {/* Connector 1 */}
                  <div className="funnel-connector">
                    <div className="funnel-connector-line"></div>
                    <div className="funnel-dropoff">流失 -40% (阻力点: 包大小与网络环境)</div>
                  </div>

                  {/* Step 2 */}
                  <div className="funnel-stage">
                    <div className="funnel-bar stage-install">
                      <div className="funnel-label">
                        <span className="funnel-label-icon">⚙️</span>
                        <span>安装 (Install)</span>
                      </div>
                      <div className="funnel-value">60%</div>
                    </div>
                  </div>

                  {/* Connector 2 */}
                  <div className="funnel-connector">
                    <div className="funnel-connector-line"></div>
                    <div className="funnel-dropoff">流失 -25% (阻力点: 激活路径长与设备兼容性)</div>
                  </div>

                  {/* Step 3 */}
                  <div className="funnel-stage">
                    <div className="funnel-bar stage-activate">
                      <div className="funnel-label">
                        <span className="funnel-label-icon">🔥</span>
                        <span>激活 (Activate)</span>
                      </div>
                      <div className="funnel-value">35%</div>
                    </div>
                  </div>
                </div>
                <p style={{ fontSize: '0.8125rem', color: 'var(--muted)', marginTop: 20, lineHeight: 1.6, textAlign: 'center' }}>
                  💡 针对此转化损耗，我制定了 6 种 TikTok 本地化内容策略及 SOP，直接作用于下载与激活引导。
                </p>
              </div>
            </div>
          </div>

          {/* Role */}
          <div className="reveal" style={{ marginBottom: 48 }}>
            <div className="card-shell">
              <div className="card-core" style={{ cursor: 'default', background: 'linear-gradient(135deg, var(--accent-subtle), rgba(255,107,53,0.02))', borderColor: 'rgba(255,107,53,0.2)', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 16, padding: '20px 24px' }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--white)', border: '1px solid rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>
                  👤
                </div>
                <div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--muted)', marginBottom: 2 }}>我的角色</p>
                  <p style={{ fontWeight: 600, fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}>内容策略负责人 / AI 工具应用</p>
                </div>
              </div>
            </div>
          </div>

          {/* What I did */}
          <div className="reveal" style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ width: 4, height: 20, background: 'var(--accent)', borderRadius: 2 }} />
              我做了什么
            </h2>
            <div className="timeline">
              {[
                '设计 TikTok 内容测试框架，对应漏斗每个环节的流失问题',
                '制定 6 个内容角度策略（痛点对比、体育集锦、UFC热血等），形成完整内容矩阵',
                '用 AI 工具生成 5 个结构化内容简报，包含 Hook、字幕、CTA',
                '设计 Tagalog + Taglish 本地化语言策略',
                '建立与本地协作方的分工框架：策略在外地，执行在本地',
                '推进 V002–V005 简报制作与发布',
              ].map((item, i) => (
                <div key={i} className={`timeline-item ${i === 5 ? 'timeline-item-active' : ''}`}>
                  <p style={{ fontSize: '0.9375rem', color: 'var(--secondary)', lineHeight: 1.7 }}>{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Key Insights */}
          <div className="reveal" style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
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
          <div className="reveal" style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: 12 }}>使用的工具</h2>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['Claude Code', 'TikTok', 'Figma', 'Google Sheets'].map(t => (
                <span key={t} className="tag" data-tooltip={`用于 FILI TV 项目`}>{t}</span>
              ))}
            </div>
          </div>

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
