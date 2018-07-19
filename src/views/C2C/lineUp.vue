<template>
  <div class="container noLeftBox">
    <el-container>
      <el-main>
        <el-row class="breadcrumbs">
          <el-col :span="16">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/C2C' }">C2C交易 </el-breadcrumb-item>
              <el-breadcrumb-item v-if="!form.isEdit">我要参与排队</el-breadcrumb-item>
							<el-breadcrumb-item v-else>修改排队信息</el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
          <!-- <el-col :span="8"><time><router-link :to="'/TicketRecord'">查看转票记录</router-link></time></el-col>  -->
        </el-row>

        <el-row style="margin:50px 0">
          <el-col :span="14">
            <el-form :model="form" :rules="rules" ref="form" label-width="150px"  >
              <el-form-item label="参与金额" prop="entrance_money">
                <el-input v-model.trim="form.entrance_money"> <i slot="suffix" style="font-size:16px;color:#333;text-transform:uppercase;margin-right:10px;">cny</i></el-input>
              </el-form-item>
							<el-form-item label="票数">
								<b>{{form.curr_available_votes}}</b> <span> (匹配成功之后取消订单票将不会退回)</span>
							</el-form-item>
              <el-form-item label="可使用备用金">
                <b>{{form.available_cny}}</b>
								</el-popover>
              </el-form-item>
              <el-form-item label="预计需支付">
                <b style="font-size:24px">{{form.neePay}}</b>  CNY
              </el-form-item>

              <el-form-item label="支付方式">
                <div class="paywayBox">
                  <div class="subBox">
										<template v-for="(item,index) in payList">
											<div :class="{on:item.checked}" @click="choosePayType(item) ">
												<i class="pay_icon" :class="item.type" size="medium"></i>{{item.type}}
											</div>	
										</template>                    									
                  </div>
                </div>

              </el-form-item>
              <el-form-item label="交易密码" prop="psw">
                <el-input type="password" v-model="form.psw" placeholder="请输入交易密码"></el-input>
              </el-form-item>
              <el-form-item> </el-form-item>
              <el-form-item v-if="!form.isEdit">       
                <el-button v-dbClick type="primary" round style="width:150px;" @click="submitForm('form')">立即参与</el-button>
                <!-- <el-button round style="width:150px;margin-left:30px;">取消修改</el-button> -->
              </el-form-item>
							<el-form-item v-else>       
								<el-button v-dbClick type="primary" round style="width:150px;" @click="submitForm('form')">立即修改</el-button>
								<el-button v-dbClick round style="width:150px;margin-left:30px;" @click="cancelSubmit">取消修改</el-button> 
							</el-form-item>

            </el-form>
          </el-col>
        </el-row>

      </el-main>
    </el-container>

  </div>
