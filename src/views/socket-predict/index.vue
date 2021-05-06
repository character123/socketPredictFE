<template>
    <div>
        <div class="container">
            <h1 class="title">股价走向</h1>
            <div class="overview">
                <div class="left">
                    <el-select v-model="socketCode" placeholder="请选择">
                        <el-option
                                v-for="item in stockList"
                                :key="item"
                                :label="item"
                                :value="item">
                        </el-option>
                    </el-select>
                </div>
                <div class="right">
                    明日收盘价约为: <p style="color: red;display: inline">{{this.finishPrice}}￥</p>
                </div>
            </div>

        </div>
        <div id="my-charts" class="charts">

        </div>
    </div>

</template>

<script>
import { minuteData, stockList } from '@/api/apis'

import * as echarts from 'echarts'
export default {
  name: 'index',
  data() {
    return {
      socketCode: '平安银行(SZ000001)',
      finishPrice: '',
      stockList: [],
      option2Data: [],
      option: {}
    }
  },
  watch: {
    socketCode() {
      this.getStockData()
    }
  },
  methods: {
    getStockList() {
      stockList().then(res => {
        if(res.data.code === 0) {
          this.stockList = res.data.data
        }else {
          this.$message(res.data.data.msg, 'warning')
        }
      })
    },
    getStockData() {
      let result = ''
      let sIndex = 0
      let upColor = '#ec0000'
      let upBorderColor = '#8A0000'
      let downColor = '#00da3c'
      let downBorderColor = '#008F28'
      for(let i = 0; i < this.socketCode.length; i++) {
        if(this.socketCode[i] === '(') {
          sIndex = i
          break
        }
      }
      result = this.socketCode.substring(sIndex + 1, this.socketCode.length - 1)
      minuteData({stock_code: result}).then(res => {
        if(res.data.code === 0) {
          this.option2Data = res.data.data.items
          this.finishPrice = res.data.data.predict_close
          this.option = {
            dataset: {
              source: this.option2Data
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'line'
              },
              formatter: function (params) {
                let obj = {}

                if (params[0].value[0] !== undefined) { // 防止放上去提示undefined
                  let ans = params[0].value
                  obj = {
                    time: ans[0],
                    start: ans[1],
                    height: ans[2],
                    low: ans[3],
                    close: ans[4],
                    vol: ans[5],
                    change: ans[6]
                  }
                }
                let res = '时间:' + obj.time
                res += '<br/>  ' + '开盘价' + ' : ' + obj.start + '  ' + '收盘价' + '  : ' + obj.close
                res += '<br/>  ' + '最高价' + ' : ' + obj.height + '  ' + '最低价' + ': ' + obj.low
                res += '<br/>  ' + '成交量(手)' + ': ' + obj.vol + '  ' + '涨跌幅' + ': ' + obj.change
                return res
              }
            },
            toolbox: {
              feature: {
                dataZoom: {
                  yAxisIndex: false
                }
              }
            },
            grid: [
              {
                left: '10%',
                right: '10%',
                bottom: 200
              },
              {
                left: '10%',
                right: '10%',
                height: 80,
                bottom: 80
              }
            ],
            xAxis: [
              {
                type: 'category',
                scale: true,
                boundaryGap: false,
                // inverse: true,
                axisLine: {onZero: false},
                splitLine: {show: false},
                splitNumber: 20,
                min: 'dataMin',
                max: 'dataMax'
              },
              {
                type: 'category',
                gridIndex: 1,
                scale: true,
                boundaryGap: false,
                axisLine: {onZero: false},
                axisTick: {show: false},
                splitLine: {show: false},
                axisLabel: {show: false},
                splitNumber: 20,
                min: 'dataMin',
                max: 'dataMax'
              }
            ],
            yAxis: [
              {
                scale: true,
                splitArea: {
                  show: true
                }
              },
              {
                scale: true,
                gridIndex: 1,
                splitNumber: 2,
                axisLabel: {show: false},
                axisLine: {show: false},
                axisTick: {show: false},
                splitLine: {show: false}
              }
            ],
            dataZoom: [
              {
                type: 'inside',
                xAxisIndex: [0, 1],
                start: 10,
                end: 100
              },
              {
                show: true,
                xAxisIndex: [0, 1],
                type: 'slider',
                bottom: 10,
                start: 10,
                end: 100
              }
            ],
            visualMap: {
              show: false,
              seriesIndex: 1,
              dimension: 6,
              pieces: [{
                value: 1,
                color: upColor
              }, {
                value: -1,
                color: downColor
              }]
            },
            series: [
              {
                type: 'candlestick',
                itemStyle: {
                  color: upColor,
                  color0: downColor,
                  borderColor: upBorderColor,
                  borderColor0: downBorderColor
                },
                encode: {
                  x: 0,
                  y: [1, 4, 3, 2]
                }
              },
              {
                name: 'Volumn',
                type: 'bar',
                xAxisIndex: 1,
                yAxisIndex: 1,
                itemStyle: {
                  color: '#7fbe9e'
                },
                large: true,
                encode: {
                  x: 0,
                  y: 5
                }
              }
            ]
          }
          let chartDom = document.getElementById('my-charts')
          let myChart = echarts.init(chartDom)
          myChart.setOption(this.option)
        }else {
          this.$message(res.data.msg, 'warning')
        }
      })
    }
  },
  computed: {

  },
  mounted() {
  },

  created() {
    this.getStockList()
    this.getStockData()
  }
}
</script>

<style scoped>
    .title {
        text-align: center;
    }
    .overview {
        width: calc(100% - 100px);
        margin-left: 50px;
        height: 50px;
        margin-top: 10px;
        margin-bottom: 10px;
        font-size: 20px;
        font-weight: 600;
    }
    .left{
        float: left;
    }
    .right{
        float: right;
        display: inline;
    }
    .container {
        width: 1060px;
        margin: auto;
    }
    .charts {
        width: 1200px;
        height: 700px;
        margin: auto;
        margin-top: 20px;
    }
</style>
