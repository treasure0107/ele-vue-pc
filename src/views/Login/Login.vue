<template>
  <div class="register-wrap">
    <div class="container clearFix">
      <div class="register-mbg fl"></div>
      <!--登录-->
      <div class="register-form fl">
        <h3 class="title">欢迎登录</h3>
        <el-form :model="ruleForm" ref="ruleForm" class="form-pannel show">
          <el-form-item prop="Account">
            <el-input v-model="ruleForm.Account" placeholder="手机号或邮箱"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="ruleForm.LoginPwd" placeholder="密码" type="password"></el-input>
          </el-form-item>
          <el-form-item prop="remberPwd clearFix">
            <el-checkbox v-model="ruleForm.checked" class="remember">记住账号</el-checkbox>
            <router-link to="/TelFind" class="find-pwd-link fr" >找回密码</router-link>
          </el-form-item>
          <el-form-item>
            <button type='button' v-dbClick class="set-btn" @click="submitForm('ruleForm');">立即登录</button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script type="text/babel">
  import "@/styles/public.scss";
  import until from "@/scripts/until";
  import {baseUrl} from "@/config/env";
  export default {
    data(){
      return {
        ruleForm: {
          Account: '',
          LoginPwd: '',
          checked: false,
        },
        bg: false,
        flag: false,
        userInfo: {}
      }

    },
    mounted(){
      var self = this;
      if (window.localStorage.getItem('checked') == 'true' && window.localStorage.getItem("Account")) {
            self.ruleForm.Account = window.localStorage.getItem("Account");
      }
      document.onkeydown = function(e){
        if(!e) e = window.event;//火狐中是 window.event
        if((e.keyCode || e.which) == 13){
          self.submitForm()
        }
      }
    },
    methods: {
      //验证
      formValidate()
      {
        if (this.ruleForm.Account.length == 0) {
          this.$message({
            showClose: true,
            duration: 4000,
            message: '账号名称不能为空！',
            type: 'error'
          });
          return false;
        }
        if (!until.isPhoneNum(this.ruleForm.Account) && !until.isEmail(this.ruleForm.Account)) {
          this.$message({
            showClose: true,
            duration: 4000,
            message: '输入的账号格式有误！',
            type: 'error'
          });
          return false;
        }
        if (this.ruleForm.LoginPwd.length == 0) {
          this.$message({
            showClose: true,
            duration: 4000,
            message: '账号密码不能为空！',
            type: 'error'
          });
          return false;
        }
        if (this.ruleForm.LoginPwd.length < 6 || this.ruleForm.LoginPwd.length > 20) {
          this.$message({
            showClose: true,
            duration: 4000,
            message: '账号密码必须为6-20个字符！',
            type: 'error'
          });
          return false;
        }
        return true;
      },
      //提交表单
      submitForm()
      {
        try {
          if (this.formValidate()) {
            let formData = {
              "account": this.ruleForm.Account, //账户
              "password": this.ruleForm.LoginPwd,//登录密码
            }
            this.$axios({
              method: "post",
              url: baseUrl + 'user/login?r=' + Math.random(),
              data: formData
            }).then((result) => {
              if (until.responesValidate(result)) {
                let res = result["data"];
                if (window.localStorage) {
                  window.localStorage.setItem("checked", this.ruleForm.checked);
                  window.localStorage.setItem("UserInfo", JSON.stringify(res["data"]));
                  window.localStorage.setItem("Account", this.ruleForm.Account);
                  this.$message({
                    type: "success",
                    duration: 1000,
                    message: res.Msg || "登录成功！",
                    onClose: () => {
                      // this.$router.push({path: "/index"});
                      window.location.href = "/"
                    }
                  });
                }
              }
            });
          }
        } catch (ex) {
          until.consoleLog(ex);
        }
      }
    },
    components: {}
  }

</script>
<style lang="scss" scoped>
  .bgr {
    display: inline-block;
    text-align: center;
    margin-top: 10px;
    height: 60px;
    line-height: 60px;
    width: 100%;
    background-color: #2E6AF4!important;
    font-size: 20px;
    color: #ffffff;
    border-radius: 30px;
    cursor: pointer;
  }
</style>

