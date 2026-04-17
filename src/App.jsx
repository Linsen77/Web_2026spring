import { useState, useMemo, useCallback } from 'react'
import Header from './components/Header'
import CourseList from './components/CourseList'
import Footer from './components/Footer'
import useLocalStorage from './hooks/useLocalStorage'
import useDebounce from './hooks/useDebounce'

// 初始数据
const initialCourses = [
  {
    id: 1,
    name: 'React入门',
    description: '学会React基础',
    category: '前端开发',
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    name: 'JavaScript进阶',
    description: '深入学习JS',
    category: '编程语言',
    createdAt: new Date().toISOString()
  },
  {
    id: 3,
    name: 'CSS布局',
    description: '掌握Flexbox和Grid',
    category: '前端开发',
    createdAt: new Date().toISOString()
  }
]

function App() {
  // 使用自定义 Hook 管理课程数据（自动持久化到 localStorage）
  const [courses, setCourses] = useLocalStorage('courses', initialCourses)
  
  // 搜索和筛选状态
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [editingCourse, setEditingCourse] = useState(null)
  
  // 使用 useDebounce 对搜索词进行防抖优化
  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  // 使用 useMemo 缓存分类列表
  const categories = useMemo(() => {
    return [...new Set(courses.map(course => course.category))]
  }, [courses])

  // 使用 useMemo 缓存统计信息
  const statistics = useMemo(() => {
    return {
      totalCount: courses.length,
      categoryCount: categories.length
    }
  }, [courses, categories])

  // 使用 useMemo 缓存筛选后的课程列表
  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      const matchesSearch = course.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      const matchesCategory = !categoryFilter || course.category === categoryFilter
      return matchesSearch && matchesCategory
    })
  }, [courses, debouncedSearchTerm, categoryFilter])

  // 使用 useCallback 优化事件处理函数
  const addCourse = useCallback((course) => {
    const newCourse = {
      ...course,
      id: Date.now(),
      createdAt: new Date().toISOString()
    }
    setCourses(prevCourses => [...prevCourses, newCourse])
  }, [setCourses])

  const deleteCourse = useCallback((id) => {
    if (window.confirm('确定要删除这门课程吗？')) {
      setCourses(prevCourses => prevCourses.filter(course => course.id !== id))
    }
  }, [setCourses])

  const updateCourse = useCallback((id, updatedData) => {
    setCourses(prevCourses => prevCourses.map(course => 
      course.id === id ? { ...course, ...updatedData } : course
    ))
    setEditingCourse(null)
  }, [setCourses])

  const handleStudy = useCallback((courseName) => {
    alert(`开始学习: ${courseName}`)
  }, [])

  const handleEdit = useCallback((course) => {
    setEditingCourse(course)
  }, [])

  const handleCancelEdit = useCallback(() => {
    setEditingCourse(null)
  }, [])

  return (
    <div className="app">
      <Header totalCount={statistics.totalCount} categoryCount={statistics.categoryCount} />
      
      <main className="main-content">
        <CourseList 
          courses={filteredCourses}
          onAdd={addCourse}
          onDelete={deleteCourse}
          onEdit={handleEdit}
          onStudy={handleStudy}
          onUpdate={updateCourse}
          searchTerm={searchTerm}
          onSearch={setSearchTerm}
          categoryFilter={categoryFilter}
          onFilter={setCategoryFilter}
          categories={categories}
          editingCourse={editingCourse}
          onCancelEdit={handleCancelEdit}
        />
      </main>
      
      <Footer />
    </div>
  )
}

export default App