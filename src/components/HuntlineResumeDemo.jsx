import { useState } from 'react'

// 纯虚构示例材料，用于让访客直观感受「录入简历 → 检索人选 → 生成报告」的整理效果，不含真实候选人或业务数据。
const RESUME_SEGMENTS = [
  { id: 'intro', text: '林屿，产品经理，' },
  { id: 'exp', text: '5 年消费硬件与软件协同经验' },
  { id: 'sep1', text: '，' },
  { id: 'city', text: '现居北京，可看新机会。' },
  { id: 'proj', text: '2023–2025 在青松智能负责家用咖啡机配套 App ' },
  { id: 'zero2one', text: '从 0 到 1 上线' },
  { id: 'sep2', text: '，' },
  { id: 'team', text: '带 4 人小组跑通设备配网与售后工单' },
  { id: 'sep3', text: '，' },
  { id: 'metric', text: '上线半年把客服重复咨询压降三成。' },
  { id: 'prev', text: '此前在轻舟科技参与会员积分改版与门店导购小工具，' },
  { id: 'habit', text: '习惯直接去一线听用户反馈再改细节。' },
]

const VIEWS = [
  {
    id: 'projects',
    step: '①',
    label: '做过什么项目',
    shortLabel: '做过什么项目',
    highlights: ['proj', 'zero2one', 'sep2', 'team', 'sep3', 'metric'],
    outLabel: '工作台提炼 · 项目摘要',
    outStatus: '已定位原句',
    summary: '主导家用咖啡机配套 App 从 0 到 1 落地，带 4 人小队打通配网与售后流程，上线半年明显减少客服重复咨询。',
    chips: ['角色：从 0 到 1 负责人', '团队：带 4 人小组', '结果：重复咨询降三成'],
    foot: '顾问录进简历后不用反复划重点，先看清核心经历，把时间留给「看人」与沟通。',
  },
  {
    id: 'search',
    step: '②',
    label: '为什么能被搜到',
    shortLabel: '怎么被搜到',
    highlights: ['exp', 'city', 'zero2one', 'team'],
    outLabel: '工作台提炼 · 检索线索',
    outStatus: '已标出 4 处线索',
    summary: '简历里的行业、年限、城市与带队经历会被拆成清晰的检索线索；下次接同类岗位，在 4,000+ 份人才库里很快就能捞出人选。',
    chips: ['# 消费硬件', '# 5 年 · 从 0 到 1', '# 带 4 人小组', '# 北京 · 可看机会'],
    foot: '不再靠记忆翻文件夹或聊天记录，接新岗位时几秒就能圈出合适人选。',
  },
  {
    id: 'pitch',
    step: '③',
    label: '整理成推荐语',
    shortLabel: '推荐语',
    highlights: ['exp', 'metric', 'habit'],
    outLabel: '工作台提炼 · 推荐报告草稿',
    outStatus: '可直接微调发出',
    summary: '林屿有 5 年软硬协同产品经验，习惯从一线反馈出发把细节做实——上一份工作带队落地咖啡机 App，上线半年将客服重复咨询压降三成，适合重落地的消费硬件团队。',
    chips: ['亮点：软硬协同落地', '佐证：重复咨询降三成', '风格：贴近一线反馈'],
    foot: '顺着原句直接整理出推荐草稿，告别对着空白文档从头动笔，顾问微调后即可发给客户。',
  },
]

export default function HuntlineResumeDemo() {
  const [activeId, setActiveId] = useState(VIEWS[0].id)
  const activeIndex = VIEWS.findIndex((v) => v.id === activeId)
  const current = VIEWS[activeIndex] ?? VIEWS[0]
  const highlightSet = new Set(current.highlights)

  // 相邻的高亮片段合并为同一段 <mark>，避免高亮原句中间出现断缝
  const mergedRuns = []
  for (const seg of RESUME_SEGMENTS) {
    const highlighted = highlightSet.has(seg.id)
    const prev = mergedRuns[mergedRuns.length - 1]
    if (prev && prev.highlighted === highlighted) {
      prev.text += seg.text
    } else {
      mergedRuns.push({ key: seg.id, highlighted, text: seg.text })
    }
  }

  const handleKeyDown = (e, idx) => {
    let nextIdx = null
    if (e.key === 'ArrowRight') nextIdx = (idx + 1) % VIEWS.length
    else if (e.key === 'ArrowLeft') nextIdx = (idx - 1 + VIEWS.length) % VIEWS.length
    else if (e.key === 'Home') nextIdx = 0
    else if (e.key === 'End') nextIdx = VIEWS.length - 1
    if (nextIdx !== null) {
      e.preventDefault()
      const nextView = VIEWS[nextIdx]
      setActiveId(nextView.id)
      document.getElementById(`hunt-tab-${nextView.id}`)?.focus()
    }
  }

  return (
    <section className="hunt-demo" id="huntline-demo" aria-labelledby="hunt-demo-title">
      <header className="hunt-demo-head">
        <div className="hunt-demo-title-wrap">
          <h4 id="hunt-demo-title">试一下：把一段密密麻麻的简历，拆成顾问一眼能用的信息</h4>
          <p className="hunt-demo-sub">点下面任意标签，看简历里哪句原话亮起来，以及工作台会整理出什么。</p>
        </div>
        <span className="hunt-demo-badge">虚构示例 · 仅供体验</span>
      </header>

      <div className="hunt-demo-tabs" role="tablist" aria-label="切换阅读简历的视角">
        {VIEWS.map((view, idx) => {
          const selected = view.id === current.id
          return (
            <button
              key={view.id}
              id={`hunt-tab-${view.id}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls="hunt-demo-panel"
              tabIndex={selected ? 0 : -1}
              className={`hunt-demo-tab${selected ? ' is-active' : ''}`}
              onClick={() => setActiveId(view.id)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
            >
              <span className="hunt-demo-step" aria-hidden="true">{view.step}</span>
              <span>{view.label}</span>
            </button>
          )
        })}
      </div>

      <div
        id="hunt-demo-panel"
        className="hunt-demo-grid"
        role="tabpanel"
        aria-labelledby={`hunt-tab-${current.id}`}
      >
        <div className="hunt-demo-pane hunt-demo-source">
          <div className="hunt-demo-pane-label">
            <span>原始简历节选（虚构人物：林屿）</span>
            <span>未整理的长段落</span>
          </div>
          <p className="hunt-demo-resume">
            {mergedRuns.map((run) =>
              run.highlighted ? (
                <mark key={run.key} className="hunt-demo-hl">{run.text}</mark>
              ) : (
                <span key={run.key}>{run.text}</span>
              )
            )}
          </p>
        </div>

        <div className="hunt-demo-pane hunt-demo-output" aria-live="polite">
          <div className="hunt-demo-pane-label">
            <span>{current.outLabel}</span>
            <span>{current.outStatus}</span>
          </div>
          <p key={current.id} className="hunt-demo-summary">{current.summary}</p>
          <ul className="hunt-demo-chips" aria-label="提炼要点">
            {current.chips.map((chip) => (
              <li key={chip}>{chip}</li>
            ))}
          </ul>
          <p className="hunt-demo-foot">{current.foot}</p>
        </div>
      </div>
    </section>
  )
}
