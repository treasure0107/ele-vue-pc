<template>
  <div class="center-main">
    <h2 class="center-title">
      邀请好友
      <router-link :to="'/InviteList'">
        <!--<el-button type="text" style="float:right;">兑换记录</el-button>-->
      </router-link>
    </h2>
    <el-row class="infoBox">
      <el-col :span="12" class="account">
        <div>邀请人数</div>
        <em>{{inviteFriendsNews.levelcount}}人<label>(只显示一级邀请人数)</label></em>
      </el-col>
      <el-col :span="12" class="account">
        <div>合计可提现奖金</div>
        <b>{{inviteFriendsNews.rewardtotal}}</b> <span class="coin">CNY</span>&nbsp;&nbsp;
        <!--<el-button type="primary" size="mini" round @click='dialogExchangeBonus = true'>兑换奖金</el-button>-->
      </el-col>
    </el-row>
    <div class="receiving">
      <div class="arrows"><span><em></em></span></div>
      <el-row>
        <el-col :span="8" class="account">
          <div>团队奖
            <el-popover
              placement="top"
              width="200"
              trigger="hover"
              content="团队奖">
              <el-button type="text" slot="reference" size="mini" icon="el-icon-question" circle></el-button>
            </el-popover>
          </div>
          <em>{{inviteFriendsNews.gro_reward}} CNY</em>
        </el-col>
        <el-col :span="8" class="account">
          <div>个人奖
            <el-popover
              placement="top"
              width="200"
              trigger="hover"
              content="个人奖">
              <el-button type="text" slot="reference" size="mini" icon="el-icon-question" circle></el-button>
            </el-popover>
          </div>
          <em>{{inviteFriendsNews.per_reward}} CNY</em>
        </el-col>
        <el-col :span="8" class="account" v-if="marketSubsidies">
          <div>市场补贴
            <el-popover
              placement="top"
              width="200"
              trigger="hover"
              content="市场补贴">
              <el-button type="text" slot="reference" size="mini" icon="el-icon-question" circle></el-button>
            </el-popover>
          </div>
          <em>{{inviteFriendsNews.mark_reward}} CNY</em>
        </el-col>
      </el-row>
    </div>
    <h3 class="friends_title">邀请有礼</h3>
    <div class="friends">
      <div class="steps">
        <span class="stepIcon1"></span>
        <div>分享链接或<br/>邀请码给好友</div>
      </div>
      <div class="line">-----------------------></div>
      <div class="steps">
        <span class="stepIcon2"></span>
        <div>分享链接或<br/>邀请码给好友</div>
      </div>
      <div class="line">-----------------------></div>
      <div class="steps">
        <span class="stepIcon3"></span>
        <div>分享链接或<br/>邀请码给好友</div>
      </div>
    </div>
    <div class="copyCode">我的邀请码：
      <input type="text" :value="inviteFriendsNews.invtcode" id="copyCode">
      <el-button type="text" @click="copyContent('copyCode')" :value="inviteFriendsNews.invtcode">复制</el-button>
    </div>
    <div class="copyLink">
      <input type="text" :value="inviteFriendsNews.url" id="copyUrl">
      <el-button type="text" icon="el-icon-document" @click="copyContent('copyUrl')">复制链接</el-button>
    </div>
    <div class="share">
      <div class="qrcode-box">
        <p class="weChat-text" v-if="weChatTit">用微信扫一扫</p>
        <div id="qrcode"></div>
      </div>
      <div class="weChat shareIcon" @mouseenter="weChatShow()" @mouseleave="weChatHidden()">
        <img src="./../../../assets/share_wx.png">
        <p>分享到微信</p>
      </div>
      <a href="#" @click="shareTo('qq')" class="shareIcon">
        <img src="./../../../assets/share_qq.png">
        <p>分享到QQ</p>
      </a>
      <div @click="shareTo('qzone')" class="shareIcon">
        <img src="./../../../assets/share_qqkj.png">
        <p>分享到QQ空间</p>
      </div>
      <div @click="shareTo('sina')" class="shareIcon">
        <img src="./../../../assets/share_xl.png">
        <p>分享到微博</p>
      </div>
    </div>
    <!--兑换奖金-->
    <el-dialog title="兑换奖金" width="650px" :visible.sync="dialogExchangeBonus">
      <div class="diaCont">
        <div class="ContTop">当前可兑换：<b>3658</b> cny</div>
        <div class="diaInputs">
          <label>兑换金额</label>
          <el-input placeholder="请输入500的倍数">
            <i slot="suffix" style="display:inline-block;line-height:40px;padding-right:20px;color:#333;">cny</i>
          </el-input>
        </div>
        <div class="diaInputs">
          <label>图形验证码</label>
          <el-input placeholder="请输入验证码"></el-input>
          <img src="./../../../assets/partner1.jpg">
        </div>
      </div>
      <footer slot="footer" class="dialog-footer">
        <el-button @click="dialogExchangeBonus = false">取 消</el-button>
        <el-button type="primary" @click="ExchangeBonus">立即兑换</el-button>
      </footer>
    </el-dialog>

  </div>
