<template>
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
              明日收盘价约为: <p style="color: red;display: inline">{{this.finishPrice}}</p>￥
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
      hasChange: false,
      hasInit: false,
      socketCode: '平安银行(SZ000001)',
      finishPrice: '18.22',
      stockList: [],
      stockItems: [],
      rawData: [],
      echartsDates: [],
      echartsDatas: []
    }
  },
  watch: {
    socketCode() {
      this.getStockData()
      console.log('socke他变化')
    }
  },
  methods: {
    calculateMA(dayCount, data) {
      let result = []
      for (let i = 0, len = data.length; i < len; i++) {
        if (i < dayCount) {
          result.push('-')
          continue
        }
        let sum = 0
        for (let j = 0; j < dayCount; j++) {
          sum += data[i - j][1]
        }
        result.push(sum / dayCount)
      }
      return result
    },
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
      for(let i = 0; i < this.socketCode.length; i++) {
        if(this.socketCode[i] === '(') {
          sIndex = i
          break
        }
      }
      result = this.socketCode.substring(sIndex + 1, this.socketCode.length - 1)
      minuteData({stock_code: result}).then(res => {
        console.log('K线数据！！！！')
        if(res.data.code === 0) {
          this.rawData = res.data.data.items
          console.log(this.rawData)
          this.echartsDates = this.rawData.map(function (item) {
            return item.timestamp
          })
          this.echartsDatas = this.rawData.map(function (item) {
            return [item.avg_price, item.chg, item.current, item.percent, item.timestamp, item.volume]
          })
          console.log('echartsDates!!!!')
          console.log(this.echartsDates)
          console.log('echartsDatas!!!!')
          console.log(this.echartsDatas)
        }else {
          this.$message(res.data.msg, 'warning')
        }
      })
    }
  },
  computed: {

    option() {
      let kpEn = '时间'
      let zdEn = '最新'
      let spEn = '涨跌幅'
      let zgEn = '涨跌额'
      let cjlEn = '均价'

      return {
        legend: {
          data: ['时间', '均线'],
          inactiveColor: '#777'
        },
        tooltip:
        {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          backgroundColor: 'rgba(245, 245, 245, 0.8)',
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 10,
          textStyle: {
            color: '#000'
          },
          formatter: function (params) {
            console.log(params)
            let obj = {}
            if (params[0].value[0] !== undefined) { // 防止放上去提示undefined
              obj = {
                sName: params[0].seriesName,
                name: params[0].name,
                start: params[0].value[1],
                close: params[0].value[2],
                low: params[0].value[3],
                height: params[0].value[4],
                vol: params[0].value[0]
              }
            } else {
              obj = {
                sName: params[1].seriesName,
                name: params[1].name,
                start: params[1].value[0],
                close: params[1].value[1],
                low: params[1].value[2],
                height: params[1].value[3],
                vol: params[0].value
              }
            }
            let res = obj.sName + ' ' + obj.name
            res += '<br/>  ' + kpEn + ' : ' + obj.start + '  ' + zdEn + '  : ' + obj.height
            res += '<br/>  ' + spEn + ' : ' + obj.close + '  ' + zgEn + ': ' + obj.low
            res += '<br/>  ' + cjlEn + ': ' + obj.vol
            return res
          }
        },
        xAxis: {
          type: 'category',
          data: this.echartsDates,
          axisLine: { lineStyle: { color: '#8392A5' } }
        },
        yAxis: {
          scale: true,
          axisLine: { lineStyle: { color: '#8392A5' } },
          splitLine: { show: false }
        },
        grid: {
          bottom: 80
        },
        dataZoom: [{
          textStyle: {
            color: '#8392A5'
          },
          handleIcon: 'path://M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
          dataBackground: {
            areaStyle: {
              color: '#8392A5'
            },
            lineStyle: {
              opacity: 0.8,
              color: '#8392A5'
            }
          },
          brushSelect: true
        }, {
          type: 'inside'
        }],
        series: [
          {
            type: 'candlestick',
            name: '时间',
            data: this.echartsDatas,
            itemStyle: {
              color: '#FD1050',
              color0: '#0CF49B',
              borderColor: '#FD1050',
              borderColor0: '#0CF49B'
            }
          },
          {
            name: '均线',
            type: 'line',
            data: this.calculateMA(5, this.echartsDatas),
            smooth: true,
            showSymbol: false,
            lineStyle: {
              width: 1
            }
          }
        ]
      }
    }
  },
  mounted() {
    let chartDom = document.getElementById('my-charts')
    let myChart = echarts.init(chartDom)
    myChart.setOption(this.option)
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
        width: 600px;
        margin: auto;
    }
    .charts {
        width: 100%;
        height: 500px;
        margin-top: 20px;
    }
</style>
