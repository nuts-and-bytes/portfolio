import { useState } from 'react'
import Footer from '../components/Footer'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { ghUrl } from '../config'

/* ---------- 数据 ---------- */

const now = [
  '北京外国语大学 · 国际商务硕士在读',
  '迭代私域商业情报 Agent（GraphRAG）',
  '在博客记录 AI 工作流实验',
]

const experiments = [
  {
    title: 'LLM 自动化知识库',
    tag: 'Obsidian · Claude Code',
    desc: '丢一个链接，说句 ingest，自动转录、写笔记、连双链。70+ 篇笔记，0 次手动整理。',
    link: ghUrl('ai-songshu-garden/%E5%A6%82%E4%BD%95%E7%94%A8-Claude-Code-%E6%90%AD%E4%B8%80%E4%B8%AA%E4%BC%9A%E8%87%AA%E5%8A%A8%E6%95%B4%E7%90%86%E7%9A%84%E7%9F%A5%E8%AF%86%E5%BA%93'),
    cta: '搭建教程',
  },
  {
    title: 'Daily Tree · 记忆森林',
    tag: 'Three.js · WebGL',
    desc: '每天记一件事，长成一棵 3D 的树。记录越多，森林越茂盛。96 commits。',
    link: ghUrl('daily-tree/app/'),
    cta: '试用',
  },
  {
    title: 'Word Universe · 词义星系',
    tag: 'D3.js · LLM Embedding',
    desc: '用 embedding 把单词之间的语义距离画成一片星空。',
    link: ghUrl('word-universe/'),
    cta: '试用',
  },
  {
    title: 'Fitness Daily · 健身打卡',
    tag: 'React · localStorage',
    desc: '受够了广告和付费墙，给自己写了个无广告的打卡工具，周报和热力图都在本地。',
    link: ghUrl('fitness-daily/'),
    cta: '试用',
  },
  {
    title: '每日心情打卡',
    tag: 'React · 零后端',
    desc: '一次点击记录情绪，按周聚合出情绪波形。秒开，数据不出设备。',
    link: ghUrl('omm-daily-happy/'),
    cta: '试用',
  },
  {
    title: 'nuts & bytes · 博客',
    tag: '开源 · 持续更新',
    desc: '「用 AI 重做自己」的公开记录——教程、心得、踩坑，都老实写下来。',
    link: ghUrl('ai-songshu-garden/'),
    cta: '去逛逛',
  },
]

/* ---------- 页面 ---------- */

