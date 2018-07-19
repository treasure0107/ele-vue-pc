<template>
  <div class="">
    <div>
      <div class="updatePayContent">
        <h3>您已绑定的账户<span v-if="mobile">{{mobile}}</span><span v-if="email">{{email}}</span></h3>
        <el-form :model="updatePayPassword" label-width="100px">
        <el-form-item label="验证码" style="position:relative;" required>
          <el-input v-model="updatePayPassword.securityCode" placeholder="请输入验证码" class="update-input"></el-input>
          <button v-dbClick class="default-class send-btn" @click.stop="sendMsgCode" v-show="!sendMsgDisabled">点击获取</button>
          <span class="disabled-class send-btn" v-show="sendMsgDisabled">{{time + 's'}}</span>
        </el-form-item>
          <el-form-item label="新密码" required>
            <el-input v-model="updatePayPassword.newPassword" type="password" placeholder="请输入六位数字的新交易密码"
                      class="update-input"></el-input>
          </el-form-item>
          <el-form-item label="确认新密码" required>
            <el-input v-model="updatePayPassword.surePassword" type="password" placeholder="请确认新密码"
                      class="update-input"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <footer slot="footer" class="dialog-footer">
        <el-button @click="updateBackSend">返 回</el-button>
        <el-button type="primary" v-dbClick @click="ChangePayPassword">完 成</el-button>
      </footer>

    </div>
  </div>
</template>
<script type="text/babel">
  import until from "@/scripts/until";
  import {baseUrl} from "@/config/env";
  export default {
    data(){
      return {
        userName: '',
        mobile: '',
        email:'',
        updatePayPassword: {
          securityCode: '',
          newPassword: '',
          surePassword: '',
        },
        dialogUpdatePayPsdVisible: false,
        time: 59, // 发送验证码倒计时
        sendMsgDisabled: false
      }
    },
    mounted(){
      if (window.localStorage.getItem("UserInfo")) {
        let userNews = JSON.parse(window.localStorage.getItem("UserInfo"));
        this.userName = userNews.userinfo.username;
        this.mobile = this.formatPhone(userNews.userinfo.mobile);
        this.email = this.formatEmail(userNews.userinfo.email);
      }
    },
    methods: {
      formatPhone(phone) {
        return phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
      },
      formatEmail(email) {
        return email.replace(/(.{2}).+(.{2}@.+)/g, "$1****$2");
      },
      formValidate(){
        let reg = new RegExp("^[0-9]*$");
        if(!reg.test(this.updatePayPassword.newPassword) || !reg.test(this.updatePayPassword.surePassword)){
          this.$message({
            showClose: true,
            duration: 3000,
            message: '请输入六位数字的交易密码！',
            type: 'error'
          });
          return false;
        }
        if (this.updatePayPassword.securityCode.length == 0) {
          this.$message({
            showClose: true,
            duration: 4000,
            message: '验证码不能为空！',
            type: 'error'
          });
          return false;
        }
        if (this.updatePayPassword.securityCode.length < 6) {
          this.$message({
            showClose: true,
            duration: 4000,
            message: '验证码輸入少于6位数！',
            type: 'error'
          });
          return false;
        }
        if (this.updatePayPassword.newPassword.length == 0) {
          this.$message({
            showClose: true,
            duration: 4000,
            message: '密码不能为空！',
            type: 'error'
          });
          return false;
        }
        if (this.updatePayPassword.surePassword.length == 0) {
          this.$message({
            showClose: true,
            duration: 4000,
            message: '确认密码不能为空！',
            type: 'error'
          });
          return false;
        }
        if (this.updatePayPassword.newPassword.length != 6 || this.updatePayPassword.surePassword.length != 6) {
          this.$message({
            showClose: true,
            duration: 4000,
            message: '交易密码长度6位数字！',
            type: 'error'
          });
          return false;
        }
        if (this.updatePayPassword.newPassword != this.updatePayPassword.surePassword) {
          this.$message({
            showClose: true,
            duration: 4000,
            message: '密码和确认密码不一致！',
            type: 'error'
          });
          return false;
        }
        return true;
      },
      intervalTimerSend(){
        let _this = this;
//        _this.sendMsgDisabled = true;
        let interval = window.setInterval(function () {
          if ((_this.time--) <= 1) {
            _this.time = 59;
            _this.sendMsgDisabled = false;
            window.clearInterval(interval);
          }
        }, 1000);
      },
      //发送短信验证吗
      sendMsgCode(){
        let username = this.userName;
        try {
          if (username) {
            this.sendMsgDisabled = true;
            this.intervalTimerSend();
            let url = baseUrl + "account/account/send_reset";
            let config = {
              method: "POST",
              url: url + "?r=" + Math.random(),
              data: {
                username: username
              }
            };
            this.$axios(config).then(res => {
              if (res.data.code) {
                this.$message({
                  type: "success",
                  duration: 1000,
                  message: res.data.msg || "登录成功！",
                  onClose: () => {
                  }
                });
              } else {
                this.$message({
                  showClose: true,
                  duration: 3000,
                  message: res.data.msg || '操作失败！',
                  type: 'error'
                });
              }
            });
          }
        } catch (ex) {
          until.consoleLog(ex);
        }
      },
      ChangePayPassword(){
        try {
          if (this.formValidate()) {
            let url = baseUrl + "account/account/editpaypassword";
            let verify_code = this.updatePayPassword.securityCode;
            let password = this.updatePayPassword.newPassword;
            let config = {
              method: "POST",
              url: url + "?r=" + Math.random(),
              data: {
                password: password,
                verify_code: verify_code,
              }
            };
            this.$axios(config).then(res => {
              if (res.data.code) {
                this.$message({
                  type: "success",
                  duration: 1000,
                  message: res.data.msg || "登录成功！",
                  onClose: () => {
                    this.$emit('sendPayT', 'true');
                  }
                });
              } else {
                this.$message({
                  showClose: true,
                  duration: 3000,
                  message: res.data.msg || '操作失败！',
                  type: 'error'
                });
              }
            });
          }
        } catch (ex) {
          until.consoleLog(ex);
        }
      },
      updateBackSend(){
        this.$emit('sendPayT', 'true');
      }
    },
    components: {}
  }
