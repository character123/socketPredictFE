<template>
  <div class="table">
      <h1 class="title">{{socketInfo}}</h1>
      <div class="select-table">
      （代码名称）搜索：
          <el-select v-model="search" placeholder="请选择">
              <el-option
                      v-for="item in stockList"
                      :key="item"
                      :label="item"
                      :value="item">
              </el-option>
          </el-select>
          <el-select v-model="year" placeholder="请选择">
              <el-option
                      v-for="item in years"
                      :key="item"
                      :label="item"
                      :value="item">
              </el-option>
          </el-select>
          <el-select v-model="quarter" placeholder="请选择">
              <el-option
                      v-for="item in quarters"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
              </el-option>
          </el-select>
          <el-button @click="searchData" type="primary" icon="el-icon-search">查询</el-button>
      </div>
      <h3 class="title">历史交易数据</h3>
      <el-table
              :data="tableData"
              style="width: 1500px;height: 500px; overflow: auto;"
              height="500"
              :row-class-name="tableRowClassName">
          <el-table-column v-for="(item, index) in props" :key="item"
                  :prop="item"
                  :label="headers[index]">
          </el-table-column>
      </el-table>
  </div>
</template>

<script>
import { dailyData, stockList } from '@/api/apis'

export default {
  name: 'socketMarket',
  data() {
    return {
      search: '深振业A(SZ000006)',
      year: '2020',
      quarter: '1',
      years: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021'],
      quarters: [{label: '一季度', value: '1'}, {label: '二季度', value: '2'}, {label: '三季度', value: '3'}, {label: '四季度', value: '4'}],
      headers: ['日期', '开盘价', '最高价', '最低价', '收盘价', '昨收价', '涨跌幅（%）', '成交量（手）', '成交额（千元）'],
      props: ['date', 'open', 'highest', 'lowest', 'close', 'yesterday', 'change', 'volume', 'turnover'],
      socketInfo: '深振业A(SZ000006)',
      socketCode: 'SZ000006',
      tableData: [],
      stockList: []
    }
  },
  methods: {
    tableRowClassName({row, rowIndex}) {
      if (rowIndex % 2 === 0) {
        return 'warning-row'
      }
      return ''
    },
    getStockList() {
      stockList().then(res => {
        if(res.data.code === 0) {
          this.stockList = res.data.data
        }else{
          this.$message(res.data.data.msg, 'warning')
        }
      })
    },
    searchData() {
      let result = ''
      let sIndex = 0
      for(let i = 0; i < this.search.length; i++) {
        if(this.search[i] === '(') {
          sIndex = i
          break
        }
      }
      result = this.search.substring(sIndex + 1, this.search.length - 1)
      dailyData({
        socketCode: result,
        ds: this.year,
        quarter: this.quarter
      }).then(res => {
        if(res.data.code === 0) {
          this.socketInfo = res.data.data.stock_info
          this.socketCode = res.data.data.stock_code
          let tmp = res.data.data.items
          this.tableData = []
          tmp.forEach(item => {
            let tmpItem = {}
            for(let i = 0; i < item.length; i++) {
              tmpItem[this.props[i]] = item[i]
            }
            this.tableData.push(tmpItem)
          })
        }else {
          this.$message(res.data.msg, 'warning')
        }
      })
    }
  },
  mounted() {
    this.getStockList()
    this.searchData()
  }
}
</script>

<style scoped>
      .el-table .warning-row {
          background: rgba(253, 245, 230, 0.47);
      }
      .table {
          height: 100%;
          overflow: auto;
      }
    .select-table {
        margin-bottom: 20px;
        margin-top: 20px;
        height: 30px;
        width: 100%;

    }
    .title {
        text-align: center;
    }
    .search-input {
        width: 150px;
        height: 30px;
    }

</style>
