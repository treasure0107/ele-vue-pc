<template>
  <div class="center-main">
    <el-row class="breadcrumbs">
      <el-col :span="16">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/Account' }">账户总览</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/TurnTicket' }">在线转票</el-breadcrumb-item>
          <el-breadcrumb-item>转票记录列表</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="8"><time>2018-06-13 16:12:13</time></el-col>
    </el-row>

    <div style="padding:20px 0 10px;">
			<div class="block">
				<el-date-picker
					v-model="startDate"
					type="date"
					value-format="yyyy-MM-dd"
					placeholder="选择日期" style="width:160px;height:30px;">
				</el-date-picker>
				<div class="line"></div>
				<el-date-picker
					v-model="endDate"
					type="date"
					value-format="yyyy-MM-dd"
					placeholder="选择日期" style="width:160px;height: 30px;">
				</el-date-picker>
				<el-input v-model="filters.uuid" style="width:275px;height: 30px;margin-left: 20px;" placeholder="请输入ID/账号">					
				</el-input>
				<el-button type="danger" style="background: #5357E2;height: 30px;line-height: 30px;border: none;padding: 0 20px;margin-left: 18px;" @click="handleSearch" :disabled="timeDiff">搜索</el-button>
				<el-button type="success" style="height: 30px;line-height: 30px;border: none;padding: 0 20px;margin-left: 18px;" @click="timeReset">重置</el-button>
			</div>      
    </div>

    <div class="tab-list">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column
          prop="addtime"
          label="交易时间"
          width="200">
        </el-table-column>
        <el-table-column
          prop="uuid"
          label="交易方ID"
          width="180">
        </el-table-column>
        <el-table-column
          prop="username"
          label="账号" 
          width="200">
        </el-table-column>
        <el-table-column
          prop="ticket"
          label="转票数"
          width="150">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态">
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
	import { baseUrl } from "@/config/env";
	import until from "@/scripts/until";
  export default {
    data(){
      return {
				tableData:[],
				currentPage:1,
				pagesize:10,
				total:0,
				search:'',
				startDate:'',
				endDate:'',
        filters:{
          uuid:''
        }
      }
    },
    mounted(){
      this.getAccountRecodelist();
    },
    methods: {
			handleCurrentChange(currentPage){
				this.currentPage=currentPage;
				this.getAccountRecodelist();
			},
			handleSearch(){
				this.getAccountRecodelist();
			},
			getAccountRecodelist(){
				try {
					let url = baseUrl + "account/ticket/datalist";					
					let config = {
						method: "post",
						url: url + "?r=" + Math.random(),
						data:{
							search:this.filters.uuid,
							begintime:this.startDate,
							endtime:this.endDate,
							page:this.currentPage,
							pagesize:this.pagesize
						}
					};
					this.$axios(config).then(result => {
						if (until.responesValidate(result)) {
							let data=result.data.data;
							this.tableData=data.data;
							this.total=data.total;
						}
					});
				} catch (ex) {
					until.consoleLog(ex);
				}
			},
			timeReset:function(){
				this.startDate='';
				this.endDate = '';
				this.filters.uuid='';
				this.getAccountRecodelist();
			}
		},
		computed: {
			timeDiff:function(){
				if(this.filters.uuid!=''){
					return false;
				}
				if(this.startDate == "" || this.endDate == "")
					return true
				else{
					var e= new Date(this.endDate)
					var s= new Date(this.startDate)
					var result = e - s 
					if(result >= 0)
						return false
					else 
						return true
				}
			}
		},
    components: {}
  }

</script>

<style lang="scss" scoped>
 /deep/ .el-input__inner{height: 30px;line-height: 30px;}
 /deep/ .el-input__icon{line-height: 30px;}
 .line{background: #d1d1d1;width: 20px;height: 1px;display: inline-block;vertical-align: middle;margin: 0 3px;}
 .tab-list{margin-top: 16px;}
</style>
