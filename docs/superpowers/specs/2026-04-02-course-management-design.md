# 课程管理页面设计规范

## 1. 项目概述

- **项目名称**：课程管理页面
- **项目类型**：React Web应用
- **核心功能**：管理课程信息，支持增删改查、搜索筛选等操作
- **目标用户**：需要管理课程信息的用户

## 2. 技术栈

- React 函数组件
- JSX 语法
- useState 状态管理
- props 组件通信
- 事件绑定
- map 列表渲染
- CSS 基础样式
- localStorage 数据持久化

## 3. 项目结构

```
project/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Header.jsx        # 页面头部组件
│   │   ├── CourseList.jsx    # 课程列表组件
│   │   ├── CourseCard.jsx    # 课程卡片组件
│   │   └── Footer.jsx        # 页面底部组件
│   ├── App.jsx               # 主应用组件
│   ├── App.css               # 全局样式
│   └── index.jsx             # 入口文件
├── package.json
└── vite.config.js
```

## 4. 组件设计

### 4.1 App 组件

**职责**：状态管理中心，管理课程列表数据

**状态 (useState)**：
- `courses` - 课程数组，初始化从localStorage读取
- `searchTerm` - 搜索关键词字符串
- `categoryFilter` - 分类筛选字符串
- `editingCourse` - 当前编辑的课程对象，null表示新增模式

**方法**：
- `addCourse(course)` - 新增课程，生成唯一ID，保存到localStorage
- `deleteCourse(id)` - 删除课程，更新localStorage
- `updateCourse(id, data)` - 更新课程信息，更新localStorage
- `handleSearch(term)` - 更新搜索关键词
- `handleFilter(category)` - 更新分类筛选

**数据持久化**：
- 初始化时从localStorage读取courses数据
- 每次数据变化时保存到localStorage

### 4.2 Header 组件

**职责**：显示页面标题和统计信息

**Props**：
- `totalCount` - 课程总数（number）
- `categoryCount` - 分类数量（number）

**渲染内容**：
- 页面主标题"课程管理中心"
- 课程总数统计
- 分类数量统计

### 4.3 CourseList 组件

**职责**：渲染课程列表、搜索框、筛选功能和新增/编辑表单

**Props**：
- `courses` - 课程数组
- `onAdd` - 新增课程回调函数
- `onDelete` - 删除课程回调函数
- `onEdit` - 编辑课程回调函数
- `onStudy` - 学习按钮回调函数
- `searchTerm` - 搜索关键词
- `onSearch` - 搜索处理函数
- `categoryFilter` - 分类筛选
- `onFilter` - 筛选处理函数
- `categories` - 所有分类数组
- `editingCourse` - 当前编辑的课程
- `onUpdate` - 更新课程函数

**渲染内容**：
- 搜索输入框
- 分类下拉筛选
- 新增课程表单（课程名称、简介、分类）
- 编辑课程表单（当editingCourse不为null时显示）
- 课程卡片列表

### 4.4 CourseCard 组件

**职责**：展示单个课程信息

**Props**：
- `course` - 课程对象
- `onDelete` - 删除回调函数
- `onEdit` - 编辑回调函数
- `onStudy` - 学习按钮回调函数

**渲染内容**：
- 课程名称（标题）
- 课程简介（描述）
- 课程分类（标签）
- 操作按钮：学习、编辑、删除

### 4.5 Footer 组件

**职责**：显示页面底部说明信息

**渲染内容**：
- 版权信息
- 页面说明文字

## 5. 数据结构

```javascript
// 课程对象结构
{
  id: number,           // 唯一标识，自增生成
  name: string,         // 课程名称，必填
  description: string,  // 课程简介，可选
  category: string,     // 课程分类，用户输入
  createdAt: string     // 创建时间，ISO格式时间戳
}
```

## 6. 功能设计

| 功能 | 描述 | 实现方式 |
|------|------|----------|
| 显示课程列表 | 使用map渲染所有课程 | `courses.map(course => <CourseCard ... />)` |
| 新增课程 | 表单输入，名称必填校验 | 表单+onSubmit事件，校验name非空 |
| 删除课程 | 点击删除按钮，确认后删除 | onDelete事件，确认对话框 |
| 编辑课程 | 点击编辑按钮，弹出表单修改 | editingCourse状态控制编辑模式 |
| 搜索功能 | 按课程名称模糊搜索 | filter + includes |
| 分类筛选 | 按分类筛选课程 | filter + 精确匹配 |
| 数量统计 | 显示总课程数和分类数 | 计算courses.length和唯一分类数 |
| 学习按钮 | 点击显示"开始学习"提示 | alert或console.log |

## 7. 输入校验

- **课程名称**：必填，不能为空字符串
- **校验提示**：名称为空时显示错误提示，阻止提交

## 8. 样式设计

### 8.1 整体风格
- 彩色渐变背景，丰富色彩，活泼氛围

### 8.2 色彩方案
- **主渐变**：#667eea → #764ba2（紫蓝色渐变）
- **卡片背景**：#ffffff（白色）
- **文字颜色**：#333333（深灰）
- **次要文字**：#666666（中灰）
- **成功按钮**：#10b981（绿色）
- **危险按钮**：#ef4444（红色）
- **警告按钮**：#f59e0b（橙色）

### 8.3 布局
- 页面最大宽度：1200px，居中显示
- 卡片网格布局：响应式，1-3列
- 间距：16px基础间距

### 8.4 组件样式
- **Header**：渐变背景，白色文字
- **CourseCard**：白色背景，圆角8px，阴影效果
- **按钮**：渐变背景，圆角，悬停效果
- **输入框**：边框样式，聚焦高亮

## 9. 数据流

```
用户操作
    ↓
App状态变化（setCourses/setSearchTerm/setCategoryFilter）
    ↓
props传递到子组件
    ↓
子组件渲染更新
    ↓
localStorage持久化（useEffect监听）
```

## 10. 初始数据

项目初始化时，提供3个示例课程：
1. React入门 - 前端开发 - 学会React基础
2. JavaScript进阶 - 编程语言 - 深入学习JS
3. CSS布局 - 前端开发 - 掌握Flexbox和Grid