</template>
<script type="text/babel">
	import { baseUrl } from "@/config/env";
	import until from "@/scripts/until";
	import Vue from 'vue';
	import {MessageBox} from 'element-ui';
	import router from '@/router';
  export default {
    data(){
			var validateEntrance_money = (rule, value, callback) => {
					if(!until.RegExps.isNumber(value)){
						callback(new Error('请输入数字'));
					}else if(this.form.last_entrance_money!=''&&Number(this.form.last_entrance_money)>Number(this.form.entrance_money)){
						callback(new Error('参与金额不能小于上次参与金额'+this.form.last_entrance_money));
					}else if(this.form.money_least&&(Number(value)<this.form.money_least)){
						callback(new Error('参与金额最少为'+this.form.money_least));
					}else if((typeof this.form.money_max=="number")&&(Number(value)>this.form.money_max)){
						callback(new Error('参与金额最大为'+this.form.money_max));
					}else if(Number(value)===0){
						callback(new Error('参与金额不能为0'));
					}else if(this.form.money_int&&(Number(value)%(this.form.money_int)!=0)){
						callback(new Error('参与金额必须是'+this.form.money_int+'的整数倍'));
					}
					else {
						callback();
					}
			};
      return {
        form:{
					isEdit:false,
					last_entrance_money:'',
          entrance_money:'',
          available_cny:0.00,//可用备用金
					available_votes:0,  //可用票数
					curr_available_votes:0, //当前参与金额可用票数
					money_int:1000,//全额整数倍
					money_least:1000,
					money_max:30000,
          neePay:0,
          psw:'',
          yzm:'',
					type_list:[],
					status:''
        },
				paymentlist:[],
        rules: {
          entrance_money: [
						{ required: true, message: "请输入参与金额", trigger: "blur" },
						{ validator: validateEntrance_money, trigger: "blur" }
					],
					psw:[
						{ required: true, message: "请输入交易密码", trigger: "blur" }
					]
        },
      }

    },
 		beforeRouteEnter:function(to,from,next){
			try {
				let	url = baseUrl + "/friends/getProfile";
				let config = {
					method: "post",
					url: url + "?r=" + Math.random()
				};
				Vue.prototype.$axios(config).then(result => {
					if (until.responesValidate(result)) {
						let data=result.data.data;
						if(data.approvestatus!=1){
							MessageBox.confirm("<span class='tips'></span><p>您还未通过实名认证,请先进行实名认证</p>", '提示', {
								dangerouslyUseHTMLString: true,
								customClass:'customAlert',
								confirmButtonText: '去认证',
								showCancelButton:false,
								confirmButtonClass:'customAlertConfirm',
								callback: (action, instance) => {
									if (action == "confirm") {
										router.push({path: "/AccountSet"})
									}
								}
							})
							next(false);
							return;
						}
						if(data.paypassword==0){//未设置交易密码
							MessageBox.confirm("<span class='tips'></span><p>您还未设置交易密码,请先设置交易密码</p>", '提示', {
								dangerouslyUseHTMLString: true,
								customClass:'customAlert',
								confirmButtonText: '去设置',
								showCancelButton:false,
								confirmButtonClass:'customAlertConfirm',
								callback: (action, instance) => {
									if (action == "confirm") {
										router.push({path: "/AccountSet"})
									}
								}
							})
							next(false);
							return;
						}
						if(data.plist.length==0){
							MessageBox.confirm("<span class='tips'></span><p>您还未设置支付方式,请先设置支付方式</p>", '提示', {
								dangerouslyUseHTMLString: true,
								customClass:'customAlert',
								confirmButtonText: '去设置',
								showCancelButton:false,
								confirmButtonClass:'customAlertConfirm',
								callback: (action, instance) => {
									if (action == "confirm") {
										router.push({path: "/CollectSet"})
									}
								}
							})
							next(false);
							return;
						}
						try {
							let url = baseUrl + "/account/c2c/getusercoin";					
							let config = {
								method: "post",
								url: url + "?r=" + Math.random()
							};
							Vue.prototype.$axios(config).then(result => {
								if (until.responesValidate(result)) {
									let data=result.data.data;
									if(data.available_votes==0){																				
										MessageBox.confirm("<span class='tips'></span><p>账户没有可用参与票，无法参与<p><p>购票请与卖票人联系！</p>", '提示', {
											dangerouslyUseHTMLString: true,
											customClass:'customAlert',
											confirmButtonText: '知道了',
											showCancelButton:false,
											confirmButtonClass:'customAlertConfirm'
										})
										next(false); 
									}else{
										next();
									}
								}
							});
						} catch (ex) {
							until.consoleLog(ex);
						}						
					}else{
						next(false);
					}
				});
			} catch (ex) {
				until.consoleLog(ex);
			}
    }, 
    mounted(){
			this.form.isEdit=this.$route.query.edit?true:false;
			this.getusercoin();
			this.getpaymentlist();
    },
    methods: {
			//资金账户基本信息
			getusercoin(){
				try {
					let url = baseUrl + "/account/c2c/getusercoin";					
					let config = {
						method: "post",
						url: url + "?r=" + Math.random()
					};
					this.$axios(config).then(result => {
						if (until.responesValidate(result)) {
							let data=result.data.data;
							this.form.type_list=data.type_list;
							this.form.status=data.status;
							this.lineup();
						}
					});
				} catch (ex) {
					until.consoleLog(ex);
				}
			},			
			//我要排队，加载用户资金基本信息
			lineup(){
				try {
					if(this.form.type_list.some((item)=>item.id==1)&&this.form.status==0){
						this.form.isEdit=true;
					}
					let url="";
					if(this.form.isEdit){
						url = baseUrl + "/account/c2c/editdetail";
					}else{
						url = baseUrl + "/account/c2c/adddetail";
					}
					let config = {
						method: "post",
						url: url + "?r=" + Math.random()
					};
					this.$axios(config).then(result => {
						if (until.responesValidate(result)) {
							let data=result.data.data;
							this.form.available_votes=data.available_votes;
							this.form.available_cny=data.available_cny;
							this.form.money_least=data.money_least;
							this.form.money_int=data.money_int;
							this.form.money_max= data.money_max;
							if(this.form.isEdit){
								this.form.last_entrance_money=data.entrance_money;
							}																					
						}
					});
				} catch (ex) {
					until.consoleLog(ex);
				}
			},
			getpaymentlist(){
				try {
					let url = baseUrl + "account/c2c/getpaymentlist";
					let config = {
						method: "post",
						url: url + "?r=" + Math.random()
					};
					this.$axios(config).then(result => {
						if (until.responesValidate(result)) {
							let data=result.data.data;
							this.paymentlist=data;
						}
					});
				} catch (ex) {
					until.consoleLog(ex);
				}
			},
			choosePayType(item){
				if(typeof item.checked=='undefined'){
					this.$set(item,'checked',true);
				}else if(item.checked){
					item.checked=false;
				}else{
					item.checked=true;
				}
			},
			getPayTypeArr(){
				let arr=[];
				this.payList.forEach((item)=>{
					if(item.checked){
						arr.push(item.type);
					}
				});
				return arr;
			},
			cancelSubmit(){
				this.$router.push({path: "/C2C"});
			},
      submitForm(formName) {
				if(this.getPayTypeArr().length==0){
					this.$message({
						type: "error",
						duration: 3000,
						message: "请至少选择一种支付方式"						
					});
					return;
				}
        this.$refs[formName].validate((valid) => {
          if (valid) {						
            try {
							let url="";
							if(this.form.isEdit){
								url = baseUrl + "account/c2c/editEntrance";
							}else{
								url = baseUrl + "account/c2c/addentrance";
							}
							let formdata={
								"entrance_money" : this.form.entrance_money,
								"payment" : this.getPayTypeArr(),
								"password" : this.form.psw
							};
            	let config = {
            		method: "post",
            		url: url + "?r=" + Math.random(),
								data:formdata
            	};
            	this.$axios(config).then(result => {
            		if (until.responesValidate(result)) {
									let msg=this.form.isEdit?'修改排队信息成功!':'排队成功!';
									this.$message({
										type: "success",
										duration: 3000,
										message: result.Msg || msg,
										onClose:()=>{
											//this.$router.push({path: "/C2C"});
											this.$router.go(-1);
										}
									});		            			            			
            		}
            	});
            } catch (ex) {
            	until.consoleLog(ex);
            }
          }
        });
      },

    },
		computed: {
			change_entrance_money() {
				return this.form.entrance_money
			},
			payList(){
				let newArr=this.paymentlist.map((item)=>{
					switch(item.type.toLowerCase()){
						case 'bank':
							item.name='银行卡';
							break;
						case 'alipay':
							item.name='支付宝';
							break;
						case 'wxpay':
							item.name='微信';
							break;
						case 'usdt':
							item.name='USDT';
							break;
							default:
							break;
					}
					return item;
				})
				return newArr;
			}
		},
		watch:{
			change_entrance_money(newVal){
				if(until.RegExps.isNumber(newVal)){
					this.form.curr_available_votes=(Math.ceil(Number(newVal)/6000)>this.form.available_votes)?this.form.available_votes:Math.ceil(Number(newVal)/6000);
					this.form.neePay=(Number(newVal)-this.form.curr_available_votes*300-Number(this.form.available_cny)).toFixed(2);				
					if(this.form.neePay<0){
						this.form.neePay=0.00;
					}
				}else{
					this.form.curr_available_votes=0;
					this.form.neePay=0;
				}
			}
		},
    components: {}
  }

