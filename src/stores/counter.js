import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useCounterStore = defineStore('counter', () => {
  // 存储所有提交记录的数组
  const summaryList = ref([])

  // 添加记录的方法
  const addSummary = (record) => {
    summaryList.value.push(record)
  }
  // 清空所有记录
  const clearSummary = () => {
    summaryList.value = []
  }
  //  删除指定记录
  const removeSummary = (index) => {
    summaryList.value.splice(index, 1)
  }
  // 获取记录数量
  const getCount = () => {
    return summaryList.value.length
  }
  return { summaryList, addSummary, clearSummary, removeSummary, getCount}
}, {

  persist: {
    key: 'daily_summary',
    storage: localStorage
  }
})
