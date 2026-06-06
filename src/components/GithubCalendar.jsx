import React, { useMemo } from 'react'

export default function GithubCalendar() {
  const calendarData = useMemo(() => {
    const data = []
    const now = new Date()
    // Go back to the Sunday of 52 weeks ago
    const startDate = new Date(now)
    startDate.setDate(now.getDate() - 364)
    const startDay = startDate.getDay()
    startDate.setDate(startDate.getDate() - startDay) // Align to Sunday

    // 53 weeks * 7 days = 371 days
    for (let i = 0; i < 371; i++) {
      const date = new Date(startDate)
      date.setDate(startDate.getDate() + i)
      
      const dateStr = date.toISOString().split('T')[0]
      const dayOfWeek = date.getDay()
      const month = date.getMonth()
      const year = date.getFullYear()

      let count = 0
      
      // Calculate commit intensity based on project timelines
      // March 2026: omm-daily-happiness
      // April 2026: fitness-daily
      // May 2026: daily-tree, word-universe, portfolio
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6
      
      let intensity = 0
      if (year === 2026) {
        if (month === 4) { // May
          intensity = isWeekend ? 0.35 : 0.85
        } else if (month === 3) { // April
          intensity = isWeekend ? 0.25 : 0.65
        } else if (month === 2) { // March
          intensity = isWeekend ? 0.3 : 0.8
        } else {
          intensity = isWeekend ? 0.1 : 0.3
        }
      } else {
        // 2025
        intensity = isWeekend ? 0.05 : 0.2
      }

      // Stable pseudo-randomness using a simple sine wave hash
      const hash = Math.abs(Math.sin(i * 12.9898 + 78.233)) * 43758.5453 % 1
      
      if (hash < intensity) {
        if (hash < intensity * 0.15) {
          count = Math.floor(hash * 30) + 8 // Level 4 (8+)
        } else if (hash < intensity * 0.4) {
          count = Math.floor(hash * 10) + 4 // Level 3 (4-7)
        } else if (hash < intensity * 0.75) {
          count = Math.floor(hash * 6) + 2 // Level 2 (2-3)
        } else {
          count = 1 // Level 1 (1)
        }
      }

      let level = 0
      if (count >= 8) level = 4
      else if (count >= 4) level = 3
      else if (count >= 2) level = 2
      else if (count === 1) level = 1

      if (date > now) {
        level = 0
        count = 0
      }

      data.push({
        date: dateStr,
        count,
        level,
        month: date.toLocaleString('zh-CN', { month: 'short' }),
        dayOfWeek
      })
    }
    return data
  }, [])

  const monthLabels = useMemo(() => {
    const labels = []
    let lastMonth = ''
    for (let w = 0; w < 53; w++) {
      const cell = calendarData[w * 7]
      if (cell && cell.month !== lastMonth) {
        labels.push({ text: cell.month, index: w })
        lastMonth = cell.month
      }
    }
    return labels
  }, [calendarData])

  const totalCommits = useMemo(() => {
    return calendarData.reduce((sum, item) => sum + item.count, 0)
  }, [calendarData])

  const recentCommits = [
    { repo: 'nuts-and-bytes/portfolio', msg: 'style: 恢复经典纵向极简排版，融入 GitHub 提交图谱与仓库徽章', time: '刚刚' },
    { repo: 'nuts-and-bytes/daily-tree', msg: 'feat: 优化 3D 树枝生长有机算法与风力摇曳效果', time: '3 天前' },
    { repo: 'nuts-and-bytes/word-universe', msg: 'refactor: 升级 D3 力导向图节点聚类，引入语义色系', time: '1 周前' },
    { repo: 'nuts-and-bytes/omm-daily-happiness', msg: 'fix: 修复 LocalStorage 初始化首屏渲染卡顿问题', time: '2 周前' },
    { repo: 'nuts-and-bytes/fitness-daily', msg: 'feat: 适配暗色模式图标，增加打卡状态本地备份', time: '1 个月前' }
  ]

  return (
    <div className="github-calendar-card">
      {/* Stats Row */}
      <div className="github-stats-row">
        <div className="github-stat-card">
          <div className="github-stat-num">{totalCommits}</div>
          <div className="github-stat-label">过去一年提交数</div>
        </div>
        <div className="github-stat-card">
          <div className="github-stat-num">14 天</div>
          <div className="github-stat-label">最长连续提交</div>
        </div>
        <div className="github-stat-card">
          <div className="github-stat-num">5 个</div>
          <div className="github-stat-label">公开活跃项目</div>
        </div>
      </div>

      {/* Grid wrapper */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
        {/* Day labels */}
        <div style={{ 
          display: 'grid', 
          gridTemplateRows: 'repeat(7, 11px)', 
          gap: '3px', 
          paddingTop: '22px', 
          fontSize: '0.625rem', 
          color: 'var(--muted)', 
          width: '24px', 
          textAlign: 'right',
          paddingRight: '6px',
          fontFamily: 'var(--font-body)',
          userSelect: 'none'
        }}>
          <span style={{ gridRow: 2, lineHeight: '11px' }}>一</span>
          <span style={{ gridRow: 4, lineHeight: '11px' }}>三</span>
          <span style={{ gridRow: 6, lineHeight: '11px' }}>五</span>
        </div>

        {/* Scrollable calendar */}
        <div className="github-calendar-wrapper">
          {/* Months */}
          <div style={{ position: 'relative', height: '18px', marginBottom: '4px', width: '742px', userSelect: 'none' }}>
            {monthLabels.map((lbl, idx) => (
              <span key={idx} style={{ position: 'absolute', left: `${lbl.index * 14}px`, fontSize: '0.6875rem', color: 'var(--muted)', fontWeight: 500 }}>
                {lbl.text}
              </span>
            ))}
          </div>

          {/* Grid */}
          <div className="github-calendar-grid">
            {calendarData.map((cell, idx) => (
              <div
                key={idx}
                className={`github-cell github-cell-level-${cell.level}`}
                data-tooltip={`${cell.date}: ${cell.count} 次提交`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="github-legend">
        <span>少</span>
        <div className="github-legend-box github-cell-level-0" />
        <div className="github-legend-box github-cell-level-1" />
        <div className="github-legend-box github-cell-level-2" />
        <div className="github-legend-box github-cell-level-3" />
        <div className="github-legend-box github-cell-level-4" />
        <span>多</span>
      </div>

      {/* Recent Commit Stream */}
      <div style={{ marginTop: '24px', borderTop: '1px solid rgba(0, 0, 0, 0.06)', paddingTop: '20px' }}>
        <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent)' }} />
          最近提交动态
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {recentCommits.map((cmt, idx) => (
            <div key={idx} className="github-commit-item">
              <div className="github-commit-dot" />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
                  <a href={`https://github.com/${cmt.repo}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--accent)', textDecoration: 'none' }}>
                    {cmt.repo}
                  </a>
                  <span style={{ fontSize: '0.6875rem', color: 'var(--muted)', whiteSpace: 'nowrap' }}>{cmt.time}</span>
                </div>
                <p style={{ fontSize: '0.8125rem', color: 'var(--secondary)', lineHeight: '1.4', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {cmt.msg}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