</script>

<style lang="scss" scoped>
.orderStatus{font-weight: bold;font-size: 24px;
  .el-badge{margin-left: 20px;}
}
.receiving{background:#F6F6F6;padding:25px 25px 0 25px;margin:30px 0;
  .el-col{margin-bottom: 25px;font-size: 14px;
    label{color: #999;}
  }
}

.orderInfos{
  margin:50px 0 0;
  .el-col{margin-bottom: 25px;font-size: 14px;
    label{color: #999;}
    b{font-size: 24px}
  }
}

.paywayBox{display: inline-block;
  .subBox{display:flex;
    div{width: 115px;height: 40px;border:1px solid #ddd;border-radius: 3px;
      margin-right: 15px;display: flex;align-items:center;justify-content:flex-start;cursor: pointer;position: relative;overflow: hidden;-webkit-user-select: none;}
      :hover,.on{border-color:#5357E2;color: #5357E2;}
      i{margin:0 14px}
  }
  
}

.borderLight{border: 1px solid #3B50D2;border-radius: 3px;padding:25px 25px 0 25px;position: relative;}
.arrows{position: absolute;top: 0;left: 0;
  span{
      display:block; 
      width:0; 
      height:0; 
      border-width:0 10px 10px; 
      border-style:solid; 
      border-color:transparent transparent #3B50D2; 
      position:absolute; 
      top:-10px; 
      left:50%;/* 三角形居中显示 */
      margin-left:-10px;/* 三角形居中显示 */
  }
  em{
    display:block; 
    width:0; 
    height:0; 
    border-width:0 10px 10px; 
    border-style:solid; 
    border-color:transparent transparent #fff; 
    position:absolute; 
    top:1px; 
    left:-10px;
  }
}

.bankInfo .arrows{left:130px}

.orderTimeOut{padding: 5px 0;font-size: 14px;
  span{color: #E6403D}
  b{font-size: 20px}
}

.el-form-item span{color: #B7B7B7;font-size: 12px;}

//支付图标
.subBox .pay_icon{width: 28px;height: 28px;background-image: url(../../assets/pay_icon.png);background-repeat: no-repeat;background-size: 122px 28px;}
.subBox .bank{background-position: -1px 0;}
.subBox .weixin{background-position: -32px 0;}
.subBox .alipay{background-position: -62px 0;}
.subBox .usdt{background-position: -92px 0;}
.subBox .on:after{content: '';width: 16px;height: 14px;position: absolute;right: -1px;bottom: 0;background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAOCAMAAAAR8Wy4AAAAb1BMVEUAAABTV+JTV+JTV+JTV+JTV+JTV+JTV+JTV+JTV+JTV+JTV+JTV+JTV+JTV+JTV+JTV+JTV+JTV+JTV+JTV+JTV+JTV+JTV+JTV+L7+//y8v1obOaHiutxdeducedeYuSpq/GUlu2LjutjZuVXW+Oj9RxqAAAAGHRSTlMA7978z7ho9uiifTko68Onlo+GUkwYDQWVnTcHAAAAa0lEQVQI11XNRxKFIAAEUcDsz0FtwKz3P6MlhpLevdmM8LvHvm/y4/mX8L46DiC7+AvwOlllrEWHywhvKELH2j73e+U86jbc7h90HTS6xQ3/BCbTWF2D2u/BGjMAqRA5W3MPIEWu1lLpgmABDosJRducRE4AAAAASUVORK5CYII=') no-repeat center;}
</style>
