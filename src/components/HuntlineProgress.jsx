// Public snapshot verified against the signed-in production system on 2026-10-29.
// Source: 系统日志 at agent.tsinghunter.cn: 89 entries, 55 features, 34 fixes.
// Sidebar inventory: 4,008 resumes, rounded down for public display. Not active users.
// Counts represent log entries, not unique features or releases; no live data connection.
const milestones = [
  ['2026-09-28', '录入与报告', '简历入库 · 标签 · 周报', '把简历入库、人才标签、推荐报告与周报接在一起，减少重复整理。'],
  ['2026-10-12', '客户与职位', '职位要求 · 推荐关联', '按职位查看推荐人选，补充岗位要求，保留每次推荐的关联。'],
  ['2026-10-19', '面试与跟进', '进度联动 · 报告编辑', '人才档案、客户和面试进度联动；历史推荐报告可以继续编辑。'],
  ['2026-10-27', '项目知识库', '资料检索 · 原文溯源', '汇集 PPT、PDF、标签与备注，回答附原文出处和页码。'],
]
const icons = [
  <><path d="M7 3h10l5 5v21H7z M17 3v6h5 M11 15h7 M11 20h7" /></>,
  <><rect x="3" y="10" width="26" height="19" rx="2" /><path d="M11 10V5h10v5 M3 18h26 M13 18v4h6v-4" /></>,
  <><path d="M5 6h22 M5 16h22 M5 26h22"/><circle cx="11" cy="6" r="3"/><circle cx="22" cy="16" r="3"/><circle cx="14" cy="26" r="3"/></>,
  <><path d="M3 5h10l3 3 3-3h10v22H19l-3 3-3-3H3z M16 8v22 M7 12h5 M20 12h5 M7 17h5 M20 17h5" /></>,
]
export default function HuntlineProgress() {
  return (
    <section className="hunt-progress" aria-labelledby="hunt-progress-title">
      <header className="hunt-progress-head">
        <h4 id="hunt-progress-title">从搭建，到真实业务</h4>
        <span className="hunt-status">已投入使用 · 持续迭代</span>
      </header>
      <div className="hunt-dashboard">
        <div className="hunt-volume"><span>已接入简历</span><strong>4,000<small>+ 份</small></strong></div>
        <div className="hunt-releases">
          <div className="hunt-release-total"><strong>89</strong><span>条更新记录</span></div>
          <div className="hunt-bar" role="img" aria-label="89 条更新：55 条新功能，34 条问题修复"><span /><span /></div>
          <div className="hunt-legend"><span>新功能 <b>55</b></span><span>问题修复 <b>34</b></span></div>
        </div>
      </div>
      <p className="hunt-source">截至 2026.10.29 · 人才库与系统日志快照 · 更新按条目计，非独立功能数</p>
      <div className="hunt-build">
        <h5>我从 0 到 1 做了什么</h5>
        <p className="hunt-ownership">需求梳理 → 产品设计 → 前后端开发 → 部署与维护</p>
        <ol className="hunt-roadmap">
          {milestones.map(([date, title, subtitle], i) => <li key={date}>
            <time dateTime={date}>{date.slice(5).replace('-', '.')}</time>
            <div className="hunt-node"><svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{icons[i]}</svg></div>
            <h6>{title}</h6><p>{subtitle}</p>
          </li>)}
        </ol>
      </div>
      <div className="hunt-latest">
        <h5>最近的打磨 <time dateTime="2026-10-29">10.29</time></h5>
        <ul><li>岗位要求自动带入</li><li>报告逐项核对原文</li><li>异常原因与处理建议</li></ul>
      </div>
      <details className="hunt-more">
        <summary>展开建设与更新细节</summary>
        <div className="hunt-detail-content">
          {milestones.map(([date,title,,detail]) => <p key={date}><strong>{date.slice(5).replace('-', '.')} · {title}</strong>{detail}</p>)}
          <p><strong>10.29 · 持续打磨</strong>选择客户职位后自动带入已保存的岗位要求；按简历原文校验经历，无法核对的内容标明待核验；区分超时、服务配置与原文校验问题，并给出处理建议。</p>
          <p>从业务需求梳理、产品与界面设计，到前后端实现、上线部署，再跟着顾问的使用反馈持续修改。</p>
        </div>
      </details>
    </section>
  )
}
