<template>
  <div class="register-wrap">
    <div class="container  clearFix">
      <div class="register-mbg fl"></div>
      <div class="register-form fl">
        <h3 class="title">欢迎注册</h3>
        <!--步骤-->
        <div class="steps-wrap">
          <span class="active" index="1" ref="setPhoneEmail">1{{tabTit}}</span>
          <!--<span class="active" index="1" ref="setPhoneEmail">1.手机/邮箱验证</span>-->
          <span index="2" ref="goSetPassword">2.设置密码</span>
        </div>
        <!--1.手机/邮箱验证-->
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="form-pannel" v-show="ruleFormStatus">
          <el-form-item prop="country">
            <el-select v-model="ruleForm.country" placeholder="国籍" @change="countryAccount()" class="el-select-re">
              <el-option
                v-for="item in countryList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="Account">
            <el-input v-model="ruleForm.Account" :placeholder="placeholderPhoneEmail" name="Account" id="txtAccount"
                      :disabled="AccountDisabled"></el-input>
          </el-form-item>
          <el-form-item prop="imgCode">
            <el-input v-model="ruleForm.ImgCode" placeholder="图形验证码" class="txt-code" name="ImgCode"></el-input>
            <img :src="ImgCode" alt="" class="img-code" @click.stop="changeImgCode();" id="ImgCode"/>
          </el-form-item>
          <el-form-item prop="code" v-show="isPhoneNum">
            <el-input v-model="ruleForm.VerifyCodePhone" :placeholder="messageCode" class="txt-code"
                      name="VerifyCode"></el-input>
            <el-button class="default-class send-btn" v-dbClick @click.stop="sendMsgCode();" v-if="!sendMsgDisabled">
              点击获取
            </el-button>
            <el-button class="default-class send-btn" style="background-color: #ccc!important;" v-if="sendMsgDisabled">
              {{time + 's'}}
            </el-button>
          </el-form-item>
          <el-form-item>
            <button v-dbClick type="button" class="set-btn" @click="submitFormSet();">去设置密码</button>
          </el-form-item>
        </el-form>

        <!--2.设置密码-->
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="form-pannel form-pannel"
                 v-show="!ruleFormStatus">
          <el-form-item prop="password">
            <el-input v-model="ruleForm.LoginPwd" placeholder="设置密码" type="password" @input="pwdStrong()"></el-input>
          </el-form-item>

          <el-form-item>
            <el-input v-model="ruleForm.surePwd" placeholder="确认密码" type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="ruleForm.recommendCode" placeholder="推荐码（选填）" :disabled="baseFormDisabled"></el-input>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="ruleForm.checked" name="ReferralCode">我已阅读并同意</el-checkbox>
            <a href="javascript:void(0);" style="color:#409EFF;" @click="agreementContent">《用户协议》</a>
          </el-form-item>
          <!--<el-form-item v-show="strengthShow">-->
          <!--<i class="el-icon-warning"></i>登录密码必须6~20位，包括数字、大小写字母、特殊字符。-->
          <!--<p class='strength'>-->
          <!--<span :class="{on:strength == 1}">不合格</span><span :class="{on:strength == 2}">弱</span><span-->
          <!--:class="{on:strength == 3}">中</span><span :class="{on:strength == 4}">强</span>-->
          <!--</p>-->
          <!--</el-form-item>-->
          <el-form-item>
            <button class="set-btn" v-dbClick @click="submitForm();">注册</button>
          </el-form-item>
        </el-form>
        <div class="to-login-wrap">
          <router-link to="/login" class="to-login">立即登录</router-link>
        </div>
      </div>
      <!--弹窗-->
      <el-dialog
        title=""
        :visible.sync="centerDialogRegisterVisible"
        width="546px"
        height="666px"
        center class="login-btn-modal">
        <p><img src="./../../assets/register-login-icon.png" alt="" class="icon"/></p>
        <p style="margin-top: 20px;">恭喜您注册成功</p>
        <p>您的登录账号是：{{username}}</p>
        <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="loginBtn" class="login-btn">立即登录</el-button>
  </span>
      </el-dialog>

      <!--用户协议-->
      <el-dialog
        :title="agreementTitle"
        :visible.sync="dialogAgreementVisible"
        width="46%"
        center>
        <div class="userAgreementMain" v-html="userAgreementContent">{{userAgreementContent}}</div>
        <footer slot="footer" class="dialog-footer">
          <!--<el-button @click="dialogAgreementVisible = false">取 消</el-button>-->
          <el-button type="primary" @click="dialogAgreementVisible = false" style="width: 100px;">关 闭</el-button>
        </footer>
      </el-dialog>
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
        countryList: [],
        AccountDisabled: false,
        telSendShow: false,
        isPhoneNum: false,
        ImgCode: "",
