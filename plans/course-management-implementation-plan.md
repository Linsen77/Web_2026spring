# 课程管理页面实施计划

## 项目概述
- **项目名称**：课程管理页面
- **项目类型**：React Web应用（Vite + React）
- **核心功能**：管理课程信息，支持增删改查、搜索筛选等操作

---

## 实施步骤

### 步骤1：创建项目目录结构
```
project/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── CourseList.jsx
│   │   ├── CourseCard.jsx
│   │   └── Footer.jsx
│   ├── App.jsx
│   ├── App.css
│   └── index.jsx
├── package.json
└── vite.config.js
```

### 步骤2：初始化Vite + React项目
- 创建 `package.json` 文件
- 创建 `vite.config.js` 配置文件
- 安装依赖：`npm install`

### 步骤3：实现App组件
**文件**：`src/App.jsx`

**状态管理 (useState)**：
- `courses` - 课程数组，从localStorage初始化
- `searchTerm` - 搜索关键词
- `categoryFilter` - 分类筛选
- `editingCourse` - 当前编辑的课程

**方法实现**：
- `addCourse(course)` - 新增课程，生成唯一ID
- `deleteCourse(id)` - 删除课程
- `updateCourse(id, data)` - 更新课程
- `handleSearch(term)` - 更新搜索关键词
- `handleFilter(category)` - 更新分类筛选

**数据持久化**：
- 初始化时从localStorage读取
- 使用useEffect监听数据变化并保存

### 步骤4：实现Header组件
**文件**：`src/components/Header.jsx`

**Props**：
- `totalCount` - 课程总数
- `categoryCount` - 分类数量

**渲染内容**：
- 主标题"课程管理中心"
- 课程总数统计
- 分类数量统计

### 步骤5：实现CourseList组件
**文件**：`src/components/CourseList.jsx`

**Props**：
- `courses` - 课程数组
- `onAdd` - 新增回调
- `onDelete` - 删除回调
- `onEdit` - 编辑回调
- `onStudy` - 学习回调
- `searchTerm` / `onSearch`
- `categoryFilter` / `onFilter`
- `categories` - 分类数组
- `editingCourse` - 当前编辑课程
- `onUpdate` - 更新回调

**渲染内容**：
- 搜索输入框
- 分类下拉筛选
- 新增课程表单
- 编辑课程表单（条件渲染）
- 课程卡片列表

### 步骤6：实现CourseCard组件
**文件**：`src/components/CourseCard.jsx`

**Props**：
- `course` - 课程对象
- `onDelete` - 删除回调
- `onEdit` - 编辑回调
- `onStudy` - 学习回调

**渲染内容**：
- 课程名称
- 课程简介
- 课程分类标签
- 操作按钮（学习、编辑、删除）

### 步骤7：实现Footer组件
**文件**：`src/components/Footer.jsx`

**渲染内容**：
- 版权信息
- 页面说明文字

### 步骤8：添加样式
**文件**：`src/App.css`

**样式规范**：
- 整体风格：彩色渐变背景
- 主渐变：#667eea → #764ba2
- 卡片背景：#ffffff
- 文字颜色：#333333 / #666666
- 按钮颜色：成功#10b981，危险#ef4444，警告#f59e0b
- 布局：最大宽度1200px，响应式网格1-3列
- 间距：16px基础间距
- 圆角：8px
- 阴影效果

### 步骤9：测试和验证
- 验证新增课程功能
- 验证删除课程功能
- 验证编辑课程功能
- 验证搜索功能
- 验证分类筛选功能
- 验证数据持久化（localStorage）
- 验证响应式布局

---

## 数据结构

```javascript
{
  id: number,           // 唯一标识
  name: string,         // 课程名称（必填）
  description: string,  // 课程简介（可选）
  category: string,     // 课程分类
  createdAt: string     // 创建时间（ISO格式）
}
```

---

## 初始数据

| 课程名称 | 分类 | 简介 |
|---------|------|------|
| React入门 | 前端开发 | 学会React基础 |
| JavaScript进阶 | 编程语言 | 深入学习JS |
| CSS布局 | 前端开发 | 掌握Flexbox和Grid |

---

## 技术栈
- React 函数组件
- JSX 语法
- useState 状态管理
- useEffect 副作用
- props 组件通信
- localStorage 数据持久化
- CSS 基础样式