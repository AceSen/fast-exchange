<template>
  <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane label="资金发放" name="withdraw">
      <OKXWithdraw/>
    </el-tab-pane>
  </el-tabs>
</template>

<script>

import OKXWithdraw from './exchange/OKXWithdraw'

export default {
  name: "OKXContainer",
  components: {
    OKXWithdraw,
  },
  data() {
    return {
      activeName: "withdraw"
    }
  }
}

</script>

<style>
  .demo-tabs > .el-tabs__content {
    padding: 32px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
  }
</style>
