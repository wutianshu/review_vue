<template>
  <div id="app">
    <el-container>
      <el-header>
        <NavHead></NavHead>
      </el-header>
      <el-main>
        <el-row>
          <el-col :span="16" :offset="4">
            <router-view/>
          </el-col>
        </el-row>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>

<script>
import NavHead from '@/components/NavHead'
export default {
  name: 'App',
  components: {NavHead}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
