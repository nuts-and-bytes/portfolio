// Production snapshot verified 2026-10-29: 89 logs (55 feature / 34 fix), 4,008 resumes.
// Natural-week log counts, oldest first. These are log entries, not releases or unique requirements.
const weeks = [ ['09.14',3], ['09.21',2], ['09.28',24], ['10.05',10], ['10.12',8], ['10.19',19], ['10.26',23] ]
export default function HuntlineProgress() {
  return (
    <section className="hunt-progress" aria-label="猎光累计数据">
      <header className="hunt-progress-head"><h4>已在真实业务里每天运转</h4><p className="hunt-status">从 0 到 1 搭起来，跟着一线使用反馈一点点长成现在的样子</p></header>
      <dl className="hunt-totals">
        <div><dt>累计迭代</dt><dd>89<small> 条</small></dd></div>
        <div><dt>新添功能</dt><dd>55<small> 条</small></dd></div>
        <div><dt>修补细节</dt><dd>34<small> 条</small></dd></div>
      </dl>
      <div className="hunt-chart-layout">
        <figure className="hunt-weekly">
          <figcaption>每周打磨记录<span>条 / 周</span></figcaption>
          <div className="hunt-columns" role="img" aria-label="各周更新记录：9月14日当周3条，9月21日2条，9月28日24条，10月5日10条，10月12日8条，10月19日19条，10月26日截至29日23条。">
            {weeks.map(([date,count]) => <div key={date} className="hunt-column"><div className="hunt-column-track"><span style={{height:`${count / 24 * 100}%`}}><b>{count}</b></span></div><time><span className="hunt-md">{date.slice(0,2)}</span><span className="hunt-sep">.</span><span className="hunt-day">{date.slice(3)}</span></time></div>)}
          </div>
        </figure>
        <div className="hunt-inventory"><span>人才库已收录</span><strong>4,000<small>+</small></strong><span>份简历</span></div>
      </div>
      <p className="hunt-source">注：定格于 2026.10.29 的真实业务快照（按系统更新日志计，末周尚未走完，非实时滚动数字）。</p>
    </section>
  )
}
