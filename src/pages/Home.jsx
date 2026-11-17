import { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import CopyEmail from '../components/CopyEmail'
import ContactIcon from '../components/ContactIcon'
import HuntlineProgress from '../components/HuntlineProgress'
import StoneCorner from '../components/StoneCorner'
import LoadingScene from '../components/LoadingScene'
import { blogUrl, ghUrl } from '../config'

/* ---------- 数据 ---------- */

const now = [
  '北京外国语大学 · 国际商务硕士在读',
  '继续改私域商业情报助手（GraphRAG）',
  '在博客记录 AI 工作流实验',
]

const experiments = [
  {
    title: 'Daily Tree · 记忆森林',
    tag: 'Canvas · 浏览器本地记录',
    desc: '每天留下一件事和图片，让树随记录生长。文字与图片保存在当前浏览器；导出备份时要另外保留原图。',
    link: ghUrl('daily-tree/app/'),
    repo: 'https://github.com/nuts-and-bytes/daily-tree',
    cta: '试用',
  },
  {
    title: 'Word Universe · 词义星系',
    tag: 'D3.js · LLM Embedding',
    desc: '把词汇、释义与掌握度放进可探索的星空。默认使用本地回退算法，可选接入 OpenAI 语义向量。',
    link: ghUrl('word-universe/app/'),
    repo: 'https://github.com/nuts-and-bytes/word-universe',
    cta: '试用',
  },
  {
    title: '铁证 IRONPROOF · 训练与营养记录',
    tag: 'TypeScript · PWA · Cloudflare',
    desc: '记录训练、体重与饮食，回看趋势并生成训练海报。核心记录本地优先，可选 AI 估算有独立的联网与权限边界。',
    link: 'https://tiezheng.pages.dev',
    repo: 'https://github.com/nuts-and-bytes/tiezheng',
    cta: '试用',
  },
  {
    title: '哦莫日常 · 日常记录原型',
    tag: '单文件网页 · 历史原型',
    desc: '记录心情、待办和自我探索。保留为可直接预览的网页快照，AI 入口尚未配置。',
    link: ghUrl('omm-daily-happy/'),
    repo: 'https://github.com/nuts-and-bytes/omm-daily-happy',
    cta: '试用',
  },
]

/* ---------- 页面 ---------- */

export default function Home() {
  const [questLoaded, setQuestLoaded] = useState(false)
  const [questFrameReady, setQuestFrameReady] = useState(false)

  useEffect(() => {
    if (!questLoaded || questFrameReady) return
    // The frame's load event can be delayed by optional third-party resources.
    const timer = window.setTimeout(() => setQuestFrameReady(true), 8000)
    return () => window.clearTimeout(timer)
  }, [questLoaded, questFrameReady])

  return (
    <>
      {/* ══════════ HERO ══════════ */}
      <header className="hero" id="hero">
        <div className="container hero-container">
          <p className="hero-vertical" aria-hidden="true">EXPLORE · LEARN · BUILD · SHIP</p>
          <svg className="hero-ink" viewBox="0 0 400 400" aria-hidden="true">
            <path pathLength="1" d="M200 40 C320 30 380 150 300 260 S120 380 110 240 S150 90 240 120 S300 220 220 250" />
          </svg>
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="hero-kicker in-1">Xinyao Zhu · 北京</p>
              <h1 className="hero-title in-2">
                为 AI 世界，<br />留一点<span className="nowrap">人味<span className="accent-dot">。</span></span>
              </h1>
              <p className="hero-epi in-2">Machines write the code. Someone still has to care why.</p>
              <p className="hero-lede in-3">
                Hi，我是石头。喜欢读书、听播客，也喜欢用 AI 把脑子里的小想法做出来。这里放着我做的工具、写下的文字，还有一些慢慢生长的作品。欢迎随便逛逛，遇到感兴趣的，也来找我聊聊。
              </p>

              <div className="hero-now in-4">
                <p className="now-label"><span className="now-dot" />Now · 正在进行</p>
                <ul>
                  {now.map((n) => <li key={n}>{n}</li>)}
                </ul>
              </div>

              <div className="hero-links in-5">
                <button className="link-strong" onClick={() => document.getElementById('cases')?.scrollIntoView({ behavior: 'smooth' })}>
                  看项目 ↓
                </button>
                <a href={blogUrl('')} target="_blank" rel="noopener noreferrer">博客 ↗</a>
              </div>
            </div>

            <figure className="hero-shot in-3">
              <a href="https://youdang.heystone.site/" target="_blank" rel="noopener noreferrer" aria-label="打开游荡集，阅读播客精读">
                <img src={`${import.meta.env.BASE_URL}shots/youdang.png`} alt="游荡集网站预览" width="1280" height="720" style={{height:'auto'}} />
                <figcaption>游荡集 · 把播客读成一本书 ↗</figcaption>
              </a>
            </figure>
          </div>
        </div>
      </header>

      {/* ══════════ 01 代表作 ══════════ */}
      <section id="cases" className="section">
        <div className="container">
          <div className="section-head rv">
            <p className="sec-no">壹</p>
            <h2 className="sec-title">项目<span className="sec-en">Projects</span></h2>
          </div>

          {/* —— CASE 01：猎光智能招聘系统 —— */}
          <article className="case rv">
            <p className="case-kicker">Case 01 · 为猎头顾问做的业务系统</p>
            <h3 className="case-title">猎光 · 智能招聘系统</h3>
            <p className="case-purpose">我做了一套给猎头顾问使用的招聘系统，把简历录入、人才检索、推荐报告和客户跟进放在一起，让分散的资料进入同一条工作流程。</p>
            <HuntlineProgress />
            <div className="case-entry">
              <a className="link-strong" href="/#about">联系我，了解项目 ↓</a>
            </div>
          </article>

          {/* —— CASE 02：Product Quest —— */}
          <article className="case rv">
            <p className="case-kicker">Case 02 · 3D 开放群岛与调查游戏 · 可试玩</p>
            <h3 className="case-title">
              <a className="case-title-link" href={ghUrl('Product-quest/')} target="_blank" rel="noopener noreferrer">Product Quest · 产品经理大冒险<span className="title-arrow">↗</span></a>
            </h3>

            <p className="case-purpose">漫游四座相连的岛屿，创建角色，走进蓝山咖啡馆交谈和调查。用线索组合试验，观察顾客与店员的变化；任务演出随试验结果推进，原有产品经理剧情也可以继续游玩。</p>
            <figure className="plate quest-demo">
              {questLoaded ? (
                <div className="quest-frame-wrap">
                  <iframe
                    src={ghUrl('Product-quest/')}
                    title="Product Quest 试玩"
                    onLoad={() => setQuestFrameReady(true)}
                  />
                  {!questFrameReady && <div className="quest-loading"><LoadingScene dark title="小石头正在铺好通往群岛的路…" detail="3D 世界正在加载，首次进入可能需要一点时间" /></div>}
                </div>
              ) : (
                <div className="quest-showcase">
                  <button type="button" className="quest-hero-frame" onClick={() => setQuestLoaded(true)} aria-label="点击画面直接试玩 Product Quest">
                    <img
                      className="shot-16x9 quest-hero-img"
                      src={`${import.meta.env.BASE_URL}shots/quest-1920.webp`}
                      srcSet={`${import.meta.env.BASE_URL}shots/quest-960.webp 960w, ${import.meta.env.BASE_URL}shots/quest-1920.webp 1920w`}
                      sizes="(max-width: 1000px) 95vw, 960px"
                      width="1920"
                      height="1080"
                      alt="Product Quest 星火岛的游戏实景"
                      loading="lazy"
                    />
                  </button>
                  <button className="quest-try" onClick={() => setQuestLoaded(true)}>
                    <span aria-hidden="true">▶</span> 在这里直接试玩 <span className="quest-try-note">零基础可玩</span>
                  </button>
                </div>
              )}
              {questLoaded && <a className="quest-open" href={ghUrl('Product-quest/')} target="_blank" rel="noopener noreferrer">
                新窗口打开 ↗
              </a>}
              <figcaption>游戏实景截图。点击画面或按钮加载互动试玩；如果加载较慢，可以在新窗口打开。</figcaption>
            </figure>
            <div className="case-entry">
              <a className="link-strong" href={ghUrl('Product-quest/')} target="_blank" rel="noopener noreferrer">进入群岛，开始探索 ↗</a>
              <a className="case-repo" href="https://github.com/nuts-and-bytes/Product-quest" target="_blank" rel="noopener noreferrer">查看源码 ↗</a>
            </div>
            <div className="case-details">
              <h4 className="case-h">内容与技术细节</h4>
              <p>开放群岛、蓝山调查和原有剧情由同一套存档连接。你可以在咖啡馆交谈、圈出线索、尝试方案，再比较周三早高峰与周末手冲日的不同结果；实时演出依据试验结果变化，没有联网 AI 评分。</p>
              <div className="case-nums">
                <div><strong>4 座岛</strong><span>连续探索区域</span></div>
                <div><strong>2 种情境</strong><span>观察不同经营瓶颈</span></div>
                <div><strong>调查与主线</strong><span>两条入口并存</span></div>
              </div>
            </div>
          </article>

          {/* —— CASE 03：游荡集 —— */}
          <article className="case rv">
            <p className="case-kicker">Case 03 · 播客精读网站</p>
            <h3 className="case-title">
              游荡集 · 把播客读成一本书
            </h3>
            <p className="case-purpose">
              把许知远《游荡集》的长篇播客整理成精读文章，适合更喜欢阅读，或想在听完后回顾故事的人。还可以沿游荡地图、人物作品索引和跨集线索，回到对应章节与音频。
            </p>

            <figure className="plate site-preview">
              <div>
                <picture>
                  <source media="(max-width: 640px)" srcSet={`${import.meta.env.BASE_URL}shots/youdang-mobile.png`} width="390" height="426" />
                  <img src={`${import.meta.env.BASE_URL}shots/youdang.png`} width="1280" height="720" alt="游荡集网站首页：海浪背景与播客阅读主题" loading="lazy" />
                </picture>
              </div>
              <figcaption>在声音里游荡世界，把长篇谈话留在纸上。</figcaption>
            </figure>
            <div className="case-entry">
              <a className="link-strong" href="https://youdang.heystone.site/" target="_blank" rel="noopener noreferrer">打开游荡集，开始阅读 ↗</a>
              <p>个人整理的非官方专题站，可从首页选择感兴趣的一期。</p>
            </div>
          </article>

          {/* —— CASE 04：Research Edition —— */}
          <article className="case rv">
            <p className="case-kicker">Case 04 · AI 产业阅读</p>
            <h3 className="case-title">
              Research Edition · AI 产业长文与报告
            </h3>
            <p className="case-purpose">精选知名投资与研究机构的 AI 深度报告，覆盖产业史观、竞争格局、具身智能、技术前沿与预测，配中文导读，为静心完整阅读而设计。</p>

            <figure className="plate site-preview">
              <div>
                <img className="shot-16x9" src={`${import.meta.env.BASE_URL}shots/research-edition.webp`} width="1280" height="720" alt="Research Edition 首页：AI 产业长文与报告" loading="lazy" />
              </div>
              <figcaption>从目录挑一篇，一次读完。</figcaption>
            </figure>
            <div className="case-entry">
              <a className="link-strong" href="https://read.heystone.site" target="_blank" rel="noopener noreferrer">打开 Research Edition，开始阅读 ↗</a>
            </div>
          </article>
        </div>
      </section>

      {/* ══════════ 02 实验架 ══════════ */}
      <section id="experiments" className="section section-alt">
        <div className="container">
          <div className="section-head rv">
            <p className="sec-no">贰</p>
            <h2 className="sec-title">工具箱<span className="sec-en">Tools</span></h2>
            <p className="sec-lede">给自己做的小工具和练手实验，点开就能用。</p>
          </div>

          <div className="exp-grid">
            {experiments.map((e, i) => (
              <article key={e.title} className="exp-card rv">
                <p className="exp-tag"><span className="exp-no">No.{String(i + 1).padStart(2, '0')}</span>{e.tag}</p>
                <h3>{e.title}</h3>
                <p className="exp-desc">{e.desc}</p>
                <div className="project-actions"><a className="exp-cta" href={e.link} target="_blank" rel="noopener noreferrer">{e.cta} ↗</a><a className="case-repo" href={e.repo} target="_blank" rel="noopener noreferrer">查看源码 ↗</a></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ 03 写作 ══════════ */}
      <section id="writing" className="section">
        <div className="container">
          <div className="section-head rv">
            <p className="sec-no">叁</p>
            <h2 className="sec-title">博客<span className="sec-en">Blog</span></h2>
            <p className="sec-lede">把过程写下来，是我消化世界的方式。</p>
          </div>

          <a className="post rv" href={blogUrl('posts/如何用-claude-code-搭一个会自动整理的知识库.html')} target="_blank" rel="noopener noreferrer">
            <p className="post-date" aria-hidden="true">二〇二六年十月更新</p>
            <div className="post-body">
              <p className="post-meta">教程 · Obsidian / AI · 附起步包</p>
              <h3>用 Obsidian 打造你的第二大脑</h3>
              <p className="post-desc">
                把读过的资料变成有来源、能找回、能关联的笔记。从一篇文章开始，附真实知识库截图、完整 AI 提示词和可下载起步包。
              </p>
            </div>
            <img className="post-preview" src="/images/second-brain.webp" alt="我的 Obsidian 知识库真实关系图谱" width="1920" height="1080" loading="lazy" />
            <span className="post-arrow" aria-hidden="true">→</span>
          </a>
          <p className="writing-more rv">
            更多教程、心得和踩坑记录，在 <a href={blogUrl('')} target="_blank" rel="noopener noreferrer">stone ↗</a>
          </p>
        </div>
      </section>

      {/* ══════════ 04 关于 ══════════ */}
      <section id="about" className="section about-paper">
        <div className="container container-narrow">
          <div className="section-head rv">
            <p className="sec-no">肆</p>
            <h2 className="sec-title">关于<span className="sec-en">About</span></h2>
          </div>

          <div className="about-layout">
            <div className="about about-short rv">
              <p className="about-intro">我是朱鑫垚，也叫 Stone。</p>
              <p>在北外读国际商务，用 AI 做些工作和生活里用得上的东西。平时读书、听播客，也在这里记下想法。</p>
            </div>
            <div className="contact contact-compact rv">
              <h3>聊聊想法，或打个招呼。</h3>
              <div className="contact-email-line">
                <a href="mailto:zhuxinyao99@gmail.com" className="contact-mail"><ContactIcon type="mail" /><span>zhuxinyao99@gmail.com</span></a>
                <CopyEmail email="zhuxinyao99@gmail.com" />
              </div>
              <div className="contact-row">
                <a href="https://github.com/nuts-and-bytes" target="_blank" rel="noopener noreferrer"><ContactIcon type="github" /><span>GitHub</span></a>
                <a href={blogUrl('')} target="_blank" rel="noopener noreferrer"><ContactIcon type="book" /><span>博客</span></a>
                <a href="https://t.me/ericlibro" target="_blank" rel="noopener noreferrer"><ContactIcon type="telegram" /><span>Telegram</span></a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <StoneCorner />
      <Footer light />
    </>
  )
}
