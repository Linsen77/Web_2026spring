# 项目记忆

## 项目概述

**项目名称**：课程管理系统（Course Management System）  
**技术栈**：React 18 + Vite + CSS  
**项目路径**：`c:\Users\33132\Desktop\Web程序设计\project5\project`

## 核心功能

### 基础功能
- ✅ 显示课程列表（网格布局，响应式设计）
- ✅ 显示课程名称和课程简介
- ✅ 新增课程（表单验证，自动聚焦）
- ✅ 删除课程（确认提示）
- ✅ 编辑课程（条件渲染编辑表单）
- ✅ 学习按钮交互（alert 提示）
- ✅ 课程搜索功能
- ✅ 分类筛选功能
- ✅ 课程数量统计
- ✅ localStorage 数据持久化

### React Hooks 优化（2026-04-16 完成）
- ✅ **useLocalStorage** - 封装 localStorage 读写逻辑
- ✅ **useDebounce** - 搜索防抖优化（300ms 延迟）
- ✅ **useMemo** - 缓存筛选列表、分类列表、统计信息
- ✅ **useCallback** - 优化所有事件处理函数
- ✅ **useRef** - 输入框自动聚焦
- ✅ **useEffect** - 自动聚焦监听

## 组件架构

```
src/
├── App.jsx                    # 主应用组件
├── App.css                    # 全局样式
├── index.jsx                  # 入口文件
├── hooks/                     # 自定义 Hooks
│   ├── useLocalStorage.js     # localStorage 封装
│   └── useDebounce.js         # 防抖逻辑封装
└── components/
    ├── Header.jsx             # 头部统计展示
    ├── CourseList.jsx         # 课程列表容器
    ├── CourseCard.jsx         # 课程卡片组件
    └── Footer.jsx             # 页脚组件
```

## 数据结构

```javascript
{
  id: number,           // 唯一标识（时间戳）
  name: string,         // 课程名称（必填）
  description: string,  // 课程简介（可选）
  category: string,     // 课程分类
  createdAt: string     // 创建时间（ISO格式）
}
```

## 设计风格

- **整体风格**：彩色渐变背景
- **主渐变**：#667eea → #764ba2
- **卡片背景**：#ffffff
- **文字颜色**：#333333 / #666666
- **按钮颜色**：成功 #10b981，危险 #ef4444，警告 #f59e0b
- **布局**：最大宽度 1200px，响应式网格 1-3 列
- **圆角**：8px
- **字体**：无衬线字体（用户偏好）

## 性能优化要点

1. **搜索防抖**：使用 useDebounce 减少不必要的重新渲染
2. **列表缓存**：使用 useMemo 缓存筛选后的列表
3. **函数缓存**：使用 useCallback 避免子组件不必要的重新渲染
4. **自动聚焦**：使用 useRef + useEffect 提升用户体验
5. **函数式更新**：使用 prevCourses 避免闭包陷阱

## 开发命令

```bash
npm run dev      # 启动开发服务器
npm run build    # 构建生产版本
npm run preview  # 预览生产版本
```

## 用户偏好

- 标题和标题文本优先使用无衬线字体
- 不喜欢宋体等衬线风格
- 注重 UI/UX 细节和视觉呈现
