<template>
  <div class="realContent">
    <div class="center-main">
      <div class="formWarp">
        <el-form :model="alipayForm" ref="alipayForm" label-width="100px"
                 label-position="right" class="register-form">
          <el-form-item label="真实姓名">
            <el-input :disabled="true" style="margin-left: 20px;" v-model="alipayForm.cardName" placeholder="请填入持卡人" name="cardName" id="cardName"></el-input>
          </el-form-item>
          <el-form-item label="支付宝账号" required>
            <el-input style="margin-left: 20px;" v-model="alipayForm.alipayCode" placeholder="请填入支付宝账号" name="alipayCode" id="alipayCode"></el-input>
          </el-form-item>
          <el-form-item label="二维码上传" required>
            <el-upload
              class="avatar-uploader"
              :action="uploadPath"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="CardFrontFileUrl" :src="CardFrontFileUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              <div v-if="!CardFrontFileUrl" class="tup">
                <p style="color:#616F91">点击上传支付宝二维码收款图片</p>
                <p style="color:#999">（支持JPG/PNG 100K以内）</p>
              </div>
            </el-upload>
          </el-form-item>
          <el-form-item label="交易密码" required>
            <el-input style="margin-left: 20px;" v-model="alipayForm.alipayPass" placeholder="请填入交易密码" type="password" name="alipayPass" id="alipayPass"></el-input>
          </el-form-item>
          <span style="float:right;margin-right: 27px;cursor:pointer" @click="$router.push('/AccountSet/1')">忘记密码</span>
          <el-form-item label="" style="padding-left: 70px;margin-top: 50px">
            <el-button round style="margin-left: 40px" @click="chenel()" size="long">取消保存</el-button>
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
        alipayForm: {
          cardName: window.localStorage.getItem('nickname'),
          alipayCode: '',
          QRcode: '',
          alipayPass: ''
        },
        CardFrontFileName: '',
        CardFrontFileUrl: '',
        uploadPath:baseUrl +'Common/upload'
      }

    },
    mounted(){
      //修改
      let self = this;
      try {
        this.$axios({
          method: "post",
          url: baseUrl + 'account/Payment/getPaymentInfo?r=' + Math.random(),
          data: {type: 'alipay'}
        }).then((result) => {
          if (until.responesValidate(result)) {
            let res = result["data"].data;
            self.alipayForm.alipayCode = res.card;
            self.CardFrontFileUrl = res.img;
            self.CardFrontFileName = res.img;
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
        if (!until.isAlipay(this.alipayForm.alipayCode || '')) {
          this.$message({
            showClose: true,
            duration: 4000,
            message: '支付宝账号格式有误！',
            type: 'error'
          });
          return false;
        }
        if (!this.alipayForm.alipayCode) {
          this.$message({
            showClose: true,
            duration: 4000,
            message: '支付宝账号不能为空！',
            type: 'error'
          });
          return false;
        }
        if (!this.CardFrontFileUrl) {
          this.$message({
            showClose: true,
            duration: 4000,
            message: '图片不能为空！',
            type: 'error'
          });
          return false;
        }
        if (!this.alipayForm.alipayPass) {
          this.$message({
            showClose: true,
            duration: 4000,
            message: '交易密码不能为空！',
            type: 'error'
          });
          return false;
        }
        if (this.alipayForm.alipayPass.length < 6 || this.alipayForm.alipayPass.length > 20) {
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
              "img": self.CardFrontFileName,
              "card": self.alipayForm.alipayCode,
              "paypassword": self.alipayForm.alipayPass,
            }
            self.$axios({
              method: "post",
              url: baseUrl + 'account/Payment/getUpAlipayInfo?r=' + Math.random(),
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
                    self.alipayForm.alipayCode = '';
                    self.CardFrontFileName = '';
                    self.CardFrontFileUrl = '';
                    self.alipayForm.alipayPass = '';
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
      },
      //图片上传
      handleAvatarSuccess(res, file) {
        this.CardFrontFileUrl=URL.createObjectURL(file.raw);
        this.CardFrontFileName=res.data.url;
      },
      beforeAvatarUpload(file) {
        const isJPG = (file.type === 'image/jpeg')||(file.type === 'image/png');
        const isLt2M = file.size / 1024 / 1024 < 8;

        if (!isJPG) {
          this.$message.error('上传图片只能是 JPG或PNG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 8MB!');
        }
        return isJPG && isLt2M;
      },
    },
    components: {}
  }

</script>

<style lang="scss" scoped>
  .el-input {
    width: 90%;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    border: 1px dashed #F0F0F0;
    margin-left: 20px;
    font-size: 28px;
    color: #8c939d;
    width: 457px;
    height: 123px;
    line-height: 123px;
    text-align: center;
  }
  .avatar {
    width: 125px;
    height: 125px;
    display: block;
    margin-left: 20px;
  }
  .avatar-uploader .el-upload.el-upload--text {
    border: 1px dashed #d9d9d9!important;
  }
  .tup {
    position: absolute;
    left:157px;
    top:26px;
    background: #fff;
  }
  .tup p {
    margin-bottom: 0;
    height: 25px;
  }
</style>
