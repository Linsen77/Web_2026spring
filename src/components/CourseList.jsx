import { useState, useRef, useEffect, useCallback } from 'react'
import CourseCard from './CourseCard'

function CourseList({ 
  courses, 
  onAdd, 
  onDelete, 
  onEdit, 
  onStudy,
  onUpdate,
  searchTerm, 
  onSearch, 
  categoryFilter, 
  onFilter, 
  categories,
  editingCourse,
  onCancelEdit
}) {
  // 新增表单状态
  const [newCourse, setNewCourse] = useState({
    name: '',
    description: '',
    category: ''
  })
  
  // 编辑表单状态
  const [editForm, setEditForm] = useState({
    name: '',
    description: '',
    category: ''
  })
  
  // 表单错误状态
  const [error, setError] = useState('')
  
  // 使用 useRef 创建输入框引用
  const nameInputRef = useRef(null)
  
  // 初始化编辑表单
  const initEditForm = useCallback((course) => {
    setEditForm({
      name: course.name,
      description: course.description,
      category: course.category
    })
  }, [])
  
  // 监听editingCourse变化
  if (editingCourse && !editForm.name) {
    initEditForm(editingCourse)
  }
  
  // 使用 useEffect 实现添加课程后输入框自动聚焦
  useEffect(() => {
    if (nameInputRef.current && !newCourse.name) {
      nameInputRef.current.focus()
    }
  }, [newCourse.name])
  
  // 使用 useCallback 优化事件处理函数
  const handleAddSubmit = useCallback((e) => {
    e.preventDefault()
    
    // 输入校验：课程名称不能为空
    if (!newCourse.name.trim()) {
      setError('课程名称不能为空')
      return
    }
    
    // 添加课程
    onAdd(newCourse)
    
    // 重置表单并自动聚焦
    setNewCourse({ name: '', description: '', category: '' })
    setError('')
    
    // 延迟聚焦，确保表单已重置
    setTimeout(() => {
      if (nameInputRef.current) {
        nameInputRef.current.focus()
      }
    }, 0)
  }, [newCourse, onAdd])
  
  const handleEditSubmit = useCallback((e) => {
    e.preventDefault()
    
    // 输入校验：课程名称不能为空
    if (!editForm.name.trim()) {
      setError('课程名称不能为空')
      return
    }
    
    // 更新课程
    onUpdate(editingCourse.id, editForm)
    
    // 重置表单
    setEditForm({ name: '', description: '', category: '' })
    setError('')
  }, [editForm, editingCourse, onUpdate])
  
  const handleInputChange = useCallback((e, form, setForm, setError) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
    if (error) setError('')
  }, [error])
  
  return (
    <div className="course-list-container">
      {/* 搜索和筛选区域 */}
      <div className="search-filter-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="搜索课程名称..."
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="filter-box">
          <select
            value={categoryFilter}
            onChange={(e) => onFilter(e.target.value)}
            className="filter-select"
          >
            <option value="">全部分类</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>
      
      {/* 新增课程表单 */}
      <div className="add-form-section">
        <h3>新增课程</h3>
        <form onSubmit={handleAddSubmit} className="course-form">
          <div className="form-group">
            <input
              ref={nameInputRef}
              type="text"
              name="name"
              placeholder="课程名称 *"
              value={newCourse.name}
              onChange={(e) => handleInputChange(e, newCourse, setNewCourse, setError)}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="description"
              placeholder="课程简介"
              value={newCourse.description}
              onChange={(e) => handleInputChange(e, newCourse, setNewCourse, setError)}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="category"
              placeholder="课程分类"
              value={newCourse.category}
              onChange={(e) => handleInputChange(e, newCourse, setNewCourse, setError)}
              className="form-input"
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="btn btn-add">添加课程</button>
        </form>
      </div>
      
      {/* 编辑课程表单 */}
      {editingCourse && (
        <div className="edit-form-section">
          <h3>编辑课程</h3>
          <form onSubmit={handleEditSubmit} className="course-form">
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="课程名称 *"
                value={editForm.name}
                onChange={(e) => handleInputChange(e, editForm, setEditForm, setError)}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="description"
                placeholder="课程简介"
                value={editForm.description}
                onChange={(e) => handleInputChange(e, editForm, setEditForm, setError)}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="category"
                placeholder="课程分类"
                value={editForm.category}
                onChange={(e) => handleInputChange(e, editForm, setEditForm, setError)}
                className="form-input"
              />
            </div>
            {error && <p className="error-message">{error}</p>}
            <div className="edit-form-buttons">
              <button type="submit" className="btn btn-save">保存修改</button>
              <button type="button" className="btn btn-cancel" onClick={onCancelEdit}>取消</button>
            </div>
          </form>
        </div>
      )}
      
      {/* 课程列表展示 */}
      <div className="courses-section">
        <h3>课程列表 ({courses.length})</h3>
        {courses.length === 0 ? (
          <p className="no-courses">暂无课程，请添加课程</p>
        ) : (
          <div className="courses-grid">
            {courses.map(course => (
              <CourseCard
                key={course.id}
                course={course}
                onDelete={onDelete}
                onEdit={onEdit}
                onStudy={onStudy}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default CourseList