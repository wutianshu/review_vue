<template>
  <div id="cards">
    <label-wrap>选择环境</label-wrap>
    <el-select v-model="value" placeholder="请选择环境">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
    </el-select>
    <el-divider></el-divider>
    <CreateOrder v-bind:environment="value"/>
    <QueryOrder/>
    <TestOrder v-bind:environment="value"></TestOrder>
  </div>
</template>

<script>
import CreateOrder from '@/components/order/CreateOrder'
import QueryOrder from '@/components/order/QueryOrder'
import LabelWrap from 'element-ui/packages/form/src/label-wrap'
import TestOrder from '@/components/order/TestOrder'
export default {
  name: 'WorkContent',
  data () {
    return {
      options: [
        {'value': 'stable', 'label': '稳定环境'},
        {'value': 'betaa', 'label': 'A环境'},
        {'value': 'betab', 'label': 'B环境'},
        {'value': 'betac', 'label': 'C环境'}
      ],
      value: 'betaa'
    }
  },
  components: {TestOrder, LabelWrap, QueryOrder, CreateOrder}
}
</script>

<style scoped>

</style>
