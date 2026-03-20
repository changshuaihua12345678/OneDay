<script setup>
import { ref } from 'vue'
import {useCounterStore}  from '@/stores/counter'
import { marked } from 'marked'
import { computed } from 'vue'
const drawer = ref(false)
const store = useCounterStore()
const formModel = ref({})
const openDrawer = (index) => {
  drawer.value = true
 formModel.value = store.summaryList[index]
}
const closeDrawer = () => {
  drawer.value = false
}
defineExpose({
  openDrawer,
  closeDrawer
})

const previewHtml = computed(() => {
  return marked(formModel.value.workcontent || '')
})
</script>

<template>
  <el-drawer v-model="drawer" title="总结详情" size="50%" direction="rtl">
      <h2>每日总结</h2>
      <p><strong>日期：</strong>{{ formModel.date }}</p>
      <p><strong>精力值：</strong>{{formModel.state.energy }}</p>
      <p><strong>情绪状态：</strong>{{ formModel.state.mood }}</p>
      <p><strong>专注度：</strong>{{ formModel.state.concent }}</p>
      <p><strong>工作时长：</strong>{{formModel.worktime  }} 小时</p>
      <p><strong>工作内容：</strong></p>
      <div class="preview" v-html="previewHtml"></div>
      <el-button @click="closeDrawer" type="primary">关闭</el-button>
  </el-drawer>
</template>

<style  scoped>
.preview {
  border: 1px solid #0445dc;
  padding: 10px;
  min-height: 200px;
  background: rgba(127, 242, 255);
    overflow-y: auto;       /* 新增：内容超出高度时显示滚动条 */
     word-wrap: break-word;
}
</style>
