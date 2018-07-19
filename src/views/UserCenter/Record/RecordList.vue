<template>
  <div class="center-main">
    <h1 class="center-title">
      交易记录
    </h1>
     <!--<div class="search-wrap">-->
      <!--<el-select placeholder="买入" class="select-class">-->
        <!--<el-option value="买入" label="">买入</el-option>-->
        <!--<el-option value="卖出">卖出</el-option>-->
      <!--</el-select>-->
      <!--<el-select v-model="value" placeholder="近七日" class="select-class">-->
        <!--<el-option-->
          <!--v-for="item in options"-->
          <!--:key="item.value"-->
          <!--:label="item.label"-->
          <!--:value="item.value">-->
        <!--</el-option>-->
      <!--</el-select>-->
    <!--</div>-->
    <div class="tab-list">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column
          prop="addtime"
          label="交易时间"
          width="200"
          align="center">
          <template slot-scope="scope">
            <span style="margin-left: 5px">{{ scope.row.addtime }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="交易类型"
          width="150"
          align="center">
        </el-table-column>
        <el-table-column
          label="操作金额"
          width="200"
          align="center">
          <template slot-scope="scope">
            <span style="margin-left: 5px">{{ scope.row.amount }} {{ scope.row.xnb }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          width="150"
          align="center">
        </el-table-column>
        <el-table-column
          width="170"
          label="操作"
          align="center">
          <template slot-scope="scope">
            <router-link style="color:#5357E2;" :to="'/RecordDetial/' + scope.row.id + '/' + scope.row.type">查看详情</router-link>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="page-wrap">
      <el-pagination
        prevText="上一页"
        nextText="下一页"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pagesize"
        layout="prev, pager, next, jumper"
        :total="total">
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
        tableData:[],
        currentPage:1,
        pagesize:10,
        total:0,
      }

    },
    mounted(){
      this.getRecodeList()
    },
    methods: {
      handleSizeChange(){

      },
      handleCurrentChange(currentPage){
        this.currentPage=currentPage;
        this.getRecodeList();
      },
      //获取交易记录列表
      getRecodeList(){
        try {
          let url = baseUrl + "account/Record/getRecodelist";
          let config = {
            method: "post",
            url: url + "?r=" + Math.random(),
            data:{
              page:this.currentPage,
              pagesize:this.pagesize
            }
          };
          this.$axios(config).then(result => {
            if (until.responesValidate(result)) {
              let data=result.data.data;
              this.tableData=data.list;
              this.total=data.count;
            }
          });
        } catch (ex) {
          until.consoleLog(ex);
        }
      },
    },
    components: {}
  }

</script>

<style lang="scss" scoped>

</style>
