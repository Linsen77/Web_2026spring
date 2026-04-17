import { useState, useEffect } from 'react'

/**
 * 自定义 Hook：封装 localStorage 读写逻辑
 * @param {string} key - localStorage 的键名
 * @param {any} initialValue - 初始值
 * @returns {[any, Function]} - 返回当前值和设置值的函数
 */
function useLocalStorage(key, initialValue) {
  // 初始化状态：从 localStorage 读取或使用初始值
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key)
      // 如果 localStorage 中有值，则解析返回
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      // 如果解析失败，返回初始值
      console.error(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  // 监听值的变化，自动保存到 localStorage
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue))
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  }, [key, storedValue])

  return [storedValue, setStoredValue]
}

export default useLocalStorage
