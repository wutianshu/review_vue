<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>创建订单</span>
      <div style="float: right; padding: 3px 0">
        <label style="font-size:12px">环境选择</label>
        <el-select type="text" v-model="environment" size="mini">
          <el-option label="stable" value="stable"></el-option>
          <el-option label="betaa" value="betaa"></el-option>
          <el-option label="betab" value="betab"></el-option>
          <el-option label="betac" value="betac"></el-option>
          <el-option label="betad" value="betad"></el-option>
        </el-select>
      </div>
    </div>
    <div>
      <el-form ref="form" :model="form" label-width="80px" v-loading="loading" :rules="rules">
        <el-form-item label="活动名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="活动区域" prop="region">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动时间">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="即时配送" prop="delivery">
          <el-switch v-model="form.delivery"></el-switch>
        </el-form-item>
        <el-form-item label="活动性质" prop="type">
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
            <el-checkbox label="地推活动" name="type"></el-checkbox>
            <el-checkbox label="线下主题活动" name="type"></el-checkbox>
            <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="特殊资源" prop="resource">
          <el-radio-group v-model="form.resource">
            <el-radio label="线上品牌商赞助"></el-radio>
            <el-radio label="线下场地免费"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="活动形式" prop="desc">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">立即创建</el-button>
          <el-button @click="resetForm()">重置</el-button>
        </el-form-item>
      </el-form>
      <el-card class="box-card">
        <el-row :gutter="20">
          <el-col :span="12">
            <div>
              <el-input v-model="orderId1" disabled>
                <template slot="prepend">订单id</template>
              </el-input>
            </div>
          </el-col>
          <el-col :span="12">
            <div>
              <el-input v-model="orderId2" disabled>
                <template slot="prepend">订单编号</template>
              </el-input>
            </div>
          </el-col>
        </el-row>
      </el-card>
      <el-alert
        :title="alertMsg.title"
        type="error"
        :description="alertMsg.description"
        show-icon
        v-show="alertMsg.isError">
      </el-alert>
    </div>
  </el-card>
</template>

<script>
import axios from 'axios'
export default {
  name: 'TestOrder',
  props: ['environment'],
  data () {
    return {
      env: 'betaa',
      form: this.initForm(),
      loading: false,
      orderId1: '',
      orderId2: '',
      alertMsg: this.initAlertMsg(),
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    initForm () {
      return {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    },
    initAlertMsg () {
      return {
        title: '',
        description: '',
        isError: false
      }
    },
    resetForm () {
      this.form = this.initForm()
    },
    submitForm (formName) {
      // 该自定义方法可以获取form中有效数据
      console.log(this.commonJS.cleanObjNullProperty(this.form))
      this.loading = true
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios({
            method: 'get',
            url: '/api/tools/smscode',
            params: {'phoneno': '15377319326'}
          }).then(response => {
            console.log(response.data.cstest_status)
            if (!response.data.cstest_status) {
              this.orderId1 = response.data.cstest_message
              this.loading = false
            } else {
              this.alertMsg.isError = true
              this.alertMsg.title = '服务器内部错误'
              this.alertMsg.description = '服务器内部错误'
              this.loading = false
            }
          })
            .catch(error => {
              console.log(error)
            })
        } else {
          // console.log('error submit!!')
          this.loading = false
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
</style>
