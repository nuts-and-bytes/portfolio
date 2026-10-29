// Public snapshot verified against the signed-in production system on 2026-10-29.
// Source: 系统日志 at agent.tsinghunter.cn: 89 entries, 55 features, 34 fixes.
// Sidebar inventory: 4,008 resumes, rounded down for public display. Not active users.
// Counts represent log entries, not unique features or releases; no live data connection.
const milestones = [
  ['2026-09-28', '录入一次，串起后续工作', '把简历入库、人才标签、推荐报告与周报接在一起，减少重复整理。'],
  ['2026-10-12', '让客户、职位和人选对应起来', '按职位查看推荐人选，补充岗位要求，保留每次推荐的关联。'],
  ['2026-10-19', '把面试跟进接进系统', '人才档案、客户和面试进度联动；历史推荐报告可以继续编辑。'],
  ['2026-10-27', '把项目材料变成可查询的资料', '汇集 PPT、PDF、标签与备注，回答附原文出处和页码。'],
]

export default function HuntlineProgress() {
  return (
    <section className="hunt-progress" aria-labelledby="hunt-progress-title">
      <header className="hunt-progress-head">
        <h4 id="hunt-progress-title">从搭建，到在真实业务中打磨</h4>
        <span className="hunt-status">已投入使用 · 持续迭代</span>
      </header>
      <dl className="hunt-facts">
        <div><dt>已接入简历</dt><dd>4,000<span>+ 份</span></dd></div>
        <div><dt>系统更新记录</dt><dd>89<span> 条</span></dd></div>
        <div><dt>新功能 / 问题修复</dt><dd>55<span> / </span>34<span> 条</span></dd></div>
      </dl>
      <p className="hunt-source">截至 2026.10.29 · 据系统人才库与更新日志整理；更新数按日志条目计，非独立功能数。数据为当日快照，非实时统计。</p>
      <div className="hunt-story">
        <div>
          <h5>我从 0 到 1 做了什么</h5>
          <p className="hunt-ownership">从业务需求梳理、产品与界面设计，到前后端实现、上线部署，再跟着顾问的使用反馈持续修改。</p>
          <ol className="hunt-timeline">
            {milestones.map(([date, title, detail]) => (
              <li key={date}>
                <time dateTime={date}>{date.slice(5).replace('-', '.')}</time>
                <div><h6>{title}</h6><p>{detail}</p></div>
              </li>
            ))}
          </ol>
        </div>
        <aside className="hunt-current" aria-labelledby="hunt-current-title">
          <h5 id="hunt-current-title">最近还在打磨</h5>
          <p className="hunt-update-date">2026.10.29 更新摘录</p>
          <ul>
            <li><strong>少填一次资料</strong><p>选中客户职位后，自动带入已保存的岗位要求。</p></li>
            <li><strong>报告有依据，也能核对</strong><p>按简历原文校验经历，无法核对的内容标明待核验。</p></li>
            <li><strong>把失败原因说清楚</strong><p>区分超时、服务配置与原文校验问题，给出下一步处理建议。</p></li>
          </ul>
          <p className="hunt-note">这些修改来自实际工作中的问题。做出功能之后，还要让它稳定、可信、顺手。</p>
        </aside>
      </div>
    </section>
  )
}
