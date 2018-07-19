<template>
  <div class="heipBoxer">

    <div class="helpTop">
      <div class="helpWrap">
        <h2>帮助中心 </h2>
        <div class="helpSch">
          <div class="helpInput">
            <el-input placeholder="请输入搜索关键词如“购票”" v-model="inputVal">
              <el-button slot="append" icon="el-icon-search" @click="Helpseach(inputVal)"></el-button>
            </el-input>
          </div>
          <div class="schItem">
            搜索热词：
            <span @click="Helpseach('购票')">购票</span>
            <span @click="Helpseach('进场')">进场</span>
            <span @click="Helpseach('登录')">登录</span>
          </div>
        </div>
      </div>
    </div>

    <div class="helpWrap">
      <div v-if='HelpSearch.length!=0'>
        <div class="helpList">
          <el-collapse v-model="activeName" accordion>
            <el-collapse-item :title="item.title" :name="(index+1)" v-for='(item,index) in HelpSearch' :key='item.id'>
              <div v-html='item.content'></div>
            </el-collapse-item>

            <!-- <el-collapse-item title="点击购票之后没有反应怎么办？" name="2">
              <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
              <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
            </el-collapse-item>
            
            <el-collapse-item title="用户可以自由的进行操作" name="10">
              <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
              <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
            </el-collapse-item> -->
          </el-collapse>
        </div>
        <!-- <div class="page-wrap">
          <el-pagination
            prevText="上一页"
            nextText="下一页"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="5"
            layout="prev, pager, next, jumper"
            :total="100">
          </el-pagination>
        </div> -->
      </div>
      <div class="noData" v-else>暂无数据</div>
    </div>
    
    <br/><br/><br/>
  </div>
</template>
<script type="text/babel">
  import until from "@/scripts/until";
  import {baseUrl} from "@/config/env";
  export default {
    data(){
      return {
        currentPage: 1,
        inputVal: '',
        activeName: '1',
        HelpSearch:[]
      }

    },
    mounted(){
      this.inputVal=this.$route.query.key
      this.getHelpSearch(this.$route.query.key);
      // console.log(this.$route.query.key)
    },
    methods: {
      handleSizeChange(){

      },
      handleCurrentChange(){

      },
      getHelpSearch(key){
        try {
          let url = baseUrl + "/Article/getArticleHelpSearch";
          let config={
            method:"POST",
            url: url,
            data:{r:Math.random(), search:key, page:1}
          };
          this.$axios(config).then(result => {
            if (until.responesValidate(result)) {
              console.log(result);
              this.HelpSearch=result.data.data.list;
            }
          });
        } catch (ex) {
          until.consoleLog(ex);
        }

      },
      Helpseach(val){
        this.inputVal=val;
        this.getHelpSearch(val);
      }

    },
    components: {}
  }

</script>

<style lang="scss" scoped>
  .helpTop{padding:50px 0;background: url(./../../assets/banner2.jpg) no-repeat center top;
    .helpWrap{display: flex;padding:30px 150px;
      h2{color: #fff;font-size: 36px;margin-right: 80px;}
      .helpSch{flex:1;
        .schItem{font-size: 16px;color: #ECECEC;padding-top: 20px;
          span{display: inline-block;margin-left: 20px;cursor: pointer;
            a{color: #ECECEC;}
            :hover{color: #5357E2;}
          }
        }
      }
    }
    
  }

  .heipBoxer{background: #fff;}
  .helpWrap{width: 1200px;padding:30px 100px;margin:0 auto;box-sizing:border-box;
    h2{font-size: 24px;}
    .hotTopics{overflow: hidden;
      div{margin-top: 30px;width: 33%;float: left;font-size: 16px;}
    }
  }
  .helpWrap:after{clear:both;}

  .helpList{overflow: hidden;padding:30px 0;
    .el-collapse-item{background: #ccc;
      div[role="button"]{font-weight: bold!important;}
    }
  }
  .page-wrap{text-align: center;padding: 20px 0;}
  .noData{font-size: 30px;text-align: center;color: #999;}
</style>
