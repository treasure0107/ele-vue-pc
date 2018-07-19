<template>
  <div>
    <div class="payPasswordContent">
      <el-form :model="setPayPassword" label-width="90px">
        <el-form-item label="设置密码" required>
          <el-input  v-model="setPayPassword.password" type="password" placeholder="请输入交易密码" class="update-input"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" required>
          <el-input  v-model="setPayPassword.surePassword" type="password" placeholder="请再次输入交易密码" class="update-input"></el-input>
        </el-form-item>
      </el-form>

      <!--<p>-->
        <!--<span class="update-tit">设置密码</span>-->
        <!--<el-input v-model="setPayPassword.password" type="password" placeholder="请输入六位数字的交易密码" class="update-input"></el-input>-->
      <!--</p>-->
      <!--<p>-->
        <!--<span class="update-tit">确认密码</span>-->
        <!--<el-input v-model="setPayPassword.surePassword" type="password" placeholder="请再次输入交易密码" class="update-input"></el-input>-->
      <!--</p>-->
    </div>
    <footer slot="footer" class="dialog-footer">
      <el-button @click="setPayPasswordBack">返 回</el-button>
      <el-button type="primary" v-dbClick @click="setPay">完 成</el-button>
    </footer>
  </div>

</template>
<script type="text/babel">
  import until from "@/scripts/until";
  import {baseUrl} from "@/config/env";
  export default {
    data(){
      return {
        dialogPayPsdVisible: false,
        setPayPassword: {
          password: '',
          surePassword: '',
        },
      }
    },
    mounted(){

    },
    methods: {
      formValidate(){
        let reg = new RegExp("^[0-9]*$");
        if(!reg.test(this.setPayPassword.password) || !reg.test(this.setPayPassword.surePassword)){
          this.$message({
            showClose: true,
            duration: 3000,
            message: '请输入六位数字的交易密码！',
            type: 'error'
          });
          return false;
        }

        if (this.setPayPassword.password.length == 0) {
          this.$message({
            showClose: true,
            duration: 3000,
            message: '密码不能为空！',
            type: 'error'
          });
          return false;
        }
        if (this.setPayPassword.surePassword.length == 0) {
          this.$message({
            showClose: true,
            duration: 3000,
            message: '确认密码不能为空！',
            type: 'error'
          });
          return false;
        }
        if (this.setPayPassword.password.length < 6) {
          this.$message({
            showClose: true,
            duration: 3000,
            message: '交易密码不能少于六位数字的！',
            type: 'error'
          });
          return false;
        }
        if (this.setPayPassword.password != this.setPayPassword.surePassword) {
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
      setPay(){   //设置交易密码
        try {
          if (this.formValidate()) {
            let reg = new RegExp('^([0-9])+$');
            if (!reg.test(this.setPayPassword.password)) {
              this.$message({
                showClose: true,
                duration: 4000,
                message: '密码格式不对！',
                type: 'error'
              });
              return false;
            }
            let url = baseUrl + "account/account/addpaypassword";
            let password = this.setPayPassword.password;   //交易密码
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
                    this.$emit('setPayPasswordCancel', 'true')
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
      setPayPasswordBack(){
        this.$emit('setPayPasswordCancel', 'true')
      }
    },
    components: {}
  }

</script>
<style>
  .pay-password-set .el-dialog__title {
    font-weight: bold;
    font-size: 20px;
    color: #333;
  }

  .pay-password-set .dialog-footer {
    text-align: center;
  }

  .pay-password-set .el-button {
    width: 180px;
    height: 39px;
    border-radius: 20px;
  }

  .pay-password-set .el-button--default {
    border: 1px solid #999;
    margin-right: 30px;
    color: #333;
  }

  .pay-password-set .el-button--primary {
    background-color: #2E6AF4;
  }
</style>
<style lang="scss" scoped>
  .payPasswordContent p {
    margin-bottom: 40px;
  }

  .payPasswordContent .update-tit {
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

  .payPasswordContent .update-input {
    display: inline-block;
    /*width: 380px;*/
    width: 90%;
    margin-bottom: 20px;
    height: 40px;
    position: relative;
  }
</style>
