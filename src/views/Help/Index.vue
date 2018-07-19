<template>
  <div class="heipBoxer">

    <div class="helpTop">
      <div class="helpWrap">
        <h2>帮助中心 </h2>
        <div class="helpSch">
          <div class="helpInput">
            <el-input placeholder="请输入搜索关键词如“购票”" >
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
          <div class="schItem">
            搜索热词：
            <span><router-link to="/HelpList?key=购票">购票</router-link></span>
            <span><router-link to="/HelpList?key=进场">进场</router-link></span>
            <span><router-link to="/HelpList?key=登录">登录</router-link></span>
          </div>
        </div>
      </div>
    </div>

    <div class="helpWrap">
      <h2>热门问题 </h2>
      <div class="hotTopics">
        <div v-for='item in HelpHot' :key='item'>
          {{item.title}}
        </div>
        
      </div>
    </div>

    <div class="selfService">
      <div class="helpWrap"> 
        <h2>自助服务</h2>
        <div class="itemBox">
          <div>
            <img src="./../../assets/help1.png">
            <p>新手注册</p>
          </div>
          <div>
            <img src="./../../assets/help2.png">
            <p>找回密码</p>
          </div>
          <div>
            <img src="./../../assets/help3.png">
            <p>修改密码</p>
          </div>

          <div>
            <img src="./../../assets/help4.png">
            <p>购票</p>
          </div>
          <div>
            <img src="./../../assets/help5.png">
            <p>我要排队</p>
          </div>
          <div>
            <img src="./../../assets/help6.png">
            <p>收款设置</p>
          </div>
        </div>
      </div>
    </div>

    <div class="helpWrap">
      <h2>常见问题  </h2>
      <el-row :gutter="100" class="questionItem">
        <el-col :span="12" v-for='item in HelpALL' :key='item'>
          <div class="item_title">{{item.name}}</div>
          <div class="item_cont">
            <router-link  v-for='subItem in item.list' :key='subItem.id' :to=" '/HelpList/'+subItem.id ">{{subItem.title}}</router-link>

          </div>
        </el-col>
        <!-- <el-col :span="12">
          <div class="item_title">账户管理</div>
          <div class="item_cont">
            <router-link :to="'/'">手机号修改</router-link>
            <router-link :to="'/'">收款设置</router-link>
            <router-link :to="'/'">注销账号</router-link>

            <router-link :to="'/'">实名认证</router-link>
            <router-link :to="'/'">转票</router-link>
            <router-link :to="'/'">点卡</router-link>

          </div>
        </el-col>
        <el-col :span="12">
          <div class="item_title">推荐好友</div>
          <div class="item_cont">
            <router-link :to="'/'">邀请好友</router-link>
            <router-link :to="'/'">奖励规则</router-link>
            <router-link :to="'/'">分享平台</router-link>

          </div>
        </el-col>
        <el-col :span="12">
          <div class="item_title">C2C投资</div>
          <div class="item_cont">
            <router-link :to="'/'">排队</router-link>
            <router-link :to="'/'">进场券</router-link>
            <router-link :to="'/'">收钱</router-link>

            <router-link :to="'/'">打款</router-link>
            <router-link :to="'/'">修改价钱</router-link>
          </div>
        </el-col> -->
      </el-row>
    </div>

    <div class="helpWrap">
      <h2>联系我们</h2>
      <p class="contact_text">上面没有找到自己的疑问，可以试试联系我们哦。</p>
      <el-button type="primary" round style="width:140px;">联系我们</el-button>
    </div>
    <br/><br/><br/><br/><br/>
  </div>
</template>
<script type="text/babel">
  import until from "@/scripts/until";
  import {baseUrl} from "@/config/env";

  export default {
    data(){
      return {
        HelpHot:[],
        HelpALL:[]
      }

    },
    mounted(){
      this.getHelpHot();
      this.getHelpALL();
    },
    methods: {
      getHelpHot(){
        try{
          let url=baseUrl+'Article/getArticleHelpHot';
          let config={
            method:"POST",
            url: url,
            data:{r:Math.random()}
          };
          this.$axios(config).then(result => {
            if (until.responesValidate(result)) {
              // console.log(result.data.data)
              this.HelpHot=result.data.data
            }
          })
        }catch(ex){
          until.consoleLog(ex)
        }
      },
      getHelpALL(){
        try{
          let url=baseUrl+'Article/getArticleHelpALL';
          let config={
            method:"POST",
            url: url,
            data:{r:Math.random()}
          };
          this.$axios(config).then(result => {
            if (until.responesValidate(result)) {
              // console.log(result.data.data)
              this.HelpALL=result.data.data
            }
          })
        }catch(ex){
          until.consoleLog(ex)
        }
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
      div{margin-top: 30px;width: 33%;float: left;font-size: 16px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;padding:0 10px;box-sizing:border-box;}
    }
  }
  .helpWrap:after{clear:both;}
  .selfService{
    padding:30px 0;background: #FAFBFB;
    .itemBox{display: flex;align-items:center;justify-content:space-between;margin-top: 30px;padding:0 30px;
      div{text-align: center;
        p{margin-top: 20px;font-size: 16px;}
      }
    }
  }
  .questionItem .el-col{margin: 30px 0;
    .item_title{background:#F2F6FE;font-size: 20px;height: 65px;line-height: 65px;text-align: center;}
    .item_cont{
      overflow: hidden;background: #FAFBFB;min-height: 200px;position: relative;
     a{display: block;width: 49.8%;float: left;height: 65px;line-height: 65px;font-size: 16px;color: #666;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;padding:0 10px;box-sizing:border-box;}
      :hover{color: #5357E2;}
    }
    .item_cont:after{content: '';width: 0;height: 75%;border-left: 1px solid #F0F0F0;position: absolute;top: 50%;transform:translateY(-50%);left: 50%;}
  }
  
  .contact_text{margin:20px 0;font-size: 16px;}


</style>
