<script setup>
import { useRouter } from 'vue-router';
import {useCounterStore} from '@/stores/counter'
import tableDetail from '@/components/tableDetail.vue';
import * as ElementPlus from 'element-plus'
import { ref } from 'vue'
const router = useRouter()
const goback = () => {
  router.go(-1)
}
 const store = useCounterStore()
  const Delete=(index) => {
    if (confirm('确定要删除这条记录吗？')) {
    store.removeSummary(index)
    console.log('删除后数据:', store.summaryList)
    ElementPlus.ElMessage({
      message: '删除成功',
      type: 'success',
    })
  }
  }

const openDetailRef = ref()
const openDetail = (index) => {
  openDetailRef.value?.openDrawer(index)

}

</script>
<template>
  <div class="common-layout">
    <div class="about">
    <h2>往日总结</h2>
     <el-button @click="goback" type="success">返回提交</el-button>
  </div>
  <div class="List">
    <el-table :data="store.summaryList" style="width: 600; ">
    <el-table-column prop="date" label="日期" width="150" />
    <el-table-column prop="worktime" label="工作时间" width="80"/>
    <el-table-column prop="submitTime" label="提交时间" width="180"/>
    <el-table-column prop="remark" label="操作" width="200">
   <template #default="{$index}">
     <el-button type="primary" @click="openDetail($index)" >查看详情</el-button>
    <el-button @click="Delete($index)" type="danger">删除</el-button>
   </template>
    </el-table-column>
  </el-table>
  </div>
  <table-detail ref="openDetailRef"></table-detail>
  </div>

</template>
<style scoped>
.common-layout {
  color: black;
  font-size: 20px;
  border: 3px solid rgb(241, 15, 204);
  width: 600px;
  height: 800px;

margin : auto;
background-color: rgba(127, 251, 255, 0.5);
border-radius: 10%;
padding-bottom: 100PX;
}
.List {
  margin-top: 20px;
}
h2 {
  text-align: center;
  width: 100%;
  color:black;
}
</style>
