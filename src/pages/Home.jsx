import { useState } from 'react'
import Footer from '../components/Footer'
import CopyEmail from '../components/CopyEmail'
import HuntlineProgress from '../components/HuntlineProgress'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { blogUrl, ghUrl } from '../config'

/* ---------- 数据 ---------- */

const now = [
  '北京外国语大学 · 国际商务硕士在读',
  '迭代私域商业情报 Agent（GraphRAG）',
  '在博客记录 AI 工作流实验',
]

const experiments = [
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
    title: '铁证 IRONPROOF · 健身打卡',
    tag: 'TypeScript · PWA · Cloudflare',
    desc: '受够了广告和付费墙，给自己写了个本地优先的无广告打卡工具——周报、热力图、离线 PWA，数据不出设备。',
    link: 'https://tiezheng.pages.dev',
    cta: '试用',
  },
  {
    title: '每日心情打卡',
    tag: 'React · 零后端',
    desc: '一次点击记录情绪，按周聚合出情绪波形。秒开，数据不出设备。',
    link: ghUrl('omm-daily-happy/'),
    cta: '试用',
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
                我是朱鑫垚。我用 AI 做工具，解决工作和生活里的具体问题；也从阅读和播客里整理想法，做成值得回看的作品。希望技术帮我们少一些重复，多一点时间，留给好奇、思考和真实的生活。
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
            <p className="case-kicker">Case 02 · 原创像素 RPG · 可试玩</p>
            <h3 className="case-title">
              <a className="case-title-link" href={ghUrl('Product-quest/')} target="_blank" rel="noopener noreferrer">Product Quest · 产品经理大冒险<span className="title-arrow">↗</span></a>
            </h3>

            <p className="case-purpose">一个边玩边学产品设计的闯关游戏。你会面对“给谁做、做什么、怎么选”的问题，在故事里做决定、看结果；没学过产品知识也能直接开始。</p>
            <figure className="plate quest-demo">
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
              <figcaption><span>图二</span>不用看说明，直接在这里玩一关。</figcaption>
            </figure>
            <div className="case-entry">
              <a className="link-strong" href={ghUrl('Product-quest/')} target="_blank" rel="noopener noreferrer">打开游戏，开始闯关 ↗</a>
            </div>
            <div className="case-details">
              <h4 className="case-h">内容与技术细节</h4>
              <p>把产品知识做成能通关的 RPG：引擎与内容彻底解耦（engine.js + JSON 数据层），像素角色、场景、音效 100% 代码生成；“最优 / 次优 / 翻车”三级决策树，术语与案例逐条标注《Inspired》《精益创业》《The Mom Test》等 16 处出处。</p>
              <div className="case-nums">
                <div><strong>9 章 37 关</strong><span>主线全部完结</span></div>
                <div><strong>44 个</strong><span>三级博弈决策点</span></div>
                <div><strong>30+</strong><span>内嵌术语图鉴</span></div>
              </div>
            </div>
          </article>

          {/* —— CASE 03：游荡集 —— */}
          <article className="case rv">
            <p className="case-kicker">Case 03 · 播客精读网站</p>
            <h3 className="case-title">
              <a className="case-title-link" href="https://youdang.heystone.site/" target="_blank" rel="noopener noreferrer">游荡集 · 把播客读成一本书<span className="title-arrow">↗</span></a>
            </h3>
            <p className="case-purpose">
              把许知远《游荡集》的长篇播客整理成精读文章，适合更喜欢阅读，或想在听完后回顾故事的人。还可以跟着音乐和地图，探索谈话中的地方与生活。
            </p>

            <figure className="plate site-preview">
              <a href="https://youdang.heystone.site/" target="_blank" rel="noopener noreferrer" aria-label="打开游荡集播客精读网站">
                <picture>
                  <source media="(max-width: 640px)" srcSet={`${import.meta.env.BASE_URL}shots/youdang-mobile.png`} width="390" height="426" />
                  <img src={`${import.meta.env.BASE_URL}shots/youdang.png`} width="1280" height="720" alt="游荡集网站首页：海浪背景与播客阅读主题" loading="lazy" />
                </picture>
              </a>
              <figcaption><span>图三</span>在声音里游荡世界。点击预览，走进游荡集。</figcaption>
            </figure>
            <div className="case-entry">
              <a className="link-strong" href="https://youdang.heystone.site/" target="_blank" rel="noopener noreferrer">打开游荡集，开始阅读 ↗</a>
              <p>个人整理的非官方专题站，可从首页选择感兴趣的一期。</p>
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
              <a key={e.title} className="exp-card rv" href={e.link} target="_blank" rel="noopener noreferrer">
                <p className="exp-tag"><span className="exp-no">No.{String(i + 1).padStart(2, '0')}</span>{e.tag}</p>
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
      <section id="about" className="section section-dark">
        <div className="container container-narrow">
          <div className="section-head rv">
            <p className="sec-no">肆</p>
            <h2 className="sec-title">关于<span className="sec-en">About</span></h2>
          </div>

          <div className="about rv">
            <p className="about-quote">机器会写代码，但总得有人知道，为什么要写它。</p>
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
            <p className="contact-lead">想聊聊，就写信给我。</p>
            <div className="contact-email-line"><a href="mailto:zhuxinyao99@gmail.com" className="contact-mail">zhuxinyao99@gmail.com</a><CopyEmail email="zhuxinyao99@gmail.com" /></div>
            <svg className="sign" viewBox="0 0 260 60" aria-hidden="true">
              <path pathLength="1" d="M6 44 C40 42 70 10 94 14 C114 18 100 50 78 46 C58 42 92 24 140 30 S214 42 254 20" />
            </svg>
            <div className="contact-row">
              <a href="https://github.com/nuts-and-bytes" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
              <a href={blogUrl('')} target="_blank" rel="noopener noreferrer">博客 ↗</a>
              <a href="https://t.me/ericlibro" target="_blank" rel="noopener noreferrer">Telegram ↗</a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
