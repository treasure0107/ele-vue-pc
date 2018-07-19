<template>
  <div class="main">
    <div class="c2cBanner"><img src="./../../assets/banner.jpg" alt=""></div>
    <div class="container">
      <el-container>
        <el-main>
          <div class="joinInfo" v-if="status==-1&&userState.some((item)=>item.id==1)"><!--未参与-->
            <el-row class="info">
              <el-col :span="18" class="infoBox">
                <el-col :span="8" class="account">
                  <div>账户币余额</div>
                  <b>{{available_coin}}</b> <span class="coin">GFC</span>
                </el-col>
                <el-col :span="8" class="account">
                  <div>可用票数</div>
                  <em>{{available_votes}}</em>
                </el-col>
                <el-col :span="8" class="account">
                  <div>备用金可用余额 </div>
                  <em>{{available_cny}}</em>
                </el-col>
              </el-col>
              <el-col :span="6">
                <div class="joinBtn">
                  <p>当前账户状态</p>
                  <div v-if='userState.length == 1'>{{userState[0].name}}</div>
                  <el-dropdown v-if="userState.length != 1" trigger="hover" placement="bottom-start"
                               @command="handleCommand">
                    <span class="el-dropdown-link">
                      {{userState[0].name}}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item v-for='(item,index) in userState' :key='index' :command="item">{{item.name}}
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>

                  <router-link style="color:#5357E2;" :to="'/lineUp'">
                    <el-button type="primary" round style="">我要参与</el-button>
                  </router-link>
                </div>
              </el-col>
            </el-row>
          </div>

          <div class="joinInfo" v-if="status==0&&userState.some((item)=>item.id==1)">
            <el-row class="info">
              <el-col :span="18" class="infoBox">
                <el-col :span="8" class="account">
                  <div>参与金额</div>
                  <b>{{entrance_money}}</b> <span class="coin">CNY</span>
                </el-col>
                <el-col :span="8" class="account">
                  <div>使用票数</div>
                  <em>{{entrance_votes}}票</em>
                </el-col>
                <el-col :span="8" class="account">
                  <div>冻结备用金</div>
                  <em class="disable">{{frozen_cny}}</em>
                </el-col>
                <el-col :span="8" class="account">
                  <div>剩余可用票数</div>
                  <em>{{available_votes}}票</em>
                </el-col>
                <el-col :span="8" class="account">
                  <div>使用备用金</div>
                  <em>{{entrance_deduction}}</em>
                </el-col>
              </el-col>
              <el-col :span="6">
                <div class="joinBtn">
                  <p>当前账户状态</p>
                  <div v-if='userState.length == 1'>{{userState[0].name}}</div>
                  <el-dropdown v-if="userState.length != 1" trigger="hover" placement="bottom-start"
                               @command="handleCommand">
										<span class="el-dropdown-link">
											{{userState[0].name}}<i class="el-icon-arrow-down el-icon--right"></i>
										</span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item v-for='(item,index) in userState' :key='index' :command="item">{{item.name}}
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>

                  <router-link style="color:#5357E2;" :to="'/lineUp?edit=true'">
                    <el-button type="primary" round style="">修改参与信息</el-button>
                  </router-link>
                </div>
              </el-col>
            </el-row>
          </div>

          <!-- <div class="listBox">
            <h2>正在卖出  <span></span></h2>
            <img-scroll :comeOutData="comeOutData"></img-scroll>
                 <div class="lists">
                    <div class="list_item" v-for="(item,index) in comeOutData" :key="index">
                      <img src="./../../assets/head.jpg">
                      <p>{{item.username}}</p>
                      <p>买 {{item.num}}</p>
                    </div>
                  </div>
          </div> -->

          <div class="listBox">
            <h2>
              用户参与列表  <span>以下列表不代表具体排队顺序</span>
              <div class="listNum">
                当前排队人数：<b>{{entranceCount}}</b> 人
              </div>
            </h2>
            <div class="lists">
              <div class="list_item" v-for="(item,index) in entranceData" :key="index">
                <img :src="item.photo">
                <p>{{item.username}}</p>
                <p>买 {{item.entrancemoney}}</p>
              </div>
            </div>
          </div>
        </el-main>
      </el-container>
    </div>

  </div>


