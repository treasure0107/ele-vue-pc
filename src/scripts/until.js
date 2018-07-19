/**
 * Created by 520 on 2018/6/11.
 */
//公用方法
import axios from 'axios';
import {Message} from 'element-ui';
import {MessageBox} from 'element-ui';
import {baseUrl} from "@/config/env";
import router from '@/router'

export default  {
  formatData(data) {
    var result = typeof (data);
    if (result == "string") {
      data = JSON.parse(data);
    }
    return data;
  },
  //密码强度验证
  pwdStrong(pwd){
    if (!pwd) return;
    this.number = 1;
    let regNumber = /[\d]/,
      regTxt = /[a-zA-Z]/;
    let regCn = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
    /*   regBigTxt = /[A-Z]/;*/
    if (pwd.length >= 6 && pwd.length <= 20) {
      if (regNumber.test(pwd)) {
        this.number++;
      }
      if (regTxt.test(pwd)) {
        this.number++;
      }
      if (regCn.test(pwd)) {
        this.number++;
      }
    }
    return this.number;
  },
  //验证
  responesValidate(data){
    let res = this.formatData(data["data"]);
		//401时的返回值不一样！
 		if(data.code==401){
      if (window.localStorage) {
        localStorage.removeItem('UserInfo');
        axios.defaults.headers.common['Token'] = "";
        MessageBox({
          title: "提示",
          message: '未登陆或登陆已超时！',
          confirmButtonText: '去登录',
          type: "info",
          showClose: true,
          callback: (action, instance) => {
            if (action == "confirm") {
              router.push({path: "/Login"});
            }
          }
        });
        return false;
      }
		}
    if (res.code != 1) {
      if (res.code == 401) {
        if (window.localStorage) {
          localStorage.removeItem('UserInfo');
          axios.defaults.headers.common['Token'] = "";
          MessageBox({
            title: "提示",
            message: '未登陆或登陆已超时！',
            confirmButtonText: '去登录',
            type: "info",
            showClose: true,
            callback: (action, instance) => {
              if (action == "confirm") {
                this.$router.push({path: "/#/Login"})
              }
            }
          });
        }
      }
      else if (res.code == 403) {
        MessageBox({
          title: "提示",
          message: res.msg || '无权限',
          type: "info",
          showClose: true,
          callback: (action, instance) => {
            if (action == "confirm") {
              this.$router.push({path: "/#/Index"})
            }
          }
        });
      }
      else if (res.code == 404) {
        MessageBox({
          title: "提示",
          message: res.msg || '你访问的页面不存在！',
          type: "info",
          showClose: true,
          callback: (action, instance) => {
            if (action == "confirm") {
              this.$router.push({path: "/#/Index"})
            }
          }
        });
      }
      else if (res.code == 500) {
        MessageBox({
          title: "提示",
          message: res.msg || '服务器异常！',
          type: "info",
          showClose: true,
          callback: (action, instance) => {
            if (action == "confirm") {
              this.$router.push({path: "/#/Index"})
            }
          }
        });
      }
      else {
        Message({
          showClose: true,
          duration: 4000,
          message: res.msg || "系统错误!",
          type: 'error',
          center: false
        });
      }
      return false;
    }
    return true;
  },
  consoleLog: (ex) => {
    if (window.console) {
      console.log(ex);
    } else {
      window.console = {};
    }
  },
  //邮箱
  isEmail(str) {
    if (str.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) != -1) return true;
    else return false;
  },
  //邮箱
  isChina(str) {
    if (str.search(/^[a-zA-Z\u4e00-\u9fa5]+$/) != -1) return true;
    else return false;
  },
  //微信账号
  isWeixin(str) {
    if (str.search(/^[a-zA-Z0-9_]+$/) != -1) return true;
    else return false;
  },
  //支付宝账号
  isAlipay(str) {
    if (str.search(/^(?:\w+\.?)*\w+@(?:\w+\.)+\w+|\d{9,11}$/) != -1) return true;
    else return false;
  },
  //手机号码
  isPhoneNum(str) {
    if (!str) return;
    let reg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
    return reg.test(str);
    /*    var b = str.substr(0, 1);
     if (b == "1" && str.length == 11) return true;
     else return false;*/
  },
  isCard(str) {
    if (!str) return;
    let reg = /^\d*$/;
    return reg.test(str);
    /*    var b = str.substr(0, 1);
     if (b == "1" && str.length == 11) return true;
     else return false;*/
  },
  //包含字母
  hasLetter(str){
    var regExp = new RegExp("[a-zA-Z]");
    return regExp.test(str);
  },
  //包含特殊字符
  hasOther(str){
    var regExp = new RegExp("[`~!@#$%^&*()=|{}':;',\\[\\].<>/?~！@#￥……％&*（）——|{}【】‘；：”“'。，、？]");
    return regExp.test(str);
  },
  //包含中文
  hasChinese(str){
    var regExp = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
    return regExp.test(str);
  },
  //身份证
  isCardID(str){
    if (!str) return;
    let reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    return reg.test(str);
  },
  RegExps: {
    isNumber(str){
      let reg = /^\d+(\.\d+)?$/;
      return reg.test(str);
    }
  },
  //获取国家列表
  getCountryList(callback){
    try {
      axios({
        method: "POST",
        url: baseUrl + "",
        data: {}
      }).then((result) => {
        console.log(result);
      });
    } catch (ex) {
      this.consoleLog(ex);
    }
  },
  //获取验证码
  getImgCode(callback){
    try {
      let url = baseUrl + '/common/getcaptcha';
      let config = {
        method: "POST",
        url: url + "?r=" + Math.random(),
        params: {
          // type: type || "Login"
        }
      };
      axios(config).then((result) => {
        if (this.responesValidate(result)) {
          if (callback) {
            callback(result.data);
          }
        }
      });
    } catch (ex) {
      this.consoleLog(ex);
    }
  },
  /*获取用户信息*/
  getUserInfo(){
    let userInfo = "";
    if (window.localStorage) {
      if (window.localStorage.getItem("UserInfo")) {
        userInfo = JSON.parse(window.localStorage.getItem("UserInfo"));
      }
    }
    return userInfo;
  }
  /*  getUserInfo(callback){
   try {
   let url = baseUrl + '/friends/getProfile';
   let config = {
   method: "POST",
   url: url + "?r=" + Math.random()
   };
   axios(config).then((result) => {
   if (this.responesValidate(result)) {
   if (callback) {
   callback(result.data);
   }
   }
   });
   } catch (ex) {
   this.consoleLog(ex);
   }
   },*/
}