//        imgCodeKey:'',  //图形验证码key
        ruleFormStatus: true,  //true
        strengthShow: false,
        centerDialogRegisterVisible: false,
        dialogAgreementVisible: false,
        sendMsgDisabled: false,
        baseFormDisabled: false,  //推荐吗禁用状态
        time: 59,
        strength: 1,
        placeholderPhoneEmail: '手机号码',
        tabTit: '手机验证',
        messageCode: '短信验证码',
        tokenReg: '',
        username: '',
        ruleForm: {
          AreaCode: '86',
          Account: '',
          country: '',
          name: '',
          ImgCode: '',      //图形验证码
          imgCodeKey: '',  //图形验证码key
          code: '',
          mobile: '',
          LoginPwd: '',
          surePwd: '',
          recommendCode: '',
          VerifyCodePhone: '',
          VerifyCodeEmail: ''
        },
        rules: {
          country: [
//            {required: true, message: '请选择所在国籍！', trigger: 'blur'},
          ],
          Account: [
//            {required: true, message: '请输入账号信息！', trigger: 'blur'},
//            { validator: validateAccount, trigger: "blur" }
          ],
        },
        activeName: "first",
        active: 0,
        userAgreementContent: '',
        agreementTitle: ''
      }
    },

    mounted(){
      var _this = this;
      this.getCountryList();  //获取国家
      this.$nextTick().then(() => {
        $("input[name=Account]").on({
          keyup: function () {
            _this.checkAcount($(this).val())
          },
          blur: function () {
            _this.checkAcount($(this).val())
          },
          change: function () {
            _this.checkAcount($(this).val())
          }
        });
      });
      this.userAgreement();
      this.changeImgCode();  //图形验证码
      this.getUrlType();      //
    },
    methods: {
      getUrlType(){
        var url = window.location.href; //获取url中"?"符后的字串
        var strs = '';
        if (url.indexOf("?") != -1) {    //判断是否有参数
          var str = url.substr(1); //从第一个字符开始 因为第0个是?号 获取所有除问号的所有符串
          strs = str.split("=");   //用等号进行分隔 （因为知道只有一个参数 所以直接用等号进分隔 如果有多个参数 要用&号分隔 再用等号进行分隔）
//          alert(strs[1]);          //直接弹出第一个参数 （如果有多个参数 还要进行循环的）
        }
        //        return strs[1];
        if (strs[1]) {
          this.ruleForm.recommendCode = strs[1];
          this.baseFormDisabled = true;
        }
      },
      changeImgCode(){      //刷新验证码
        try {
          let url = baseUrl + "common/getcaptcha";
          let config = {
            method: "POST",
            url: url + "?r=" + Math.random()
          };
          this.$axios(config).then(res => {
            let imgCode = res.data.data;
            this.ImgCode = imgCode.imguri;
            this.ruleForm.imgCodeKey = imgCode.imgkey;
          });
        } catch (ex) {
          until.consoleLog(ex);
        }
      },
      userAgreement(){
        try {
          let url = baseUrl + "Article/getArticleUserInfo";
          let config = {
            method: "POST",
            url: url + "?r=" + Math.random(),
          };
          this.$axios(config).then(res => {
            this.agreementTitle = res.data.data.title;
            this.userAgreementContent = res.data.data.content;
            if (res.data.code == 0) {
              this.$message({
                type: "success",
                duration: 1000,
                message: res.data.msg || "发送成功！",
                onClose: () => {

                }
              });
            }
          });

        } catch (ex) {
          until.consoleLog(ex);
        }
      },
      agreementContent(){
        this.dialogAgreementVisible = true;
      },
      countryAccount(){
        if (this.ruleForm.country == 1) {
          this.placeholderPhoneEmail = '请输入手机号码';
          this.tabTit = '手机验证';
          this.messageCode = '短信验证码';
        } else {
          this.placeholderPhoneEmail = '请输入邮箱';
          this.tabTit = '邮箱验证';
          this.messageCode = '邮箱验证码';
        }
      },
      loginBtn(){
        this.centerDialogRegisterVisible = true;
        this.$router.push('/login');
      },
      //密码强度
      pwdStrong () {
        if (this.ruleForm.LoginPwd.length > 0) {
          this.strengthShow = true;
        } else {
          this.strengthShow = false;
        }
        this.strength = until.pwdStrong(this.ruleForm.LoginPwd);
      },
      intervalTimerSend(){
        let _this = this;
        _this.sendMsgDisabled = true;
        let interval = window.setInterval(function () {
          if ((_this.time--) <= 1) {
            _this.time = 59;
            _this.sendMsgDisabled = false;
            window.clearInterval(interval);
          }
        }, 1000);
      },
      formValidateCountry(){
        if (!this.ruleForm.country) {
          this.$message({
            showClose: true,
            duration: 4000,
            message: '国家不能为空，请您选择国家！',
            type: 'error'
          });
          return false;
        }
        if (this.ruleForm.Account.length == 0) {
          this.$message({
            showClose: true,
            duration: 4000,
            message: '账号名称不能为空！',
            type: 'error'
          });
          return false;
        }
        if (!this.isPhoneNum && !this.isEmailNun) {
          this.$message({
            showClose: true,
            duration: 4000,
            message: '账号格式不正确！',
            type: 'error'
          });
          return false;
        }
        if (this.isPhoneNum) {
          if (this.ruleForm.AreaCode.length == 0) {
            this.$message({
              showClose: true,
              duration: 4000,
              message: '请选择国家！',
              type: 'error'
            });
            return false;
          }
          if (this.ruleForm.AreaCode != 86) {
            this.$message({
              showClose: true,
              duration: 4000,
              message: '国家选择错误！',
              type: 'error'
            });
            return false;
          }
        }
        if (this.ruleForm.ImgCode.length == 0) {
          this.$message({
            showClose: true,
            duration: 4000,
            message: '图形验证码不能为空！',
            type: 'error'
          });
          return false;
        }
        return true;
      },
      sendMsgCode(){
        try {
          if (this.formValidateCountry()) {
            if (this.ruleForm.country == 1 && !until.isPhoneNum(this.ruleForm.Account)) {
              this.$message({
                showClose: true,
                duration: 3000,
                message: '请您使用手机号码注册！',
                type: 'error',
              });
              return false;
            }
            if (this.ruleForm.country != 1 && !until.isEmail(this.ruleForm.Account)) {
              this.$message({
                showClose: true,
                duration: 3000,
                message: '请您使用邮箱注册！',
                type: 'error',
              });
              return false;
            }
            let url = baseUrl + "user/send_reg";
            let config = {
              method: "POST",
              url: url + "?r=" + Math.random(),
              data: {
                country: this.ruleForm.country,
                username: this.ruleForm.Account,
                imgcode: this.ruleForm.ImgCode,
                imgkey: this.ruleForm.imgCodeKey,
              }
            };
            this.intervalTimerSend();
            this.$axios(config).then(res => {
              if (res.data.code) {
                this.$message({
                  type: "success",
                  duration: 3000,
                  message: res.data.msg || "发送成功！",
                  onClose: () => {
                  }
                });
              } else {
                this.$message({
                  showClose: true,
                  duration: 1000,
                  message: res.data.msg || '操作失败！',
                  type: 'error',
                  onClose: () => {
                    this.changeImgCode();
                  }
                });
              }
            });
          }
        } catch (ex) {
          until.consoleLog(ex);
        }
      },
      //检查账号
      checkAcount(account){
        var account = $.trim(account);
        //判断是不是邮箱
        if (until.isEmail(account)) {
          this.isPhoneNum = true;
          this.isEmailNun = true;
        }
        //判断是不是手机
        else if (until.isPhoneNum(account)) {
          this.isEmailNun = false;
          this.isPhoneNum = true;

        } else {
          this.isEmailNun = false;
          this.isPhoneNum = false;
        }
      },
      //获取国家列表
      getCountryList(){
        try {
          let url = baseUrl + "/user/countrysel";
          let config = {
            method: "POST",
            url: url + "?r=" + Math.random()
          };
          this.$axios(config).then(result => {
            if (until.responesValidate(result)) {
              if (result.data) {
                this.countryList = result.data.data;
                setTimeout(() => {
                  this.ruleForm.country = 1;
                }, 60);
              }
            }
          });
        } catch (ex) {
          until.consoleLog(ex);
        }
      },
      submitFormSet(){  //第一步（注册提交）
        try {
          if (this.formValidateSet()) {
            let VerifyCode = this.isPhoneNum ? this.ruleForm.VerifyCodePhone : this.ruleForm.VerifyCodeEmail;
            let formData = {
              country: this.ruleForm.country,  //国家
              username: this.ruleForm.Account,  //用户名
              verify_code: VerifyCode  //验证码
            };
            this.$axios({
              method: "post",
              url: baseUrl + 'user/register1?r=' + Math.random(),
              data: formData
            }).then((result) => {
              //    切换到设置密码
              if (result.data.code) {
                this.tokenReg = result.data.data.token_reg;  //第一部返回的token
                this.ruleFormStatus = false;
                this.$refs.goSetPassword.classList.add('active');
                this.$refs.setPhoneEmail.classList.remove('active');
              } else {
                this.$message({
                  showClose: true,
                  duration: 1000,
                  message: result.data.msg || '操作失败！',
                  type: 'error',
                  onClose: () => {
                    this.changeImgCode();
                  }
                });
              }
            });
          }
        } catch (ex) {
          until.consoleLog(ex);
        }
      },
      submitForm(){  //第二部（注册提交）
        if (this.formValidate()) {
          if (this.tokenReg) {
            let formData = {
              country: this.ruleForm.country,        //国家ID
              username: this.ruleForm.Account,      //手机号或者邮箱
              password: this.ruleForm.surePwd,     //用户密码
              invtcode: this.ruleForm.recommendCode,        //推荐码
              token_reg: this.tokenReg           //会员注册第一步传递的参数
            };
            this.$axios({
              method: "post",
              url: baseUrl + 'user/register2?r=' + Math.random(),
              data: formData
            }).then((result) => {
              if (result.data.code) {
                this.username = result.data.data.userinfo.username;
                this.centerDialogRegisterVisible = true;
              } else {
                this.$message({
                  showClose: true,
                  duration: 3000,
                  message: result.data.msg || '操作失败！',
                  type: 'error'
                });
              }
            });
          } else {
            this.$message({
              showClose: true,
              duration: 4000,
              message: '注册第一步没有成功！',
              type: 'error'
            });
          }
        }

      },
      //表单验证
      formValidateSet(){
        if (!this.ruleForm.country) {
          this.$message({
            showClose: true,
            duration: 4000,
            message: '国家不能为空，请您选择国家！',
            type: 'error'
          });
          return false;
        }
        if (this.ruleForm.Account.length == 0) {
          this.$message({
            showClose: true,
            duration: 4000,
            message: '账号名称不能为空！',
            type: 'error'
          });
          return false;
        }
        if (!this.isPhoneNum && !this.isEmailNun) {
          this.$message({
            showClose: true,
            duration: 4000,
            message: '账号格式不正确！',
            type: 'error'
          });
          return false;
        }
        if (this.isPhoneNum) {
          if (this.ruleForm.AreaCode.length == 0) {
            this.$message({
              showClose: true,
              duration: 4000,
              message: '请选择国家！',
              type: 'error'
            });
            return false;
          }
          if (this.ruleForm.AreaCode != 86) {
            this.$message({
              showClose: true,
              duration: 4000,
              message: '国家选择错误！',
              type: 'error'
            });
            return false;
          }
        }
        if (this.ruleForm.ImgCode.length == 0) {
          this.$message({
            showClose: true,
            duration: 4000,
            message: '图形验证码不能为空！',
            type: 'error'
          });
          return false;
        }
        if (this.isPhoneNum) {
          if (this.ruleForm.VerifyCodePhone.length == 0) {
            this.$message({
              showClose: true,
              duration: 4000,
              message: '短信验证码不能为空！',
              type: 'error'
            });
            return false;
          }
          if (this.ruleForm.VerifyCodePhone.length < 6) {
            this.$message({
              showClose: true,
              duration: 4000,
              message: '短信验证码不能小于6个字符！',
              type: 'error'
            });
            return false;
          }
        }
        if (this.ruleForm.ImgCode.length < 4) {
          this.$message({
            showClose: true,
            duration: 4000,
            message: '图形验证码格式不正确！',
            type: 'error'
          });
          return false;
        }
        return true;
      },
      formValidate(){
        if (this.ruleForm.LoginPwd.length == 0) {
          this.$message({
            showClose: true,
            duration: 4000,
            message: '登录密码不能为空！',
            type: 'error'
          });
          return false;
        }
        if (this.ruleForm.LoginPwd.length < 6) {
          this.$message({
            showClose: true,
            duration: 4000,
            message: '登录密码輸入不合格！',
            type: 'error'
          });
          return false;
        }
        if (this.ruleForm.surePwd.length == 0) {
          this.$message({
            showClose: true,
            duration: 4000,
            message: '确认密码不能为空！',
            type: 'error'
          });
          return false;
        }
        if (this.ruleForm.surePwd !== this.ruleForm.LoginPwd) {
          this.$message({
            showClose: true,
            duration: 4000,
            message: '两次密码输入不一致！',
            type: 'error'
          });
          return false;
        }

//        if (this.isEmailNun) {
//          if (this.ruleForm.VerifyCodeEmail.length == 0) {
//            this.$message({
//              showClose: true,
//              duration: 4000,
//              message: '邮件验证码不能为空！',
//              type: 'error'
//            });
//            return false;
//          }
//          if (this.ruleForm.VerifyCodeEmail.length < 6) {
//            this.$message({
//              showClose: true,
//              duration: 4000,
//              message: '邮件验证码不能小于6个字符！',
//              type: 'error'
//            });
//            return false;
//          }
//        }

        if (!this.ruleForm.checked) {
          this.$message({
            showClose: true,
            duration: 4000,
            message: '请阅读并确认用户协议！',
            type: 'error'
          });
          return false;
        }
        return true;
      },
      handleClick(){
      },
    },
    components: {}
  }