export default function Home() {
  useScrollReveal()
  const [questLoaded, setQuestLoaded] = useState(false)

  return (
    <>
      {/* ══════════ HERO ══════════ */}
      <header className="hero" id="hero">
        <div className="container hero-container">
          <p className="hero-vertical" aria-hidden="true">EXPLORE · LEARN · BUILD · SHIP</p>
          <p className="hero-kicker in-1">Xinyao Zhu — AI-Native Builder · Beijing</p>
          <h1 className="hero-title in-2">
            非科班出身，<br />用 AI 把想法<span className="nowrap">做到上线<span className="accent-dot">。</span></span>
          </h1>
          <p className="hero-lede in-3">
            我是朱鑫垚（Eric）。商务英语出身、国际商务在读，零基础开始用 AI agent
            写代码——现在有 6 个上线的 Web 作品、1 套在真实业务里跑着的企业级 LLM
            系统，和一个自己会生长的知识库。工具一直在换，探索欲没停过。
          </p>

          <div className="hero-now in-4">
            <p className="now-label"><span className="now-dot" />Now · 正在进行</p>
            <ul>
              {now.map((n) => <li key={n}>{n}</li>)}
            </ul>
          </div>

          <div className="hero-links in-5">
            <button className="link-strong" onClick={() => document.getElementById('cases')?.scrollIntoView({ behavior: 'smooth' })}>
              看两个代表作 ↓
            </button>
            <a href="https://github.com/nuts-and-bytes" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
            <a href={ghUrl('ai-songshu-garden/')} target="_blank" rel="noopener noreferrer">博客 ↗</a>
          </div>
        </div>
      </header>

      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">
          <span>AI-NATIVE BUILDER</span><span className="tick-dot">◆</span><span>非科班出身</span><span className="tick-dot">◆</span><span>6 个上线作品</span><span className="tick-dot">◆</span><span>企业级 LLM 系统</span><span className="tick-dot">◆</span><span>零基础 → 上线</span><span className="tick-dot">◆</span><span>探索欲没停过</span><span className="tick-dot">◆</span><span>AI-NATIVE BUILDER</span><span className="tick-dot">◆</span><span>非科班出身</span><span className="tick-dot">◆</span><span>6 个上线作品</span><span className="tick-dot">◆</span><span>企业级 LLM 系统</span><span className="tick-dot">◆</span><span>零基础 → 上线</span><span className="tick-dot">◆</span><span>探索欲没停过</span><span className="tick-dot">◆</span>
        </div>
      </div>

      {/* ══════════ 01 旗舰案例 ══════════ */}
      <section id="cases" className="section">
        <div className="container">
          <div className="section-head rv">
            <p className="sec-no">01 — Case Studies</p>
            <h2 className="sec-title">旗舰案例</h2>
            <p className="sec-lede">
              两个能代表我方法的项目：一个证明我能把 LLM 落进真实业务，一个证明我能把想法做成完整产品。
            </p>
          </div>

          {/* —— CASE 01：商业情报 Agent —— */}
          <article className="case rv">
            <p className="case-kicker">Case 01 · 企业级 LLM 应用 · 已部署使用 · 2026.05 – 06</p>
            <h3 className="case-title">私域人才库 & 商业情报 Agent</h3>

            <div className="case-grid">
              <div>
                <h4 className="case-h">问题</h4>
                <p>
                  一家猎头公司的上万份简历与高管人脉，散落在文档和聊天记录里——检索靠记忆，尽调靠翻群。
                </p>
                <h4 className="case-h">我做了什么</h4>
                <p>
                  独立完成从产品设计到部署的全流程：GraphRAG 三库架构（PostgreSQL 结构化 +
                  ChromaDB 向量 + Neo4j 关系图谱），DeepSeek V3 批量抽取，FastAPI + React，
                  Docker 部署阿里云。为真实商用补齐防幻觉溯源、实体消歧与 PIPL 合规设计。
                </p>
              </div>

              <div className="arch" aria-label="系统架构示意">
                <div className="arch-row"><span className="arch-node">简历 / 文档 / 对话</span></div>
                <div className="arch-arrow">↓ LLM 批量抽取</div>
                <div className="arch-row arch-dbs">
                  <span className="arch-node">PostgreSQL</span>
                  <span className="arch-node">ChromaDB</span>
                  <span className="arch-node">Neo4j</span>
                </div>
                <div className="arch-arrow">↓ Agent 检索 · 推理 · 溯源</div>
                <div className="arch-row"><span className="arch-node arch-out">精准招聘 · VC 尽调 · 企业 BI</span></div>
              </div>
            </div>

            <div className="case-nums">
              <div><strong>≤ ¥200</strong><span>万份简历处理成本</span></div>
              <div><strong>3 个</strong><span>覆盖的业务场景</span></div>
              <div><strong>日常在用</strong><span>顾问团队真实使用</span></div>
            </div>
            <p className="case-note">私域系统不便公开演示；架构与踩坑细节，欢迎当面聊。
              <a className="case-repo" href="https://github.com/nuts-and-bytes" target="_blank" rel="noopener noreferrer">我的其他开源代码 ↗</a>
            </p>
          </article>

          {/* —— CASE 02：Product Quest —— */}
          <article className="case rv">
            <p className="case-kicker">Case 02 · 原创像素 RPG · 零素材零后端 · 可试玩</p>
            <h3 className="case-title">
              <a className="case-title-link" href={ghUrl('Product-quest/')} target="_blank" rel="noopener noreferrer">Product Quest · 产品经理大冒险<span className="title-arrow">↗</span></a>
            </h3>

            <div className="case-grid">
              <div>
                <h4 className="case-h">问题</h4>
                <p>
                  AI 能帮你把代码写出来，却没法告诉你：该做什么、为谁做、凭什么赢。产品方法论太抽象，缺一个能「输」的练习场。
                </p>
                <h4 className="case-h">我做了什么</h4>
                <p>
                  把产品知识做成能通关的 RPG：引擎与内容彻底解耦（engine.js + JSON 数据层），像素角色、场景、音效
                  100% 代码生成；「最优 / 次优 / 翻车」三级决策树，术语与案例逐条标注《Inspired》《精益创业》《The
                  Mom Test》等 16 处出处。
                </p>
              </div>
              <div className="case-nums case-nums-col">
                <div><strong>9 章 37 关</strong><span>主线全部完结</span></div>
                <div><strong>44 个</strong><span>三级博弈决策点</span></div>
                <div><strong>30+</strong><span>内嵌术语图鉴</span></div>
              </div>
            </div>

            <div className="quest-demo">
              {questLoaded ? (
                <iframe
                  src={ghUrl('Product-quest/')}
                  title="Product Quest 试玩"
                  loading="lazy"
                />
              ) : (
                <button className="quest-load" onClick={() => setQuestLoaded(true)}>
                  <img className="quest-bg" src={`${import.meta.env.BASE_URL}shots/product-quest.png`} alt="" loading="lazy" />
                  <span className="quest-load-icon">▶</span>
                  在这里直接试玩
                  <span className="quest-load-sub">加载约 1 秒 · 零基础可玩</span>
                </button>
              )}
              <a className="quest-open" href={ghUrl('Product-quest/')} target="_blank" rel="noopener noreferrer">
                新窗口打开 ↗
              </a>
            </div>
          </article>
        </div>
      </section>

      {/* ══════════ 02 实验架 ══════════ */}
      <section id="experiments" className="section section-alt">
        <div className="container">
          <div className="section-head rv">
            <p className="sec-no">02 — Experiments</p>
            <h2 className="sec-title">实验架</h2>
            <p className="sec-lede">给自己做的小工具和练手实验——都在线上，点开就能用。</p>
          </div>

          <div className="exp-grid">
            {experiments.map((e, i) => (
              <a key={e.title} className="exp-card rv" href={e.link} target="_blank" rel="noopener noreferrer">
                <p className="exp-tag"><span className="exp-no">{String(i + 1).padStart(2, '0')}</span>{e.tag}</p>
                <h3>{e.title}</h3>
                <p className="exp-desc">{e.desc}</p>
                <span className="exp-cta">{e.cta} →</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ 03 写作 ══════════ */}
      <section id="writing" className="section">
        <div className="container">
          <div className="section-head rv">
            <p className="sec-no">03 — Writing</p>
            <h2 className="sec-title">写作</h2>
            <p className="sec-lede">把过程写下来，是我消化世界的方式。</p>
          </div>

          <a className="post rv" href={ghUrl('ai-songshu-garden/%E5%A6%82%E4%BD%95%E7%94%A8-Claude-Code-%E6%90%AD%E4%B8%80%E4%B8%AA%E4%BC%9A%E8%87%AA%E5%8A%A8%E6%95%B4%E7%90%86%E7%9A%84%E7%9F%A5%E8%AF%86%E5%BA%93')} target="_blank" rel="noopener noreferrer">
            <div>
              <p className="post-meta">精选 · AI / 工作流 / Obsidian · 2026.06 · 12 分钟</p>
              <h3>如何用 Claude Code 搭一个会自动整理的知识库</h3>
              <p className="post-desc">
                丢一个链接，说句 ingest，它就自动转录、写笔记、建 Wiki、连双链——70+ 篇笔记没有一篇是我手动整理的。
              </p>
            </div>
            <span className="post-arrow">→</span>
          </a>
          <p className="writing-more rv">
            更多教程、心得和踩坑记录，在 <a href={ghUrl('ai-songshu-garden/')} target="_blank" rel="noopener noreferrer">nuts & bytes ↗</a>
          </p>
        </div>
      </section>

      {/* ══════════ 04 关于 ══════════ */}
      <section id="about" className="section section-dark">
        <div className="container container-narrow">
          <div className="section-head rv">
            <p className="sec-no">04 — About</p>
            <h2 className="sec-title">关于</h2>
          </div>

          <div className="about rv">
            <p>
              北京外国语大学国际商务硕士在读；本科西安外国语大学商务英语（ACCA
              方向），专八。做过海外猎头和投资机构的实习；毕业论文用 Python 爬了 50+
              家跨境电商的招聘数据研究人才技能缺口，评了优秀。
            </p>
            <p>
              我不是计算机科班——这正是重点。我在验证的事情是：一个爱探索、学得快的人，加上
              AI，能把想法推多远。目前的答案是：从一句 prompt，到猎头顾问每天在用的系统。
            </p>
            <p className="about-langs">中文 · English（TEM-8）· Español（A1）</p>
          </div>

          <div className="contact rv">
            <a href="mailto:zhuxinyao99@gmail.com" className="contact-mail">zhuxinyao99@gmail.com</a>
            <div className="contact-row">
              <a href="https://github.com/nuts-and-bytes" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
              <a href={ghUrl('ai-songshu-garden/')} target="_blank" rel="noopener noreferrer">博客 ↗</a>
              <a href="https://t.me/ericlibro" target="_blank" rel="noopener noreferrer">Telegram ↗</a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
