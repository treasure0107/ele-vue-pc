<template>
  <div class="bar-graph-wrap">
    <div class="curPrice">当前价格：<b>{{dangqi.start_price}}</b></div>
    <div class="bar-graph" id="barGraph">

    </div>
    <div class="bar-bottom clearFix">
      <div class="bar-cols">
        <img src="./../assets/icon-numbers.png" alt="">
        <span class="number">{{dangqi.outpeople}}</span>
        <span class="name">买入人数</span>
      </div>
      <div class="bar-cols">
        <img src="./../assets/icon-people.png" alt="">
        <span class="number">{{dangqi.linepeople}}</span>
        <span class="name">参与人数</span>
      </div>
      <div class="bar-cols  btn-div">
        <a href="/#/lineUp" class="enter-btn" v-if="btnState==0">我要参与</a>
        <a class="reset-btn" v-else>已参与</a>
      </div>
    </div>
  </div>
</template>
<script type="text/babel">
  import until from "@/scripts/until";
  import {baseUrl} from "@/config/env";

  import * as $echarts from 'echarts';
  export default {
    data(){
      return {
        dangqi: {},
        //allList:[],
        xAxisData: [],
        yAxisData: [],
        btnState: 0
      }
    },
    mounted(){

      this.getEchatsDate();
    },
    methods: {
      getData(){
        var myChart = $echarts.init(document.getElementById('barGraph'));
        var option = {
          color: ['#3398DB'],
          title: {
            text: 'GFC'
          },
          renderer: "SVG",
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            left: '2%',
            right: '2%',
            bottom: '3%',
            containLabel: true
          },
          legend: {
            show: false,
            left: 'right',
            data: [{
              name: '价格',
              icon: 'circle',
              textStyle: {
                color: 'red'
              }
            }]
          },
          xAxis: [
            {
              type: 'category',
              axisTick: {
                alignWithLabel: true
              },
              // data: ["一期", "二期", "三期", "四期", "五期", "六期", "七期", "八期", "九期", "十期", "十一期", "十二期", "十三期", "十四期", "十五期", "十六期", "十七期"]
              data: this.xAxisData
            }
          ],
          yAxis: {},
          series: [{
            name: '价格',
            type: 'bar',
            label: {
              show: true,
              position: "top"
            },
            // data: [15, 28, 56, 18, 50, 20, 32, 40, 22, 44, 22, 45, 50, 30, 12, 20, 55]
            data: this.yAxisData
          }]
        };
        // 使用刚指定的配置项和数据显示图表。 this.xAxisData,this.yAxisData
        myChart.setOption(option);
      },
      getEchatsDate(){
        try {
          let url = baseUrl + 'index/getIndexPeriods';
          let config = {
            method: "POST",
            url: url,
            data: {r: Math.random()}
          };
          this.$axios(config).then(result => {
            if (until.responesValidate(result)) {
              //this.allList=result.data.data.alllist;
              for (var item of result.data.data.alllist) {
                // console.log(item)
                this.xAxisData.push(item.name)
                this.yAxisData.push(item.start_price)
              }
              // console.log(this.xAxisData,this.yAxisData)
              this.dangqi = result.data.data.dangqi;
              this.btnState = result.data.data.status;
              this.getData();

            }
          })
        } catch (ex) {
          until.consoleLog(ex)
        }
      }
    },
    components: {}
  }

</script>

<style lang="scss" scoped>
  @import "./../styles/mixin";

  .bar-graph-wrap {
    background: url('./../assets/du.jpg') no-repeat;
    background-size: 100% 68%;
    width: 100%;
    @include marginAuto();
    position: relative;
    .curPrice {
      @include cr();
      @include sc(16px, #333);
      right: 20px;
      top: 45px;
      z-index: 9999;
      b {
        @include sc(30px, #333)
      }
    }
    .bar-graph {
      width: 99.8%;
      margin: 40px auto 0 auto;
      height: 650px;
      border: solid 1px #eeeeee;
    }
    .bar-bottom {
      width: 100%;
      padding: 54px 0;
      .bar-cols {
        width: 33%;
        float: left;
        text-align: center;
        position: relative;
        .enter-btn {
          display: inline-block;
          text-align: center;
          width: 229px;
          height: 68px;
          color: #fff;
          background: url("./../assets/btn_bg.png") center top no-repeat;
          @include sc(20px, #ffffff);
        }
        .reset-btn {
          display: inline-block;
          text-align: center;
          width: 229px;
          height: 50px;
          border-radius: 25px;
          line-height: 50px;
          background-color: #d2d2d2;
          @include sc(20px, #333);
          cursor: default;
        }
        img {
          max-height: 62px;
        }
        span {
          display: block;
          padding-top: 25px;
        }
        span.number {
          font-weight: 600;
          @include sc(30px, #333333);
        }
        span.name {
          @include sc(16px, #666666);
        }
      }
      .btn-div {
        height: 160px;
        line-height: 50px;
      }
    }
  }
</style>