</script>
<style lang="scss" scoped>
  @import "../../styles/mixin";

  @media screen and (max-width: 860px) {
    body {
      width: 100%;
      height: calc(100vh - 100px);
    }
    .register-wrap {
      width: 100%;
    }
    .container {
      width: 100%;
    }
    .register-mbg {
      width: 50%;
    }
  }

  .userAgreementMain {
    height: 600px;
    font-size: 14px;
    line-height: 26px;
    overflow-y: scroll;
  }

  .register-form {
    .img-code {
      position: absolute;
      right: 6px;
      top: 0;
    }
  }

  .set-btn {
    background-color: #2E6AF4 !important;
  }

  .send-btn {
    background-color: #2E6AF4;
    border-radius: 12px;
    color: #fff;
    height: 26px;
    line-height: 1px;
    text-align: center;
    position: absolute;
    right: 0;
    top: 10px;
    width: 100px;
    cursor: pointer;
    outline: none;
    font-size: 14px;
  }

  .el-icon-warning {
    color: #d2d2d2;
    font-size: 14px;
    padding: 0 5px 0 0;
  }

  .strength {
    span {
      display: inline-block;
      text-align: center;
      width: 90px;
      height: 30px;
      line-height: 30px;
      margin-right: 3px;
      background: rgb(214, 209, 209);
      &.on {
        background: #f56c6c;
        color: #fff;
      }
    }
  }

  .login-btn-modal p {
    width: 100%;
    text-align: center;
    font-size: 16px;
    color: #333;
    padding-bottom: 10px;
  }
</style>
<style>
  .steps-wrap {
    margin-bottom: 20px;
  }

  .el-select-re .el-input__inner {
    width: 390px;
    border: none;
  }

  .form-pannel .el-input__inner {
    border: none;
  }

  .form-pannel .el-input__inner {
    border-bottom: 1px solid #dcdfe6;
  }

  .login-btn-modal .login-btn {
    width: 279px;
    height: 60px;
    font-size: 20px;
    background-color: #2E6AF4;
    border-radius: 30px;
    box-shadow: 9px 0px 18px rgba(88, 126, 215, 0.52);
  }
</style>
