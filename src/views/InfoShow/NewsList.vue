<template>
  <div class="container news">
    <h1>新闻资讯</h1>
    <div class="lists" v-for="(item,index) in newsList" :key="index">
        <img :src="item.image" alt="">
        <router-link :to="{path:'/NewsDetails',query:{id:item.id}}">{{item.title}}</router-link>
        <div class='text'>
          <div class="ellipsis">{{item.description}}</div>
          <router-link :to="{path:'/NewsDetails',query:{id:item.id}}">[查看全文]</router-link>
        </div>
        <p class='source'>
          来源：{{item.keywords}}&nbsp;&nbsp;{{item.createtime}}
        </p>
    </div>
    <div class='pages'>
      <el-pagination
        background
        layout=" pager"
        :page-size="10"
        :total="count"
        @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </div>
</template>
<script type="text/babel">
  import until from "@/scripts/until";
  import {baseUrl} from "@/config/env";
  export default {
    data(){
      return {
        count:0,
        newsList:[]
      }

    },
    mounted(){
      this.getNewsList();
    },
    methods: {
      //获取新闻列表
      getNewsList(page){
        try {
          let url = baseUrl + "/article/getArticleNewList";
          let config = {
            method: "POST",
            url: url + "?r=" + Math.random(),
            data:{page:page}
          };
          this.$axios(config).then(result => {
            if (until.responesValidate(result)) {
              this.newsList = result.data.data.list
              this.count = result.data.data.count
            }
          });
        } catch (ex) {
          until.consoleLog(ex);
        }
      },
      //分页
      handleCurrentChange(val){
        this.getNewsList(val)
      }
    },
    components: {}
  }

</script>

<style lang="scss" scoped>
  div.news{
    padding-top:99px;
    padding-left:60px;
    background:#fff;
    h1{
      font-size:36px;
      font-family:MicrosoftYaHei-Bold;
      color:rgba(51,51,51,1);
      line-height:60px;
    }
    div.lists{
      width:100%;
      height:190px;
      margin-top:30px;
      border-bottom: 1px solid #F4F4F4;
      img{
        width:260px;
        height:160px;
        float: left;
        vertical-align: text-bottom;
        margin-right: 33px;
      }
      &>a{
        font-size:20px;
        font-family:MicrosoftYaHei;
        color:#333;
        line-height:52px;
        cursor: pointer;
        &:hover{
          color:blue;
        }
      }
      div.text{
        font-size:14px;
        font-family:MicrosoftYaHei;
        color:#666;
        line-height:24px;
        padding-right:113px;
        a:hover{
          color:blue;
        }
      }
      p.source{
        margin-top: 14px;
        font-size:12px;
        font-family:MicrosoftYaHei;
        color:#999;
        line-height:22px;
      }
    }
    div.pages{
      margin: 40px 0 38px 0;
      text-align: center;
    }
  }
</style>
