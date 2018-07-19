<template>
  <div class="main">
    <index-banner></index-banner>
    <!--柱状图-->
    <index-bargraph></index-bargraph>
    <!--新闻中心-->
    <div class="news-main-wrap">
      <div class="news-main">
        <h1 class="rows-title">新闻中心</h1>
        <ul class="">
          <li v-for='(item,index) in NewList' :key='index'>
            <img :src="item.image" alt="" />
            <dl>
              <dt>{{item.name}}</dt>
              <dd v-for='(subItem,index) in item.list' :key='index'><router-link :to="'/NewsDetails/'+subItem.id " v-html="subItem.title"></router-link></dd>
            </dl>
          </li>
          <!-- <li>
            <img src="../assets/3.jpg" alt="">
            <dl>
              <dt>区块链</dt>
              <dd>
                行业未来监管会更严格！谁都不和....
                开创多个第一！区块链端游《王者....
                万事达卡正在研究使用区块链
                比较 | 区块链的四大优势与传统金....
              </dd>
            </dl>
          </li>
          <li>
            <img src="../assets/2.jpg" alt="">
            <dl>
              <dt>区块链</dt>
              <dd>
                行业未来监管会更严格！谁都不和....
                开创多个第一！区块链端游《王者....
                万事达卡正在研究使用区块链
                比较 | 区块链的四大优势与传统金....
              </dd>
            </dl>
          </li>
          <li>
            <img src="../assets/4.jpg" alt="">
            <dl>
              <dt>区块链</dt>
              <dd>
                行业未来监管会更严格！谁都不和....
                开创多个第一！区块链端游《王者....
                万事达卡正在研究使用区块链
                比较 | 区块链的四大优势与传统金....
              </dd>
            </dl>
          </li> -->
        </ul>
      </div>
    </div>

    <!--合作伙伴-->
    <div class="partner-main-wrap">
      <div class="partner-main">
        <h1 class="rows-title">合作伙伴</h1>
        <ul class="map clearFix">
          <li>
            <a href="#"><img src="./../assets/partner1.jpg" alt="" /></a>
          </li>
          <li>
            <a href="#"><img src="./../assets/partner2.jpg" alt="" /></a>
          </li>
          <li>
            <a href="#"><img src="./../assets/partner2.jpg" alt="" /></a>
          </li>
          <li>
            <a href="#"><img src="./../assets/partner2.jpg" alt="" /></a>
          </li>
          <li>
            <a href="#"><img src="./../assets/partner2.jpg" alt="" /></a>
          </li>
        </ul>
      </div>
    </div>

    <!--遍布世界的服务中心-->
    <div class="service-center-main">
      <div class="service-main">
        <h1 class="rows-title">遍布世界的服务中心</h1>
        <img src="./../assets/map.png"  alt="" class="map" />
      </div>
    </div>
    <!--二维码下载-->
    <div class="qr-main-wrap">
      <div class="qr-main">
        <h1 class="rows-title">移动客户端下载</h1>
        <p class="p1">已全面覆盖ios、Android，支持全业务功能</p>
      </div>
    </div>
  </div>
</template>
<script type="text/babel">
  import until from "@/scripts/until";
  import {baseUrl} from "@/config/env";

  import IndexBanner from "@/components/IndexBanner";
  import IndexBargraph from "@/components/IndexBargraph";
  import IndexContainer from "@/components/Container";
  export default {
    data(){
      return {
        NewList:[]
      }

    },
    mounted(){
      this.getNewList();
    },
    methods: {
      getNewList(){
        try{
          let url=baseUrl+'index/getIndexNewList';
          let config={
            method:"POST",
            url: url,
            data:{r:Math.random()}
          };
          this.$axios(config).then(result => {
            if (until.responesValidate(result)) {
              //console.log(result.data.data)
              this.NewList=result.data.data
            }
          })
        }catch(ex){
          until.consoleLog(ex)
        }
      }
    },
    components: {
      IndexBanner,
      IndexContainer,
      IndexBargraph
    }
  }

</script>

<style lang="scss" scoped>
  @import "./../styles/mixin";
  .news-main-wrap {
    background-color: #fafbfb;
    padding: 65px 0;
    .news-main {
      @include marginAuto();
      ul {
        padding-top: 50px;
        @include flexAuto();
        width: 100%;
        li {
          display: inline-block;
          background-color: #ffffff;
          width: 272px;
          padding-bottom: 22px;
          border: solid 1px #ffffff;
          img {
            max-width: 100%;height: 180px;
          }
          dl {
            padding: 0 18px;
            dt {
              padding: 18px 0;
              @include sc(16px, #333333);
              font-weight: 600;
            }
            dd {
              text-align: left;
              line-height: 35px;
              @include sc(14px, #333333);
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;

            }
          }
        }
      }
    }
  }
  .partner-main-wrap {
    padding: 56px 0;
    //  background: url("./../assets/partnerbg.png") center top repeat;
    .partner-main {
      @include marginAuto();
      ul.map {
        margin-top: 70px;
        @include flexAuto();
        margin-left: -20px;
        li {
          display: inline-block;
          margin-bottom: 20px;
          width: 240px;
          height: 68px;
          margin-left: 20px;
          img {
            width: 100%;
            max-height: 60px;
          }
        }
      }
    }
  }
  .service-center-main {
    padding: 60px 0;
    .service-main {
      @include marginAuto();
      img.map {
        padding-top: 50px;
        width:100%
      }
    }
  }
  .qr-main-wrap {
    background-color: #f5f5fb;
    padding-top: 104px;
    .qr-main {
      @include marginAuto();
      p.p1 {
        text-align: center;
        padding: 36px 0 111px 0;
        @include sc(30px, #666666);
      }
    }
  }
  .rows-title {
    text-align: center;
    /*  padding: 50px 0;*/
    @include sc(36px, #333333);
  }
</style>
