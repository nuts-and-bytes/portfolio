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
  '打磨私域商业情报助手（GraphRAG），帮散落的业务线索长出关联',
  '在博客边做边记 AI 工作流的实验与踩坑',
]

const experiments = [
  {
    title: 'Daily Tree · 记忆森林',
    tag: 'Canvas · 本地日常手记',
    desc: '想让每天攒下的小事有一点看得见的生命力。每天写下一句话、贴一张图，屏幕里的小树就会跟着你的记录慢慢抽枝长叶。',
    note: '记录保存在当前浏览器里；导出备份时记得顺手留好原图。',
    link: ghUrl('daily-tree/app/'),
    repo: 'https://github.com/nuts-and-bytes/daily-tree',
    cta: '打开试试',
  },
  {
    title: 'Word Universe · 词义星系',
    tag: 'D3.js · LLM Embedding',
    desc: '总觉得背单词不该只是死磕列表，词与词之间本来就有引力。于是把学过的词放进一片能漫游的星空，意思相近的词会彼此靠近，生疏与熟悉一眼就能看清。',
    note: '打开即用本地算法排布；也可接入 OpenAI 语义向量看更细腻的引力。',
    link: ghUrl('word-universe/app/'),
    repo: 'https://github.com/nuts-and-bytes/word-universe',
    cta: '打开试试',
  },
  {
    title: '铁证 IRONPROOF · 训练与营养记录',
    tag: 'TypeScript · PWA · Cloudflare',
    desc: '健身和吃饭最怕「凭感觉」，干脆给自己打了个顺手的随身账本。练完记一组、随手记下体重与三餐，攒久了能回看趋势，也能生成一张给自己打气的训练海报。',
    note: '核心数据本地优先保存；可选的 AI 饮食估算走独立联网权限，互不打扰。',
    link: 'https://tiezheng.pages.dev',
    repo: 'https://github.com/nuts-and-bytes/tiezheng',
    cta: '打开试试',
  },
  {
    title: '哦莫日常 · 日常记录原型',
    tag: '单文件网页 · 早期留档',
    desc: '更早之前学着做东西时留下的一个小脚印，用来装每天的心情、待办和一点自我对话。虽然青涩但舍不得删，就把它封存成了一张随时能翻看的网页快照。',
    note: '作为历史原型原样保留，里面的 AI 入口暂未接通。',
    link: ghUrl('omm-daily-happy/'),
    repo: 'https://github.com/nuts-and-bytes/omm-daily-happy',
    cta: '翻看原型',
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
                Hi，我是石头。代码跑得越来越快，我还是喜欢慢一点的笨功夫——平时在书和长播客里泡着，遇到工作或生活里顺手想解决的小麻烦，就拉着 AI 敲敲打打做成真能用的东西。这里像我敞着门的书桌，有在真实业务里运转的系统，也留着纯粹图好玩的半成品。随便翻翻就好，哪一处刚好和你有共鸣，随时来敲门聊聊。
              </p>

              <div className="hero-now in-4">
                <p className="now-label"><span className="now-dot" />Now · 正在进行</p>
                <ul>
                  {now.map((n) => <li key={n}>{n}</li>)}
                </ul>
              </div>

              <div className="hero-links in-5">
                <button className="link-strong" onClick={() => document.getElementById('cases')?.scrollIntoView({ behavior: 'smooth' })}>
                  逛逛作品 ↓
                </button>
                <a href={blogUrl('')} target="_blank" rel="noopener noreferrer">去读博客 ↗</a>
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
            <p className="sec-lede">几件花了更长时间慢慢打磨的作品——有的在真实业务里天天运转，有的用来安放阅读与好奇心。</p>
          </div>

          {/* —— CASE 01：猎光智能招聘系统 —— */}
          <article className="case rv">
            <p className="case-kicker">Case 01 · 为猎头顾问搭的日常工作台</p>
            <h3 className="case-title">猎光 · 智能招聘系统</h3>
            <p className="case-purpose">猎头顾问的日常，很容易被淹没在散落的简历文档、沟通记录和推荐报告里。我帮他们把这些琐碎动作收进了同一张顺手的工作台——从录入简历、检索人选，到生成报告、跟进客户，不用再在十几个窗口间来回腾挪，把心力留给真正需要判断的「看人」与沟通。</p>
            <HuntlineProgress />
            <div className="case-entry">
              <a className="link-strong" href="/#about">对业务工具落地感兴趣？来聊聊 ↓</a>
            </div>
          </article>

          {/* —— CASE 02：Product Quest —— */}
          <article className="case rv">
            <p className="case-kicker">Case 02 · 3D 开放群岛与调查游戏 · 网页直接可玩</p>
            <h3 className="case-title">
              <a className="case-title-link" href={ghUrl('Product-quest/')} target="_blank" rel="noopener noreferrer">Product Quest · 产品经理大冒险<span className="title-arrow">↗</span></a>
            </h3>

            <p className="case-purpose">如果学做产品不是背框架，而是推门走进一家遇到麻烦的咖啡馆呢？在这片由四座小岛连成的世界里，你可以捏个角色四处晃悠，在「蓝山咖啡馆」和店员、常客聊天，把零散观察拼成线索去动手试错，亲眼看看店里的生意和人物反应会怎么随你的决定改变。</p>
            <figure className="plate quest-demo">
              {questLoaded ? (
                <div className="quest-frame-wrap">
                  <iframe
                    src={ghUrl('Product-quest/')}
                    title="Product Quest 试玩"
                    onLoad={() => setQuestFrameReady(true)}
                  />
                  {!questFrameReady && <div className="quest-loading"><LoadingScene dark title="小石头正在铺好通往群岛的路…" detail="正在唤醒 3D 小岛，第一次登岛稍微等几秒就好" /></div>}
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
                    <span aria-hidden="true">▶</span> 点这里直接登岛试玩 <span className="quest-try-note">不用懂产品也能上手</span>
                  </button>
                </div>
              )}
              {questLoaded && <a className="quest-open" href={ghUrl('Product-quest/')} target="_blank" rel="noopener noreferrer">
                新窗口打开 ↗
              </a>}
              <figcaption>星火岛实景。点画面就能直接在网页里玩；要是初次加载稍慢，也可以开个新窗口慢慢逛。</figcaption>
            </figure>
            <div className="case-entry">
              <a className="link-strong" href={ghUrl('Product-quest/')} target="_blank" rel="noopener noreferrer">新窗口登岛探索 ↗</a>
              <a className="case-repo" href="https://github.com/nuts-and-bytes/Product-quest" target="_blank" rel="noopener noreferrer">查看源码 ↗</a>
            </div>
            <div className="case-details">
              <h4 className="case-h">岛上的门道与幕后设计</h4>
              <p>开放群岛、蓝山咖啡馆调查，还有最早那版产品经理主线剧情，都串在同一份存档里。你可以对比「周三早高峰」和「周末手冲日」两种截然不同的忙乱现场，自己圈线索、改方案。所有反馈都由实时状态演出驱动，没有接联网 AI 打分——好坏不在分数里，而在店里人的反应里。</p>
              <div className="case-nums">
                <div><strong>4 座小岛</strong><span>步行相连的探索世界</span></div>
                <div><strong>2 种营业现场</strong><span>早高峰与周末手冲日对照</span></div>
                <div><strong>双线并存</strong><span>自由调查与主线共用存档</span></div>
              </div>
            </div>
          </article>

          {/* —— CASE 03：游荡集 —— */}
          <article className="case rv">
            <p className="case-kicker">Case 03 · 播客精读专题站</p>
            <h3 className="case-title">
              游荡集 · 把播客读成一本书
            </h3>
            <p className="case-purpose">
              有些播客里的长谈太绵密，耳机里听过一遍总觉得意犹未尽，很想能像翻书一样停下来细读。于是我把许知远《游荡集》里的声音整理成了安静的精读文章——你可以顺着游荡地图、人物书影音索引或是跨集线索慢慢翻阅，读到动心处，随时回到那一段原声。
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
              <a className="link-strong" href="https://youdang.heystone.site/" target="_blank" rel="noopener noreferrer">翻开《游荡集》开始阅读 ↗</a>
              <p>因喜欢而整理的个人非官方小站，挑一期顺眼的标题就能读进去。</p>
            </div>
          </article>

          {/* —— CASE 04：Research Edition —— */}
          <article className="case rv">
            <p className="case-kicker">Case 04 · 沉浸式 AI 深度阅读室</p>
            <h3 className="case-title">
              Research Edition · AI 产业长文与报告
            </h3>
            <p className="case-purpose">AI 圈每天都在刷屏碎片快讯，但真正帮人建立坐标系的好研究，往往藏在几十页长报告里。我把自己在读的投资与研究机构深度长文挑出来，覆盖产业史观、竞争格局与具身智能，配上梳理脉络的中文导读——去掉杂音，留给愿意静下心一次读完的人。</p>

            <figure className="plate site-preview">
              <div>
                <img className="shot-16x9" src={`${import.meta.env.BASE_URL}shots/research-edition.webp`} width="1280" height="720" alt="Research Edition 首页：AI 产业长文与报告" loading="lazy" />
              </div>
              <figcaption>从目录挑一篇，一次读完。</figcaption>
            </figure>
            <div className="case-entry">
              <a className="link-strong" href="https://read.heystone.site" target="_blank" rel="noopener noreferrer">走进阅读室，挑一篇长文 ↗</a>
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
            <p className="sec-lede">遇到生活里的小痒处，顺手给自己打的小工具和练手玩具。不用注册，点开就能试。</p>
          </div>

          <div className="exp-grid">
            {experiments.map((e, i) => (
              <article key={e.title} className="exp-card rv">
                <p className="exp-tag"><span className="exp-no">No.{String(i + 1).padStart(2, '0')}</span>{e.tag}</p>
                <h3>{e.title}</h3>
                <p className="exp-desc">{e.desc}</p>
                {e.note && <p className="exp-note">{e.note}</p>}
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
              <p className="post-meta">长文教程 · Obsidian × AI · 附起步包</p>
              <h3>用 Obsidian 打造你的第二大脑</h3>
              <p className="post-desc">
                读过的资料总像指缝里的沙子，收藏了也很少再翻开？这篇长文写了我自己正在用的笨办法：怎么从读完一篇文章开始，让 AI 帮忙攒出有出处、找得回、还能彼此长出关联的笔记。附上了真实图谱、完整提示词和拿走就能用的起步包。
              </p>
            </div>
            <img className="post-preview" src="/images/second-brain.webp" alt="我的 Obsidian 知识库真实关系图谱" width="1920" height="1080" loading="lazy" />
            <span className="post-arrow" aria-hidden="true">→</span>
          </a>
          <p className="writing-more rv">
            更多折腾心得、读书笔记和踩坑实录，都收在独立博客 <a href={blogUrl('')} target="_blank" rel="noopener noreferrer">stone ↗</a>
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
              <p className="about-intro">我是朱鑫垚，朋友们也叫我石头（Stone）。</p>
              <p>目前在北京外国语大学读国际商务。商科让我习惯去关心真实世界里人与人的协作，而 AI 恰好给了我一把趁手的刻刀——让我这样一个非科班出身的人，也能把脑子里一闪而过的念头，或是身边人遇到的具体麻烦，亲手敲打成能跑起来的作品。</p>
              <p>做这个小站，不是为了摆一份端着架子的作品集，更像是把书房的门虚掩着，留一盏灯。自己在屋里闷头做东西固然开心，但互联网最迷人的地方，还是能顺着这些散落的作品与文字，撞见遥远却同频的朋友——互相看看彼此最近在琢磨什么，交换一点各自的经验与好奇。</p>
            </div>
            <div className="contact contact-compact rv">
              <h3>写封信聊聊，或者顺路打个招呼。</h3>
              <p className="contact-lead-note">不用准备正式的自我介绍，如果你刚好遇到下面任何一件事，随时敲门：</p>
              <ul className="contact-prompts">
                <li>也在折腾 AI 工作流、知识库或小众业务工具，想找个人交流踩坑心得、互相切磋；</li>
                <li>最近读到一本后劲很长的书、听完一期舍不得关掉的播客，想分享给同样爱读爱听的人；</li>
                <li>点开了上面某个项目或小玩具，试出了有意思的玩法、发现了 bug，或者单纯想说句「嗨」。</li>
              </ul>
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
