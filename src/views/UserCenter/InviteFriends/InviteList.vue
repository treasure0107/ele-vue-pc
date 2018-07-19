<template>
  <div class="center-main">
    <el-row class="breadcrumbs">
      <el-col :span="16">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/OrderList' }">邀请好友</el-breadcrumb-item>
          <el-breadcrumb-item>兑换记录</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <!-- <el-col :span="8"><time>2018-06-13 16:12:13</time></el-col> -->
    </el-row>
    <div class="boxer">
      <div class="seachBox" style="width:300px;">
        <el-input size="medium" placeholder="请输入订单编号">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>

      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="未支付" name="first">
          <div class="tab-list">
            <el-table
              width="100%"
              :data="tableData"
              stripe>

              <el-table-column
                label="订单编号"
                width="120">
                <template slot-scope="scope">
                  <span style="color:#5357E2;">{{scope.row.id}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="price"
                label="单价"
                width="100">
              </el-table-column>
              <el-table-column
                prop="num"
                label="交易量"
                width="100">
              </el-table-column>
              <el-table-column
                prop="totalprice"
                label="总价"
                width="110">
              </el-table-column>
              <el-table-column
                prop="tic"
                label="使用票"
                width="80">
              </el-table-column>
              <el-table-column
                prop="moneyBak"
                label="备用金抵扣"
                width="90">
              </el-table-column>
              <el-table-column
                prop="pay"
                label="实际支付"
                width="120">
              </el-table-column>
              <el-table-column
                prop="date"
                label="时间">
              </el-table-column>
            </el-table>
          </div>
          <div class="page-wrap">
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
          </div>
        </el-tab-pane>
        <el-tab-pane label="已付款" name="second">已付款</el-tab-pane>
        <el-tab-pane label="已完成" name="third">已完成</el-tab-pane>
        <el-tab-pane label="已取消" name="fourth">已取消</el-tab-pane>
        <el-tab-pane label="申诉中" name="five">申诉中</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script type="text/babel">
  import until from "@/scripts/until";
  import {baseUrl} from "@/config/env";
  const obj = {
    id: 68214685212,
    price: '654.20 CNY',
    num: '500.00 XRP',
    totalprice: '2600.00 CNY',
    tic: 5,
    moneyBak: 5000,
    pay: '5563000 CNY',
    date: "2018-10-10 10:10:10",
  }
  export default {
    data(){
      return {
        currentPage: 1,
        tableData: [],
        value: '',
        activeName: "first",
        radio: '买入'
      }

    },
    mounted(){
      this.tableData = new Array(10).fill(obj);
//      this.getRewordTradeList();
    },
    methods: {
      getRewordTradeList(){
        try {
          let url = baseUrl + "account/Order/getRewordTradeList";
          let config = {
            method: "POST",
            url: url + "?r=" + Math.random(),
            data:{
              status:1,
              page:1,
              orderid:'',
            }
          };
          this.$axios(config).then(res => {
            if (res.data.code) {
              console.log(res.data);

            } else {
              this.$message({
                showClose: true,
                duration: 3000,
                message: res.data.msg || '操作失败！',
                type: 'error'
              });
            }
          });
        } catch (ex) {
          until.consoleLog(ex);
        }
      },
      handleSizeChange(){

      },
      handleCurrentChange(){

      },
      handleClick(tab, event) {
        console.log(tab, event);
      }
    },
    components: {}
  }

</script>

<style lang="scss" scoped>
  .boxer {
    position: relative;
    .seachBox {
      position: absolute;
      right: 0;
      top: 0;
      z-index: 99
    }
  }

  .filterBox {
    display: flex;
  }

  .filterBox button {
    flex: 1
  }
</style>
