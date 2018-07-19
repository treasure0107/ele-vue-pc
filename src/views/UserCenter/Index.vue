<template>
  <!-- <div class="container">
    <div class="account-main clearFix">
      <left-nav></left-nav>
      <div class="right-main">
        <router-view></router-view>
      </div>
    </div>
  </div> -->
  <div class="container">
    <el-container>
      <el-aside width="220px">
        <left-nav></left-nav>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>
<script type="text/babel">
  import LeftNav from "@/components/LeftNav";
  export default {
    data(){
      return {}

    },
    mounted(){

    },
    methods: {},
    components: {
      LeftNav
    }
  }

</script>

<style lang="scss" scoped>
  @import "../../styles/mixin";

  /deep/ .el-aside, .el-container {
    height: 100%;
  }
  .account-main {
    .right-main {
      margin-left: 220px;
    }
  }
</style>
