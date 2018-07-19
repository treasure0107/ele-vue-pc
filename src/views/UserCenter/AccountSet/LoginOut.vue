<template>
  <div>
    <div class="login-out-con">
      <p class="login-out-tit">申请注销后，您的账户信息将会全部清除，后期无法找回。</p>
      <el-form :model="form" ref="form" label-width="60px">
        <el-form-item label="" required>
          <el-input  v-model="form.applyCancelPayPassword" type="password" placeholder="请输入交易密码" class="update-input"></el-input>
        </el-form-item>
        <el-form-item class="clearFix">
          <a href="javascript:void(0);" class="forgetPassword" @click="forgetBtn">忘记密码</a>
        </el-form-item>
      </el-form>
    </div>
    <footer slot="footer" class="dialog-footer">
      <el-button type="primary" v-dbClick @click="trueLoginOut">确认注销</el-button>
    </footer>
  </div>
</template>
<script type="text/babel">
  import until from "@/scripts/until";
  import {baseUrl} from "@/config/env";
  export default {
    data(){
      return {
//        payPassword: '',
        form:{
          applyCancelPayPassword:''
        },
        applyCancelPayPassword: '',  //申请注销
      }
    },
    mounted(){

    },
    methods: {
      forgetBtn(){
        this.$emit('forgetLoginOutCancel', 'true')
      },
      trueLoginOut(){  //确认注销
        if (this.form.applyCancelPayPassword.length == 0) {
          this.$message({
            showClose: true,
            duration: 4000,
            message: '交易密码不能为空！',
            type: 'error'
          });
          return false;
        }
        try {
          let url = baseUrl + "account/account/canceluser";
          let password = this.form.applyCancelPayPassword;   //交易密码
          let config = {
            method: "POST",
            url: url + "?r=" + Math.random(),
            data: {
              password: password
            }
          };
          this.$axios(config).then(res => {
            if (res.data.code) {
              this.$message({
                type: "success",
                duration: 1000,
                message: res.data.msg || "操作成功！",
                onClose: () => {
                  this.$emit('trueLoginOutCancel', 'true')
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
        } catch (ex) {
          until.consoleLog(ex);
        }
      },
    },
    components: {}
  }

</script>

<style lang="scss" scoped>
  .login-out-con .login-out-tit {
    height: 14px;
    font-size: 14px;
    font-family: MicrosoftYaHei;
    color: rgba(238, 1, 1, 1);
    line-height: 20px;
    text-align: center;
    margin-bottom: 29px;
  }

  .forgetPassword {
    float: right;
    margin-right: 90px;
    width: 50px;
    height: 10px;
    font-size: 12px;
    font-family: MicrosoftYaHei;
    color: rgba(183, 183, 183, 1);
    cursor: pointer;
  }
  .el-form-item{
    margin-bottom: 3px;
  }
  .update-input{
    width: 80%;
  }
</style>
<style>
  .login-out-set .el-dialog__title {
    font-weight: bold;
    font-size: 20px;
    color: #333;
  }

  .login-out-set .dialog-footer {
    text-align: center;
    margin-top: 30px;
  }

  .login-out-set .el-button {
    width: 180px;
    height: 39px;
    border-radius: 20px;
    margin-right: 30px;
  }

  .login-out-set .el-button--primary {
    background-color: #2E6AF4;
  }
</style>
