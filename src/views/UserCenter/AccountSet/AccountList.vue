<template>
  <div class="center-main" style="padding: 10px 30px">
    <h2 class="center-title">账户总览</h2>
    <el-row class="infoBox" style="padding-bottom: 0">
      <el-col :span="6" class="account">
        <div>账户币可用余额</div>
        <b v-text="available_coin || 0">365.46</b> <span class="coin">GFC</span>
      </el-col>
      <el-col :span="6" class="account">
        <div style="margin-bottom: 5px">当前账户状态</div>
        <!--<p class="lineUp">排队中<i class="el-icon-arrow-down"></i></p>-->
        <div class="choce">
          <el-select v-model="type" placeholder="请选择"
                      @change="changer()">
            <el-option
              v-for="item in type_list"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
					<el-button type="primary" size="mini" round @click="$router.push('/lineUp')" v-if="status==0&&type_list.some((item)=>item.id==1)">修改参与信息</el-button>
          <el-button type="primary" size="mini" round @click="$router.push('/lineUp')" v-if="status==-1&&type_list.some((item)=>item.id==1)">我要参与</el-button>
        </div>
      </el-col>
      <el-col :span="6" class="account">
        <div>账户备用金余额</div>
        <em v-text="available_cny || 0">225</em>
      </el-col>
      <el-col :span="6" class="account">
        <div>可用票数</div>
        <em v-text="available_votes || 0">225</em>
        <el-button type="primary" size="mini" round @click="turnTickets">转票</el-button>
      </el-col>
    </el-row>
    <el-row class="infoBox border_b" style="padding-top: 0">
      <el-col :span="6" class="account">
        <div>冻结币
          <el-popover
            placement="top"
            width="200"
            trigger="hover"
            content="卖出中的币数量">
            <el-button type="text" slot="reference" size="mini" icon="el-icon-question" circle></el-button>
          </el-popover>
        </div>
        <em class="disable" v-text="frozen_coin || 0">25 <small>XRP</small></em>
      </el-col>
      <el-col :span="6" class="account">
        <div>冻结票数
            <el-popover
            placement="top"
            width="200"
            trigger="hover"
            content="参与中使用的票数">
            <el-button type="text" slot="reference" size="mini" icon="el-icon-question" circle></el-button>
          </el-popover>
        </div>
        <em class="disable" v-text="frozen_votes || 0">225</em>
      </el-col>
      <el-col :span="6" class="account">
        <div>冻结备用金
            <el-popover
            placement="top"
            width="200"
            trigger="hover"
            content="参与中所抵扣的备用金">
            <el-button type="text" slot="reference" size="mini" icon="el-icon-question" circle></el-button>
          </el-popover>
        </div>
        <em class="disable" v-text="frozen_cny || 0">225</em>
      </el-col>

    </el-row>
    <!--<p class="curListNum">最近8条交易记录 <a href="javascript:void(0)" @click="$router.push('/RecordList')">查看更多 ></a></p>-->

    <!--<div class="tab-list">-->
      <!--<el-table :data="tableData" stripe style="width: 100%">-->
        <!--<el-table-column-->
          <!--label="交易时间"-->
          <!--width="200"-->
          <!--align="center">-->
          <!--<template slot-scope="scope">-->
            <!--<span style="margin-left: 5px">{{ scope.row.addtime }}</span>-->
          <!--</template>-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--prop="title"-->
          <!--label="交易类型"-->
          <!--width="150"-->
          <!--align="center">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--label="操作金额"-->
          <!--width="200"-->
          <!--align="center">-->
          <!--<template slot-scope="scope">-->
            <!--<span style="margin-left: 5px">{{ scope.row.amount }} {{ scope.row.xnb }}</span>-->
          <!--</template>-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--prop="status"-->
          <!--label="状态"-->
          <!--width="150"-->
          <!--align="center">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--width="170"-->
          <!--label="操作"-->
          <!--align="center">-->
          <!--<template slot-scope="scope">-->
          <!--<router-link style="color:#5357E2;" :to="'/RecordDetial/' + scope.row.id + '/' + scope.row.type">查看详情</router-link>-->
          <!--</template>-->
        <!--</el-table-column>-->
      <!--</el-table>-->
    <!--</div>-->
  </div>
