<script setup>
import { ref ,watch } from 'vue'
import { useRouter } from 'vue-router'
import { useCounterStore} from '@/stores/counter'
import { marked } from 'marked'
import { computed } from 'vue'
import * as ElementPlus from 'element-plus'
const router = useRouter()
const store = useCounterStore()
const nowdate = ref('')
const energy = ref(0)
const mood = ref(0)
const concent = ref(0)
const formModel = ref({
  date: '',
  state: {energy: '', mood: '', concent: ''},
  worktime: 0,
  workcontent: '',
})
const goTOAbout = () => {
  router.push('/about')
}
// 注意执行时间
watch(nowdate,()=>{
  formModel.value.date= nowdate.value
  console.log(nowdate.value)
})
watch(energy,()=>{

switch (energy.value) {
  case 1:
    formModel.value.state.energy = 'oops😢'
    break
  case 2:
    formModel.value.state.energy = 'disappointed😔'
    break
  case 3:
    formModel.value.state.energy = 'normal 😐'
    break
  case 4:
    formModel.value.state.energy = 'good🙂'
    break
  case 5:
    formModel.value.state.energy = 'great😊'
    break
}
})
watch(mood,()=>{
  switch (mood.value) {
  case 1:
    formModel.value.state.mood= 'oops😢'
    break
  case 2:
    formModel.value.state.mood = 'disappointed😔'
    break
  case 3:
    formModel.value.state.mood = 'normal😐'
    break
  case 4:
    formModel.value.state.mood = 'good🙂'
    break
  case 5:
    formModel.value.state.mood = 'great😊'
    break
}
})
watch(concent,()=>{
  switch (concent.value) {
  case 1:
    formModel.value.state.concent = 'oops😢'
    break
  case 2:
    formModel.value.state.concent = 'disappointed😔'
    break
  case 3:
    formModel.value.state.concent = 'normal😐'
    break
  case 4:
    formModel.value.state.concent = 'good🙂'
    break
  case 5:
    formModel.value.state.concent = 'great😊'
    break
}
})
const previewHtml = computed(() => {
  return marked(formModel.value.workcontent || '')
})
const Submit = () => {
  // 1. 验证必填项
  if (!formModel.value.date) {
    alert('请选择日期！')
    return
  }else if (!formModel.value.state.energy) {
    alert('请选择精力值！')
    return
  }else if (!formModel.value.state.mood) {
    alert('请选择情绪状态！')
    return
  }else if (!formModel.value.state.concent) {
    alert('请选择专注度！')
    return
  }else if (!formModel.value.worktime) {
    alert('请填写学习时长！')
    return
  } else if (!formModel.value.workcontent) {
    alert('请填写学习内容！')
    return
  }
  // 2. 创建记录副本
  const record = {
    ...formModel.value,
    submitTime: new Date().toLocaleString()  // 添加提交时间
  }
  // 3. 存入 Pinia Store
  store.addSummary(record)
  // 4. 打印验证
  console.log('✅ 已存入 Pinia')
  console.log('本次记录:', record)
  console.log('全部记录:', store.summaryList)
  console.log('记录总数:', store.getCount())

  // 5. 重置表单
  formModel.value = {
    date: '',
    state: { energy: 0, mood: 0, concent: 0 },
    worktime: 0,
    workcontent: '',
  }
  nowdate.value = ''
  energy.value = 0
  mood.value = 0
  concent.value = 0
  ElementPlus.ElMessage({
    message: '提交成功！',
    type: 'success',
  })
}
</script>

<template>
    <div class="common-layout">
    <el-container>
      <h2>今日总结</h2>
  <el-button type="primary" @click="goTOAbout" class="butt">往日总结</el-button>
      <el-header>
    <div class="block">
      <el-date-picker
        v-model="nowdate"
        type="date"
        placeholder="请选择今天的日期"
        value-format="YYYY-MM-DD"
      />
    </div>
      </el-header>

      <el-main>
        <div>
          <span>精力值：</span>
          <el-rate
              v-model="energy"
              :texts="['oops😢', 'disappointed😔', 'normal😐', 'good🙂', 'great😊']"
              show-text/>
        </div>
        <div>
          <span>专注度：</span>
          <el-rate
              v-model="concent"
              :texts="['oops😢', 'disappointed😔', 'normal😐', 'good🙂', 'great😊']"
              show-text/>
        </div>
         <div>
        <span>情绪状态：</span>
           <el-rate
            v-model="mood"
            :texts="['oops😢', 'disappointed😔', 'normal😐', 'good🙂', 'great😊']"
            show-text/>
        </div>
        <span>学习时长：</span>
        <el-input-number
        v-model="formModel.worktime"
        :min="0" :max="24"
        label="学习时长">
        </el-input-number>
    </el-main>
  <el-footer>
         <!-- <el-input
        type="textarea"
        placeholder="请输入内容"
        v-model="formModel.workcontent"
        style="width: 100%"
        height="200px"
      ></el-input> -->

  <div class="workCon">
    <el-row :gutter="24">
    <el-col :span="12">
      <span>编辑区</span>
      <el-input
        type="textarea"
        v-model="formModel.workcontent"
        placeholder="# 标题&#10;**加粗**&#10;- 列表项"
        :rows="10"
        class="edit"
      />
    </el-col>
    <el-col :span="12">
      <span>预览区</span>
      <div class="preview" v-html="previewHtml" :rows="10"></div>
    </el-col>
    </el-row>
   </div>
    <hr>
    <div><el-button class="but" @click="Submit" type="warning">提交总结</el-button></div>
  </el-footer>
    </el-container>

  </div>
</template>

<style scoped>
.common-layout {
  color: black;
  font-size: 20px;
  border: 3px solid rgb(202, 8, 219);
  width: 60%;
 height: 700px;
  margin : auto;
  background-color: rgba(127, 242, 255,0.4);
 border-radius: 10%;

}

.demo-date-picker {
 width: 100%;
 display: flex;
 justify-content: center;
}
h2 {
  text-align: center;
}
.butt {
  width: 20%;
  margin-bottom: 20px;
}
.preview {
  border: 1px solid #0445dc;
  min-height: 210px;
  max-height: 210px;
  background: rgba(127, 242, 255);
  padding-left:10px;
  overflow-y: auto;
  word-wrap: break-word;
}
.block {
  width: 100%;
  display: flex;
  justify-content: center;

}
.edit {
  border: 1px solid #0445dc;
  min-height: 200px;
  background-color: blanchedalmond;
}
.but {
  margin-left: 40%;
}
.workCon  {
 width: 100%;
 height: 250px;

}
</style>
