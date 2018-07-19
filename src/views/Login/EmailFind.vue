<template>
  <div class="register-wrap">
    <div class="container">
      <!--找回密码-->
      <div class="register-form" style="margin: 0 auto;">
        <h3 class="title">邮箱找回
          <router-link class="email-pwd" to="/TelFind">手机找回&nbsp;></router-link>
        </h3>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="form-pannel show">
          <el-form-item prop="email">
            <el-input v-model="ruleForm.email" placeholder="邮箱号"></el-input>
          </el-form-item>
          <el-form-item prop="imgCode">
            <el-input v-model="ruleForm.code" placeholder="验证码"></el-input>
            <a  v-if="!ruleForm.email" class="send-code-btn">发送验证码</a>
            <a  v-if="isT" class="send-code-btn" v-text="countdown" style="width: 61px;text-align: center;font-size: 14px"></a>
            <a @click="sent()" v-if="ruleForm.email && !isT" class="send-co-btn">发送验证码</a>
          </el-form-item>
          <el-form-item prop="newPwd">
            <el-input v-model="ruleForm.newPwd" placeholder="新密码" type="password"></el-input>
          </el-form-item>
          <el-form-item prop="confirmPwd">
            <el-input v-model="ruleForm.confirmPwd" placeholder="确认密码" type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <button v-dbClick class="set-btn" @click="submitForm('ruleForm');">找回密码</button>
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
          email: "",
          code: "",
          newPwd: '',
          confirmPwd: '',
        },
        rules: {},
        isT: false,
        countdown: 60,
        bg: false,
        flag: false
      }

    },
    mounted(){

    },
    methods: {
      handleBlur() {
        if (this.ruleForm.email.length != 0 && this.ruleForm.code.length != 0 && this.ruleForm.newPwd.length != 0 && this.ruleForm.confirmPwd.length != 0) {
          this.bg = true;
          this.flag = true;
        } else {
          this.bg = false
          this.flag = false;
        }
      },
      //验证码倒计时
      settime () {
        if (this.countdown == 0) {
          this.countdown = 60;
          this.isT = false;
          return false;
        } else {
          this.countdown--;
        }
        let self = this;
        setTimeout(function() {
          self.settime();
        },1000);
      },
      //发送短信
      sent() {
        if (!until.isEmail(this.ruleForm.email)) {
          this.$message({
            showClose: true,
            duration: 4000,
            message: '输入的账号格式有误！',
            type: 'error'
          });
          return false;
        }
        this.isT = true;
        this.settime();
        try {
          let formData = {
            "username": this.ruleForm.email, //账户
          }
          this.$axios({
            method: "post",
            url: baseUrl + 'user/send_reset?r=' + Math.random(),
            data: formData
          }).then((result) => {
            if (until.responesValidate(result)) {
              this.$message({
                type: "success",
                duration: 1000,
                message: result.data.msg || "发送成功！",
                onClose: () => {
                }
              });
            }
          });
        } catch (ex) {
          until.consoleLog(ex);
        }
      },
      //验证
      formValidate()
      {
        if (this.ruleForm.email.length == 0) {
          this.$message({
            showClose: true,
            duration: 4000,
            message: '账号名称不能为空！',
            type: 'error'
          });
          return false;
        }
        if (!until.isEmail(this.ruleForm.email)) {
          this.$message({
            showClose: true,
            duration: 4000,
            message: '输入的账号格式有误！',
            type: 'error'
          });
          return false;
        }
        if (this.ruleForm.code.length == 0) {
          this.$message({
            showClose: true,
            duration: 4000,
            message: '账号密码不能为空！',
            type: 'error'
          });
          return false;
        }
        if (this.ruleForm.newPwd.length == 0) {
          this.$message({
            showClose: true,
            duration: 4000,
            message: '账号密码不能为空！',
            type: 'error'
          });
          return false;
        }
        if (this.ruleForm.confirmPwd.length == 0) {
          this.$message({
            showClose: true,
            duration: 4000,
            message: '账号密码不能为空！',
            type: 'error'
          });
          return false;
        }
        if (this.ruleForm.newPwd.length < 6 || this.ruleForm.confirmPwd.length > 20) {
          this.$message({
            showClose: true,
            duration: 4000,
            message: '账号密码必须为6-20个字符！',
            type: 'error'
          });
          return false;
        }
        if (this.ruleForm.newPwd != this.ruleForm.confirmPwd) {
          this.$message({
            showClose: true,
            duration: 4000,
            message: '密码不一致！',
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
              "username": this.ruleForm.email, //账户
              "newpassword": this.ruleForm.confirmPwd,//登录密码
              "captcha": this.ruleForm.code//验证码
            }
            this.$axios({
              method: "post",
              url: baseUrl + 'user/resetpwd?r=' + Math.random(),
              data: formData
            }).then((result) => {
              let res = result["data"];
              if (res.code == 1) {
                this.$message({
                  type: "success",
                  duration: 1000,
                  message: result.data.msg || "找回密码成功！",
                  onClose: () => {
                    // this.$router.push({path: "/index"});
                    window.location.href = "#/Login"
                  }
                });
              } else {
                this.$message({
                  type: "error",
                  duration: 3000,
                  message: result.data.msg || "找回密码失败！"
                });
              }
            });
          }
        } catch (ex) {
          until.consoleLog(ex);
        }
      },
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