</template>
<script type="text/babel">
  import until from "@/scripts/until";
  import {baseUrl} from "@/config/env";
  import QRCode from 'qrcodejs2';
  import "@/scripts/share/share.min.css";
  import "@/scripts/share/jquery.share.min.js";
  export default {
    data(){
      return {
        dialogExchangeBonus: false,
        inviteFriendsNews: {},
        weChatUrl: '',
        weChatTit: false,
        marketSubsidies:true
      }
    },
    mounted(){
      this.getFriendsMain();
    },
    methods: {
      shareTo(stype){
        //qq空间接口的传参
        if (stype == 'qzone') {
          this.qqZone();
//          window.open('https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + this.weChatUrl + '?sharesource=qzone&title=' + "会员系统" + '');
        }
        //新浪微博接口的传参
        if (stype == 'sina') {
          window.open('http://service.weibo.com/share/share.php?url=' + this.weChatUrl + '?sharesource=weibo&title=' + "会员系统" + '');
        }
        //qq好友接口的传参
        if (stype == 'qq') {
          this.qqShare();
//          window.open('http://connect.qq.com/widget/shareqq/index.html?url='+this.weChatUrl+'?sharesource=qzone&title=' + "会员系统" + '');
        }
      },
      qqShare(){
        var p = {
          url: this.weChatUrl, /*获取URL，可加上来自分享到QQ标识，方便统计*/
          desc: '发送信息给好友',
          title: '发送信息给好友', /*分享标题(可选)*/
          summary: '', /*分享摘要(可选)*/
          pics: '', /*分享图片(可选)*/
          flash: '', /*视频地址(可选)*/
          site: this.weChatUrl, /*分享来源(可选) 如：QQ分享*/
          style: '203',
          width: 16,
          height: 16
        };
        var s = [];
        for (var i in p) {
          s.push(i + '=' + encodeURIComponent(p[i] || ''));
        }
        var qhref = "http://connect.qq.com/widget/shareqq/index.html?" + s.join('&');
//        $(".shareIcon").attr({href: qhref, target: "_blank"});
        window.open(qhref)
      },
      qqZone(){
        var _url = this.weChatUrl;
        var _showcount = 0;
        var _desc = '';
        var _summary = "";
        var _title = '会员系统';
        var _site = "";
        var _width = "600px";
        var _height = "800px";
        var _summary = "";
        var _pic = "http://www.junlenet.com/uploads/allimg/150510/1-150510104044.jpg";
        var _shareUrl = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?';
        _shareUrl += 'url=' + encodeURIComponent(_url || document.location);    //参数url设置分享的内容链接|默认当前页location
        _shareUrl += '&showcount=' + _showcount || 0;       //参数showcount是否显示分享总数,显示：'1'，不显示：'0'，默认不显示
        _shareUrl += '&desc=' + encodeURIComponent(_desc || '分享的描述');     //参数desc设置分享的描述，可选参数
        //_shareUrl += '&summary=' + encodeURIComponent(_summary||'分享摘要');     //参数summary设置分享摘要，可选参数
        _shareUrl += '&title=' + encodeURIComponent(_title || document.title);    //参数title设置分享标题，可选参数
        //_shareUrl += '&site=' + encodeURIComponent(_site||'');   //参数site设置分享来源，可选参数
        _shareUrl += '&pics=' + encodeURIComponent(_pic || '');    //参数pics设置分享图片的路径，多张图片以＂|＂隔开，可选参数
        window.open(_shareUrl, 'width=' + _width + ',height=' + _height + ',top=' + (screen.height - _height) / 2 + ',left=' + (screen.width - _width) / 2 + ',toolbar=no,menubar=no,scrollbars=no,resizable=1,location=no,status=0');
      },

      getFriendsMain(){  //获取用户信息
        try {
          let url = baseUrl + "friends/getFriendsMain";
          let config = {
            method: "POST",
            url: url + "?r=" + Math.random(),
          };
          this.$axios(config).then(res => {
            if (res.data.code) {
              let getFriendsNews=res.data.data;
              this.weChatUrl = getFriendsNews.url;
              this.inviteFriendsNews = res.data.data;
              if(getFriendsNews.vip==0){
                this.marketSubsidies=false;
              }
              if(getFriendsNews.vip==1){
                this.marketSubsidies=true;
              }
              this.qrcode();
              $("#qrcode").html('');

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
      copyContent(type){
        if (type == 'copyCode') {
          let Url2 = document.querySelector("#copyCode");
          Url2.select();   // 选择对象
          document.execCommand("Copy");   // 执行浏览器复制命令
        }
        if (type == 'copyUrl') {
          let Url2 = document.querySelector("#copyUrl");
          Url2.select();   // 选择对象
          document.execCommand("Copy");   // 执行浏览器复制命令
        }
      },
      weChatShow(){
        this.$nextTick(function () {
          this.qrcode();
          this.weChatTit = true;
        })
      },
      weChatHidden(){
        $("#qrcode").html('');
        this.weChatTit = false;
      },
      qrcode () {
        let text = "";
        if (this.weChatUrl) {
          text = this.weChatUrl;
        }
        let qrcode = new QRCode('qrcode', {
          width: 100,
          height: 100,
          text: text,
        });
      },
      ExchangeBonus(){
        this.$message({
          type: 'info',
          message: '兑换成功'
        });
      }
    },
    components: {}
  }

</script>

<style lang="scss" scoped>
  #copyCode {
    width: 130px;
    font-size: 14px;
    margin: 20px 0;
    font-weight: bold;
    overflow: hidden;
  }

  #copyUrl {
    background: #FAFAFA;
    height: 35px;
    line-height: 35px;
    padding: 0 5px;
    width: 50%;
    overflow: hidden;
  }

  .share {
    position: relative;
  }

  .qrcode-box {
    position: absolute;
    top: -60px;
    left: 40px;
  }

  #qrcode {
    width: 100px;
    height: 100px;
    position: absolute;
    top: -10px;
    left: 0;
  }

  .weChat-text {
    width: 90px;
    position: absolute;
    top: 96px;
    left: 6px;
    font-size: 12px;
    color: rgba(102, 102, 102, 1);
  }

  .shareIcon {
    cursor: pointer;
  }

  .infoBox .el-col label {
    font-size: 14px;
    color: #999;
  }

  .receiving {
    background: #F6F6F6;
    padding: 25px 25px 0 25px;
    margin: 0 0 30px 0;
    position: relative;
    .el-col {
      margin-bottom: 25px;
      font-size: 14px;
      label {
        color: #999;
      }
    }
  }

  .arrows {
    position: absolute;
    top: 0;
    left: 0;
    span {
      display: block;
      width: 0;
      height: 0;
      border-width: 0 10px 10px;
      border-style: solid;
      border-color: transparent transparent transparent;
      position: absolute;
      top: -10px;
      left: 50%; /* 三角形居中显示 */
      margin-left: -10px; /* 三角形居中显示 */
    }
    em {
      display: block;
      width: 0;
      height: 0;
      border-width: 0 10px 10px;
      border-style: solid;
      border-color: transparent transparent #F6F6F6;
      position: absolute;
      top: 1px;
      left: -10px;
    }
  }

  .receiving .arrows {
    left: 515px
  }

  .friends_title {
    font-size: 20px;
    font-weight: normal;
    margin: 30px 0;
  }

  .friends {
    display: flex;
    padding: 0 20px;
    .steps {
      width: 100px;
      text-align: center;
      font-size: 14px;
      text-align: center;
      line-height: 25px;
      span {
        display: inline-block;
        width: 50px;
        height: 50px;
      }
      span.stepIcon1 {
        background: url(./../../../assets/step1.png) no-repeat center center;
      }
      span.stepIcon2 {
        background: url(./../../../assets/step2.png) no-repeat center center;
      }
      span.stepIcon3 {
        background: url(./../../../assets/step3.png) no-repeat center center;
      }
    }
    .line {
      flex: 1;
      text-align: center;
      line-height: 100px;
      font-size: 20px;
      color: #999;
    }

  }

  .copyCode {
    font-size: 14px;
    margin: 20px 0;
  }

  .copyLink {
    background: #FAFAFA;
    height: 35px;
    line-height: 35px;
    padding: 0 5px;
  }

  .share {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 50px;
  }

  .share {
    text-align: center;
  }

  .ContTop {
    text-align: center;
    font-size: 14px;
    b {
      font-size: 24px;
    }
  }

  .diaInputs {
    display: flex;
    margin: 40px 0 20px;
    align-items: center;
    color: #999;
    label {
      width: 140px;
      text-align: center;
    }
    .el-input {
      flex: 1;
    }
    img {
      width: 150px;
      height: 40px;
      margin-left: 20px;
    }
  }
</style>
