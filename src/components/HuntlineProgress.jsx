// Production snapshot verified 2026-10-29: 89 logs (55 feature / 34 fix), 4,008 resumes.
// Natural-week log counts, oldest first. These are log entries, not releases or unique requirements.
const weeks = [ ['09.14',3], ['09.21',2], ['09.28',24], ['10.05',10], ['10.12',8], ['10.19',19], ['10.26',23] ]
export default function HuntlineProgress() {
  return (
    <section className="hunt-progress" aria-label="猎光累计数据">
      <header className="hunt-progress-head"><h4>从 0 到 1，持续迭代中</h4><span className="hunt-status">已投入真实业务使用</span></header>
      <dl className="hunt-totals">
        <div><dt>累计更新</dt><dd>89<small> 条</small></dd></div>
        <div><dt>功能新增记录</dt><dd>55<small> 条</small></dd></div>
        <div><dt>问题修复记录</dt><dd>34<small> 条</small></dd></div>
      </dl>
      <div className="hunt-chart-layout">
        <figure className="hunt-weekly">
          <figcaption>每周迭代记录<span>条 / 周</span></figcaption>
          <div className="hunt-columns" role="img" aria-label="各周更新记录：9月14日当周3条，9月21日2条，9月28日24条，10月5日10条，10月12日8条，10月19日19条，10月26日截至29日23条。">
            {weeks.map(([date,count]) => <div key={date} className="hunt-column"><div className="hunt-column-track"><span style={{height:`${count / 24 * 100}%`}}><b>{count}</b></span></div><time>{date}</time></div>)}
          </div>
        </figure>
        <div className="hunt-inventory"><span>已接入人才库</span><strong>4,000<small>+</small></strong><span>份简历</span></div>
      </div>
      <p className="hunt-source">截至 2026.10.29 · 更新与功能按系统日志条目计；末周未结束，非实时统计。</p>
    </section>
  )
}
