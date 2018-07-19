<template>
  <div class="footer">
    <div class="m-footer">
      <div class="f-rows clearFix">
        <div class="f-left fl">
          <img src="./../assets/logo.png" alt="" class="logo">
          <span class="f-name">
            GF创新金融交易平台
          </span>
        </div>
        <div class="f-right fr">
          <router-link to="/AboutUs">关于我们</router-link>
          <router-link to="/ContactUs">联系我们</router-link>
          <a href="#/HelpIndex">帮助中心</a>
          <a href="#/NoticeList">平台公告</a>
        </div>
      </div>
      <div class="f-rows share">
        <!--   <li class="row" id="share">
          &lt;!&ndash;   <div class="social-share" data-sites="weibo,qq,qzone,tencent"></div>&ndash;&gt;
           </li>-->
        <!--        <ul>
                  <li class="row">
                    <div id="share-1"></div>
                  </li>
                </ul>-->
        <!--<div class="share-box">-->
          <!--<a href="javascript:" class="facebook"></a>-->
          <!--<a href="javascript:" class="twitter"></a>-->
          <!--<a href="javascript:" class="weixin"></a>-->
          <!--<a href="javascript:" class="sinawb"></a>-->
        <!--</div>-->
      </div>
      <div class="f-rows">
        <p class="bq">© 2018-2024 GFCVPI.VIP 版权所有</p>
      </div>
    </div>
  </div>
</template>
<script type="text/babel">
  import "@/scripts/share/share.min.css";
  import "@/scripts/share/jquery.share.min.js";
  export default {
    data(){
      return {}
    },
    mounted(){
    //  $('#share').share({sites: ['qzone', 'qq', 'weibo', 'wechat', 'facebook']});
    },
    methods: {},
    components: {}
  }
</script>

<style lang="scss" scoped>
  @import "./../styles/mixin";
  .footer {
    height: 265px;
    padding: 45px 10px 0 10px;
    /*    position: fixed;
        bottom: 0;
        left: 0;*/
    background-color: #0b0c22;
    .m-footer {
      // @include marginAuto();
      width: 1200px;
      margin: 0 auto;
      padding: 45px 0 0 0;
      .share {
        height: 60px;
      }
      .f-rows {
        .f-left {
          display: table-cell;
          line-height: 50px;
          img.logo, .f-name {
            vertical-align: middle;
          }
          .f-name {
            padding-left: 23px;
            @include sc(20px, #ffffff);
          }
        }
        .f-right {
          line-height: 50px;
          a {
            padding-left: 42px;
            @include sc(14px, #ffffff);
          }
          a:hover {
            text-decoration: underline;
            cursor: pointer;
          }
        }
        p.bq {
          padding: 50px 0 0px 0;
          text-align: center;
          @include sc(14px, #ffffff);
        }
      }
      .social-share {
        margin-left: -4px;
      }
      .share {
        margin-top: 20px;
      }
      .f-rows {
        .share-box {
          a {
            display: inline-block;
            width: 30px;
            height: 23px;
            margin-right: 20px;
          }
          a:hover {
            opacity: 0.6;
          }
          .facebook {
            background: url("./../assets/facebook.png") left center no-repeat;
          }
          .twitter {
            background: url("./../assets/twitter.png") left center no-repeat;
          }
          .weixin {
            background: url("./../assets/weixin.png") left center no-repeat;
          }
          .sinawb {
            background: url("./../assets/sinawb.png") left center no-repeat;
          }
        }
      }
    }
  }
</style>
