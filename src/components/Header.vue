<template>
  <div class="header">
    <div class="m-header clearFix">
      <div class="h-left fl">
        <a href="/" class="logo">
          <img src="../assets/logo.png" alt="" class="logo"/>
        </a>
        <router-link to="/">首页</router-link>
        <router-link to="/C2C" v-if="isLo">C2C交易</router-link>
        <el-dropdown trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
    <i v-text="slip">信息披露</i><i class="el-icon-arrow-down el-icon--right"></i>
  </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="f">关于我们</el-dropdown-item>
            <el-dropdown-item command='g'>联系我们</el-dropdown-item>
            <el-dropdown-item command="h">新闻资讯</el-dropdown-item>
            <el-dropdown-item command="i">网站公告</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="h-right fr">
        <!--   <a href="#">APP下载</a>-->
        <span class="sp" v-if="!isLo" @click="go('Register')">注册</span>
        <span class="sp" v-if="!isLo" @click="go('Login')">登录</span>
        <!--已登录-->
        <el-dropdown v-if="isLo" trigger="click" @command="handleCommand">
          <span class="el-dropdown-link" v-if="userInfo">
            <img :src="userInfo.avatar" alt="" class="head">
            <i v-text="test">个人中心</i><i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown" class="user-dropdown">
            <el-dropdown-item command="a">个人中心</el-dropdown-item>
            <el-dropdown-item command="b">收款设置</el-dropdown-item>
            <el-dropdown-item command="c">个人资产</el-dropdown-item>
            <!--    <el-dropdown-item command="d">订单列表</el-dropdown-item>-->
            <el-dropdown-item command="e">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <!--  未登录-->
        <!--<router-link to="/register" class="register">注册</router-link>
             <router-link to="/login" class="login">登录</router-link>-->
        <a href="#">
          <img src="./../assets/gq.jpg" alt="" class="gq"/>
          中文</a>

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
        isLo: false,
        test: '个人中心',
        userInfo: {},
        slip: '',
      }
    },
    watch: {
      $route(to, from){
        if (to.path == '/') {
          this.test = '个人中心'
          this.slip = '信息披露'
        }
      }
    },
    mounted(){
      this.slip = '信息披露'
      this.test = '个人中心';
      if (window.localStorage.getItem('UserInfo')) {
        this.isLo = true;
        /*until.getUserInfo((result) => {
         console.log(result);
         this.userInfo=res
         });*/
        this.userInfo = until.getUserInfo()["userinfo"];
      } else {
        this.isLo = false
      }
      var orignalSetItem = localStorage.setItem;
      localStorage.setItem = function (key, newValue) {
        var setItemEvent = new Event("setItemEvent");
        setItemEvent.newValue = newValue;
        setItemEvent.key = key;
        window.dispatchEvent(setItemEvent);
        orignalSetItem.apply(this, arguments);
      }
      window.addEventListener("setItemEvent", (obj) => {
        if (obj.key == "UserInfo") {
          this.userInfo.avatar = JSON.parse(obj.newValue).userinfo.avatar;
        }
      });

    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        // 通过 `vm` 访问组件实例
        const self = vm;
        alert(self.test)
      })
    },
    methods: {
      go(item) {
        this.$router.push('/' + item)
      },
      handleCommand(command) {
        if (command == 'a') {
          this.test = '个人中心'
          this.go('Account')
        } else if (command == 'b') {
          this.test = '收款设置'
          this.go('CollectSet')
        } else if (command == 'c') {
          this.test = '个人资产'
          this.go('Account')
        } else if (command == 'd') {
          this.test = '订单列表'
          this.go('OrderList')
        } else if (command == 'e') {
          this.test = '个人中心'
          let self = this;
          self.$confirm('确定要退出登录吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            try {
              this.$axios({
                method: "post",
                url: baseUrl + 'user/logout?r=' + Math.random(),
                data: ''
              }).then((result) => {
                if (until.responesValidate(result)) {
                  localStorage.removeItem('UserInfo');
                  this.$message({
                    type: "success",
                    duration: 1000,
                    message: "退出登录成功！",
                    onClose: () => {
                      window.location.href = "/";
                    }
                  });
                }
              });
            } catch (ex) {
              until.consoleLog(ex);
            }
          }).catch(() => {
            /*            self.$message({
             type: 'info',
             message: '已取消删除'
             });*/
          });

        } else if (command == 'f') {
          this.slip = '关于我们'
          this.go('AboutUs')
        } else if (command == 'g') {
          this.slip = '联系我们'
          this.go('ContactUs')
        } else if (command == 'h') {
          this.slip = '新闻资讯'
          this.go('NewsList')
        } else if (command == 'i') {
          this.slip = '网站公告'
          this.go('NoticeList')
        }
      }
    },
    components: {}
  }

</script>

<style lang="scss" scoped>
  @import "./../styles/mixin";

  .el-dropdown-menu__item {
    white-space: nowrap;
  }

  .header {
    background-color: #0b0c22;
    max-width: 100%;
    width: 100%;
    .m-header {
      // @include marginAuto();
      width: 1200px;
      margin: 0 auto;
      padding: 0 10px;
      height: 54px;
      .h-left, .h-right {
        display: inline-block;
        a, .el-dropdown {
          line-height: 54px;
          padding: 0px 12px;
          @include sc(14px, #ffffff);
          img {
            vertical-align: middle;
          }
          img.logo {
            padding-right: 5px;
          }
          img.head {
            border-radius: 100%;
            margin-right: 5px;
            border: solid 1px #8f8f9a;
            width: 22px;
            height: 22px;
          }
          img.gq {
            width: 16px;
            height: 12px;
          }
        }
        a:first-child {
          padding: 0 18px 0 0 !important;
        }
        a:last-child {
          padding: 0 0 0 18px !important;
        }
        /*        a:hover, .el-dropdown:hover {
                  text-decoration: underline;
                }*/
        a.logo {
          padding-left: 0 !important;
        }
        .el-dropdown {
          @include sc(14px, #ffffff);
          cursor: pointer;
        }
        .sp {
          padding: 0 2px;
          font-size: 14px;
          color: #fff;
          cursor: pointer;
        }
      }
      .h-right {
        a.register {
          padding-right: 6px;
        }
        a.login {
          padding-left: 6px;
        }
      }
    }
  }
</style>
