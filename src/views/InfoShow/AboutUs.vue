<template>
  <div style="background:#fff;">
    <div class="top">
        <div class='container'>
          <p>全球创新投资交易平台</p>
          <p>Global innovation investment trading platform</p>
        </div>
    </div>
    <div class="container middle">
        <div>
            <p>关于TXB</p>
            <div>
              TXB是全球领先的数字资产金融服务商。2013年，TXB创始团队看到了区块链行业的巨大发展潜力，心怀推动全球新金融改革的愿景，
              创立TXB。TXB以“让金融更高效，让财富更自由”作为集团使命，秉承“用户至上”的服务理念，致力于为全球用户提供安全、专业、
              诚信、优质的服务。目前，TXB已完成对新加坡、美国、日本、韩国、香港等多个国家及地区的布局。
            </div>
        </div>
        <div>
          <div>
            <p>TXB全球专业站</p>
            <div>
              TXB全球专业站隶属于TXB，是全球领先的数字资产交易平台，
              总部设立于新加坡。TXB全球站致力于发展优质的数字资产投
              资机会，提供逾百对数字资产品类的交易及投资服务。
            </div>
          </div>
          <div class='country'>
            <div>
                <div class="singapore"><span>新加坡</span></div>
                <div class="usa"><span>美国</span></div>
            </div>
            <div>
              <div class='russia'><span>俄罗斯</span></div>
              <div class='nko'><span>韩国</span></div>
              <div class='japan'><span>日本</span></div>
            </div>
            
          </div>
        </div>
    </div>
    <div class="bottom">
        <p>遍布世界的服务中心</p>
        <div>
          TXB全球专业站业务范围覆盖全球数字资产投资用户，已在新加坡、美国、日本、韩国、香港等多
          个国家和地区设立独立的交易业务或运营中心。
        </div>
        <div>
          <img src="./../../assets/AB-map.png" alt="">
        </div>
    </div>
  </div>
</template>
<script type="text/babel">
  export default {
    data(){
      return {}

    },
    mounted(){

    },
    methods: {},
    components: {}
  }

</script>

<style lang="scss" scoped>
  /* @import "./../../styles/mixin";
  .test{
    @include center();
  } */
  div.top{
    background: url('./../../assets/AB-banner.png');
    height: 420px;
    div.container{
      background: transparent;
      p:first-child{
        font-weight: bold;
        margin-top:202px;
        font-size:38px;
        font-family:MicrosoftYaHei-Bold;
        color:rgba(255,255,255,1);
        line-height:40px;
      }
      p:last-child{
        margin-top: 31px;
        font-size:14px;
        font-family:MicrosoftYaHei;
        color:rgba(102,102,102,1);
        line-height:28px;
      }
    }
  }
  div.middle{
    margin-bottom:80px;
    &>div:first-child{
      margin-top:79px;
      p{
        text-align: center;
        font-weight: bold;
        font-size:36px;
        font-family:MicrosoftYaHei-Bold;
        color:rgba(51,51,51,1);
        line-height:60px;
      }
      div{
        margin-top:31px;
        padding:0 165px;
        font-size:14px;
        font-family:MicrosoftYaHei;
        color:rgba(102,102,102,1);
        line-height:28px;
      }
    }
    &>div:last-child{
      margin-top:54px;
      display:flex;
      height:242px;
      &>div:first-child{
        width:778px;
        background:rgba(247,247,247,1);
        padding:28px 36px;
        margin-left:19px;
        p{
          text-align:center;
          font-weight: bold;
          font-size:28px;
          font-family:MicrosoftYaHei-Bold;
          color:rgba(51,51,51,1);
          line-height:60px;
        }
        div{
          font-size:14px;
          font-family:MicrosoftYaHei;
          color:rgba(102,102,102,1);
          line-height:28px;
        }
      }
      &>div:last-child{
        margin-left:22px;
        font-size:24px;
        font-family:MicrosoftYaHei;
        color:rgba(255,255,255,1);
        line-height:24px;
        display:flex;
        flex-wrap: wrap;
       /* 
        div:nth-child(3){
          width:208px;
          height:110px;
          background:url('./../../assets/AB-Russia.png');
          span{
            display:block;
            margin-top:43px;
            margin-left:67px;
          }
        }
        div:nth-child(4){
          width:208px;
          height:110px;
          background:url('./../../assets/AB-NKO.png');
          span{
            display:block;
            margin-top:44px;
            margin-left:80px;
          }
        }
        div:nth-child(5){
          width:208px;
          height:110px;
          background:url('./../../assets/AB-Japan.png');
          span{
            display:block;
            margin-top:44px;
            margin-left:82px;
          }
        } */
      }
    }
  }
  .country{
    &>div:first-child{
      .singapore{
        float: left;
        margin-right:22px;
        width:323px;
        height:110px;
        background:url('./../../assets/AB-Singapore.png');
        span{
          display:block;
          margin-top:44px;
          margin-left:124px;
        }
      }
      .usa{
        float: left;
        width:322px;
        height:110px;
        background:url('./../../assets/AB-USA.png');
        span{
          display:block;
          margin-top:43px;
          margin-left:136px;
        }
      }
    }
    &>div:last-child{
      display: flex;
      margin-top:22px;
      .russia{
        width:208px;
        height:110px;
        background:url('./../../assets/AB-Russia.png');
        margin-right: 22px;
        span{
          display:block;
          margin-top:43px;
          margin-left:67px;
        }
      }
      .nko{
        width:208px;
        height:110px;
        background:url('./../../assets/AB-NKO.png');
        margin-right: 22px;
        span{
          display:block;
          margin-top:44px;
          margin-left:80px;
        }
      }
      .japan{
        width:208px;
        height:110px;
        background:url('./../../assets/AB-Japan.png');
        span{
          display:block;
          margin-top:44px;
          margin-left:82px;
        }
      }
    }
  }
  div.bottom{
    width:1365px;
    margin:0 auto;
    &>p{
      text-align: center;
      font-size:36px;
      font-weight:bold;
      font-family:MicrosoftYaHei-Bold;
      color:rgba(51,51,51,1);
      line-height:60px;
    }
    &>div:nth-child(2){
      margin-top:32px;
      padding:0 167px;
      font-size:14px;
      font-family:MicrosoftYaHei;
      color:rgba(102,102,102,1);
      line-height:28px;
    }
    &>div:last-child{
      margin-top:51px;
      img{
        width:100%;
      }
    }
  }
</style>
