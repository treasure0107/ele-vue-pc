<template>
  <div class="banner">
    <el-carousel :interval="interval" :autoplay="autoplay" arrow="hover">
      <el-carousel-item v-for="(item,index) in banner" :key='index'>
        <!-- <a :href="item.url"><img :src="item.image" alt="" style="width:100%"/></a> -->
        <img :src="item.image" alt="" style="width:100%"/>
      </el-carousel-item>
    </el-carousel>
    <div class="notice">
      <div class="m-notice">
        <h1 class="clearFix">
          <i class="n-icon"></i>
          <div class="noticeFlex">
            <span class="txt" v-for="(item,index) in gonggao" :key='index'>
              <router-link :to="{path:'NoticeDetails',query:{id:item.id}}" v-html="item.title"
                           style="color:#fff;"></router-link>
            </span>
          </div>
        </h1>
      </div>
    </div>
  </div>
</template>
<script type="text/babel">
  import until from "@/scripts/until";
  import {baseUrl} from "@/config/env";
  export default {
    data(){
      return {
        banner: [],
        gonggao: [],
        interval: 5000,
        autoplay: false
      }

    },
    mounted(){
      this.getBannerList();
    },
    methods: {
      // 获取banner列表
      getBannerList(){
        try {
          let url = baseUrl + "/index/gethomelist";
          let config = {
            method: "POST",
            url: url,
            data: {r: Math.random()}
          };
          this.$axios(config).then(result => {

            if (until.responesValidate(result)) {
              this.banner = result.data.data.banner;
              this.gonggao = result.data.data.gonggao;
            }
          })

        } catch (ex) {
          until.consoleLog(ex)
        }
      }
    },
    components: {}
  }

</script>
<style lang="scss" scoped>
  @import "./../styles/mixin";

  .notice {
    position: relative;
    width: 100%;
    height: 40px;
    line-height: 40px;
    background-color: #2b2b3e;
    overflow: hidden;
    letter-spacing: 1px;
    h1 {
      i.n-icon {
        background: url("../assets/notice-icon.png") center center no-repeat;
        float: left;
        display: inline-block;
        width: 20px;
        height: 40px;
      }
      .noticeFlex {
        display: flex;
        justify-content: space-between;
      }
      span.txt {
        display: inline-block;
        float: left;
        height: 40px;
        padding-left: 28px;
        a {
          font-size: 14px;
          font-weight: 500;
        }
      }
      @include marginAuto();
      padding: 0 10px;
      white-space: nowrap;
      @include sc(12px, #ffffff);
    }
  }

  .el-carousel__indicator.is-active button {
    opacity: 1 !important;
    width: 40px !important;
    border-radius: 10px !important;
  }

  /deep/ .el-carousel__button {
    width: 12px !important;
    height: 12px !important;
    border-radius: 50% !important;
  }

  /deep/ .el-carousel__indicators {
    .is-active {
      .el-carousel__button {
        width: 35px !important;
        border-radius: 30px !important;
      }
    }
  }

  /deep/ .el-carousel__container {
    min-height: 408px;
  }

  /deep/ .el-carousel__arrow {
    width: 45px;
    height: 45px;
    font-size: 25px;
  }

  /deep/ .el-carousel__item {
    img {
      width: 100%;
      min-height: 408px;
    }
  }
</style>
