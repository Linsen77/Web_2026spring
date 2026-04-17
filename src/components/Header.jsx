function Header({ totalCount, categoryCount }) {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="header-title">课程管理中心</h1>
        <div className="header-stats">
          <div className="stat-item">
            <span className="stat-label">课程总数</span>
            <span className="stat-value">{totalCount}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">分类数量</span>
            <span className="stat-value">{categoryCount}</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header