<template>
  <div class="center-main">
    <!--账户设置-->
    <div>
      <h1 class="center-title">账户设置 </h1><span class="center-title-c">账户安全设置、头像等</span>
    </div>
    <!--用户头像-->
    <div class="msg-box clearFix">
      <div class="head">
        <img :src="avatarPhoto" alt="" class="headImg">
        <img class="camera" @click="cameraPhoto" src="../../../assets/camera-img.png" alt=""/>
      </div>
      <div class="user-msg-account">
        <span class="tel">{{userName}}</span>
        <span class="id">ID&nbsp;&nbsp;{{userId}}</span>
      </div>
    </div>
    <!--实名认证-->
    <div class="account-rows clearFix">
      <div class="collect-kind fl">
        <img src="./../../../assets/realName-img.png" alt="" class="icon"/>
        <span class="name">实名认证</span>
      </div>
      <span class="set-state fl" v-if="approveStatus==0">实名中 </span>
      <span class="set-state fl" v-if="approveStatus==1">已认证 </span>
      <span class="set-state fl" v-if="approveStatus==2">认证失败 </span>
      <span class="set-state fl" v-if="approveStatus==3">未认证 </span>
      <a href="javascript:void(0);" class="link-btn fr" @click="realNameBtn"
         v-if="approveStatus==2 || approveStatus==3">去认证</a>
    </div>
    <!--手机绑定-->
    <div class="account-rows clearFix" v-if="mobileBinding">
      <div class="collect-kind fl">
        <img src="./../../../assets/mobilephone_fill.png" alt="" class="icon"/>
        <span class="name">手机绑定</span>
      </div>
      <span class="set-state fl">{{mobile}}</span>
    </div>
    <!--邮箱绑定-->
    <div class="account-rows clearFix" v-if="emailAddress">
      <div class="collect-kind fl">
        <img src="./../../../assets/mail_fill.png" alt="" class="icon"/>
        <span class="name">邮箱绑定</span>
      </div>
      <span class="set-state fl">{{email}}</span>
    </div>
    <!--登陆密码-->
    <div class="account-rows clearFix">
      <div class="collect-kind fl">
        <img src="./../../../assets/password-img.png" alt="" class="icon"/>
        <span class="name">登录密码</span>
      </div>
      <span class="set-state fl">已设置</span>
      <a class="link-btn fr" @click="passwordSet">修改</a>
    </div>
    <!--交易密码-->
    <div class="account-rows clearFix">
      <div class="collect-kind fl">
        <img src="./../../../assets/pay-password-img.png" alt="" class="icon"/>
        <span class="name">交易密码</span>
      </div>
      <div v-if="payPasswordStatus==0">
        <span class="set-state fl">未设置</span>
        <a href="javascript:void(0);" class="link-btn fr" @click="payPsdSet">设置</a>
      </div>
      <div v-if="payPasswordStatus==1">
        <span class="set-state fl">已设置</span>
        <a href="javascript:void(0);" class="link-btn fr" @click="payPsdUpdate">修改</a>
      </div>
    </div>
    <!--注销账户-->
    <!--<div class="account-rows clearFix">-->
      <!--<div class="collect-kind fl">-->
        <!--<img src="./../../../assets/loginOut-img.png" alt="" class="icon"/>-->
        <!--<span class="name">注销账户</span>-->
      <!--</div>-->
      <!--<a href="#" class="link-btn set-state fl" @click="logoutConditions">查看注销条件</a>-->
      <!--<a class="link-btn fr" @click="loginOut">申请注销</a>-->
    <!--</div>-->
    <!---------------------------------------------------------------------------------------------->
    <!--设置头像-->
    <el-dialog title="设置头像" class="head-photo-modal" width="650px" :visible.sync="dialogHeadPortraitVisible">
      <HeadportraitSet @sendEditAvatar="showEditAvatar"></HeadportraitSet>
    </el-dialog>
    <!--去认证-->   <!--<real-name @sendT="showFn"></real-name>-->
    <el-dialog title="实名认证" custom-class="real-name-main" width="600px" :visible.sync="dialogRealNameVisible">
      <div class="realContent">
        <el-form :model="realName" label-width="100px">
          <el-form-item label="国籍">
            <el-input v-model="realName.userCountry" placeholder="请输入内容" class="realInput" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="真实姓名" required>
            <el-input v-model="realName.realUserName" placeholder="请输入内容" class="realInput"></el-input>
          </el-form-item>
          <el-form-item label="证件号码" required>
            <el-input v-model="realName.idNumber" placeholder="请输入内容" class="realInput"></el-input>
          </el-form-item>
          <el-form-item label="证件正面照" required class="uploadIdentification" v-if="typeStatus">
            <el-upload
              drag
              class="upload-demo"
              :action="upLoadImg"
              :on-success="handleIdentificationSuccess"
              :before-upload="beforeAvatarUpload"
              :limit=1
              list-type="picture">
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="证件反面照" required class="uploadIdentification" v-if="typeStatus">
            <el-upload
              drag
              class="upload-demo"
              :action="upLoadImg"
              :before-upload="beforeAvatarUpload"
              :on-success="reverseHandleIdentificationSuccess"
              :limit=1
              list-type="picture">
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
        </el-form>
      </div>
      <footer slot="footer" class="dialog-footer">
        <el-button @click="dialogRealNameVisible = false">取 消</el-button>
        <el-button type="primary" v-dbClick @click="SubmitCertification">提交认证</el-button>
      </footer>
    </el-dialog>
    <!--修改登录密码-->  <!--<password-set></password-set>-->
    <el-dialog title="修改登录密码" custom-class="password-set-main" width="612px" :visible.sync="dialogPsdVisible">
      <div class="updateContent">
        <h3>您已绑定的账户 <span v-if="mobile">{{mobile}}</span><span v-if="email">{{email}}</span></h3>
        <el-form :model="updateLoginPassword" label-width="100px">
          <el-form-item label="验证码" style="position:relative;" required>
            <el-input v-model="updateLoginPassword.securityCode" placeholder="请输入验证码" class="update-input"></el-input>
            <button v-dbClick class="default-class send-btn" @click.stop="sendMsgCode" v-show="!sendMsgDisabled">点击获取
            </button>
            <span class="disabled-class send-btn" v-show="sendMsgDisabled">{{time + 's'}}</span>
          </el-form-item>
          <el-form-item label="新密码" required>
            <el-input v-model="updateLoginPassword.password" type="password" placeholder="请输入登录密码"
                      class="update-input"></el-input>
          </el-form-item>
          <el-form-item label="确认新密码" required>
            <el-input v-model="updateLoginPassword.surePassword" type="password" placeholder="请确认新密码"
                      class="update-input"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <footer slot="footer" class="dialog-footer">
        <el-button @click="dialogPsdVisible = false">返 回</el-button>
        <el-button type="primary" v-dbClick @click="ChangeLoginPassword">完 成</el-button>
      </footer>
    </el-dialog>
    <!--设置交易密码-->
    <el-dialog title="设置交易密码" custom-class="pay-password-set" width="598px" :visible.sync="dialogPayPsdVisible">
      <payPassword-set @setPayPasswordCancel="showPayPsdVisible"></payPassword-set>
    </el-dialog>
    <!--修改交易密码-->
    <el-dialog title="修改交易密码" custom-class="payPassword-set-main" width="612px"
               :visible.sync="dialogUpdatePayPsdVisible">
      <update-payPwd @sendPayT="showUpdatePay"></update-payPwd>
    </el-dialog>
    <!--查看注销条件-->
    <el-dialog title="申请注销条件" custom-class="logout-model" width="496px" :visible.sync="dialogLogoutConsVisible">
      <div class="LogoutCon">&nbsp;&nbsp;&nbsp;{{cancellationContent}}</div>
      <footer slot="footer" class="dialog-footer">
        <el-button v-dbClick type="primary" @click="dialogLogoutConsVisible = false">我已阅读并申请注销</el-button>
      </footer>
    </el-dialog>
    <!--申请注销-->
    <el-dialog title="申请注销" custom-class="login-out-set" width="476px" :visible.sync="dialogLoginOutVisible">
      <login-out @trueLoginOutCancel="showLoginOutVisible" @forgetLoginOutCancel="forgetLoginOutVisible"></login-out>
    </el-dialog>
  </div>
