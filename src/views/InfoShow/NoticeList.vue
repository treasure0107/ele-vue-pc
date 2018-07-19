<template>
  <div class="container lists">
    <h1>公告</h1>
    <ul>
      <li v-for='(item,index) in lists' :key='index' @click='toDetails(item.id)'>
        {{item.title}}
        <span class='fr'>{{item.createtime}}</span>
      </li>
    </ul>
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
        lists:[],
        count:0
      }

    },
    mounted(){
      this.getList()
    },
    methods: {
      //获取公告列表
      getList(page){
        try {
          let url = baseUrl + "/article/getArticleggList";
          let config = {
            method: "POST",
            url: url + "?r=" + Math.random(),
            data:{page:page}
          };
          this.$axios(config).then(result => {
            if (until.responesValidate(result)) {
              this.lists = result.data.data.list
              this.count = result.data.data.count
            }
          });
        } catch (ex) {
          until.consoleLog(ex);
        }
      },
      //分页
      handleCurrentChange(val){
        this.getList(val)
      },
      //去详情页
      toDetails(id){
        this.$router.push('/NoticeDetails?id='+id)
      }
    },
    components: {}
  }

</script>

<style lang="scss" scoped>
  div.lists{
    padding:46px 60px;
    h1{
      font-size:36px;
      font-family:MicrosoftYaHei-Bold;
      color:#333;
      line-height:60px;
    }
    ul{
      li{
        font-size:16px;
        font-family:MicrosoftYaHei;
        color:#333;
        line-height:60px;
        border-bottom: 1px solid #f4f4f4;
        span{
          color:#999
        }
        &:hover{
          cursor: pointer;
          color:blue;
        }
      }
    }
    div.pages{
      margin: 40px 0 38px 0;
      text-align: center;
    }
  }
</style>
