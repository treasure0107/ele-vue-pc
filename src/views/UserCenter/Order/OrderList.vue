<template>
  <div class="center-main">
    <h1 class="center-title">
      订单列表
    </h1>
    <div class="boxer">
      <div class="seachBox" style="width:300px;">
        <el-input size="medium" placeholder="请输入订单编号">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>

      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="未支付" name="first">
          <div class="filterBox">
              <el-button type="primary">买入</el-button>
              <el-button>卖出</el-button>
          </div>
          <div class="tab-list">
            <el-table
              width="100%"
              :data="tableData"
              stripe>
              
              <el-table-column
                label="订单编号"
                width="120">
                <template slot-scope="scope">
                  <router-link style="color:#5357E2;" :to="'/OrderDetails?id='+scope.row.id">{{scope.row.id}}</router-link>
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
  const obj={
    id:68214685212,
    price:'654.20 CNY',
    num:'500.00 XRP',
    totalprice:'2600.00 CNY',
    tic:5,
    moneyBak:5000,
    pay:'5563000 CNY',
    date:"2018-10-10 10:10:10",
  }
  export default {
    data(){
      return {
        currentPage: 1,
        tableData: [],
        value: '',
        activeName:"first",
        radio:'买入'
      }

    },
    mounted(){
      this.tableData=new Array(10).fill(obj)
    },
    methods: {
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
.boxer{position: relative;
  .seachBox{position: absolute;right: 0;top: 0;z-index: 99}
}

.filterBox{display:flex;}
.filterBox button{flex:1}
</style>
