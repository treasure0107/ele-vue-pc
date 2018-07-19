<template>
  <div class="center-main">
    <h1 class="center-title">
      收款设置
    </h1>
    <div v-if="!type" class="collect-rows clearFix">
      <div class="collect-kind fl">
        <img src="./../../../assets/bank-icon.png" alt="" class="icon"/>
        <span class="name">银行卡(必填)</span>
      </div>
      <a href="javascript:void(0);" class="set-state fl" v-text="(bankData.bankname || '未设置') + ' ' + (bankData.card || '') "> </a>
      <a href="javascript:void(0);" class="link-btn fr" v-if="!bankData.bankname" @click="bankSet();">设置</a>
      <a href="javascript:void(0);" class="link-btn fr" v-if="bankData.bankname" @click="bankSet();" >修改</a>
    </div>
    <!--<div class="collect-rows clearFix">-->
      <!--<div class="collect-kind fl">-->
        <!--<img src="./../../../assets/weixin-icon.png" alt="" class="icon"/>-->
        <!--<span class="name">微信</span>-->
      <!--</div>-->
      <!--<a href="javascript:void(0);" class="set-state fl"><span style="float: left">{{weixinData.card || '未设置'}}</span><div class="dig" ><img v-if="weixinData.card" :src="weixinData.img" alt="" style="width: 100%;height: 100%"></div></a>-->
      <!--<a href="javascript:void(0);" class="link-btn fr" v-if="!weixinData.card" @click="weixinSet();">设置</a>-->
      <!--<a href="javascript:void(0);" class="link-btn fr" v-if="weixinData.card" @click="weixinSet();" >修改</a>-->
      <!--<a href="javascript:void(0);" class="link-btn fr" v-if="weixinData.card" @click="DelFn('weixin');" style="margin-right: 15px;color:#999999">删除</a>-->
    <!--</div>-->
    <div v-if="!type" class="collect-rows clearFix">
      <div class="collect-kind fl">
        <img src="./../../../assets/alipay-icon.png" alt="" class="icon"/>
        <span class="name">支付宝</span>
      </div>
      <a href="javascript:void(0);" class="set-state fl"><span style="float: left">{{alipayData.card || '未设置'}}</span><div class="dig" ><img v-if="alipayData.card" :src="alipayData.img" alt="" style="width: 100%;height: 100%"></div></a>
      <a href="javascript:void(0);" class="link-btn fr" v-if="!alipayData.card" @click="alipaySet();">设置</a>
      <a href="javascript:void(0);" class="link-btn fr" v-if="alipayData.card" @click="alipaySet();" >修改</a>
      <a href="javascript:void(0);" class="link-btn fr" v-if="alipayData.card" @click="DelFn('alipay');" style="margin-right: 15px;color:#999999">删除</a>
    </div>
    <div class="collect-rows clearFix">
      <div class="collect-kind fl">
        <img src="./../../../assets/usdt-icon.png" alt="" class="icon"/>
        <span class="name">USDT钱包地址</span>
      </div>
      <a href="javascript:void(0);" class="set-state fl" v-text="usdtData.card || '未设置'">未设置 </a>
      <a href="javascript:void(0);" class="link-btn fr" v-if="!usdtData.card" @click="usdtSet();">设置</a>
      <a href="javascript:void(0);" class="link-btn fr" v-if="usdtData.card" @click="usdtSet();" >修改</a>
      <a href="javascript:void(0);" class="link-btn fr" v-if="usdtData.card" @click="DelFn('usdt');" style="margin-right: 15px;color:#999999">删除</a>
    </div>
    <!--绑定银行卡-->
    <el-dialog title="银行卡设置" width="650px" :visible.sync="dialogBankVisible">
      <bank-set @sendT="showFn"></bank-set>
      <!--<footer slot="footer" class="dialog-footer">-->
        <!--<el-button @click="dialogBankVisible = false">取 消</el-button>-->
        <!--<el-button type="primary" @click="dialogBankVisible = false">确 定</el-button>-->
      <!--</footer>-->
    </el-dialog>
    <!--设置微信-->
    <el-dialog title="绑定微信" width="650px" :visible.sync="dialogWeixinVisible">
      <WeixinSet @sendT="weixinFn" ></WeixinSet>
      <!--<footer slot="footer" class="dialog-footer">-->
        <!--<el-button @click="dialogWeixinVisible = false">取 消</el-button>-->
        <!--<el-button type="primary" @click="dialogWeixinVisible = false">确 定</el-button>-->
      <!--</footer>-->
    </el-dialog>
    <!--设置支付宝-->
    <el-dialog title="绑定支付宝" width="650px" :visible.sync="dialogAlipayVisible">
      <AlipaySet @sendT="alipayFn"></AlipaySet>
      <!--<footer slot="footer" class="dialog-footer">-->
        <!--<el-button @click="dialogAlipayVisible = false">取 消</el-button>-->
        <!--<el-button type="primary" @click="dialogAlipayVisible = false">确 定</el-button>-->
      <!--</footer>-->
    </el-dialog>
    <!--设置USDT-->
    <el-dialog title="绑定USDT" width="650px" :visible.sync="dialogUsdtVisible">
      <UsdtSet @sendT="UsdtFn"></UsdtSet>
      <!--<footer slot="footer" class="dialog-footer">-->
        <!--<el-button @click="dialogUsdtVisible = false">取 消</el-button>-->
        <!--<el-button type="primary" @click="dialogUsdtVisible = false">确 定</el-button>-->
      <!--</footer>-->
    </el-dialog>
  </div>
