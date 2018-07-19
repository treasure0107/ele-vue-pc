<template>
  <div class="center-main" >
    <div v-if="type == '1'">
      <el-row class="breadcrumbs">
        <el-col :span="16">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/RecordList' }">交易记录</el-breadcrumb-item>
            <el-breadcrumb-item>买入XRP交易详情 </el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
        <el-col :span="8">
          <time>2018-06-13 16:12:13</time>
        </el-col>
      </el-row>
      <el-row class="infoBox">
        <el-col :span="6" class="account">
          <div>买入</div>
          <em v-text="buyData.entrancemoney + ' ' + buyData.currency">365.46XRP</em>
        </el-col>
        <el-col :span="6" class="account">
          <div>单价</div>
          <em v-text="buyData.price + ' ' + buyData.currency">3.65CNY/XRP</em>
        </el-col>
        <el-col :span="6" class="account">
          <div>买入金额 </div>
          <em>9764cny</em>
        </el-col>
        <el-col :span="6" class="account">
          <div>实际支付</div>
          <em>8964cny</em>
        </el-col>
      </el-row>
      <el-row class="infoBox border_b">
        <el-col :span="6" class="account">
          <div>使用票数</div>
          <em>5</em>
        </el-col>
        <el-col :span="6" class="account">
          <div>使用备用金</div>
          <em>225</em>
        </el-col>

      </el-row>
    </div>
    <div v-if="type == '2'">
      <el-row class="breadcrumbs">
        <el-col :span="16">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/RecordList' }">交易记录</el-breadcrumb-item>
            <el-breadcrumb-item>买入XRP交易详情 </el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
        <el-col :span="8">
          <time>2018-06-13 16:12:13</time>
        </el-col>
      </el-row>
      <el-row class="infoBox">
        <el-col :span="6" class="account">
          <div>买入</div>
          <em>365.46XRP</em>
        </el-col>
        <el-col :span="6" class="account">
          <div>单价</div>
          <em>3.65CNY/XRP</em>
        </el-col>
        <el-col :span="6" class="account">
          <div>买入金额 </div>
          <em>9764cny</em>
        </el-col>
        <el-col :span="6" class="account">
          <div>实际支付</div>
          <em>8964cny</em>
        </el-col>
      </el-row>
      <el-row class="infoBox border_b">
        <el-col :span="6" class="account">
          <div>使用票数</div>
          <em>5</em>
        </el-col>
        <el-col :span="6" class="account">
          <div>使用备用金</div>
          <em>225</em>
        </el-col>

      </el-row>
    </div>



    <!--<div class="tab-list">-->
      <!--<el-table :data="tableData" style="width: 100%">-->
        <!--<el-table-column-->
          <!--prop="ids"-->
          <!--label="订单编号"-->
          <!--width="160">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--prop="count"-->
          <!--label="交易量"-->
          <!--width="100">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--prop="total"-->
          <!--label="总价"-->
          <!--width="150">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--prop="tic"-->
          <!--label="使用票"-->
          <!--width="80">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--prop="payBak"-->
          <!--label="备用金抵扣"-->
          <!--width="100">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--prop="pay"-->
          <!--label="实际支付"-->
          <!--width="120">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--prop="date"-->
          <!--label="时间">-->
        <!--</el-table-column>-->
      <!--</el-table>-->
    <!--</div>-->
    <!--<div class="page-wrap">-->
      <!--<el-pagination-->
        <!--prevText="上一页"-->
        <!--nextText="下一页"-->
        <!--@size-change="handleSizeChange"-->
        <!--@current-change="handleCurrentChange"-->
        <!--:current-page.sync="currentPage"-->
        <!--:page-size="5"-->
        <!--layout="prev, pager, next, jumper"-->
        <!--:total="100">-->
      <!--</el-pagination>-->
    <!--</div>-->
  </div>

</template>
<script type="text/babel">
  import until from "@/scripts/until";
  import {baseUrl} from "@/config/env";
  export default {
    data(){
      return {
        currentPage: 1,
        tableData: [],
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
        type: '',
        id: '',
        buyData: {},
        saleData: {}
      }

    },
    mounted(){
      var type = this.$route.params.type;
      this.type = type;
      var id = this.$route.params.id;
      this.id = id;
      this.getRecordDetial()
    },
    methods: {
      getRecordDetial(){
        let self = this;
        try {
          let url = baseUrl + "account/Record/getRecordDetail";
          let config = {
            method: "post",
            url: url + "?r=" + Math.random(),
            data:{
              type:self.type,
              id:self.id
            }
          };
          self.$axios(config).then(result => {
            if (until.responesValidate(result)) {
              let data=result.data.data;
              if (self.type == '1') {
                self.buyData = data
              } else if (self.type == '1') {
                self.saleData = data
              }
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