</template>
<script type="text/babel">
  import UpdatePayPwd from "@/views/UserCenter/AccountSet/UpdatePayPwd";
  import PayPasswordSet from "@/views/UserCenter/AccountSet/SetPayPwd";
  import LoginOut from "@/views/UserCenter/AccountSet/LoginOut";
  import HeadportraitSet from "@/views/UserCenter/AccountSet/HeadportraitSet";
  import until from "@/scripts/until";
  import {baseUrl} from "@/config/env";
  export default {
    data(){
      return {
        dialogRealNameVisible: false,
        dialogPsdVisible: false,
        dialogPayPsdVisible: false,
        dialogLogoutConsVisible: false,
        dialogLoginOutVisible: false,
        dialogHeadPortraitVisible: false,
        dialogUpdatePayPsdVisible: false,
        upLoadImg: baseUrl + "Common/upload",
        certificateImageUrl: '',
        reverseCertificateImageUrl:'',
        typeStatus:false,
        userName: '',  //用户名
        userId: '',    //用户ID
        avatarPhoto: '',  //用户头像
        userInfo: {},
        approveStatus: '',
        payPasswordStatus: '',
        mobile: '',
        email: '',
        emailAddress: true,
        mobileBinding: true,
        imageUrl: '', //头像设置
        setPassword: '',
        surePassword: '',
        cancellationContent: '',  //注销条件
        time: 59,
        sendMsgDisabled: false,
        updateLoginPassword: {
          password: '',
          surePassword: '',
          securityCode: '',
        },
        realName: {
          nationality: '',
          realUserName: '',
          idNumber: '',
        },
      }
    },
    mounted(){
      var type = this.$route.params.type;
      if (type) {
        this.dialogUpdatePayPsdVisible = true;
      }
      if (window.localStorage.getItem("UserInfo")) {
        let userNews = JSON.parse(window.localStorage.getItem("UserInfo"));
        this.userName = userNews.userinfo.username;
        this.userId = userNews.userinfo.user_id;
        this.mobile = this.formatPhone(userNews.userinfo.mobile);
        if (userNews.userinfo.email) {
          this.email = this.formatEmail(userNews.userinfo.email);
        }
        if (userNews.userinfo.avatar) {
          this.avatarPhoto = userNews.userinfo.avatar;
        }
      }
      this.getUserInfo();
    },
    methods: {
      handleIdentificationSuccess(res) {
        this.certificateImageUrl=res.data.url;
      },
      reverseHandleIdentificationSuccess(res){
        this.reverseCertificateImageUrl=res.data.url;
      },
      beforeAvatarUpload(file){
        const isJPG = (file.type === 'image/jpeg') || (file.type === 'image/png');
        let isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error('上传图片只能是 JPG或 PNG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      getUserInfo(){  //获取用户信息
        try {
          let url = baseUrl + "friends/getProfile";
          let config = {
            method: "POST",
            url: url + "?r=" + Math.random(),
          };
          this.$axios(config).then(res => {
            if (res.data.code) {
              let userInfoOld = JSON.parse(window.localStorage.getItem("UserInfo"));
              let approvestatus = res.data.data.approvestatus;  //实名状态（0-实名中，1-已认证，2-认证失败，3——未实名）
              let paypassword = res.data.data.paypassword;   //密码设置状态 {0-未设置，1-已设置}
              this.approveStatus = approvestatus;
              this.payPasswordStatus = paypassword;
              this.realName.userCountry = res.data.data.country;
              this.userId = res.data.data.uuid;
              if(res.data.data.type==0){
                this.typeStatus=false;   //实名认证 判断是否是国内外
              }
              if(res.data.data.type==1){
                this.typeStatus=true;
              }
              if (res.data.data.nickname) {
                this.userName = res.data.data.nickname;
              }
              if (res.data.data.avatar) {
                this.avatarPhoto = res.data.data.avatar;
                userInfoOld.userinfo.avatar = res.data.data.avatar;
              }

              window.localStorage.setItem("UserInfo", JSON.stringify(userInfoOld));
              if (res.data.data.email) {
                this.email = this.formatEmail(res.data.data.email);
                this.emailAddress = true;
              } else {
                this.emailAddress = false;
              }
              if (res.data.data.mobile) {
                this.mobile = this.formatPhone(res.data.data.mobile);
                this.mobileBinding = true;
              } else {
                this.mobileBinding = false;
              }
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
      formatPhone(phone) {
        return phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
      },
      formatEmail(email) {
        return email.replace(/(.{2}).+(.{2}@.+)/g, "$1****$2");
      },
      formValidate(type){
        if (type == 'realName') {
          if (this.realName.realUserName.length == 0) {
            this.$message({
              showClose: true,
              duration: 4000,
              message: '真实姓名不能为空！',
              type: 'error'
            });
            return false;
          }
          if (this.realName.idNumber.length == 0) {
            this.$message({
              showClose: true,
              duration: 4000,
              message: '证件号码不能为空！',
              type: 'error'
            });
            return false;
          }
        }
        if (type == 'updateLoginPassword') {
          if (this.updateLoginPassword.securityCode.length == 0) {
            this.$message({
              showClose: true,
              duration: 3000,
              message: '验证码不能为空！',
              type: 'error'
            });
            return false;
          }
          if (this.updateLoginPassword.securityCode.length < 6) {
            this.$message({
              showClose: true,
              duration: 3000,
              message: '验证码輸入不合格！',
              type: 'error'
            });
            return false;
          }
          if (this.updateLoginPassword.password.length == 0) {
            this.$message({
              showClose: true,
              duration: 3000,
              message: '密码不能为空！',
              type: 'error'
            });
            return false;
          }
          if (this.updateLoginPassword.surePassword.length == 0) {
            this.$message({
              showClose: true,
              duration: 3000,
              message: '确认密码不能为空！',
              type: 'error'
            });
            return false;
          }
          if (this.updateLoginPassword.password.length <= 5) {
            this.$message({
              showClose: true,
              duration: 3000,
              message: '密码輸入不合格！',
              type: 'error'
            });
            return false;
          }
          if (this.updateLoginPassword.password != this.updateLoginPassword.surePassword) {
            this.$message({
              showClose: true,
              duration: 3000,
              message: '密码和确认密码不一致！',
              type: 'error'
            });
            return false;
          }
        }
        return true;
      },
      sendMsgCode(){     //发送短信验证吗
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
      intervalTimerSend(){
        let _this = this;
//        _this.sendMsgDisabled = true;
        let interval = window.setInterval(function () {
          if ((_this.time--) <= 1) {
            _this.time = 60;
            _this.sendMsgDisabled = false;
            window.clearInterval(interval);
          }
        }, 1000);
      },
      ChangeLoginPassword(){  //提交修改登录密码
        try {
          if (this.formValidate('updateLoginPassword')) {
            let password = this.updateLoginPassword.password;
            let verify_code = this.updateLoginPassword.securityCode;
            let url = baseUrl + "account/account/editpassword";
            let config = {
              method: "POST",
              url: url + "?r=" + Math.random(),
              data: {
                password: password,
                verify_code: verify_code
              }
            };
            this.$axios(config).then(res => {
              if (res.data.code) {
                this.$message({
                  type: "success",
                  duration: 1000,
                  message: res.data.msg || "登录成功！",
                  onClose: () => {
                    this.dialogPsdVisible = false;
                    this.$router.push('/login');
                  }
                });

              } else {
                this.$message({
                  showClose: true,
                  duration: 1000,
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
      cameraPhoto(){  //编辑头像
        this.dialogHeadPortraitVisible = true;
      },
      realNameBtn(){  //去认证
        this.dialogRealNameVisible = true;
      },
      SubmitCertification(){  //提交去认证的信息
        try {
          if (this.formValidate('realName')) {
            let url = baseUrl + "account/account/addapprove";
            let nickname = this.realName.realUserName;
            let authcard = this.realName.idNumber;
            let faceimg=this.certificateImageUrl;    //正面照片
            let handimg=this.reverseCertificateImageUrl;    //反面照片
            let config = {
              method: "POST",
              url: url + "?r=" + Math.random(),
              data: {
                nickname: nickname,
                authcard: authcard,
                faceimg:faceimg,
                handimg:handimg
              }
            };
            this.$axios(config).then(res => {
              if (res.data.code) {
                this.$message({
                  type: "success",
                  duration: 1000,
                  message: res.data.msg || "操作成功！",
                  onClose: () => {
                    this.getUserInfo();
                    this.dialogRealNameVisible = false;
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
      passwordSet(){  //修改登录密码 payPwdSet
        this.dialogPsdVisible = true;
      },
      payPsdSet(){  //交易密码
        this.dialogPayPsdVisible = true;
      },
      logoutConditions(){  //查看注销条件
        try {
          let url = baseUrl + "account/account/getcanceltext";
          let config = {
            method: "POST",
            url: url + "?r=" + Math.random(),
          };
          this.$axios(config).then(res => {
            this.cancellationContent = res.data.data.text;
            if (res.data.code) {
              this.dialogLogoutConsVisible = true;
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
      loginOut(){  //申请注销
        this.dialogLoginOutVisible = true;
      },
      payPsdUpdate(){
        this.dialogUpdatePayPsdVisible = true;
      },
      showUpdatePay(){  //更改交易密码（隐藏弹窗）
        this.dialogUpdatePayPsdVisible = false;
      },
      showEditAvatar(){
        this.getUserInfo();
        this.dialogHeadPortraitVisible = false;
      },
      showPayPsdVisible(){
        this.getUserInfo();
        this.dialogPayPsdVisible = false;
      },
      showLoginOutVisible(){
        this.dialogLoginOutVisible = false;
      },
      forgetLoginOutVisible(){
        this.dialogLoginOutVisible = false;
        setTimeout(() => {
          this.dialogUpdatePayPsdVisible = true;
        }, 600);
      }
    },
    components: {
      LoginOut,
      PayPasswordSet,
      HeadportraitSet,
      UpdatePayPwd
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../../styles/mixin";
.el-upload__tip{
  width:300px;
  height:12px;
  font-size:12px;
  font-family:MicrosoftYaHei;
  color:rgba(153,153,153,1);
  line-height:20px;
}
  .center-main {
    padding-top: 50px;
    padding-left: 40px;
    padding-right: 40px;
  }

  .center-title {
    display: inline-block;
    padding-bottom: 23px;
  }

  .el-dialog__title {
    font-weight: bold;
    font-size: 20px;
    height: 20px;
    color: rgba(51, 51, 51, 1);
    line-height: 30px;
  }

  .LogoutCon {
    font-size: 14px;
    padding: 0 16px;
    line-height: 24px;
    color: #333;
    letter-spacing: 0.05em;
  }

  /*center-title-c*/
  .center-title-c {
    font-size: 16px;
    color: rgba(153, 153, 153, 1);
    margin-left: 26px;
  }

  .msg-box {
    width: 155px;
    padding-bottom: 25px;
    .head, .user-msg-account {
      float: left;
    }

    .head {
      width: 42px;
      height: 42px;
      position: relative;
      .headImg {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
      .camera {
        position: absolute;
        right: -3px;
        bottom: -3px;
        width: 18px;
        height: 18px;
      }
    }
    .user-msg-account {
      width: 85px;
      padding-left: 15px;
      span {
        display: inline-block;
        text-align: left;
        height: 22px;
        line-height: 22px;
      }
      span.tel {
        @include sc(14px, #333333);
      }
      span.id {
        @include sc(12px, #333333);
      }
    }
  }

  .account-rows {
    padding-top: 15px;
    padding-bottom: 15px;
    border-bottom: 1px solid #F4F4F4;
    @include sc(14px, #333333);
    position: relative;
    .collect-kind {
      display: table-cell;
      img.icon, span.name {
        vertical-align: middle;
      }
      img.icon {
        max-height: 28px;
        /*border-radius: 50%;*/
      }
      span.name {
        padding-left: 12px;
      }
    }
    .link-btn, .set-state {
      display: inline-block;
      height: 30px;
      line-height: 30px;
    }
    .set-state {
      width: 100px;
      @include allcover();
      color: rgba(153, 153, 153, 1);
      top: 13px;
      left: 215px;
    }
    .link-btn {
      color: #5357e2;
    }
  }

  /*实名认证*/
  .realContent {
    .real-tit {
      display: inline-block;
      width: 100px;
      height: 13px;
      font-size: 14px;
      padding-right: 30px;
      font-family: MicrosoftYaHei;
      color: #999;
      line-height: 20px;
      text-align: right;
    }
    .realInput {
      display: inline-block;
      /*width: 380px;*/
      width: 90%;
      height: 40px;
    }
  }

  /*修改登录密码*/
  .updateContent {
    h3 {
      font-size: 14px;
      text-align: center;
      color: #333;
      margin-bottom: 30px;
    }
    .update-input {
      width: 90%;
    }
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
  }
</style>
<style>
 .uploadIdentification .upload-demo{
   line-height: 0;
  }
  .uploadIdentification .el-upload{
    width: 100%;
    line-height: 40px;
  }
.uploadIdentification .el-upload-list__item{
  width: 413px;
}
  .uploadIdentification .el-upload-dragger {
    width: 413px;
    height:40px;
    border: 1px solid #d9d9d9;
  }
  /*------实名认证-----*/
  .real-name-main .el-dialog__header {
    text-align: left;
  }

  .real-name-main .el-dialog__body {
    padding-bottom: 0;
  }

  .real-name-main .el-form-item {
    margin-bottom: 30px;
  }

  .real-name-main .el-dialog__title {
    font-weight: bold;
    font-size: 20px;
    color: #333;
  }

  .real-name-main .dialog-footer {
    text-align: center;
  }

  .real-name-main .el-button {
    width: 180px;
    height: 39px;
    border-radius: 20px;
  }

  .real-name-main .el-button--default {
    border: 1px solid #999;
    margin-right: 30px;
  }

  .real-name-main .el-button--primary {
    background-color: #2E6AF4;
  }

  /*---实名认证（end）---*/

  /*查看注销条件*/
  .logout-model .el-dialog__title {
    font-weight: bold;
    font-size: 20px;
    color: #333;
  }

  .logout-model .dialog-footer {
    text-align: center;
  }

  .logout-model .el-button {
    width: 180px;
    height: 40px;
    border-radius: 20px;
  }

  .logout-model .el-button--primary {
    background-color: #2E6AF4;
  }

  /*---查看注销条件（end）---*/

  /*修改登录设置*/
  .password-set-main .el-dialog__body {
    padding-bottom: 0;
  }

  .password-set-main .el-form-item {
    margin-bottom: 40px;
  }

  .password-set-main .el-dialog__title {
    font-weight: bold;
    font-size: 20px;
    color: #333;
  }

  .password-set-main .dialog-footer {
    text-align: center;
  }

  .password-set-main .el-button {
    width: 180px;
    height: 39px;
    border-radius: 20px;
  }

  .password-set-main .el-button--default {
    border: 1px solid #999;
    margin-right: 30px;
    color: #333;
  }

  .password-set-main .el-button--primary {
    background-color: #2E6AF4;
  }

  .updateContent .el-input-group__append {
    background-color: #fff;
    border: none;
    position: absolute;
    right: 0;
    top: 0;
  }

  .updateContent. .el-dialog__headerbtn {
    width: 15px;
    height: 16px;
    font-size: 16px;
    color: #666;

  }

  /*修改登录设置（end）*/
</style>
