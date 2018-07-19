<template>
  <div class="container noLeftBox">
    <el-container>
      <el-main>
        <el-row class="breadcrumbs">
          <el-col :span="16">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/OrderList' }">订单列表</el-breadcrumb-item>
              <el-breadcrumb-item>订单详情</el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
          <!-- <el-col :span="8"><time>2018-06-13 16:12:13</time></el-col> -->
        </el-row>

        <div class="orderStatus">订单详情<el-badge class="mark" value="待支付" /></div>

        <div class="receiving">
          <el-row>
            <el-col :span="12">
              <label>收款方姓名：</label><span>海飞丝</span>
            </el-col>
            <el-col :span="12">
              <label>电话：</label><span>132****2776</span> <el-button type="primary" icon="el-icon-phone" size="mini" circle></el-button>
            </el-col>
            <el-col :span="12">
              <label>对方ID：</label><span>a3224</span>
            </el-col>
  
          </el-row>
        </div>

        <div class="orderInfos">
          <el-row>
            <el-col :span="12">
              <label>订单号：</label><span>1532000002580</span>
            </el-col>
            <el-col :span="12">
              <label>单价：</label><span>6.5 CNY/XRP</span>
            </el-col>
            <el-col :span="12">
              <label>买入数量：</label><span>350000 XRP</span>
            </el-col>
            <el-col :span="12">
              <label>使用票数：</label><span>5</span>
            </el-col>
            <el-col :span="12">
              <label>总金额：</label><span>350000 CNY</span>
            </el-col>

            <el-col :span="12">
              <label>备用金抵扣：</label><span>-350 <label>(约267RMB/368USDT)</label></span>
            </el-col>
            <el-col :span="12">
              <label>实际支付：</label><span><b>341000</b> CNY</span>
            </el-col>
            <el-col :span="24">
              <label>支付方式：</label>
              <div class="paywayBox">
                <div class="subBox">
                  <div class="on">
                  <i class="el-icon-success" size="medium"></i>银行卡
                  </div>
                  <div>
                    <i class="el-icon-success"></i>支付宝
                  </div>
                  <div>
                    <i class="el-icon-success"></i>微信
                  </div>
                  <div>
                    <i class="el-icon-success"></i>USDT
                  </div>
                </div>
              </div>
            </el-col>

            <el-col :span="24" class="bankInfo borderLight">
              <div class="arrows"><span><em></em></span></div>
              <el-col :span="12">
                <label>收款方姓名：</label><span>海飞丝</span>
              </el-col>
              <el-col :span="12">
                <label>银行名称：</label><span>建设银行</span> 
              </el-col>
              <el-col :span="12">
                <label>支行：</label><span>坪洲支行</span>
              </el-col>
              <el-col :span="12">
                <label>银行卡号：</label><span>6230 5088 2250 3659 746</span>&nbsp;&nbsp;&nbsp;&nbsp;<el-button size="mini">复制</el-button> 
              </el-col>
            </el-col>

          </el-row>
        </div>

        <div class="orderTimeOut">
          请于 <span>15分36秒</span> 内向 135****2758 支付 <b>341000.00</b> CNY，付款参考号：<strong>708251</strong>
        </div>

        <div class="orderBtnBox">
          
        </div>

      </el-main>
    </el-container>

  </div>
</template>
<script type="text/babel">
  export default {
    data(){
      return {}

    },
    mounted(){

    },
    methods: {},
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
      margin-right: 15px;display: flex;align-items:center;justify-content:center;cursor: pointer;}
      :hover,.on{border-color:#5357E2;color: #5357E2;}
      i{margin-right: 5px}
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

</style>