</script>
<style>
  .payPassword-set-main .el-dialog__title {
    font-weight: bold;
    font-size: 20px;
    color: #333;
  }

  .payPassword-set-main .dialog-footer {
    text-align: center;
  }

  .payPassword-set-main .el-button {
    width: 180px;
    height: 39px;
    border-radius: 20px;
  }

  .payPassword-set-main .el-button--default {
    border: 1px solid #999;
    margin-right: 30px;
    color: #333;
  }

  .payPassword-set-main .el-button--primary {
    background-color: #2E6AF4;
  }

  .updatePayContent .el-input-group__append {
    background-color: #fff;
    border: none;
    position: absolute;
    right: 0;
    top: 0;
  }

  .updatePayContent. .el-dialog__headerbtn {
    width: 15px;
    height: 16px;
    font-size: 16px;
    color: #666;

  }
</style>
<style lang="scss" scoped>
  .updatePayContent h3 {
    font-size: 14px;
    text-align: center;
    color: #333;
    margin-bottom: 30px;
  }

  .updatePayContent .el-form-item {
    margin-bottom: 40px;
  }

  .updatePayContent .update-tit {
    display: inline-block;
    width: 100px;
    height: 13px;
    font-size: 14px;
    padding-right: 30px;
    font-family: MicrosoftYaHei;
    color: rgba(153, 153, 153, 1);
    line-height: 20px;
    text-align: right;
  }

  .updatePayContent .update-input {
    display: inline-block;
    /*width: 380px;*/
    width: 90%;
    height: 40px;
    position: relative;
  }

  /*.updatePayContent .send-code {*/
    /*font-size: 12px;*/
    /*width: 90px;*/
    /*height: 24px;*/
    /*line-height: 1px;*/
    /*text-align: center;*/
    /*background-color: #5E4EE7;*/
    /*border-radius: 12px;*/
    /*position: absolute;*/
    /*right: 60px;*/
    /*top: 10px;*/
    /*color: #fff;*/
  /*}*/

  .send-btn {
    display: inline-block;
    text-align: center;
    position: absolute;
    right: 60px;
    top: 10px;
    width: 90px;
    height: 24px;
    line-height: 24px;
    cursor: pointer;
    outline: none;
    font-size: 14px;
    border-radius: 12px;
  }
  .default-class {
    color: #ffffff;
    background-color: #5E4EE7;
  }
  .disabled-class {
    background-color: #ccc;
    color: #ffffff;
  }
</style>
