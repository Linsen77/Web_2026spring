function CourseCard({ course, onDelete, onEdit, onStudy }) {
  return (
    <div className="course-card">
      <div className="course-header">
        <h3 className="course-name">{course.name}</h3>
        <span className="course-category">{course.category}</span>
      </div>
      <p className="course-description">{course.description}</p>
      <div className="course-actions">
        <button 
          className="btn btn-study"
          onClick={() => onStudy(course.name)}
        >
          学习
        </button>
        <button 
          className="btn btn-edit"
          onClick={() => onEdit(course)}
        >
          编辑
        </button>
        <button 
          className="btn btn-delete"
          onClick={() => onDelete(course.id)}
        >
          删除
        </button>
      </div>
    </div>
  )
}

export default CourseCard