</template>
<script type="text/babel">
  import BankSet from "@/views/UserCenter/CollectSet/BankSet";
  import WeixinSet from "@/views/UserCenter/CollectSet/WeixinSet";
  import AlipaySet from "@/views/UserCenter/CollectSet/AlipaySet";
  import UsdtSet from "@/views/UserCenter/CollectSet/UsdtSet";
  import until from "@/scripts/until";
  import {baseUrl} from "@/config/env";
  import {Message} from 'element-ui';
  export default {
    data(){
      return {
        dialogBankVisible: false,
        dialogWeixinVisible: false,
        dialogAlipayVisible: false,
        dialogUsdtVisible: false,
        bankData: {},
        weixinData: {},
        alipayData: {},
        usdtData: {},
        ispass: '',
        approvestatus: '',
        type: ''
      }
    },
    mounted(){
      let self = this;
      self.firstFn();
      //获取用户信息
      try {
        self.$axios({
          method: "post",
          url: baseUrl + 'friends/getProfile?r=' + Math.random(),
          data: ''
        }).then((result) => {
          if (until.responesValidate(result)) {
            let res = result["data"].data;
            self.ispass = res.paypassword;
            self.approvestatus = res.approvestatus;
            self.type = res.type;
            if(res.nickname) {
              window.localStorage.setItem('nickname', res.nickname)
            }
          }
        });
      } catch (ex) {
        until.consoleLog(ex);
      }
    },
    methods: {
      firstFn(){
        //展示数据
        let self = this;
        try {
          this.$axios({
            method: "post",
            url: baseUrl + 'account/Payment/getPaymenttype?r=' + Math.random(),
            data: ''
          }).then((result) => {
            if (until.responesValidate(result)) {
              let res = result["data"].data;
              self.bankData = res.bank;
              self.weixinData = res.weixin;
              self.alipayData = res.alipay;
              self.usdtData = res.usdt;
            }
          });
        } catch (ex) {
          until.consoleLog(ex);
        }
      },
      isCheck () {
        let self = this;
        if(self.ispass == 1 && self.approvestatus == 1){
            return true;
        } else {
            return false;
        }
      },
      bankSet(){
        if(this.isCheck()){
          this.dialogBankVisible = true;
        } else {
          Message({
            showClose: true,
            duration: 4000,
            message: "请在账户设置实名认证和设置交易密码!",
            type: 'error',
            center: false
          });
        }
      },
      weixinSet(){
        if(this.isCheck()){
          this.dialogWeixinVisible = true;
        } else {
          Message({
            showClose: true,
            duration: 4000,
            message: "请在账户设置实名认证和设置交易密码!",
            type: 'error',
            center: false
          });
        }
      },
      alipaySet(){
          debugger
        if (!this.bankData.bankname) {
          Message({
            showClose: true,
            duration: 4000,
            message: "请先设置银行账户!",
            type: 'error',
            center: false
          });
        } else if(this.isCheck()){
          this.dialogAlipayVisible = true;
        } else {
          Message({
            showClose: true,
            duration: 4000,
            message: "请在账户设置实名认证和设置交易密码!",
            type: 'error',
            center: false
          });
        }
      },
      usdtSet(){
        if(this.isCheck()){
          this.dialogUsdtVisible = true;
        } else {
          Message({
            showClose: true,
            duration: 4000,
            message: "请在账户设置实名认证和设置交易密码!",
            type: 'error',
            center: false
          });
        }
      },
      showFn(data){
        this.dialogBankVisible = false;
        this.firstFn();
      },
      UsdtFn(data){
        this.dialogUsdtVisible = false;
        this.firstFn();
      },
      weixinFn(data){
        this.dialogWeixinVisible = false;
        this.firstFn();
      },
      alipayFn(data){
        this.dialogAlipayVisible = false;
        this.firstFn();
      },
      //删除
      DelFn(type){
        let self = this;
        self.$prompt('请输入交易密码', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({ value }) => {
          let str = value.trim();
          if(str.length!=0){
            var reg = /^[a-zA-Z0-9]{6,20}$/;
            var r = str.match(reg);
            if(r==null) {
              this.$message({
                showClose: true,
                duration: 4000,
                message: '删除失败，交易密码格式不正确！',
                type: 'error'
              });
              return false;
            }
          }
          try {
            this.$axios({
              method: "post",
              url: baseUrl + 'account/Payment/getDelPayment?r=' + Math.random(),
              data: {type: type,paypassword :value}
            }).then((result) => {
              if (until.responesValidate(result)) {
                self.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                this.firstFn();
              }
            });
          } catch (ex) {
            until.consoleLog(ex);
          }
        }).catch(() => {
          self.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
    },
    components: {
      BankSet,
      WeixinSet,
      AlipaySet,
      UsdtSet
    }
  }

</script>

<style lang="scss" scoped>
  @import "./../../../styles/mixin";
  .center-main{
    padding-top:40px;
    padding-left: 50px;
    padding-right: 50px;
    .center-title{
      padding-bottom: 20px;
    }
    .collect-rows {
      padding-top: 20px;
      padding-bottom: 20px;
      border-bottom: 1px solid rgba(244,244,244,1);
      @include sc(14px, #333333);
      position: relative;
      .collect-kind {
        display: table-cell;
        img.icon, span.name {
          vertical-align: middle;
        }
        img.icon {
          max-height: 28px;
          border-radius: 50%;
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
        @include allcover();
        top: 20px;
        left: 215px;
        width: 300px;
      }
      .link-btn {
        color: #5357e2;
      }
    }
  }
  .dig{
    margin-left:20px;
    width: 18px;
    height: 18px;
    float: left;
    margin-top: 3px
  }
</style>
