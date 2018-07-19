<template>
  <div class="realContent">
    <div class="center-main">
      <div class="formWarp">
        <el-form :model="UsdtForm" ref="UsdtForm" label-width="110px"
                 label-position="right" class="register-form">
          <el-form-item label="Usdt钱包地址" required>
            <el-input style="margin-left: 20px;" v-model="UsdtForm.UsdtAddress" placeholder="请填入Usdt钱包地址" name="UsdtAddress" id="UsdtAddress"></el-input>
          </el-form-item>
          <el-form-item label="标签" required>
            <el-input style="margin-left: 20px;" v-model="UsdtForm.UsdtType" placeholder="请填入标签" name="UsdtType" id="UsdtType"></el-input>
          </el-form-item>
          <el-form-item label="交易密码" required>
            <el-input style="margin-left: 20px;" v-model="UsdtForm.UsdtPass" placeholder="请填入交易密码" type="password" name="UsdtPass" id="UsdtPass"></el-input>
          </el-form-item>
          <span style="float:right;margin-right: 27px;cursor:pointer" @click="$router.push('/AccountSet/1')">忘记密码</span>
          <el-form-item label="" style="padding-left: 70px;margin-top: 50px">
            <el-button round style="margin-left: 40px" size="long" @click="chenel()">取消保存</el-button>
            <el-button v-dbClick type="primary" round size="long" @click="submitForm()">保存设置</el-button>
          </el-form-item>
        </el-form>
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
        UsdtForm: {
          UsdtAddress: '',
          UsdtType: '',
          UsdtPass: ''
        }
      }

    },
    mounted(){
        //修改
      let self = this;
      self.UsdtForm.UsdtAddress = '';
      self.UsdtForm.UsdtType = '';
      try {
        this.$axios({
          method: "post",
          url: baseUrl + 'account/Payment/getPaymentInfo?r=' + Math.random(),
          data: {type: 'usdt'}
        }).then((result) => {
          if (until.responesValidate(result)) {
            let res = result["data"].data;
            self.UsdtForm.UsdtAddress = res.card;
            self.UsdtForm.UsdtType = res.img;
          }
        });
      } catch (ex) {
        until.consoleLog(ex);
      }
    },
    methods: {
      //验证
      formValidate()
      {
        if (!this.UsdtForm.UsdtAddress) {
          this.$message({
            showClose: true,
            duration: 4000,
            message: 'Usdt地址不能为空！',
            type: 'error'
          });
          return false;
        }
        if (this.UsdtForm.UsdtAddress.substring(0,2) != '13') {
          this.$message({
            showClose: true,
            duration: 4000,
            message: 'Usdt地址有误！',
            type: 'error'
          });
          return false;
        }
        if (this.UsdtForm.UsdtAddress.length != 34) {
          this.$message({
            showClose: true,
            duration: 4000,
            message: 'Usdt地址有误！',
            type: 'error'
          });
          return false;
        }
        if (!this.UsdtForm.UsdtType.length) {
          this.$message({
            showClose: true,
            duration: 4000,
            message: '标签不能为空！',
            type: 'error'
          });
          return false;
        }
        if (!this.UsdtForm.UsdtPass) {
          this.$message({
            showClose: true,
            duration: 4000,
            message: '交易密码不能为空！',
            type: 'error'
          });
          return false;
        }
        if (this.UsdtForm.UsdtPass.length < 6 || this.UsdtForm.UsdtPass.length > 20) {
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
      //保存
      submitForm() {
        let self = this;
        try {
          if (self.formValidate()) {
            let formData = {
              "card": self.UsdtForm.UsdtAddress,
              "tag": self.UsdtForm.UsdtType,
              "paypassword": self.UsdtForm.UsdtPass,
            }
            self.$axios({
              method: "post",
              url: baseUrl + 'account/Payment/getUpUsdtInfo?r=' + Math.random(),
              data: formData
            }).then((result) => {
              if (until.responesValidate(result)) {
                let res = result["data"];
                self.$message({
                  type: "success",
                  duration: 1000,
                  message: res.msg || "设置成功！",
                  onClose: () => {
                    // this.$router.push({path: "/index"});
                    self.$emit('sendT', 'true')
                    self.UsdtForm.UsdtAddress = '';
                    self.UsdtForm.UsdtType = '';
                    self.UsdtForm.UsdtPass = '';
                  }
                });
              }
            });
          }
        } catch (ex) {
          until.consoleLog(ex);
        }
      },
      //关闭弹窗
      chenel(){
        this.$emit('sendT', 'true')
      }
    },
    components: {}
  }

</script>

<style lang="scss" scoped>
  .el-input {
    width: 90%;
  }
</style>
