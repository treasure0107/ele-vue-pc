<template>
  <div class="realContent">
    <div class="center-main">
      <div class="formWarp">
        <el-form :model="bankForm" ref="bankForm" label-width="100px"
                 label-position="right" class="register-form">
          <el-form-item label="真实姓名">
            <el-input :disabled="true" style="margin-left: 20px;" v-model="bankForm.cardName" placeholder="请填入持卡人" name="cardName" id="cardName"></el-input>
          </el-form-item>
          <el-form-item label="开户银行" required>
            <el-select label="开户银行" style="margin-left: 20px; width: 90%" v-model="bankForm.bankName" clearable placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.text" :value="item.text">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="开户支行" required>
            <el-input style="margin-left: 20px;" v-model="bankForm.bankBranch" placeholder="请填入开户支行" name="bankBranch" id="bankBranch"></el-input>
          </el-form-item>
          <el-form-item label="银行卡号" required>
            <el-input style="margin-left: 20px;" v-model="bankForm.bankCard" placeholder="请填入银行卡号" name="bankCard" id="bankCard"></el-input>
          </el-form-item>
          <el-form-item label="交易密码" required>
            <el-input style="margin-left: 20px;" v-model="bankForm.cardPass" placeholder="请填入交易密码" type="password" name="cardPass" id="cardPass"></el-input>
            <span style="margin-left: 421px;cursor:pointer" @click="$router.push('/AccountSet/1')">忘记密码</span>
          </el-form-item>
          <el-form-item label="" style="padding-left: 70px;margin-top: 30px">
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
  import bankList from "@/scripts/bankList";
  import {baseUrl} from "@/config/env";
  export default {
    data(){
      return {
        bankForm: {
          cardName: window.localStorage.getItem('nickname'),
          bankName: '',
          bankBranch: '',
          bankCard: '',
          cardPass: '',
        },
        options: []
      }
    },
    mounted(){
      //修改
      let self = this;
      self.options = bankList.returnBankList();
      try {
        this.$axios({
          method: "post",
          url: baseUrl + 'account/Payment/getPaymentInfo?r=' + Math.random(),
          data: {type: 'bank'}
        }).then((result) => {
          if (until.responesValidate(result)) {
            let res = result["data"].data;
            self.bankForm.bankName = res.bankname;
            self.bankForm.bankBranch = res.bankaddr;
            self.bankForm.bankCard = res.card;
            self.bankForm.cardPass = res.paypassword;
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
        if (!this.bankForm.bankName) {
          this.$message({
            showClose: true,
            duration: 4000,
            message: '开户银行不能为空！',
            type: 'error'
          });
          return false;
        }
        if (!this.bankForm.bankBranch) {
          this.$message({
            showClose: true,
            duration: 4000,
            message: '开户支行不能为空！',
            type: 'error'
          });
          return false;
        }
        if (!until.isChina(this.bankForm.bankBranch || '')) {
          this.$message({
            showClose: true,
            duration: 4000,
            message: '银行支行只能输入中文！',
            type: 'error'
          });
          return false;
        }
        if (!this.bankForm.bankCard) {
          this.$message({
            showClose: true,
            duration: 4000,
            message: '银行卡号不能为空！',
            type: 'error'
          });
          return false;
        }
        if (this.bankForm.bankCard.length < 16 || this.bankForm.bankCard.length > 19) {
          this.$message({
            showClose: true,
            duration: 4000,
            message: '银行卡必须为16-19个字符！',
            type: 'error'
          });
          return false;
        }
        if (!until.isCard(this.bankForm.bankCard || '')) {
          this.$message({
            showClose: true,
            duration: 4000,
            message: '银行卡格式有误！',
            type: 'error'
          });
          return false;
        }
        if (!this.bankForm.cardPass) {
          this.$message({
            showClose: true,
            duration: 4000,
            message: '交易密码不能为空！',
            type: 'error'
          });
          return false;
        }
        if (this.bankForm.cardPass.length < 6 || this.bankForm.cardPass.length > 20) {
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
              "bankname": self.bankForm.bankName,
              "bankaddr": self.bankForm.bankBranch,
              "card": self.bankForm.bankCard,
              "paypassword": self.bankForm.cardPass,
            }
            self.$axios({
              method: "post",
              url: baseUrl + 'account/Payment/getUpbankInfo?r=' + Math.random(),
              data: formData
            }).then((result) => {
              let res = result["data"];
              if (res.code == 1) {
                self.$message({
                  type: "success",
                  duration: 1000,
                  message: result.data.msg || "找回密码成功！",
                  onClose: () => {
                    // this.$router.push({path: "/index"});
                    self.$emit('sendT', 'true')
                  }
                });
              } else {
                self.$message({
                  type: "error",
                  duration: 3000,
                  message: result.data.msg || "找回密码失败！"
                });
              }
              self.bankForm.bankName = '';
              self.bankForm.bankBranch = '';
              self.bankForm.bankCard = '';
              self.bankForm.cardPass = '';
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
