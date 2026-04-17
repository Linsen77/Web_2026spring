import { useState, useEffect } from 'react'

/**
 * 自定义 Hook：搜索防抖逻辑
 * @param {any} value - 需要防抖的值
 * @param {number} delay - 防抖延迟时间（毫秒）
 * @returns {any} - 返回防抖后的值
 */
function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    // 设置定时器，延迟更新值
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // 清理函数：在下一次 effect 执行前清除定时器
    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}

export default useDebounce