</template>
<script type="text/babel">
  import until from "@/scripts/until";
  import {baseUrl} from "@/config/env";
	import {MessageBox} from 'element-ui';
  const obj={
    id:1,
    date:"2018-10-10 10:10:10",
    type:'买入',
    money:'5000XRP',
    tradeId:'A45111',
    tradeState:'待付款'
  }
  export default {
    data(){
      return {
        available_coin: '',
        available_cny: '',
        available_votes: '',
        frozen_votes: '',
        frozen_cny: '',
        frozen_coin: '',
        currentPage: 1,
        tableData: [],
				type_list:[],
				status:'',
        options: [{
          value: '近七日',
          label: '近七日'
        }, {
          value: '近一个月',
          label: '近一个月'
        }, {
          value: '近三个月',
          label: '近三个月'
        }, {
          value: '近半年',
          label: '近半年'
        }],
        value: '',
        type_list: [],
        type: '',
				paypassword:0
      }

    },
    mounted(){
      this.getCoin(1);
      this.getMs();
			this.getProfile();
    },
    methods: {
      changer () {
        this.getCoin();
      },
			//获取账户基本信息
			getProfile(){
				try {
					let	url = baseUrl + "/friends/getProfile";
					let config = {
						method: "post",
						url: url + "?r=" + Math.random()
					};
					this.$axios(config).then(result => {
						if (until.responesValidate(result)) {
							let data=result.data.data;
							this.paypassword=data.paypassword
						}
					});
				} catch (ex) {
					until.consoleLog(ex);
				}
			},

			turnTickets(){
				if(this.paypassword==0){
					MessageBox({
						title: "提示",
						message: '您还未设置交易密码,请先设置交易密码',
						confirmButtonText: '去设置',
						type: "info",
						showClose: true,
						callback: (action, instance) => {
							if (action == "confirm") {
								router.push({path: "/AccountSet"})
							}
						}
					});
				}else{
					this.$router.push('/TurnTicket')
				}
			},
      getCoin (it) {
        let self = this;
        try {
          this.$axios({
            method: "post",
            url: baseUrl + 'account/c2c/getusercoin?r=' + Math.random(),
            data: {
              "type": self.type
            }
          }).then((result) => {
            if (until.responesValidate(result)) {
              let res = result.data.data;
              self.available_coin=res.available_coin;
              self.available_cny=res.available_cny;
              self.available_votes=res.available_votes;
              self.frozen_votes=res.frozen_votes;
              self.frozen_cny=res.frozen_cny;
              self.frozen_coin=res.frozen_coin;
              self.type_list=res.type_list;
							self.status=res.status;
              if(it) {
                setTimeout(function () {
                  if (res.type_list[0]) {
                    document.getElementsByClassName('el-input__inner')[0].value = res.type_list[0].name
                    self.type = res.type_list[0].id
                  }
                },50)
              }
            }
          });
        } catch (ex) {
          until.consoleLog(ex);
        }
      },
      getMs () {
        let self = this;
        try {
          this.$axios({
            method: "post",
            url: baseUrl + 'account/Record/getAccountRecodelist?r=' + Math.random(),
            data: ''
          }).then((result) => {
            if (until.responesValidate(result)) {
              let res = result.data.data;
              self.tableData=res
            }
          });
        } catch (ex) {
          until.consoleLog(ex);
        }
      },
      handleSizeChange(){

      },
      handleCurrentChange(){

      }
    },
    components: {}
  }

</script>

<style lang="scss" scoped>
</style>
<style lang="css" >
  .choce .el-input__inner{
    border:none;
    color: #606266;
    font-size: 16px;
    margin-bottom:0px!important;
    height: 41px;
    padding-right: 0px!important;
    padding-left: 0px!important;
  }
  .choce .el-input__suffix{
    right:69px;
  }
  .choce {
    margin-bottom: 0!important;
    position: relative;
  }
  .choce .el-button {
    position: absolute;
    top: 8px;
    left: 106px;
  }
</style>
