// 定义关于counter的store
import { defineStore } from 'pinia'

// 返回一个函数 规范usexxx
const useDemo = defineStore('demo', {
  state: () => ({ count: 9 })
})

export default useDemo
