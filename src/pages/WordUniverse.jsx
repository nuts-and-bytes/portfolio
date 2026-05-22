import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { useScrollReveal } from '../hooks/useScrollReveal'

export default function WordUniverse() {
  useScrollReveal()

  useEffect(() => {
    document.title = "Word Universe 词汇星系 | Eric Lu"
  }, [])

  return (
    <main style={{ paddingTop: 80 }}>
      <div className="page-gradient" />

      {/* Hero Banner */}
      <section style={{ padding: '80px 0 0', background: 'linear-gradient(180deg, rgba(99, 102, 241, 0.05) 0%, transparent 100%)' }}>
        <div className="container" style={{ maxWidth: 900 }}>
          <div className="animate-in" style={{ marginBottom: 40 }}>
            <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
              <span className="tag-status tag-done">已完成</span>
              <span className="tag">D3.js</span>
              <span className="tag-status tag-active" style={{ background: 'rgba(99, 102, 241, 0.1)', color: '#6366f1', border: '1px solid rgba(99,102,241,0.2)' }}>数据可视化</span>
              <span className="tag">LLM Embeddings</span>
            </div>
            <h1 className="section-title">Word Universe · 词汇星系</h1>
            <p className="animate-in delay-1" style={{ color: 'var(--secondary)', marginTop: 16, fontSize: '1.0625rem', lineHeight: 1.7, maxWidth: 650 }}>
              将你的知识谱系具象为一整片星系。每一个学习到的单词都是一颗恒星，它们不是按字母表排列，而是根据语义向量聚类，让你一目了然地看见自己认知世界的形状。
            </p>
          </div>
        </div>
      </section>

      {/* Interactive App Demo (Iframe) */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container" style={{ maxWidth: 900 }}>
          <div className="reveal" style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ width: 4, height: 20, background: '#6366f1', borderRadius: 2 }} />
              实时交互沙盒 (Live Sandbox)
            </h2>
            
            {/* Browser Mockup */}
            <div style={{
              background: 'var(--white)',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              borderRadius: 16,
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.02)',
              overflow: 'hidden'
            }}>
              {/* Browser Toolbar */}
              <div style={{
                background: 'rgba(0,0,0,0.02)',
                borderBottom: '1px solid rgba(0,0,0,0.05)',
                padding: '12px 18px',
                display: 'flex',
                alignItems: 'center',
                gap: 8
              }}>
                <div style={{ display: 'flex', gap: 6 }}>
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#EF4444', display: 'inline-block' }}></span>
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#F59E0B', display: 'inline-block' }}></span>
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#10B981', display: 'inline-block' }}></span>
                </div>
                <div style={{
                  flex: 1,
                  background: 'var(--white)',
                  borderRadius: 6,
                  fontSize: '0.75rem',
                  color: 'var(--muted)',
                  padding: '4px 12px',
                  textAlign: 'center',
                  fontFamily: 'var(--font-mono)',
                  border: '1px solid rgba(0,0,0,0.03)',
                  maxWidth: 400,
                  margin: '0 auto'
                }}>
                  https://zhuxinyao99-jpg.github.io/word-universe/app/
                </div>
              </div>
              
              {/* Iframe */}
              <div style={{ position: 'relative', width: '100%', height: 550, background: '#111' }}>
                <iframe 
                  src="https://zhuxinyao99-jpg.github.io/word-universe/app/" 
                  title="Word Universe App"
                  style={{
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    background: 'transparent'
                  }}
                />
              </div>
            </div>
            <p style={{ fontSize: '0.8125rem', color: 'var(--muted)', marginTop: 12, textAlign: 'center' }}>
              💡 提示：在上方沙盒中，点击或按 Cmd+N 可输入新单词（试着输入 ephemeral, serendipity, mountains），它们将自动通过力导向图发生引力汇聚。
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32, marginBottom: 48 }}>
            {/* Features */}
            <div className="reveal">
              <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ width: 4, height: 20, background: '#6366f1', borderRadius: 2 }} />
                核心亮点
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { title: '语义向量对齐聚类', desc: '根据自然语言模型（LLM）的 Embedding 向量计算词义距离，让“含义相近”的单词在物理空间上自动吸附，告别死板的字母顺序。' },
                  { title: '五大语义星云分类', desc: '系统自动将词汇划分为 Concrete（具象）、Abstract（抽象）、Action（动作）、Nature（自然）和 Social（社交）五大语义集群。' },
                  { title: 'D3.js 力导向星空图', desc: '每一个单词粒子都有其飘逸的物理力场。支持拖拽交互、智能缩放、连接线探索与动态呼吸光效。' },
                  { title: '掌握度成长跟踪', desc: '提供 0-3 级的掌握评定，达到 3 级的单词会幻化为带有金色光环的璀璨恒星，星系内会显示你的高光记忆词组。' }
                ].map((item, idx) => (
                  <div key={idx} className="card-shell">
                    <div className="card-core" style={{ padding: 18, cursor: 'default' }}>
                      <h3 style={{ fontSize: '0.9375rem', fontWeight: 600, marginBottom: 6 }}>{item.title}</h3>
                      <p style={{ fontSize: '0.875rem', color: 'var(--secondary)', lineHeight: 1.6 }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Design & Info */}
            <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
              <div>
                <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ width: 4, height: 20, background: '#6366f1', borderRadius: 2 }} />
                  设计哲学
                </h2>
                <div className="card-shell">
                  <div className="card-core card-glass" style={{ padding: 20, cursor: 'default' }}>
                    <p style={{ fontSize: '0.9375rem', color: 'var(--secondary)', lineHeight: 1.7 }}>
                      单词列表隐藏了知识的网状关系。但如果你能看到单词被归拢排列在不同的语义星团里——抽象概念在这里，自然词汇在那里，人际动作在另一边——你便会发现自己认知的缺口。
                    </p>
                    <p style={{ fontSize: '0.9375rem', color: 'var(--secondary)', lineHeight: 1.7, marginTop: 12 }}>
                      这不仅是一个背单词的工具，更是你精神宇宙的沙盘。每一颗被你采纳并熟悉掌握的字词，都是照亮这个宇宙的星星。
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: 12 }}>键盘快捷键</h2>
                <div className="card-shell">
                  <div className="card-core" style={{ padding: '16px 20px', cursor: 'default' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid rgba(0,0,0,0.04)', fontSize: '0.875rem' }}>
                      <span style={{ color: 'var(--secondary)' }}>添加新单词</span>
                      <kbd style={{ fontFamily: 'var(--font-mono)', background: 'rgba(0,0,0,0.05)', padding: '2px 6px', borderRadius: 4, fontSize: '0.75rem' }}>Cmd / Ctrl + N</kbd>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: '0.875rem' }}>
                      <span style={{ color: 'var(--secondary)' }}>关闭信息窗</span>
                      <kbd style={{ fontFamily: 'var(--font-mono)', background: 'rgba(0,0,0,0.05)', padding: '2px 6px', borderRadius: 4, fontSize: '0.75rem' }}>Esc</kbd>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: 12 }}>使用的技术栈</h2>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {['D3.js (Force Layout)', 'Vanilla JS', 'Local Storage', 'LLM API (OpenAI/Minimax)', 'CSS Keyframes', 'GitHub Pages'].map(t => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="reveal" style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <Link to="/" className="btn btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <span className="btn-icon-circle" style={{ margin: '0 4px 0 0', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </span>
              返回首页
            </Link>
            <a href="https://github.com/zhuxinyao99-jpg/word-universe" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <span className="btn-icon-circle" style={{ margin: '0 4px 0 0', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </span>
              GitHub 源码
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