</template>
<script type="text/babel">
  import until from "@/scripts/until";
  import {baseUrl} from "@/config/env";
  import ImgScroll from "@/components/ImgScroll";
  export default {
    data(){
      return {
        entrance_money: '',//排队金额
        available_cny: '',//可用备用金
        available_votes: '',//可用票
        available_coin: '',//可用币
        entrance_votes: '',//使用票数
        frozen_votes: '',//冻结票数
        frozen_cny: '',//冻结备用金
        comeOutData: [],//正在卖出
        entranceData: [],//等待进场列表
        entranceCount: 0,//排队人数
        userState: [],//用户状态,
        status: '',
        entrance_deduction: '' //使用备用金（备用金抵扣）
      }

    },
    mounted(){
      this.getUsercoin()
      this.getComeout()
      this.getEntrance()
    },
    methods: {
      /* handleCommand(command) {
       this.$message('click on item ' + command);
       }, */
      //获取账户基本信息
      getUsercoin(){
        try {
          let url = baseUrl + "/account/c2c/getusercoin";
          let config = {
            method: "POST",
            url: url + "?r=" + Math.random()
          };
          this.$axios(config).then(result => {
            if (until.responesValidate(result)) {
              this.entrance_money = result.data.data.entrance_money
              this.available_cny = result.data.data.available_cny
              this.available_votes = result.data.data.available_votes
              this.available_coin = result.data.data.available_coin
              this.frozen_votes = result.data.data.frozen_votes
              this.frozen_cny = result.data.data.frozen_cny
              this.userState = result.data.data.type_list
              this.status = result.data.data.status
              this.entrance_deduction = result.data.data.entrance_deduction
              this.entrance_votes = result.data.data.entrance_votes;
            }
          });
        } catch (ex) {
          until.consoleLog(ex);
        }
      },
      //获取正在卖出
      getComeout(){
        try {
          let url = baseUrl + "/account/c2c/comeout";
          let config = {
            method: "POST",
            url: url + "?r=" + Math.random()
          };
          this.$axios(config).then(result => {
            if (until.responesValidate(result)) {
              this.comeOutData = result.data.data
            }
          });
        } catch (ex) {
          until.consoleLog(ex);
        }
      },
      //获取等待参与
      getEntrance(){
        try {
          let url = baseUrl + "/account/c2c/entrance";
          let config = {
            method: "POST",
            url: url + "?r=" + Math.random()
          };
          this.$axios(config).then(result => {
            if (until.responesValidate(result)) {
              this.entranceData = result.data.data.list;
              this.entranceCount = result.data.data.total;
              if (this.$route.path == "/C2C") {
                setTimeout(() => {
                  this.getEntrance()
                }, 10000)
              }
            }
          });
        } catch (ex) {
          until.consoleLog(ex);
        }
      }
    },
    components: {
      ImgScroll
    }
  }
</script>


<style lang="scss" scoped>
  .main {
    width: 100%;
    background: #fff
  }

  .c2cBanner {
    height: 140px;
    width: 100%;
    min-width: 1200px;
    overflow: hidden;
    position: absolute;
    img {
      position: absolute;
      transform: translateX(-50%);
      left: 50%;
      top: 0;
    }
  }

  .el-main {
    padding: 140px 0 0 0;
  }

  .info {
    display: flex;
  }

  .joinInfo {
    box-shadow: 0 0 10px 0 #ddd;
  }

  .infoBox {
    padding-top: 30px;
  }

  .infoBox .el-col {
    margin-bottom: 20px;
    text-align: center;
  }

  .joinBtn {
    border-left: 1px solid #F6F6F6;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    p {
      font-size: 14px;
      color: #666;
    }
    b {
      font-size: 24px;
      display: block;
      margin: 10px 0
    }
    .el-button {
      width: 180px;
      background: #2E6AF4;
      font-size: 16px;
    }
    div {
      font-size: 24px;
      height: 36px;
      margin-top: 10px;
    }
  }

  .listBox {
    margin: 40px 0;
    h2 {
      font-size: 20px;
      span {
        font-size: 14px;
        color: #999;
        margin-left: 20px;
      }
      .listNum {
        float: right;
        font-size: 14px;
        color: #999;
        b {
          font-size: 20px;
          color: #EB4543;
        }
      }
    }
    .lists {
      overflow: hidden;
      display: flex;
      flex-wrap: wrap; //justify-content:space-between;
      .list_item {
        width: 10%;
        padding: 20px 0;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        img {
          width: 80px;
          height: 80px;
          border-radius: 50%;
        }
        p {
          color: #666;
          margin: 10px 0 0 0;
        }
      }
    }
  }

  .el-dropdown {
    margin: 10px 0 15px;
  }

  .el-dropdown-link {
    font-size: 24px;
  }

  .changeEntrance-enter-active, .changeEntrance-leave-active {
    transition: all 1s;
  }

  .changeEntrance-enter, .changeEntrance-leave-to
    /* .list-leave-active for below version 2.1.8 */
  {
    opacity: 0;
  }

  .account {
    height: 72px;
    div {
      font-size: 14px;
      color: #666;
      margin-bottom: 15px;
      line-height: 30px;

    }
  }
</style>
