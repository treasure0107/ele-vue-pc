<template>
  <div class="center-main">
    <el-row class="breadcrumbs">
      <el-col :span="16">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/Account' }">账户总览</el-breadcrumb-item>
          <el-breadcrumb-item>在线转票</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="8"><time><router-link :to="'/TicketRecord'">查看转票记录</router-link></time></el-col>
    </el-row>

    <el-row style="margin:50px 0">
      <el-col :span="14">
        <el-form :model="form" :rules="rules" ref="form" label-width="150px" >
          <el-form-item label="对方ID" prop="uuid">
            <el-input v-model="form.uuid"></el-input>
          </el-form-item>
          <el-form-item label="对方账号" prop="user">
            <el-input v-model="form.user" disabled></el-input>
          </el-form-item>
          <el-form-item label="票数" prop="votes">
            <el-input v-model="form.votes"></el-input>
            <p class="formNotice">当前账户可用票数{{form.availablevotes}}</p>
          </el-form-item>
          <el-form-item label="支付密码" prop="payPwd">
            <el-input type="password" v-model="form.payPwd"></el-input>
          </el-form-item>
          <el-form-item label="验证码" style="position:relative;" prop="verify_code">
            <el-input v-model="form.verify_code"></el-input>
            <!--<el-button class="getCode" type="primary" >发送验证码</el-button>-->
						<button v-dbClick class="default-class send-btn" @click.stop="sendMsgCode" v-show="!telSendShow">点击获取</button>
						<span class="disabled-class send-btn" v-show="telSendShow">{{telSendBtnTxt}}</span>
          </el-form-item>
          <el-form-item>
            <el-button v-dbClick type="primary" round style="width:150px;" @click="submitForm('form')">确定</el-button>
            <el-button v-dbClick @click="resetForm('form')" round style="width:150px;margin-left:30px;">取消</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

  </div>
</template>
<script type="text/babel">
	import { baseUrl } from "@/config/env";
	import until from "@/scripts/until";
  export default {
    data(){
			var validator_uuid = (rule, value, callback) => {
					new Promise(this.getusernamebyuuid).then((result)=>{
						this.form.user=result.data.data.username;
						callback();
					},(result)=>{
						this.form.user='填写对方账号ID,系统自动获取对方账号';
						callback(new Error(result.data.msg));
					})
			};
			var validator_ticket = (rule,value,callback) => {
				var reg=/^[1-9][0-9]*$/;
				if(!reg.test(value)){
					callback(new Error('请输入正整数'));
				}else if(Number(value)>Number(this.form.availablevotes)){
					callback(new Error('转票数超过当前账户可用票数'));
				}else{
					callback();
				}
			};
      return {
        form:{
          uuid:'',
          user:'填写对方账号ID,系统自动获取对方账号',
          votes:'',
					availablevotes:0,
          payPwd:'',
          verify_code:''
        },
				telSendShow: false,
				telSendBtnTxt: 0,
				number: 60,
				timer: null,
        rules: {
          uuid: [
						{ required: true, message: "对方ID不能为空", trigger: "blur" },
						{ validator:validator_uuid,trigger:"blur"}
					],
          votes: [
						{ required: true, message: "票数不能为空", trigger: "blur" },
						{ validator:validator_ticket,trigger:"blur"}
					],
          payPwd: [{ required: true, message: "支付密码不能为空", trigger: "blur" }],
          verify_code: [{ required: true, message: "验证码不能为空", trigger: "blur" }]
        },
      }

    },
    mounted(){
			this.getticket();
    },
    methods: {
			getticket(){
				try {
					let url = baseUrl + "account/ticket/getticket";
					let config = {
						method: "post",
						url: url + "?r=" + Math.random()
					};
					this.$axios(config).then(result => {
						if (until.responesValidate(result)) {
							let data=result.data.data;
							this.form.availablevotes = data.availablevotes;
						}
					});
				} catch (ex) {
					until.consoleLog(ex);
				}
			},
			getusernamebyuuid(resolve,reject){
				this.form.user='获取中...';
				try {
					let url = baseUrl + "account/ticket/getusernamebyuuid";
					let config = {
						method: "post",
						url: url + "?r=" + Math.random(),
						data:{
							uuid:this.form.uuid
						}
					};
					this.$axios(config).then(result => {
						if (result.data.code==1) {
							resolve(result);
						}else{
							reject(result);
						}
					});
				} catch (ex) {
					until.consoleLog(ex);
				}
			},
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            try {
            	let url = baseUrl + "account/ticket/addticket";
            	let config = {
            		method: "post",
            		url: url + "?r=" + Math.random(),
            		data:{
            			uuid:this.form.uuid,
									votes:this.form.votes,
									verify_code:this.form.verify_code,
									password:this.form.payPwd
            		}
            	};
            	this.$axios(config).then(result => {
            		if (until.responesValidate(result)) {
            			this.$message({
            				type: "success",
            				duration: 3000,
            				message: result.Msg || '转票成功!',
            				onClose:()=>{
            					this.$router.push({path: "/TicketRecord"});
            				}
            			});
            		}
            	});
            } catch (ex) {
            	until.consoleLog(ex);
            }
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
			sendMsgCode(){
				try {
					let url = baseUrl + "account/account/send_reset";
					let config = {
						method: "post",
						url: url + "?r=" + Math.random()
					};
					this.$axios(config).then(result => {
						if (until.responesValidate(result)) {
							this.intervalTimer('tel');
							this.$message({
								type: "success",
								duration: 3000,
								message: result.Msg || "发送成功！"
							});
						}
					});
				} catch (ex) {
					until.consoleLog(ex);
				}
			},
			//短信验证码倒计时
			intervalTimer(type){
				if (type == "email") {
					this.emailSendBtnTxt = this.number + "s";
					this.emailSendShow = true;
				}
				if (type == "tel") {
					this.telSendBtnTxt = this.number + "s";
					this.telSendShow = true;
				}
				if (this.number <= 60) {
					this.timer = window.setInterval(() => {
						this.number--;
						if (type == "email") {
							this.emailSendBtnTxt = this.number + "s";
						}
						if (type == "tel") {
							this.telSendBtnTxt = this.number + "s";
						}
						if (this.number == 0) {
							this.clearTimer();
							if (type == "email") {
								this.emailSendShow = false;
							}
							if (type == "tel") {
								this.telSendShow = false;
							}
						}
					}, 1000);
				}
			},
			clearTimer(){
				if (this.timer != null) {
					this.number = 60;
					window.clearInterval(this.timer);
				}
			}
    },
    components: {}
  }

</script>

<style lang="scss" scoped>
.formNotice{line-height: 25px;color: #999;font-size: 12px;}
.getCode{position: absolute;top: 0;right: 0;border-radius: 0 3px 3px 0}

.txt-code {
	width: 362px;
}
.send-btn {
	display: inline-block;
	text-align: center;
	position: absolute;
	right: 0;
	top: 0;
	width: 100px;
	height: 40px;
	cursor: pointer;
	outline: none;
	font-size: 14px;
	border-radius: 0px;
}
.default-class {
	color: #ffffff;
	background-color: #37BC9B;
}
.disabled-class {
	background-color: #bceadf;
	color: #ffffff;
}
</style>
